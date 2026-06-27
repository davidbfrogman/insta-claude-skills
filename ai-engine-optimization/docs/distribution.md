# Distribution & End-User Flow

## What Gets Shipped

The tool is packaged as a single zip file: `ai-answer-scorer.zip`

Run `./build-dist.sh` from the project root to build it. It stages files in `/tmp/ai-answer-scorer/` then zips from there so the archive root is `ai-answer-scorer/` (not a long absolute path).

**Contents of the zip:**

```
ai-answer-scorer/
├── START_HERE.html       ← User opens this first
├── INSTALL.md            ← Claude Code's instruction set
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    ├── crawler.ts
    ├── extract.ts
    ├── score.ts
    ├── report.ts
    ├── types.ts
    └── checks/
        ├── crawlability.ts
        ├── extractability.ts
        ├── structuredData.ts
        ├── markdownAccess.ts
        ├── freshness.ts
        └── pageExperience.ts
```

`node_modules/` is **not** included. Claude Code runs `npm install` as part of setup (Step 4 in INSTALL.md).

---

## End-User Flow

```
1. Download ai-answer-scorer.zip
        ↓
2. Unzip (double-click on Mac/Windows)
        ↓
3. Open START_HERE.html in a browser
   → Explains what the tool does, shows the 5-step flow
   → Step 1 (download/unzip) is pre-checked as done
        ↓
4. Open Claude Code
        ↓
5. Drag INSTALL.md into Claude Code
   → User types: "Please follow the instructions in this file"
        ↓
6. Claude Code takes over:
   a. Finds the project folder (already done — user is in it)
   b. Checks OS (Mac/Linux/Windows)
   c. Checks Node.js version (≥18 required), installs if missing
   d. Runs npm install
   e. Asks user for website URL and page count
   f. Runs: MAX_PAGES=N npx tsx src/index.ts <URL>
   g. Narrates progress as pages are scanned
   h. Opens the .md report when done
   i. Summarizes scores in plain language
        ↓
7. User follows up in Claude.ai (new conversation)
   → Pastes the .md report
   → Says "please score the content sections"
   → Claude fills in the 35 AI-scored points
```

---

## INSTALL.md Dual Role

`INSTALL.md` serves two audiences simultaneously:

- **Human reader:** The first 16 lines explain how to use the file with Claude Code, with zero technical jargon. The rest is invisible to a casual reader.
- **Claude Code operator:** The rest of the file is a step-by-step instruction set that Claude follows. It includes diagnostic branches, OS-specific install paths, error translations, and narration guidance.

The key design principle: **Claude translates all errors into plain language**. No raw stack traces are ever shown to the user. If something goes wrong, Claude diagnoses it and either fixes it or explains it simply.

---

## START_HERE.html Design

A self-contained, single-file HTML page with inline CSS. No external dependencies, no JavaScript. Opens in any browser immediately after unzip.

Key design choices:
- Step 1 (download/unzip) renders with a pre-checked checkmark — user sees progress already made
- The exact phrase to type into Claude Code is displayed in a dark callout box for easy copy
- The pro tip about Claude scoring is shown at step 5, not earlier (reduces cognitive load)
- Works offline — no CDN, no fonts, no analytics

---

## Rebuilding the Zip

```bash
# From inside ai-engine-optimization/
chmod +x build-dist.sh   # first time only
./build-dist.sh
```

The script will print the full path to the new zip and a content listing. The zip overwrites any previous `ai-answer-scorer.zip` in the same directory.

**To add a new file to the distribution**, add a `cp` line in `build-dist.sh` after the existing copy block.

---

## Report Output Files

Reports are written to `OUTPUT_DIR` (default: the project root, wherever `npx tsx` was run from).

Naming convention: `report-{sanitized-domain}-{YYYY-MM-DD}.{md,json}`

Examples:
- `report-example-com-2026-06-27.md`
- `report-getplyer-com-2026-06-27.json`

Domain sanitization: `hostname.replace(/[^a-z0-9]/gi, '-')` — dots and hyphens become hyphens, special chars stripped.

Both files are written on every run. Running the tool twice on the same day for the same domain will overwrite the previous files.

To save to a different location: `OUTPUT_DIR=~/Desktop npx tsx src/index.ts <URL>`

---

## Known Limitations

- **JavaScript SPAs score poorly** — content rendered by React/Vue/Angular won't be in the raw HTML. The tool detects and flags this but can't fix it.
- **Large sites are sampled** — `MAX_PAGES` caps the crawl. For sites with thousands of pages, the score reflects a sample. The BFS crawler prioritizes pages linked from the homepage.
- **Corporate proxies/VPNs** — may cause `DEPTH_ZERO_SELF_SIGNED_CERT` errors. Fix: run without VPN.
- **Rate limiting** — some sites block repeated automated requests. The tool uses a realistic User-Agent but has no retry logic or delay between batches.
- **Two stub checks** — broken link detection and popup detection both award their points unconditionally. These are marked in `scoring.md`.
