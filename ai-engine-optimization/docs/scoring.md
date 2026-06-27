# Scoring Reference

Total possible: **100 points**
- 65 points scored automatically by the tool
- 35 points scored by Claude in a follow-up conversation

---

## Category Breakdown

| Category | Max | Scope | Method |
|---|---|---|---|
| Crawlability & AI Bot Access | 20 | Per-page, averaged | Automated |
| Text Extractability | 15 | Per-page, averaged | Automated |
| Structured Data | 10 | Per-page, averaged | Automated |
| Markdown / LLM Access | 10 | Homepage only | Automated |
| Freshness & Maintenance | 5 | Per-page, averaged | Automated |
| Page Experience | 5 | Per-page, averaged | Automated |
| Content Answerability | 20 | Per-page, averaged | Claude |
| Entity & Trust Clarity | 15 | Per-page, averaged | Claude |

---

## 1. Crawlability & AI Bot Access — 20 pts

File: `src/checks/crawlability.ts`

| Signal | Points | Notes |
|---|---|---|
| HTTP 200 response | 4 | |
| robots.txt allows OAI-SearchBot | 1 | If no robots.txt, assumes allowed |
| robots.txt allows GPTBot | 1 | Same |
| robots.txt allows Googlebot | 1 | Same |
| robots.txt allows Google-Extended | 1 | Same |
| Sitemap exists | 3 | Detected via /sitemap.xml or robots.txt Sitemap: directive |
| Page is indexable (no noindex) | 3 | Checks meta robots tag; HTTP header not checked (stub) |
| Self-referencing canonical | 2 | Canonical present and pointing to itself |
| Internal links (stub) | 2 | Currently always awards 2 (not implemented) |

**Robot blocking detection:** The parser walks the robots.txt line by line, tracking User-agent blocks. It merges specific bot blocks with the wildcard (`*`) block — specific block takes precedence if present. Only `Disallow: /` (full-site block) is treated as blocked; partial paths are not penalized.

**Known gap:** `sitemapIncludesPage` is checked but not scored separately — it's bundled into the `sitemapExists` points.

---

## 2. Text Extractability — 15 pts

File: `src/checks/extractability.ts` (uses `src/extract.ts`)

| Signal | Points | Notes |
|---|---|---|
| Main content in raw HTML (>200 chars) | 4 | Proxy for non-SPA |
| Content-to-HTML ratio > 5% | 3 | mainText.length / html.length |
| Semantic structure (headings + paragraphs or lists) | 2 | |
| JS not required (no SPA shell + has content) | 2 | Detects `<div id="root"></div>` or `<div id="app"></div>` |
| Rich formatting (≥2 headings + list or table) | 2 | |

**Content extraction:** `extractPage()` removes nav/header/footer/sidebar/modal/script/style elements, then tries to find a main content container via selectors like `main`, `article`, `.content`, `#content`, `.prose`. Falls back to `<body>` if none match.

**Content ratio** is the most commonly flagged issue on marketing sites — lots of CSS/JS in the HTML makes the ratio drop even if there's plenty of text.

---

## 3. Structured Data — 10 pts

File: `src/checks/structuredData.ts`

| Signal | Points | Notes |
|---|---|---|
| JSON-LD with typed schema | 4 | Requires valid JSON-LD with `@type` |
| JSON-LD present (untyped) | 2 | Fallback if no @type found |
| JSON-LD parses and matches content | 2 | Currently stub — awards 2 if JSON parses |
| Open Graph tags | 1 | `og:*` meta properties |
| Twitter Card | 0.5 | `twitter:card` meta |
| Meta description | 0.5 | |
| Canonical tag | 1 | |
| Breadcrumbs | 1 | JSON-LD BreadcrumbList or HTML class/aria-label |
| Dates in markup | 1 | `<time datetime>`, `datePublished`, or `dateModified` in JSON-LD |

Score is `Math.round()`'d and capped at 10.

**Known stub:** `jsonLdMatchesContent` currently awards 2 points automatically if the JSON-LD block parses. A real implementation would cross-check the JSON-LD entity names against the page text.

---

## 4. Markdown / LLM Access — 10 pts

File: `src/checks/markdownAccess.ts`

Scored **once per site** based on the homepage URL. All other pages inherit the check result but receive `score: 0` so the site-level average is based solely on this single check.

| Signal | Points | Notes |
|---|---|---|
| /llms.txt exists | 2 | |
| /llms.txt has substantial content (>100 chars) | 1 | |
| /llms.txt has links | 1 | Detects markdown links or bare https:// URLs |
| Markdown version of page exists | 3 | Tries `.md`, `?format=md`, `/index.md` in order |
| Markdown version is clean (< 5 HTML tags) | 1 | Checks the fetched .md file for stray HTML |
| Markdown is discoverable via /llms.txt | 1 | /llms.txt mentions a `.md` file |

This is the category most sites score 0 on. `/llms.txt` is a relatively new convention (inspired by `robots.txt`) specifically for telling AI agents about a site's content structure.

---

## 5. Freshness & Maintenance — 5 pts

File: `src/checks/freshness.ts`

| Signal | Points | Notes |
|---|---|---|
| Sitemap includes `<lastmod>` | 1 | |
| Page has visible date (published or updated) | 1 | Awarded if either date found |
| Published date found | 1 | JSON-LD `datePublished` or text patterns |
| Updated/modified date found | 1 | JSON-LD `dateModified` |
| No broken links (stub) | 1 | Always awarded — not implemented |

**Date detection** checks JSON-LD `datePublished`/`dateModified` first, then falls back to a set of regex patterns: `<time datetime="...">`, ISO dates (`YYYY-MM-DD`), and natural language patterns like `Published: June 1, 2025`.

**Known stub:** The broken links check is skipped and always awards 1 point. Implementing it would require fetching every outbound link, which is expensive and out of scope.

---

## 6. Page Experience — 5 pts

File: `src/checks/pageExperience.ts`

| Signal | Points | Notes |
|---|---|---|
| HTML < 300 KB | 1 | Measures raw HTML byte size |
| Images have alt text (>80% coverage) | 1 | |
| Buttons have accessible labels (>80%) | 1 | Checks text, aria-label, title |
| Form inputs have labels (≥50% coverage) | 1 | |
| No intrusive popups (stub) | 1 | Always awarded — can't detect without browser |

These signals matter for AI readiness because large, inaccessible pages signal low content quality and may be harder for crawlers to parse efficiently.

---

## 7. Content Answerability — 20 pts (Claude-scored)

Scored by Claude after reading the page excerpts in the report.

| Signal | Points |
|---|---|
| Clear primary topic in title, H1, intro, and body | 4 |
| Page directly answers likely user questions in plain language | 5 |
| Includes specific facts: definitions, comparisons, pricing, steps, use cases | 4 |
| Section headings map to search/answer queries | 3 |
| Non-generic, non-commodity content — only this company can say this | 4 |

---

## 8. Entity & Trust Clarity — 15 pts (Claude-scored)

| Signal | Points |
|---|---|
| Organization/entity clearly named and consistently described | 3 |
| Product/service category is explicit | 3 |
| Target customer/use case is explicit | 3 |
| Author, contact, about info available | 2 |
| Claims supported with proof: case studies, customer names, data, dates | 3 |
| No vague or unverifiable claims | 1 |

---

## Grade Labels

Applied per-category based on percentage of max:

| % of Max | Label |
|---|---|
| ≥ 90% | Excellent |
| ≥ 75% | Good |
| ≥ 60% | Fair |
| ≥ 40% | Weak |
| < 40% | Poor |

---

## Score Aggregation

All per-page scores are **averaged** across all crawled pages (not summed). This means a site with one perfect page and 29 broken pages will score poorly — which is the right behavior.

`markdownAccess` is the exception: only `pages[0]` (homepage) contributes. The aggregator hardcodes this:

```ts
const markdownAccess = toCategory(pages[0]?.checks.markdownAccess.score ?? 0, 10);
```

The `deterministicMax` is hardcoded to `65` — the sum of all automated category maximums.

---

## Adding a New Check

1. Create `src/checks/yourcheck.ts` — export a function that returns `{ score, maxScore, details, notes[] }`
2. Add the result interface to `src/types.ts` under `PageChecks`
3. Import and call in `src/index.ts` inside the per-page loop
4. Add to `aggregateScores()` in `src/score.ts` with the right max
5. Add a section to the report renderer in `src/report.ts`
6. Update `deterministicMax` in `src/score.ts` to reflect the new total
