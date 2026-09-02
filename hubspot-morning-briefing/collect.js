#!/usr/bin/env node
'use strict';

/**
 * HubSpot Morning Briefing — collector (MVP)
 *
 * Read-only. Talks to HubSpot exclusively through the official `hs` CLI
 * (`hs api <endpoint> --method <method> --data '<json>'`). No HubSpot SDK,
 * no direct HTTP calls, no credential handling of any kind — auth is 100%
 * owned by `@hubspot/cli`.
 *
 * Usage:
 *   node collect.js setup           interactive, one-time: discovers account/owner/timezone via
 *                                    the hs CLI and writes config.json. Run this yourself in a
 *                                    real terminal — it prompts for input, so don't run it from
 *                                    an agent/non-interactive context.
 *   node collect.js                 run against the real HubSpot account in config.json
 *   node collect.js --sample        skip HubSpot entirely, print normalized sample data
 *   node collect.js --owner 12345   override the configured owner id for this run
 *   node collect.js --config path.json
 *
 * Output: a single normalized JSON document on stdout. This script does NOT
 * write the briefing itself — that's Claude's job (see SKILL.md). This
 * script only collects, normalizes, and pre-scores.
 */

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline/promises');

// ---------------------------------------------------------------------------
// CLI args / config
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const out = { sample: false, config: path.join(__dirname, 'config.json') };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--sample') out.sample = true;
    else if (a === '--owner') out.ownerOverride = argv[++i];
    else if (a === '--config') out.config = argv[++i];
    else if (a === '--pretty') out.pretty = true;
  }
  return out;
}

function loadConfig(configPath) {
  if (!fs.existsSync(configPath)) {
    throw new UserError(
      `No config found at ${configPath}.\n` +
      `Run: node collect.js setup   (interactive, one-time — discovers your account/owner/timezone via the hs CLI)`
    );
  }
  const raw = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const thresholds = Object.assign(
    { staleContactDays: 14, longInStageDays: 21, closeDateSoonDays: 7, lookbackDays: 60 },
    raw.thresholds || {}
  );
  if (!raw.ownerId) throw new UserError('config.json is missing "ownerId". Run: node collect.js setup');
  if (!raw.timezone) throw new UserError('config.json is missing "timezone". Run: node collect.js setup');
  return Object.assign({}, raw, { thresholds });
}

class UserError extends Error {}

// ---------------------------------------------------------------------------
// HubSpot CLI wrapper — the ONLY place that shells out
// ---------------------------------------------------------------------------

class HsCliError extends Error {}

function sanitize(text) {
  if (!text) return '';
  // Defensive: never let a token-shaped string leak into logs/output.
  return String(text).replace(/pat-[a-z0-9-]{20,}/gi, '[REDACTED]');
}

function hsRaw(args, { timeoutMs = 30000 } = {}) {
  const result = spawnSync('hs', args, {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 50,
    timeout: timeoutMs,
  });

  if (result.error) {
    if (result.error.code === 'ENOENT') {
      throw new HsCliError(
        'HubSpot CLI ("hs") was not found on PATH. Install it with: npm install -g @hubspot/cli'
      );
    }
    if (result.error.code === 'ETIMEDOUT') {
      throw new HsCliError(`hs ${args[0]} timed out after ${timeoutMs}ms`);
    }
    throw new HsCliError(`Failed to run hs CLI: ${sanitize(result.error.message)}`);
  }
  if (result.status !== 0) {
    const stderr = sanitize(result.stderr || '').trim();
    if (/not authenticated|no accounts|please run.*auth/i.test(stderr)) {
      throw new HsCliError('HubSpot CLI is not authenticated. Run: hs account auth');
    }
    throw new HsCliError(`hs ${args[0]} exited with code ${result.status}: ${stderr || '(no stderr)'}`);
  }
  return result.stdout;
}

function hsApi(endpoint, { method = 'GET', data, account, retries = 2 } = {}) {
  // --json (a.k.a. --format-output-as-json) makes `hs api` print bare JSON to
  // stdout instead of a human-readable "GET <url>\n\nResponse:\n<json>"
  // wrapper. Without it, JSON.parse below fails on every call.
  const args = ['api', endpoint, '--method', method, '--json'];
  if (data !== undefined) args.push('--data', JSON.stringify(data));
  if (account) args.push('--account', account);

  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const stdout = hsRaw(args);
      let parsed;
      try {
        parsed = JSON.parse(stdout);
      } catch (e) {
        throw new HsCliError(`hs api ${endpoint} returned malformed JSON`);
      }
      // hs api can exit 0 while the JSON body itself is a HubSpot error
      // envelope (e.g. { status: "error", message, correlationId }).
      if (parsed && parsed.status === 'error') {
        throw new HsCliError(`hs api ${endpoint} returned an error: ${sanitize(parsed.message || 'unknown error')}`);
      }
      return parsed;
    } catch (err) {
      lastErr = err;
      const transient = /timed out|ETIMEDOUT|rate limit|429|502|503|ECONNRESET/i.test(err.message);
      if (!transient || attempt === retries) throw err;
      const backoffMs = 500 * Math.pow(2, attempt);
      sleepSync(backoffMs);
    }
  }
  throw lastErr;
}

function sleepSync(ms) {
  const sab = new Int32Array(new SharedArrayBuffer(4));
  Atomics.wait(sab, 0, 0, ms);
}

// Generic paginator for HubSpot's `{ results: [...], paging: { next: { after } } }` shape.
function hsListAll(endpoint, { method = 'GET', body, maxPages = 20, account } = {}) {
  const results = [];
  let after;
  for (let page = 0; page < maxPages; page++) {
    const reqBody = body ? Object.assign({}, body, after ? { after } : {}) : undefined;
    const ep = reqBody ? endpoint : after ? `${endpoint}${endpoint.includes('?') ? '&' : '?'}after=${after}` : endpoint;
    const resp = hsApi(ep, { method, data: reqBody, account });
    results.push(...(resp.results || []));
    after = resp.paging && resp.paging.next && resp.paging.next.after;
    if (!after) break;
  }
  return results;
}

function batchRead(objectType, ids, properties, account) {
  const out = [];
  const chunks = chunk([...new Set(ids)].filter(Boolean), 100);
  for (const idsChunk of chunks) {
    if (idsChunk.length === 0) continue;
    const resp = hsApi(`/crm/v3/objects/${objectType}/batch/read`, {
      method: 'POST',
      data: { properties, inputs: idsChunk.map((id) => ({ id })) },
      account,
    });
    out.push(...(resp.results || []));
  }
  return out;
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// Small bounded-concurrency pool for the deep-context pass.
async function pool(items, limit, worker) {
  const results = new Array(items.length);
  let idx = 0;
  async function run() {
    while (idx < items.length) {
      const i = idx++;
      results[i] = await worker(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

// ---------------------------------------------------------------------------
// Timezone helpers (no deps)
// ---------------------------------------------------------------------------

function tzOffsetMinutes(timezone, date) {
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  return (tzDate.getTime() - utcDate.getTime()) / 60000;
}

function todayRangeUTC(timezone, now = new Date()) {
  const offsetMin = tzOffsetMinutes(timezone, now);
  const local = new Date(now.getTime() + offsetMin * 60000);
  const y = local.getUTCFullYear(), m = local.getUTCMonth(), d = local.getUTCDate();
  const startLocalMs = Date.UTC(y, m, d, 0, 0, 0);
  const endLocalMs = Date.UTC(y, m, d, 23, 59, 59, 999);
  return {
    start: new Date(startLocalMs - offsetMin * 60000),
    end: new Date(endLocalMs - offsetMin * 60000),
  };
}

function daysBetween(a, b) {
  if (!a || !b) return null;
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function parseHsTimestamp(v) {
  if (v === undefined || v === null || v === '') return null;
  // HubSpot timestamp properties are epoch millis (as strings) or ISO dates.
  if (/^\d+$/.test(String(v))) return new Date(Number(v));
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

// ---------------------------------------------------------------------------
// Collection
// ---------------------------------------------------------------------------

const DEAL_PROPERTIES = [
  'dealname', 'amount', 'dealstage', 'pipeline', 'closedate', 'createdate',
  'hs_lastmodifieddate', 'hubspot_owner_id', 'description', 'hs_is_closed',
  'hs_date_entered_current_stage', 'notes_last_contacted', 'notes_next_activity_date',
  'hs_next_step', 'hs_deal_stage_probability', 'num_associated_contacts',
];

const TASK_PROPERTIES = ['hs_task_subject', 'hs_task_status', 'hs_task_priority', 'hs_task_type', 'hs_timestamp', 'hubspot_owner_id'];
const MEETING_PROPERTIES = ['hs_meeting_title', 'hs_meeting_start_time', 'hs_meeting_end_time', 'hubspot_owner_id'];
const NOTE_PROPERTIES = ['hs_note_body', 'hs_timestamp'];
const CALL_PROPERTIES = ['hs_call_title', 'hs_call_body', 'hs_timestamp', 'hs_call_disposition'];
const EMAIL_PROPERTIES = ['hs_email_subject', 'hs_email_text', 'hs_timestamp', 'hs_email_direction'];

// Pipeline/stage metadata is used only for human-readable stage/pipeline
// labels — deal *filtering* below relies on the standalone `hs_is_closed`
// deal property instead, so a pipeline-metadata failure never blocks
// fetching deals. This matters in practice: the v3 pipelines endpoint
// returns 403 ("User level OAuth token is not allowed for this endpoint")
// for some personal-access-key-derived CLI tokens even though deal search
// works fine, so we fall back to the older v1 pipelines endpoint, and if
// that also fails we just proceed without labels (raw stage/pipeline ids).
function fetchPipelines(account, warnings) {
  try {
    const resp = hsApi('/crm/v3/pipelines/deals', { account });
    return (resp.results || []).map((pl) => ({
      pipelineId: pl.id,
      label: pl.label,
      stages: (pl.stages || []).map((s) => ({ stageId: s.id, label: s.label, metadata: s.metadata })),
    }));
  } catch (e) {
    try {
      const resp = hsApi('/crm-pipelines/v1/pipelines/deals', { account });
      return (resp.results || []).map((pl) => ({
        pipelineId: pl.pipelineId,
        label: pl.label,
        stages: (pl.stages || []).map((s) => ({ stageId: s.stageId, label: s.label, metadata: s.metadata })),
      }));
    } catch (e2) {
      warnings.push(
        `Could not retrieve pipeline/stage metadata (deal stages will show as raw ids instead of labels): ${sanitize(e2.message)}`
      );
      return [];
    }
  }
}

function stageLookup(pipelines) {
  const map = new Map();
  for (const pl of pipelines) {
    for (const stage of pl.stages || []) {
      const meta = stage.metadata || {};
      const isClosed = meta.isClosed !== undefined ? String(meta.isClosed) === 'true' : [0, 1].includes(parseFloat(meta.probability));
      const isWon = parseFloat(meta.probability) === 1;
      map.set(stage.stageId, {
        id: stage.stageId,
        label: stage.label,
        pipelineId: pl.pipelineId,
        pipelineLabel: pl.label,
        isClosed,
        isWon,
      });
    }
  }
  return map;
}

function fetchOpenDeals(ownerId, account) {
  const body = {
    filterGroups: [{
      filters: [
        { propertyName: 'hubspot_owner_id', operator: 'EQ', value: ownerId },
        { propertyName: 'hs_is_closed', operator: 'EQ', value: 'false' },
      ],
    }],
    properties: DEAL_PROPERTIES,
    sorts: [{ propertyName: 'amount', direction: 'DESCENDING' }],
    limit: 100,
  };
  return hsListAll('/crm/v3/objects/deals/search', { method: 'POST', body, maxPages: 10, account });
}

function fetchOpenTasks(ownerId, account) {
  const body = {
    filterGroups: [{
      filters: [
        { propertyName: 'hubspot_owner_id', operator: 'EQ', value: ownerId },
        { propertyName: 'hs_task_status', operator: 'NEQ', value: 'COMPLETED' },
      ],
    }],
    properties: TASK_PROPERTIES,
    sorts: [{ propertyName: 'hs_timestamp', direction: 'ASCENDING' }],
    limit: 100,
  };
  return hsListAll('/crm/v3/objects/tasks/search', { method: 'POST', body, maxPages: 5, account });
}

function fetchMeetingsToday(ownerId, timezone, account) {
  const { start, end } = todayRangeUTC(timezone);
  const body = {
    filterGroups: [{
      filters: [
        { propertyName: 'hubspot_owner_id', operator: 'EQ', value: ownerId },
        { propertyName: 'hs_meeting_start_time', operator: 'GTE', value: String(start.getTime()) },
        { propertyName: 'hs_meeting_start_time', operator: 'LTE', value: String(end.getTime()) },
      ],
    }],
    properties: MEETING_PROPERTIES,
    sorts: [{ propertyName: 'hs_meeting_start_time', direction: 'ASCENDING' }],
    limit: 100,
  };
  return hsListAll('/crm/v3/objects/meetings/search', { method: 'POST', body, maxPages: 3, account });
}

function fetchAssociatedIds(objectType, objectId, toObjectType, account) {
  try {
    const resp = hsApi(`/crm/v4/objects/${objectType}/${objectId}/associations/${toObjectType}`, { account });
    return (resp.results || []).map((r) => r.toObjectId);
  } catch (e) {
    return [];
  }
}

function fetchDealEngagements(dealId, lookbackDate, account) {
  const notesIds = fetchAssociatedIds('deals', dealId, 'notes', account);
  const callIds = fetchAssociatedIds('deals', dealId, 'calls', account);
  const emailIds = fetchAssociatedIds('deals', dealId, 'emails', account);

  const notes = batchRead('notes', notesIds, NOTE_PROPERTIES, account);
  const calls = batchRead('calls', callIds, CALL_PROPERTIES, account);
  const emails = batchRead('emails', emailIds, EMAIL_PROPERTIES, account);

  const timeline = [];
  for (const n of notes) timeline.push(normalizeEngagement('NOTE', n.properties.hs_timestamp, n.properties.hs_note_body));
  for (const c of calls) timeline.push(normalizeEngagement('CALL', c.properties.hs_timestamp, c.properties.hs_call_body || c.properties.hs_call_title, c.properties.hs_call_disposition));
  for (const e of emails) timeline.push(normalizeEngagement('EMAIL', e.properties.hs_timestamp, e.properties.hs_email_text || e.properties.hs_email_subject, e.properties.hs_email_direction));

  return timeline
    .filter((t) => t.at && t.at >= lookbackDate)
    .sort((a, b) => b.at - a.at)
    .slice(0, 15);
}

function normalizeEngagement(type, ts, body, meta) {
  const at = parseHsTimestamp(ts);
  return { type, at, summary: truncate(stripHtml(body), 400), meta: meta || null };
}

function stripHtml(s) {
  if (!s) return '';
  return String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function truncate(s, n) {
  if (!s) return '';
  return s.length > n ? s.slice(0, n) + '…' : s;
}

// ---------------------------------------------------------------------------
// Normalization + scoring
// ---------------------------------------------------------------------------

function normalizeDeal(raw, stages, ownerId, now) {
  const p = raw.properties || {};
  const stage = stages.get(p.dealstage) || { id: p.dealstage, label: p.dealstage, pipelineLabel: p.pipeline };
  const amount = p.amount ? Number(p.amount) : null;
  const closeDate = parseHsTimestamp(p.closedate);
  const stageEnteredAt = parseHsTimestamp(p.hs_date_entered_current_stage);
  const lastContactedAt = parseHsTimestamp(p.notes_last_contacted);
  const nextActivityAt = parseHsTimestamp(p.notes_next_activity_date);
  const stageAgeEstimated = !stageEnteredAt;
  const stageEnteredEffective = stageEnteredAt || parseHsTimestamp(p.createdate);

  return {
    id: raw.id,
    name: p.dealname || '(unnamed deal)',
    amount,
    stage: { id: stage.id, label: stage.label, pipeline: stage.pipelineLabel },
    closeDate: closeDate ? closeDate.toISOString() : null,
    createdAt: parseHsTimestamp(p.createdate),
    daysInStage: stageEnteredEffective ? daysBetween(stageEnteredEffective, now) : null,
    stageAgeEstimated,
    lastContactedAt: lastContactedAt ? lastContactedAt.toISOString() : null,
    daysSinceLastContact: lastContactedAt ? daysBetween(lastContactedAt, now) : null,
    nextActivityAt: nextActivityAt ? nextActivityAt.toISOString() : null,
    hasFutureActivity: !!(nextActivityAt && nextActivityAt.getTime() > now.getTime()),
    nextStep: p.hs_next_step || null,
    description: truncate(p.description, 300) || null,
    contactCount: p.num_associated_contacts ? Number(p.num_associated_contacts) : 0,
    closeDateObj: closeDate,
  };
}

function computeSignals(deal, tasksByDeal, meetingIdsToday, cfg, now) {
  const signals = [];
  const t = cfg.thresholds;

  const linkedTasks = tasksByDeal.get(deal.id) || [];
  const overdueTasks = linkedTasks.filter((task) => task.due && task.due.getTime() < now.getTime());
  const hasOverdueTask = overdueTasks.length > 0;
  const hasMeetingToday = meetingIdsToday.has(deal.id);
  const closeDatePast = deal.closeDateObj && deal.closeDateObj.getTime() < now.getTime();
  const closeDateSoon = deal.closeDateObj && !closeDatePast &&
    daysBetween(now, deal.closeDateObj) <= t.closeDateSoonDays;
  const staleContact = deal.daysSinceLastContact === null || deal.daysSinceLastContact > t.staleContactDays;
  const longInStage = deal.daysInStage !== null && deal.daysInStage > t.longInStageDays;

  if (hasMeetingToday) signals.push('MEETING_TODAY');
  if (hasOverdueTask) signals.push('OVERDUE_TASK');
  if (closeDatePast) signals.push('CLOSE_DATE_PAST');
  else if (closeDateSoon) signals.push('CLOSE_DATE_SOON');
  if (!deal.hasFutureActivity) signals.push('NO_NEXT_ACTIVITY');
  if (staleContact) signals.push('STALE_CONTACT');
  if (longInStage) signals.push('LONG_IN_STAGE');
  if (!deal.nextStep) signals.push('MISSING_NEXT_STEP');
  if (deal.contactCount === 0) signals.push('NO_ASSOCIATED_CONTACT');

  const isStalled = longInStage && (staleContact || !deal.hasFutureActivity);
  if (isStalled) signals.push('STALLED');

  return { signals, hasOverdueTask, hasMeetingToday, isStalled, overdueTasks };
}

function scoreDeal(deal, sig, amountPercentile, cfg) {
  let urgency = 0;
  if (sig.hasMeetingToday) urgency += 15;
  if (sig.hasOverdueTask) urgency += 10;
  if (sig.signals.includes('CLOSE_DATE_PAST')) urgency += 10;
  else if (sig.signals.includes('CLOSE_DATE_SOON')) urgency += 8;
  if (sig.signals.includes('CLOSE_DATE_SOON') && sig.signals.includes('NO_NEXT_ACTIVITY')) urgency += 5;
  urgency = Math.min(urgency, 35);

  const economic = Math.round(amountPercentile * 25);

  let risk = 0;
  if (sig.isStalled) risk += 12;
  if (sig.signals.includes('LONG_IN_STAGE')) risk += 5;
  if (sig.signals.includes('STALE_CONTACT')) risk += 5;
  if (sig.signals.includes('NO_NEXT_ACTIVITY')) risk += 5;
  if (sig.signals.includes('CLOSE_DATE_PAST')) risk += 5;
  risk = Math.min(risk, 25);

  let actionability = 5;
  if (deal.contactCount > 0) actionability += 5;
  if (deal.nextStep) actionability += 3;
  if (deal.amount) actionability += 2;
  actionability = Math.min(actionability, 15);

  return {
    total: urgency + economic + risk + actionability,
    breakdown: { urgency, economic, risk, actionability },
  };
}

function percentileRank(values, value) {
  if (value === null || value === undefined || values.length === 0) return 0;
  const sorted = [...values].filter((v) => v !== null).sort((a, b) => a - b);
  const idx = sorted.findIndex((v) => v >= value);
  if (idx === -1) return 1;
  return sorted.length <= 1 ? 1 : idx / (sorted.length - 1);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function collectLive(cfg, account) {
  const now = new Date();
  const warnings = [];

  const pipelines = fetchPipelines(account, warnings);
  const stages = stageLookup(pipelines);

  const rawDeals = fetchOpenDeals(cfg.ownerId, account);
  const rawTasks = fetchOpenTasks(cfg.ownerId, account);
  const rawMeetings = fetchMeetingsToday(cfg.ownerId, cfg.timezone, account);

  if (rawDeals.length === 0) warnings.push('No open deals found for this owner. Check the configured ownerId.');

  const deals = rawDeals.map((d) => normalizeDeal(d, stages, cfg.ownerId, now));

  // Associate tasks -> deals (best effort, via task->deal associations).
  const tasksByDeal = new Map();
  const meetingIdsToday = new Set();
  const dealIdSet = new Set(deals.map((d) => d.id));

  await pool(rawTasks, 6, async (task) => {
    const p = task.properties || {};
    const due = parseHsTimestamp(p.hs_timestamp);
    const assocDealIds = fetchAssociatedIds('tasks', task.id, 'deals', account).filter((id) => dealIdSet.has(id));
    for (const dealId of assocDealIds) {
      if (!tasksByDeal.has(dealId)) tasksByDeal.set(dealId, []);
      tasksByDeal.get(dealId).push({
        id: task.id,
        subject: p.hs_task_subject,
        priority: p.hs_task_priority,
        due,
      });
    }
  });

  const meetingsToday = await pool(rawMeetings, 6, async (m) => {
    const p = m.properties || {};
    const dealIds = fetchAssociatedIds('meetings', m.id, 'deals', account).filter((id) => dealIdSet.has(id));
    const contactIds = fetchAssociatedIds('meetings', m.id, 'contacts', account);
    const companyIds = fetchAssociatedIds('meetings', m.id, 'companies', account);
    for (const id of dealIds) meetingIdsToday.add(id);
    return {
      id: m.id,
      title: p.hs_meeting_title || '(untitled meeting)',
      startTime: parseHsTimestamp(p.hs_meeting_start_time),
      endTime: parseHsTimestamp(p.hs_meeting_end_time),
      dealIds,
      contactIds,
      companyIds,
    };
  });

  // Score pass 1 (broad).
  const amounts = deals.map((d) => d.amount);
  const scored = deals.map((deal) => {
    const sig = computeSignals(deal, tasksByDeal, meetingIdsToday, cfg, now);
    const pct = percentileRank(amounts, deal.amount);
    const score = scoreDeal(deal, sig, pct, cfg);
    return { deal, sig, score };
  });

  scored.sort((a, b) => b.score.total - a.score.total);

  // Pass 2 (deep): top candidates + every deal tied to a meeting today.
  const topN = 25;
  const deepIds = new Set(scored.slice(0, topN).map((s) => s.deal.id));
  for (const id of meetingIdsToday) deepIds.add(id);

  const lookbackDate = new Date(now.getTime() - cfg.thresholds.lookbackDays * 86400000);
  const timelines = new Map();
  await pool([...deepIds], 4, async (dealId) => {
    try {
      timelines.set(dealId, fetchDealEngagements(dealId, lookbackDate, account));
    } catch (e) {
      warnings.push(`Could not fetch activity history for deal ${dealId}: ${sanitize(e.message)}`);
      timelines.set(dealId, []);
    }
  });

  const finalDeals = scored.map(({ deal, sig, score }) => ({
    id: deal.id,
    name: deal.name,
    amount: deal.amount,
    stage: deal.stage,
    closeDate: deal.closeDate,
    daysInStage: deal.daysInStage,
    stageAgeEstimated: deal.stageAgeEstimated,
    lastContactedAt: deal.lastContactedAt,
    daysSinceLastContact: deal.daysSinceLastContact,
    nextActivityAt: deal.nextActivityAt,
    nextStep: deal.nextStep,
    description: deal.description,
    signals: sig.signals,
    overdueTasks: sig.overdueTasks.map((t) => ({ subject: t.subject, priority: t.priority, due: t.due ? t.due.toISOString() : null })),
    basePriorityScore: score.total,
    scoreBreakdown: score.breakdown,
    recentTimeline: (timelines.get(deal.id) || []).map((t) => ({
      type: t.type,
      at: t.at ? t.at.toISOString() : null,
      summary: t.summary,
      meta: t.meta,
    })),
  }));

  const overdueTaskCount = rawTasks.filter((t) => {
    const due = parseHsTimestamp((t.properties || {}).hs_timestamp);
    return due && due.getTime() < now.getTime();
  }).length;

  const summary = {
    activeDealCount: deals.length,
    activePipelineValue: sumAmounts(deals),
    closingNext14Days: sumAmounts(deals.filter((d) => d.closeDateObj && daysBetween(now, d.closeDateObj) >= 0 && daysBetween(now, d.closeDateObj) <= 14)),
    meetingsToday: meetingsToday.length,
    overdueTasks: overdueTaskCount,
    stalledDeals: finalDeals.filter((d) => d.signals.includes('STALLED')).length,
    dealsWithNoNextActivity: finalDeals.filter((d) => d.signals.includes('NO_NEXT_ACTIVITY')).length,
  };

  return {
    generatedAt: now.toISOString(),
    timezone: cfg.timezone,
    owner: { id: cfg.ownerId, name: cfg.ownerName || null },
    summary,
    deals: finalDeals,
    tasks: rawTasks.map((t) => {
      const p = t.properties || {};
      return {
        id: t.id,
        subject: p.hs_task_subject,
        status: p.hs_task_status,
        priority: p.hs_task_priority,
        due: parseHsTimestamp(p.hs_timestamp) ? parseHsTimestamp(p.hs_timestamp).toISOString() : null,
      };
    }),
    meetingsToday: meetingsToday.map((m) => ({
      id: m.id,
      title: m.title,
      startTime: m.startTime ? m.startTime.toISOString() : null,
      endTime: m.endTime ? m.endTime.toISOString() : null,
      dealIds: m.dealIds,
    })),
    capabilities: {
      stageEntryDateAvailable: deals.some((d) => !d.stageAgeEstimated),
      nextStepPropertyAvailable: deals.some((d) => !!d.nextStep),
      lastContactedAvailable: deals.some((d) => !!d.lastContactedAt),
    },
    warnings,
  };
}

function sumAmounts(deals) {
  return deals.reduce((sum, d) => sum + (d.amount || 0), 0);
}

function loadSample() {
  const raw = JSON.parse(fs.readFileSync(path.join(__dirname, 'sample-data.json'), 'utf8'));
  return raw;
}

// ---------------------------------------------------------------------------
// Setup — interactive, discovers as much as possible via the hs CLI/API
// instead of asking the user to hand-write config.json.
// ---------------------------------------------------------------------------

function detectLocalEmail() {
  if (process.env.HUBSPOT_MORNING_EMAIL) return process.env.HUBSPOT_MORNING_EMAIL;
  try {
    const r = spawnSync('git', ['config', '--global', 'user.email'], { encoding: 'utf8' });
    const email = r.status === 0 ? r.stdout.trim() : '';
    return email || null;
  } catch (e) {
    return null;
  }
}

// Best-effort: some hs CLI versions support `--format json` on `account list`.
// If it's not supported (or output isn't parseable), we just fall back to
// showing the human-readable table and asking — never a hard failure.
function tryDetectSingleAccount() {
  try {
    const r = spawnSync('hs', ['account', 'list', '--format', 'json'], { encoding: 'utf8', timeout: 10000 });
    if (r.status !== 0 || !r.stdout) return null;
    const parsed = JSON.parse(r.stdout);
    const list = Array.isArray(parsed) ? parsed : parsed.accounts || parsed.results || parsed.portals;
    if (Array.isArray(list) && list.length === 1) {
      const a = list[0];
      return a.name || a.accountId || a.portalId || null;
    }
  } catch (e) {
    // Non-JSON output or flag unsupported — fine, setup falls back to asking.
  }
  return null;
}

async function runSetup(configPath) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    console.log('HubSpot Morning Briefing — setup\n');

    const versionCheck = spawnSync('hs', ['--version'], { encoding: 'utf8' });
    if (versionCheck.error) {
      throw new UserError('HubSpot CLI ("hs") not found on PATH. Install it with: npm install -g @hubspot/cli');
    }
    console.log(`Found HubSpot CLI (${(versionCheck.stdout || '').trim() || 'version unknown'}).\n`);

    console.log('Your configured HubSpot accounts (from `hs account list`):\n');
    const accountsOut = spawnSync('hs', ['account', 'list'], { encoding: 'utf8' });
    if (accountsOut.stdout) console.log(accountsOut.stdout.trim() + '\n');
    if (accountsOut.status !== 0) {
      throw new UserError('Could not list HubSpot accounts. Run `hs account auth` first, then re-run setup.');
    }

    const autoAccount = tryDetectSingleAccount();
    const accountPrompt = autoAccount
      ? `Press Enter to use "${autoAccount}", or type a different account name/id: `
      : 'If you use more than one HubSpot account, type the account name/id to use (or press Enter for the CLI default): ';
    const accountAnswer = (await rl.question(accountPrompt)).trim();
    const account = accountAnswer || autoAccount || null;

    console.log('\nLooking up HubSpot owners (GET /crm/v3/owners)...');
    const owners = hsListAll('/crm/v3/owners', { maxPages: 5, account });
    if (owners.length === 0) {
      throw new UserError('No owners returned. Check that your Personal Access Key includes owners read access.');
    }

    const email = detectLocalEmail();
    const matches = email ? owners.filter((o) => (o.email || '').toLowerCase() === email.toLowerCase()) : [];

    let chosen;
    if (matches.length === 1) {
      const o = matches[0];
      const label = `${o.firstName || ''} ${o.lastName || ''}`.trim() || o.email;
      const answer = (await rl.question(
        `\nDetected you as: ${label} <${o.email}> (owner id ${o.id}). Press Enter to confirm, or type a different owner id: `
      )).trim();
      chosen = answer ? owners.find((o2) => String(o2.id) === answer) : o;
      if (!chosen) throw new UserError(`No owner with id ${answer}.`);
    } else {
      console.log(
        matches.length > 1
          ? '\nMore than one owner matched your local git email — pick yours:\n'
          : '\nCould not auto-detect which owner is you (no local git email match). Owners on this account:\n'
      );
      owners.forEach((o, i) => {
        const label = `${o.firstName || ''} ${o.lastName || ''}`.trim() || '(no name)';
        console.log(`  ${i + 1}) ${label} <${o.email || 'no email'}> — id ${o.id}`);
      });
      const answer = (await rl.question('\nWhich number are you? ')).trim();
      chosen = owners[Number(answer) - 1];
      if (!chosen) throw new UserError('Invalid selection.');
    }

    const detectedTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzAnswer = (await rl.question(
      `\nDetected timezone: ${detectedTz}. Press Enter to accept, or type an IANA timezone name: `
    )).trim();
    const timezone = tzAnswer || detectedTz;

    const config = {
      account,
      ownerId: chosen.id,
      ownerName: `${chosen.firstName || ''} ${chosen.lastName || ''}`.trim() || chosen.email || null,
      timezone,
      thresholds: { staleContactDays: 14, longInStageDays: 21, closeDateSoonDays: 7, lookbackDays: 60 },
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
    console.log(`\nSaved ${configPath}.`);
    console.log('No HubSpot credential was written to it — just your owner id, timezone, and account selection.');
    console.log('Run `node collect.js` to fetch your morning briefing data, or ask Claude for your HubSpot morning briefing.');
  } finally {
    rl.close();
  }
}

async function main() {
  const argv = process.argv.slice(2);

  if (argv[0] === 'setup') {
    const args = parseArgs(argv.slice(1));
    try {
      await runSetup(args.config);
    } catch (err) {
      if (err instanceof UserError || err instanceof HsCliError) {
        process.stderr.write(`Error: ${sanitize(err.message)}\n`);
        process.exit(1);
      }
      process.stderr.write(`Unexpected error: ${sanitize(err.stack || err.message)}\n`);
      process.exit(1);
    }
    return;
  }

  const args = parseArgs(argv);

  try {
    let result;
    if (args.sample) {
      result = loadSample();
    } else {
      const cfg = loadConfig(args.config);
      if (args.ownerOverride) cfg.ownerId = args.ownerOverride;
      result = await collectLive(cfg, cfg.account);
    }
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  } catch (err) {
    if (err instanceof UserError || err instanceof HsCliError) {
      process.stderr.write(`Error: ${sanitize(err.message)}\n`);
      process.exit(1);
    }
    process.stderr.write(`Unexpected error: ${sanitize(err.stack || err.message)}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
