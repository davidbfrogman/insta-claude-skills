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
