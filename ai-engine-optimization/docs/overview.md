# AI Answer Readiness Scorer — System Overview

## What It Does

This is a TypeScript CLI tool that crawls a website and produces a scored report on how well AI systems (ChatGPT, Google AI, Claude) can discover, read, understand, and cite it. It's designed to be run by a non-technical user through Claude Code — Claude acts as the human-friendly operator.

The output is:
- A Markdown report (`.md`) with scores, findings, a priority fix list, and page excerpts for AI scoring
- A JSON data file (`.json`) with the full structured audit result

The scoring model is split:
- **65 points** are scored deterministically by the tool (automated checks)
- **35 points** are scored by Claude in a follow-up conversation using the rubric and page excerpts embedded in the report

---

## File Map

```
ai-engine-optimization/
├── src/
│   ├── index.ts          — CLI entrypoint: orchestrates the full pipeline
│   ├── crawler.ts        — HTTP fetcher + link extractor + BFS crawler
│   ├── extract.ts        — Pulls title, H1, main text, content stats from HTML
│   ├── score.ts          — Aggregates per-page check results into site-level scores
│   ├── report.ts         — Renders the Markdown report and writes both output files
│   ├── types.ts          — All shared TypeScript interfaces
│   └── checks/
│       ├── crawlability.ts   — AI bot access, robots.txt, sitemap, indexability
│       ├── extractability.ts — HTML content quality, JS dependency, semantic structure
│       ├── structuredData.ts — JSON-LD, Open Graph, meta tags, breadcrumbs, dates
│       ├── markdownAccess.ts — /llms.txt presence, markdown versions of pages
│       ├── freshness.ts      — Published/updated dates in HTML and sitemap lastmod
│       └── pageExperience.ts — Page size, image alt text, button/form accessibility
├── docs/
│   ├── overview.md       — This file
│   ├── scoring.md        — Full scoring rubric and check-by-check breakdown
│   └── distribution.md   — How the product is packaged and delivered to end users
├── INSTALL.md            — Setup guide (also Claude Code's instruction set)
├── START_HERE.html       — User-facing onboarding page bundled in the zip
├── build-dist.sh         — Packages everything into ai-answer-scorer.zip
├── package.json
└── tsconfig.json
```

---

## Runtime Pipeline

```
index.ts
  │
  ├── 1. Parse args: TARGET_URL, MAX_PAGES (env, default 30), OUTPUT_DIR (env, default ".")
  │
  ├── 2. Fetch site-level resources (parallel)
  │       fetchRobotsTxt(origin)  → string | null
  │       fetchSitemap(origin, robotsTxt) → SitemapData | null
  │
  ├── 3. Crawl pages
  │       crawlSite(startUrl, maxPages) → CrawlResult[]
  │       • BFS, concurrency=3, 10s timeout per page
  │       • Skips media/asset URLs, stays on same origin
  │       • Returns { url, status, html, fetchedAt }[]
  │
  ├── 4. Run checkMarkdownAccess(startUrl) once (site-level check)
  │       fetches /llms.txt and tries .md / ?format=md / /index.md URLs
  │
  ├── 5. For each crawled page:
  │       extractPage(html) → ExtractedPage (title, H1, mainText, content stats)
  │       checkCrawlability(...)   → score/20
  │       checkExtractability(...) → score/15
  │       checkStructuredData(...) → score/10
  │       markdownAccess (reused from step 4, non-homepage pages get score=0)
  │       checkFreshness(...)      → score/5
  │       checkPageExperience(...) → score/5
  │       → assembles PageResult
  │
  ├── 6. aggregateScores(audit)
  │       Averages per-page scores across all crawled pages per category
  │       Sums to deterministicTotal (max 65)
  │
  └── 7. writeReport(audit, outputDir)
          Renders Markdown report + JSON data file
          Prints file paths to stdout
```

---

## Running It

```bash
# Standard run
MAX_PAGES=30 npx tsx src/index.ts https://example.com

# Quick scan
MAX_PAGES=10 npx tsx src/index.ts https://example.com

# Save report to a specific folder
OUTPUT_DIR=~/Desktop MAX_PAGES=30 npx tsx src/index.ts https://example.com
```

**Environment variables:**

| Variable | Default | Description |
|---|---|---|
| `MAX_PAGES` | `30` | Max pages to crawl |
| `OUTPUT_DIR` | `.` (project root) | Where to write report files |

**Output files** are named `report-{domain}-{YYYY-MM-DD}.md` and `.json`.

---

## Dependencies

Only two runtime dependencies (see `package.json`):
- `cheerio` — HTML parsing and DOM querying (used in crawler, extract, and pageExperience)
- `tsx` — TypeScript execution (dev dependency, used via `npx tsx`)

No headless browser. No Playwright, Puppeteer, or external API calls. Scores are computed entirely from static HTML.

---

## Key Architectural Decisions

**Static HTML only.** The tool fetches raw HTML with a standard HTTP client. JavaScript-rendered content (SPAs, React/Vue apps) will show up as empty or low-scoring on extractability. This is by design — it reflects what most AI crawlers actually see.

**markdownAccess is site-level.** `/llms.txt` is checked once on the homepage. Non-homepage pages get `score: 0` for this category so it doesn't skew the average (the aggregator uses only `pages[0]` for this category).

**The 65/35 split.** Automated checks score technical signals — things a script can reliably detect. Content quality (answerability, entity clarity) requires judgment, so those 35 points are delegated to Claude via the rubric embedded in the report.

**Claude Code as the operator.** `INSTALL.md` is written as both human instructions and Claude Code instructions. A non-technical user drags it into Claude Code and Claude handles all setup, diagnostics, and running.
