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
