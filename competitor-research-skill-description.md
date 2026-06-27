# Competitor Research Skill

## Purpose

This skill helps a business keep a live pulse on competitors by researching their online presence, customer sentiment, marketing activity, positioning, offers, reputation, product changes, hiring signals, local market signals, and recent news.

The goal is not to create a static competitor profile.

The goal is to repeatedly answer:

- What are my competitors doing right now?
- What changed since the last report?
- Where are they gaining momentum?
- Where are they weak?
- What are customers praising?
- What are customers complaining about?
- What are they spending marketing energy on?
- What opportunities can I exploit?
- What should I test next?

This skill should work for two major categories:

1. Local service businesses  
2. SaaS / software companies  

Each category requires different research sources, signals, and output formats.

---

# Core Skill Behavior

## The skill should accept

The user should be able to provide:

- Their business name
- Their website
- Their service area or target market
- Their business category
- Known competitors
- Target customer type
- Optional keywords they care about
- Optional locations they care about
- Optional app store links
- Optional SaaS category
- Optional frequency: weekly, bi-weekly, monthly
- Optional report style: short, detailed, executive brief, action plan

Example input:

```text
Research competitors for my residential glass repair company in Dutchess County, NY.

My business:
- Name: Acme Glass
- Website: acmeglass.com
- Service area: Dutchess County, Putnam County, Orange County
- Main services: shower glass, window repair, storefront glass, mirrors

Known competitors:
- ABC Glass
- Hudson Valley Glass
- Premium Shower Doors

Run this as if it were a weekly competitive intelligence report.
```

Or:

```text
Research competitors for my SaaS company.

My company:
- Name: Fieldwire
- Website: Fieldwire.com
- Category: operations software for construction companies
- Competitors: Jobber, ServiceTitan, Buildertrend, Knowify, FieldPulse

Focus on product launches, app reviews, positioning, pricing, customer complaints, and marketing changes.
```

---

# The Skill’s Main Job

The skill should produce a markdown report with:

1. Executive summary  
2. What changed since the last run  
3. Competitor-by-competitor findings  
4. Customer sentiment analysis  
5. Marketing and acquisition signals  
6. Positioning analysis  
7. Offer and pricing analysis  
8. Weaknesses and opportunities  
9. Recommended actions  
10. Watchlist for next run  

---

# Important Operating Principle

The skill should not merely summarize websites.

It should look for **competitive signals**.

A competitive signal is anything that tells us:

- The competitor is investing in a channel
- The competitor is getting customer attention
- The competitor is frustrating customers
- The competitor is changing their offer
- The competitor is expanding
- The competitor is contracting
- The competitor is hiring
- The competitor is launching new products
- The competitor is receiving complaints
- The competitor is earning trust
- The competitor is repositioning
- The competitor is changing pricing
- The competitor is trying a new market
- The market itself is changing

---

# Part 1: Local Service Business Competitor Research

This mode is for businesses like:

- Glass companies
- Electricians
- Plumbers
- HVAC companies
- Roofers
- Landscapers
- Pest control companies
- Contractors
- Cleaning services
- Med spas
- Dentists
- Local repair companies
- Home service businesses
- B2C or B2B local services

The main question is:

> How are local competitors getting customers, what do customers think of them, and where can we position ourselves differently?

---

## Local Competitor Discovery

The skill should search for competitors using combinations of:

- Business category
- Service area
- City
- County
- Nearby towns
- “near me” style search terms
- Google Maps results
- Organic search results
- Local directories
- Yelp
- Angi
- HomeAdvisor
- Thumbtack
- Houzz
- BBB
- Facebook pages
- Local chamber of commerce listings
- Local trade association directories
- Local sponsor pages
- Local newspaper mentions

Example searches:

```text
glass repair Dutchess County NY
shower glass installers near Poughkeepsie
storefront glass repair Hudson Valley
best window repair company Fishkill NY
commercial glass contractor Dutchess County
```

The skill should identify:

- Direct competitors
- Indirect competitors
- Premium competitors
- Low-price competitors
- Highly reviewed competitors
- Competitors with strong SEO
- Competitors with strong paid ads
- Newer competitors
- Competitors with weak reputation but high visibility

---

## Local Competitor Profile

For each competitor, collect:

- Business name
- Website
- Primary services
- Service area
- Phone number
- Address
- Years in business, if available
- Google rating
- Number of Google reviews
- Review velocity, if available
- Other review sites
- Social profiles
- Ads found
- Main positioning
- Primary call-to-action
- Offers or promotions
- Notable differentiators
- Weaknesses
- Estimated marketing maturity

---

# Google Maps Research

The skill should look at Google Maps and collect:

- Ranking position for target keywords
- Number of reviews
- Average rating
- Review recency
- Review keywords
- Photos
- Business categories
- Service areas
- Business hours
- Response behavior to reviews
- Whether the owner replies to negative reviews
- Whether the profile looks actively managed
- Whether photos are recent
- Whether services are listed
- Whether there are Q&A responses
- Whether posts or updates are being used

The skill should especially notice:

- Businesses with lots of reviews but poor sentiment
- Businesses with few reviews but strong ratings
- Businesses with stale profiles
- Businesses with many unanswered complaints
- Businesses that rank well despite weak branding
- Businesses with strong photo proof
- Businesses that mention emergency service, financing, guarantees, warranties, or fast turnaround

---

# Review Analysis

The skill should collect and analyze reviews from:

- Google
- Yelp
- Facebook
- Angi
- BBB
- Trustpilot, if relevant
- Capterra / G2 / app stores for software-adjacent local products
- Industry-specific directories

For local service businesses, reviews should be categorized into themes.

## Positive Review Themes

Look for customers praising:

- Fast response
- Fair pricing
- Professionalism
- Clean work
- Quality craftsmanship
- Communication
- Showing up on time
- Emergency availability
- Friendly technicians
- Knowledgeable staff
- Easy scheduling
- Honest estimates
- Respect for the customer’s home
- Good cleanup
- Good warranty support
- Owner involvement
- Local trust

## Negative Review Themes

Look for customers complaining about:

- No-shows
- Poor communication
- Delays
- Missed appointments
- Unclear pricing
- Surprise charges
- Bad installation
- Messy work
- Warranty issues
- Rude staff
- Poor follow-up
- Hard to schedule
- Unreturned calls
- Low-quality materials
- Damaged property
- Long lead times
- Bait-and-switch pricing

## Output Should Include

For each competitor:

```markdown
### Customer Sentiment Summary

Overall customer perception:
- Customers generally like them for:
- Customers complain about:
- Most repeated praise:
- Most repeated complaint:
- Recent trend:
- Service gaps:
- Positioning opportunity against them:
```

Example:

```markdown
Customers repeatedly praise ABC Glass for fast shower door installation and professional installers. However, several recent reviews mention slow callback times and poor communication after the initial estimate. This creates an opening to position around “clear communication from quote to install” and “same-day callback guarantee.”
```

---

# Local SEO Research

The skill should examine competitors’ websites and organic visibility.

Look for:

- Page titles
- Meta descriptions
- Local landing pages
- Service pages
- City-specific pages
- Blog posts
- FAQ pages
- Schema markup, if visible
- Google Business Profile optimization
- Internal linking
- Backlinks, where discoverable
- Local citations
- Directory listings
- Review widgets
- Before/after galleries
- Project pages
- Case studies
- Service area pages
- Emergency service pages

## SEO Signals to Capture

- Which keywords they appear to target
- Which cities they mention
- Which services they emphasize
- Whether they have location-specific pages
- Whether their content is thin or strong
- Whether they answer customer questions
- Whether their pages are built for conversion
- Whether they have strong calls-to-action
- Whether they publish educational content
- Whether they rank because of authority or because competition is weak

## Useful Output

```markdown
### SEO / Website Positioning

Primary keywords targeted:
- 

Service pages found:
- 

Location pages found:
- 

Content strengths:
- 

Content weaknesses:
- 

SEO opportunity:
- 
```

---

# Paid Advertising Research

The skill should try to determine whether competitors are spending money on ads.

Possible sources:

- Google search results
- Google Ads Transparency Center
- Meta Ad Library
- LinkedIn ads, for B2B
- TikTok ads, if relevant
- YouTube ads, if discoverable
- Sponsored local listings
- Yelp ads
- Angi / HomeAdvisor presence
- Local Services Ads
- Retargeting pixels, if visible
- Landing pages
- UTM-heavy links
- Promotional pages

## Paid Ad Signals

Look for:

- Sponsored Google search ads
- Google Local Services Ads
- Meta ads
- Repeated landing pages
- Offer-based copy
- Seasonal promos
- Financing promos
- Emergency-service ads
- “Free estimate” ads
- “Same-day service” ads
- “Family owned” positioning
- “Licensed and insured” claims
- Review/rating claims
- Geo-targeted copy
- Before/after creative
- Lead forms
- Dedicated ad landing pages

## Paid Ads Output

```markdown
### Paid Marketing Signals

Ads found:
- 

Likely channels:
- 

Main ad messages:
- 

Offers/promotions:
- 

Landing pages:
- 

Estimated intent:
- Lead generation
- Brand awareness
- Emergency service capture
- Seasonal campaign
- Recruiting
- Retargeting

Opportunity:
- 
```

---

# Social Media Research

For local service businesses, social media can reveal:

- Recent projects
- Before/after photos
- Customer testimonials
- Promos
- Hiring needs
- Community involvement
- Sponsorships
- Seasonal focus
- Owner personality
- Content frequency
- Brand tone
- Visual quality
- Engagement level

Sources:

- Facebook
- Instagram
- TikTok
- LinkedIn
- YouTube
- Pinterest, for visual services
- Nextdoor, if discoverable
- Local groups, where public

The skill should capture:

- Posting frequency
- Recent posts
- Offers
- Projects highlighted
- Customer comments
- Content themes
- Video usage
- Educational content
- Personality-driven content
- Community involvement
- Whether comments show demand or complaints

Useful output:

```markdown
### Social Media Activity

Active channels:
- 

Recent content themes:
- 

Most engaging content:
- 

Promotions:
- 

Community involvement:
- 

Content gaps:
- 

Opportunity:
- 
```

---

# Local Market Signals

For local service businesses, the skill should not only research competitors.

It should also research the market.

Possible local market signals:

- New housing developments
- Building permits
- Real estate transactions
- Commercial construction
- New business openings
- Local development news
- Municipal planning board updates
- Zoning approvals
- School construction
- Hospital expansions
- Apartment developments
- Retail center renovations
- Storm damage
- Weather events
- Insurance claim spikes
- Local economic development grants
- Home sale volume
- Population growth
- Local Facebook chatter
- Local newspaper construction coverage

For example, a glass company may want to know:

- Are new homes being built?
- Are commercial buildings being renovated?
- Are restaurants opening?
- Are storefronts changing hands?
- Are property managers expanding?
- Are apartments being built?
- Are homeowners investing in renovations?
- Did a storm create repair demand?
- Are local contractors advertising aggressively?

## Local Market Research Sources

- Local newspapers
- Town planning board agendas
- County property records
- Building permit data
- Real estate listing sites
- Zillow / Redfin market trends
- Local business journals
- Chamber of commerce announcements
- Municipal websites
- Construction bid notices
- Public procurement portals
- Facebook community pages, where public
- Local economic development agencies

## Local Market Output

```markdown
### Local Market Signals

Recent developments:
- 

Potential demand drivers:
- 

Relevant construction activity:
- 

Real estate activity:
- 

Commercial activity:
- 

Seasonal factors:
- 

Implication:
- 
```

---

# Positioning Opportunities for Local Businesses

The skill should turn research into usable positioning.

Examples:

If competitors have poor communication reviews:

```markdown
Position around: “Clear communication from first call to final install.”
```

If competitors have long wait times:

```markdown
Position around: “Fast estimates and realistic install timelines.”
```

If competitors look generic:

```markdown
Position around: “Specialists in premium shower glass and custom installations.”
```

If competitors have weak photos:

```markdown
Position around: “See the work before you call — real project photos from local homes.”
```

If competitors do not respond to reviews:

```markdown
Position around: “Locally owned, responsive, and accountable.”
```

If competitors are focused on residential:

```markdown
Position around: “Commercial glass support for property managers, storefronts, and contractors.”
```

---

# Local Business Report Template

```markdown
# Weekly Competitor Intelligence Report

## Business Category
[Category]

## Market
[City / county / region]

## Reporting Period
[Date range]

---

## 1. Executive Summary

Top findings:
1. 
2. 
3. 

Biggest competitor movement:
- 

Biggest customer pain point found:
- 

Best opportunity this week:
- 

Recommended action:
- 

---

## 2. What Changed Since Last Report

New competitors found:
- 

New ads found:
- 

New reviews:
- 

New complaints:
- 

New promotions:
- 

New website changes:
- 

New local market signals:
- 

---

## 3. Competitor Snapshot

| Competitor | Rating | Reviews | Positioning | Marketing Activity | Weakness | Opportunity |
|---|---:|---:|---|---|---|---|
| | | | | | | |

---

## 4. Competitor Deep Dives

### Competitor 1

Website:
Google profile:
Primary services:
Service area:
Estimated marketing maturity:

#### Positioning
- 

#### Review Sentiment
Positive themes:
- 

Negative themes:
- 

Recent review trend:
- 

#### Marketing Activity
SEO:
- 

Ads:
- 

Social:
- 

Offers:
- 

#### Weaknesses
- 

#### Opportunity Against Them
- 

---

## 5. Customer Sentiment Across the Market

Most common praise:
- 

Most common complaints:
- 

Unmet customer needs:
- 

Messaging opportunities:
- 

---

## 6. Local Market Signals

Relevant local news:
- 

Housing / construction activity:
- 

Commercial activity:
- 

Seasonal demand signals:
- 

Implication:
- 

---

## 7. Recommended Actions

### This Week
- 

### This Month
- 

### Longer-Term
- 

---

## 8. Watchlist for Next Report

Competitors to monitor:
- 

Keywords to monitor:
- 

Ads to check:
- 

Review trends to watch:
- 

Market signals to watch:
- 
```

---

# Part 2: SaaS Competitor Research

This mode is for software companies.

The main question is:

> What are competing software companies building, selling, launching, hiring for, and being praised or criticized for?

---

## SaaS Competitor Sources

The skill should research:

- Competitor websites
- Pricing pages
- Product pages
- Feature pages
- Blog posts
- Changelogs
- Release notes
- Help docs
- API docs
- Status pages
- App stores
- Chrome Web Store
- G2
- Capterra
- TrustRadius
- Gartner Peer Insights
- Reddit
- Hacker News
- LinkedIn
- X/Twitter
- YouTube
- Product Hunt
- GitHub, if relevant
- Job postings
- Press releases
- Funding announcements
- Podcasts
- Webinars
- Customer case studies
- Integration marketplaces
- Partner directories
- Ads libraries
- SEO pages
- Comparison pages
- Customer communities
- Public roadmap pages

---

# SaaS Competitor Profile

For each competitor, collect:

- Company name
- Website
- Category
- Target customer
- Pricing model
- Main product lines
- Key features
- Positioning
- ICP
- Recent launches
- Recent blog posts
- Recent changelog items
- App store presence
- App ratings
- Review sentiment
- G2/Capterra sentiment
- Funding/news
- Hiring signals
- Partnerships
- Integrations
- Ads found
- SEO themes
- Sales motion
- Product-led vs sales-led indicators
- Enterprise vs SMB focus
- Weaknesses
- Opportunities

---

# SaaS Website and Positioning Analysis

The skill should analyze:

- Homepage headline
- Subheadline
- Primary CTA
- Secondary CTA
- Target customer language
- Industry-specific language
- Product category framing
- Main pain points
- Main outcomes promised
- Proof points
- Customer logos
- Case studies
- Testimonials
- Pricing transparency
- Vertical specificity
- AI positioning
- Integration messaging
- Enterprise/security messaging
- Migration messaging
- Comparison pages
- “Alternative to” pages

## Output

```markdown
### Positioning Analysis

Homepage headline:
- 

Primary promise:
- 

Target customer:
- 

Main pain points:
- 

Main differentiators:
- 

Proof points:
- 

CTA:
- 

Positioning notes:
- 
```

---

# SaaS Product Research

The skill should inspect:

- Product pages
- Feature pages
- Docs
- Help center
- Changelog
- Release notes
- Blog
- Webinars
- Demo videos
- YouTube walkthroughs
- App screenshots
- Public roadmap
- Integration pages
- Marketplace listings

## Product Signals to Extract

- New features
- AI features
- Automation features
- Integrations
- Mobile app changes
- Reporting features
- Workflow changes
- Admin/security features
- Enterprise features
- API/platform features
- Payments features
- Collaboration features
- Industry-specific modules
- Onboarding improvements
- Migration tooling
- Templates
- New verticals
- Deprecated features
- Repackaged features
- Feature depth vs marketing fluff

## Output

```markdown
### Product Movement

Recent launches:
- 

Feature areas receiving investment:
- 

Signals from docs/changelog:
- 

New integrations:
- 

AI-related features:
- 

Enterprise/security features:
- 

Implication:
- 
```

---

# SaaS Review Research

The skill should collect customer feedback from:

- G2
- Capterra
- TrustRadius
- Gartner Peer Insights
- App Store
- Google Play
- Chrome Web Store
- Reddit
- Product Hunt
- YouTube comments
- Public forums
- Social comments

## Review Themes to Extract

Positive themes:

- Easy to use
- Fast setup
- Good support
- Saves time
- Good reporting
- Good mobile app
- Strong integrations
- Good onboarding
- Good value
- Helps teams collaborate
- Industry-specific workflows
- Reliable
- Customizable

Negative themes:

- Expensive
- Poor support
- Buggy
- Slow
- Hard to configure
- Missing features
- Weak mobile app
- Bad onboarding
- Poor reporting
- Integration issues
- Billing complaints
- Feature bloat
- Too complex
- Not flexible enough
- Weak permissions
- Poor API
- Data migration pain
- Bad implementation experience
- Long contracts
- Pushy sales
- Poor cancellation process

## SaaS Review Output

```markdown
### Review Sentiment

Overall sentiment:
- 

Customers praise:
- 

Customers complain about:
- 

Most repeated positive theme:
- 

Most repeated negative theme:
- 

Recent change in sentiment:
- 

Opportunity:
- 
```

---

# App Store Research

For SaaS companies with mobile apps, the skill should research:

- Apple App Store
- Google Play Store
- Chrome Web Store
- Shopify App Store
- Salesforce AppExchange
- HubSpot App Marketplace
- Slack App Directory
- Microsoft AppSource
- Atlassian Marketplace
- WordPress plugin directory

Depending on the category.

## App Store Signals

Collect:

- App rating
- Review count
- Recent reviews
- App update date
- Version history
- Release notes
- Screenshots
- App description
- Keywords used
- Complaints
- Praise
- Bugs mentioned
- Device-specific problems
- Login issues
- Performance issues
- Missing features
- Support responses
- Download estimates, if available
- Category rank, if visible

## Output

```markdown
### App Store Intelligence

Platforms:
- 

Ratings:
- 

Recent updates:
- 

Recent positive reviews:
- 

Recent negative reviews:
- 

Common mobile complaints:
- 

Product direction implied by updates:
- 

Opportunity:
- 
```

---

# SaaS Pricing Research

The skill should inspect:

- Pricing pages
- Plan names
- Price points
- Free trials
- Freemium tiers
- Per-seat pricing
- Usage-based pricing
- Platform fees
- Implementation fees
- Add-ons
- Enterprise pricing
- Annual discounts
- Contract requirements
- Hidden pricing
- “Contact sales” usage
- Feature packaging
- Pricing comparison pages
- Review complaints about pricing

## Output

```markdown
### Pricing and Packaging

Pricing visibility:
- Transparent / partially transparent / hidden

Plan structure:
- 

Entry price:
- 

Enterprise motion:
- 

Add-ons:
- 

Free trial / freemium:
- 

Pricing complaints:
- 

Packaging strategy:
- 

Opportunity:
- 
```

---

# SaaS Hiring Signals

Hiring is one of the best ways to infer product direction.

The skill should inspect:

- Careers page
- LinkedIn jobs
- Wellfound
- Greenhouse
- Lever
- Indeed
- Built In
- Remote job boards

## Hiring Signals to Capture

Look for hiring in:

- AI / ML
- Data engineering
- Product management
- Mobile
- Integrations
- Payments
- Enterprise sales
- Customer success
- Implementation
- Security / compliance
- DevOps / infrastructure
- Support
- Vertical-specific roles
- Partnerships
- Solutions engineering
- RevOps
- Content marketing
- Demand generation
- SDR / BDR
- Account executives

## Interpretation Examples

If they are hiring many implementation roles:

```markdown
They may be moving upmarket or experiencing onboarding complexity.
```

If they are hiring AI engineers:

```markdown
They are likely investing in AI-native workflows or AI-assisted product features.
```

If they are hiring partnership roles:

```markdown
They may be expanding through channel, integration, or ecosystem strategy.
```

If they are hiring support aggressively:

```markdown
This may indicate growth, customer friction, or operational strain.
```

## Output

```markdown
### Hiring Signals

Open roles:
- 

Departments hiring:
- 

Notable roles:
- 

Likely strategic implication:
- 

Potential weakness:
- 

Opportunity:
- 
```

---

# SaaS Marketing and Demand Generation Research

The skill should research:

- Paid search ads
- Meta ads
- LinkedIn ads
- YouTube ads
- Retargeting
- SEO content
- Comparison pages
- “Alternative to” pages
- Webinars
- Downloadable guides
- Lead magnets
- Calculators
- ROI pages
- Whitepapers
- Email capture flows
- Demo CTAs
- Free trial CTAs
- Partner campaigns
- Case studies
- Customer stories
- Podcasts
- Events
- Conferences
- Sponsorships

## Marketing Signals

Capture:

- Which personas they target
- Which industries they target
- Which pain points they emphasize
- Whether they are going after competitors directly
- Whether they are investing in SEO
- Whether they are investing in thought leadership
- Whether they are investing in video
- Whether they are using founder-led content
- Whether they are using customer stories
- Whether they are building category authority
- Whether they are leaning into AI
- Whether they are using ROI/value calculators
- Whether they are emphasizing integrations
- Whether they are emphasizing compliance/security
- Whether they are emphasizing speed/time savings

## Output

```markdown
### Marketing Intelligence

Main acquisition channels:
- 

Paid ads found:
- 

SEO content themes:
- 

Lead magnets:
- 

Webinars/events:
- 

Comparison pages:
- 

Primary personas targeted:
- 

Main pain points:
- 

Notable campaigns:
- 

Opportunity:
- 
```

---

# SaaS News and Momentum Research

The skill should search for:

- Funding announcements
- Acquisitions
- Partnerships
- Product launches
- Executive hires
- Layoffs
- Market expansion
- International expansion
- New verticals
- Major customer wins
- Case studies
- Analyst mentions
- Security incidents
- Outages
- Pricing changes
- Rebrands
- Conference announcements
- Awards
- Customer lawsuits
- Regulatory issues

## Output

```markdown
### News and Momentum

Recent news:
- 

Partnerships:
- 

Funding/acquisition activity:
- 

Product launches:
- 

Customer wins:
- 

Risks or negative news:
- 

Momentum assessment:
- Increasing / stable / declining / unclear

Implication:
- 
```

---

# SaaS Competitive Positioning Matrix

The skill should create a matrix like this:

```markdown
| Competitor | Target Customer | Positioning | Strength | Weakness | Recent Movement | Threat Level |
|---|---|---|---|---|---|---|
| | | | | | | Low / Medium / High |
```

Threat level should consider:

- Product overlap
- Market momentum
- Customer satisfaction
- Pricing attractiveness
- Brand visibility
- Feature velocity
- Funding
- Sales motion
- Review sentiment
- Target customer overlap

---

# Recurring Report Behavior

The most important feature is that this skill should produce something new every time it runs.

It should not simply regenerate the same competitor profile.

It should act like a weekly analyst.

## On Every Run, It Should Ask

- What changed since the last report?
- What new reviews appeared?
- What new ads are running?
- What new pages were published?
- What new blog posts were published?
- What new features were launched?
- What new jobs were posted?
- What new funding/news appeared?
- What new customer complaints appeared?
- What new market signals appeared?
- What competitor moved the most?
- What should I do differently this week?

---

# Persistent Memory / State

The skill should keep a previous-run snapshot, if the environment allows it.

It should store:

- Competitor list
- URLs monitored
- Last ratings
- Last review counts
- Last known pricing
- Last known headline
- Last known CTAs
- Last known app ratings
- Last known open jobs
- Last known ad messages
- Last known product launches
- Last known social posts
- Last report date
- Watchlist items
- Previously recommended actions

Then each new report can include a delta section.

```markdown
## What Changed Since Last Run

### Review Changes
- ABC Glass went from 4.4 stars / 112 reviews to 4.4 stars / 119 reviews.
- Three new reviews mention slow response times.

### Website Changes
- Competitor X added a new “Emergency Glass Repair” landing page.

### Ad Changes
- Competitor Y is now running Google search ads for “same day shower glass estimate.”

### Product Changes
- Competitor Z launched a new mobile scheduling feature.

### Hiring Changes
- Competitor A added two implementation roles and one enterprise account executive role.

### Strategic Interpretation
The market appears to be moving toward faster response-time messaging and emergency-service capture.
```

---

# Change Detection Priorities

The skill should prioritize changes in this order:

1. New customer complaints
2. New offers or promotions
3. New ads
4. New pricing changes
5. New feature launches
6. New positioning changes
7. New review velocity
8. New hiring signals
9. New local market demand signals
10. New social/content campaigns

---

# Scoring Model

The skill should score competitors across multiple categories.

## Local Business Scoring

```markdown
| Category | Score 1-5 | Notes |
|---|---:|---|
| Google Maps visibility | | |
| Review strength | | |
| Review velocity | | |
| Website quality | | |
| SEO strength | | |
| Paid ad activity | | |
| Social proof | | |
| Offer clarity | | |
| Response speed signal | | |
| Differentiation | | |
| Customer sentiment | | |
| Threat level | | |
```

## SaaS Scoring

```markdown
| Category | Score 1-5 | Notes |
|---|---:|---|
| Product velocity | | |
| Customer sentiment | | |
| Pricing attractiveness | | |
| Marketing strength | | |
| SEO strength | | |
| Paid acquisition activity | | |
| App quality | | |
| Enterprise readiness | | |
| Integration ecosystem | | |
| AI/product innovation | | |
| Funding/momentum | | |
| Threat level | | |
```

---

# Recommended Output Style

The report should be strategic, not generic.

Bad output:

```markdown
Competitor has a website and good reviews.
```

Good output:

```markdown
Competitor appears to be winning on trust and local reputation, but their reviews repeatedly mention slow callbacks. Their website does not make a strong speed or communication promise. This creates an opportunity to position around response time, transparent scheduling, and proactive project updates.
```

Bad output:

```markdown
Competitor has launched new features.
```

Good output:

```markdown
Competitor is investing heavily in mobile workflows. Their last three releases mention field updates, offline access, and photo uploads. This suggests they are trying to close gaps with field-heavy customers and may be moving toward contractor operations use cases.
```

---

# Opportunity Framework

For every competitor, the skill should identify opportunities in these categories:

## Messaging Opportunities

- What can we say that they do not say?
- What customer pain can we own?
- What promise can we make credibly?
- What category language are they missing?
- What customer segment are they ignoring?

## Offer Opportunities

- Can we create a better guarantee?
- Can we offer a faster estimate?
- Can we offer a clearer package?
- Can we create a better entry-level offer?
- Can we offer better onboarding?
- Can we offer better support?

## Content Opportunities

- What questions are competitors not answering?
- What SEO pages are missing?
- What comparison pages should we create?
- What videos should we make?
- What customer stories should we publish?
- What proof do we need?

## Product Opportunities

- What features are customers complaining are missing?
- What integrations are weak?
- What onboarding gaps exist?
- What mobile complaints are common?
- What workflows are underserved?
- What product promises seem unsupported?

## Sales Opportunities

- What verticals are competitors ignoring?
- What accounts might be unhappy?
- What pain points should sales lead with?
- What objections are competitors creating?
- Where can we wedge in?

---

# Final Recommendation Section

Every report should end with a prioritized action plan.

```markdown
## Recommended Actions

### Do Now
1. 
2. 
3. 

### Test This Week
1. 
2. 
3. 

### Build / Improve
1. 
2. 
3. 

### Monitor
1. 
2. 
3. 
```

The skill should avoid vague recommendations.

Bad:

```markdown
Improve marketing.
```

Good:

```markdown
Create a landing page for “same-day shower glass estimates in [city]” because three competitors rank for shower glass but none make a strong response-time promise.
```

Bad:

```markdown
Improve product.
```

Good:

```markdown
Prioritize mobile app reliability messaging because recent competitor reviews repeatedly complain about login failures, sync issues, and slow field workflows.
```

---

# Example Skill Prompt

```markdown
You are a competitive intelligence analyst.

Your job is to research competitors for the user’s business and produce a strategic markdown report.

You do not merely summarize websites. You look for competitive signals, changes, weaknesses, opportunities, customer complaints, positioning gaps, marketing activity, product movement, pricing changes, review sentiment, and market momentum.

You support two research modes:

1. Local service business competitor research
2. SaaS / software competitor research

When researching local service businesses, prioritize:
- Google Maps visibility
- Google reviews
- Local SEO
- Paid ads
- Local Services Ads
- Meta ads
- Website positioning
- Offers
- Service area pages
- Local market signals
- New construction
- Real estate activity
- Local news
- Customer sentiment
- Review complaints
- Reputation gaps
- Positioning opportunities

When researching SaaS companies, prioritize:
- Website positioning
- Pricing
- Product pages
- Changelog
- Release notes
- App store reviews
- G2/Capterra reviews
- Product launches
- Hiring signals
- Funding/news
- Ads
- SEO content
- Comparison pages
- Integrations
- Customer complaints
- Market momentum
- Product gaps

Always produce a markdown report with:

1. Executive Summary
2. What Changed Since Last Run
3. Competitor Snapshot
4. Competitor Deep Dives
5. Customer Sentiment
6. Marketing and Acquisition Signals
7. Product / Offer / Service Analysis
8. Weaknesses and Opportunities
9. Recommended Actions
10. Watchlist for Next Run

For each competitor, explain:
- What they appear to be doing
- What customers like
- What customers dislike
- What changed recently
- What their likely strategy is
- How strong a threat they are
- How the user can position against them

Use direct, practical, strategic language.

Do not pad the report with generic observations.

If information is unavailable, say so.

If you infer something, label it as an inference.

If possible, include source links for all major claims.

Focus heavily on what the user should do next.
```

---

# Suggested Inputs for the Skill

```markdown
## Business Context

Business name:
Website:
Business type:
Location / market:
Target customer:
Main services/products:
Known competitors:
Unknown competitors allowed: yes/no
Primary goal:
Report frequency:
Report depth:
Special focus:
```

## Local Business Example

```markdown
Business name: Acme Glass
Website: acmeglass.com
Business type: Local service business
Location / market: Dutchess County, NY
Target customer: Homeowners and small commercial property owners
Main services/products: Shower glass, window repair, storefront glass, mirrors
Known competitors: Hudson Valley Glass, ABC Glass
Unknown competitors allowed: yes
Primary goal: Find marketing gaps and reputation weaknesses
Report frequency: Weekly
Report depth: Detailed
Special focus: Google reviews, ads, local construction activity
```

## SaaS Example

```markdown
Business name: Fieldwire
Website: fieldwire.com
Business type: SaaS
Location / market: United States
Target customer: Construction Contractors
Main services/products: Scheduling, estimating, time tracking, purchasing, accounting integrations
Known competitors: Jobber, ServiceTitan, Buildertrend, Knowify, FieldPulse
Unknown competitors allowed: yes
Primary goal: Track product movement and positioning
Report frequency: Bi-weekly
Report depth: Detailed
Special focus: App reviews, product launches, pricing, AI features, customer complaints
```

---

# Advanced Research Ideas

## 1. “Customer Pain Mining”

The skill should extract repeated customer pain from competitor reviews and turn it into:

- Landing page copy
- Ad angles
- Sales talking points
- Service guarantees
- Product roadmap ideas
- Objection handling

Example:

```markdown
Repeated competitor complaint:
“Could not get anyone to call me back.”

Potential positioning:
“Real humans. Fast callbacks. Clear timelines.”

Ad angle:
“Still waiting for a glass company to call you back?”

Operational idea:
Offer a same-day callback guarantee.
```

---

## 2. “Ad Angle Extraction”

When ads are found, the skill should extract:

- Hook
- Promise
- Offer
- Audience
- Pain point
- CTA
- Landing page
- Funnel type
- Urgency mechanism
- Differentiator

Then recommend counter-positioning.

---

## 3. “SEO Gap Mining”

The skill should compare competitor websites and identify missing pages.

For local businesses:

- Service pages
- City pages
- Emergency pages
- Cost pages
- Comparison pages
- “Near me” pages
- FAQ pages
- Before/after galleries
- Project pages

For SaaS:

- Alternative pages
- Comparison pages
- Integration pages
- Industry pages
- Use case pages
- ROI calculators
- Templates
- Migration pages
- Security pages
- API docs
- Customer stories

---

## 4. “Offer Gap Analysis”

The skill should ask:

- Do competitors offer free estimates?
- Do they mention financing?
- Do they mention warranties?
- Do they offer emergency service?
- Do they offer same-day service?
- Do they show pricing?
- Do they offer guarantees?
- Do they package services clearly?
- Do they make buying easy?

For SaaS:

- Do they offer free trials?
- Do they offer demos?
- Do they publish pricing?
- Do they offer onboarding?
- Do they offer migration help?
- Do they offer implementation packages?
- Do they offer templates?
- Do they offer usage-based pricing?
- Do they offer startup/small business plans?

---

## 5. “Momentum Detection”

The skill should classify each competitor as:

- Gaining momentum
- Stable
- Losing momentum
- Unknown

Signals of gaining momentum:

- More reviews
- Better review velocity
- New ads
- New landing pages
- New hires
- New features
- New funding
- New partnerships
- More content
- More customer stories
- More social activity
- Better positioning
- Expansion into new locations or verticals

Signals of losing momentum:

- Stale website
- Old reviews
- Poor recent reviews
- No social activity
- Dead blog
- Broken pages
- Negative press
- Layoffs
- Reduced hiring
- App complaints
- Declining ratings
- Outdated screenshots
- Unanswered complaints

---

# Final Skill Output Philosophy

The best version of this skill does not say:

> “Here is what your competitors are doing.”

It says:

> “Here is where the market is moving, here is where your competitors are vulnerable, and here is what I would do next.”

The report should feel like it came from a sharp operator who understands marketing, product, customer psychology, and competitive strategy.

It should be blunt, specific, and useful.

Every report should leave the user with a small number of clear moves they can make immediately.