# Breaking Into AI-First Work Without Fighting the Crowd

### A strategy guide to the two moves that actually widen your odds — by industry, and by geography

*Grounded entirely in the Stanford 2026 AI Index Report (Economy chapter). Every statistic in this guide is drawn from that report and cited to its figure.*

---

## The problem with the obvious path

If you want to work in AI, the instinct is to aim straight at the center of gravity: the frontier labs, the marquee names, the postings in San Francisco and New York. That instinct is also what a few hundred thousand other people are acting on at the same time. You end up as applicant number four thousand for a role that was designed to attract exactly that crowd.

There's a quieter, more winnable version of the same ambition. AI demand is no longer confined to the places and companies you'd name first. It is *diffusing* — spreading outward into industries that historically had almost no AI hiring, and concentrating, in density terms, in states and countries that aren't the headline answers. The people who read that diffusion correctly get to compete in thinner pools for a growing pile of demand.

This guide lays out the two levers you can pull to do that:

1. **Industry** — become "the AI person" in a second-wave sector that isn't yet saturated with AI talent.
2. **Geography** — target where AI hiring is *dense* relative to the local market, not where it's simply *big*.

They stack. Pull both and you compound the advantage. But first, the thesis they share.

---

## The core thesis: chase diffusion, not headlines

Two facts from the report frame everything that follows.

First, **organizational AI adoption reached 88% in 2025** — nearly every company now says it uses AI in at least one function (Figure, Economy chapter, business-adoption section). Second, actual *deployment* lags that number badly: **scaled use of AI agents sits in the single digits across nearly every business function**, and in most functions two-thirds or more of organizations report no agent use at all (Figure 4.3.7). Even the sectors furthest along — technology's own software engineering (24% scaled agent use), IT (22%), and service operations (21%) — are the exception, not the rule (Figure 4.3.8).

That gap between "we bought AI" and "we run AI in production" is the entire opportunity. Companies everywhere have committed to AI on paper and staffed it thinly in practice. The demand isn't concentrated where the technology was invented; it's concentrated where the technology is being *adopted faster than it's being staffed*. Both levers in this guide are just two ways of locating that mismatch — one across industries, one across places.

A related shift tells you what kind of skill the mismatch rewards. The report finds that job postings mentioning ChatGPT, chatbots, and "conversational AI" are **declining**, while postings referencing AI agents, agentic systems, and orchestration frameworks like LangGraph are climbing sharply (Figure 4.4, skill-composition section). Demand is moving from *familiarity with chat tools* to the ability to *operationalize task-oriented systems*. Wherever you land, the premium is on people who can implement and scale, not just discuss.

---

## Lever 1 — Follow the second-wave industries

The most crowded framing of "an AI job" is a role at a technology company. But the report's sector data shows AI hiring spreading well past tech, and — critically — into industries that had almost no AI adoption a year earlier.

Here is the full picture of where AI skills show up in US job postings, by sector, with each sector's share of its own postings and its one-year growth (Figure 4.4.9, 2024 vs. 2025):

| Sector | AI share of the sector's 2025 postings | Year-over-year growth |
|---|---|---|
| Information | 13.22% | +69.12% |
| Professional, scientific & technical services | 6.49% | +47.10% |
| Finance & insurance | 5.33% | +62.94% |
| Manufacturing | 4.66% | +39.27% |
| Management of companies & enterprises | 3.28% | +102.28% |
| Utilities | 2.89% | +44.35% |
| Educational services | 2.42% | +19.14% |
| Real estate & rental & leasing | 2.08% | +93.48% |
| Wholesale trade | 1.93% | +83.00% |
| Mining, quarrying, oil & gas extraction | 1.87% | +7.64% |
| Public administration | 1.69% | +41.58% |
| Retail trade | 1.67% | +60.25% |
| Agriculture, forestry, fishing & hunting | 1.32% | +33.04% |
| Transportation & warehousing | 1.26% | +55.40% |
| Waste management & administrative support | 0.46% | +30.80% |

The report is explicit about what this means: "In 2025, AI hiring also expanded in sectors with historically low adoption rates. Transportation and warehousing, real estate, and education showed year-over-year increases, evidence that the diffusion is reaching beyond traditional technology-driven industries" (Figure 4.4.9 discussion).

### How to read this table strategically

The naive read is "go where the share is highest" — Information at 13.22%. That's the *tech-adjacent* answer, and it's where AI talent already clusters. The strategic reads are different:

**Read the growth column, not just the share column.** Management of companies (+102.28%), real estate (+93.48%), and wholesale trade (+83.00%) are growing faster than Information (+69.12%) from far smaller bases. High growth off a low base is the signature of a sector that is *just now* deciding it needs AI people — and hasn't yet hired the ones who understand it. That's a market where a single well-positioned candidate is scarce rather than commoditized.

**Weight the big, established industries that are quietly climbing.** Finance & insurance (5.33%) and manufacturing (4.66%) aren't novelties — they're enormous employment bases with real budgets, now posting AI shares that put them second only to tech-adjacent categories. Being the AI-literate person inside a large manufacturer or insurer means competing against that firm's *existing* workforce for an internal-frontier role, not against the global applicant flood chasing the labs.

**Treat the low-share, rising sectors as first-mover territory.** Transportation & warehousing (1.26%, +55.40%), real estate (2.08%, +93.48%), and educational services (2.42%) have low absolute AI penetration but clear upward motion. If you can be early here, you're defining the role rather than filling a slot that fifty other qualified people also want.

### Positioning: how to actually become "the AI person" in a second-wave sector

The advantage only materializes if you're legible to hiring managers in that industry. Three moves:

The first is to **pair domain fluency with implementation skill, not modeling theory.** These sectors don't need someone who can train a model; they need someone who can take a bought-but-unused tool and make it run against a real workflow — the exact gap the 88%-adoption-versus-single-digit-deployment data describes. Learn the sector's vocabulary, its systems of record, and its compliance constraints, then position yourself as the person who bridges those to a working AI process.

The second is to **build a visible artifact in the target sector's context.** The report notes that formal education is lagging AI badly and that *advertising demonstrated AI skills* is itself a rising, tracked signal on resumes (Figure 4.4, skills section). A public project — an agent that handles a logistics reconciliation task, a retrieval system over insurance documents, a warehouse-routing prototype — does more for a second-wave employer than a credential, because it proves you can do the thing they can't yet staff.

The third is to **name the higher-value skill cluster, not the literacy one.** The report separates fast-growing "literacy" skills (AI prompting, Copilot) from higher-value "engineering" skills (AI agents, AI productivity, AI strategy, LLMOps). In a sector that's new to AI, claiming the engineering cluster — and backing it with the artifact above — is what separates a strategic hire from a power user.

### Weekend build ideas: one artifact per second-wave sector

The point of the "visible artifact" advice above is to *show*, not claim. Each project below is scoped to a single weekend, uses off-the-shelf pieces (an LLM API, a small retrieval library, public data or a synthetic sample, a spreadsheet or a lightweight web front end), and deliberately avoids anything that needs a data pipeline, a trained model, or production infrastructure. The goal isn't a polished product — it's a working demo plus a short write-up that proves you can turn a bought-but-idle capability into a real workflow.

For each, "what it proves" is the line a hiring manager in that sector actually cares about.

**Build these in Claude Code, not a chat window — and that distinction is the point.** These are not "ask an AI a question" exercises; they're *buildouts*. You want an agent working inside a real project folder on your machine: creating files, generating synthetic data, writing and running the code, installing dependencies, hitting an actual API, and leaving you a runnable repo with a README. A chat session can hand you a snippet to copy-paste; Claude Code scaffolds the whole thing, runs it, sees the errors, and fixes them — which is exactly the "operationalize it end-to-end" muscle the report says employers are paying for. Doing it this way is also the fastest way to *learn*, because you're watching a working system get assembled and debugged in front of you rather than reading about one.

How to use each prompt: install Claude Code, make an empty folder for the project, open it, paste the prompt, and drive from there. Each prompt is a starting instruction — expect to steer, correct, and extend as it builds. Swap in your own API key (Anthropic, OpenAI, whatever you have) when it asks.

**Finance & insurance — a claims/document triage assistant.**
Take a folder of sample insurance claims or loan applications (synthetic, or public sample forms) and build a retrieval-augmented assistant that reads each document, extracts the key fields, flags missing information, and drafts a plain-language summary with a recommended next action. Add one guardrail: it must cite the source line for every extracted value.
*What it proves:* you can put an LLM against messy, regulated documents and keep it auditable — the exact concern that stops finance teams from deploying.

*Drop this into Claude Code:*
```
Build me a runnable Python project called claims-triage. First, generate a
/data folder with 15 synthetic insurance claim documents as text files —
vary the format and quality, and deliberately leave required fields missing
in a few. Then build a CLI that, for each document, calls an LLM to extract
key fields (claimant, date, policy number, claim amount, incident type),
flags any missing required fields, and drafts a plain-language summary with a
recommended next action. Hard requirement: every extracted value must include
the exact source line it came from, so the output is auditable. Write results
to /output as JSON + a readable report. Add a README explaining the workflow
it replaces and the auditability guarantee. Set it up so I paste my API key
into a .env file. Then run it on the sample data and show me the output.
```

**Manufacturing — a maintenance-log root-cause helper.**
Feed a synthetic set of equipment maintenance tickets and shift notes into a small system that clusters recurring failure descriptions, summarizes likely root-cause themes, and drafts a standardized work order from a free-text complaint. Bonus: a simple retrieval step over an equipment manual so the assistant can suggest the relevant procedure.
*What it proves:* you can turn unstructured shop-floor text into structured, actionable output — the near-universal starting point for industrial AI.

*Drop this into Claude Code:*
```
Build me a runnable project called maintenance-rootcause. Generate a /data
folder of 30 synthetic equipment maintenance tickets and shift notes as
free text — messy, with recurring failure patterns hidden across them, plus
one short fake equipment manual as a text file. Build a tool that: (1) clusters
the tickets by likely failure theme and summarizes each cluster's probable
root cause, (2) takes a single free-text complaint and drafts a standardized
work order from it, and (3) retrieves the relevant section of the equipment
manual and cites it in the suggested procedure. Output a summary report to
/output. Add a README describing the shop-floor workflow this automates. Use a
.env file for my API key, then run it end-to-end and show me the clusters and
a sample work order.
```

**Real estate — a listing-and-comps drafting agent.**
Build a tool that takes a property's raw details (or a public listing) plus a few recent comparable sales, then generates a compliant listing description, a pricing-rationale paragraph, and a buyer-question FAQ. Add a step that rewrites the description for three audiences (first-time buyer, investor, downsizer).
*What it proves:* you can automate the high-volume writing and summarization that eats an agent's week, with tone control — an immediately legible win for a low-AI-penetration field.

*Drop this into Claude Code:*
```
Build me a runnable project called listing-drafter with a small local web UI.
Generate /data with 8 synthetic property records (address, beds/baths,
square footage, features, condition notes) and, for each, 3 recent comparable
sales. Build a tool that takes one property plus its comps and generates: a
compliant MLS-style listing description, a pricing-rationale paragraph that
references the comps, and a buyer-question FAQ. Then add a feature that rewrites
the description for three audiences — first-time buyer, investor, and downsizer.
Put it behind a simple form (Flask or a single HTML page) so I can paste in a
property and see the output. README should explain the agent workflow and the
weekly task it replaces. Use a .env for my API key and run it locally.
```

**Transportation & warehousing — a delivery-exception reconciliation agent.**
Simulate a small set of shipment records with mismatches (late deliveries, quantity discrepancies, missing PODs). Build an agent that reads each exception, classifies the likely cause, drafts the customer-facing update, and produces a prioritized action list for a dispatcher. Keep a running log so it's demonstrably repeatable.
*What it proves:* you can operationalize a repetitive coordination task end-to-end — the "agentic, not chat" skill the report says demand is shifting toward.

*Drop this into Claude Code:*
```
Build me a runnable project called delivery-exceptions. Generate /data with 25
synthetic shipment records containing mismatches — late deliveries, quantity
discrepancies, missing proof-of-delivery. Build an agent loop that processes
each exception: classify the likely cause, draft a customer-facing status
update, and assign a priority. Aggregate everything into a dispatcher action
list sorted by priority, written to /output. Keep an append-only run log so I
can show the process is repeatable across runs. Make it a real agentic loop
(process → decide → draft → log), not a single prompt. README should frame it
as a coordination workflow. Use a .env for my API key, then run it and show me
the dispatcher list and the log.
```

**Educational services — an auto-grading and feedback drafter.**
Take a set of sample short-answer responses against a rubric and build a tool that scores each one, drafts specific, encouraging feedback, and flags borderline cases for human review. Add a summary view that surfaces the class's most common misconceptions.
*What it proves:* you can save instructor time while keeping a human in the loop — the trust condition education buyers insist on.

*Drop this into Claude Code:*
```
Build me a runnable project called rubric-grader. Generate /data with one
short-answer question, a grading rubric, and 20 synthetic student responses
of varying quality (include a few borderline and a few off-topic). Build a
tool that scores each response against the rubric, drafts specific and
encouraging feedback, and flags borderline cases for human review instead of
committing a grade. Add a summary view that surfaces the class's most common
misconceptions. Output a per-student report plus the class summary to /output.
Hard requirement: nothing is auto-finalized — everything is a draft for a human
to approve. README explains the human-in-the-loop design. Use a .env for my
API key, then run it and show me the scores, a flagged case, and the summary.
```

**Public administration — a constituent-request router and drafter.**
Using public FAQ or policy documents from any agency's website, build a retrieval assistant that answers common constituent questions with citations to the source policy, routes anything ambiguous to the right department, and drafts a first-response email. Include a "no answer found — escalate" path so it never fabricates.
*What it proves:* you can deploy AI in a low-tolerance-for-error, high-accountability setting — precisely the D.C./public-sector density lane most technical applicants ignore.

*Drop this into Claude Code:*
```
Build me a runnable project called constituent-router. In /data, save 5-6 pages
of plain-text policy/FAQ content (I'll paste real content from a public agency
site, or generate realistic placeholder content to start). Build a retrieval
assistant that answers common constituent questions using ONLY that content and
cites the exact source passage for every answer. If it can't find a supported
answer, it must return "no answer found — escalate to [department]" and never
guess. Add routing logic that tags ambiguous requests to the right department
and drafts a first-response email. Output a transcript log showing question,
answer, and citation for each. README emphasizes the no-fabrication and
escalation design. Use a .env for my API key, then run a batch of sample
questions including one it should refuse to answer, and show me the results.
```

**Wholesale trade — a purchase-order and catalog normalizer.**
Take a messy mix of supplier product descriptions (varying formats, units, abbreviations) and build a tool that normalizes them to a clean schema, matches likely duplicates, and drafts a standardized catalog entry. Add a confidence score and a review queue for low-confidence matches.
*What it proves:* you can tame the data-cleanup problem that blocks almost every downstream analytics or automation effort in distribution-heavy businesses.

*Drop this into Claude Code:*
```
Build me a runnable project called catalog-normalizer. Generate /data with a
messy CSV of 40 supplier product descriptions — inconsistent formats, mixed
units, abbreviations, and some near-duplicate entries. Build a tool that
normalizes each row to a clean target schema (name, category, unit, size,
brand), detects likely duplicates, and drafts a standardized catalog entry for
each. Attach a confidence score to every normalized row and route anything
below a threshold into a separate review-queue CSV instead of auto-committing.
Output the clean catalog and the review queue to /output. README explains how
this unblocks downstream analytics. Use a .env for my API key, then run it on
the messy CSV and show me the clean output plus the review queue.
```

A repeatable pattern runs through all seven: **ingest the sector's messy text → extract or classify → draft the human-facing output → keep it auditable with a review or escalation path.** Learn that pattern once and you can retarget it to any of these industries in a weekend. Package each as a short repo plus a one-paragraph "here's the workflow it replaces and why it's safe" write-up — that framing is what turns a demo into a hiring signal.

### After the build: use Claude Code to interrogate what you made

Here's the move most people skip, and it's where the real learning lives. A weekend demo runs on your laptop, on synthetic data, when you type a command. A *production system* runs on its own, on real data, for other people, without you babysitting it. The gap between those two is exactly the "we bought AI but haven't deployed it" canyon the report describes — and understanding that gap is a hiring signal in itself.

The advantage of having built in Claude Code is that the agent can *see your actual repo*. So instead of asking generic questions about deployment, you can ask it to explain what *your specific project* would need. Paste these prompts into the same Claude Code session (or reopen the project folder) after your build runs. You're not asking it to build production — you're asking it to *teach you the map* using your own code as the textbook.

*Understand what you actually built:*
```
Walk me through the architecture of this project as if you're onboarding me.
What are the moving parts, how does data flow through it, where does the LLM
get called, and what are the current assumptions that would break if a real
user ran this instead of me on sample data? Draw it as a simple diagram in text.
```

*What would it take to deploy and host it:*
```
Right now this runs on my laptop when I type a command. Explain, in plain
terms, what it would take to host this so it runs somewhere other than my
machine. What are my realistic options (from simplest to most robust), what
would each cost roughly, and what would I have to change in THIS codebase to
make it deployable? Don't build it yet — just teach me the tradeoffs.
```

*How to make it run automatically on a schedule:*
```
I want this to run on its own — say, every morning, or whenever a new file
shows up — instead of me running it by hand. Explain the ways I could schedule
or trigger this (cron, a scheduled cloud job, an event trigger), which fits
this project best, and what code or config I'd need to add. Show me the
smallest possible version I could set up first.
```

*How to feed it real data instead of my synthetic sample:*
```
This currently reads from a /data folder I generated. In the real world the
data would live somewhere else — a database, a shared Google Drive or Dropbox
folder, an email inbox, or an uploaded file. Pick two realistic sources for
THIS use case and explain what it would take to connect them, what a database
would add versus flat files, and where I'd have to change my code to swap the
input source cleanly.
```

*How to make it reliable enough to trust:*
```
If a real team depended on this, what would break and how would I know? Explain
what I'd need to add for reliability — error handling, retries when the API
fails, logging, and some way to monitor that it's actually working. Point to
the specific places in my current code that are fragile and would need this.
```

*How to secure it and handle sensitive data:*
```
This project touches data that could be sensitive in the real version. Explain
what I'd need to think about for security: where secrets like API keys should
live, how I'd add access control if other people used it, and what handling
personal or regulated data would require. What in my current setup is fine for
a demo but unacceptable in production?
```

*How to put a usable interface on it:*
```
Right now only someone comfortable in a terminal can run this. Explain my
options for giving a non-technical colleague a way to use it — a simple web
form, an internal tool, a scheduled report that lands in their inbox. Which is
the least effort for the most value here, and what would I add to my project
to get there?
```

You don't have to act on the answers. The point is to walk away able to *talk* about productionizing what you built — which, in an interview for a second-wave-industry AI role, is often the difference between "I made a toy" and "I understand what it takes to run this for real."

### What "productionizing" actually involves — the general map

You don't need to be an infrastructure engineer to be credible here. You need a working mental model of the handful of things that change when something goes from *a script you run* to *a system a team relies on*. In broad strokes, that's six moves.

**From your laptop to somewhere it can live (hosting).** A weekend build runs where you built it. Production needs a home that's always on — a small cloud server, a serverless function, or a managed platform. The trade is effort versus control: a managed platform gets you running in an afternoon but hides the plumbing; a raw server gives you full control and more to maintain. For most of these tools, the simplest hosted option is more than enough to start.

**From "I run it" to "it runs itself" (scheduling and triggers).** Most of these workflows are valuable precisely because they're repetitive, which means nobody should have to launch them by hand. Production replaces the manual command with a trigger: a scheduled job (the classic "cron job" that fires every night at 2 a.m.), or an event ("when a new claim lands in this folder, process it"). This one shift — from on-demand to automatic — is often what turns a demo into something a team actually adopts.

**From a sample folder to real, changing data (storage and inputs).** Your build reads synthetic files you generated. The real version pulls from where the business already keeps its information: a database, a shared Google Drive or SharePoint folder, an inbox, a form, or an existing system of record. Two things usually have to appear here — a real *input connection* (an integration that fetches the live data) and often a *database* to store results, track what's already been processed, and let you query history. You don't need anything exotic; you need the tool to stop assuming the data is sitting in a folder you made.

**From "it worked once" to "it keeps working" (reliability).** Real systems fail in boring ways: the API times out, a document is malformed, the network hiccups. Production adds the unglamorous scaffolding that handles this — retries when a call fails, sensible error handling so one bad record doesn't crash the whole run, logging so there's a record of what happened, and basic monitoring so someone gets alerted when it breaks instead of discovering it three days later. This is a large part of what "operationalizing" really means.

**From open on your machine to safe for a team (security and secrets).** The moment real data and other people are involved, a few things become non-negotiable: API keys and passwords live in a secrets manager, not in the code; access is controlled so only the right people can use it; and any personal, financial, or regulated data is handled according to the rules that govern that sector. The auditability and human-in-the-loop guardrails you built into the weekend versions are the foundation here — production just formalizes them.

**From terminal-only to something people can actually use (interface and cost).** A tool only a developer can run has a ceiling. Production usually adds a way in for everyone else — a simple web form, an internal dashboard, or a scheduled report that just shows up in someone's inbox. And once it runs on real volume, someone has to watch the bill: LLM calls cost money per use, so production systems batch work, cache repeated results, and pick right-sized models to keep costs sane.

None of this has to happen at once. The honest path is incremental: get it hosted, then get it scheduled, then connect one real data source, then add reliability, and so on. Being able to *sequence* that journey — to say "here's where I'd start and here's what I'd add next" — is exactly the judgment that separates someone who can implement AI from someone who can only prototype it. That judgment, not a finished production system, is what these exercises are really building.

---

## Lever 2 — Play the density game, not the volume game

The second lever is where you look for the role. The default is to chase the biggest markets. The report shows why that default is the crowded trade — and where the thinner pools are.

### The obvious answer: raw volume is concentrated in three states

Within the US, AI labor demand clusters heavily. California leads with **170,881 postings — 17.2% of the 2025 national total.** Texas follows with **80,547 (8.1%)** and New York with **66,029 (6.6%)**. Together, those three states hold roughly a third of all AI job postings in the country (Figures 4.4.10–4.4.11).

That's the volume answer, and it's exactly where competition is fiercest. Worth noting: even California's dominance is *thinning* — its share of the national total has fallen from over 25% in 2012 to around 17% in 2025 (Figure 4.4.12). The center is slowly redistributing outward, which is the macro version of the entire diffusion thesis.

### The non-obvious answer: density relative to the local market

Volume tells you where the most postings are. *Density* tells you where AI makes up the largest slice of what's being hired locally — which is a much better proxy for "how much competition per role." On that measure, the report highlights a different set of leaders:

> "Looking at the density of AI labor demand within each state... despite having smaller total numbers, Washington, D.C., accounts for a comparatively high 6.2% share of those postings, followed by Delaware at 4.4%." (Figure 4.4.13)

**Washington, D.C. (6.2%)** and **Delaware (4.4%)** aren't the states you'd name in a word-association test about AI. But a high density of AI postings against a *smaller* total job market is precisely the condition you want: meaningful demand, without the applicant tsunami that follows a California posting. D.C.'s profile in particular reflects heavy public-sector and policy-adjacent AI demand — a lane most technically-minded applicants overlook entirely.

The report also notes that from 2024 to 2025, **California, Washington state, New York, and Texas all continued to see growth in AI postings within their labor markets** (Figure 4.4.14) — so the big states aren't shrinking in absolute terms; they're just no longer the only game, and they carry the heaviest competition.

### Go global: the density logic is even sharper across countries

Zoom out and the same principle produces a striking result. Measured as AI's share of *all* job postings — the cleanest available proxy for how AI-intensive a labor market is — the 2025 leaders are (Figures 4.4.1–4.4.2):

| Market | AI share of all job postings, 2025 |
|---|---|
| Singapore | 4.69% |
| Hong Kong | 3.5% |
| Luxembourg | 3.4% |
| Spain | 3.3% |
| United States | 2.6% |
| Chile | 2.4% |
| United Kingdom | 1.9% |

**Singapore leads the world at 4.69%** — nearly double the intensity of the entire United States (2.6%). The country most saturated with AI *opportunity per job* is not the one with the most jobs. If you have any optionality about where you work — or can work remotely for an employer based there — this table is a strategic input, not a footnote.

### Turning density into a job-search tactic

Density is only useful if you act on it. Concretely:

Treat **"where I'm willing to work"** as a lever you're actively setting, not a default you inherited from where you already live. The report's density data says the calculus of *competition per role* changes materially between a California posting and a D.C., Delaware, or Singapore one. That's a decision worth making deliberately.

Use **remote and relocation openness to arbitrage the gap.** You don't have to physically move to Singapore to benefit from its intensity, and you don't have to live in D.C. to apply into its density. Widening your geographic aperture — even just to "remote for a high-density-market employer" — expands the set of thinner pools you can fish in.

Combine **density with the second-wave sectors.** A high-density market that's also home to an under-staffed second-wave industry is the strongest single target. D.C.'s policy-and-public-administration AI demand, or a manufacturing-heavy state's rising industrial-AI need, is where both levers point at the same door.

---

## Why now: two tailwinds behind both levers

Timing matters, and two data points suggest the window for this strategy is unusually favorable right now.

**The inbound talent competition is thinning.** The number of AI researchers and developers moving *to* the United States has **dropped 89% since 2017**, with 80% of that decline occurring in the last year alone (Economy chapter, talent-flows section). For a domestic early-career professional, that means competing against a *shrinking* inflow of global talent — the external applicant pool feeding US roles is smaller than it has been in years.

**The money hasn't left; the deployment gap hasn't closed.** The same report shows US AI investment still dwarfing rivals and thousands of new AI companies being funded, even as adoption (88%) massively outruns real deployment (single-digit scaled agent use). Enormous capital, a widening implementation gap, and a thinner competitor pool is about as favorable a setup as an entrant gets. The caveat is that talent-flow and policy conditions shift — so the argument is to use the tailwind now rather than assume it persists.

---

## Putting both levers together: a targeting matrix

The two moves aren't alternatives; they're axes. Score any opportunity on both:

|  | **High-density / thinner geography** (D.C., Delaware, Singapore, remote-for-intense-market) | **High-volume / crowded geography** (CA, NY, TX metros) |
|---|---|---|
| **Second-wave industry** (manufacturing, finance, real estate, transport, education, public admin) | **Best target.** Both levers working for you: scarce talent, rising demand, less competition. | **Strong.** Sector scarcity offsets geographic crowding. |
| **Tech / Information sector** | **Good.** Density offsets the crowd of AI-native applicants. | **Hardest.** The default everyone else is also chasing — the applicant-#4,000 zone. |

The bottom-right cell — a frontier-lab-style role in a top-volume metro — is the one to *avoid* as a default, not because those jobs are bad, but because that's where your odds are worst. Every step you take toward the top-left cell improves the ratio of demand to competition working in your favor.

---

## The action checklist

Concrete steps to operationalize both levers:

1. **Pick one second-wave sector you have a genuine angle on.** Prior experience, network, or authentic interest in finance, insurance, manufacturing, real estate, logistics, education, or public administration beats a cold entry into tech. Weight sectors with high *growth* off a modest base — that's where talent is scarcest.
2. **Learn the engineering cluster, not the literacy cluster.** Prioritize AI agents, orchestration, and LLMOps — the skills the report shows demand shifting *toward* — over chat-tool familiarity, which it shows demand shifting *away* from.
3. **Ship one visible artifact set in your target sector's context.** Solve a real workflow problem for that industry and make it public. This substitutes for the credential the education system is failing to provide.
4. **Redraw your geographic map around density.** Add D.C., Delaware, and other high-density-but-lower-volume US markets to your search. If you have any international optionality, weigh Singapore and the other high-intensity markets.
5. **Set remote/relocation openness as a deliberate lever.** Decide how wide your geographic aperture is on purpose — it directly determines how many thinner pools you can compete in.
6. **Aim for the top-left of the matrix.** A second-wave industry inside a high-density market is your single best target. Treat a headline-lab role in a top-volume metro as the fallback, not the goal.
7. **Move while the tailwinds hold.** Thinning inbound talent competition and an unclosed deployment gap won't stay this favorable indefinitely. The strategy rewards acting now.

---

## The one-line version

Everyone is pushing on the front door — the famous companies, in the biggest cities, doing the most visible AI work. The report's data says the openings are around the side: in industries that just started adopting AI and haven't staffed it, and in places where AI demand is dense but the applicant crowd isn't. Position yourself at that frontier — by sector, by geography, or ideally both — and you compete for growing demand in a thinner pool instead of fighting the crowd for the same scarce seats.

---

### Sources

All figures are drawn from the **Stanford 2026 AI Index Report, Economy chapter (Section 4.4, "Jobs," and Section 4.3 on agent deployment)**:

- Sector AI-posting shares and year-over-year growth — Figure 4.4.9
- US state volume and concentration (CA 17.2% / 170,881; TX 8.1% / 80,547; NY 6.6% / 66,029; ~one-third combined) — Figures 4.4.10–4.4.11; California's declining share — Figure 4.4.12
- US state density (Washington, D.C. 6.2%; Delaware 4.4%) and continued growth in CA/WA/NY/TX — Figures 4.4.13–4.4.14
- Global AI job intensity (Singapore 4.69%; Hong Kong 3.5%; Luxembourg 3.4%; Spain 3.3%; US 2.6%; Chile 2.4%; UK 1.9%) — Figures 4.4.1–4.4.2
- Skill-cluster shift from chat tools toward agents/orchestration — Figure 4.4 skill-composition section
- Organizational adoption (88%) vs. single-digit scaled agent use; tech-sector scaled use (software engineering 24%, IT 22%, service operations 21%) — Figures 4.3.7–4.3.8
- AI talent inflow to the US down 89% since 2017 — Economy chapter, talent-flows section
