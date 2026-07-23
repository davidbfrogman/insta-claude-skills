# Master Guide Collection

16 guides, merged 2026-07-18.

## Contents

- AIAgentWorkflowGuide
- AICareerTwoPathways
- AIEnablementGuide
- AIPositioningStrategy
- AI_Agent_Manager_Guide
- AI_Hallucination_Guide
- BusinessMemoryGuide
- ClaudeConnector
- ClaudeDesignGuide
- ForwardDeployedProductManager
- GoodWorkIsTheFloor
- LeverageGuide
- MarkdownFileGuide
- PluginGuide
- TheGreatThaw
- WorkingLoudly2026Guide


---

# GUIDE: AIAgentWorkflowGuide

d.avebrown instagram.com/d.avebrown

# Build Your First AI Agent Workflow

A gentle, hands-on tutorial that walks a complete first-timer through a small lead-enrichment project — the smallest real thing that teaches the whole pattern.

by d.avebrown

⚙️ How to actually use this guide

This is a **build-along**, not a chat conversation. You're not meant to paste these steps into a chat window and read the replies — you're meant to build the actual workflow alongside an AI coding agent that can create files, run code, and edit things on your machine. The two easiest ways in are **Claude Code** or **Codex**. Open one of them in a fresh, empty folder, and work through this guide with it as your pair-programmer.

A good way to start: give it this whole guide and say *"walk me through building this one step at a time, and stop after each step so I can see what happened."* If you try to do this in a plain chat box with no ability to run code, you'll get stuck fast — that's the tripwire most people hit. Use a coding agent instead.

Most people try to learn AI agents by starting with something wildly too ambitious. They want the agent to read the whole inbox, update the CRM, write every follow-up email, score the deals, book the meetings, and — while it's in there — spiritually heal the sales team. It's an understandable instinct. The demos you see online are always the flashy, end-to-end, "look, no hands" version, and it feels like anything smaller isn't really *agents*.

That is exactly the wrong place to start, and this guide is going to talk you out of it. Your first agent workflow should be boring. Genuinely, almost disappointingly boring — because boring is what you can actually see. Boring is what you can debug. And when your first workflow fails, which it absolutely will, boring is what lets you walk straight to where the body is buried instead of staring at a black box wondering what went wrong.

So we're going to build one small thing together: a lead-enrichment workflow. You'll start with a spreadsheet of business names. The workflow will research each business, summarize what it does, try to surface a likely owner or key contact when that's publicly available, and write the results back into the spreadsheet. That's the whole project. No giant CRM integration, no fully autonomous outbound machine, no "set it and forget it." Just a small, legible workflow that happens to teach you the core pattern behind every serious piece of agent-led work you'll ever build.

Start Here

The project is lead enrichment — the lesson is something else entirely

### Lead enrichment is just the excuse.

Here's the reframe that makes the whole tutorial click: this project is not really about leads. Lead enrichment is simply a convenient, honest little task that forces you to touch every part of an agent workflow at least once. What you're actually learning is a repeatable shape — one that shows up in support automation, document processing, research assistants, data cleanup, and a hundred other places you'll encounter later.

That shape is worth stating plainly, because you'll come back to it every time you build something new. You take structured input. You give the AI access to a tool or two. You let it perform the task one step at a time. You force its output into a predictable format. You review the results before you trust them. And then you improve the workflow based on exactly where it broke. Master that loop on a boring task, and you can point it at almost anything.

Why This Is The Right First Build

Anthropic's guidance on building agents is blunt about this: start with the simplest architecture that works, and add complexity only when the task genuinely demands it. They draw a clean line between predictable workflows — where your code controls the path — and more autonomous agents, where the model decides what to do next. For your first project you want the former: a simple workflow with a couple of agentic steps living inside it.

The Shape Of It

What goes in, what comes out, and nothing in between you can't explain

### Spreadsheet in, richer spreadsheet out.

Before we write a single instruction, let's look at the two ends of the workflow, because everything else is just the bridge between them. You start with a small file — Excel or CSV, it doesn't matter — holding a list of leads. A few columns, most of them possibly blank:

Company Name

Website

City

State

Acme Glass Co.

Albany

NY

Northside Electric

Rochester

NY

Summit Roofing LLC

Buffalo

NY

And you end with the same file, enriched — the original rows carried forward, plus a handful of new columns the workflow filled in for you:

Company Summary

Website Found

Likely Owner / Contact

Source Notes

Confidence

Needs Review

Residential & commercial glass repair, Albany area.

example.com

—

Site found; owner unclear.

medium

yes

Notice what the goal is *not*. The goal is not flawless, hands-off automation. The goal is a first working version that helps you research leads meaningfully faster than doing every row by hand — and, more importantly, one you understand end to end. Perfect can come later. Legible comes first.

The Mental Model

You're building a tiny assembly line, not hiring a genie

### Most of your "AI agent" isn't AI at all.

When people hear "AI agent," they tend to picture a little digital employee running around the internet making brilliant, independent decisions. For your first project, throw that image out. A far more useful — and more accurate — picture is an assembly line where the AI handles only the one or two judgment-heavy steps, and ordinary, boring code handles everything else.

Walk down the line and you'll see how little of it is actually the model. The piece that loads the spreadsheet is not AI. The piece that runs a web search is not AI. The piece that writes results back into the file is not AI. The model sits in the middle of all that plumbing, and its job is narrow: decide what to search for, read the messy results that come back, and turn them into clean, structured fields. That's it. That's the whole contribution.

The Loop At The Heart Of It

OpenAI's tool-calling docs describe the mechanism as a loop, and it's worth memorizing: you give the model tools it can call, the model asks to call one, your code runs that tool, and you hand the result back so the model can keep going or produce its final answer. That's the engine of agentic work. Not vibes. Not magic. A loop.

The Architecture

A prompt chain — the simplest thing that could possibly work

### One row, one predictable sequence, then repeat.

For this first build we're going to use the plainest architecture there is: a prompt chain. You take one row and walk it through a fixed sequence of steps, in order, every single time. There's no clever branching, no swarm of agents debating each other — just a straight line you could draw on a napkin.

Read a row from the spreadsheet. Ask the model what search query it wants to run for that row. Run the search. Hand the results back to the model. Ask it to produce a structured enrichment record. Validate that record. Write it back to the spreadsheet. Move to the next row. Eight steps, always in the same order.

You could, eventually, make this far more sophisticated — routing easy leads down a cheap path and hard ones down a deep one, running research agents in parallel, adding an evaluator that grades each result, inserting human-approval checkpoints. Anthropic's own agent materials catalog exactly these patterns: sequential chains, parallelization, routing, evaluator-optimizer loops. But every one of those is an upgrade you earn *after* the simple version works. For a first lead-enrichment build, sequential is unambiguously the right move. Resist the urge to skip ahead.

The Agent's Job

Give it a narrow mandate — and permission to be uncertain

### A confident intern with internet access is a liability.

The agent's job description should be almost comically narrow: research one business lead and return a short, structured enrichment record using only publicly available information — and if the information is uncertain, say so out loud. That last clause is the one that separates a useful workflow from a hallucination machine with a spreadsheet-export button, so let's sit with it for a second.

Beginner workflows go sideways in a very specific way. Someone asks the model to "find the owner," the model dutifully produces a name, and that name gets treated as fact — even though the model was really just making a plausible guess to satisfy the request. The fix isn't to forbid guessing entirely; for a demo it's perfectly fine to ask the model to look for *likely* ownership or leadership. The fix is to make the output honest about its own certainty. Every record should cleanly separate what's confirmed from public sources, what's likely-but-uncertain, what's simply missing, and what needs a human to take a look before anyone acts on it.

Structured Output

If software has to use the answer, the answer needs a shape

### Don't let the model freestyle the result.

This is one of the first real lessons of agent work, and it's easy to skip right up until it bites you: if a downstream program needs to use the model's output, that output needs structure. A lovely paragraph of prose is useless to a spreadsheet. What a spreadsheet wants is fields — the same fields, in the same shape, every single time — and the way you guarantee that is by handing the model a schema and requiring it to fill that schema in.

OpenAI's Structured Outputs feature exists for exactly this. It forces the model's response to conform to a JSON schema, so required keys can't quietly go missing and invalid values can't sneak in. For our workflow, a reasonable enrichment schema looks like this:

enrichment schema · JSON

    {
      "company_name":            "string",
      "website":                 "string or null",
      "business_summary":        "string",
      "likely_owner_or_contact": "string or null",
      "contact_role":            "string or null",
      "source_notes":            "string",
      "confidence":              "high | medium | low",
      "needs_human_review":      "boolean",
      "reason_for_review":       "string or null"
    }

This isn't a fussy technical detail — it's the thing that makes the whole workflow manageable. Without a schema you get a cute paragraph you then have to parse by hand. With a schema, you get data you can drop straight back into Excel. That's the entire difference between a toy and a tool.

Scope Discipline

Run it on five rows, not five thousand

### The first version should only process five rows.

Please do not point this at two thousand leads on day one. Run it on five. It sounds almost too cautious, but five rows is enough to surface nearly every problem you're going to hit at scale: company names too generic to pin down, businesses with several locations, search results for entirely the wrong company, missing websites, stale directory listings, ownership that simply isn't public, and — the classic — a model that sounds far more confident than the evidence warrants.

This is also where the "agent manager" mindset quietly begins. You are not merely a person using AI here. You are supervising a workflow: watching where it stumbles, tightening the instructions, sharpening the tools, and making deliberate calls about what should be automated versus what a human should still eyeball. Five rows is your control room. Two thousand rows is just noise you can't learn from yet.

The Build, Step By Step

Six moves that take you from empty file to working workflow

### 1. Create a painfully small input file

Start with a tiny spreadsheet — a few columns, a handful of rows. The website column can be blank; if you already know a company's site, include it, and if you don't, the workflow will try to find it. The point of this file is not scale, it's legibility: something small enough that you can hold every row in your head while you watch the workflow run against it.

leads.csv

    company_name,city,state,website
    Acme Glass Co.,Albany,NY,
    Northside Electric,Rochester,NY,
    Summit Roofing LLC,Buffalo,NY,

### 2. Give the agent a narrow instruction

Now write the system instruction — the standing job description the model carries into every row. Notice, as you read it, how much of this is about restraint. It doesn't say "find me the owner no matter what." It says: find what you honestly can, flag what you can't, and never fake certainty.

system instruction

    You are a lead enrichment research assistant.
    Enrich one business lead at a time using only
    publicly available information. For each lead:

    1. Identify the most likely official website.
    2. Summarize what the business does in one or
       two plain-English sentences.
    3. Identify a likely owner, founder, president,
       or key contact ONLY if public info supports it.
    4. If ownership is unclear, return null and mark
       the row for human review.
    5. Do not guess.
    6. Prefer official sites, business profiles, state
       listings, LinkedIn company pages, reputable
       directories, and local news.
    7. Return the result using the required JSON schema.

That single instruction is the difference between a useful research assistant and a very confident intern who will happily invent a plausible owner to make you happy.

### 3. Give it exactly one tool: search

Resist the temptation to hand the agent a toolbox. For this first version it needs precisely one tool — a search function — and nothing more. OpenAI's docs describe tools broadly as ways to extend a model with web search, file search, function calling, remote MCP servers, and so on; you'll get to those eventually, but not today. Today you have search_web(query), which takes a query string and returns a short list of results.

In practice, the model looks at a row and generates a query like "Acme Glass Co. Albany NY owner" or "Acme Glass Co. Albany NY official website". Your code runs that search and passes the results back into the loop. One tool, one job. You can always add more once the one-tool version genuinely works.

### 4. Ask for the structured enrichment

Once the model has search results in hand, you make the second call — the one that turns messy findings into a clean record. This is where the schema from earlier does its real work. You give the model the lead, the search results, and a firm instruction to return only valid JSON:

enrichment prompt

    Using the lead and search results below, create a
    lead enrichment record.

    Lead:
      Company: Acme Glass Co.
      City: Albany   State: NY   Website: unknown

    Search results:
      [ ...results here... ]

    Return ONLY valid JSON matching the schema.
    If the owner or key contact is not clearly
    supported, use null. If there is any uncertainty,
    set confidence to "low" or "medium" and set
    needs_human_review to true.

What you're steering away from is the friendly paragraph — "Acme Glass seems to be a family-owned glass company in Albany…" — and toward something a program can actually consume:

what you want back · JSON

    {
      "company_name": "Acme Glass Co.",
      "website": "https://example.com",
      "business_summary": "Acme Glass Co. appears to
         provide residential and commercial glass repair
         and installation in the Albany area.",
      "likely_owner_or_contact": null,
      "contact_role": null,
      "source_notes": "Official website found, but
         ownership was not clearly available in results.",
      "confidence": "medium",
      "needs_human_review": true,
      "reason_for_review": "Owner or key contact could
         not be confirmed from public sources."
    }

That object can go straight back into a spreadsheet, row for row. That's the win you're building toward.

### 5. Treat the confidence field as your control system

The confidence field is not decoration, and it's not the model being polite. It's the dial that decides what a human ever has to look at. Keep it to three honest levels: **high** when an official website or several reliable sources line up, **medium** when it's a likely match with some gaps, and **low** when the company is ambiguous, the sources are weak, or there's a real chance of a mismatch.

Then wire that field to a couple of dead-simple rules, enforced in your code rather than left to the model's goodwill. If confidence is low, mark the row for review. If the likely owner came back null, mark it for review. If the company match itself feels uncertain, mark it for review. This is your first real taste of managing an agent: the machine does the repetitive work, and the human's attention gets spent only on the risky edges where it's actually worth something.

The Rule Of Thumb

Enforce the consequential rules in code, not in the prompt. "Please mark uncertain rows for review" is a suggestion the model can forget. An if-statement that sets needs_human_review whenever confidence is low is a guarantee. When a behavior has to happen, make it happen in code.

### 6. Write the results back to the spreadsheet

The last step closes the loop. Once the JSON validates, you map its fields back into columns and write them into your file. Nothing fancy — just the enriched rows landing where you can read them:

Company

Business Summary

Website

Likely Contact

Confidence

Review

Acme Glass Co.

Residential & commercial glass repair, Albany.

example.com

—

medium

yes

Northside Electric

Electrical contractor, residential & commercial.

example.com

Jane Smith

high

no

And that's genuinely it. Spreadsheet in, a research step, a moment of model judgment, structured output, spreadsheet out, and human review wherever the confidence dial says so. It isn't glamorous. But that exact pattern — those exact six pieces — is reusable almost everywhere you'll go next.

Make It Inspectable

Log the run so you can debug it later

### If you can't see what the agent did, you can't fix it.

Here's a small habit that will make this feel like real agent work rather than a party trick: log every run. For each row, quietly save the company name, the search query the model chose, the sources it considered, the final JSON it produced, the confidence, the review flag, any error message, and a timestamp. It feels like busywork right up until the first time a result looks wrong and you can pull up exactly what the agent saw and decided.

This is the beginner-friendly version of something the serious tools formalize — OpenAI's Agents SDK, for instance, ships tracing that records model generations, tool calls, handoffs, and guardrail events across a whole run. You don't need any of that yet. A plain CSV log does the job. The principle is what matters, and the principle is simple: make the agent's work inspectable.

run log · one line per row

    company_name, search_query_used, sources_considered,
    final_json_output, confidence, needs_human_review,
    error_message, timestamp

The Curriculum

Everything that breaks first — and the fix for each

### The failures aren't bugs in your learning. They are the learning.

A handful of things will break almost immediately, and that's not a sign you did it wrong — it's the entire point of starting with five rows. Each failure has a clean fix, and working through them is how you actually develop the instincts the role rewards.

When the company name is too generic — "Summit Roofing" might exist in twenty states — the fix is to fold city and state into the search query so the model isn't guessing between strangers. When it locks onto the *wrong* company, require it to compare name, location, and website before it accepts a match. When it invents an owner out of thin air, tighten the instruction so it returns null unless public sources clearly support a name.

When the summaries drift into fluffy marketing language, constrain them to one or two sentences and explicitly ban the marketing voice. When the output comes back inconsistent from row to row, that's your cue to lean harder on structured outputs instead of free-form text. And when it all feels too slow or too expensive, process fewer rows, cache search results you've already fetched, or route the easy leads to a cheaper model and save the strong model for the ambiguous ones.

The Reframe

This is precisely why the first version should be tiny. You are not trying to prove the agent is brilliant. You are trying to find out, cheaply and quickly, exactly where it's dumb — because that map is what you'll be managing against forever.

The Review Pass

Grade the first five by hand before you trust anything

### Read every one of the first five results with your own eyes.

After that first run of five rows, don't rush to scale — sit down and grade each result yourself. Did it identify the right business? Did it find the official website? Is the summary actually accurate? Did it resist guessing the owner when it shouldn't have? Did it flag the uncertain rows for review? Did the JSON validate cleanly? And the one that really matters: would you trust this result enough to put it in front of a salesperson?

Wherever the answer is no, improve the workflow — and improve *this* workflow, the simple one. Do not respond to a weak result by immediately adding more agents, bolting on memory, or wiring up a CRM integration. Those are tempting, and they feel like progress, but they mostly hide the problem under more moving parts. Fix the basic loop first. A clean, boring loop you understand beats an impressive one you don't.

Where To Go Next

The upgrade path, once — and only once — the simple version works

### Earn each layer of complexity.

Once the plain prompt chain runs reliably, you have a real foundation to build on — and now the fancier patterns will actually make sense to you, because you'll know what problem each one solves. Here's the ladder, in the order it's worth climbing.

**Version 1 — the prompt chain.** One row, one predictable sequence. This is the version you just built, and it's the best possible teacher.\
**Version 2 — add an evaluator.** A second model reviews each enrichment record and flags the weak ones. This is the evaluator-optimizer pattern: one model produces, another critiques.\
**Version 3 — add routing.** Send easy leads down a cheap, fast path and ambiguous ones down a deeper research path, so you spend effort where it pays off.\
**Version 4 — go parallel.** One worker hunts for the website, another for ownership, another writes the summary, and a final step stitches their findings together.\
**Version 5 — add human approval.** Before any owner or contact data gets written into a real CRM, require a person to sign off on the uncertain rows.\
**Version 6 — connect real systems.** Eventually this can plug into a CRM, an enrichment API, Google Sheets, Airtable, HubSpot, Salesforce, or your own internal databases.

Where MCP Comes In

That last step is where MCP-style integrations start to matter. MCP is an open standard for connecting AI applications to external systems — data sources, tools, and workflows — giving agents a consistent way to reach the systems around them. It's genuinely useful. It's also absolutely not where you start. Start with the spreadsheet.

### The Takeaway

Your first agent workflow should not be impressive. It should be understandable. A small lead-enrichment build looks modest, but it exercises every muscle that matters: how to give a model a narrow job, how to give it a tool, how to keep the whole thing constrained, how to force structured output, how to review uncertainty honestly, and how to improve the system after you've watched it fail. That's the real unlock, and none of it requires a giant, autonomous, jaw-dropping demo.

Because the job that's actually emerging isn't "person who writes one clever prompt." It's the person who can look at a messy business process and say, with confidence: this part should be deterministic code, this part needs AI judgment, this part needs a tool, this part needs human review, and the whole thing needs to be measured. That's how you stop merely playing with AI and start managing agent-led work. And it starts, quietly, with a spreadsheet of business names.

One More Thing

If you want a second set of eyes

I put this guide together because the strategy inside it is real, but I also know that reading a framework and applying it to your own career are two very different things. A matrix is easy to nod along to. Figuring out which second-wave industry actually fits your background, which of your existing skills transfer, and what's genuinely worth learning next — that part is personal, and it's a lot harder to do alone.

So I'm starting to do a small number of informal career audits for people working through exactly this. The idea is simple: I take a look at your résumé and where you are right now, and I give you honest, specific thoughts — which directions might fit you best, where your experience already gives you an edge, a few skills or projects worth prioritizing, and resources that'll actually move the needle. No script, no generic advice, just a real read on your situation and where the openings are for you.

This is early and pretty informal right now. I'm mostly trying to help a handful of people and learn what's most useful in the process. If that sounds like something you'd want, just send me an email with a little about where you're at and what you're trying to figure out, and we'll take it from there. No pressure either way — the whole guide above is yours to run with regardless.

📩 Interested?

Email me at [davebrown.dev@gmail.com](mailto:davebrown.dev@gmail.com?subject=Career%20Audit) with the subject line **"Career Audit"** and a couple sentences about your background and what you're hoping to move toward.

If nothing else, I'd genuinely love to hear which part of this was most useful to you. Good luck out there — the frontier is wide open right now, and earlier than most people realize.

Want more build-along guides for people new to AI agents?

Follow along on Instagram for weekly, beginner-friendly breakdowns.

[@davebrownbrand](https://www.instagram.com/davebrownbrand)


---

# GUIDE: AICareerTwoPathways

d.avebrown instagram.com/d.avebrown

# Breaking Into AI-First Work Without Fighting the Crowd

A strategy guide to the two moves that actually widen your odds — by industry, and by geography.

by d.avebrown · grounded entirely in the Stanford 2026 AI Index Report (Economy chapter)

The Problem

Everyone is pushing on the same front door

If you want to work in AI, the instinct is to aim straight at the center of gravity: the frontier labs, the marquee names, the postings in San Francisco and New York. That instinct is also what a few hundred thousand other people are acting on at the same time. You end up as applicant number four thousand for a role that was designed to attract exactly that crowd.

There's a quieter, more winnable version of the same ambition. AI demand is no longer confined to the places and companies you'd name first. It is *diffusing* — spreading outward into industries that historically had almost no AI hiring, and concentrating, in density terms, in states and countries that aren't the headline answers. The people who read that diffusion correctly get to compete in thinner pools for a growing pile of demand.

This guide lays out the two levers you can pull to do that.

Lever

The move

Industry

Become "the AI person" in a second-wave sector that isn't yet saturated with AI talent

Geography

Target where AI hiring is *dense* relative to the local market, not where it's simply *big*

They stack. Pull both and you compound the advantage. But first, the thesis they share.

The Core Thesis

Chase diffusion, not headlines

88%

Organizational AI adoption in 2025 — nearly every company says it uses AI somewhere

Single digits

Scaled use of AI agents across nearly every business function — the deployment gap

Declining

Postings mentioning chatbots — while agent & orchestration postings climb sharply

Two facts from the report frame everything that follows. First, **organizational AI adoption reached 88% in 2025** — nearly every company now says it uses AI in at least one function. Second, actual *deployment* lags that number badly: **scaled use of AI agents sits in the single digits across nearly every business function**, and in most functions two-thirds or more of organizations report no agent use at all (Figure 4.3.7). Even the sectors furthest along — technology's own software engineering (24% scaled agent use), IT (22%), and service operations (21%) — are the exception, not the rule (Figure 4.3.8).

That gap between "we bought AI" and "we run AI in production" is the entire opportunity. Companies everywhere have committed to AI on paper and staffed it thinly in practice. The demand isn't concentrated where the technology was invented; it's concentrated where the technology is being *adopted faster than it's being staffed*. Both levers in this guide are just two ways of locating that mismatch — one across industries, one across places.

A related shift tells you what kind of skill the mismatch rewards. The report finds that job postings mentioning ChatGPT, chatbots, and "conversational AI" are **declining**, while postings referencing AI agents, agentic systems, and orchestration frameworks like LangGraph are climbing sharply (Figure 4.4). Demand is moving from *familiarity with chat tools* to the ability to *operationalize task-oriented systems*. Wherever you land, the premium is on people who can implement and scale, not just discuss.

The demand isn't concentrated where the technology was invented. It's concentrated where the technology is being adopted faster than it's being staffed.

Lever 1 — Industry

Follow the second-wave sectors

The most crowded framing of "an AI job" is a role at a technology company. But the report's sector data shows AI hiring spreading well past tech, and — critically — into industries that had almost no AI adoption a year earlier. Here is the full picture of where AI skills show up in US job postings, by sector, with each sector's share of its own postings and its one-year growth (Figure 4.4.9, 2024 vs. 2025):

Sector

AI share of 2025 postings

YoY growth

Information

13.22%

+69.12%

Professional, scientific & technical services

6.49%

+47.10%

Finance & insurance

5.33%

+62.94%

Manufacturing

4.66%

+39.27%

Management of companies & enterprises

3.28%

+102.28%

Utilities

2.89%

+44.35%

Educational services

2.42%

+19.14%

Real estate & rental & leasing

2.08%

+93.48%

Wholesale trade

1.93%

+83.00%

Mining, quarrying, oil & gas extraction

1.87%

+7.64%

Public administration

1.69%

+41.58%

Retail trade

1.67%

+60.25%

Agriculture, forestry, fishing & hunting

1.32%

+33.04%

Transportation & warehousing

1.26%

+55.40%

Waste management & administrative support

0.46%

+30.80%

The report is explicit about what this means: "In 2025, AI hiring also expanded in sectors with historically low adoption rates. Transportation and warehousing, real estate, and education showed year-over-year increases, evidence that the diffusion is reaching beyond traditional technology-driven industries" (Figure 4.4.9 discussion).

How to read this table strategically

The naive read is "go where the share is highest" — Information at 13.22%. That's the *tech-adjacent* answer, and it's where AI talent already clusters. The strategic reads are different:

Read the growth column, not just the share column

Management of companies (+102.28%), real estate (+93.48%), and wholesale trade (+83.00%) are growing faster than Information (+69.12%) from far smaller bases. High growth off a low base is the signature of a sector that is just now deciding it needs AI people — and hasn't yet hired the ones who understand it.

**Weight the big, established industries that are quietly climbing.** Finance & insurance (5.33%) and manufacturing (4.66%) aren't novelties — they're enormous employment bases with real budgets, now posting AI shares that put them second only to tech-adjacent categories. Being the AI-literate person inside a large manufacturer or insurer means competing against that firm's *existing* workforce for an internal-frontier role, not against the global applicant flood chasing the labs.

**Treat the low-share, rising sectors as first-mover territory.** Transportation & warehousing (1.26%, +55.40%), real estate (2.08%, +93.48%), and educational services (2.42%) have low absolute AI penetration but clear upward motion. If you can be early here, you're defining the role rather than filling a slot that fifty other qualified people also want.

Positioning: how to actually become "the AI person" in a second-wave sector

The advantage only materializes if you're legible to hiring managers in that industry. Three moves:

### 01 — Pair domain fluency with implementation skill, not modeling theory.

These sectors don't need someone who can train a model; they need someone who can take a bought-but-unused tool and make it run against a real workflow — the exact gap the 88%-adoption-versus-single-digit-deployment data describes. Learn the sector's vocabulary, its systems of record, and its compliance constraints, then position yourself as the person who bridges those to a working AI process.

### 02 — Build a visible artifact in the target sector's context.

The report notes that formal education is lagging AI badly and that *advertising demonstrated AI skills* is itself a rising, tracked signal on resumes (Figure 4.4). A public project — an agent that handles a logistics reconciliation task, a retrieval system over insurance documents, a warehouse-routing prototype — does more for a second-wave employer than a credential, because it proves you can do the thing they can't yet staff.

### 03 — Name the higher-value skill cluster, not the literacy one.

The report separates fast-growing "literacy" skills (AI prompting, Copilot) from higher-value "engineering" skills (AI agents, AI productivity, AI strategy, LLMOps). In a sector that's new to AI, claiming the engineering cluster — and backing it with the artifact above — is what separates a strategic hire from a power user.

Weekend Build Ideas

One shippable artifact per second-wave sector

The point of the "visible artifact" advice is to *show*, not claim. Each project below is scoped to a single weekend, uses off-the-shelf pieces (an LLM API, a small retrieval library, public or synthetic data, a spreadsheet or lightweight web front end), and deliberately avoids anything that needs a data pipeline, a trained model, or production infrastructure. The goal isn't a polished product — it's a working demo plus a short write-up that proves you can turn a bought-but-idle capability into a real workflow.

**Build these in Claude Code, not a chat window — and that distinction is the point.** These are not "ask an AI a question" exercises; they're *buildouts*. You want an agent working inside a real project folder on your machine: creating files, generating synthetic data, writing and running the code, installing dependencies, hitting an actual API, and leaving you a runnable repo with a README. A chat session can hand you a snippet to copy-paste; Claude Code scaffolds the whole thing, runs it, sees the errors, and fixes them — which is exactly the "operationalize it end-to-end" muscle the report says employers are paying for.

*How to use each prompt:* install Claude Code, make an empty folder for the project, open it, paste the prompt, and drive from there. Each prompt is a starting instruction — expect to steer, correct, and extend as it builds. Swap in your own API key when it asks.

### Finance & insurance — a claims / document triage assistant

Take a folder of sample insurance claims or loan applications (synthetic, or public sample forms) and build a retrieval-augmented assistant that reads each document, extracts the key fields, flags missing information, and drafts a plain-language summary with a recommended next action. Add one guardrail: it must cite the source line for every extracted value.

What it proves: you can put an LLM against messy, regulated documents and keep it auditable — the exact concern that stops finance teams from deploying.

Drop this into Claude Code

``` code-box
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

### Manufacturing — a maintenance-log root-cause helper

Feed a synthetic set of equipment maintenance tickets and shift notes into a small system that clusters recurring failure descriptions, summarizes likely root-cause themes, and drafts a standardized work order from a free-text complaint. Bonus: a simple retrieval step over an equipment manual so the assistant can suggest the relevant procedure.

What it proves: you can turn unstructured shop-floor text into structured, actionable output — the near-universal starting point for industrial AI.

Drop this into Claude Code

``` code-box
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

### Real estate — a listing-and-comps drafting agent

Build a tool that takes a property's raw details (or a public listing) plus a few recent comparable sales, then generates a compliant listing description, a pricing-rationale paragraph, and a buyer-question FAQ. Add a step that rewrites the description for three audiences (first-time buyer, investor, downsizer).

What it proves: you can automate the high-volume writing and summarization that eats an agent's week, with tone control — an immediately legible win for a low-AI-penetration field.

Drop this into Claude Code

``` code-box
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

### Transportation & warehousing — a delivery-exception reconciliation agent

Simulate a small set of shipment records with mismatches (late deliveries, quantity discrepancies, missing PODs). Build an agent that reads each exception, classifies the likely cause, drafts the customer-facing update, and produces a prioritized action list for a dispatcher. Keep a running log so it's demonstrably repeatable.

What it proves: you can operationalize a repetitive coordination task end-to-end — the "agentic, not chat" skill the report says demand is shifting toward.

Drop this into Claude Code

``` code-box
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

### Educational services — an auto-grading and feedback drafter

Take a set of sample short-answer responses against a rubric and build a tool that scores each one, drafts specific, encouraging feedback, and flags borderline cases for human review. Add a summary view that surfaces the class's most common misconceptions.

What it proves: you can save instructor time while keeping a human in the loop — the trust condition education buyers insist on.

Drop this into Claude Code

``` code-box
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

### Public administration — a constituent-request router and drafter

Using public FAQ or policy documents from any agency's website, build a retrieval assistant that answers common constituent questions with citations to the source policy, routes anything ambiguous to the right department, and drafts a first-response email. Include a "no answer found — escalate" path so it never fabricates.

What it proves: you can deploy AI in a low-tolerance-for-error, high-accountability setting — precisely the D.C. / public-sector density lane most technical applicants ignore.

Drop this into Claude Code

``` code-box
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

### Wholesale trade — a purchase-order and catalog normalizer

Take a messy mix of supplier product descriptions (varying formats, units, abbreviations) and build a tool that normalizes them to a clean schema, matches likely duplicates, and drafts a standardized catalog entry. Add a confidence score and a review queue for low-confidence matches.

What it proves: you can tame the data-cleanup problem that blocks almost every downstream analytics or automation effort in distribution-heavy businesses.

Drop this into Claude Code

``` code-box
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

The repeatable pattern

Ingest the sector's messy text → extract or classify → draft the human-facing output → keep it auditable with a review or escalation path. Learn that pattern once and you can retarget it to any of these industries in a weekend. Package each as a short repo plus a one-paragraph "here's the workflow it replaces and why it's safe" write-up — that framing is what turns a demo into a hiring signal.

After the Build

Use Claude Code to interrogate what you made

Here's the move most people skip, and it's where the real learning lives. A weekend demo runs on your laptop, on synthetic data, when you type a command. A *production system* runs on its own, on real data, for other people, without you babysitting it. The gap between those two is exactly the "we bought AI but haven't deployed it" canyon the report describes — and understanding that gap is a hiring signal in itself.

The advantage of having built in Claude Code is that the agent can *see your actual repo*. So instead of asking generic questions about deployment, you can ask it to explain what *your specific project* would need. Paste these prompts into the same session after your build runs. You're not asking it to build production — you're asking it to *teach you the map* using your own code as the textbook.

Understand what you actually built

``` code-box
Walk me through the architecture of this project as if you're onboarding me.
What are the moving parts, how does data flow through it, where does the LLM
get called, and what are the current assumptions that would break if a real
user ran this instead of me on sample data? Draw it as a simple diagram in text.
```

What would it take to deploy and host it

``` code-box
Right now this runs on my laptop when I type a command. Explain, in plain
terms, what it would take to host this so it runs somewhere other than my
machine. What are my realistic options (from simplest to most robust), what
would each cost roughly, and what would I have to change in THIS codebase to
make it deployable? Don't build it yet — just teach me the tradeoffs.
```

How to make it run automatically on a schedule

``` code-box
I want this to run on its own — say, every morning, or whenever a new file
shows up — instead of me running it by hand. Explain the ways I could schedule
or trigger this (cron, a scheduled cloud job, an event trigger), which fits
this project best, and what code or config I'd need to add. Show me the
smallest possible version I could set up first.
```

How to feed it real data instead of my synthetic sample

``` code-box
This currently reads from a /data folder I generated. In the real world the
data would live somewhere else — a database, a shared Google Drive or Dropbox
folder, an email inbox, or an uploaded file. Pick two realistic sources for
THIS use case and explain what it would take to connect them, what a database
would add versus flat files, and where I'd have to change my code to swap the
input source cleanly.
```

How to make it reliable enough to trust

``` code-box
If a real team depended on this, what would break and how would I know? Explain
what I'd need to add for reliability — error handling, retries when the API
fails, logging, and some way to monitor that it's actually working. Point to
the specific places in my current code that are fragile and would need this.
```

How to secure it and handle sensitive data

``` code-box
This project touches data that could be sensitive in the real version. Explain
what I'd need to think about for security: where secrets like API keys should
live, how I'd add access control if other people used it, and what handling
personal or regulated data would require. What in my current setup is fine for
a demo but unacceptable in production?
```

How to put a usable interface on it

``` code-box
Right now only someone comfortable in a terminal can run this. Explain my
options for giving a non-technical colleague a way to use it — a simple web
form, an internal tool, a scheduled report that lands in their inbox. Which is
the least effort for the most value here, and what would I add to my project
to get there?
```

You don't have to act on the answers. The point is to walk away able to *talk* about productionizing what you built — which, in an interview for a second-wave-industry AI role, is often the difference between "I made a toy" and "I understand what it takes to run this for real."

The General Map

What "productionizing" actually involves — six moves

You don't need to be an infrastructure engineer to be credible here. You need a working mental model of the handful of things that change when something goes from *a script you run* to *a system a team relies on*. In broad strokes, that's six moves.

### 01 — From your laptop to somewhere it can live (hosting).

A weekend build runs where you built it. Production needs a home that's always on — a small cloud server, a serverless function, or a managed platform. The trade is effort versus control: a managed platform gets you running in an afternoon but hides the plumbing; a raw server gives you full control and more to maintain. For most of these tools, the simplest hosted option is more than enough to start.

### 02 — From "I run it" to "it runs itself" (scheduling and triggers).

Most of these workflows are valuable precisely because they're repetitive, which means nobody should have to launch them by hand. Production replaces the manual command with a trigger: a scheduled job (the classic "cron job" that fires every night at 2 a.m.), or an event ("when a new claim lands in this folder, process it"). This one shift — from on-demand to automatic — is often what turns a demo into something a team actually adopts.

### 03 — From a sample folder to real, changing data (storage and inputs).

Your build reads synthetic files you generated. The real version pulls from where the business already keeps its information: a database, a shared Google Drive or SharePoint folder, an inbox, a form, or an existing system of record. Two things usually have to appear here — a real *input connection* that fetches the live data, and often a *database* to store results, track what's already been processed, and let you query history. You don't need anything exotic; you need the tool to stop assuming the data is sitting in a folder you made.

### 04 — From "it worked once" to "it keeps working" (reliability).

Real systems fail in boring ways: the API times out, a document is malformed, the network hiccups. Production adds the unglamorous scaffolding that handles this — retries when a call fails, sensible error handling so one bad record doesn't crash the whole run, logging so there's a record of what happened, and basic monitoring so someone gets alerted when it breaks instead of discovering it three days later. This is a large part of what "operationalizing" really means.

### 05 — From open on your machine to safe for a team (security and secrets).

The moment real data and other people are involved, a few things become non-negotiable: API keys and passwords live in a secrets manager, not in the code; access is controlled so only the right people can use it; and any personal, financial, or regulated data is handled according to the rules that govern that sector. The auditability and human-in-the-loop guardrails you built into the weekend versions are the foundation here — production just formalizes them.

### 06 — From terminal-only to something people can use (interface and cost).

A tool only a developer can run has a ceiling. Production usually adds a way in for everyone else — a simple web form, an internal dashboard, or a scheduled report that just shows up in someone's inbox. And once it runs on real volume, someone has to watch the bill: LLM calls cost money per use, so production systems batch work, cache repeated results, and pick right-sized models to keep costs sane.

None of this has to happen at once. The honest path is incremental: get it hosted, then get it scheduled, then connect one real data source, then add reliability, and so on. Being able to *sequence* that journey — to say "here's where I'd start and here's what I'd add next" — is exactly the judgment that separates someone who can implement AI from someone who can only prototype it. That judgment, not a finished production system, is what these exercises are really building.

Lever 2 — Geography

Play the density game, not the volume game

The second lever is where you look for the role. The default is to chase the biggest markets. The report shows why that default is the crowded trade — and where the thinner pools are.

The obvious answer: raw volume is concentrated in three states

Within the US, AI labor demand clusters heavily. California leads with **170,881 postings — 17.2% of the 2025 national total.** Texas follows with **80,547 (8.1%)** and New York with **66,029 (6.6%)**. Together, those three states hold roughly a third of all AI job postings in the country (Figures 4.4.10–4.4.11). That's the volume answer, and it's exactly where competition is fiercest. Worth noting: even California's dominance is *thinning* — its share of the national total has fallen from over 25% in 2012 to around 17% in 2025 (Figure 4.4.12). The center is slowly redistributing outward, which is the macro version of the entire diffusion thesis.

The non-obvious answer: density relative to the local market

Volume tells you where the most postings are. *Density* tells you where AI makes up the largest slice of what's being hired locally — which is a much better proxy for "how much competition per role." On that measure, the report highlights a different set of leaders:

"Looking at the density of AI labor demand within each state... despite having smaller total numbers, Washington, D.C., accounts for a comparatively high 6.2% share of those postings, followed by Delaware at 4.4%." (Figure 4.4.13)

**Washington, D.C. (6.2%)** and **Delaware (4.4%)** aren't the states you'd name in a word-association test about AI. But a high density of AI postings against a *smaller* total job market is precisely the condition you want: meaningful demand, without the applicant tsunami that follows a California posting. D.C.'s profile in particular reflects heavy public-sector and policy-adjacent AI demand — a lane most technically-minded applicants overlook entirely. The report also notes that from 2024 to 2025, California, Washington state, New York, and Texas all continued to see growth in AI postings (Figure 4.4.14) — so the big states aren't shrinking in absolute terms; they're just no longer the only game, and they carry the heaviest competition.

Go global: the density logic is even sharper across countries

Zoom out and the same principle produces a striking result. Measured as AI's share of *all* job postings — the cleanest available proxy for how AI-intensive a labor market is — the 2025 leaders are (Figures 4.4.1–4.4.2):

Market

AI share of all job postings, 2025

Singapore

4.69%

Hong Kong

3.5%

Luxembourg

3.4%

Spain

3.3%

United States

2.6%

Chile

2.4%

United Kingdom

1.9%

**Singapore leads the world at 4.69%** — nearly double the intensity of the entire United States (2.6%). The country most saturated with AI *opportunity per job* is not the one with the most jobs. If you have any optionality about where you work — or can work remotely for an employer based there — this table is a strategic input, not a footnote.

Turning density into a job-search tactic

Three deliberate moves

Treat "where I'm willing to work" as a lever you're actively setting, not a default you inherited — the calculus of competition per role changes materially between a California posting and a D.C., Delaware, or Singapore one. Use remote and relocation openness to arbitrage the gap — you don't have to live in D.C. to apply into its density, or move to Singapore to benefit from its intensity. Combine density with the second-wave sectors — a high-density market that's also home to an under-staffed second-wave industry is the strongest single target.

Why Now

Two tailwinds behind both levers

Timing matters, and two data points suggest the window for this strategy is unusually favorable right now.

### The inbound talent competition is thinning.

The number of AI researchers and developers moving *to* the United States has **dropped 89% since 2017**, with 80% of that decline occurring in the last year alone (Economy chapter, talent-flows section). For a domestic early-career professional, that means competing against a *shrinking* inflow of global talent — the external applicant pool feeding US roles is smaller than it has been in years.

### The money hasn't left; the deployment gap hasn't closed.

The same report shows US AI investment still dwarfing rivals and thousands of new AI companies being funded, even as adoption (88%) massively outruns real deployment (single-digit scaled agent use). Enormous capital, a widening implementation gap, and a thinner competitor pool is about as favorable a setup as an entrant gets. The caveat is that talent-flow and policy conditions shift — so the argument is to use the tailwind now rather than assume it persists.

The Targeting Matrix

Putting both levers together

The two moves aren't alternatives; they're axes. Score any opportunity on both:

High-density / thinner geography\
(D.C., Delaware, Singapore, remote-for-intense-market)

High-volume / crowded geography\
(CA, NY, TX metros)

Second-wave industry\
(manufacturing, finance, real estate, transport, education, public admin)

**Best target.** Both levers working for you: scarce talent, rising demand, less competition.

**Strong.** Sector scarcity offsets geographic crowding.

Tech / Information sector

**Good.** Density offsets the crowd of AI-native applicants.

**Hardest.** The default everyone else is also chasing — the applicant-#4,000 zone.

The bottom-right cell — a frontier-lab-style role in a top-volume metro — is the one to *avoid* as a default, not because those jobs are bad, but because that's where your odds are worst. Every step you take toward the top-left cell improves the ratio of demand to competition working in your favor.

The Action Checklist

Concrete steps to operationalize both levers

### 1. Pick one second-wave sector you have a genuine angle on.

Prior experience, network, or authentic interest in finance, insurance, manufacturing, real estate, logistics, education, or public administration beats a cold entry into tech. Weight sectors with high *growth* off a modest base — that's where talent is scarcest.

### 2. Learn the engineering cluster, not the literacy cluster.

Prioritize AI agents, orchestration, and LLMOps — the skills the report shows demand shifting *toward* — over chat-tool familiarity, which it shows demand shifting *away* from.

### 3. Ship one visible artifact set in your target sector's context.

Solve a real workflow problem for that industry and make it public. This substitutes for the credential the education system is failing to provide.

### 4. Redraw your geographic map around density.

Add D.C., Delaware, and other high-density-but-lower-volume US markets to your search. If you have any international optionality, weigh Singapore and the other high-intensity markets.

### 5. Set remote / relocation openness as a deliberate lever.

Decide how wide your geographic aperture is on purpose — it directly determines how many thinner pools you can compete in.

### 6. Aim for the top-left of the matrix.

A second-wave industry inside a high-density market is your single best target. Treat a headline-lab role in a top-volume metro as the fallback, not the goal.

### 7. Move while the tailwinds hold.

Thinning inbound talent competition and an unclosed deployment gap won't stay this favorable indefinitely. The strategy rewards acting now.

### The One-Line Version

Everyone is pushing on the front door — the famous companies, in the biggest cities, doing the most visible AI work. The report's data says the openings are around the side: in industries that just started adopting AI and haven't staffed it, and in places where AI demand is dense but the applicant crowd isn't. Position yourself at that frontier — by sector, by geography, or ideally both — and you compete for growing demand in a thinner pool instead of fighting the crowd for the same scarce seats.

One More Thing

If you want a second set of eyes

I put this guide together because the strategy inside it is real, but I also know that reading a framework and applying it to your own career are two very different things. A matrix is easy to nod along to. Figuring out which second-wave industry actually fits your background, which of your existing skills transfer, and what's genuinely worth learning next — that part is personal, and it's a lot harder to do alone.

So I'm starting to do a small number of informal career audits for people working through exactly this. The idea is simple: I take a look at your résumé and where you are right now, and I give you honest, specific thoughts — which directions might fit you best, where your experience already gives you an edge, a few skills or projects worth prioritizing, and resources that'll actually move the needle. No script, no generic advice, just a real read on your situation and where the openings are for you.

This is early and pretty informal right now. I'm mostly trying to help a handful of people and learn what's most useful in the process. If that sounds like something you'd want, just send me an email with a little about where you're at and what you're trying to figure out, and we'll take it from there. No pressure either way — the whole guide above is yours to run with regardless.

📩 Interested?

Email me at [davebrown.dev@gmail.com](mailto:davebrown.dev@gmail.com?subject=Career%20Audit) with the subject line **"Career Audit"** and a couple sentences about your background and what you're hoping to move toward.

If nothing else, I'd genuinely love to hear which part of this was most useful to you. Good luck out there — the frontier is wide open right now, and earlier than most people realize.

Want more guides on positioning yourself for the AI economy?

Follow along on Instagram for weekly breakdowns.

[@davebrownbrand](https://www.instagram.com/davebrownbrand)

Source: Stanford 2026 AI Index Report — Economy chapter (Section 4.4, "Jobs," and Section 4.3 on agent deployment). Sector shares and growth (Fig 4.4.9); US state volume and concentration (Figs 4.4.10–4.4.12); US state density (Figs 4.4.13–4.4.14); global AI job intensity (Figs 4.4.1–4.4.2); skill-cluster shift (Fig 4.4); adoption vs. scaled agent use (Figs 4.3.7–4.3.8); US AI talent inflow down 89% since 2017 (talent-flows section).


---

# GUIDE: AIEnablementGuide

d.avebrown instagram.com/d.avebrown

# The AI Enablement Playbook

Every company just bought AI. Almost none of them have figured out how to use it. That gap is a job — and you can start doing it from the seat you're already in.

by d.avebrown

There's a role opening up inside basically every company right now, and it's not the one everyone's chasing. It's not "AI engineer." It's not "ML researcher." It's not "prompt wizard." And it's definitely not "the person who tells everyone to use ChatGPT and calls it a transformation."

It's **AI enablement** — helping real teams, doing real work, actually use this stuff. That sounds soft. It isn't. It's quietly becoming one of the most valuable jobs in the modern workplace, and here's the uncomfortable reason why.

Most companies already have AI. They have licenses, pilots, a memo from the CEO about productivity, and a handful of people in every department poking at ChatGPT or Copilot. What they *don't* have is adoption. Redesigned workflows. Clear rules. Confident employees. Managers who know what to automate, what to augment, and what to leave the hell alone. The tools showed up. The change didn't.

Deloitte's 2026 State of AI in the Enterprise report puts numbers on it: companies expanded worker access to sanctioned AI tools by roughly 50% in a single year — but access didn't turn into usage. Only 25% of organizations had moved 40% or more of their experiments into production, though 54% expected to hit that mark within three to six months. Translation: everyone's moving fast and stuck at the same time.

The bottleneck isn't the technology. It's adoption, training, workflow design, trust, governance, and plain old change management. That's the whole opportunity — and the good news is you don't need a title to start filling it. You need a playbook. Here's mine.

The Mental Model

Access is not enablement. The gap between them is the job.

### Enablement is turning scattered experiments into repeatable behavior.

Most AI use inside companies today is random. Someone tries a clever prompt. Someone gets Claude to rewrite an email. Someone summarizes a meeting. Useful — but it evaporates the second that person logs off. It lives in one head and dies in one chat thread.

Enablement is what happens when that stops being an accident. It's when a team can answer, out loud and consistently: what parts of our work are good candidates for AI, what tools are approved, what data is safe to use, what still needs a human, where it saves time, where it creates risk, and how we'd even know if it's working. That's a fundamentally different skill than "being good at AI."

The One Idea To Hold Onto

Plenty of people are good at playing with AI. Very few are good at getting a nervous, busy, skeptical team to actually change how they work. The second thing is the career. The first thing is a hobby.

Why Now

The tools are here. The transformation isn't. Someone has to close it.

### Companies are bracing for automation they haven't designed for yet.

Deloitte found 34% of organizations using AI to deeply transform products or business models, and another 30% redesigning key processes around it — but 37% are still using AI at a surface level, with little or no change to how the work is actually done. Tools bought, habits unchanged.

The number that should make you sit up: 84% of companies have *not* redesigned jobs around AI — even though 36% expect at least 10% of their jobs to be fully automated within a year, and 82% expect that within three years. They're bracing for impact and steering with their knees. Someone has to actually do the redesign, and it won't only be engineers, executives, or consultants with pretty decks. It'll be people who can sit between the business, the tools, the process, and the humans.

Read The Room

"We expect AI to change a third of our jobs" and "we have not changed a single job" are both true at most companies right now. The person who can turn the first sentence into a plan is the one who gets funded.

The Big Misread

This is a translation job, not an engineering job

### The hard part was never "can the tool do something cool."

People hear "AI" and assume the role has to be deeply technical. Parts can be — if you're wiring up agents, APIs, or data pipelines. But the enablement side is mostly translation. Can you understand what the business is trying to do? Map how the work actually gets done today? Spot where AI fits and, more importantly, where it doesn't? Teach someone without making them feel stupid? Calm the fear without lying about the disruption?

That's product thinking, onboarding, operations, customer success, change management, and internal comms — not backpropagation. If you've ever gotten a room full of busy people to adopt a new piece of software, you already own the hardest muscle in this job. The tool doing something interesting is easy. Getting people to trust it, use it right, and change their Tuesday is the whole game.

Who's Already Halfway There

Five backgrounds with a real head start

### 01 — Product Managers

PMs already live between users, business goals, and engineering constraints — which is exactly the AI enablement battlefield. You know how to ask "what problem, which user, what's the current workflow, how do we measure success." The trap: over-indexing on tool selection and roadmap while under-investing in training and the messy human adoption. Deciding what should exist is not the same as getting people to use it.

### 02 — Customer Success & Onboarding

The most underrated background on this list. Your entire job has been moving people from "I technically have a login" to "I actually know how this helps me" — which is the exact problem every company now has with AI. You know how to handle resistance, explain software in plain English, spot where people get stuck, and build onboarding that repeats without you in the room. That last part *is* enablement.

### 03 — Support Leads

Support sees the real pain — the repeated questions, the broken processes, the weird edge cases — often faster than any executive. That makes you great at spotting genuine use cases. Just don't pitch "replace support with bots." The mature version asks: which workflows can AI assist, which answers can it draft, which repetitive tickets should've been documentation, and which escalations still need human judgment.

### 04 — Operations

Ops people understand process, and process is everything here — because AI dropped onto a broken process just gives you a faster broken process. Here's the line worth tattooing on the wall: *humans make tiny judgment calls that quietly keep broken processes alive; AI usually can't.* A person works around missing fields, inconsistent names, and undocumented exceptions. AI exposes all of it. Your edge isn't knowing every model — it's knowing how work actually moves.

### 05 — Trainers, Educators & Internal Comms

Companies don't just need tools; they need AI literacy — practical, not abstract. Not "here's what a large language model is," but "here's how sales preps a call, here's how finance reviews variance, here's how a manager preps a one-on-one without turning into a surveillance goblin." That last bit matters: enablement isn't just enthusiasm. It's judgment about where the tool belongs and where it doesn't.

Enablement vs. Theater

What "good" actually looks like — and the version that fools everyone

### Great enablement is boring, specific, and measured.

You can spot the real thing by five signs. **People know what they're allowed to use AI for** — they're not guessing or quietly pasting customer data into random tools. **Training is role-specific** — marketing gets marketing examples, nobody sits through a generic "AI 101" and pretends it changed anything. **Teams have reusable workflows, not just prompts.** **Managers understand how the work is changing** — including the honest question of what happens to the five hours AI just freed up. And **adoption is measured** in business terms: faster cycles, better answers, fewer errors, more confidence.

Prompt vs. Workflow — Know The Difference

A prompt is: "summarize this." A workflow is: "Every Friday, CS exports at-risk accounts, AI summarizes each one's support history and flags renewal risk, drafts next steps, and a human CSM approves the plan before anything goes out." One is a party trick. The other is a system.

### The dangerous version: hype, demos, and nothing that survives contact.

The bad version of this role shows up with slides and energy. Runs a few workshops, teaches prompting, says "AI will change everything," makes a spreadsheet of use cases, launches five pilots — and then nothing changes. This is the proof-of-concept trap, and Deloitte names it plainly: pilots run in clean, isolated environments with small teams, but production demands integration, security review, compliance, monitoring, and maintenance. That's where experiments go to die. Your value isn't demoing a cool tool. It's moving demo → workflow → measurable impact.

The Three Skills

Fluency, process thinking, change management

### 1. AI Fluency — be meaningfully ahead of the average employee

You don't need to be an ML researcher. You need to know what's possible and where it breaks. Get fluent with the major tools, understand how prompting works in real workflows, how to judge output quality, how agents differ from chatbots, how retrieval and internal docs change the answers, where hallucinations creep in, when human review is non-negotiable, and what should never be pasted into a public tool. Know what "good enough" means for a low-risk task versus a high-risk one. You don't need everything — you need a real edge over the median coworker.

### 2. Process Thinking — the part the hobbyists skip

Before you recommend AI, you should be able to map the current process: what triggers the work, who touches it, what systems are involved, what decisions get made, where it gets stuck, what gets reviewed and approved, and what happens when it goes wrong. *Only then* ask whether AI belongs. Sometimes the honest answer is no — the fix is a better form, cleaner data, or standardizing the process before you ever touch a model. That restraint is where your credibility comes from. Serious enablement people improve the work, not sprinkle AI on it.

### 3. Change Management — the most important one

People are scared, and a lot of that fear is rational — they read the same automation headlines the executives do. So you cannot walk in and say "don't worry, this won't affect your job." They won't believe you, and they probably shouldn't. The better message: *"Yes, this changes the work. That's exactly why we need to be the ones shaping how it changes."* Empathy without denial. Teaching without condescending. Pushing without bulldozing.

The Starter Kit

Don't wait for the title. Start doing the work from your current seat.

### Step 1 — Pick one annoying workflow

Not "transform the company." One annoying, frequent, text-heavy task with a predictable output, a human still reviewing the result, and manageable risk. Think: summarizing calls, drafting follow-ups, turning meeting notes into action items, categorizing feedback, writing release notes from tickets, prepping sales briefs. **Do not start** with legal, medical, financial approvals, HR terminations, or anything where a bad output hurts someone. Boring and low-risk is the point.

### Step 2 — Map the workflow before you add AI

Write down who does it, how often, how long it takes, the inputs, the outputs, who reviews it, where it stalls, what "good" looks like, and the mistakes that repeat. This is the move that separates serious enablement from random prompting. "AI can help with this" is a shrug. "This takes 90 minutes, happens three times a week, and fails at these two points" is something you can actually improve — and prove.

### Step 3 — Build a simple assisted version

Not a product. Not a platform. A better way to do the one task, designed so AI assists and the human keeps the judgment.

The Shape Of A Good First Workflow

Input: customer call transcript AI task: summarize pain points, action items, risks, and a draft follow-up email Human task: review, edit, send Output: a cleaner follow-up in a fraction of the time

### Step 4 — Test with two or three real people

Not the whole company. Two or three people who actually do the work. Watch where they get confused, ask what they don't trust, ask whether it saves time or just creates a new thing to babysit. AI workflows tend to look brilliant to the person who built them and awkward to the person using them on a chaotic Tuesday afternoon. Find that out now, cheaply.

### Step 5 — Measure before and after

Keep it simple: time before, time after, how much editing was needed, how often the output was usable, how confident users felt, what still needs a human. You're not just playing with a tool — you're building proof that you can drive adoption. That proof is career capital, and almost nobody bothers to collect it.

### Step 6 — Package it so it works without you

A one-page guide, a short Loom, a reusable prompt, a "when to use this" checklist, a "never paste this" list, a couple of good-vs-bad output examples, and a tiny FAQ. The moment other people can run the workflow without you in the room, you've stopped using AI and started *enabling* it. That's the whole promotion in one sentence.

### Step 7 — Share the win like an adult, not a hype account

Copy This Internal Note

"We tested an AI-assisted workflow for summarizing customer calls. The goal wasn't full automation — it was cutting manual recap time while keeping human review. In a small test it dropped first-draft time from ~X to ~Y minutes, and the team found it most useful for action items and follow-up emails. Recommended next step: test with five more users and build a version tuned for account managers."

No hype, no fear, no "AI changes everything." Just practical, measured, honest. That tone is what makes leadership start seeing you as the person for this.

Five Portfolio Projects

Strong first builds, internal or freelance

### 1. Meeting → Action

Take a transcript, extract decisions, owners, deadlines, risks, and open questions, generate a clean follow-up, human reviews before sending. Low risk, instantly understood, useful across nearly every team. The perfect first win.

### 2. Customer Feedback Synthesizer

Feedback is scattered across tickets, calls, emails, reviews, and Slack. Pull a sample, cluster by theme, severity, and segment, ship a weekly "voice of customer" report. Proves AI can turn messy qualitative sludge into an actual business insight — and product, support, and leadership all want it.

### 3. Internal Knowledge Assistant

Gather existing docs, find the gaps and stale material, build an approved FAQ or assistant with source links, human owners maintain it. Teaches the lesson that carries the whole field: *AI is only as good as the information it can reach.*

### 4. Sales Prep Assistant

Pull account notes, CRM history, recent emails, support issues, and appropriate public research into a call brief with likely pain points and discovery angles; rep reviews before the call. Clear productivity value, easy to measure, a clean example of AI augmenting a human instead of replacing one.

### 5. Policy Explainer

Nobody reads the long policy. Turn an approved one into plain-English summaries, role-specific examples, and "can I do this?" scenarios, with links back to the source. Great for HR, compliance, IT, and security — and it shows enablement isn't only about speed. It can reduce risk and increase understanding at the same time.

Positioning

Become useful before you announce yourself

### Don't declare yourself "the AI person." Show up with results.

The title-first move backfires. The credibility-first move doesn't. Start saying things like: "I tested a safer way to use AI for this workflow." "I mapped the current process and found two spots where AI helps without removing human review." "I'd like to run a small pilot with three people and measure whether it saves time." And the most powerful one of all — *"I think this is a case where automation beats AI"* — or even "this isn't an AI problem, it's a broken-process problem." Executives are drowning in hype. The person who can separate signal from noise gets trusted immediately.

If Your Company Is Slow, Build Proof Outside It

Help a small business, nonprofit, or creator — but never pitch "AI transformation." Pitch an outcome: "I can turn your customer emails into organized follow-up tasks." "I can help you summarize sales calls and draft the follow-ups." A few small projects become case studies — each one documenting the problem, the old workflow, the assisted workflow, the human review step, the tools, the measurable result, and the risks you considered. That beats "I took a course" every time.

Red Flags

The five ways people torch their own credibility

### 01 — Treating AI as the answer to everything

Sometimes the fix is a checklist, a cleaner database, a policy, a dashboard, or a manager finally making a call they've been dodging. AI is powerful. It is not a substitute for operational clarity, and pretending otherwise is how you get quietly ignored.

### 02 — Dismissing the fear

People aren't stupid for being nervous — they know automation is coming for some tasks. Wave that away and you lose the room. Acknowledge it and pull them into shaping the workflow instead.

### 03 — Confusing demos with adoption

A cool demo is not a changed process. A changed process is when people use the workflow when you're not in the room. That's the only finish line that counts.

### 04 — Skipping governance

Telling people to paste customer data, contracts, or financials into random tools isn't enablement — it's liability with a friendly face. This matters more as agents arrive: Deloitte found nearly three in four companies plan to deploy agentic AI within two years, but only 21% have a mature governance model for autonomous agents. Know enough about data privacy, sensitivity, and human approval to not be dangerous — and you'll be taken far more seriously than the person who only knows prompts.

### 05 — Measuring vibes

"It felt useful" is not evidence. Measure time saved, quality improved, errors caught, response time cut, confidence raised, adoption rate. Even rough numbers beat vibes — and they're what turns a nice pilot into a funded program.

The 90-Day Pivot

A concrete plan you can start Monday

Days 1–15 · Learn & Observe

Pick two AI tools and use them daily until they're second nature. Study your own team's workflows. Write down five text-heavy, repetitive use cases. Find your company's AI policy — if there isn't a clear one, that's a risk worth noting. Launch nothing yet. Goal: understand where AI could actually help.

Days 16–30 · Pick One Workflow

Choose one low-risk workflow. Map the current process, talk to the people who do it, estimate the time it eats, define what "better" looks like, and build a simple assisted version — with the human review step baked in. Goal: a small, safe pilot.

Days 31–45 · Test With A Tiny Group

Two or three people. Watch them use it, collect feedback, tighten the prompt and the instructions, document what works and what doesn't. Goal: evidence, not perfection.

Days 46–60 · Package It

Short guide, short demo, checklist, safety rules, examples, and clear "do not use this for" guidance. Goal: make it usable without you personally explaining it every time.

Days 61–75 · Measure & Share

Compare before and after: time saved, output quality, where human review mattered, what risks surfaced, whether users would keep using it. Share the results with your manager. Goal: become visible as someone who improves work with AI responsibly.

Days 76–90 · Expand Carefully

Pick one path: improve the original, adapt it for another team, or take on a second use case. Don't sprint. Enablement credibility is built from small wins that survive contact with reality.

### The Honest Pitch

No, you're not going to become an "AI Enablement Executive" tomorrow — and anyone selling you that is selling you something. But you can start walking the path today. Tools will change, models will change, vendors will change. The durable skill is helping humans and organizations adapt to new capabilities, and that skill compounds.

Become the person on your team who understands the tools better than most, who spots the practical use cases, who builds the simple workflows, who teaches others, and — crucially — who knows when *not* to use AI. Someone who helps people adopt new ways of working without making them feel replaced, stupid, or left behind. That's the lane. Not AI hype. Not AI panic. AI enablement. And the best time to start building proof is before the title becomes obvious.

Want more on building an AI-native career?

Follow along on Instagram for weekly breakdowns.

[@davebrownbrand](https://www.instagram.com/davebrownbrand)


---

# GUIDE: AIPositioningStrategy

d.avebrown instagram.com/d.avebrown

# Don't Get Hollowed Out

A 2026 positioning strategy for anyone who's worried AI is coming for the bottom of the ladder.

by d.avebrown · built from the Stanford 2026 AI Index Report

This is written for people early in a career — or early in a reinvention — in any field, not just tech. Here is the uncomfortable thing the data keeps whispering, and almost nobody wants to say out loud: **the bottom rung of the career ladder is being sawed off.**

For a century, the deal was simple. You entered a field at the bottom, did the repetitive, low-judgment work nobody senior wanted to do, and in exchange you absorbed the reps that slowly turned you into someone valuable. The grunt work *was* the tuition. AI is now doing the grunt work — faster, cheaper, and without complaint — which means the tuition is no longer being collected, and the apprenticeship it used to buy is quietly disappearing.

You can read that as a threat or a tell. This document treats it as a tell. If the bottom rung is gone, the counter-move is not to cling to it. **The counter-move is to skip it.** Use AI to operate at a level of judgment, strategy, and output that the old ladder would have made you wait a decade to reach — and reach it before anyone expects you to. What follows are ten strategies for doing exactly that. They are not about becoming a programmer. They are about making yourself the kind of person AI amplifies rather than the kind of person AI replaces.

10,000%+

Year-over-year growth in one category of AI-orchestration job postings

~20%

Drop in employment for the youngest workers (22–25) in the field AI hit first

88%

Organizational AI adoption — while in-production autonomous use stays in single digits

The tools are the great equalizer. Whether they lift you or replace you comes down to a single choice: are you the hands, or the head?

The Fork

Every strategy here is a way of choosing the left column

Before the ten moves, it helps to name the two people the data is separating. The same technology produces both. The difference is never the tool — it's the posture the person takes toward it.

The person AI amplifies

The person AI replaces

Defines their worth by

Judgment, taste, and outcomes owned

Tasks executed and hours logged

Uses AI to

Do the work; keep the thinking

Skip the thinking; sound fluent

Relationship to the tool

Directs it — decides what, why, in what order

Operates it — runs the buttons on request

Career timeline

Compresses the ladder into a sprint

Waits to be promoted into judgment

Proof they offer

Visible artifacts — things shipped in the real world

Credentials and job titles

The Ten Strategies

Read the data, then make the move it implies

### 01 — Stop being the hands. Start being the person who directs the hands.

The single clearest signal in the labor data is that demand is fleeing the "operate the tool" layer and rushing toward the "orchestrate the work" layer. In the AI job market specifically, postings that just mention chat tools are *declining*, while postings for people who can coordinate and operationalize AI systems have exploded — one category grew over **10,000% year-over-year**. But you don't need to work in tech for the lesson to apply. In every field, the person who knows how to *run* a tool is worth less each year, and the person who knows how to design the workflow the tool runs inside is worth more.

The move

Stop measuring yourself by the tasks you can personally execute. Start measuring yourself by the outcomes you can orchestrate — deciding what should be done, sequencing it, and pointing tools (and people) at it. Being good at the button is table stakes. Owning the decision of which buttons, in what order, to what end is the job that's growing.

### 02 — Chase judgment, because that's the one thing the productivity studies can't crack.

When researchers measured where AI actually boosts output, they found gains of **14% to 26%** in structured, well-defined work like customer support and routine drafting — and *weaker or even negative* effects on tasks that require real judgment. That last clause is the whole game. AI is spectacular at the parts of a job that can be specified and checked. It stumbles exactly where ambiguity, taste, tradeoffs, and context live.

The move

Deliberately migrate your time toward the judgment-heavy parts of your work — the ambiguous calls, the "it depends," the situations with no clean answer. If a task can be fully specified in a clear instruction, assume AI will do it soon and stop building your identity around it. Build your identity around the calls that can't be reduced to a spec.

### 03 — Reach senior-level judgment faster than any generation before you — because you have to.

This is the hard one. In the field where AI landed first and hardest, employment for the *youngest* workers (ages 22–25) fell **nearly 20%** from its peak, even as headcount for experienced workers in the same field kept growing. Researchers named it bluntly: **"seniority-biased technological change."** AI substitutes for junior labor and leaves senior judgment intact. The juniors are the canaries. Expect this pattern to spread into any field where entry-level work is routine and documentable.

The move

Treat the traditional "pay your dues for a decade" timeline as canceled. The winners aren't waiting to be promoted into senior judgment — they're practicing it now, on real problems, using AI to cover the experience they don't yet have. Ask the questions a senior person would ask. Produce the deliverable a senior person would produce. Compress the ladder into a sprint.

### 04 — If you're inexperienced, AI is the biggest unfair advantage you'll ever get — so use it that way.

Here's the twist that sits right next to the threat: the same studies show that **less experienced people benefit the most** from AI. Newcomers to customer support saw 30–35% performance gains; junior workers consistently gained more than veterans. AI closes skill gaps. It is, functionally, a great equalizer — *for the people who lean into it.*

The move

The technology thinning out entry-level jobs is the exact same technology that lets a motivated beginner punch a full weight class up. Don't use AI to avoid learning the work. Use it to perform the work at a level your résumé says you shouldn't be able to reach yet — and then keep the receipts.

### 05 — Guard your learning like it's the asset it is — because AI can quietly hollow it out.

There's a trap inside strategy \#4, and it's the most important warning in this whole document. Research found that people who leaned on AI to *learn* showed no real speed improvement and suffered measurable **"learning penalties"** — their long-term skill growth slowed. The ones who avoided the trap used AI for conceptual inquiry (*help me understand why this works*) rather than as a way to skip the thinking (*just give me the answer*).

The move

Draw a bright line. Using AI to do your work is fine and often smart. Using AI to replace your learning is how you wake up in three years fluent-sounding and actually empty. Let AI accelerate your output, but never outsource the reps that build the judgment strategies \#2 and \#3 depend on. Do the thinking; let AI do the typing.

### 06 — Be the "AI person" in an industry that doesn't have one yet.

Everyone's instinct is to run toward the obvious AI hotspots. That's exactly why they're crowded. The data shows AI demand is now spreading into sectors that historically had almost none — transportation and warehousing, real estate, education, finance, manufacturing are all climbing. Meanwhile organizational adoption has hit **88%**, but actual *deployment* of autonomous AI systems is still in the **single digits** across nearly every business function. Most organizations have bought the AI and have no idea how to run it.

The move

You do not need to out-compete four thousand specialists at an AI lab. You need to be the most AI-fluent person in a hospital, a logistics firm, a school district, a real-estate brokerage, a manufacturer. Being the frontier in a field that hasn't reached the frontier yet is a dramatically easier way to become indispensable than joining the stampede.

### 07 — Position yourself where AI demand is *dense*, not where it's merely *big*.

The obvious geography is the biggest markets. The smart geography is the densest ones — where AI demand is high relative to the total job pool, which means less competition per opportunity. In the data, the largest raw markets weren't the most concentrated; smaller places had far higher *intensity* of AI-related demand. The principle generalizes past geography: seek the pools where demand for what you're building is high relative to the supply of people offering it.

The move

Stop defaulting to the crowded, obvious market. Where you work — physically or remotely — and which niche you plant your flag in are strategic choices, not defaults. Aim for high demand-to-competition ratio, not high raw headcount.

### 08 — Use the current tailwind before the window narrows.

Conditions right now are unusually favorable for people already positioned to move, and they may not stay that way. Global movement of AI talent *into* the U.S. has dropped **89% since 2017** — meaning a thinner competitive pool — while capital keeps pouring in: the U.S. still leads global AI investment by a wide margin and funded nearly **2,000** new AI companies in a single year. A growing pile of money, a shrinking crowd competing for it.

The move

Tailwinds like this don't announce their expiration date. If you've been planning to make a move — a pivot, a bet, a new skill you'd monetize — the cost of waiting is rising. Position now, while the money is abundant and the field is comparatively thin.

### 09 — Be the person who *ships* it, not the person who talks about it.

This might be the most valuable line in the entire report. Adoption is at **88%**, but *scaled, in-production* use of autonomous AI is in the **single digits** — in most business functions, two-thirds or more of organizations report *zero*. There is a canyon between "we bought AI" and "we actually run AI." That canyon is a job description waiting to be filled.

The move

Talking intelligently about AI is now common and cheap. Turning a pilot into a working, reliable, deployed system is rare and expensive — and it's what organizations are desperate for. Whatever your field, become the person who bridges idea to thing that runs every day. Implementers beat commentators, every time.

### 10 — Make your skills visible, because the credential is no longer the signal.

Formal education is, in the report's own framing, badly behind: only about half of schools even have AI policies, and just **6%** of teachers call the ones they have clear. No degree program is going to certify what you can do here in time to matter. Meanwhile, publicly demonstrated AI skill is itself a rising, tracked signal on résumés — and it splits into two tiers: basic literacy (prompting, everyday copilots) and the higher-value tier (designing AI-driven workflows, AI strategy, running systems in production).

The move

Don't wait for a certificate. Build things, in public, that prove the higher tier — the strategy and the shipping, not just the prompting. A visible portfolio of "here's a real problem I solved with AI" is currently a stronger signal than a credential, and you can start assembling it this month.

Reading Between the Data

Five things the report implies but doesn't quite say out loud

The ten strategies above come straight from the numbers. What follows is my own read — the second-order consequences those numbers set up, and the traps and openings that sit just underneath them. Treat this section as the "so what if I actually believe all of it."

### A. The compression paradox — and how to survive it.

Strategy \#3 says compress the ladder into a sprint. Strategy \#5 says protect the learning the ladder used to provide. Put them together and you get the sharpest tension in the whole document: the reps that built senior judgment are the exact reps AI just removed. If you skip the bottom rung *and* let AI do your thinking, you don't arrive senior — you arrive hollow, with senior-looking output and no one home behind it. The resolution isn't to slow down. It's to *manufacture the reps on purpose*. Write your own answer before you ask the model. Predict what it will say, then diff your version against its. Argue with it. The goal is to reach senior judgment early **and** real — you only get the compression if you keep the friction.

### B. Beware the sinking middle — the market is becoming a barbell.

Read strategies \#1 and \#10 together and a shape appears: basic literacy is being commoditized at the bottom while orchestration and shipping soar at the top. The dangerous place to stand is the middle — "competent AI user," fluent enough to prompt, not distinct enough to direct. That middle feels safe because it's busy, but it's the part of the curve compressing fastest, because it's the part easiest to specify. Pick an end of the barbell and commit to it. Being merely competent with AI is on its way to meaning as little as being competent with email.

The tell

If everything you do with AI could be written down as a clear instruction for someone else to follow, you're standing in the middle. The top of the barbell is the part that can't — the judgment about what's worth doing and whether the output is actually right.

### C. As output gets cheap, accountability gets expensive.

There's a scarcity flip hiding in the "88% adoption, single-digit deployment" gap. When AI makes competent output nearly free and nearly infinite, the bottleneck stops being production and becomes *trust* — someone who will stake their name on the result being right, safe, and worth acting on. That's why strategy \#9 matters more than it first looks: shipping isn't just building the thing, it's being the human accountable for it in production. The rarest, best-paid role in an AI-saturated org isn't the one who generates the most. It's the one leadership trusts to decide what actually ships. Cultivate that trust deliberately; it's becoming the real premium.

### D. The hollowed-out pipeline is a time bomb — and an opening.

Here's the second-order consequence almost no one is pricing in. If every company saws off its bottom rung at once, then five to ten years from now there's a shortage of people who came up through it — a *seniority drought* caused by never training the juniors who'd have become seniors. Organizations that hollowed out their pipeline will wake up unable to refill the top. If you're early now, that's a double opportunity: reach senior judgment fast via strategy \#3, and become one of the few people who can *rebuild the ladder* — designing how humans and AI train the next cohort. "Knows how to grow talent in an AI-first org" will be a scarce and valuable line on a résumé precisely because so few companies are practicing it today.

### E. Your edge is a depreciating asset — treat it like one.

Every advantage in this document has a half-life. The tailwind in \#8 narrows. The uncrowded industry in \#6 fills up. The dense market in \#7 gets discovered. Being "the AI person" is a lead, not a moat — the frontier keeps moving, and standing still on last year's fluency is how the lead evaporates. The only durable asset here is the *meta-skill*: the habit of repositioning faster than the field catches up. Don't optimize for being early once. Optimize for being able to be early again, and again, as the frontier moves under you.

The Through-Line

Strategies 2, 3, 5, and 9 are one idea in four accents

Don't try to be an excellent junior doing junior work. AI does that now. Use AI to operate at a senior level of judgment and delivery faster than anyone expects you to — and protect the learning that makes that judgment real.

The entry-level rung is being removed. That's not a reason to grip it harder. It's permission — and pressure — to climb past it. The people getting hollowed out are the ones still defining their worth by tasks a machine can now specify and execute. The people pulling ahead redefined their worth as judgment, strategy, and the ability to make AI actually *work* in the real world.

Start This Week

Turning the philosophy into three concrete moves

Strategy is worthless undeployed — which is the whole point of \#9. So here is the smallest version of this document you can act on before the week is out. Pick one real problem in your world. Use AI to solve it at a level above your title. Then make the result visible.

Do this

Because

Ship one real thing AI helped you build, end to end

Implementers beat commentators (#9), and it becomes portfolio proof (#10)

Do the thinking first, then let AI do the typing

Keeps the learning intact while you compress the timeline (#3, \#5)

Point it at your own industry's mess, not the crowded AI frontier

You become the frontier where there isn't one yet (#6, \#7)

### The Takeaway

The tools are the great equalizer. The same technology thinning out entry-level jobs is the one that lets a motivated beginner operate a full weight class up. Which of those two things it does to you is not decided by the model. It's decided by whether you use it to skip the thinking or to skip the waiting.

The bottom rung is gone. Don't mourn it, and don't grip what's left of it. Climb past it — and protect the judgment that makes the climb real. Are you the hands, or the head?

Want more guides on positioning yourself for the AI economy?

Follow along on Instagram for weekly breakdowns.

[@davebrownbrand](https://www.instagram.com/davebrownbrand)

Source: Stanford 2026 AI Index Report — Economy and Education chapters, plus the 10 career insights derived from it. Figures are drawn directly from the report; the "Reading Between the Data" section is added analysis.


---

# GUIDE: AI_Agent_Manager_Guide

d.avebrown instagram.com/d.avebrown

# The Hottest Job in AI Isn't Coding. It's Managing the Agents.

"Agent manager" will be a standard title in AI-first companies within 12 to 18 months. Here's how to pivot into it before everyone else does.

by d.avebrown

There's a guy at Salesforce named Zach Stauber. His job didn't exist a couple of years ago. He starts and ends his day in dashboards — not writing code, not closing tickets himself, but watching a fleet of AI agents resolve customer issues, draft emails, and escalate the hard stuff to humans. His title is *agent manager*, and a recent [Harvard Business Review article](https://hbr.org/2026/02/to-thrive-in-the-ai-era-companies-need-agent-managers) argues that his role is about to become one of the most important jobs in the entire economy.

The pitch is simple. Companies like Salesforce, JPMorgan Chase, and Walmart are no longer just experimenting with AI — they're putting autonomous agents into production. Salesforce's own platform now resolves nearly **74% of inbound support cases** without a human touching them. But agents don't manage themselves. They have to be trained, governed, measured, and coordinated with the humans they work alongside. Someone has to own that. That someone is the agent manager.

Here's the part that matters for you: HBR is explicit that **this is not primarily a technical role.** The best agent managers came from customer service, operations, and sales — people who already knew what "good" looked like and were curious enough to learn how to steer an AI toward it. That means the door is open to a lot more people than you'd think. This guide breaks down what the job actually is, what skills it takes, and the concrete steps — including the credentials worth getting — to pivot into it now.

What's Actually Happening

Agents stopped being tools and became teammates

### Agent managers are the new product managers.

Just as product managers became indispensable during the software revolution, agent managers are becoming the connective tissue between strategic intent and autonomous execution. The agents being deployed today aren't scripts that automate a task — they're semi-autonomous "employees" that learn from feedback, collaborate with other agents, and hand off to humans when a case gets too complex.

One Salesforce sales-development team is the clearest proof. Before agents, reps could personally reach 12 to 15 prospects a day, so good leads went cold. After deploying an AI agent to handle the high-volume outreach and follow-up, the team went from booking 150 meetings in 30 days to **350 meetings in a single week** — generating \$60M in annualized pipeline and 300+ new clients in four months. The humans didn't get replaced; they got promoted into the high-value work agents can't do.

The Structural Bet

This is not a fad job that disappears next quarter. HBR compares it to DevOps and Site Reliability Engineering: a durable operating function born from a permanent change in how work gets done. Those roles didn't go away. Neither will this one.

The Day Job

What an agent manager actually does all day

### You coach machines the way a manager coaches people.

Agent managers sit at the crossroads of customer experience, AI operations, and product management. Their mandate is to translate functional expertise into measurable AI performance. In practice, the role looks like this:

**Monitoring agent performance** — quality, speed, escalation rates, and customer sentiment, all day, in dashboards.\
**Refining prompts and workflows** to improve accuracy and tone — the equivalent of employee training, but for an AI.\
**Managing handoffs to humans** and making sure escalation fires when it should.\
**Running root-cause analysis** on failed cases to drive continuous improvement.\
**Quantifying impact** through ROI analysis and executive reporting.

The Ownership Shift

In the old world, AI lived inside IT and data science. In the agentic world, the business unit owns its agents — tone, escalation rules, and success metrics — the same way it owns its human team. If an agent does the work, the business owns the result. That's where these new jobs are being created.

The Skill Set

The six capabilities that make an effective agent manager

### 01 — AI operational literacy

You don't need to train models, but you need to understand how agents operate, how prompts drive outcomes, and how to diagnose a system failure when an agent goes sideways. This is the gap most career-changers have to close — and it's the one the credentials below are built to fill.

### 02 — Functional depth

Deep knowledge of the actual business process the agent supports — customer service, finance, logistics, sales. This is the part you almost certainly *already have* from your current career. It's your biggest asset, not your liability.

### 03 — Systems thinking

The ability to see how agents interact across workflows, departments, and each other — what the field calls "multi-agent orchestration." When one agent's output becomes another's input, you're the person who keeps the whole chain coherent.

### 04 — Change resilience

Models shift, business needs shift, and the good agent managers refine their logic in weekly "test-deploy-learn" cycles. HBR describes the way the role is learned as an apprenticeship — comfort with constant iteration is the temperament that wins.

### 05 — Prompt craftsmanship

Designing and refining the language and logic that shape agent behavior. This is employee training for machines: turning messy business rules into simple, adaptive instructions an AI can actually follow.

### 06 — Designing work across machines and humans

Knowing the limits of what a machine can do, building human escalation routes for everything else, and keeping the human side of the team motivated inside a hybrid workflow. You're managing a team that's half software, half people.

The One-Sentence Job Description

An effective agent manager is fluent in three languages at once: • business strategy • the operational workings of AI • people management Most people speak one. The pivot is about adding the other two.

Good News

You may be better positioned than the engineers

### The best agent managers didn't come from AI.

HBR found the most effective agent managers emerged from roles already accountable for service quality, customer outcomes, and operational judgment. They brought deep domain expertise and a lived understanding of what good service looks like — and that mattered *more* than formal AI credentials. Zach Stauber, the Salesforce agent manager, was trained in audio production and came up through service delivery and early chatbot teams. He was picked for what his bosses called "earnest curiosity."

The cautionary tale runs the other way too: organizations that handed agent management entirely to IT, or hired purely on AI credentials, ended up with people who were technically competent but failed strategically. The judgment is the hard part. The tooling is learnable.

If This Sounds Like Your Background, Lean In

• Customer support / contact center leadership • Sales development or sales operations • Customer success • Operations, process design, or QA • Project / program management • Conversational design or content strategy You already own the "what good looks like" half. You just need the AI-operations half.

The Pivot Playbook

Seven concrete moves to make starting now

### 1. Reframe the experience you already have

Stop describing yourself by your current title. Start describing yourself by the business process you understand cold and the outcomes you've owned. That domain depth is the scarce ingredient — agent management is being built on top of it, not instead of it.

### 2. Get hands-on with agents this week

You can't manage what you've never built. Stand up a simple agent — a support responder, a research assistant, a data-extraction workflow. Break it. Watch where it fails. That instinct for failure modes is exactly what the role rewards, and it's the thing you can't fake in an interview.

### 3. Earn a credential that proves AI-operational literacy

This is the fastest way to close the one real gap on your résumé. The standout right now is Anthropic's new **Claude Certified Architect** — more on the specific courses in the next section. A credential won't replace hands-on experience, but it signals you've done the structured work, and the early-mover timing is real.

### 4. Learn multi-agent orchestration specifically

"One agent doing one task" is table stakes. The leverage — and the job security — is in coordinating agents that hand work to each other and to humans. Frameworks like LangGraph, CrewAI, and AG2 are where this is taught; pick one and build something with two agents that talk to each other.

### 5. Start an agent pilot inside your current job

The cleanest path in is often a sideways step where you already work. Find a repetitive, high-volume process on your team, propose a small agent pilot, and volunteer to own it. Now you're not "trying to break into AI" — you're the person who already runs the agents. That's the apprenticeship HBR describes, and you're getting paid for it.

Why This One Works

The role is learned by doing, not by certificate alone. Live operations, failure reviews, and weekly test-deploy-learn cycles are the curriculum. The best place to get that curriculum is the job you already have — before it's a competitive title.

### 6. Shift how you measure success — and talk about it

Activity KPIs ("I made 60 calls a day") are obsolete in this world. The new metrics are outcomes that depend on orchestration: how well you tuned the agent, how the whole human-plus-agent system performed. Practice telling your story in those terms now. It's the language of the role.

### 7. Move while the title is still rare

HBR's timeline: within 12 to 18 months, "agent manager" will be a standard title in AI-first enterprises. Right now it barely exists, which means the people who establish themselves now define the role instead of competing for it. Early is an advantage that doesn't come back.

The Credentials

Three programs that build the AI-operations half of the role

### 01 — Claude Certified Architect (Anthropic)

The new gold-standard signal — and it's brand new

Launched March 2026, the **Claude Certified Architect, Foundations (CCA)** is Anthropic's first official technical credential. It's a proctored, 60-question, 120-minute exam (\$99/attempt) that tests whether you can architect a production agent system — agent loops, multi-agent orchestration, tool design, structured output, and graceful failure handling — not whether you can write prompts. Nearly half the exam sits in agentic architecture and configuration, the exact muscles an agent manager uses.

The single most-tested idea is worth internalizing even if you never sit the exam: **programmatic enforcement beats prompt-based guidance.** When a behavior has to be guaranteed, you build it in code, not "add it to the prompt." The prep materials — 13 free self-paced courses on Anthropic Academy, including *Building with the Claude API*, *Introduction to Model Context Protocol*, and *Claude Code in Action* — are free, and they're the best structured on-ramp to AI operational literacy available right now.

Anti-Patterns Worth Memorizing

• Don't use few-shot examples to enforce tool ordering → use programmatic prerequisites • Don't route on the model's self-reported confidence → LLM confidence is poorly calibrated • Don't return empty results when a subagent fails → return structured error context so it can recover • Don't give every agent every tool → scope tools to each agent's role (4-5, not 18) These are exactly the production judgments the day job is made of.

**Start here:** [Anthropic Academy](https://www.anthropic.com/learn) (free courses)  ·  community study guides at [claudecertifications.com](https://www.claudecertifications.com)

### 02 — IBM RAG & Agentic AI Professional Certificate (Coursera)

The job-aligned, build-things-with-your-hands path

If the CCA is the proof, this is the practice. IBM's program builds job-aligned GenAI skills and hands-on experience in about three months — designing and chaining AI tools with LangChain, implementing function calling, RAG, and vector stores for context-aware applications, and creating autonomous agents with **LangGraph, CrewAI, and AG2**. That last part is the multi-agent orchestration skill the role lives on, taught as a guided build rather than an exam.

**Find it:** [IBM RAG and Agentic AI on Coursera](https://www.coursera.org/professional-certificates/ibm-rag-and-agentic-ai)

### 03 — Build AI Agents with OpenAI Tools (Coursera)

Round out your toolkit across providers

Good agent managers aren't religious about one vendor. This professional certificate teaches building tool-using agents with the OpenAI Responses API, creating custom tools and integrating third-party APIs via function calling, orchestrating multi-agent workflows with the OpenAI Agents SDK, and deploying production agents with Streamlit and Flask. Pairing it with the Claude track gives you fluency across the two ecosystems you'll actually encounter at work.

**Find it:** [Build AI Agents with OpenAI Tools on Coursera](https://www.coursera.org/professional-certificates/build-ai-agents-with-openai-tools)

How to Sequence Them

1\. Anthropic Academy free courses → AI operational literacy 2. IBM RAG & Agentic AI → hands-on multi-agent building 3. Sit the Claude Certified Architect → the credential signal 4. OpenAI Agents cert → cross-provider fluency Do them while running a pilot at work, not instead of one. The certificate proves the learning. The pilot proves the judgment.

Why Now

The first-mover window is open and it closes fast

### This is the AWS-certifications moment, replayed at AI speed.

AWS certs were "just vendor certs" in 2013. By 2016 they were required for cloud roles. The same structural play is happening now — Anthropic has committed \$100M to partner training in 2026, Accenture is training 30,000 people on Claude, and Cognizant has given 350,000 associates access. When adoption moves at that scale, today's differentiator becomes tomorrow's baseline.

The people who establish themselves as agent managers in 2026 will have two years of demonstrated experience by the time the title is table stakes. That signal compounds in a way that starting in 2028 simply cannot replicate. Technology alone doesn't create transformation — leadership does. This is a chance to be that leadership before the field is crowded.

### The Takeaway

Autonomous agents are moving into real production work, and someone has to train them, govern them, measure them, and orchestrate them alongside humans. That someone is the agent manager — a durable new operating role that HBR expects to be standard within 12 to 18 months. It rewards business judgment and domain depth more than a CS degree, which means the door is wide open to people coming from support, sales, operations, and customer success.

The pivot is concrete: reframe the domain expertise you already have, get hands-on with agents, close the AI-operations gap with the credentials above, and — ideally — start running an agent pilot inside your current job. Do that now, while the title is still rare, and you don't compete for the role. You define it.

Want more guides on the careers AI is quietly creating?

Follow along on Instagram for weekly breakdowns.

[@davebrownbrand](https://www.instagram.com/davebrownbrand)


---

# GUIDE: AI_Hallucination_Guide

d.avebrown instagram.com/d.avebrown

# Your AI Is Lying to You

13 techniques to make it stop.

by d.avebrown

These models are word predictors — fancy ones, but at their core, they're guessing the next token based on patterns in their training data. And they've been trained to be helpful at all costs. To agree. To sound confident.

Which is great until they don't know the answer. Then they make one up. Smoothly. Convincingly. Completely wrong.

Here are 13 field-tested techniques to catch it, prevent it, and get dramatically better outputs from any AI model.

From the Video

The three fundamentals

### 01 — Tell It Not to Lie

Sounds almost too simple. But these models are trained to follow instructions — and most people never think to give this one. A single line in your prompt changes the entire dynamic. Think of it like telling a contractor to double-check their measurements: they were always capable of it, you just had to ask. Because these models are optimized to please, they default to confident answers even when they shouldn't. Giving an explicit constraint flips that default — and it works every time.

Try this

"Only give me answers you can back up with real sources. If you're not sure, say so."

### 02 — Tell It to Search, Not Guess

If your question involves niche topics or anything that happened recently, the model probably doesn't know. Don't let it wing it. Force it to look things up instead of generating from memory. Drug interactions updated this year, local regulations, current stock prices, recent court rulings — all of this sits past the model's training cutoff. Even tools with built-in web access will default to memory unless you explicitly tell them not to. The instruction is the unlock.

Try this

"Search for the latest information on \[topic\]. Do not answer from memory."

### 03 — Break the Echo Chamber

Long chat sessions make your AI dumber. The deeper you go in one conversation, the more it agrees with itself — and with you. The mechanism: the model anchors to its own prior outputs and your earlier messages, drifting toward confirmation with every exchange. A fresh context window has none of that history — no prior commitments, no accumulated bias. Copy your best output, open a new chat, and direct it to tear the work apart. This works for plans, emails, business proposals — anything that benefits from a fresh set of eyes.

Try this

"A junior engineer wrote this. Tear it apart."

Bonus Techniques

Ten more ways to keep your AI honest

### 04 — Tell It the Stakes

Models calibrate caution based on context. Higher stakes = more hedging, more "verify this" flags, fewer confident guesses. Without any stakes framing, the model defaults to confident and fast. Tell it the output matters and it shifts into careful mode. Try: "This will be published under my name," or "A lawyer will review this for accuracy," or "Patients will follow this advice." You're not tricking it — you're surfacing care it was always capable of delivering.

Try this

"This information will be used to make a real business decision." or "A doctor will act on this."

### 05 — Run the Confidence Check

Ask it to rate its own certainty on each claim. Watch how fast it starts hedging. The claims it's least confident about are exactly the ones you need to verify independently. Sometimes just asking for a confidence rating causes the model to catch and correct its own errors in real time — before you even see them. Treat anything below 7/10 as a mandatory manual check. You can also follow up with: "Explain why you're less confident on those items" — that reasoning often points you directly to what's shaky.

Try this

"On a scale of 1–10, how confident are you in each of these claims?"

### 06 — Give It Permission to Say "I Don't Know"

Models hallucinate partly because they think silence equals failure. They'd rather be confidently wrong than admit uncertainty. This is a training artifact — during development, responses that produced "something helpful" were rewarded over non-answers. The model learned to always generate output, even when it shouldn't. Your prompt overrides that default. Once you explicitly give it permission to say "I don't know," the output quality jumps. Bonus technique: add "List everything you're uncertain about in this response" to surface hidden guesses you'd otherwise miss.

Try this

"If you don't know, just say 'I don't know' — that's the correct answer here."

### 07 — Separate Tasks from Questions

Don't combine research and writing in one prompt. "Write a bio and include her career history" asks the model to fact-find and generate simultaneously. Hallucinations love hiding inside creation tasks — the writing fluency masks the factual slippage. The two-step workflow: Step 1, ask for facts only ("List the key career milestones for \[person\] — nothing else"). Step 2, review and verify those facts yourself. Step 3, paste them back and say "Using only what I've given you, write the bio." This applies to case studies, grant proposals, technical summaries — any writing that requires the facts to be right.

### 08 — Interrogate the Output

Instead of fact-checking every line yourself, make the model do it. Ask it to poke holes in its own reasoning. It's surprisingly good at this — you just have to trigger it. Models in generation mode produce content; in critic mode they catch errors. Those are genuinely different postures, and the switch happens from a single prompt. Other versions: "List the three most likely errors in what you just told me," or "What assumptions did you make that I should double-check?" Especially powerful for technical content, legal analysis, or anything involving statistics or numbers.

Try this

"What would have to be true for this to be wrong?"

### 09 — Use Two Models, Not One

Run the same question through Claude and ChatGPT. Where they agree, you're probably fine. Where they disagree is your uncertainty zone — don't trust either answer there without checking a primary source. Perplexity is also worth adding to the mix: it cites sources by default, so you can follow the links and verify claims yourself. Another variation: run the same prompt twice in the same model with slightly different phrasing. If the answers conflict with each other, you've found an unstable claim neither version can actually back up. Disagreement is your signal to dig — not your final answer.

### 10 — Anchor It to Primary Sources

Paste in the actual document, data, or article. This turns the model from a guesser into a reader — and readers don't hallucinate. The more real context you feed it, the less it needs to invent. Works for: financial reports, research papers, contracts, product specs, meeting transcripts, legal filings. Modern models can handle 100,000 words or more of pasted content. You can even paste multiple conflicting sources and ask the model to identify where they disagree — letting it do the synthesis work without making up any of the facts.

Try this

"Answer only from what I've given you. Do not bring in outside information."

### 11 — Name the Expert

"Answer as an expert" activates broad, generic knowledge. A specific role activates careful, precise reasoning. The more detailed the persona you assign, the less room there is for slop. A specific persona implies specific standards, methodologies, and thresholds for uncertainty. "As a patent attorney specializing in biotech IP" is a behavioral specification — not just a title. Real experts say "I'd need to review the original study first" rather than winging it. The right persona gets you that same discipline. Try: "As an ICU nurse reviewing discharge instructions," or "As a CPA preparing this for an IRS audit."

Try this

"Answer as a forensic accountant who's testified in federal court."

### 12 — Break the Sycophancy Loop

Without an explicit trigger to push back, the model will validate whatever framing you brought in. It's designed to agree with you. You have to deliberately force it to argue the other side. Sycophancy gets worse the more emotionally invested you seem — the model reads those cues and softens its criticism accordingly. Counter it by presenting ideas neutrally, or explicitly say: "I have no attachment to this — tell me what's actually wrong with it." Other versions that work: "What would a smart, well-informed skeptic say?" or "Give me the steelman case against my position."

Try this

"Assume I'm wrong about my core assumption. What's the argument against it?"

### 13 — Version Your Prompts

If you're running the same type of query regularly, write your anti-hallucination instructions once and reuse them every time. Don't rely on the model being in a good mood. Build a prompt template with your safeguards baked in. Consistency beats hope. A basic research template: "Search for current information only. Rate your confidence 1–10 on each claim. Say 'I don't know' where uncertain. Do not bring in anything from memory — only from sources." Store it in your notes app, as a saved ChatGPT prompt, or as a system prompt via the API. One hour of setup eliminates the same mistake every single time.

Want more AI tips that actually work?

Follow me on Instagram for weekly breakdowns.

[@d.avebrown](https://www.instagram.com/d.avebrown)


---

# GUIDE: BusinessMemoryGuide

d.avebrown instagram.com/d.avebrown

# Give Claude a Memory of Your Business

by Dave Brown · a companion to the /business-memory template set

The Problem

Claude starts every session knowing nothing about you

Claude is genuinely good at the work — writing your emails, drafting your landing page, triaging your leads, answering a customer. But it starts every single session as a brilliant stranger. It doesn't know who your customers are, how your brand sounds, what makes your product different, or how you actually sell. So you re-explain. Every time. And because you're re-explaining from memory under time pressure, you explain it a little differently each time — which means the output drifts a little each time too.

The fix isn't a better prompt. It's *standing context* — a small set of documents that describe your business once, thoroughly, so that any session can start already knowing the things you'd otherwise repeat. You write them once. Claude reads them every time. That's what the **business memory** folder is.

A great prompt tells Claude what to do this time. A memory file tells Claude who you are every time.

The Idea

Five documents that hold everything Claude should already know

The template set breaks a business into five "pillars." Each is short on purpose — a couple of pages, not a binder — because a document you'll actually finish beats a thorough one you abandon. Together they answer the five questions Claude implicitly asks at the start of any real task.

Document

The question it answers

company-overview

Who are you, what do you sell, and why do you exist? *(The anchor — start here.)*

ideal-customer-profile

Who are you for, what hurts them, and what words do they use to describe that pain?

brand-voice

How do you sound and look when you speak?

product-and-positioning

What do you sell, how do you talk about it, and how do you stand apart?

sales-strategy

How do you find, qualify, and win customers?

Two versions in the folder

Each template comes twice. The main folder has every field filled with a worked example (a small coffee shop, "Ember & Oak") so you can see the shape of a good answer. The /blank sub-folder has the same sections and instructions with the examples stripped out — just a → marker waiting for your text. Learn from the filled one; type into the blank one.

How To Use Them

Fill once, then drop the folder into every session

### 01 — Fill them in order, anchor first.

Start with **company-overview** — it's the trunk every other document branches from. Then do ideal-customer-profile, because knowing who you serve makes voice, positioning, and sales far easier to write. Don't aim for perfect. A rough, honest first pass is worth more than a polished blank.

### 02 — Quote reality; don't invent aspiration.

The single most valuable field in the whole set is "the exact language customers use." Pull real phrases from reviews, DMs, and support tickets — verbatim, unpolished. Claude will echo that language back into your marketing, and copy written in your customers' own words converts. Aspirational corporate-speak does not.

### 03 — Delete every example you don't replace.

An example left behind reads to Claude as a fact about your business. If a section doesn't apply, write "N/A" rather than leaving the coffee-shop text in place — an intentional blank is information; a stray example is misinformation.

### 04 — Drop the whole folder into your session.

At the start of a Claude Co-Work session (or a Claude Code project, or a Project's knowledge), add the folder or point Claude at it. Then just work. Ask for "a launch email for the new subscription" and Claude already knows the voice, the audience, the positioning, and the offer — because it read them, not because you re-typed them.

### 05 — Revisit quarterly.

Your audience sharpens, your pricing moves, a new competitor appears. Memory that's a year stale quietly steers every output wrong. Fifteen minutes a quarter keeps the whole set honest.

The Bigger Idea

This works for almost any kind of work

There's nothing coffee-shop-specific — or even business-specific — about this pattern. A "memory file" is just *durable, reusable context that a task keeps needing.* Any role has a handful of things you'd otherwise re-explain to a new hire on day one. Write those down once, and you've built a memory set for your job.

The trick to designing your own set is a single question: **"What do I find myself re-explaining every time I ask for help?"** Each recurring answer is a candidate document. Here's how that plays out across very different roles.

If you work in…

Your memory set might be…

Marketing

brand-voice · audience-personas · channel-playbook · campaign-principles · competitive-landscape · content-calendar-rules

Sales

ideal-customer-profile · product-positioning · objection-handling · account-plans · outreach-cadences · pricing-guardrails

Recruiting

role-scorecards · employer-brand-voice · candidate-personas · sourcing-strategy · interview-rubrics · outreach-templates

Software engineering

architecture-overview · coding-standards · domain-glossary · deployment-runbook · testing-conventions · on-call-playbook

Freelance / consulting

service-catalog · ideal-client-profile · brand-voice · pricing-and-scoping · proposal-structure · portfolio-proof

Teaching

course-overview · student-personas · grading-rubrics · communication-voice · assignment-templates · common-misconceptions

Nonprofit / fundraising

mission-and-programs · donor-personas · case-for-support · brand-voice · grant-strategy · impact-metrics

The repeatable recipe

Notice the pattern across every row: a "who we serve" doc, a "how we sound" doc, a "what we offer / how we frame it" doc, and a "how we execute the core workflow" doc — plus one or two role-specific additions. Name your version of those four, add what's unique to your work, and keep each to a couple of pages. That's a complete memory set for any job.

Sample Prompts

Have Claude build your memory set with you

You don't have to write these from a blank page. Claude is unusually good at *interviewing* you and turning your answers into clean, structured documents. Below are four prompts, from "generate the whole set" to "make mine better." Paste them into Claude Co-Work, a Claude Code project folder, or any Claude chat. Steer as it goes — each one is a starting instruction, not a one-shot.

1 — Generate a full memory set for your business

``` code-box

I want to build a "business memory" folder — a set of markdown files that give
you standing context about my business so I don't re-explain it every session.
Create five files: company-overview, ideal-customer-profile, brand-voice,
product-and-positioning, and sales-strategy. Each should be comprehensive but
not overwhelming (a couple of pages), with a clear section for every key detail.

But don't guess about my business — interview me first. Ask me a focused batch
of questions, a few at a time, starting with what my business does and who it's
for. Use my answers to fill the files in my own words, and flag anything you had
to assume so I can correct it. Save each file as its own .md in a
/business-memory folder.
```

2 — Adapt the whole idea to a different role

``` code-box

I don't run a business in the usual sense — I'm a [marketing manager / recruiter
/ freelance designer / teacher / founder]. I love the idea of a "memory file"
set: durable, reusable context so an AI assistant already knows how I work
instead of me re-explaining every time.

First, propose the 5–6 memory documents that would matter most for my role and
tell me in one line what each would capture. Once I approve the list, interview
me one document at a time and write each as its own markdown file with clearly
labeled sections. Keep each to about two pages. Where a section needs judgment,
give me a short instruction and an example so I can see the shape of a good
answer before I replace it.
```

3 — Fill in a single document by interview

``` code-box

Here's my blank ideal-customer-profile template [paste it, or point me at the
file]. Walk me through it section by section. Ask me one section's worth of
questions at a time, in plain language, and give me an example answer for each
so I know what "good" looks like. When I answer, write that section for me in
clean prose, then move to the next. At the end, give me the complete filled-in
document. For the "language customers use" section, push me to give you real
verbatim quotes from reviews or messages rather than paraphrases.
```

4 — Pressure-test and improve a set you've already written

``` code-box

Read my /business-memory folder as if you're a sharp new employee reading it on
day one. Then tell me: (1) where is it vague or generic enough that it would
produce bland output — quote the exact lines; (2) what important context is
missing that you'd need to actually do my marketing, sales, and customer replies;
(3) where do two documents contradict each other; and (4) which three edits would
most improve the quality of what you generate from these. Be specific and honest,
not flattering. Then show me a rewritten version of the weakest section.
```

Why the "interview me" framing matters

The instinct is to ask Claude to "write my brand voice document." But Claude doesn't know your business yet — so it will invent a plausible, generic one, and generic memory produces generic output forever. Asking it to interview you first flips that: your real answers become the raw material, and Claude does the structuring. You supply the truth; it supplies the shape.

What Good Looks Like

The difference between memory that works and memory that doesn't

Whether you write these yourself or have Claude interview you, the same few habits separate a memory set that sharpens every output from one that quietly makes it blander. The rule of thumb: **specific, honest, and current beats thorough, polished, and aspirational.**

Weak memory

Strong memory

"Our customers are busy professionals who value quality."

"Our customers are 28–45, buy 4+ times a week, and say things like 'it's my little reset button.'"

"Our voice is friendly and professional."

"We say 'we' and 'our,' call customers 'neighbors,' avoid exclamation points, and never use the word 'cheap.'"

"We offer great products at competitive prices."

"We're premium — 15–20% above the chain — justified by roasting on-site so beans are never over 7 days old."

Specific

Numbers, names, and verbatim quotes — not adjectives a competitor could also claim.

Honest

Describe the business you actually run today, not the one you hope to run in three years.

Current

Dated and revisited, so Claude never acts on last year's pricing or last year's audience.

### The One-Line Version

Stop re-explaining your business to Claude at the start of every session. Write it down once — who you serve, how you sound, what you sell, how you win — in a handful of short documents, drop them into any session, and every task starts from context instead of from scratch. The same trick works for any job: name the things you'd tell a new hire on day one, and you've built your memory set.

One More Thing

If you want a second set of eyes

I put this guide together because the strategy inside it is real, but I also know that reading a framework and applying it to your own career are two very different things. A matrix is easy to nod along to. Figuring out which second-wave industry actually fits your background, which of your existing skills transfer, and what's genuinely worth learning next — that part is personal, and it's a lot harder to do alone.

So I'm starting to do a small number of informal career audits for people working through exactly this. The idea is simple: I take a look at your résumé and where you are right now, and I give you honest, specific thoughts — which directions might fit you best, where your experience already gives you an edge, a few skills or projects worth prioritizing, and resources that'll actually move the needle. No script, no generic advice, just a real read on your situation and where the openings are for you.

This is early and pretty informal right now. I'm mostly trying to help a handful of people and learn what's most useful in the process. If that sounds like something you'd want, just send me an email with a little about where you're at and what you're trying to figure out, and we'll take it from there. No pressure either way — the whole guide above is yours to run with regardless.

📩 Interested?

Email me at [davebrown.dev@gmail.com](mailto:davebrown.dev@gmail.com?subject=Career%20Audit) with the subject line **"Career Audit"** and a couple sentences about your background and what you're hoping to move toward.

If nothing else, I'd genuinely love to hear which part of this was most useful to you. Good luck out there — the frontier is wide open right now, and earlier than most people realize.

Want more guides on working with AI like this?

Follow along on Instagram for weekly breakdowns.

[@davebrownbrand](https://www.instagram.com/davebrownbrand)

Companion to the /business-memory template set — five markdown documents (plus example-free /blank versions) that give Claude standing context about your business.


---

# GUIDE: ClaudeConnector

d.avebrown instagram.com/d.avebrown

# The 10 Claude Connectors I'd Actually Turn On

Most people use Claude like a smarter text box. Connectors are how you turn it into an assistant that works inside the tools where your job already happens.

by d.avebrown

Here's how most people use Claude: ask a question, get an answer, copy it somewhere else. That works. It's also the beginner version — you're doing all the fetching and filing by hand, and Claude is flying blind on everything you didn't paste in.

Connectors close that gap. A connector is a bridge between Claude and another app — Gmail, your calendar, your docs, Slack, your task tracker, your codebase. Instead of you copying context in, Claude reaches into the source and pulls it out. In a lot of cases it can take action too: draft the reply, create the task, make the page.

One thing worth knowing before you connect anything: connectors inherit *your* permissions. If you can't open a file, channel, or record in the original app, Claude can't see it through the connector either. It's not a skeleton key. It's your own badge, handed to a very fast assistant.

The real unlock isn't that Claude gets smarter in some abstract way. It's that Claude finally gets **context** — and context is the whole game. Below: the ten connectors I'd actually turn on, a copy-paste prompt for each, five workflows to try this week, and the warnings nobody mentions up front.

The Mental Model

Why this changes what Claude can do for you

### Claude without connectors is a genius locked in an empty room.

Picture hiring a brilliant consultant and then locking them in an empty conference room. No inbox, no calendar, no docs, no customer threads, no files. They're sharp, but they can't see a single thing about how your work actually runs — so the best they can do is talk in generalities.

Connectors hand that consultant a badge and a laptop. Now they can read the thread, check the calendar, find the doc, and turn the follow-up into a task. Claude doesn't suddenly know everything — it can finally *see the work*. That's the entire difference between "write me a generic email" and "answer this specific person, given everything that's already been said."

The One Idea To Hold Onto

Connectors remove the copy-paste layer between your tools and your brain. That layer is where most of your wasted time actually lives — the fetching, the digging, the "I know we wrote this down somewhere."

The Lineup

Ten connectors, one ready-to-paste prompt each

### 01 — Gmail

Turn your inbox into an action list

Email is where half of modern work quietly hides. The Gmail connector lets Claude search threads, summarize the long ones, surface what you actually owe people, and draft replies in your voice. It writes drafts — it won't hit send for you, which is exactly the guardrail you want. Most people don't have an inbox problem. They have a *hidden-obligations* problem, and this is the fix.

Try This Prompt

Search my Gmail from the last 7 days and build a prioritized list of anything I need to reply to, follow up on, or decide. Group it into urgent / important / low priority, and draft replies for the top 3.

### 02 — Google Calendar

See the week before the week eats you alive

Your calendar isn't a schedule — it's a map of what everyone else is taking from your time. Claude can read it, find your open blocks, flag where you're overcommitted, prep you for meetings, and create or move events. Use it to plan the week instead of just surviving it.

Try This Prompt

Look at my calendar for this week. Tell me where I'm overcommitted, where I have deep-work time, and what meetings I should prep for. Then build a Monday plan that protects at least two focus blocks.

### 03 — Google Drive

Make the junk drawer searchable

Drive is where the "I swear we wrote this down somewhere" problem lives. Claude can search across Docs, Sheets, Slides, PDFs, and Office files, pull the relevant ones, and synthesize what's in them. One catch: it reads the text, not images baked inside documents. Drive is useful right up until it becomes a junk drawer — this is what makes it useful again.

Try This Prompt

Search my Drive for anything related to \[project name\]. Summarize the key decisions, open questions, owners, deadlines, and any risks that show up across the docs.

### 04 — Notion

Turn messy thinking into durable systems

Claude is great at thinking *with* you. Notion is great at storing the output so it doesn't die in a chat thread. Connect the two and a sprawling conversation becomes a structured page — SOPs, research libraries, content calendars, internal docs — read and written based on your workspace permissions.

Try This Prompt

Take this conversation and turn it into a Notion page called "Claude Connector Workflow Ideas." Organize it into sections, put a checklist at the top, and add a "next experiments" section with 5 things to test this week.

### 05 — Slack

Find the work hiding in team conversations

Slack is where important decisions go to disappear — distributed across 400 messages and one person's memory. Claude can summarize a channel, surface the decisions that got buried, pull out action items, and turn a messy thread into a clean brief. Your team probably *does* have documentation. It's just trapped in scrollback.

Try This Prompt

Search Slack for messages about \[project / customer / initiative\] from the last two weeks. Summarize the decisions made, blockers mentioned, people involved, and anything that needs follow-up.

### 06 — Asana

Turn the guilt museum into a plan

Every task system eventually becomes a guilt museum — a wall of things you meant to do. Claude can read your Asana, tell you what's actually overdue versus what just looks scary, flag what's blocked or delegable, and create new tasks. It's good at converting a vague pile into a short, honest plan.

Try This Prompt

Review my Asana tasks for this week. Tell me what's overdue, what's blocked, what can be delegated, and what should be moved. Then build a clean priority plan for the next 3 workdays.

### 07 — Linear

Where engineering reality lives

Linear is the connector for PMs, engineers, and founders moving work through a software team. Claude can read open issues, group bugs by likely root cause, spot duplicates, and create new issues ("file a bug for the login error"). Admins can keep it read-only if you'd rather it look but not touch. Think of it as a translator between engineering reality and everyone who needs to understand it.

Try This Prompt

Look through Linear for open bugs related to \[feature\]. Group them by likely root cause, flag duplicates, and draft a proposed engineering plan with priorities.

### 08 — GitHub

Read the codebase without spelunking

GitHub is where the actual product lives, which makes it one of the highest-leverage connectors for technical users. Claude can search the repo, explain how a system works in plain English, point at the key files, and tell you where you'd need to change things. For engineers it's a senior dev who's already read the whole map. For everyone else, it's a way to understand what's happening without pulling a developer off their work to explain it.

Try This Prompt

Search the repo for how authentication is implemented. Explain the flow in plain English, name the key files, and tell me where I'd likely need to make changes to add \[new feature\].

### 09 — Canva

From "here's the idea" to "here's something publishable"

For creators, marketers, and founders, Canva shortens the path from concept to asset — social posts, decks, thumbnails, lead magnets. Most people don't need a full-time designer for every little thing. They need a fast route from an idea to something good enough to ship, and this is it.

Try This Prompt

Create three Instagram carousel concepts from this guide. Make each one beginner-friendly and punchy, aimed at someone who's heard of Claude but has never touched a connector.

### 10 — Higgsfield

A production assistant for image and video

This is the one people sleep on. Higgsfield turns Claude into a production assistant for image and video generation — reaching 30+ models, picking one, setting the parameters, running the generation, and dropping finished creative back into the chat. Claude handles the strategy and structure; Higgsfield makes the actual pixels. Idea → brief → asset, without bouncing across a dozen tabs.

Try This Prompt

Create 5 short-form video concepts for this connectors guide. For each: the hook, visual direction, a shot list, and a prompt for generating a 9:16 video asset.

Start Here

Don't connect everything at once

### Begin with the tools that hold your real context.

If you're brand new to connectors, resist the urge to flip on all of them. Start with the five apps that contain the most useful personal and work context. That alone is enough to build genuinely powerful workflows — inbox, schedule, documents, knowledge base, team chat, and your task list, all visible to Claude at once.

My Recommended Starter Stack

1\. Gmail — your inbox 2. Google Calendar — your schedule 3. Google Drive — your documents 4. Notion or Slack — knowledge + team conversations 5. One task system — Asana, Linear, Jira, or your equivalent

Five Workflows

Stack connectors together and try these today

### 1. The Monday Morning Brief

Gmail + Calendar + Slack + Asana/Linear

Prompt

Build my Monday morning briefing. Check my email, calendar, Slack, and task system. Tell me what changed since Friday, what needs my attention, what meetings I need to prep for, and what I should do first today.

### 2. The Meeting Prep Assistant

Calendar + Gmail + Drive + Notion

Prompt

I have a meeting with \[person / company / team\]. Pull together a prep brief from my calendar event, recent emails, related docs, and notes. Include background, likely topics, unresolved decisions, and questions I should ask.

### 3. The Inbox Triage System

Gmail + Calendar

Prompt

Review my unread emails from the last 72 hours. Tell me what needs a reply, what can be archived, what should become a task, and what needs calendar time. Draft replies where it makes sense.

### 4. The Project Catch-Up

Slack + Notion + Linear/Asana + Drive

Prompt

Catch me up on \[project\]. Look across Slack, docs, tasks, and notes. Summarize the current status, recent decisions, blockers, owners, and next actions.

### 5. The Content Repurposing Machine

Notion + Google Drive + Canva/Higgsfield

Prompt

Take this document and turn it into a short-form content package: 5 hooks, 3 reel scripts, 1 carousel outline, 1 caption, and 3 visual creative directions.

Before You Go Wild

Four things nobody tells you up front

### 01 — Connectors touch real data. Choose deliberately.

The power and the risk are the same thing: connectors reach into live systems. Don't wire up a tool just because it's in the directory. Be especially careful with email, customer data, financial records, HR systems, and private company docs. In a company setting, Team and Enterprise owners can restrict what Claude is allowed to do — like blocking it from sending messages or editing files. Use those controls.

### 02 — Read-only is usually enough.

You rarely need Claude to be able to change everything. For most workflows, "search and summarize" is already a massive win — and it's far lower-stakes. If you're rolling this out at work, start read-only wherever you can and expand only when a workflow actually needs write access.

### 03 — More connectors isn't better. It's noisier.

Connecting 30 tools doesn't get you smarter answers — it gives Claude more to wade through. If you've got ten or more active, switch tool access to "On demand" so each conversation has room to breathe and Claude only reaches for what the task in front of it actually needs.

### 04 — Always ask for the sources.

When Claude pulls from Gmail, Calendar, or Drive, it can cite exactly which emails, events, or documents it used — often with links straight to the originals. Ask for those citations every time. The point was never just to get an answer. It's to know where the answer came from, so you can trust it or check it.

### The Big Idea

Connectors aren't just "integrations." They're the difference between asking AI to *imagine* your work and asking it to help with your *actual* work. Generic Claude can write a decent email. Connected Claude can read the thread, understand the context, check your calendar, find the doc, draft the reply, and turn the follow-up into a task.

That's why this matters — not because it's flashy, but because it deletes the copy-paste layer between your tools and your brain. Start with five connectors, run one of the workflows above this week, and ask for your sources. That's the whole on-ramp.

Want more ways to get the most out of Claude?

Follow along on Instagram for weekly breakdowns.

[@davebrownbrand](https://www.instagram.com/davebrownbrand)


---

# GUIDE: ClaudeDesignGuide

d.avebrown instagram.com/d.avebrown

# Claude Design

A practical guide to prototyping, visual exploration, and motion graphics — using words instead of a blank canvas.

by d.avebrown

Most design work dies before it gets interesting. Designers ration exploration because there is never time to prototype ten directions, so teams settle for two or three and hope one of them was right. Founders and PMs with a clear picture in their head but no design training stall out in Canva, fighting templates that almost match what they want and never quite get there.

Claude Design changes the starting point. Instead of opening a blank canvas, you describe what you want, and Claude builds a working design next to the chat. You refine it in plain English, comment directly on pieces of the canvas, make edits by hand, and export the result when it's ready. Anthropic describes it as a way to create polished visual work — designs, prototypes, slides, one-pagers — with conversational refinement, inline comments, direct edits, design-system-aware output, sharing across an organization, and exports to Canva, PDF, PPTX, standalone HTML, or a Claude Code handoff.

That's the feature list. This guide is about what you can actually do with it — not just "make a deck" or "make a landing page," but using Claude Design as an exploration engine: a way to test visual directions quickly, build prototypes, make internal tools tangible, generate campaign assets, and produce animated motion graphics you can capture as video with a simple screen recording.

The Concept

Best when you need a visual artifact, fast

Claude Design earns its keep when you need something visual in front of people quickly — a landing page, a sales deck, a dashboard, a pricing page, an onboarding flow, a proposal, a research brief, an infographic, a board one-pager, or a clickable prototype. Anthropic's launch materials point at the same range: realistic prototypes, wireframes and mockups, design explorations, pitch decks, marketing collateral, and code-powered prototypes.

The important part is that it isn't only generating a static image. It builds layouts, interactive prototypes, and HTML-style experiences you can export or hand off. That makes it genuinely useful for the people who usually get stuck: anyone who needs to communicate an idea before engineering or design time is available to make it real. You reach for it when you want to turn a rough idea into something people can react to, put three directions on the table before committing to one, mock up a feature before writing a ticket, or turn messy notes into a first draft a designer, marketer, or founder can refine.

The old workflow starts with a tool. Claude Design starts with intent — and that one change is what makes it feel less like design software and more like creative direction.

It's worth sitting with that shift, because it's where most people go wrong. The old routine is a tool: open Figma or Canva, pick a template, move boxes, hunt for icons, tweak colors, rewrite copy, get frustrated, start over. Claude Design flips the order. You describe the goal, the audience, the content, and the structure, and Claude turns that into a draft. Your job becomes creative direction rather than manual layout. You're not asking the model to "be creative" in some vague sense — you're handing it constraints and then using the canvas as a fast feedback loop.

The Workflow

Give it a job it can actually do

A vague prompt gets a vague result. "Make me a pricing page" leaves Claude guessing at everything that matters. The fix is to say what you actually have in mind — who it's for, what goes on it, and how it should feel.

Thin prompt vs. a real brief

Weak: "Make me a pricing page." Strong: "Build a pricing page for a B2B API company. Audience: technical founders and engineering leaders. Three plans — Starter, Growth, Enterprise — with a monthly/annual toggle above the cards. Add a 12-row feature comparison table underneath. Enterprise uses a Contact Sales CTA. Keep the style clean, technical, and premium, and use our existing design system."

Nearly every good prompt carries four ingredients: the **goal** (what are we making?), the **audience** (who is it for?), the **structure** (what appears on the canvas?), and the **style** (what should it feel like?). Strung together, they read like a brief you'd hand a designer: *"Create \[asset\] for \[audience\]. The goal is \[goal\]. Include \[sections and content\]. Use \[style or design system\]. Make it \[interactive / responsive / export-ready\] where it helps."*

The other half of the craft is restraint. The biggest mistake is cramming an entire project into one giant prompt. Claude Design works better in layers — get the structure and content right first, then add interactivity, then polish hierarchy, then clean up for accessibility and responsiveness. Build a dashboard, then make the nav collapsible and the rows open a detail drawer, then tighten the KPI cards and thin out the table, then ask Claude to review its own work for contrast and mobile behavior. Anthropic's own guidance lands in the same place: start simple, layer in complexity, be specific in feedback, think about responsiveness early, ask for variations, and ask Claude to critique the design.

You also have three ways to steer, and they aren't interchangeable. Chat is for structural moves. Inline comments are for targeted, component-level tweaks. Direct edits on the canvas are for the quick visual adjustments — dragging, resizing, aligning — that are faster to do by hand than to describe.

Use

When

Sounds like

Chat

Structural changes, or anything needing broader context

"Replace the hero with a split-screen layout." "Turn this into a 5-slide deck." "Give me three visual directions."

Inline comments

Precise changes to one element

"Make this button larger." "Use the primary brand color here." "Turn this section into a dropdown."

Direct edits

Quick visual nudges

Drag, resize, align, reposition

One practical note from Anthropic's docs: inline comments can occasionally be flaky. If a comment isn't getting picked up, paste the same feedback straight into chat and move on.

Design Systems

Stop making Claude reinvent your brand every time

A design system isn't magic. It's a reusable set of brand decisions — colors, type, spacing, buttons, cards, forms, icons, layout rules — that tells Claude not to invent the brand from scratch on every request. Without one, the model has to guess at a dozen things you already know: which blue, rounded corners or square, serif headings or sans, flat cards or shadowed, dense dashboards or airy, what a primary CTA looks like, what a warning state looks like. Give it those answers once and it can carry the same visual language across landing pages, decks, dashboards, and reports.

Anthropic says Claude Design can build a system during onboarding by reading a team's codebase and design files, then apply the colors, type, and components automatically. You can also just hand it one at the top of a project:

A design system, dropped in as a prompt

"Before you build this, use this design system. Primary \#2563EB, secondary \#111827, accent \#F97316, background \#F9FAFB, body text \#374151. Inter for body copy, a bold geometric sans for headings. Buttons rounded 12px with strong contrast. Cards use subtle borders, soft shadows, and generous padding. Overall feel: modern B2B SaaS — clear, trustworthy, slightly editorial."

Keep that block saved and paste it into new projects. It's also how you spend less. Design activity draws from the same usage pool as chat, Claude Code, and Cowork, and complex projects with large codebases or many iterations burn more of it. The way to avoid waste is to stop asking Claude to rebuild the world for small changes: preserve what works ("keep the layout and components, only improve spacing and contrast"), scope edits tightly ("only change the CTA section"), and avoid importing massive codebases, which can lag the browser — Anthropic points to Claude Code's */design-sync* for syncing a system instead. Ask for two or three directions early, pick one, and refine that rather than wandering. And when the final edits are purely visual, export to Canva, where teammates can keep tweaking without regenerating code each time.

Motion Graphics

The use case almost nobody reaches for

Most people file Claude Design under decks, mockups, and landing pages. But because it can build interactive, code-powered prototypes — Anthropic mentions voice, video, shaders, 3D, and built-in AI, and one customer specifically calls out complex interactivity and animations — you can also use it to make motion graphics: animated explainers, product walkthroughs, kinetic text, animated diagrams, loading states, onboarding flows, social-video backgrounds.

The trick is to not ask Claude to export a finished video. That's slow, token-heavy, and frustrating. Instead, ask it to build an animated *screen*, then record that screen with QuickTime, Loom, Screen Studio, or OBS. You get a clean video without forcing the model to render one.

The animation loop, start to finish

1\. "Create a 15-second animated motion graphic explaining how AI agents work. 16:9, dark editorial background. Start with one glowing node labeled 'User Request,' then branch out three smaller nodes — Research, Draft, Review — and end with them merging into a final output card. Smooth easing, subtle glow, kinetic text, and make it loop cleanly." 2. Preview it on the canvas. 3. "Slow the opening by 30%, smooth the branch-out moment, and add a 1-second pause before the output card appears." 4. "Keep all important text inside the center 80% of the frame so it survives a screen recording." 5. Record the canvas, then trim in any editor.

The prompts follow the same shape as everything else — say the length, the aspect ratio, whether it loops, and what happens beat by beat. A few that work: kinetic typography for a single punchy line, sized 9:16 for a Reel; a product feature reveal that slides a chat panel in and pops three insight cards one by one; an explainer that snaps scattered brand elements into a clean system board; a before-and-after that reorganizes messy generic design into a branded layout; a seamless looping background with the center left clear for captions.

A handful of habits keep these usable. Keep them short — ten to fifteen seconds covers most of them. Always name the aspect ratio: 16:9 for YouTube, 9:16 for Reels, TikTok, and Shorts, 1:1 for square. Ask for "smooth easing" rather than "fast animation." Use large text, because small type dies on mobile. Leave safe margins for captions. And unless you have a real reason, don't request a video export — record the canvas instead.

What to Build

A few directions worth stealing

The point of the examples below isn't the specific asset. It's the pattern: pick a thing you make by hand, describe it precisely, and let the canvas do the layout.

### 01 — Prototype a feature before you build it

Instead of a long spec, build the flow. "Build an interactive prototype of an AI chat feature inside a spreadsheet app — the chat panel opening, the user asking a question, Claude responding, and the result dropping into a cell. Make each step clickable." A clickable flow settles arguments a document can't.

### 02 — Generate three campaign directions at once

"Create three distinct landing-page concepts for the same product: one enterprise and conservative, one bold and startup-like, one editorial and premium. Same content, different layout, hierarchy, and tone." You get real options to react to instead of arguing in the abstract.

### 03 — Make internal tools real before engineering touches them

Internal tools get deprioritized because they sound boring in a ticket. Show the workflow instead. "Build an admin panel for a content moderation team — queue on the left, selected submission in the center, action panel on the right, with approve, reject-with-reason, escalate, and keyboard shortcuts."

### 04 — Turn messy strategy into a one-pager

One-pagers force clarity, which is exactly where Claude Design shines. "Create an executive one-pager for our Q3 product strategy: a three-sentence narrative, four KPI cards, three strategic bets, three risks, and a decision section at the bottom." Works the same for board and investor updates, export-ready as PDF.

### 05 — Ship the follow-up after a call

Sales teams lose hours building custom decks from scratch. Turn call notes into a follow-up. "Build a 5-slide follow-up after a discovery call: what we heard, their goals, our recommended approach, timeline and cost range, next steps." Same idea for visual explainers, carousel templates, and reusable content formats.

Getting It Out

Where each export format fits

Claude Design exports to ZIP, PDF, PPTX, Canva, standalone HTML, and a Claude Code handoff, with destinations like Adobe, Gamma, Miro, Replit, Vercel, and Wix, and more on the way. Pick the format by what happens next.

Format

Use it for

PDF

Polished one-pagers, reports, proposals, briefs, board materials

PPTX

Decks that need to be presented or edited in PowerPoint

Canva

Anything a marketer or teammate will keep editing visually

Standalone HTML

Prototypes, landing pages, calculators, hosted demos

ZIP / Claude Code

The underlying files, or a design ready to become a real product surface

Screen recording

Animations and motion graphics

Where People Trip

The mistakes that show up over and over

Almost every disappointing result traces back to one of a few habits. Asking for generic design — "make it modern" — instead of describing a feeling the model can act on. Changing everything at once ("make it better") instead of naming the one thing to fix. Skipping the audience, so a pricing page for indie developers comes out looking like one built for enterprise procurement. Forgetting to say whether it needs to work on mobile. Making Claude reinvent your brand on every request instead of handing it a system. And, with motion, trying to export a finished video instead of building the animation and recording the screen.

"Make it better" is not a brief. "Keep the layout, but strengthen the headline, narrow the subhead, and make the CTA more prominent" is.

### Where to start

Pick one visual artifact you make by hand every month — a board deck, a proposal, a landing page, a research readout, a social carousel, a motion graphic. Open Claude Design and write a prompt with the goal, audience, structure, and style. Ask for two or three variations, pick one, and refine in layers. Have Claude critique its own work for hierarchy and contrast. Export to the right format and ship it.

That's the real promise here. Not that Claude Design replaces designers, and not that every first draft is finished. It's that teams get more shots on goal — more directions, more prototypes, more chances to see the thing before arguing about the thing. For most teams, that alone is the upgrade.

Appendix

A 50-prompt starter library — patterns, not scripture

Treat these as patterns to adapt, not recipes to follow. Each entry pairs a note on what Claude produces with a prompt you can lift straight into the chat. Once the shape clicks, nearly any visual work becomes promptable: *"Build \[asset\] for \[audience\] with \[sections\] in \[style\] using \[design system\]. Make it interactive, responsive, or animated as needed."*

### Marketing & launch pages 01–10

01New feature landing page

Claude builds a full landing page from a single prompt: hero, benefit cards, video placeholder, pricing table, FAQ, footer signup. A task that usually costs a designer half a day takes about twenty minutes end to end.

Prompt

Build a landing page for \[feature name\]. Audience: \[persona\]. Include a hero with headline, subhead, and primary CTA. Three benefit cards with icons. A demo video placeholder. A pricing table with three tiers. An FAQ with six questions. Email signup in the footer. Use our design system.

02Investor one-pager

Claude generates the single page VCs actually read before a meeting: thesis, traction, team, roadmap, contact. A4 portrait, clean typography, ready to export as PDF and send.

Prompt

Create a single-page investor summary, A4 portrait. Logo top left. A 3-line company thesis. Four traction metrics displayed as large numbers. Founder headshots with names and roles. A 12-month roadmap as a horizontal timeline. Contact details bottom right.

03Waitlist page

Claude builds a minimal pre-launch page with one pitch sentence, one email field, and a counter showing how many others are waiting. That's the entire page. Nothing else fits.

Prompt

Build a minimalist waitlist page for \[product name\]. Full-bleed gradient background. Centered one-sentence pitch. A single email field with a submit button. Below the form, a counter showing "X others waiting." Subtle footer with social links.

04Pricing page with comparison table

Claude delivers the full pricing page layout in one go: three side-by-side plans, a middle "most popular" badge, a monthly/annual toggle, and a feature checkmark grid. A fourth Enterprise column for "Contact Sales" sits on the right.

Prompt

Create a pricing page. Three plans side by side. Middle plan wears a 'Most popular' badge. Feature checkmark grid with 12 rows below. Annual toggle switches monthly and yearly pricing. Fourth Enterprise column with a 'Contact Sales' CTA. FAQ underneath with common billing questions.

05Competitor comparison page

Claude builds a "you versus them" page that shows up in search results when prospects compare tools. Hero, feature table, customer quotes, and a clear CTA to start a trial.

Prompt

Build a comparison page: \[your product\] vs \[competitor\]. Hero with a one-line positioning statement. Feature comparison table with 15 rows, green checks for yours and gray marks for theirs. Three customer quotes favoring your product. CTA to start a free trial.

06Product changelog page

Claude generates a clean changelog template that replaces ugly release notes: filter chips for Features, Fixes, and Breaking changes, plus a search bar and a subscribe card. Customers can actually find what changed.

Prompt

Create a changelog page in a two-column layout. Left column lists version numbers and release dates. Right column shows bulleted change notes per version. Filter chips at top: Features, Fixes, Breaking. Search bar above the filters. Subscribe-to-updates card in the sidebar.

07Press kit page

Claude assembles the standard press kit layout: company description, logo variations with download buttons, leadership headshots, product screenshots, and a press contact form. Saves your marketing team a week of back-and-forth with agencies.

Prompt

Create a press kit page. Company one-liner at the top. Logo variations with individual download buttons for each format. Leadership headshots with short bios. Product screenshot gallery. Press contact form. Clean corporate aesthetic.

08Newsletter signup landing page

Claude builds a dedicated landing page for your newsletter. Hook sentence, three bullet points on what subscribers get, email field, social proof quotes, and an author bio. Paste the URL in your Twitter and LinkedIn bios.

Prompt

Build a newsletter landing page for \[your newsletter name\]. A hook sentence at the top. Three bullet points covering what subscribers receive. Email signup field. Three social proof quotes from current subscribers. Author bio with photo at the bottom.

09Webinar registration page

Claude produces the webinar page with speaker card, three "what you'll learn" bullets, a registration form, and logos of past attendee companies. Copy and paste into your email tool.

Prompt

Create a webinar registration page. Speaker photo and name in the hero. Date, time, and timezone prominently displayed. Three "what you'll learn" bullets. Registration form capturing name, email, company, and role. Logos of past attendee companies at the bottom.

10Customer case study page

Claude writes the full case study layout from a brief: hero with customer logo and pull quote, challenge/solution/result sections, three headline metrics, and a CTA at the bottom. Perfect for your sales team to send post-demo.

Prompt

Build a case study page for \[customer name\]. Hero with their logo and a pull quote from their CEO. Challenge, solution, and result sections. Three headline metrics displayed as large numbers. A closing quote. CTA to book a demo.

### Sales & pitch decks 11–18

11Seed-round pitch deck

Claude drafts a 10-slide seed deck following the standard founder playbook: cover, problem, solution, market, product, model, traction, team, ask. Dark background, one idea per slide, export to PPTX.

Prompt

Create a 10-slide seed pitch deck. Slides: cover, problem, solution, market size, product (two slides), business model, traction, team, ask. Minimal layout. One big idea per slide. Dark background with white text. Export ready.

12Enterprise sales deck

Claude builds the 15-slide enterprise deck your AEs have been asking for: prospect logo on cover, their challenge written for them specifically, your approach, product walkthrough, security, pricing, implementation. Replicable across deals.

Prompt

Build an enterprise sales deck with 15 slides. Cover includes prospect's logo. Second slide describes their challenge in their own language. Our approach. Product walkthrough across 4 screenshots. Security and compliance slide. Similar customer logos. Pricing slide. Implementation timeline. Next steps.

13Customer proposal

Claude turns a scope conversation into a formatted 12-page client proposal: executive summary, scope, deliverables, Gantt timeline, team bios, pricing, payment terms, signature block. Export to PDF and send.

Prompt

Create a 12-page customer proposal for \[prospect\]. Executive summary. Scope of work. Deliverables. Timeline as a Gantt chart. Team bios with photos. Pricing breakdown. Payment terms. Signature block on the final page.

14Post-discovery follow-up deck

Claude produces the 5-slide follow-up that closes deals faster than a long proposal: what we heard, your goals, our approach, timeline and cost range, proposed next steps. Send within an hour of the call.

Prompt

Build a 5-slide follow-up deck after a discovery call with \[prospect\]. Slide 1: what we heard in the call. Slide 2: their stated goals. Slide 3: our recommended approach. Slide 4: timeline and cost range. Slide 5: proposed next steps with specific dates.

15Product demo script with slides

Claude writes a demo walkthrough with speaker notes baked into each slide. Eight slides, one screenshot per slide, a narrator script line, and a "customer win" callout. Your reps stop winging it.

Prompt

Create product demo slides for a 15-minute walkthrough. Eight slides total. Each slide shows one screen of the product with a one-sentence narrator script and a "customer win" moment. Speaker notes column on the right of each slide.

16ROI calculator mockup

Claude builds an interactive calculator your marketing team can drop on a landing page. Three inputs, live outputs, and a button to download the full report. Works as a lead magnet the second it's live.

Prompt

Build an interactive ROI calculator page. Three input fields: team size, current tool cost, hours saved per week. Live outputs: annual savings, ROI percentage, payback period in months. A button to download the full report by entering email. Make it a working prototype.

17Executive one-pager for a board meeting

Claude produces the one-page summary your board actually reads: quarter-in-review narrative, a 2x2 grid of KPI charts, risks in yellow, wins in green, and an "asks" section at the bottom.

Prompt

Create a board meeting one-pager. Quarter summary as a 3-sentence narrative at the top. Four KPIs as small charts in a 2x2 grid. Three risks called out in yellow. Three wins called out in green. Asks section at the bottom covering what we need from the board.

18Quarterly business review deck

Claude builds the 15-slide QBR template that customer success teams can reuse for every enterprise account: usage charts, success stories, support ticket analysis, next-quarter roadmap, renewal conversation setup.

Prompt

Create a 15-slide QBR deck for an enterprise customer. Cover with their logo. Year-to-date usage charts. Three success stories with product screenshots. Support ticket analysis. Roadmap for next quarter. Renewal and expansion conversation slide. Q&A slide at the end.

### Product, UX & prototypes 19–30

19Mobile onboarding flow

Claude produces a 4-screen onboarding sequence with progress dots across the top: welcome, permissions with reasoning, account setup, and a first-run empty state. Handles the messy "first thirty seconds" most apps forget about.

Prompt

Design a 4-screen mobile onboarding flow for \[app\]. Screen 1: welcome with value proposition. Screen 2: permissions request with reasoning for each. Screen 3: account setup. Screen 4: first-run empty state with a "try this" suggestion. Progress dots across the top. Make it interactive.

20SaaS dashboard

Claude draws the full dashboard layout in one shot: left nav, top bar, KPI cards, chart, data table, activity feed. Light theme. Your PM can review the same afternoon you brief the project.

Prompt

Build a SaaS dashboard. Left nav with 6 menu items. Top bar with search and user menu. Main area: four KPI cards in a row, one line chart below, one data table at the bottom. Right sidebar with an activity feed. Light theme. Make it clickable.

21Settings panel

Claude generates the multi-tab settings panel every app needs and no one wants to design: profile, notifications, integrations, billing, security, advanced. Sectioned cards, toggles, dropdowns, and save buttons per tab.

Prompt

Design a settings panel for a web app. Left menu with: Profile, Notifications, Integrations, Billing, Security, Advanced. Main area shows the selected tab's content. Each tab has sectioned cards with toggles, dropdowns, and save buttons.

22Empty state screens

Claude draws the four empty states your new app needs: no projects, no tasks, no teammates, no notifications. Each gets an illustration placeholder, a helpful sentence, and one clear CTA. Users don't drop off at zero.

Prompt

Design four empty state screens for a project management app: no projects yet, no tasks in a project, no team members invited, no notifications. Each screen has an illustration placeholder, one helpful sentence of context, and a single primary CTA.

23Three-step checkout flow

Claude builds the full checkout with cart review, shipping, and payment in three screens. Apple Pay and Google Pay options on the payment step. Order summary sticks to the right throughout. Your conversion rate thanks you.

Prompt

Design a 3-step checkout. Step 1: cart review with edit and remove actions. Step 2: shipping address with a saved-addresses dropdown. Step 3: payment with Apple Pay, Google Pay, and credit card options. Order summary sticks to the right on every step. Make it clickable.

24Admin panel for an ops team

Claude produces the internal tool your ops team has been begging for: submission queue on the left, preview in the middle, action buttons on the right, keyboard shortcuts listed at the bottom. Ships same-day if you hand off to Claude Code.

Prompt

Build an admin panel for content moderators. Submissions queue on the left. Selected submission preview in the middle with full content and metadata. Right panel with approve, reject with reason, and escalate buttons. Keyboard shortcuts listed at the bottom.

25Feature flag rollout UI

Claude designs the internal tool for managing feature flags: table with name, status, rollout percentage, and audience. Row click opens a side drawer with a percentage slider and a rule builder. Saves your engineers a week of internal UI work.

Prompt

Create a UI for managing feature flags. Table of flags showing name, description, status, rollout percentage, and audience. Row click opens a side drawer to edit. Drawer has a slider for rollout percentage and a rule builder for targeting audiences.

26User profile page

Claude drafts a public profile with avatar, name, location, follow button, and three tabs: activity, projects, about. Works for communities, developer tools, and consumer social alike.

Prompt

Design a public user profile page. Header with avatar, name, title, location, and a follow button. Three tabs: Activity, Projects, About. Activity tab shows a chronological feed of posts. Projects tab shows a grid of cards. About tab shows a long bio with sections.

27Interactive prototype of a new feature

Claude turns a static mockup into a working prototype you can share with users for testing. Click through it end to end, no code, no dev cycle. Bring research forward by two weeks.

Prompt

Build an interactive prototype of an AI chat feature inside a spreadsheet app. Show the chat panel opening, typing a question, getting a response, and inserting the result into a cell. Make every step clickable and shareable as a URL.

28Design system documentation page

Claude generates the documentation site for your design system: left nav for Colors, Typography, Buttons, Forms, Cards, Modals. Each page shows variants, code snippets, and usage guidelines. Developers stop asking design the same question twelve times.

Prompt

Build a design system documentation page. Left nav with: Colors, Typography, Buttons, Forms, Cards, Modals. Each page shows the component variants, a code snippet, and usage guidelines. Search bar at the top.

29Responsive site across three breakpoints

Claude renders the same homepage at mobile, tablet, and desktop widths side by side. You compare all three in the canvas at once. Faster than flipping between Figma frames.

Prompt

Render our marketing homepage at three breakpoints: mobile (375px), tablet (768px), desktop (1440px). Same content across all three, adjusted layouts per width. Display all three side by side on the canvas so I can compare.

30Dark mode version of an existing screen

Claude takes any screen you've built and outputs a dark mode variant with WCAG AA contrast. Keeps your spacing and structure, only the color tokens swap. Works on imports too, not just things you built in Claude Design.

Prompt

Take this dashboard and produce a dark mode version. Preserve all spacing and layout structure. Use our existing dark mode tokens if they exist in the design system. Confirm contrast ratios hit WCAG AA on every text element.

### Internal tools 31–36

31Internal wiki homepage

Claude builds the homepage for your company wiki: search bar hero, four category cards, recent updates feed, quick links sidebar, company values footer. Actually gets used because it's actually usable.

Prompt

Create an internal company wiki homepage. Search bar in the hero. Four category cards: People, Policies, Tools, Handbook. Recent updates feed below the cards. Quick links in a sidebar. Company values in the footer.

32Meeting notes template

Claude generates the one-page meeting notes template your whole team uses: fields for title, date, attendees, agenda, discussion, decisions, action items with owners and due dates, and a link to the next meeting.

Prompt

Build a meeting notes template, one page. Fields: meeting title, date, attendees, agenda (bulleted), discussion notes (long text), decisions (bulleted), action items (checkbox list with owner and due date), next meeting date and link.

33Hiring pipeline tracker

Claude draws the kanban board your recruiters keep rebuilding in Notion: columns for each stage, candidate cards with role and days-in-stage, filters at the top. Ask it to wire up drag-and-drop and you have a working prototype.

Prompt

Build a kanban board for hiring. Columns: Applied, Screening, Interview, Offer, Hired, Rejected. Each card shows candidate name, role, recruiter, and days in current stage. Filter bar at top by role, department, and source. Make cards draggable between columns.

34OKR tracking dashboard

Claude produces the OKR dashboard that replaces the spreadsheet no one updates: company objective at top, four key results as progress bars, and click-to-expand initiative lists. Export to HTML and host it on your intranet.

Prompt

Create an OKR tracking dashboard. Company objective at the top. Four key results below as progress bars with current value and target. Clicking a key result expands a list of initiatives. Each has an updated-by stamp and status.

35Content calendar

Claude draws the monthly content calendar with multi-item cells, color coding by channel, filter bar at the top, and hover previews. Your editorial team finally has a single source of truth.

Prompt

Build a content calendar in monthly view. Each day cell can hold multiple content items. Color-code items by channel: blog, LinkedIn, email, YouTube. Filter bar at the top. Hovering a cell shows a preview card with details.

36Internal tool access request form

Claude builds the form your IT team wishes they had: searchable dropdown for the tool, reason field, manager approval email, duration, and a conditional PII question. Submitting creates a ticket number.

Prompt

Create a form for employees to request access to internal tools. Fields: tool name (searchable dropdown), reason for access, manager email for approval, duration needed. Conditional question appears if the tool handles PII. On submit, show a confirmation with ticket number.

### Content & personal 37–43

37Personal portfolio site

Claude builds a single-page portfolio with hero, six project cards, about section, testimonials, and contact form. Export as standalone HTML and host on GitHub Pages for free.

Prompt

Build a personal portfolio site, single page, long scroll. Hero: name, one-line bio, professional photo. Selected work: six project cards with images and links. About me section. Three testimonial quotes. Contact form at the bottom. Export as standalone HTML.

38One-page resume

Claude produces a clean one-page resume ready to export to PDF: name and contact, summary, five roles with bullet points, skills, education. Printable and ATS-friendly. Done before your coffee is cold.

Prompt

Create a one-page resume. Name and contact details in the header. Three-line summary. Experience: five roles with 2-3 bullet points each. Skills section. Education at the bottom. Clean serif typography, black on white. Printable and ATS-safe.

39Wedding RSVP page

Claude builds the RSVP page you'd normally pay a freelancer \$400 for: "save the date" hero, attending radio, meal choice dropdown, plus-one field, song request box. Export and send the link with the save-the-date.

Prompt

Build a wedding RSVP page for \[names\]. Hero: "Save the Date" with date and venue. Attending or not-attending radio buttons. Meal choice dropdown. Plus-one name field. Song request text area. Submit button reads "We'll see you there."

40Podcast show notes template

Claude generates the show notes template your podcast needs to look professional: episode title, guest bio, timestamped chapters, "links mentioned" section, sponsor block, subscribe CTAs for Apple, Spotify, and RSS.

Prompt

Build a podcast show notes template. Episode title, number, and date. Guest photo and bio. Timestamped chapters as a list with clickable anchors. "Links mentioned" section. Sponsor ad block. Subscribe CTAs for Apple Podcasts, Spotify, and RSS.

41Blog post layout template

Claude produces a reusable blog post template: title, subtitle, author byline, article body with room for images and pull quotes, sticky table of contents on desktop, related posts, subscribe CTA. Save once, publish forever.

Prompt

Create a blog post layout template. Title, subtitle, and author byline with photo and date. Long-form article body with space for images and pull quotes. Table of contents sticky on the left for desktop only. Related posts grid at the bottom. Subscribe CTA placed mid-article.

42Course landing page

Claude builds the landing page for your online course: hero video, "what you'll learn" bullets, curriculum accordion, instructor bio, testimonials, payment plan options, FAQ. Replaces Kajabi's template library in one prompt.

Prompt

Build a landing page for an online course on \[topic\]. Hero with video placeholder. "What you'll learn" section with 8 bullets. Curriculum accordion with 6 modules. Instructor bio. Three student testimonials with photos. Pricing section with payment plan options. FAQ. Enrollment CTA.

43Newsletter archive page

Claude draws the archive page Substack doesn't give you: grid of past issues with thumbnails, titles, dates, excerpts, filter by topic tags, search bar, issue count, and a pinned subscribe CTA. Host it alongside your newsletter.

Prompt

Create a newsletter archive page. Grid of past issues with thumbnail, title, date, and 2-line excerpt each. Filter bar with topic tags. Search bar. Total issue count in the header. Subscribe CTA pinned at the bottom of the page.

### Reports & documents 44–50

44Annual report

Claude produces a 10-page annual report corporate-ready: cover with year, CEO letter, financial summary in charts, milestone stories with photos, team section, outlook, financials table. Serif-heavy aesthetic, export to PDF.

Prompt

Create a 10-page annual report for \[company\]. Cover with year. Letter from the CEO. Financial summary in charts. Three milestone stories with photos. Team section. Looking ahead. Financials table. Corporate serif aesthetic throughout.

45Data report with charts

Claude drafts the 20-page data report your analyst spent a week on last quarter: executive summary, methodology, five results each with a chart and two paragraphs, conclusion, data table appendix.

Prompt

Create a 20-page data report on \[topic\]. Executive summary. Methodology. Five key results, each with a chart and 2 paragraphs of analysis. Conclusion. Appendix with data tables. Minimal editorial style.

46Two-page research brief

Claude condenses a longer research paper into a 2-page brief. Page one: question, method, three stats. Page two: implications, limitations, further reading. Academic but readable, designed for busy executives.

Prompt

Build a 2-page research brief summarizing a longer paper. Page 1: research question, method, three key results as large stats. Page 2: what it means, limitations, what to read next. Academic but readable style. Clean typography.

47B2B whitepaper

Claude produces the 15-page B2B whitepaper your marketing team needs but keeps delaying. Cover, table of contents, executive summary, industry context, problem analysis, solution framework, case study, conclusion with CTA. Conservative aesthetic, gated asset ready.

Prompt

Create a 15-page B2B whitepaper on \[topic\]. Cover page. Table of contents. Executive summary. Industry context with data. Problem section with analysis. Solution framework. Case study. Conclusion with a CTA. Clean, dense, conservative design.

48Vertical infographic

Claude builds a single-image infographic ready for Instagram or Pinterest: title at top, five data points with illustrations and big numbers, source citation, social handles. Export as standalone HTML or PNG.

Prompt

Design a vertical infographic, 1080x2000px, on \[topic\]. Title at the top. Five data points, each with an illustration and a large number. Source citation at the bottom. Social media handles below the citation. Shareable format.

49Brand guidelines document

Claude drafts the 25-page brand guidelines PDF agencies charge \$15,000 for: logo usage, color palette with hex codes, typography samples, photography style, voice and tone, email signature template, business card template.

Prompt

Build a brand guidelines document, 25 pages. Logo usage do's and don'ts with examples. Color palette with hex, RGB, and CMYK values. Typography samples for headings and body. Photography style with examples. Voice and tone guidelines. Email signature template. Business card template.

50User research results deck

Claude produces the 10-slide research readout your product team needs after every round. Cover, research question, method, four themes with quotes, two pain points, three prioritized recommendations, next steps, appendix with demographics.

Prompt

Create a 10-slide deck presenting user research results. Cover. Research question. Method (5 interviews, 3 usability tests). Four themes with representative quotes. Two pain points. Three recommendations with priorities. Next steps. Appendix with participant demographics.

Want more guides on getting real work out of AI?

Follow along on Instagram for weekly breakdowns.

[@davebrownbrand](https://www.instagram.com/davebrownbrand)


---

# GUIDE: ForwardDeployedProductManager

d.avebrown instagram.com/d.avebrown

# How to Pivot Into a Forward-Deployed Product Manager Role

A field guide to the AI career path hiding in plain sight — and how to position yourself for it before the title becomes crowded.

by d.avebrown

A new product role keeps showing up across AI labs, enterprise SaaS companies, and implementation-heavy software businesses: the Forward-Deployed Product Manager. It sounds like another invented title, and in some companies it is. But underneath the buzzword is a real change in how software gets delivered — and a genuine opening for people who know how to read it.

For a decade, product management was mostly built around one-to-many SaaS: understand a market, define a roadmap, ship features, measure adoption, reduce churn, repeat. That work still matters. But AI has made enterprise software messy again. You can't hand a Fortune 500 company an AI platform and expect magic. Their data is scattered across legacy systems. Their workflows are political. Their security team is skeptical. Their employees don't trust the tool yet, and their executives want measurable results. The product may be powerful, but it isn't yet packaged into a clean, repeatable workflow.

That gap is where the forward-deployed model lives. OpenAI embeds forward-deployed engineers inside organizations running complex frontier deployments. AWS announced a major investment in placing AI engineers directly with customers. Scale AI describes its FDPMs as people embedded with enterprise customers, shaping production outcomes and translating messy operational reality into product signal. The through-line is simple: engineering alone can't close the last mile, so companies are putting product people in the field. This guide covers what the role actually is, what transfers into it, and a concrete plan to pivot.

The Role

Product consulting for the AI deployment era

A Forward-Deployed Product Manager is a product person who works directly with strategic customers to make complex software succeed in the real world — inside the customer's actual operating environment, not in a demo or a roadmap review. That means understanding the customer's workflows, constraints, politics, systems, and definition of success, then working with engineers, executives, and internal product leaders to turn that reality into something that ships.

The label comes from Palantir, which built its name deploying engineers directly inside customer environments to make a powerful, complicated platform actually work against messy data and legacy systems. Those forward-deployed engineers owned the *how*. The forward-deployed PM is the strategic counterpart who owns the *what* and the *why* at the point of deployment — embedded with a handful of high-value accounts, often working directly with their C-suite, accountable not for shipping a feature but for the business outcome the platform is supposed to produce. Palantir, OpenAI, Scale AI, Glean, and Salesforce now hire against some version of that description.

A traditional PM asks, "What should we build for this market?" A forward-deployed PM asks, "What has to be true for this customer to get real value in production?"

That shift changes the whole job. In practice, the FDPM runs a loop: diagnose the real business problem underneath the feature request; map the customer's operating environment — data sources, approval workflows, security constraints, integrations; shape a deployable solution that might involve agents, automation, human-in-the-loop review, or plain process redesign; then drive it toward production, unblocking deployment and managing expectations along the way. The part that separates a strong FDPM from a custom-solution machine is the last step: translating field learning back into product direction — spotting what keeps breaking, what customers repeatedly need, and what should become reusable platform capability.

Product judgment, in one example

A weak FDPM reports: "The customer asked for a dashboard." A strong one reports: "Supervisors don't trust the model's recommendations because they can't see why a case was prioritized. The real need is explainability and exception review. A dashboard is part of it — but the product gap is confidence and governance in the workflow."

The Difference

Same DNA as a PM, different center of gravity

A traditional PM and an FDPM share product judgment, prioritization, and customer empathy. What differs is where the weight sits.

Traditional PM

Forward-Deployed PM

Owns

A product, feature area, or platform capability

Outcomes for a few strategic customer deployments

World

Mostly internal

Heavily customer-facing

Horizon

Quarterly or annual roadmap

Deployment milestones

Measured by

Activation, retention, revenue, engagement

Time-to-value, production launch, adoption, executive trust, product signal

It's worth being clear-eyed about the risk. In some companies "Forward-Deployed PM" is really a product consulting role: close to customers, far from the roadmap, responsible for outcomes without authority over the product. That doesn't make it a bad job — it makes it a job you should understand before you take it. The best versions give you real influence over product direction. The weaker ones hand you customer pressure without product power, and the title alone won't tell you which one you're looking at. The interview questions later in this guide are how you find out.

Why Now

AI has a last-mile problem

Forward-deployed teams aren't new — Palantir built its reputation on embedding technical people with customers years ago. What's new is how fast the model is spreading across AI companies and enterprise vendors, and the reason is straightforward. The model is impressive. The demo is impressive. Production is where the wheels come off. Enterprise AI needs data access, permissioning, evaluation, security and compliance review, workflow redesign, training, and ongoing monitoring — plus a class of risks normal SaaS never had: hallucinations, prompt injection, sensitive-data exposure, and unclear accountability.

Engineering can build the system. Someone still has to decide which customer problem is worth solving, what success means, where AI should and shouldn't be used, which requests are one-off noise versus a real product gap, and how this deployment becomes repeatable for the next customer. That's the FDPM lane — and it's why the role is being created faster than the market has settled on what to call it.

The numbers behind the shift are blunt. Postings for customer-facing AI roles jumped more than 800% in 2025. Gartner puts the share of AI projects that make it from prototype to production at roughly 41% — meaning most stall in exactly the last-mile territory the FDPM exists to cover. And enterprise AI contracts now run into the millions, so customers expect a partner accountable for time-to-value, not a login and a quickstart guide. In May 2026, ServiceNow and Accenture announced a joint forward-deployed engineering program aimed squarely at moving clients from AI pilots to production at scale — the model going institutional.

There's a deeper reason companies keep investing in it. The front line of a hard deployment is the highest-signal product discovery a company has: you see exactly how the product breaks, where it grinds against legacy systems, and which capabilities are actually needed rather than merely requested. Palantir built its whole strategy on treating forward-deployed teams as the primary engine of what to build next. That feedback loop, more than any single deployment, is the real asset.

Where the model is heading

The role is expanding from individuals into whole teams. Some companies now stand up "forward-deployed everything" pods — engineers, PMs, and data scientists embedded with one customer as a single unit. At the same time, AI agents are starting to make the deployment itself programmable: preparing customer-specific data, monitoring deployment state, and flagging risks for their human counterparts. The high-touch model is becoming more scalable without becoming any less embedded.

The Fit

Who thrives here — and who won't

This role rewards people who like messy, high-context, customer-facing work: talking to customers directly, working through ambiguity, translating between executives and engineers, learning new industries quickly, and driving outcomes rather than just writing documents. It draws well from product management, solutions and sales engineering, technical customer success, implementation consulting, operations, analytics, and startup generalist roles. The common thread isn't a title — it's the ability to sit inside a messy business problem and turn it into a working solution.

It's a poor fit if you want a calm, purely internal product job. If you dislike travel, customer escalation, ambiguous ownership, and being accountable for outcomes you don't fully control, the daily reality will grind on you. And if your real goal is long-term roadmap ownership — classic consumer, growth, or platform PM — be intentional: some FDPM roles sharpen that muscle, others quietly pull your résumé toward implementation and consulting. That can be fine. Just choose it on purpose.

The honest note on travel

Forward-deployed often means being where the customer is — on-site weeks, executive workshops, deployment war rooms. Not every posting is 80% travel; some are hybrid or low-travel. But assume the role can affect your life more than a standard PM job. Early on it's one of the fastest learning environments in tech. It is rarely the easiest lifestyle. That's part of the trade.

None of this is free — the role concentrates the upside and the cost in the same place. Weigh them honestly before you commit.

The upside

The cost

Impact and visibility — tied directly to revenue and the company's most important accounts

Pressure — when a multi-million-dollar deployment slips, it's your name on it

Accelerated learning — technical, product, and industry depth faster than almost any PM role

Burnout risk — real travel and long hours through critical deployment phases

Strategic influence — a direct line to the roadmap, backed by validated customer pain

Less autonomy — your work follows your customers' needs, not a blue-sky strategy

A powerful network — deep relationships with senior leaders at major companies

Role ambiguity — the line between PM, consultant, and architect blurs, and you manage that constantly

The Skill Stack

Enough range to be credible with several audiences at once

You don't need to be the best engineer in the room or a McKinsey-grade consultant. You need enough range to be trusted by customers, engineers, and executives in the same week. Six capabilities carry the role.

### 01 — Product judgment

The ability to tell a customer request from a customer problem, a workflow bottleneck from a product gap, a real platform opportunity from a bad idea championed by an important stakeholder. Customers ask for features; your job is the pain underneath the request. This is the heart of the role.

### 02 — Technical translation

Enough engineering fluency to be useful: APIs, databases, auth, integrations, cloud basics, latency, permissions, and model limitations. For AI roles, add the application layer — prompting, RAG, embeddings and vector search, tool calling, the difference between agents and workflows, evaluation, guardrails, and human-in-the-loop review. You won't productionize every system, but you should be conversant enough to know why one is blocked.

### 03 — Enterprise deployment sense

Enterprise software rarely fails because the feature is bad. It fails because the data is messy, the buyer isn't the user, the security review takes three months, the workflow owner isn't aligned, or the executive sponsor changed priorities. A good FDPM can diagnose whether the blocker is product, engineering, integration, governance, or change management — and that diagnosis is most of the value.

### 04 — Consultative discovery

Operational discovery, not generic customer interviews. What decision are you trying to improve? Who makes it today, and on what data? What happens if the AI is wrong, and who reviews the exceptions? What metric would prove this worked, and what part of the workflow should stay human-owned? You're trying to understand how the work actually happens.

### 05 — Executive communication

The same reality, translated for each audience. Executives want the risk and the plan; engineers want the detail; legal wants the risk framing; security wants the controls. A strong FDPM can say, in one breath, that the adoption risk is frontline distrust, that the fix is human review for 30 days measuring override rates, and that the reusable platform gap is configurable confidence thresholds by workflow type.

### 06 — AI risk and governance literacy

Not as abstract ethics, but as operational product work: what data the model can access, what tools the agent can call, what actions require human approval, how outputs are evaluated, and how failures are logged. You don't need to become a lawyer or security engineer — you need to know the categories of risk and how they show up in a product decision. The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) and the [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) are the two references to internalize.

Positioning

Translate what you've already done into FDPM language

Most people pivoting into this role won't have the exact title on their résumé. That's fine — the work is to reframe what you've already done. Whatever your background, the move is the same: lead with the outcome you owned, show the product judgment behind it, and close the one gap your track record doesn't cover.

Coming from

Lead with

Watch for

Product management

Enterprise discovery, complex launches, roadmap decisions from customer signal

Show you can operate close to the implementation, not just the roadmap

Customer success

Strategic accounts, executive relationships, adoption, voice-of-customer

Prove product judgment, not only relationship management

Solutions / sales engineering

Technical discovery, architecture conversations, proofs of concept

Show post-sale ownership and separating custom asks from platform gaps

Implementation consulting

Deployment ownership, process mapping, stakeholder and change management

Show you shape product decisions, not just take orders

Operations / analytics

Workflow improvement, process automation, business metrics, AI pilots

Quantify the problems you diagnosed and turned into better systems

Engineering

Customer-facing technical work, shipping under ambiguity, prototypes

Show you can decide what to build and why, not only build it

One rewrite habit does most of the work: trade responsibilities for outcomes. "Worked with customers to gather requirements" becomes "Led discovery with enterprise operations leaders to map a manual intake workflow, define success metrics, and translate findings into a prioritized plan adopted by engineering and customer stakeholders." Every bullet should carry some mix of customer problem, technical constraint, product decision, and measurable result.

The Action Plan

A 90-day pivot you can start this week

### 1. Pick your lane

Don't chase "FDPM" in the abstract. Pick one or two flavors — AI-agent, enterprise SaaS, healthcare AI, data platform, support automation — so your learning plan, résumé, and portfolio all point the same direction.

### 2. Reverse-engineer 20 job descriptions

Search titles like Forward-Deployed Product Manager, AI Product Manager (Enterprise), Deployment Strategist, Solutions Product Manager, and Forward-Deployed Engineer. Track the required technical skills, customer-facing expectations, travel, AI skills, compliance needs, and repeated keywords. You're not just job hunting — you're mapping the market.

### 3. Build one real AI deployment project

You need proof you can work with AI beyond prompting. Build something small but real — a ticket-triage agent, a policy Q&A bot with citations, a contract-review assistant with human approval. What matters is the judgment around it: problem statement, data sources, human-in-the-loop points, evaluation approach, failure modes, and what you'd do next. Don't say "I built a chatbot." Show you understand deployment.

### 4. Get closer to customers where you already work

The fastest way to become FDPM-shaped is to move toward customer reality now. Volunteer for enterprise discovery calls, implementation escalations, beta programs, or an internal AI workflow pilot. You're collecting stories where you diagnosed a messy problem, aligned stakeholders, worked through a technical constraint, shipped something, and measured whether it worked.

### 5. Turn those stories into a field-notes portfolio

Write three to five short case studies, anonymized if needed: the business context, the problem, the users, the workflow, the technical constraint, the product decision, the rollout, the risks, the result, and the reusable product insight. This is your interview ammunition — it's what proves judgment when the title on your résumé doesn't.

### 6. Practice the deployment-strategy case

FDPM interviews often read like implementation cases: *"A healthcare provider wants an AI intake assistant. Data lives in three systems, legal is nervous, nurses don't trust the recommendations. Walk us through your first 90 days."* A strong answer doesn't jump to features — it clarifies the business goal, maps stakeholders and the workflow, assesses data readiness, defines success metrics and risks, scopes a pilot, designs human review, and builds a feedback loop back to product.

### 7. Apply to adjacent roles, not just the exact title

Because the title is still emerging, cast wider: AI Product Manager, Technical PM (Enterprise), Solutions Product Manager, Deployment Strategist, Forward-Deployed Engineer if you're technical — and watch the boards at Palantir, Glean, Salesforce, OpenAI, Scale AI, and a wave of newer AI startups where these roles cluster. A typical path runs Success / Solutions / Ops → a technical or AI-workflow role → a customer-facing product role → Forward-Deployed PM → core AI PM, product leadership, or founder. The career value is the skill set, not the label.

Sequence it like this

Weeks 1–2: pick your lane, study the job descriptions, start one deployment project. Weeks 3–8: get onto real customer work where you are, and pair it with the AI-operations reading below. Weeks 9–12: package three to five case studies, rehearse the deployment case, and start applying to the adjacent roles. Do the learning while running something real — the reading proves literacy, the pilot proves judgment.

The Interview

Less “design a product for X,” more “solve this messy customer situation”

An FDPM loop looks different from a standard PM loop. Expect a blend of product strategy, a real technical deep-dive, and situational judgment — and expect the centerpiece to be an implementation case rather than a clean feature-design prompt. The panel is checking three things at once: that you have the technical chops to hold a room of senior engineers, the poise to sit across from a customer executive, and the product sense to tell a one-off request from a platform pattern.

A case you should be ready for

“A Fortune 500 bank wants to use our AI platform to automate fraud detection. Their data lives in a 20-year-old mainframe, their security team is nervous, and the fraud analysts don’t trust model output. Walk me through your first 90 days.”

The instinct that separates a strong answer here is counterintuitive: don’t reach for the solution, reach for the constraints. Before you draw the map, understand the terrain — the customer’s technical limits, their real definition of success, and who actually has to sign off. Clarify data readiness, scope a pilot, design the human-review step, then commit to a metric. Interviewers read that first move — de-risking before designing — as maturity, and it’s the single clearest tell of someone who has done this work before.

The technical portion is genuine, because the job won’t let you hide from engineers. Be ready to talk system design, APIs, data pipelines, and — for AI roles — where RAG, embeddings, and agents fit and where they don’t. If that’s your soft spot, the fastest fix is to build one small thing against a real API before you interview, not to read about it. Then frame your own history around customer outcomes: use plain STAR structure to tell stories where you worked a difficult account, untangled a hard integration, or changed a roadmap because of something you learned in the field. Those are the stories this loop is built to surface.

Resources

What to read and build to close the AI-operations gap

AI product fundamentals

[OpenAI Agents SDK docs](https://openai.github.io/openai-agents-python/)

The clearest primer on agentic application patterns — planning, tool use, and multi-step state.

[LangGraph docs](https://langchain-ai.github.io/langgraph/)

How long-running, stateful agents are orchestrated — the mental model for multi-agent workflows.

[LangChain agent concepts](https://python.langchain.com/docs/concepts/agents/)

The base "model + tools + harness" pattern every agentic system builds on.

AI risk and governance

[NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

The Govern–Map–Measure–Manage structure for handling AI risk to people and organizations.

[OWASP Top 10 for LLM & GenAI Applications](https://genai.owasp.org/llm-top-10/)

Prompt injection, sensitive-data disclosure, insecure output handling, excessive agency — the risks that decide whether an AI project ships.

Enterprise and product craft

Get credible on the plumbing — APIs, auth and SSO, role-based access, audit logs, data retention, and the vocabulary of security review, SOC 2, and (where relevant) HIPAA or GDPR. Pair it with the consulting muscles you'll use daily: discovery interviews, workflow mapping, PRDs and acceptance criteria, rollout planning, and post-launch analysis. You don't need to become a backend engineer — you need to understand why a deployment is blocked by data access, permissions, latency, or integration constraints.

The Learning Stack

Ten resources across the three skill pillars — build a stack, don’t just pick one

The references above tell you what to read to understand the role. These ten build the skills to get hired for it, mapped to the pillars the role runs on: technical acumen, consultative problem-solving, and strategic communication. They span price points and formats on purpose — the point is to assemble a stack, not to pick a single course. A suggested sequence is at the end.

Technical acumen — AI and LLM depth

[Ed Donner — “LLM Engineering: Master AI and Large Language Models” (Udemy)](https://www.udemy.com/course/llm-engineering-master-ai-and-large-language-models/)

Eight hands-on projects across transformers, prompt engineering, RAG, fine-tuning with LoRA/QLoRA, and multi-agent systems. Taught by a former AI-startup CEO and ex-JPMorgan MD, refreshed for 2026. The best “learn the whole stack by building” option, and it’s cheap — exactly the depth you need to hold your own architecting RAG in a customer environment.

[Interview Kickstart — Applied GenAI / Forward Deployed Engineering track](https://interviewkickstart.com/courses/forward-deployed-engineering)

The most role-specific program I found: an AI-engineering spine, an FDE spine, and interview prep, with live projects like a CRM lead-qualifier agent and a grounded RAG assistant that answers only from its sources. The planner–executor–critic module in LangGraph maps straight to the agents-in-the-deployment-loop trend. Pricier and cohort-based — best when you want structure and interview prep bundled.

[Flowise AI RAG (no-code) — Elvis Saravia, via Class Central’s RAG roundup](https://www.classcentral.com/report/best-rag-courses/)

Build RAG systems by drag-and-drop instead of Python. The fastest way to get intuition for retrieval, embeddings, and vector databases without a coding detour — a strong on-ramp before Donner’s deeper course.

Technical acumen — APIs, systems, and cloud

[Emmanuel Paraskakis — “API Fundamentals for Product Managers” (Maven)](https://maven.com/emmanuel/api-pm-fundamentals)

A live cohort course on the essentials of talking to developers, gathering requirements, and launching an API product, taught by someone with 15+ years leading API products. APIs and integrations are where FDPMs spend their days; the follow-on [“API Product Mastery”](https://maven.com/emmanuel/api-pm-mastery) adds REST/GraphQL/gRPC trade-offs and MCP readiness if you want to go deeper.

[ProductDive — Certified Technical Product Management](https://productdive.com/technicalproductmanagementprogram/)

A seven-week program for managing APIs, systems, and technical products without becoming an engineer — system-design fundamentals, workflow visualization, API management, with an optional AIPMM certification. Good if you want a credential and a PM-framed treatment rather than an engineer’s course.

[“The Product Manager’s Guide to System Design” (book, systemdr)](https://systemdr.substack.com/p/the-product-managers-guide-to-system)

Written for PMs, not engineers: trade-offs between speed, quality, and technical debt, anticipating scaling, and leading architecture discussions without writing code. The cheapest, fastest way to stop being blindsided by “that’ll take eight weeks” and to reason about the legacy-integration problems FDPMs constantly hit.

Consultative problem-solving — enterprise discovery and qualification

[MEDDIC Academy — MEDDPICC certification](https://meddic.academy/)

The official self-serve certification (from \$297), widely cited as the best ROI for individuals who want structured practice plus a verifiable credential; a free 12-minute intro lets you test first. MEDDIC is still the dominant qualification framework for enterprise B2B. Since the FDPM owns time-to-value in C-suite deals, thinking in Economic Buyer / Decision Criteria / Metrics / Champion terms is genuinely useful.

“The Challenger Sale” and “SPIN Selling” (books)

The role’s core move — customers know their problems, not their needs — is consultative-selling territory. Challenger’s research across 6,000 reps found the best performers reframe how buyers think about their problems. That’s the skill of turning “make our content creation more efficient” into a concrete technical solution; SPIN supplies the discovery-question discipline underneath it.

Strategic communication and product sense

[HelloPM — AI Product Management course (free, 9 masterclasses, 12+ hours)](https://hellopm.co/free/)

Covers LLMs, RAG, evals, PRDs, analytics, and APIs, plus a tech-fundamentals module built for non-technical PMs. Free, broad, and it ties the AI material back to core PM artifacts — exactly the translation layer an FDPM lives in. Good for filling gaps cheaply.

[Anthropic — production-deployment AI certification](https://www.sundeepteki.org/forward-deployed-engineer.html)

Built around production deployment — agentic architecture, tool orchestration, enterprise reliability — with a \$99 exam across five domains that maps closely to what forward-deployed interviews evaluate at labs like OpenAI, Palantir, and Anthropic. Verify the current details on Anthropic’s site before committing, since specifics change.

How to sequence it

Don’t try to do all ten. Start with the no-code RAG course and the system-design book to build vocabulary fast. Then go deep with Donner’s LLM course and one enterprise-selling resource, and keep the free HelloPM course running alongside to stay PM-framed. Save the FDE-specific bundles — Interview Kickstart and the Anthropic certification — for when you’re actively interviewing, since they include prep for the exact loops.

Before You Accept

The questions that reveal whether the role has real product power

The title won't tell you the job, so make your interview a two-way diligence process. The answers to a handful of questions separate a real product role from a delivery role wearing a strategic title:

How does field feedback actually get into the roadmap, and who decides what becomes a platform feature? Do FDPMs have dedicated engineering capacity for what they discover? What happens when a customer needs something the product can't do yet? Are you measured on product impact, delivery milestones, revenue, or customer happiness? Can an FDPM say no to a customer? Who owns the relationship — sales, success, deployment, or product? And how much travel is really expected? Companies that respect the role answer these crisply. Companies using the title to dress up a delivery job tend not to.

### The Takeaway

The strongest reason to pursue this role isn't that the title is trendy — it's that the skill set is rare and portable. If you can walk into a business, understand how it operates, find where AI creates value, manage the risk, shape the workflow, coordinate the build, drive adoption, and measure impact, you'll be useful almost anywhere: AI product leadership, product strategy, transformation, consulting, or founding something of your own.

The people who win the next phase of AI won't be the ones who can prompt a model. They'll be the ones who can get AI into production where it changes how work actually gets done. That's the real forward-deployed opportunity — and the mess is the job. If you can operate inside it now, you're ahead of most people still waiting for AI products to become clean and plug-and-play. They probably won't.

Want more guides on the careers AI is quietly creating?

Follow along on Instagram for weekly breakdowns.

[@davebrownbrand](https://www.instagram.com/davebrownbrand)


---

# GUIDE: GoodWorkIsTheFloor

d.avebrown instagram.com/d.avebrown

# Good Work Is the Floor

The 5 things your manager actually fights about when they split the raise budget — and 10 ways to put your thumb on the scale.

by d.avebrown · written from inside the rooms where the raise pool actually gets divided

The Problem

Your raise was decided in a room you weren't in

If you got a 2% raise this year, the worst thing you can do is try to outwork everyone else next year.

I know that sounds backwards. Grind harder, get paid more. That's the deal they sold you. It's not the deal.

Here's what nobody tells you. Your raise was decided months ago, in a room you weren't in. By the time your review shows up on the calendar, the number is basically set. The conversation already happened. You just didn't get to be part of it.

I've managed teams at everything from Fortune 500s to startups. I've sat in those rooms. So let me tell you what actually gets said when a manager is splitting a fixed pool of money across a team of people who all, on paper, did fine.

Good work isn't the thing that moves the number. Good work is the floor. It's the bare minimum everybody in the room already cleared. Nobody's arguing about whether you did your job. They're arguing about five other things.

5

things that actually get argued about once "did they do good work" is off the table

0

of those five is "worked harder than everyone else on the team"

Months

before your review meeting that the number is effectively locked — the campaign happens well before the conversation

This guide is in four parts. First, three ways to reframe what a raise actually *is* — because the standard frame ("I did good work, I should be rewarded") is the thing quietly costing you money. Then the five arguments themselves, with two concrete moves for each. Then how to make yourself easy to defend when you're not in the room. Then an honest section on what to do when none of it works, because sometimes the answer really is that the number isn't going to move here.

Good work isn't the thing that moves the number. Good work is the floor. It's the bare minimum everybody in the room already cleared.

Three Reframes

Before the tactics, fix the model you're running on

Most raise advice fails not because the tactics are wrong but because people are solving the wrong problem. They think they're in a fairness contest. They're not. Three shifts in how you see it will make everything that follows obvious.

Reframe one: it's a pricing decision, not a grade.

School trained you on a specific loop — do the work, get evaluated, receive a mark that reflects the quality of the work. Compensation does not run on that loop. Your salary is a *price*, and prices are not set by effort. They're set by what it would cost to replace you, what someone else would pay for you, and how much pain your absence would cause. That's it. That's the whole mechanism.

This is why the hardest worker on a team routinely gets paid less than the person who is merely good but hard to replace. It isn't a scandal. It's a market doing what markets do. Once you accept that comp is a price rather than a report card, the five arguments stop sounding cynical and start sounding like a description of how pricing works everywhere else in your life.

It also relieves you of a burden you shouldn't be carrying. You are not trying to prove you're a good person who deserves things. You're trying to change the inputs to a pricing formula. That's a much more tractable problem, and it's not a moral one.

Reframe two: your manager isn't your judge, they're your lawyer.

Here's the part that surprises people most. In the room where your number gets set, your manager is usually not deciding whether you're good. They're deciding *who they're willing to spend their credibility defending*, in front of their own boss and their peer managers, with a fixed pool of money and a set of constraints they didn't choose.

Understand the constraints and the whole thing snaps into focus. The pool is fixed and usually smaller than your manager wants. Every dollar to you is a dollar not going to someone else on the team — so every advocacy is also an implicit argument that someone else deserves less. There are salary bands and someone already near the top of theirs is expensive to move. There's compression to manage, where a new hire came in at market rate and now sits uncomfortably close to a loyal three-year veteran. And there's a peer-manager audience, which means your manager cannot just assert that you're great. They have to *show* it, in language that survives contact with people who've never watched you work.

So the question isn't "does my manager think I'm good." The question is "does my manager have ammunition." You're not persuading a judge. You're briefing an attorney who has to argue your case without you in the room. Everything in this guide is really about loading their brief.

What that sounds like in the room

"Look, I know they had a solid year. Everyone here had a solid year. Tell me what happens to us if they leave, and tell me what you're going to say to the other four people on your team when they find out."

Reframe three: you're campaigning in the wrong quarter.

The review conversation is a ceremony. The decision is a process, and the process runs earlier — often a full quarter or two earlier — through calibration meetings, budget planning, and a hundred informal conversations between managers about who's rising and who's plateaued.

Which means the most common raise mistake is a timing mistake. People spend eleven months heads-down and one month building a case. That's exactly backwards. The case gets built during the eleven months, in the form of things other people say about you when you're not there. The month before review, all you're doing is confirming a story that's already been written.

Find out your organization's actual cycle. When does budget planning happen? When is calibration? Ask your manager directly — "when do comp decisions actually get made around here, so I know when to make sure you have what you need from me?" Most managers will just tell you, and the question itself signals that you understand how the machine works, which is not a common signal.

You are not persuading a judge. You are briefing an attorney who has to argue your case in a room you're not allowed into.

The Five Arguments

What actually gets debated once good work is assumed

Here are the five, the blunt version of the question each one really asks, and the two moves that put your thumb on that particular scale. The full detail follows.

The argument

The question underneath it

Your two moves

1\. Goodwill

Do people actually want to work with you, or do they route around you?

Get requested by name outside your team; be the connective tissue inside it

2\. Trajectory

Am I paying for who you are today, or who you're about to become?

Solve a problem one level up, out loud; build a forward-pointing skill and flag it early

3\. Trust

If I hand you something, does it come back done — or does it come back to me?

Ship work that needs no second look; kill the button instead of pressing it forever

4\. Flight risk

Do I have to fight for this person, or will they stay regardless?

Build a public footprint; stay calibrated to the market even when you're not leaving

5\. Leverage

If you walked out tomorrow, does something break?

Own a system end to end; become the source of truth for it

Notice that none of them is "worked the most hours." Notice also that four of the five are about what *other people can observe*. That's not an accident — it's the entire game.

Argument One — Goodwill

Do people actually want to work with you?

Not "are you nice." Nice is cheap. The real question is whether people want you on their project, or whether they quietly route around you.

Managers know who the router-arounds are. They see who gets requested and who gets tolerated. When your name comes up and three other people nod, that beats a clean task list every time.

It's worth being precise about why this carries so much weight, because it sounds soft and it isn't. A person other teams want to work with is a person who reduces friction across the org — and friction is the most expensive invisible cost a company has. Your manager may not be able to quantify it, but they feel it every time a project stalls because two groups won't talk. Being the reason things move is a real economic contribution, it just never shows up on a ticket.

What that sounds like in the room

"Every time we spin up something cross-functional, three different leads ask for them by name. I don't have another person on my team I could say that about."

### 01 — Get requested by name outside your team.

Do the cross-team favor. Help the PM on the other squad unblock their launch. Pull the data the marketing team can't figure out. When people outside your reporting line start asking for you specifically, that travels. Managers talk to each other. A "hey, your person saved us last week" in a hallway is worth more than anything you'll write in your self-review.

The reason this works so disproportionately is that it's *third-party testimony*. Anything you say about yourself is discounted as advocacy. Anything a peer manager says about you is treated as evidence. One unprompted comment from someone with nothing to gain outweighs three paragraphs of self-assessment, because it's the only kind of praise nobody suspects you of engineering.

Practical version: pick two or three people outside your org whose work touches yours, and make yourself genuinely useful to them once a quarter. Not performatively — actually useful, on something they cared about. That's a small enough cadence to sustain and a big enough footprint to be remembered at calibration time.

The shadow version

Becoming so available to everyone else that your own commitments slip. Cross-team goodwill purchased with missed deadlines at home is a net loss — it trades against argument three, and your manager is the one who pays for it.

### 02 — Be the connective tissue on your own team.

Not the loudest voice in the meeting. The one who makes the meeting matter. You close the loop, you unblock the teammate who's stuck, you volunteer to onboard the new hire. Be the person the team routes toward. That reputation is currency, and it spends at raise time.

Onboarding is the underrated one here. Whoever teaches the new person becomes, by default, the person that new person asks for the next eighteen months. You've quietly made yourself a hub, and you did it by volunteering for a job most people avoid. There's a version of this in almost every team: the annoying, low-glory coordination work that everyone benefits from and nobody wants. Taking it is one of the cheapest reputation purchases available.

The shadow version

Becoming the team's glue and nothing else. If every hour goes to unblocking other people, you have no output of your own to point at, and "great teammate" becomes a consolation prize rather than a multiplier. Glue work counts on top of delivery, not instead of it.

Argument Two — Trajectory

Can they see you six months from now doing something bigger?

The question in the room is blunt. Am I paying for who you are today, or who you're about to become? Can I picture you taking on a bigger problem in six months, or are you already at your ceiling in this seat?

If you look done, you get priced like you're done.

This is the argument people misread most badly, because it feels unfair — you're being priced on a forecast rather than a record. But it's rational from where your manager sits. A raise isn't a payment for last year; it permanently resets the cost of employing you going forward. So they're not asking "was this year worth it." They're asking "is this person going to be worth their new number next year, and the year after." You're an investment decision, and investments are priced on expectations.

Which means the signal you need to send isn't competence. It's *slope*. Two people can be at the same level of skill and be priced completely differently based on which direction they appear to be moving. Slope is visible only when someone can compare you now to you six months ago — which means it has to be observed over time, which means it can't be manufactured in the month before review.

What that sounds like in the room

"Honestly? I think they're maxed out where they are. Solid, reliable, but I can't picture handing them the platform work next year." — the single most expensive sentence anyone can say about you.

### 03 — Solve a problem one level above your job, out loud.

Find the thing nobody asked you to fix and bring a proposal for it. Not "here's a task I finished." Instead, "here's a gap I spotted and here's how I'd close it." That one move tells your manager you see the business, not just your to-do list. Pitch it. Don't fix it quietly in the dark where nobody credits you.

"One level above" is doing real work in that sentence. It doesn't mean bigger — it means a wider frame. If your job is executing tasks, the level above is noticing which tasks shouldn't exist. If your job is owning a project, the level above is noticing which projects the team is missing. You're demonstrating that you can hold the context your manager holds, which is precisely the evidence they need to argue you're ready for more.

Bring it as a proposal, not a complaint. The difference between "our handoff process is broken" and "here's a two-week change to our handoff process, here's what it'd save, here's what I'd need" is the difference between a person who identifies problems and a person who resolves them. Only one of those is a promotion case.

The shadow version

Proposing constantly and delivering rarely. If you develop a reputation for grand ideas that never ship, "sees the bigger picture" curdles into "doesn't finish things." Pick one, land it, then pick the next one.

### 04 — Build a skill that points where the company is going, and flag it early.

Not a random certificate that pads your profile. The specific one that maps to where your industry is heading right now. Then tell the right person you're doing it before you finish. "I'm going deep on this because I think it's where we're headed" is a growth signal. A quiet cert nobody knew about is a footnote.

The "flag it early" instruction is the whole tactic and people skip it because announcing an unfinished thing feels like bragging about nothing. It isn't. Announced early, the skill reads as strategic judgment — you looked at where the business is going and pointed yourself at it. Announced after the fact, it reads as a line item. Same effort, completely different signal, and the only variable is timing.

Pick the direction by listening to what leadership keeps repeating. Whatever your executives keep mentioning in all-hands is what will be funded next year, and being visibly early on a funded direction is one of the strongest trajectory signals available. Then close the loop: come back with something you actually built or changed using it. A skill claimed is a footnote. A skill applied to your team's real problem is a story your manager can retell.

The shadow version

Chasing every new direction and landing on none. Announcing four learning tracks in a year reads as distraction, not ambition. One direction, pursued visibly, beats four mentioned once.

Argument Three — Trust

If they hand you something, does it come back done?

Or does it come back to them. That's the whole question. Trust isn't about being the smartest person on the team. It's about hand-back rate. Can your manager give you a thing and stop thinking about it.

The currency here is your manager's attention, which is the scarcest thing they own. Every person on the team occupies some amount of it. The person who takes almost none — who absorbs an ambiguous problem and returns a finished answer — is doing something economically enormous and almost entirely invisible. They're giving their manager back capacity. That's why this argument is so reliably decisive, and it's also why it's so often uncredited: the whole point is that nothing happened.

Which leads to the uncomfortable corollary. If you are extremely reliable and nobody knows it, you have optimized yourself into invisibility. The fix isn't to be less reliable. It's to make the absence of problems legible, which is what the next section on evidence is entirely about.

What that sounds like in the room

"I gave them the migration in March and genuinely did not think about it again until it was done. Do you know how rare that is?"

### 05 — Become the person whose work ships without a second look.

Your goal is a manager who forwards your output without reading it first. That reputation gets built one clean delivery at a time. And when you catch the problem before it became a problem, make sure that gets seen. Quiet saves don't count if nobody knew there was anything to save.

There's a specific, learnable behavior underneath this: closing the loop before you're asked to. Most of what makes a person feel unreliable isn't missed work, it's silence — the manager doesn't know where things stand, so they have to ask, and the asking is the cost. Short proactive updates at the moments someone would otherwise wonder ("this is on track, one thing changed, here's how I'm handling it") buy an outsized amount of trust for almost no effort.

The other half is what to do when things go wrong, because they will. Bringing a problem early, with a recommendation attached, builds more trust than never having problems at all. "This is going to slip two days, here's why, here's what I'd cut if that's not acceptable" is the sentence of someone who is trusted. Discovering the slip at the deadline is the sentence of someone who isn't.

### 06 — Stop pressing the button you were told to press.

Most people find the button they were assigned and press it forever, because that's what they were told to do. The people who actually move up press the button once, then figure out how to automate it away or redesign the process so nobody has to press it again. Do that, then say you did it. "I killed a task that used to eat six hours a week" is a sentence that changes how you get priced.

That sentence works because it converts your contribution into the unit your manager's boss thinks in. Six hours a week is roughly fifteen percent of a person, recurring, forever. That's a number someone can carry into a budget conversation. "Improved our process" is not. The translation from activity to recoverable capacity is one of the highest-leverage rhetorical moves available to you, and almost nobody makes it.

There's a fear worth naming here, because it stops people: if I automate my job, don't I automate myself out of it? In practice the opposite happens. The person who eliminated a recurring task is the person trusted with the next, larger one — you've just demonstrated the exact judgment argument two is asking about. What gets eliminated is a task. What gets promoted is the person who could see it was eliminable.

The shadow version

Automating something load-bearing without telling anyone, then leaving a fragile script nobody understands behind. That's not an efficiency win, it's a liability with your name on it — and it will be remembered as such the first time it breaks.

Argument Four — Flight Risk

Do they have to fight for you, or will you stay anyway?

Here's the uncomfortable one. Nobody fights for a raise for someone they think is staying no matter what. Loyalty without options is just leverage you handed away for free. Comfortable people get skipped. The budget flows toward the people the company is scared to lose.

People hate this one, and I understand why — it seems to punish exactly the loyalty companies claim to want. But look at it from inside the constraint set. Your manager has a fixed pool and five people. Two of them have visible outside options. Three of them, as far as anyone can tell, are staying regardless. If the goal is to have all five people in twelve months, where does the marginal dollar go? It goes where the risk is. Not because the loyal ones matter less, but because money is being used as a retention instrument and retention spending follows retention risk.

There's a structural version of this too, and it explains a phenomenon you've probably seen up close. New hires get priced at today's market. Existing employees get priced at last year's number plus a percentage. Run that for three years and the person who stayed is often underpaid relative to the person hired to sit next to them — not through malice, just through arithmetic. Nobody comes along and fixes that for you. It gets fixed when there's a reason to fix it.

What that sounds like in the room

"If they walked into my office next month with an offer, would I be surprised? … Yeah, honestly, no. I wouldn't be." — the sentence that reallocates budget.

### 07 — Build a public footprint.

LinkedIn, a portfolio, a presence in your field. Not because you're job hunting. Because you want to look like someone who could leave tomorrow. Post about your work. Let it be obvious you have a market outside the building. Visibility on the outside is leverage on the inside.

The elegant thing about this move is that it's completely honest. You're not implying anything or threatening anyone. You're just being visible in your field, which is a normal thing for a professional to be. It happens to also communicate, without a word ever being spoken about it, that you are a person the outside world can see. That's the entire mechanism, and there's nothing to feel bad about in it.

It compounds in a second direction too. A public footprint makes argument one — third-party testimony — work at a scale your hallway conversations can't reach. Externally visible people accumulate external reputation, and external reputation eventually walks back through the front door as inbound interest, speaking invitations, and people mentioning your name in rooms you'll never enter.

### 08 — Stay in the market even when you're not leaving.

Keep your resume current. Take the recruiter call. Do the occasional interview to stay calibrated on what you're actually worth out there. This isn't about bluffing your way into a counteroffer, that game backfires the second someone calls it and you're not willing to walk. It's about being a person with real options, because people with real options get fought for.

The calibration value alone justifies it. Most people who are badly underpaid don't know they're badly underpaid — they have no reference point except their own last raise, which is the one number guaranteed to be anchored to the past. Two real conversations a year with the outside market tells you whether your 2% was an insult or an accurate reflection of your current price. Those are very different situations and they call for very different responses.

It also changes how you carry yourself, which is harder to fake than it is to earn. The difference between someone negotiating from options and someone negotiating from hope is audible in about ninety seconds. You don't have to mention the offer. You just have to actually have somewhere else to be.

The shadow version

Manufacturing a threat you won't follow through on. Waving an offer you'd never take, or hinting at one that doesn't exist, is a one-time trick that costs you argument three permanently the moment someone calls it. Have the options or don't play the card.

Argument Five — Leverage

If you walked out tomorrow, does something break?

This is the big one. This is leverage in its purest form. If you disappeared, would something important stop working? If the answer is no, you're replaceable, and replaceable people get replaceable raises.

It's also the argument that most directly determines your price, because it's the closest thing to a literal answer to "what would it cost to replace this person." Everyone is theoretically replaceable. The question is what the replacement actually costs — in recruiting time, in ramp-up, in the specific things that only work because someone knows why they were built that way. When that number is large and legible, your raise stops being a reward and starts being risk management.

What that sounds like in the room

"If they left in Q3, what happens to the reporting pipeline? … Right. So let's not find out."

### 09 — Own a system end to end.

Build the automation the team now runs on. Own the pipeline or the process the business depends on. Put your name on it. When it hums along and everyone knows who keeps it humming, you've built something no raise pool can quietly skip over.

The words "end to end" matter more than "system." Owning a piece of something is not the same as owning the outcome. If you own a step, you can be swapped. If you own the result — including the parts that are annoying, political, and undefined — then removing you means someone has to reconstruct not just your work but your understanding of how all the pieces fit. That's the difference between a task and a position.

If you don't have one yet, look for the thing everyone complains about and nobody owns. Unowned pain is the cheapest ownership on the market, precisely because claiming it requires volunteering for something unpleasant. Twelve months later it's a system with your name on it, and you acquired it without competing against anyone.

### 10 — Become the source of truth.

This one's underrated. The person who wrote and maintains the documentation for a critical system becomes the reference point for it. Same with the person who owns the key process, or the marketing copy that actually converts. You're not hiding the keys. You're the one who made them make sense. That makes you central, and central is safe.

The counterintuitive part is that being the source of truth requires *giving away* information, not holding it. Every time you write the definitive explanation of how something works, you make yourself slightly less necessary for that specific question and considerably more necessary as the person who understands the whole picture. Documentation is how you convert private knowledge into public standing. You lose the small dependency and gain the large one.

One warning here. There's a bad version of this, where you hoard knowledge and turn yourself into a hostage-taker. Don't. That reads as untrustworthy and it torches everything in arguments one and three. The move isn't to be the person nobody can replace because you hid the map. It's to be the person who built the thing so well that they're glued to it.

The shadow version

Deliberate opacity — undocumented systems, knowledge kept in your head "for job security," a bus factor of one you engineered on purpose. Managers can tell the difference between someone who is central and someone who is holding a hostage, and the second one gets routed around, then replaced at the first opportunity.

The Balance

The five pull against each other on purpose

Notice something. Being irreplaceable can look like hoarding, which wrecks being a team player. Being a flight risk can look like disloyalty, which dents being trusted. That tension isn't a flaw in the system. That's the game.

The people who win raises aren't maxing out one of these. They're playing all five at once, in balance. Trusted and a little bit of a flight risk. Central to a system and still generous with their team. That balance is rare, and rare is what the budget rewards.

It's worth being explicit about which pairs fight, because knowing where the tension lives is how you avoid tipping over into the shadow version of a good instinct.

Over-rotate on…

…and you damage

The balance point

Leverage

Goodwill and trust — ownership curdles into hoarding

Own the system, document it publicly, train a backup and say you did

Flight risk

Trust — options start reading as one foot out the door

Be visibly employable and visibly committed to the current quarter's work

Goodwill

Trust and leverage — you become everyone's helper and nobody's owner

Say yes to cross-team work only when your own deliverables are safe

Trajectory

Trust — big ideas, unfinished execution

One level-up proposal at a time, landed before the next one starts

Trust

Trajectory — flawless at your current scope, invisible beyond it

Reliability plus one visible reach past your job description per cycle

If you're going to be unbalanced anywhere, be unbalanced toward trust. It's the one that makes the others believable — every other argument gets discounted if your manager isn't certain the work comes back done.

The Evidence Problem

Make yourself easy to defend when you're not in the room

Everything above is worthless if your manager can't retell it. Remember the reframe: they're your lawyer, not your judge, and they're arguing in front of people who never watched you work. What survives that room isn't your effort. It's the two or three concrete, repeatable sentences your manager can say out loud without being challenged.

Which produces a specific and slightly depressing fact: good work decays from memory at an alarming rate. The thing you saved in February is gone by October. Not because anyone is ungrateful — because managers are running the same recall problem across five or eight people, and recency wins by default. Your job is to fight decay.

Keep a running ledger. It takes four minutes a month.

One document. Once a month, add anything that happened worth remembering: what you shipped, what it changed, what it saved, who said something nice and what exactly they said, what broke that you caught. Copy the actual quote when someone thanks you — a verbatim line from another team's lead is evidence, your recollection of it is not.

This does two things. It gives you the raw material for any conversation about your value, and — more importantly — it lets you hand your manager a brief rather than a feeling. When you can send five bullets with numbers attached before calibration season, you have done their hardest job for them. Managers remember who made their life easy at the exact moment their life was hardest.

Translate activity into their language

"I cleaned up the reporting process" → "I cut the weekly reporting cycle from six hours to twenty minutes — that's about fifteen percent of a person, back, every week." "I helped out the growth team" → "Growth asked for me by name on the Q2 launch; their lead sent this note afterward — \[quote\]." "I've been learning about our new data platform" → "I went deep on the platform because I think that's where we're headed, and I've already migrated our two slowest jobs onto it."

Ask the question that gets you a real answer.

The other half of the evidence problem is finding out, before the decision, what your manager would need in order to argue for you. Most people never ask, and then get surprised. Ask early, ask specifically, and ask in a way that makes it easy to answer honestly.

Say this, well before review season

"I want to be somewhere different in twelve months, and I'd rather aim at the right things than guess. If you were making the case for me at the next comp cycle, what would you want to be able to say — and what's the gap between that and what you could say today?"

That question does three jobs at once. It signals trajectory, it makes your manager a collaborator rather than a gatekeeper, and it converts a vague ambition into a specific list. If you get a vague answer back, push once: "what's the one thing that would make the biggest difference?" If you still get a vague answer, that's information too — and it belongs in the last section of this guide.

And when you get the number, whatever it is

"Thanks for walking me through it. Help me understand what a top-of-range outcome would have looked like this cycle — what did that person do that I didn't? I'd rather know now than find out next year."

Asking this without heat is disarming, and it produces a genuinely useful answer more often than you'd expect. It also quietly makes your intent legible: you're not upset, you're aiming.

The Self-Audit

Score yourself honestly, then fix your lowest number

Rate each of the five from 1 to 5, using the evidence standard — not "do I feel like this is true" but "could someone else say this about me, out loud, with an example." Most people find they're a 4 or 5 on trust and a 1 or 2 on something else entirely, which is exactly why they keep getting priced as reliable rather than valuable.

**Goodwill.** Can I name two people outside my team who have asked for me by name in the last six months?

**Trajectory.** Can I point to one thing I proposed this year that was above my job description — and did the right person hear about it?

**Trust.** When my manager hands me something ambiguous, how often does it come back to them before it's done?

**Flight risk.** If I decided to leave, how long would it take me to have a real offer — and does anyone here have any reason to believe I could?

**Leverage.** Name the thing that breaks if I'm gone for a month. If I can't name it in one sentence, it doesn't exist.

**Evidence.** Could my manager, right now with no prep, say two specific sentences about my impact with numbers in them?

Your lowest score is your entire strategy for the next two quarters. Not your highest — people love working on the thing they're already good at, and it's the single most common way a year of effort produces no change in the number. Going from a 4 to a 5 on trust is nearly worthless. Going from a 1 to a 3 on leverage changes the conversation completely.

The Campaign

What to do, working backward from the decision

Since the decision happens before the conversation, the plan has to run backward from it. Find your organization's real cycle first — then map this onto it. The months below are relative to when the *decision* gets made, not when you get told.

When

What you're doing

Why then

9–12 months out

Ask the "what would you want to be able to say" question. Pick your lowest audit score. Claim an unowned system. Start the ledger.

Leverage and trajectory both need runway — they're the two you cannot fake in a quarter.

6–9 months out

Do the cross-team favors. Land one level-up proposal. Kill one recurring task and put a number on what it saved.

Third-party testimony has to be earned early enough to be repeated by someone else later.

3–6 months out

Take a recruiter call and calibrate. Make your outside footprint visible. Document the system you own and train a backup.

Flight risk works as a slow background signal, never as a sudden one. Documentation defuses the hoarding read.

1–3 months out

Send your manager the brief — five bullets, numbers attached, quotes included. Ask what's missing.

This is when they're actually assembling the case. Arrive before the deck does.

The conversation

Confirm the story that's already written. Ask what top-of-range looked like. Set next cycle's target.

The number is set. What's still live is the next twelve months.

If you're reading this a week before your review, you're not out of options — you're just out of options *for this cycle*. Start the ledger today, ask the top-of-range question in the meeting, and run the real campaign against next year's decision date. The people who compound this get further in two cycles than most people get in five.

The Honest Part

Sometimes the number isn't going to move here

I'd be doing you a disservice if I implied that playing all five perfectly always works. It doesn't, and the reasons usually have nothing to do with you. It's worth being able to recognize them, because misdiagnosing a structural problem as a personal one is how people lose three years.

**You're at the top of your band.** Every role has a range, and once you're near the ceiling of yours, no amount of excellence produces a large raise — the constraint is the band, not your performance. The fix for a band problem is never a raise conversation. It's a scope conversation. You need a different role, which means the thing to negotiate for is the title and responsibility, with the money following as a consequence.

**The pool is genuinely tiny.** Some years there's just no money, and a manager fighting hard for you can still only produce 2%. You can usually tell the difference: in a real budget freeze, the top performers on your team got roughly what you got. If someone visibly got a large number and you didn't, it wasn't the budget.

**Your manager can't or won't advocate.** Some managers are bad at the room. They show up unprepared to calibration, they don't fight, and their whole team gets systematically lower outcomes. This is real and it is common, and the honest read is that no amount of ledger-keeping fixes a lawyer who won't argue. Your options are a different manager, a different org, or a different company.

**The market has moved past your employer.** If external offers are consistently 25–40% above your current number, you are not in a negotiation, you're in a mispricing. Internal raise processes are structurally incapable of closing gaps that large — the machinery is built for percentages, not step-changes. That's not a failure of your case. It's the wrong instrument for the size of the problem.

Here's the thing worth noticing, though. Every single move in this guide makes you more valuable *anywhere*, not just here. Third-party reputation, a public footprint, a system you demonstrably own, a track record of eliminating work — those are portable. If you run this playbook and the number doesn't move, you haven't wasted a year. You've spent a year becoming the kind of candidate who has somewhere else to go, which was argument four all along.

If the raise doesn't come, the leverage still does. That's the whole reason this playbook is worth running either way.

### The One-Line Version

None of this is about working harder. You already work hard. Working hard is the floor, remember. This is about making sure the five things that actually get argued about in that room — goodwill, trajectory, trust, flight risk, and leverage — are things you're visibly winning, so that when your name comes up, the decision is already made in your favor before you ever walk in.

Do the work. Then make sure the work does something for you.

One More Thing

If you want a second set of eyes

I put this guide together because the strategy inside it is real, but I also know that reading a framework and applying it to your own situation are two very different things. A list of five arguments is easy to nod along to. Figuring out which one you're actually losing, what leverage your specific role can realistically build, and whether your problem is a case problem or a band problem — that part is personal, and it's a lot harder to do alone.

So I'm starting to do a small number of informal career audits for people working through exactly this. The idea is simple: I take a look at your résumé and where you are right now, and I give you honest, specific thoughts — which directions might fit you best, where your experience already gives you an edge, a few skills or projects worth prioritizing, and resources that'll actually move the needle. No script, no generic advice, just a real read on your situation and where the openings are for you.

This is early and pretty informal right now. I'm mostly trying to help a handful of people and learn what's most useful in the process. If that sounds like something you'd want, just send me an email with a little about where you're at and what you're trying to figure out, and we'll take it from there. No pressure either way — the whole guide above is yours to run with regardless.

📩 Interested?

Email me at [davebrown.dev@gmail.com](mailto:davebrown.dev@gmail.com?subject=Career%20Audit) with the subject line **"Career Audit"** and a couple sentences about your background and what you're hoping to move toward.

If nothing else, I'd genuinely love to hear which part of this was most useful to you. Good luck out there — the frontier is wide open right now, and earlier than most people realize.

Want more guides on positioning yourself for the AI economy?

Follow along on Instagram for weekly breakdowns.

[@davebrownbrand](https://www.instagram.com/davebrownbrand)


---

# GUIDE: LeverageGuide

d.avebrown instagram.com/d.avebrown

# Working Harder Won't Get You a Bigger Raise. Leverage Will.

The raise pool is already set. This is how you make your name expensive to ignore when it gets divided up.

by d.avebrown

Most people think the raise process works like this. You work hard. Your manager notices. The company rewards you fairly. Everyone claps. HR releases a dove.

Unfortunately, no.

A lot of people misunderstand compensation. They think raises are handed out like merit badges — everyone performs, leadership carefully reviews the scoreboard, and the hardest workers get rewarded. That is not really how it works.

Most companies set their compensation budgets ahead of time. Your team gets a raise pool. Your manager, director, or VP then has to decide how to split that pool across the team. So the real question is not *"did I do good work?"* The real question is: *"when leadership is dividing up a fixed pile of money, why would they fight for me to get a bigger piece?"* That is where leverage comes in.

Before We Start

The raise pie is already cut before you walk in

### The pie is fixed. You're competing for a slice.

By the time you sit down for your annual review, the overall compensation budget has almost certainly been decided. You are not negotiating with an infinite wallet. You are competing for allocation against everyone else on your team.

And your manager is not just rewarding effort. They are managing risk. Who is critical? Who would be painful to lose? Who keeps the important systems running? Who makes the team faster? Who is close to revenue? Who would be expensive or annoying to replace? Those are the questions actually being asked when the money gets split.

The Real Question

Not: "Did you work hard this year?" But: "When we divide up a fixed pile of money, why should your slice get bigger and someone else's get smaller?" Your job is to make that answer obvious.

Here is the thesis for the whole thing: **the people who get outsized raises are not always the ones working the hardest. They are the ones with the strongest position when the raise pool gets divided.** Your goal is not just to be good. Good employees are everywhere. Your goal is to be hard to ignore — the person leadership quietly worries about losing.

The Blunt Truth

"Just doing a good job" is the floor, not the differentiator

### Performance gets you into the room. It does not win the room.

Performance matters. But performance is the floor. Doing your job well gets you into the conversation. It does not guarantee you win the conversation.

A person who does great work but has low visibility, weak relationships, no ownership, and no obvious connection to business outcomes is easy to underpay. A person who does great work *and* owns something important, is trusted by leadership, reduces risk, and would create a real problem if they left — that person has leverage. Same quality of work. Completely different raise.

The Definition Worth Memorizing

Leverage is the gap between how much value the company gets from you and how painful it would be to replace you. It's whatever makes leadership say: "We really do not want to lose this person."

The Five

The five types of leverage that actually move comp

### 01 — Revenue Leverage

The simplest and most powerful one

The closer your work sits to revenue, retention, expansion, cost savings, or risk reduction, the easier it is for leadership to justify paying you more. This does not mean everyone needs to be in sales. It means you need to connect your work to business outcomes.

You helped close customers. You improved onboarding. You reduced churn. You made the sales demo better. You fixed something that was quietly costing the company money. You sped up a customer-facing process. If your work lives three layers away from the money, your one job is to build a bridge back to it.

Why You Should Care

"I improved the reporting dashboard." vs. "I improved the reporting dashboard the sales team uses to spot expansion opportunities." Same work. The second one has a dollar sign attached.

**The question to ask yourself:** how does my work help the company make money, keep money, save money, or avoid losing money? If you can answer that in one sentence, you are already ahead of most of your team.

### 02 — Ownership Leverage

Become the person people come to when it breaks

You create leverage when you become the clear owner of something important. Not "I help with this." Not "I attend the meetings." Not "I'm on the team." But: *"when this thing breaks, people come to me."*

That could be a system, a customer segment, a process, an internal tool, a reporting workflow, a vendor relationship, a launch motion, or a compliance requirement. The catch is that it has to *matter*. Owning the company lunch survey is not leverage. Owning the billing integration, the renewal process, the onboarding workflow, or the deployment pipeline is leverage.

Why You Should Care

You don't want to be irreplaceable in a toxic, hostage-taking, "only I know the password" way. You want to be valuable in an obvious way. The goal is friction when you're gone. Not chaos. Just enough that leadership feels it.

**What this looks like:** own something visible, painful, and valuable — customer onboarding, the sales handoff, the forecasting process, support escalation, lead routing. Something where your absence creates a real gap.

### 03 — Scarcity Leverage

The harder you are to replace, the more you get paid

Companies pay more when replacement is hard. That is why executives get large comp packages — not because they are magical creatures born under a Deloitte moon, but because the perceived risk and business impact of the role is high. The same principle applies all the way down the org chart.

Scarcity can come from technical expertise, customer relationships, institutional knowledge, industry experience, cross-functional trust, a strong external network, credentials, the ability to operate in ambiguity, or the ability to translate between technical and business teams.

Why You Should Care

The more replaceable your contribution feels, the less leverage you have. The more specific, trusted, and business-critical it becomes, the more leverage you create. The path isn't "get better." It's "get more specific."

This is the encouraging part: you are not being told to become a generically better human. You are being told to become more *specific*. Specific is a path. "Better" is a vibe.

### 04 — Visibility Leverage

Your raise is often discussed when you're not in the room

A lot of people wait until their review to explain what they did. That is too late. By then, opinions have already formed. Leverage is built throughout the year by making sure the right people already know what you own, what you improved, what risk you reduced, and what money you helped make or save.

This is not about bragging in a gross LinkedIn way. It is about giving clear, regular updates that connect your work to business outcomes — so that when your name comes up in a room you are not in, the case for you is already built.

Why You Should Care

Your raise is not just a conversation between you and your manager. It's a conversation your manager has about you when you are not in the room. If your impact is invisible, your raise will be average.

**Being valuable is good. Being visibly valuable is better.** The work and the story about the work are two different jobs, and most people only do the first one.

### 05 — Optionality Leverage

The uncomfortable one — and the real one

You have more leverage when the company believes you have options. This does not mean threatening to quit — that usually backfires and reads as a tantrum. It means having a strong enough reputation, network, skill set, and market position that leadership simply understands you are not trapped.

You build it quietly: maintain relationships outside your company, take the occasional recruiter call, build a public body of work, keep your resume current, develop skills that are valuable beyond your current employer, and stay aware of market compensation.

The Quiet Truth

Companies are more likely to underpay people they believe have nowhere else to go. You don't have to say a word about it. You just have to not be cornered.

The Playbook

10 ways to build leverage before next review season

### 1. Get closer to revenue

Move toward the work that touches sales, retention, expansion, billing, pricing, or delivery. Even if your role is not revenue-generating, find the parts of your job that brush up against money — and describe them that way.

### 2. Own a business-critical system or process

Customer onboarding. Internal reporting. The sales handoff. The billing workflow. The deployment pipeline. The renewal process. Become the named owner of something visible, painful, and valuable.

### 3. Become the translator between teams

Most companies are full of smart people who cannot understand each other. The person who can sit between executives, customers, engineers, sales, and finance and make things move becomes the connective tissue. Remove that person and everyone else slows down. That is leverage.

### 4. Build executive visibility before review season

Do not wait for the review to explain your year. Make sure the right people already know what you own, what you improved, and what would be worse without you. Opinions form early. Get into the story before it's written.

### 5. Document your wins in business language

People are bad at remembering your contributions. Help them. Keep a simple brag document — but write it in outcomes, not tasks.

Same Work, Two Versions

Bad: "Updated onboarding workflow." Better: "Rebuilt the sales-to-CS handoff so new customers get to value faster and stopped flooding support with the same repeated questions." The task matters less than the business effect.

### 6. Make your manager's job easier

Your manager is overwhelmed, under-informed, and being asked to defend decisions to people above them. If you want them to fight for your raise, make it easy to explain why. Send clean summaries. Hand them the metrics. Build their argument for them. **Your manager cannot fight for a raise they cannot explain.**

### 7. Become associated with speed

Not reckless speed. Useful speed. The person who unblocks decisions, simplifies processes, and gets teams unstuck creates leverage — because most companies are drowning in delay. When your reputation becomes "when this person is involved, things actually move," that is worth money.

### 8. Reduce visible risk

Revenue gets the attention, but preventing expensive mistakes is leverage too — compliance, security, customer escalations, financial reporting, key-person dependency. The trick is to make invisible risk visible. Nobody celebrates the fire that did not happen unless you explain what you prevented.

### 9. Build external options

Keep relationships alive outside your company. Take the occasional recruiter call. Build a public body of work. Keep your skills marketable. You are not threatening anyone — you are simply making sure leadership never assumes you are cornered.

### 10. Solve problems above your level

Don't just do your assigned tasks. Find the problems your manager, director, or VP is actually worried about — why implementations drag, why customers churn, why this project is always late, why leadership doesn't trust the data — and help solve those.

Why This One Works

When you solve problems above your level, you start looking like someone who should be paid above your level. That's not a coincidence. That's the whole move.

One Important Caveat

Leverage is not manipulation

### This is economics, not politics.

This is not about being political in the gross way. It is not about pretending to be busier than you are. It is not about holding the company hostage because only you know how the spreadsheet works. That stuff gets you a reputation, not a raise.

It is about understanding that compensation is an economic decision, not an emotional reward for effort. Companies pay more when they believe losing you would hurt. So your real job is to make your impact *visible*, *valuable*, and *hard to casually replace*.

Worth Repeating

Lines to tattoo on the inside of your eyelids

"Hard work gets you considered. Leverage gets you fought for." "The raise pool is not a trophy case. It's a knife fight in business casual." "You don't control the size of the pie. You control how obvious it is that you deserve a bigger slice." "The company does not pay you more because your calendar looked painful." "The goal is not to be irreplaceable. The goal is to be expensive to replace." "You want your name to come up when leadership asks: who can we absolutely not afford to lose?"

### The Takeaway

Raises are not just rewards for effort. They are allocation decisions inside a fixed budget. If you want a bigger one, good performance is not enough — you need leverage. That means owning important work, connecting your impact to money, becoming harder to replace, making your value visible, and giving leadership a reason to worry about losing you.

You do not get a bigger raise because you quietly suffered harder than everyone else. You get a bigger raise because, when leadership divides up the pie, your name feels expensive to ignore.

Want more guides that say the quiet part out loud?

Follow along on Instagram for weekly breakdowns.

[@d.avebrown](https://www.instagram.com/d.avebrown)


---

# GUIDE: MarkdownFileGuide

d.avebrown instagram.com/d.avebrown

# The Markdown File Guide

How to write structured documents that humans and computers can both read.

by d.avebrown

Markdown is a plain-text document format that is easy for humans to write and easy for computers, websites, documentation tools, and AI assistants to understand.

The point is not to "learn a technical file format." The point is: Markdown lets you create clean, portable, structured documents that any tool can read without getting confused by formatting junk.

Here is everything you need to know — from basic syntax to advanced techniques for working with AI tools, version control, and documentation pipelines.

Foundations

Three core concepts to understand first

### 01 — What Is Markdown?

Markdown files usually end in `.md`. They are plain text files with simple formatting symbols. Instead of using a visual editor like Google Docs or Word, Markdown uses lightweight syntax to show structure.

The `#` means title. The `##` means section heading. Blank lines separate ideas. The document has hierarchy. That sounds basic, but it matters a lot when you are asking an AI to understand a document, summarize research, or follow instructions — because the structure is explicit and readable by both people and machines.

Example

\# Document Title \## Background This is the context for what this document is about. \## Goal What this document is trying to accomplish. \## Notes Anything important the reader should keep in mind.

### 02 — What Is a CLAUDE.md File?

A `CLAUDE.md` file is an instruction or context file for Claude. Think of it like a read-me-first note for a folder. When Claude opens a project directory, it reads this file first to understand what the project is, what files matter, and what it should know before helping.

A good `CLAUDE.md` includes: a project summary, a description of the audience or purpose, a list of important files and what they contain, the tone or style to use, any constraints or approved content, and specific instructions for how Claude should behave in that folder. It gives Claude a map of the room before it starts rearranging furniture.

Example

\# Project Context This folder contains materials for \[project name\]. \## Important Files - \`research.md\`: background research and source notes - \`draft.md\`: current working draft \## Instructions Refer to research notes before drafting. Keep tone consistent with existing drafts.

### 03 — How to Start a Markdown Document

The opening of a Markdown file sets the context for everything that follows. AI tools often use the title, headings, and first few paragraphs to understand what kind of document they are looking at — so a strong opening matters.

A vague title like *"Notes — Stuff from last week"* tells nobody anything. A specific title like *"Q3 Planning Session Notes — October 14: Decisions, Action Items, and Open Questions"* tells both the reader and any AI tool exactly what the document is before reading a single line. Invest a few extra words in the title and opening paragraph — it pays off every time the document is opened.

Pattern

\# \[Specific Title\] One sentence describing what this document is and why it exists. \## Background \## Goal \## Notes

Syntax & Structure

Everything you need to write effective Markdown

### 04 — Markdown Is Portable

Markdown is not locked inside one app. A `.md` file can be opened in a code editor, Notion, GitHub, Obsidian, many CMS systems, documentation tools, and AI assistants. That makes it useful for any content that may need to move between tools over time. You write the file once and it works almost everywhere, without conversion headaches or format lock-in.

### 05 — Markdown Keeps Formatting Clean

Markdown does not carry hidden formatting like Word or Google Docs sometimes do. That means fewer weird font issues, spacing problems, broken bullets, mystery styles, and copy-paste disasters. When you send Markdown content into an AI tool or share it across platforms, it arrives as clean text — no invisible baggage attached.

### 06 — Headings Create Structure

Headings are one of the most important parts of Markdown. They create visible hierarchy that both people and AI tools can navigate.

Syntax

\# Document Title \## Main Section \### Subsection

Use headings to separate distinct parts of a document: Background, Goals, Key Points, Open Questions, Next Steps. This structure helps people skim quickly and helps AI understand what each section is supposed to do.

### 07 — Bullets Are Great for Lists and Ideas

Markdown makes unordered lists simple. Prefix each line with a hyphen, asterisk, or plus sign. This is useful for brainstorms, reference lists, feature sets, research findings, and outlines. AI tools tend to handle structured bullets much better than giant unbroken paragraphs — bullets communicate clearly that each item is distinct.

Syntax

\- Item one - Item two - Item three

### 08 — Numbered Lists Are Useful for Processes

Use numbered lists when order matters — workflows, step-by-step instructions, checklists, and standard operating procedures. The number signals to both the reader and the AI that sequence is significant. Numbered lists are also easier for AI to reference specifically: "In step 3, you said..." is clearer than "In that paragraph you mentioned..."

Syntax

1\. First step 2. Second step 3. Third step

### 09 — Markdown Supports Links Cleanly

Links in Markdown use a readable format that keeps documents scannable. This is helpful when collecting references in a research document, a resource list, or a project brief. It keeps documents readable instead of cluttering them with raw URLs.

Syntax

\[Link text\](https://example.com) \## Reference Links - \[Research paper\](https://example.com) - \[Source document\](https://example.com)

### 10 — Emphasis: Bold and Italic

Markdown supports bold and italic text. Use emphasis sparingly — Markdown works best when structure does most of the work. A good rule: if everything is emphasized, nothing is. Reserve bold for genuinely critical points and italic for titles, technical terms, or light clarification.

Syntax

\*\*bold text\*\* \*italic text\*

### 11 — Markdown Is Great for Reusable Instructions

Markdown is excellent for storing instructions and templates because it keeps them organized, readable, and easy to copy. A prompt or workflow stored as a Markdown file is far more useful than one buried in a chat thread or email — you can find it, update it, and reuse it consistently.

Example

\# Document Review Instructions \## Role You are a careful editor reviewing a draft for accuracy and clarity. \## Task Review the attached draft and identify any factual errors or unclear sections. \## Rules - Focus on accuracy first, style second - Flag any claims that need a source - Do not rewrite — only annotate

### 12 — Markdown Works Well with Version Control

Because Markdown is plain text, tools like Git can show exactly what changed between versions — which lines were added, removed, or modified, and by whom. This is much more precise than tracking changes in Word or comparing Google Doc history. It is particularly valuable for living documents like technical specifications, policy documents, research notes, or any file that gets updated regularly by multiple people.

### 13 — Markdown Reduces Ambiguity for AI

AI tools perform better when their input is clear and structured. Markdown helps because it creates obvious sections, hierarchy, and labels. A wall of unformatted text leaves the AI guessing what each part is. A structured Markdown document tells it exactly what the audience is, what the goal is, and what constraints apply — before it generates a single word.

Structured beats unstructured

\# Request \## Audience Internal team members \## Goal Explain the new onboarding process \## Tone Professional and clear \## Key Points - The new process starts on \[date\] - All team members need to complete training by \[date\]

Going Further

Ten additional techniques worth knowing

### 14 — Code Blocks for Technical Content

Markdown supports code blocks for displaying technical content exactly as written, without reformatting. Inline code uses single backticks. Fenced code blocks use triple backticks and can optionally specify the language for syntax highlighting. This is essential for documentation, command references, configuration snippets, and any content where exact formatting is part of the meaning.

Syntax

Inline: \`code here\` Fenced block: \`\`\`javascript function example() { return true; } \`\`\`

### 15 — Blockquotes for Callouts and Citations

Blockquotes use the `>` character and work well for quoting source material, highlighting key insights, or distinguishing referenced text from your own writing. They are especially useful in research notes and reference documents where the source of an idea matters.

Syntax

\> "The purpose of writing is to communicate, not to impress." \> — Source or attribution

### 16 — Tables for Structured Data

Markdown supports simple tables using pipes and dashes. Tables are useful for comparing options, tracking status across multiple items, or any information that has a clear row-and-column structure. Keep them simple — wide or deeply nested tables become hard to read in raw Markdown, even if they render cleanly.

Syntax

\| Column 1 \| Column 2 \| Column 3 \| \|----------\|----------\|----------\| \| Data \| Data \| Data \| \| Data \| Data \| Data \|

### 17 — Nested Lists for Hierarchy

Lists can be nested by indenting with spaces or tabs to show parent-child relationships. This is useful for outlines, documentation with categories and subcategories, or project structures. Use nesting sparingly — more than two or three levels deep becomes hard to read and is usually a sign the content should be reorganized rather than indented further.

Syntax

\- Main item - Sub-item - Sub-item - Sub-sub-item - Main item

### 18 — YAML Front Matter for Metadata

Many Markdown tools support YAML front matter: a block of metadata at the very top of the file, wrapped in triple dashes. Front matter is useful for tracking document status, tagging files for search or filtering, and storing metadata that tools can read programmatically. Not every Markdown app supports it, but it is widely used in documentation systems, static site generators, and note-taking apps like Obsidian.

Syntax

--- title: Document Title author: Your Name date: 2025-01-01 tags: \[reference, documentation\] status: draft --- \# Document Title

### 19 — Converting Markdown to Other Formats

Because Markdown is plain text, it converts cleanly to other formats using tools like Pandoc. You can export to HTML for web publishing, PDF for sharing or printing, DOCX for Word-compatible documents, or even slides for presentations. This makes Markdown a useful source format: write once, export to whatever format the situation requires. Many documentation platforms like MkDocs and Jekyll also convert Markdown automatically as part of their build process.

Pandoc command

pandoc input.md -o output.pdf pandoc input.md -o output.docx pandoc input.md -o output.html

### 20 — Markdown Editors and Tools

You do not need a special app to write Markdown — any text editor works. But the right tool makes it easier. Popular options include VS Code (free, with Markdown preview and extensions), Obsidian (note-taking built around Markdown files), Typora (minimal editor with live preview), iA Writer (clean writing environment), and Notion (visual tool that imports and exports Markdown). GitHub also renders Markdown automatically in repositories, making it a good place to store and share documentation.

### 21 — Task Lists and Checkboxes

GitHub-flavored Markdown and many Markdown apps support interactive task lists using brackets. These render as clickable checkboxes in tools that support them, including GitHub, Obsidian, and Notion. Task lists are especially useful for project checklists, review processes, step-by-step procedures, and action items from meetings.

Syntax

\- \[x\] Completed task - \[ \] Incomplete task - \[ \] Another item to do

### 22 — File Naming Conventions

Good file naming makes a collection of Markdown files much easier to navigate and maintain. A folder of 20 well-named files is easy to understand at a glance. A folder of 20 files named `notes.md`, `doc1.md`, and `final_FINAL2.md` is not. Consistency matters more than any specific convention — pick one approach and use it everywhere.

Conventions

Use lowercase: meeting-notes.md Use hyphens: project-brief.md Include dates when relevant: 2025-01-15-kickoff.md Be descriptive: onboarding-checklist.md

### 23 — HTML Comments for Hidden Notes

Standard Markdown does not have a native comment syntax, but HTML comments work inside Markdown files. Comments are invisible in rendered output but visible in the raw file. This is useful for leaving notes to collaborators, temporarily hiding sections without deleting them, tracking document status inline, or leaving instructions for AI tools that you do not want to appear in the final output.

Syntax

\<!-- This note is hidden in the rendered output --\> \<!-- TODO: verify this section before publishing --\> \<!-- AI: do not include this section in your summary --\>

### 24 — Converting PDFs to Markdown

You can convert existing PDFs into Markdown using two tools: `poppler` (which extracts text from PDFs while preserving layout) and `pandoc` (which converts that text into clean Markdown). Works best on text-based PDFs — scanned image PDFs require OCR software first. The output may need light cleanup, but it gets you a workable, editable file far faster than retyping.

Step 1 — Install the tools (Mac)

brew install poppler brew install pandoc

Step 2 — Convert

pdftotext -layout input.pdf - \| pandoc -t markdown -o output.md

`pdftotext -layout` preserves the original column and spacing structure of the PDF. Piping it into `pandoc` then converts that plain text into structured Markdown. Once converted, the file is fully editable, searchable, and ready to feed into AI tools — far more useful than a locked PDF.

Want more practical AI guides?

Follow along on Instagram for weekly breakdowns.

[@d.avebrown](https://www.instagram.com/d.avebrown)


---

# GUIDE: PluginGuide

d.avebrown instagram.com/d.avebrown

# The Claude Plugins Guide

Five plugins and skills that turn Claude from a chat window into something that actually does the work.

by d.avebrown

Using Claude without plugins is like hiring a genius and making them work through a mail slot. Technically they can help. But you're making it unnecessarily sad.

Claude by itself can write, think, summarize, plan, and analyze. But without plugins and skills, it only knows what you paste in. It only works with what you drag over. It cannot see your actual work unless you feed it piece by piece like you're feeding a very expensive office raccoon.

That is the real gap. Most people are not using Claude wrong. They are using Claude *disconnected*. Here are five plugins and skills worth knowing about — and what they actually feel like in plain English.

Before We Start

Skills vs. plugins — what's the difference?

### Skills: Individual Superpowers

Skills are specialized instructions or workflows that make Claude better at a specific job. Think of them like handing Claude a recipe. One skill might teach it how to write better conversion copy. Another how to plan a new software feature. Another how to audit a marketing funnel.

They shape *how Claude thinks* about a task. They do not require external connections. They just make Claude sharper in a particular domain.

### Plugins: The Avengers Team

Plugins are bigger. They give Claude access to tools, systems, data, or outside services. A plugin might connect Claude to your calendar, your codebase, the live web, a media generator, or your company's documents. Not just instructions — connections.

Skills teach Claude how to do something better. Plugins give Claude the tools and access to actually go do the work. Skills are superpowers. Plugins are the team.

Official Plugin Marketplace

claude.com/plugins This is the official place to browse and install Claude plugins. Filter by **cowork** to surface plugins built specifically around professional and knowledge work — the ones most relevant to the kind of tasks covered in this guide.

The Five

Plugins and skills worth adding today

### 01 — Productivity Plugins

Best for: busy professionals, managers, founders, operators

This is the easiest one to understand. Claude alone is like a brilliant assistant sitting in an empty room. It can think, write, plan, and summarize — but it has no access to the messy reality of your actual work.

A productivity plugin changes that. It connects Claude to the things already running your day: calendar events, emails, Slack threads, tasks, meeting notes, documents. Instead of you manually pasting everything in, Claude can help make sense of the actual chaos directly.

Why You Should Care

Claude alone is a genius with no inbox. A productivity plugin gives it the keys to the office. Instead of "a thing I ask questions," Claude becomes your work operating system.

**What it can help with:** planning your day, summarizing what actually matters, tracking tasks and deadlines, pulling together weekly updates, turning scattered messages into something that resembles a plan.

### 02 — Brand Voice Plugin

Best for: marketers, founders, content creators, sales teams

This is one of the most practical plugins for anyone creating content at scale. The Brand Voice plugin teaches Claude your tone, style, messaging, approved phrases, and writing preferences — so the output sounds like your actual brand instead of generic AI sludge.

Tired of AI writing that sounds like a LinkedIn productivity goblin got trapped inside a Canva template? This is the fix. Instead of every email starting with "We're thrilled to announce an exciting new solution," Claude can write the way you actually talk. Or at least much closer. Which, for most marketing teams, is already a small miracle.

Why You Should Care

A normal prompt is like telling someone: "Just sound like us." Which is adorable. A brand voice plugin is like handing them the actual style guide, past campaigns, customer language, and the company's personality. Which is useful.

**What it can help with:** social posts, email drafts, landing page copy, consistent team tone, and eliminating the "ChatGPT wrote this in a panic" feeling.

Install

claude plugin install brand-voice@knowledge-work-plugins

Source: github.com/anthropics/knowledge-work-plugins

### 03 — Engineering Plugins

Best for: software teams, engineers, technical founders

Engineering plugins are where Claude moves from "code helper with confidence" to something that actually resembles a junior engineer with a real process. Not just autocomplete. A workflow.

A regular coding prompt is like asking someone to fix a car with a flashlight. An engineering plugin gives them the garage, the tools, the repair manual, and the inspection checklist. The most popular example is **feature-dev** — a structured seven-phase workflow that walks through discovery, codebase exploration, design, implementation, testing, review, and documentation. 89,000+ verified installs and counting.

Why You Should Care

Instead of just "make code appear," Claude works through the actual development flow like a real teammate. Not a teammate who messages you "quick question" and vanishes for three hours. A good one.

**What it can help with:** exploring a codebase, planning new features, writing implementation steps, generating tests, reviewing changes, and updating documentation — all as part of one structured flow rather than a series of disconnected prompts.

Install

npx skills install feature-dev

Source: github.com/wondelai/skills — skills.wondel.ai

### 04 — Web Data Plugins

Best for: AI builders, researchers, growth teams, analysts

Claude's training data has a cutoff. Search snippets are shallow. And here's the thing: most business questions are not "think harder" questions. They're "go check" questions. What are competitors charging? What changed on this website? What do customers keep complaining about in reviews?

Web data plugins give Claude eyes on the actual internet. Not vibes. Not guesses. Fresh information. Two worth knowing about:

Why You Should Care

Claude without web tools is reading yesterday's newspaper. Web data plugins let it walk outside, check the shelves, read the reviews, and bring back a spreadsheet.

**Nimble** — Best for AI engineers building workflows that depend on fresh external data. Handles live web search, page extraction, crawling, JavaScript rendering, and structured outputs. Useful for pricing research, product listings, competitor monitoring, inventory checks, and market signals.

**Firecrawl** — Best for crawling full websites and turning them into clean, usable content. Handles recursive site crawling, URL discovery, and exporting pages as structured markdown. Useful for documentation ingestion, knowledge base building, site mapping, and search index creation.

### 05 — Marketing Skills

Best for: marketers, creators, startup founders, growth teams

Good marketing is not just writing cuter sentences. It's understanding the customer, finding the friction, making the offer clear, and knowing what to test next. Most AI prompts get the first part. Marketing skills get all four.

Instead of Claude being your caption vending machine, a marketing skill turns it into something closer to a slightly unhinged growth strategist who never sleeps and has strong opinions about your landing page hero section. Which is sometimes annoying. But mostly useful.

Why You Should Care

A prompt says: "Can you write me a marketing email?" A marketing skill says: "Here is the playbook from a full growth team. Use it." That's a completely different starting point.

**What it can help with:** landing pages, SEO briefs, conversion copy, customer messaging, funnel audits, analytics review, positioning, growth experiments, and turning rough ideas into actual campaigns.

Source: github.com/coreyhaines31/marketingskills — 3,500+ stars — marketing-skills.com

Bonus

When Claude stops being just the writer and starts pulling in the art department

### Creative Media Plugins

Best for: creators, social teams, marketers, video editors

Once Claude can help generate images, video, motion effects, and consistent characters — it stops being just a writing tool and starts becoming a tiny content studio. Claude writes the idea. A creative media plugin starts turning that idea into actual assets.

Why You Should Care

Claude alone is the scriptwriter. A creative media plugin brings in the art department, camera crew, editor, and post-production team. Scriptwriter. Designer. Editor. Post-production goblin. All in one workflow.

**Higgsfield MCP** is the standout example: 30+ AI models for image generation, video creation, motion effects, lip sync, and consistent character tools. Content creators report building social media assets 10x faster than traditional production workflows. 15,000+ installs. Official partner integration.

### The Takeaway

If Claude still feels useful but not quite game-changing, the issue probably is not your prompts. It might be that you gave the genius a chair but forgot to give them keys to the building.

Skills make Claude better at a specific job. Plugins give Claude access to the tools, data, and systems where the job actually happens. Both are worth having. Neither takes long to set up.

Want more practical AI guides?

Follow along on Instagram for weekly breakdowns.

[@d.avebrown](https://www.instagram.com/d.avebrown)


---

# GUIDE: TheGreatThaw

d.avebrown instagram.com/d.avebrown

# The Great Thaw: Why Hiring Comes Back in Late 2026 (And How Not to Get Left Out)

The AI-replaces-everyone bet is coming due, the doors are opening again — and the old playbook is exactly what everyone else is doing on autopilot. Here's how to stand in front of the opening.

by d.avebrown

Here's a number that should change how you're spending your time this year: **66% of company leaders plan to increase permanent headcount in the second half of 2026.** That's from Robert Half's latest research, the people who literally staff these companies. They've even got a name for the moment: the great thaw.

For two years the story was "job hugging." You stayed put, kept your head down, and prayed the reorg skipped your row. That era is ending. The doors are opening again.

But before you sprint back into the market with a freshly AI-buffed resume, understand *why* the ice is cracking. Because the reason tells you exactly what to do about it.

66%

of company leaders plan to increase permanent headcount in the second half of 2026

46%

of professionals plan to job hunt in H2 2026 — up from 27% a year ago

350

veteran "gray beard" engineers Ford rehired to catch what the machines missed

Why The Ice Is Cracking

The AI replacement bet is coming due, and the bill is humans

Two years ago the pitch in every boardroom was the same: automate the expensive people away, watch the margins fatten. A lot of companies took the bet. It's not aging well.

Ford is the poster child. They leaned hard into automated quality systems and AI tools, let a bunch of institutional knowledge walk out the door, and the quality slipped. So they went and rehired **350 veteran engineers** — some former employees, some poached back from suppliers — to catch the defects the machines missed. The internal nickname for these folks is "gray beards." The result: Ford topped the JD Power Initial Quality Study for the first time in *sixteen years*.

The part you should screenshot: Ford's CEO had gone on record saying AI would replace "literally half of all white-collar workers." A few months later his own executives stood in front of reporters and credited 350 humans for the turnaround. Both things came out of the same company.

And it's not a one-off. Klarna swapped 700 customer service agents for an OpenAI assistant, watched quality tank, and started hiring humans back. IBM announced it would *triple* entry-level hiring in exactly the roles everyone said AI would erase. Different industries, same plot twist: the automation didn't do what the slide deck promised, and the fix was people.

The takeaway isn't "AI is fake." AI is real and it's staying. The takeaway is that a lot of companies are quietly rehiring to clean up a mess, and that rehiring is part of what's thawing the market. You are, in some cases, the correction.

The Quieter Reason

What it costs to hand over the crown jewels

Here's the second, quieter reason the mood is shifting.

For a while, plugging a frontier AI lab straight into your workflows felt like a pure win. Free capability, better product, look how modern we are. Then the bill for that intimacy started coming in.

Look at Figma. Early in 2026 they partnered with Anthropic — deep integration, the AI lab's chief product officer literally on Figma's board. Weeks later that same executive quietly stepped off the board, and days after *that*, Anthropic shipped a product that competes directly with Figma's core business. Figma's stock took a hit. By summer, an activist shareholder was publicly demanding Figma reassess the whole relationship over conflict-of-interest concerns.

Nobody's calling that theft. It's worse, in a way, because it was legal and it was invited. Figma handed a potential competitor a board seat and a front-row view of their strategy, and the competitor used the vantage point to build the thing that now threatens them. There is no free lunch. When you give an AI lab the keys to your workflows, your data, and your roadmap, you're betting they never decide your market is a nicer place to live than their own.

Companies are waking up to that bet. And a company that decides to keep more of its work in-house — its judgment, its context, its proprietary process — is a company that needs more of its own people to do that work. That's headcount. That's you.

What To Do About It

The thaw is crowded — win on the moves that don't scale

Good news first: the market is opening. Reality check: it's opening for *everybody*. Robert Half found that 46% of professionals plan to job hunt in the second half of 2026, up from 27% a year ago. Everyone is buffing their resume with the same three AI tools. Which brings us to the uncomfortable part.

Your resume is now the weakest signal you have. A "perfect" resume no longer means what it did in 2021, because perfect is now the floor.

**Your resume is now the weakest signal you have.** Anyone can prompt a model into a resume that hits every keyword in the job description. Hiring managers know this. A "perfect" resume no longer means what it did in 2021, because perfect is now the floor. If your entire strategy is a great PDF, your strategy is a coin flip.

So you compete on the things a language model can't fake for you:

### The personalized touch.

Reach the actual hiring manager, not the applicant tracking system. A specific, human, "I saw what your team shipped and here's how I'd help" beats a thousand auto-applications. This is unfashionable and slow and it works precisely because almost nobody does it anymore.

### Your network, worked hard.

Referrals were always the cheat code. In a market where every inbound resume is suspect, a warm intro is worth ten cold applications. Go make the coffee dates.

### Real, verifiable skills.

Certificates, projects, a portfolio someone can click. Proof, not adjectives. In a world drowning in generated claims, evidence is the scarce commodity.

### A LinkedIn that shows a pulse.

Not a shrine to your job titles — a feed that demonstrates you're an active, skilled operator who's paying attention. That's a signal a resume physically cannot send.

And then the one that's about to separate the hired from the overlooked:

### Prove you know where, when, and how to actually use AI.

Employers have watched the Ford story. They're not looking for someone who fears AI *or* someone who thinks it's magic. They want the person who can look at a manual, button-pressing process and say "I can automate 80% of this, and here's the 20% that still needs a human, and here's how I'd know if it broke." Being able to *judge* where AI fits — and to build the workflow that captures the value without the Ford-sized blowup — is fast becoming a baseline expectation, not a bonus. The person who still does everything by hand is going to look expensive. The person who can't tell where automation is a trap is going to look dangerous. Be the third person: the one who knows the difference.

The Bottom Line

The opening is real, but the old playbook is a trap

The market is thawing because the AI-replaces-everyone bet didn't fully pay off, and companies are re-learning that people, judgment, and context aren't line items you can delete for free. That's the opening.

But the thaw is crowded, and the old playbook — polish the resume, hit apply, wait — is the exact thing everyone else is doing on autopilot. Win on the human moves that don't scale, and prove you can wield the very tools everyone was afraid of. Do that, and the back half of 2026 isn't something that happens to you. It's something you're standing in front of when the doors open.

## 10 Weekend Builds That Prove You Know Where AI Fits

A companion section for "The Great Thaw." Everything below is meant to be run in **Claude Code** — not a chat window.

First

This is a Claude Code thing, and the distinction is the whole point

Read the last section again. Employers aren't looking for someone who can *talk* about AI. They watched Ford hire 350 gray beards back to clean up after the robots. They know what a person who "uses ChatGPT a lot" is worth now, which is roughly what a person who "is good at Excel" was worth in 2015. Table stakes.

What they're paying for is the person who can look at a manual process and say: *I can automate 80% of this, here's the 20% that still needs a human, and here's how I'd know if it broke.* That's not a chat skill. You cannot demonstrate that by pasting a prompt into a text box and screenshotting the answer.

**Claude Code is the terminal version of Claude.** It lives in a folder on your machine. It creates files, writes the code, installs the dependencies, runs the thing, reads its own error messages, and fixes them. You end up with a repo. A real one, that runs, that someone can clone.

That's the difference between "I asked an AI a question" and "I built a system." One of those is a hiring signal.

How to start, for each build below

1\. Install Claude Code (npm install -g @anthropic-ai/claude-code — you'll need Node). 2. Make an empty folder for the project. mkdir process-autopsy && cd process-autopsy 3. Run claude in that folder. 4. Paste the prompt. 5. Steer. It will not be perfect on the first pass. That's not a bug in the tool, that's the job.

Each prompt is a *starting instruction*, not a magic spell. Expect to correct it, push back on it, and extend it. The friction is where the learning is.

One more thing: **do these in public.** A private repo is a diary. A public repo with a README that says "here's the workflow this replaces and here's why it's safe" is the thing you link in the third paragraph of the email you send the hiring manager directly. Evidence, not adjectives.

The Builds

Ten of them — pick two or three, do them well

Ten of them. They're deliberately not all "build a cool AI toy" — several are aimed squarely at *judgment*, which is the thing the market is actually short on right now. Pick two or three that match where you're aiming. Don't do all ten. Do two well and write about them.

### 1. The Process Autopsy — the 80/20 auditor

The single most on-thesis build in this list. Feed it a written process — an SOP, an onboarding doc, a runbook, the six-step thing your team does every Tuesday — and it splits every step into three buckets: safe to automate, must stay human, and *dangerous to automate*. With reasons. That third bucket is the Ford bucket, and almost nobody builds for it.

What it proves: you're the third person. Not the one who fears AI, not the one who thinks it's magic. The one who can tell where the trap is.

Drop this into Claude Code

``` code-box

Build me a runnable Python project called process-autopsy.

First, generate a /data folder with 4 realistic written processes as text
files — an SOP, a customer onboarding runbook, a monthly close checklist,
and a support escalation policy. Make them messy and realistic: implicit
steps, undocumented judgment calls, a few places where someone clearly
uses experience rather than a rule.

Then build a CLI that reads a process file and, for each discrete step,
classifies it into exactly one of:
  AUTOMATE — deterministic, high volume, low consequence if wrong
  HUMAN — requires judgment, relationship, or accountability
  TRAP — looks automatable but has a hidden failure mode with real cost

For every TRAP, it must name the specific failure mode and what it would
cost. For every AUTOMATE, it must state what would need to be true for
that to be safe (data available, error tolerance, reversibility).

Output a per-process report to /output with a summary line: "X% of this
process is safely automatable" plus the trap list.

Hard requirement: it must never classify something as AUTOMATE without
stating the precondition. Hedging is not allowed — every step gets a call.

README should explain the three-bucket framework and why the TRAP category
exists. Use a .env for my API key, then run it on all four samples and show
me the traps it found.
```

### 2. The Gray Beard Extractor — institutional knowledge capture

Ford's problem in one sentence: the knowledge walked out the door and the machines couldn't see what the machines couldn't see. Build the thing that catches it on the way out. Take interview transcripts or shift notes from an experienced person and turn them into a searchable knowledge base of *tacit* knowledge — the "you can tell by the sound" stuff that never makes it into documentation.

What it proves: you understand that the expensive part of a company isn't its process docs, it's the twenty years of pattern-matching in someone's head. Every company that over-fired in 2024 is now living this.

Drop this into Claude Code

``` code-box

Build me a runnable project called graybeard-capture.

Generate /data with 5 synthetic exit-interview / knowledge-transfer
transcripts from experienced employees in different roles (a senior
manufacturing tech, a claims adjuster, a sysadmin, a field service lead,
a finance controller). Make them conversational and full of tacit
knowledge — heuristics, war stories, "we tried that in 2019 and here's
why it failed", things they know but never wrote down.

Build a tool that processes each transcript and extracts:
  - RULES: things that could be written as explicit procedure
  - HEURISTICS: judgment patterns ("if X and it's end of quarter, then Y")
  - LANDMINES: known failure modes and past incidents
  - RELATIONSHIPS: who they call when something goes wrong, and why
  - GAPS: things they reference but don't explain — flag these as
    follow-up questions for a second interview

Store everything in a structured JSON knowledge base plus a retrieval
CLI where I can ask a question and get an answer cited to the specific
transcript and speaker.

Hard requirement: if the knowledge base doesn't cover the question, it
returns "not captured — this is a gap, go ask a human" and logs the gap
to a running list. It must never fill in from general knowledge.

README frames this as the workflow that stops institutional knowledge from
walking out the door. Use a .env for my API key, run it, ask it three
questions including one it should refuse, and show me the gap list.
```

### 3. The Break Detector — an eval and regression harness

"Here's how I'd know if it broke." This is that. Most people build the AI feature and stop. This builds the thing that watches the AI feature: a golden test set, an automated scorer, and a report that tells you when today's output drifted from last week's.

What it proves: you've thought past the demo. This is the single biggest gap between people who prototype AI and people who ship it, and it is *deeply* unsexy, which is exactly why it's a differentiator.

Drop this into Claude Code

``` code-box

Build me a runnable project called break-detector.

Build a small evaluation harness for LLM outputs. Structure:

1. /goldens — a set of 20 test cases in JSON: an input, an expected
   behavior description, and a category. Generate these for a realistic
   task — say, extracting structured data from customer emails. Include
   edge cases: empty input, adversarial input, ambiguous input, an input
   in another language, and one where the correct answer is "I don't know."

2. A runner that executes the task against every golden and captures output.

3. A scorer that grades each output. Use a mix: exact-match/rule-based
   checks where possible, and an LLM-as-judge ONLY where the check is
   genuinely subjective — and make the judge output a reason, not just
   a score. Explain in code comments why each check uses the method it does.

4. A results store so runs are comparable over time, and a diff report:
   "vs. last run, 3 cases regressed" with the specific cases and outputs
   side by side.

5. A pass/fail gate — a threshold below which the report says DO NOT SHIP.

Output an HTML or markdown report to /output.

README explains why rule-based checks beat LLM judges wherever possible,
and what a regression actually means here. Use a .env for my API key.
Then: run it, deliberately break something (change the prompt), run again,
and show me the harness catching the regression.
```

### 4. The Klarna Guardrail — a support triage bar

Klarna swapped 700 humans for a bot, watched quality tank, and hired humans back. The lesson isn't "don't automate support." It's "they automated the wrong tickets." Build the thing that draws that line: reads a ticket queue, decides which tickets are safe for a bot and which get a human, and then *simulates what happens if you get the line wrong.*

What it proves: you can quantify the tradeoff instead of vibing it. This is what a manager wants to hear in an interview.

Drop this into Claude Code

``` code-box

Build me a runnable project called triage-bar.

Generate /data with 40 synthetic customer support tickets across a wide
range: simple password resets, billing disputes, an angry churn threat, a
regulatory complaint, a confused elderly customer, a bug report, a fraud
report, an ambiguous one-liner, and a few that look simple but aren't.

Build a classifier that routes each ticket to BOT, HUMAN, or BOT-WITH-
HUMAN-REVIEW, scoring each on four axes: complexity, emotional stakes,
consequence-if-wrong, and reversibility. Every routing decision must
include the axis that drove it.

Then the part that matters: build a simulator. Given a configurable
"automation aggressiveness" setting, it shows what fraction of the queue
gets automated AND estimates the blast radius — which specific tickets
would have been mishandled at that setting, and what the cost looks like
(churn risk, compliance exposure, escalation). Run it at three settings:
conservative, moderate, and "the Klarna setting" (automate almost
everything) and show me the difference.

Output a routing report plus the three simulation scenarios to /output.

README frames this as: the question isn't whether to automate support,
it's where the line goes and what it costs to put it in the wrong place.
Use a .env for my API key, then run it and show me all three scenarios.
```

### 5. The Bill Watcher — a model router with real economics

LLM calls cost money per use. Most demos ignore this and most demos never ship because of it. Build a router that sends each task to the cheapest model that can actually handle it, caches repeats, batches where it can, and logs cost per task so you can put a real number on it.

What it proves: you think about unit economics. "The person who still does everything by hand is going to look expensive" — but so does the person who burns \$4,000/month calling the biggest model to reformat dates.

Drop this into Claude Code

``` code-box

Build me a runnable project called bill-watcher.

Build a task router that takes a batch of jobs and routes each one to an
appropriately sized model. Generate /data with 50 synthetic tasks of
wildly varying difficulty — trivial reformatting, simple classification,
summarization, and a few that genuinely need heavy reasoning.

The router should:
  - Score each task's difficulty and route to a small/cheap or large/
    capable model accordingly, with the routing reason logged
  - Cache identical or near-identical requests so repeats cost nothing
  - Batch where the API supports it
  - Track tokens in/out and compute actual cost per task and per run
  - Include an escalation path: if the cheap model's output fails a
    confidence or validation check, retry on the bigger model and log
    the escalation

Then output a cost report to /output comparing three strategies:
everything-on-the-big-model, everything-on-the-small-model, and the
router. Show the cost delta AND the quality delta — the point is the
tradeoff, not just the savings.

README explains the routing logic and where naive routing would burn
money or quality. Use a .env for my API key, then run all three
strategies and show me the comparison table.
```

### 6. The Front Door Skipper — hiring manager dossier + outreach drafter

The piece says reach the actual hiring manager, not the ATS. This is that, automated to the exact point where it should stop being automated. It researches the team, finds what they've shipped recently, and drafts a specific, human note — then refuses to send anything, because the whole value is that a person wrote it.

What it proves: you can build something for yourself that works. Also: it's the tool you actually need this quarter. Use it.

Drop this into Claude Code

``` code-box

Build me a runnable project called front-door.

Build a research-and-draft tool for job outreach. Input: a company name,
a role, and optionally a hiring manager's name. Output: a dossier plus a
draft outreach message.

The dossier should pull together (using web search where available, or
from pasted source material I provide in /data if not):
  - What the team/company has shipped or announced in the last 6 months
  - Their stated problems — from job postings, blog posts, earnings calls,
    engineering blogs
  - The specific hook: one concrete thing I could reference that proves
    I actually looked

Then draft a short outreach note — under 150 words — that leads with the
hook, states one specific way I'd help, and asks for one small thing.

Hard requirements:
  - Every factual claim in the dossier must cite its source URL or file.
    If it can't cite it, it doesn't go in.
  - It NEVER sends anything. It writes a draft to /output and stops.
  - It must flag anything it's inferring rather than sourcing.
  - Add an "honesty check" pass that reads the draft back and flags any
    sentence that sounds like a template or could have been sent to any
    company. Those sentences get rewritten or cut.

README explains why the send step is deliberately manual. Use a .env for
my API key, run it against a real company I name, and show me the dossier
and the draft.
```

### 7. The Posting Decoder — cluster what the market actually wants

Everyone reads job postings one at a time and guesses. Feed 50 of them from your target sector into a tool that clusters the actual required skills, separates the real requirements from the copy-pasted wishlist, and hands you a ranked gap analysis against your own resume.

What it proves: you can turn a pile of unstructured text into a decision. Also it will genuinely change what you spend the next three months learning, which is worth more than the repo.

Drop this into Claude Code

``` code-box

Build me a runnable project called posting-decoder.

Build a tool that ingests a folder of job postings (I'll paste real ones
into /data as text files — generate 20 realistic synthetic ones in my
target sector to start so I can test).

For each posting, extract: required skills, nice-to-haves, seniority
signals, the implied actual problem the team has, and any tells that the
requirements are copy-pasted boilerplate versus real.

Then across the whole corpus:
  - Cluster skills by frequency and co-occurrence — what actually shows
    up together
  - Separate "mentioned in 80% of postings" from "mentioned once"
  - Distinguish the literacy cluster (prompting, using AI tools) from the
    engineering cluster (agents, orchestration, LLMOps, evals) and report
    the mix
  - Identify which requirements are gates versus which are wishes

Then: let me drop my resume into /data and produce a ranked gap analysis —
what's missing, weighted by how often it actually appears, with the
highest-leverage thing to learn first and why.

Output the market map and the gap report to /output.

Hard requirement: it must show its evidence — for every claimed pattern,
list the postings that support it. No unsupported market takes.

README explains the methodology. Use a .env for my API key, then run it
and show me the top 10 real requirements and my gap list.
```

### 8. The Figma Test — a vendor dependency audit

The Figma story in one line: they gave a potential competitor a board seat and a front-row view, and the competitor built the thing that now threatens them. Legal. Invited. Devastating. Build the tool that asks, for every vendor a company depends on: what happens to us if they decide our market looks nice?

What it proves: strategic literacy. This is a *rare* thing for an individual contributor to demonstrate, and it's the kind of build that gets forwarded upward.

Drop this into Claude Code

``` code-box

Build me a runnable project called vendor-exposure.

Build an assessment tool for third-party/AI vendor dependency risk.

Generate /data with 8 synthetic vendor relationships for a fictional
mid-size company — an AI API provider, a design tool, an analytics
platform, a payments processor, a data enrichment service, etc. Each with:
what data flows to them, what workflow depends on them, contract terms,
switching cost, and how much of our strategy they can see.

Build an analyzer that scores each vendor on:
  - ADJACENCY: how close is their business to ours? Could our market be
    their next feature?
  - VISIBILITY: what do they see about our customers, roadmap, or process?
  - LOCK-IN: what breaks if they raise prices 5x or shut the API off?
  - SUBSTITUTABILITY: how long to replace, realistically?
  - LEVERAGE: are we big enough to matter to them?

For each, produce a plain-language "what happens if they turn on us"
scenario and a mitigation — the specific thing to keep in-house instead.

Output a risk matrix and a prioritized "bring this back in-house" list
to /output.

Hard requirement: the highest-risk finding must be stated bluntly, not
hedged. This is a document meant to make someone uncomfortable.

README frames it with the general principle: when you hand a vendor your
workflows, your data, and your roadmap, you're betting they never decide
your market is a nicer place to live than their own. Use a .env for my
API key, then run it and show me the matrix.
```

### 9. The Commitment Ledger — meetings to accountability

Everyone builds the meeting summarizer. The meeting summarizer is useless — nobody reads it. Build the thing that extracts *commitments*: who said they'd do what, by when, and flags every place where the commitment was too vague to hold anyone to.

What it proves: you know that the value isn't in the summary, it's in the specific extraction that changes behavior. That's a product instinct, and product instinct is the thing that's genuinely scarce.

Drop this into Claude Code

``` code-box

Build me a runnable project called commitment-ledger.

Generate /data with 6 synthetic meeting transcripts — realistic, messy,
with people talking over each other, tangents, and a mix of firm
commitments, soft maybes, and things that sound like commitments but
aren't ("yeah we should probably look at that").

Build a tool that extracts, for each meeting:
  - COMMITMENTS: owner, action, deadline, and the verbatim quote it came
    from. Only things a person actually agreed to do.
  - VAGUE: things that were nearly commitments but lack an owner or a
    date. Draft the clarifying question that would pin it down.
  - DECISIONS: what was actually decided, and what was explicitly left open
  - CONTRADICTIONS: places where two people left with different
    understandings of the same thing — flag these loudly, they're the
    expensive ones

Maintain a running ledger across meetings so I can see: open commitments,
things that were promised twice, and commitments that quietly died.

Hard requirement: never invent an owner or a deadline. If it isn't in the
transcript, it goes in VAGUE. Every extraction cites its quote.

Output the per-meeting report and the running ledger to /output.

README explains why this beats a summary. Use a .env for my API key, then
run it across all six and show me the ledger and the contradictions.
```

### 10. The Trap Finder — a prompt injection red team

"The person who can't tell where automation is a trap is going to look dangerous." Here's how you prove you're not that person. Build an agent, then build the harness that attacks it: hostile documents, instructions hidden in the data, attempts to make it exfiltrate or take actions it shouldn't.

What it proves: you're the person who thinks about what happens when the input is hostile. If you are going to do exactly one of these builds and you want it to be the one that makes a security-conscious hiring manager sit up, do this one.

Drop this into Claude Code

``` code-box

Build me a runnable project called trap-finder.

Part 1: build a small, deliberately naive document-processing agent —
it reads files from /data, summarizes them, and can call two tools:
send_email(to, body) and write_file(path, content). It's a stand-in for
every "AI assistant that reads your documents" being shipped right now.

Part 2: build an attack corpus in /attacks — 15 hostile documents that
attempt, in different ways, to hijack it. Include: direct instruction
injection, instructions hidden in white text or a footer, an attack
framed as a system message, a fake "prior authorization" claim, one
hidden in a data table, an encoded one, and one that tries to make the
agent exfiltrate the contents of other files via send_email.

Part 3: build a red-team runner that fires every attack at the agent and
reports which ones succeeded, with the specific output that proves it.

Part 4: NOW harden it. Implement defenses one at a time — instruction/data
separation, tool-call confirmation gates, output filtering, a policy that
treats document content as data and never as commands. After each defense,
re-run the corpus and show the score change, so I can see which defense
actually bought what.

Output a red-team report to /output: attack, result before hardening,
result after, and which specific defense stopped it.

README should be honest about what's still exploitable at the end —
don't claim it's secure. Use a .env for my API key, then run the full
before/after and show me the score table.
```

After You Build

Where the interview answer actually lives

Here's the part almost everyone skips, and it's where the interview answer lives.

A weekend build runs on your laptop, on fake data, when you type a command. A production system runs on its own, on real data, for other people, without you watching it. The gap between those two is exactly the "we bought AI and never deployed it" canyon that most companies are currently standing in.

You don't have to cross it. You have to be able to *describe* it. So after your build works, stay in the same Claude Code session — it can see your actual repo — and ask it to teach you the map using your own code as the textbook:

Walk me through it

``` code-box

Walk me through this project like you're onboarding me. What are the
moving parts, where does the LLM get called, and what assumptions in here
would break the first time a real user ran this on real data instead of
me on synthetic samples? Be specific — point at the lines.
```

What would it take to run for real

``` code-box

Right now this runs on my laptop when I type a command. Explain what it
would take to run somewhere else, on a schedule, on real data — my
options from simplest to most robust, roughly what each costs, and what
I'd have to change in THIS codebase. Don't build it. Teach me the
tradeoffs.
```

What breaks, and how I'd know

``` code-box

If a team depended on this, what breaks and how would I know? Point at
the fragile parts of my actual code and tell me what I'd need to add —
retries, error handling, logging, monitoring — and in what order.
```

What's unacceptable in production

``` code-box

What in this project is fine for a demo and unacceptable in production
from a security and data-handling standpoint? Where should secrets live,
what would access control look like, what changes if this touches
regulated or personal data?
```

You don't have to act on any of the answers. The point is to walk out able to say, in a room: *"I built it, it works, and here's the honest sequence of what it would take to run it for real — hosting first, then scheduling, then one real data source, then reliability."*

That sentence is the whole game. It's the difference between "I made a toy" and "I understand what it takes to run this." One of those gets you a polite rejection. The other one is the thing 66% of hiring managers are about to go looking for, and can't find.

The doors are opening. Go build something you can point at.

One More Thing

If you want a second set of eyes

I put this guide together because the strategy inside it is real, but I also know that reading a framework and applying it to your own career are two very different things. A matrix is easy to nod along to. Figuring out which second-wave industry actually fits your background, which of your existing skills transfer, and what's genuinely worth learning next — that part is personal, and it's a lot harder to do alone.

So I'm starting to do a small number of informal career audits for people working through exactly this. The idea is simple: I take a look at your résumé and where you are right now, and I give you honest, specific thoughts — which directions might fit you best, where your experience already gives you an edge, a few skills or projects worth prioritizing, and resources that'll actually move the needle. No script, no generic advice, just a real read on your situation and where the openings are for you.

This is early and pretty informal right now. I'm mostly trying to help a handful of people and learn what's most useful in the process. If that sounds like something you'd want, just send me an email with a little about where you're at and what you're trying to figure out, and we'll take it from there. No pressure either way — the whole guide above is yours to run with regardless.

📩 Interested?

Email me at [davebrown.dev@gmail.com](mailto:davebrown.dev@gmail.com?subject=Career%20Audit) with the subject line **"Career Audit"** and a couple sentences about your background and what you're hoping to move toward.

If nothing else, I'd genuinely love to hear which part of this was most useful to you. Good luck out there — the frontier is wide open right now, and earlier than most people realize.

Want more guides on positioning yourself for the AI economy?

Follow along on Instagram for weekly breakdowns.

[@davebrownbrand](https://www.instagram.com/davebrownbrand)


---

# GUIDE: WorkingLoudly2026Guide

d.avebrown instagram.com/d.avebrown

# Working Loudly

How to get noticed at work in 2026 without becoming someone people avoid in the hallway.

by d.avebrown

Somewhere along the way, most of us picked up a comforting idea about work: that if you just do a good enough job, the recognition takes care of itself. Your manager remembers the hard thing you solved. Leadership understands your impact without being told. The promotion quietly finds the person who earned it. It's a nice theory, and it survives contact with almost no actual workplace.

In practice, a career runs on two things: the value you create, and whether the right people understand that value. The first without the second is just effort nobody scored. And it's the second part that makes people flinch, because "self-promotion" carries a smell — the humblebrag, the announcement post, the person turning every Slack update into a monologue about their own brilliance.

That version is worth avoiding. But it's a caricature, not the whole category. Done well, self-promotion isn't a performance of genius. It's the far less glamorous work of making what you do easier to see, easier to remember, and easier to connect to something the business cares about. It matters more now because companies have never been noisier — more tools, more meetings, more dashboards, more threads, more machine-generated updates, more "quick syncs" that resolve nothing. In that fog, the instinct to get louder is exactly wrong.

The goal isn't to be louder. It's to be legible — to make your work impossible to misread.

What follows is a way of working, not a checklist to grind through. The ideas cluster into a handful of habits: translate your work, show your judgment, keep a steady signal, make what you build outlast the moment, keep the receipts, and hand credit around. None of it requires becoming someone you'd dislike.

Start Here

Translate the work — don't just report it

Most people describe their work as a list of completed tasks. "I finished the onboarding flow." It's accurate, and it's forgettable, because it stops at what happened and never reaches why anyone should care. The small but decisive shift is to say the same thing and then keep going one sentence further: what changed, why it matters, and what happens next.

Same work, one sentence further

Task-shaped: "I finished the onboarding flow." Impact-shaped: "I finished the onboarding flow. It should cut the support tickets we get from new users and make activation easier to track — next I want to measure whether it shortens time-to-value."

Your manager isn't only tracking effort. They're reading for risk, progress, customer impact, and whether you can be trusted with something bigger. Give them that read directly. The habit is a translation layer between your work and the priorities of whoever you're talking to — because leaders usually care less about the thing you built than about what it unlocks. To a peer, the details are the point. To leadership, the outcome is.

Same project

To a teammate

To leadership

Billing refactor

"We reworked the billing workflow and fixed a pile of weird retry edge cases."

"We made billing more reliable, which should reduce failed payments, support escalations, and manual cleanup for ops."

Sales–onboarding handoff

"We cleaned up the handoff so onboarding gets the fields it needs."

"Fewer customers start implementation with missing information — we're measuring whether it cuts average time to launch."

The first column proves you did the work. The second proves you understand why it mattered. That gap is the whole game, and it costs you nothing but a habit of finishing the sentence.

Sound Senior

Show your judgment, not just your conclusions

Plenty of people will tell you what they think. Far fewer explain how they got there, and that second group gets noticed faster — because judgment, not opinion, is what leaders are quietly scanning for when they decide who can handle more. Compare a flat verdict with one that shows its work: "I think we should delay the launch" versus "I'd delay the launch — the customer-facing risk outweighs hitting the date, and the two open issues are support readiness and billing edge cases. Clear those this week and I'd feel good about next Tuesday." Same position, completely different signal.

A close cousin of showing your reasoning is speaking in tradeoffs. People who get promoted tend to understand that every decision has a cost, so they don't just bless an idea — they name what it trades against. "Worth doing, but it pushes the reporting cleanup back two weeks." "We can move faster if we accept more support risk." Senior people are rarely choosing between good and bad; they're choosing between speed and quality, growth and margin, flexibility and simplicity. Name the tradeoff and you sound like someone who belongs in the decision.

Reframing the room

Instead of arguing the solution: "Before we pick a fix, can we agree on what failure we're trying to prevent?" Instead of accepting the framing: "Are we trying to cut cost, cut customer confusion, or make the internal team faster? Those point at different answers."

The loudest person in a meeting rarely gets remembered. The one who cuts through and says "I think we might be solving the wrong problem" does. Most teams sprint straight into solution mode — build the dashboard, rewrite the process, buy the tool — and the person who calmly reframes the question is doing something more valuable than adding volume. They're making the conversation smarter, and people remember who did that.

The same instinct shows up as bringing the context nobody else has. Most people understand only their slice: marketing sees the campaign, engineering sees the ticket, success sees the complaint. The person who gets noticed connects the slices — "success is treating this as a support issue, but it looks like an onboarding problem," or "we're asking for automation, but the real issue is that the process is different every time." You don't have to be the smartest person in the room. You have to see one level wider than your job description, and to ask the question that sharpens the decision rather than the one that just fills silence. "What would we need to believe for this to be worth prioritizing over the other two options?" does more than five minutes of talking.

Be A Steady Signal

Consistency beats the one big moment

A lot of people are waiting for their moment — the perfect meeting comment, the presentation that finally makes everyone see them. It can happen, but it's not how reputations usually get built. They get built through a steady, almost boring signal. When you're leading something that matters, a short weekly update does more for you than any single performance. Not a novel. A clean read on where things stand.

A weekly update that earns trust

Progress — what moved forward this week Risks — what might block us Decisions needed — what needs someone's attention Next — what happens before the next update

It signals that you're organized, keeps leadership informed without random check-ins, and quietly proves you can manage ambiguity — visibility with no theatrics. The same discipline is why most 1:1s get wasted. People show up and read their task list aloud, which is a verbal status board, not a career conversation. Use the time to shape the story instead: not "I worked on the reporting dashboard," but "I've been focused on cutting the manual reporting the team does every week — the dashboard is part of that, and if it lands we save a few hours and get cleaner numbers for planning." Now your manager has a thread to pull, and you're driving an outcome rather than closing tickets.

Meetings leak the same way. Most of them end on a polite fiction — "great, we're aligned" — when everyone is leaving with a slightly different story of what was decided and who owns what. The person who sends the short "here's what I heard we decided" note, with owners and open questions listed, looks wildly competent for what is genuinely unglamorous work. It won't get you a keynote. It gets you trust, which is more durable.

The same clarity is what you want when you actually reach leadership. You don't need constant access; you need to be useful in the access you get, which means no rambling and no five-minute preamble. Lead with the context, then what it means, then what you're asking for.

Three sentences, executive-ready

Context: "Setup-related support tickets are up over the last month." Insight: "The pattern is confusion at handoff, not product bugs." Ask: "I'd standardize the intake form before we invest in more automation."

Make It Travel

Turn work into things other people keep using

One of the most underrated moves is to not just solve a problem but package the solution so it outlives the moment. The messy process becomes a checklist. The onboarding you ran becomes a doc. The question you've answered three times becomes a short guide. The useful template, dashboard, or decision framework gets a name and gets shared. This is how your work shows up in rooms you're not in — and people remember whoever made the thing they keep reaching for.

Related, but easy to get wrong: making other people's jobs easier. There's a version of "helpful" that just turns you into the office vending machine, and that's not it. The version that builds a reputation is small and high-leverage — the summary that turns a chaotic meeting into decisions and owners, the context you hand another team before they have to ask, the note that explains what changed after a confusing call. That kind of work creates relief, and people remember relief.

It also helps to be known for one specific thing rather than generally good. General competence is pleasant and hard to remember. You want a mental shortcut attached to your name — the person who explains complicated things simply, who defuses messy escalations, who spots the process gap, who aligns sales and product and support. This isn't about becoming one-dimensional; it's about giving people a reason to think of you when a certain kind of problem shows up.

And spend some of that legibility upward. Your manager sits in rooms you don't, arguing for your team's work — and they can't advocate for what they don't understand. So make it easy: before the important conversations, hand them "the three things worth knowing about the project this week," or the customer impact and the decision leadership may need to make. That's not flattery. It's ammunition. When your manager keeps having good answers because of you, you become the person they associate with clarity.

Keep The Receipts

Nobody remembers their own work at review time

You will not remember your own year. You think you will; you won't. By review season your brain has kept three things — the project that nearly killed you, a compliment from March, and a vague sense of having been busy — and it tries to reconstruct twelve months of work from Slack search. The fix is unremarkable: write things down when they happen. The projects you led, the metrics you moved, the risks you reduced, the moments you stepped outside your role.

The trick isn't just to log it, it's to log it usably. "Helped with onboarding" is a shrug. "Documented the questions new users kept asking, which cut confusion and gave support a reusable reference" is something you can drop straight into a review, a promotion case, or a comp conversation. Capture the win while the receipt is still warm.

The same win, logged two ways

Useless later: "Helped with onboarding." Useful later: "Improved onboarding by documenting recurring customer questions — reduced confusion for new users and gave the support team a reusable reference."

This is exactly what I built the **Brag Sheet Builder** skill for — not to help anyone sound impressive, but because most people are genuinely bad at capturing their own impact in a form that's useful six months later. It turns the stuff you're already doing into clear, specific proof. Feed it the raw material and it does the translation you won't feel like doing under review-season pressure.

Praise belongs in the same folder. When someone compliments your work — a Slack message, a customer comment, a note from your manager, a thank-you from another team — save it. Not framed above your desk; just captured. At review time, "I think I did a good job" is weak, while "here are three cross-functional partners specifically calling out the clarity of the process I led" is not. Numbers matter, but reputation is also built on how people experience working with you, and that evidence evaporates if you don't catch it.

Give It Away

The least cringey visibility points at other people

The counterintuitive part is that some of the best visibility comes from talking about other people's work. "Great job, Sarah" is generic and forgettable. "Sarah untangled the last three escalations into a single clear product recommendation — that stopped us from treating three symptoms as unrelated problems" does three things at once: it makes Sarah look good, it shows you understand the work well enough to describe it, and it signals to leadership that you notice contribution. The focus is off you, which is exactly why it lands.

Scale that into a habit and it becomes something more useful than a "brag buddy" — call it a visibility circle. Keep a loose sense of what a few people you respect are working on, and mention it in the right rooms when it's relevant: "that lines up with what Jenna's team found in onboarding last week," or "Marcus put together a sharp breakdown of this — we should pull it into the decision." Not manufactured hype. Real, specific credit. It makes you a connector, and connectors get noticed because they make the whole organization a little smarter.

"Make it better" is not a brief. Neither is "look how great I am." The line that works is: here's what changed, why it mattered, who it helped, and what we should do next.

Underneath all of it is a single idea: make your work impossible to misunderstand. Not louder, not needier, just clearer. Give projects names. Summarize the point. Document the result. Connect it to a goal someone cares about. Credit the people involved. The people who get noticed aren't always the ones doing the most work — they're often the ones whose work is easiest to see. That can feel unfair. It's also fixable, which is the more useful thing to notice about it.

The Playbook

Ten things you can actually do this week

Don't try to adopt all of this at once — pick two or three and let them become habits. Here's the whole article boiled down to concrete moves.

01Finish the sentence.

After "what I did," add why it mattered and what happens next. Every update, every time.

02Send a weekly update on anything you lead.

Four lines: progress, risks, decisions needed, what's next. Boring and consistent beats one big moment.

03Use your 1:1 for the story, not the task list.

Frame your work as an outcome you're driving, not a pile of tickets you closed.

04Send the recap after the meeting.

"Here's what I heard we decided" — with owners and open questions. Unglamorous, and it builds trust fast.

05Name the tradeoff, not just the opinion.

"Worth doing, but it pushes reporting back two weeks." Tradeoffs make you sound like you belong in the decision.

06Reframe before you solve.

Ask what failure you're trying to prevent, or what you're actually optimizing for, before the room picks a fix.

07Package one thing you figured out.

Turn a solved problem into a checklist, doc, or template — give it a name and share it so it travels without you.

08Brief your manager before the room you're not in.

Hand them the three things worth knowing this week. You're giving them ammunition, not sucking up.

09Keep a running brag sheet.

Log wins as they happen, framed as impact rather than tasks. The Brag Sheet Builder does the translation for you.

10Give one person specific, public credit.

Describe what they did well, not just "great job." Pointing at others is the least cringey way to get noticed.

Start the running record before you need it — invisible work rarely becomes visible by accident. That's what the Brag Sheet Builder is for: so when review season arrives, you're not solving the cold case of your own year from memory. You just have to make the work a little easier to see.

Want more on doing career-defining work without the cringe?

Follow along on Instagram for weekly breakdowns.

[@davebrownbrand](https://www.instagram.com/davebrownbrand)

