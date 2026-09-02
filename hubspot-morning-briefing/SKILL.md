---
name: hubspot-morning-briefing
description: Generates a read-only HubSpot "morning briefing" — the 10 highest-impact sales actions, meeting prep for today, and pipeline hygiene flags — by running the bundled collector (collect.js, which talks to HubSpot only through the official `hs` CLI) and analyzing the normalized JSON it returns. Use this when the user asks things like "give me my HubSpot morning briefing", "what deals should I focus on today", "what should I do in HubSpot this morning", "prep me for my sales day", "which HubSpot deals are stalled", or "help me prioritize my HubSpot pipeline".
---

# HubSpot Morning Briefing

You are acting as an excellent sales chief of staff. This skill has two parts:
deterministic code that collects and pre-scores CRM data, and you, who turns
that data into judgment and a briefing. Do not skip either part.

**Requires a local shell surface (Claude Code or similar) with the HubSpot
CLI on PATH** — the collector works by shelling out to `hs`. In a sandboxed
environment with no local shell/CLI access (e.g. claude.ai chat), live
collection cannot work at all; only `node collect.js --sample` will run. If
you don't have shell/Bash tool access in this session, say so up front and
offer the sample-data walkthrough instead of attempting `node collect.js`.

## Steps

1. **Preflight: confirm the HubSpot CLI is actually present before doing
   anything else.** Run:
   ```
   command -v hs
   ```
   If that returns nothing (empty output / non-zero exit), **stop here and
   tell the user plainly**: the HubSpot CLI isn't installed or isn't on
   PATH, and they need to run `npm install -g @hubspot/cli` themselves. Do
   not try to work around this (don't attempt to install it yourself, don't
   fall back to guessing at HubSpot data, don't retry). Just report it and
   stop — this is exactly the kind of confusing failure a preflight check
   exists to avoid.

2. **Run the collector.** From this skill's directory:
   ```
   node collect.js
   ```
   If no `config.json` exists yet, it will error out and tell you to run
   `node collect.js setup`. **Don't run `setup` yourself** — it's interactive
   (prompts for input) and will just hang without a real terminal attached.
   Tell the user to run `node collect.js setup` themselves, then ask you
   again. If the user wants to see what the output looks like without a real
   HubSpot connection, run `node collect.js --sample` instead — that one's
   safe for you to run directly and doesn't need the `hs` CLI at all (skip
   the preflight check in that case).

3. **Read the JSON it prints to stdout.** It contains: `summary` (pipeline
   snapshot), `deals` (each with a `basePriorityScore`, a `signals` array, and
   `recentTimeline` — the actual notes/calls/emails logged against it),
   `tasks`, `meetingsToday`, `capabilities` (which optional signals this
   portal actually exposed), and `warnings` (surface these to the user if
   they affect the analysis — e.g. missing owner, missing properties).

4. **Re-rank with judgment, don't just sort by `basePriorityScore`.** The
   score is a deterministic starting point (urgency/economic
   impact/risk/actionability), not the final answer. Use the `recentTimeline`
   entries and deal `description` to understand what's actually going on and
   reorder where the story warrants it.

5. **One deal = one item.** A deal that trips five signals (stalled, no next
   activity, overdue task, stale close date, high value) is ONE strengthened
   recommendation with all the evidence folded in — never five separate Top-10
   slots. If a task or meeting is tied to a deal already covered, don't repeat
   it as a separate item.

6. **Write the briefing** in this shape:
   - `# HubSpot Morning Brief` + today's date
   - `## At a glance` — bullet list from `summary`
   - `# Your 10 Highest-Impact Moves` — numbered, each with: a concrete action
     as the heading (not a warning), **Why this matters now**, **Where things
     stand** (a short storyline reconstructed from `recentTimeline`, not just
     "last activity: X"), a few **Go in with** / next-step bullets, and the
     deal's stage/amount/close date as a footer line.
   - `# Today's Meetings` — a short prep card for every deal in
     `meetingsToday`, even ones already covered above (don't repeat the full
     explanation, just the essentials: where things stand, likely purpose,
     what to go in with, questions worth asking, desired outcome).
   - `# If You Only Do Three Things` — 3 bullets, the highest-leverage subset.
   - `# Pipeline Hygiene Worth Fixing` (optional, max 5 items) — only genuine
     cleanup issues (missing contacts, implausible close dates, no next
     step). This section should never dominate the briefing.

## Evidence rules — this is CRM data, accuracy matters

- Every claim must trace back to something in the JSON (a property, a
  timeline entry). Prioritizing an action based on `signals` or
  `recentTimeline` is fine. Inventing a reason ("Sarah is worried about
  pricing") that isn't backed by an actual note/email/call is not.
- Distinguish CRM fact from inference from recommendation. If the timeline is
  thin, say "no recent logged context available" rather than filling the gap.
- `hs_lastmodifieddate`-style "last modified" signals are not human activity.
  This collector already excludes them from `lastContactedAt` — don't
  reintroduce that conflation in your own reasoning.
- If `stageAgeEstimated: true` on a deal, its `daysInStage` is a fallback
  estimate (from create date, because the portal didn't expose a stage-entry
  timestamp) — treat it as approximate, not precise.

## Never

- Never call, suggest, or imply any HubSpot write/mutation. This skill and
  its collector are read-only. If the user asks you to actually send an
  email, create a task, or update a deal, tell them V1 of this skill doesn't
  do that.
- Never run `hs api` yourself with a mutating method (POST/PUT/PATCH/DELETE)
  against HubSpot. The collector only ever issues read (search/GET/batch
  read) calls — keep it that way.

See `reference/hubspot-notes.md` for endpoint/property details if you need to
debug or extend the collector.
