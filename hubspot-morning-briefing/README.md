# HubSpot Morning Briefing

**MVP / quick-and-dirty version.** Every morning, ask Claude Code:

> Give me my HubSpot morning briefing.

and get back the 10 highest-impact things to do based on the actual state of
your HubSpot pipeline — not a dump of stale deals, but "call Sarah at Acme
this morning, here's why, here's what happened last time you talked."

This is read-only (V1 makes zero HubSpot writes) and deliberately small:
one plain Node script, no build step, no test suite, no installer. It's meant
to prove the concept end to end before anyone invests in a "real" packaged
version.

## How it works

- `collect.js` is a single Node script that pulls your open deals, open
  tasks, and today's meetings from HubSpot, normalizes them, and computes a
  transparent, explainable priority score for each deal (urgency / economic
  impact / deal risk / actionability). It prints one JSON document to stdout.
- It talks to HubSpot **only** through the official `hs` CLI
  (`@hubspot/cli`) — specifically `hs api <endpoint> --method <method>`.
  No HubSpot SDK, no direct HTTP requests, no credentials ever touch this
  project. Auth is 100% owned by the HubSpot CLI.
- `SKILL.md` tells Claude Code how to run the collector and turn its output
  into an actual briefing — the reasoning, storylines, and prioritization
  judgment happen in Claude, not in the script.

## Requirements

- Node.js 18+
- The official HubSpot CLI: `npm install -g @hubspot/cli`
- A HubSpot account with read access to deals, contacts, companies, owners,
  tasks, and meetings (see **Permissions** below)

## HubSpot authentication

This project never sees your HubSpot credential. Authentication is entirely
the HubSpot CLI's job:

```bash
hs account auth
```

This prompts you to connect a Personal Access Key (HubSpot → Settings →
Integrations → Private Apps, or Development → Keys → Personal Access Key,
depending on your portal) and stores it in the CLI's own config
(`~/.hscli/config.yml`), not in this project. If you manage multiple HubSpot
accounts:

```bash
hs account list
hs account use <accountNameOrId>
```

## Permissions

Grant read access (at minimum) for:
- Deals (`crm.objects.deals.read`)
- Contacts (`crm.objects.contacts.read`)
- Companies (`crm.objects.companies.read`)
- Owners (`crm.objects.owners.read`)
- Tasks / engagements (notes, calls, emails, meetings) read access

If a scope is missing, the affected `hs api` calls will fail with a
permissions error, which `collect.js` surfaces in its `warnings` array
instead of crashing.

## Install

```bash
git clone <this repo, or just keep this folder>
cd hubspot-morning-briefing
```

There's no npm install step — `collect.js` only uses Node built-ins.

## Setup

1. Authenticate: `hs account auth` (see above).
2. Run the interactive setup — it discovers everything itself via the `hs`
   CLI, you just confirm:
   ```bash
   node collect.js setup
   ```
   This runs `hs account list` and shows it to you (in case you manage more
   than one HubSpot account — press Enter to use the CLI's default), then
   calls `GET /crm/v3/owners` and tries to auto-match you by your local git
   email; if that doesn't find a unique match it just lists the owners on
   the account and asks which one is you. Timezone is auto-detected from your
   machine (`Intl.DateTimeFormat().resolvedOptions().timeZone`) — press Enter
   to accept it or type a different IANA name. It then writes `config.json`.

   Run this yourself in a real terminal — it's interactive, so don't ask
   Claude to run `setup` for you (there's no TTY for it to type into and it
   will just hang).
3. Try it: `node collect.js | head -50` — you should get JSON, not an error.

No HubSpot credential is ever written to `config.json` — only your owner id,
timezone, and account selection (`config.example.json` shows the shape it
produces, purely for reference — you don't need to hand-edit it).

## Usage with Claude Code

Install this folder as a Claude Code skill (personal skills live in
`~/.claude/skills/`, project skills in `<project>/.claude/skills/`):

```bash
mkdir -p ~/.claude/skills
cp -r hubspot-morning-briefing ~/.claude/skills/hubspot-morning-briefing
```

Then in Claude Code:

> Give me my HubSpot morning briefing.

> Which of my HubSpot deals need attention today?

> Prep me for today's HubSpot meetings.

**You don't strictly need to install it as a skill.** Since this is an MVP,
it's also fine to just point Claude at this folder directly ("read SKILL.md
in hubspot-morning-briefing/ and run the collector") in any Claude Code
session — the skill packaging is a convenience, not a requirement.

### Try it without a real HubSpot account

```bash
node collect.js --sample
```

This prints realistic fake data (14 deals, mixed pipelines, stalled deals,
overdue tasks, 3 meetings today) matching the exact schema the live collector
produces, so you can see the whole flow — including Claude's briefing —
before connecting a real account. Ask Claude: "run `node collect.js --sample`
in hubspot-morning-briefing/ and give me the morning briefing from that."

## Privacy

- No HubSpot credential is stored by this project, ever.
- `collect.js` does not persist deals/emails/notes/contacts to disk. It
  prints normalized JSON to stdout for the current run only.
- Activity bodies (notes/calls/emails) are HTML-stripped and truncated to
  ~400 characters before being included in the output.
- `config.json` is gitignored and only ever contains non-secret config
  (owner id, timezone, thresholds).

## Troubleshooting

| Symptom | Fix |
|---|---|
| `HubSpot CLI ("hs") was not found on PATH` | `npm install -g @hubspot/cli` |
| `HubSpot CLI is not authenticated` | `hs account auth` |
| Wrong HubSpot account being queried | Set `"account"` in `config.json`, or `hs account use <name>` |
| `No open deals found for this owner` | Double check `ownerId` in `config.json` against `hs api /crm/v3/owners --method GET` |
| Some deal fields are missing/blank | Your portal doesn't expose that property (plan-dependent or customized pipeline) — the collector degrades gracefully; check `capabilities` and `warnings` in the output |
| No meetings found | Confirm meetings are actually logged in HubSpot (not just on an external calendar) for today, in the timezone set in `config.json` |
| Slow first run | Expected on large portals — pass 2 (deep activity lookup) is capped to your top ~25 candidate deals plus every deal tied to a meeting today |

## What's deliberately NOT in this MVP

This intentionally skips most of what a "real" distributable package would
have, per the original spec: no TypeScript build, no automated test suite
with mocked CLI fixtures, no cross-platform installer script, no `doctor`
sub-command, no npm package. If this proves useful day to day, those are the
natural next investments — but the point of this pass was a working
end-to-end MVP, not the packaged product.
