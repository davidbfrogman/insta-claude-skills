# HubSpot API notes for this collector

Everything below is what `collect.js` assumes about the HubSpot CRM v3/v4
API. This project talks to HubSpot **exclusively** through
`hs api <endpoint> --method <METHOD> --json --data '<json>'` (the official
`@hubspot/cli`) — never a direct HTTP call, never `@hubspot/api-client`.

Items marked **(verified live)** were confirmed against a real HubSpot portal
during development, not just assumed from docs.

## `hs api` output format — important

`hs api` without `--json` prints a human-readable wrapper (`GET <url>` +
`Response:` + the JSON body), which is not valid JSON on its own. **Always
pass `--json` (a.k.a. `--format-output-as-json`)** to get bare JSON on
stdout — `hsApi()` in `collect.js` does this on every call. **(verified live)**

Also **(verified live)**: with `--json`, `hs api` exits non-zero when
HubSpot's API itself returns an error body (e.g. a 403), so checking the
process exit code is reliable. As a second line of defense, `hsApi()` also
treats a parsed body shaped like `{ "status": "error", "message": ... }` as
a failure even if the exit code were ever 0, since that's HubSpot's standard
error envelope.

## Endpoints used (all read-only)

| Purpose | Endpoint |
|---|---|
| Pipelines + stages (labels only, see below) | `GET /crm/v3/pipelines/deals`, falls back to `GET /crm-pipelines/v1/pipelines/deals` |
| Open deals for owner | `POST /crm/v3/objects/deals/search` |
| Open tasks for owner | `POST /crm/v3/objects/tasks/search` |
| Today's meetings for owner | `POST /crm/v3/objects/meetings/search` |
| Associations (deal→notes/calls/emails, task/meeting→deal) | `GET /crm/v4/objects/{type}/{id}/associations/{toType}` |
| Batch-read engagement bodies | `POST /crm/v3/objects/{notes\|calls\|emails}/batch/read` |

## Pipelines endpoint: v3 can 403 for personal-access-key CLI auth

**(verified live)**: `GET /crm/v3/pipelines/deals` returned
`403 { "status": "error", "message": "User level OAuth token is not allowed
for this endpoint." }` when called via a personal-access-key-derived `hs`
CLI session, even though deal/task/meeting search all worked fine on the
same token. The older `GET /crm-pipelines/v1/pipelines/deals` endpoint
worked and returns the same information (pipeline label, stage label,
`stageId`, `metadata.isClosed`, `metadata.probability`) in a slightly
different shape (`stageId` instead of `id`, `pipelineId` instead of `id` at
the pipeline level).

Because of this, `fetchPipelines()` in `collect.js` tries v3 first and falls
back to v1 automatically, and — critically — **deal filtering does not
depend on pipeline metadata at all.** Pipeline/stage data is used purely to
attach human-readable labels to deals after the fact; if both endpoints fail,
deals still get fetched correctly, just with raw stage/pipeline ids instead
of labels (and a warning is added to the output).

## Open/closed deal filtering

**(verified live)**: `hs_is_closed` is a standard calculated deal property
(`"true"`/`"false"` string) present on every deal regardless of pipeline
customization, and it responds correctly to a search filter
(`{ propertyName: "hs_is_closed", operator: "EQ", value: "false" }`). This is
what `fetchOpenDeals()` actually filters on — it's simpler and more robust
than deriving an "open stage id" list from pipeline metadata (which, per
above, isn't always reachable), and it was confirmed to correctly exclude a
deal with `hubspot_owner_id: null` while including the owner's real open
deal.

## Property assumptions

Deal properties requested: `dealname`, `amount`, `dealstage`, `pipeline`,
`closedate`, `createdate`, `hubspot_owner_id`, `description`, `hs_is_closed`,
`hs_date_entered_current_stage`, `notes_last_contacted`,
`notes_next_activity_date`, `hs_next_step`, `hs_deal_stage_probability`,
`num_associated_contacts`.

These are default/standard HubSpot properties, but **portal customization
varies** (see `capabilities` in the collector output). If a property is
missing or null for every deal, the collector degrades gracefully:
- No `hs_date_entered_current_stage` → falls back to `createdate` for
  `daysInStage` and marks `stageAgeEstimated: true` on that deal. Confirmed
  live on a brand-new deal where this property was in fact empty.
- No `hs_next_step` → `nextStep` is `null`, contributes to the
  `MISSING_NEXT_STEP` signal instead of breaking anything.

"Stalled" is computed transparently from `LONG_IN_STAGE` + (`STALE_CONTACT`
or `NO_NEXT_ACTIVITY`), with both thresholds configurable in `config.json`
under `thresholds` — not from a portal-specific predictive/stalled property,
since those are plan-dependent and weren't assumed here. If your portal
exposes a genuine predictive score you rely on, that's the natural next
extension point — add it to `DEAL_PROPERTIES` in `collect.js` and fold it
into `computeSignals`/`scoreDeal`.

## Things worth double-checking against current HubSpot docs before relying on this in production

- Exact default property internal names can drift by portal/API version.
  Run `hs api /crm/v3/properties/deals --method GET --json` to see what's
  actually available on your portal, and adjust `DEAL_PROPERTIES` in
  `collect.js` if something you rely on has a different internal name.
- The v3-vs-v1 pipelines 403 behavior above was observed on one sandbox
  portal/PAK combination. It's possible other PAK scope configurations do
  have v3 pipeline access — the v3-first-then-v1 fallback handles both cases
  either way, so this shouldn't need revisiting unless HubSpot deprecates v1.
- Rate limits: this collector does not implement anything beyond a small
  fixed retry/backoff for transient failures. For portals with hundreds of
  deals, the deep pass (pass 2) is capped to the top ~25 candidate deals plus
  every deal tied to a meeting today, specifically to keep total request
  volume reasonable — see `topN` in `collect.js`.

This file exists so both Claude and future-you can extend the collector
without re-deriving these assumptions from scratch. It intentionally is not
exhaustive API reference documentation — see developers.hubspot.com for that.
