# AI Answer Readiness Scorer — Setup & Run Guide

Welcome! This tool scans a website and scores how well AI systems like ChatGPT and Google AI can find, read, understand, and cite it. The score comes back as a Markdown report you can open anywhere.

**You don't need to be technical to use this.** Just follow the steps below, or drop this file into Claude Code and it will handle everything for you.

---

## How to use this file with Claude Code

1. Open **Claude Code** on your computer
2. Drag this file (`INSTALL.md`) into the Claude Code window, or copy-paste the contents
3. Say: **"Please follow the instructions in this file"**
4. Claude will ask you for the website URL, handle all the setup, and deliver your report

That's it. The rest of this file is instructions Claude follows — you don't need to read it.

---

---

# INSTRUCTIONS FOR CLAUDE CODE

You are helping a non-technical user set up and run the AI Answer Readiness Scorer. This is a TypeScript CLI tool that crawls a website and scores how AI-friendly it is.

**Your job:** Walk the user through setup and run the tool for them. Do all the technical work. Explain what you're doing in plain, friendly language — no jargon, no raw error messages. If something goes wrong, diagnose it and fix it without alarming the user. Never show a raw stack trace to the user.

Work through these steps in order.

---

## STEP 1 — Find the project folder

The user unzipped a folder called `ai-answer-scorer` somewhere on their computer (likely Desktop, Downloads, or Documents). You need to find it.

First, check common locations:

```bash
find ~/Desktop ~/Downloads ~/Documents -maxdepth 2 -name "ai-answer-scorer" -type d 2>/dev/null | head -5
```

If that finds it, use that path for everything that follows. If it finds more than one, use the most recently modified one.

If nothing is found, ask the user: *"Where did you unzip the ai-answer-scorer folder? You can drag the folder into this window and I'll find the path automatically."*

Once you have the path, confirm it to the user in one sentence like: *"Found the project at [path]. Let's get started."*

---

## STEP 2 — Check what operating system we're on

```bash
uname -s 2>/dev/null || echo "windows"
```

- If output contains `Darwin` → this is a **Mac**
- If output contains `Linux` → this is **Linux**
- If the command failed or returned `windows` → this is **Windows**

Note the OS. You'll need it in Step 3.

---

## STEP 3 — Check if Node.js is installed

```bash
node --version 2>/dev/null || echo "NOT_FOUND"
```

**If Node.js is found (output starts with `v`):**

Check that it's version 18 or higher. The version number is the first number after `v` (e.g. `v20.11.0` → version 20).

- If version is 18 or higher: tell the user *"Node.js is already installed — we're good to go."* Proceed to Step 4.
- If version is lower than 18: tell the user *"You have an older version of Node.js. We need to update it."* Then follow the update path for their OS below.

**If Node.js is NOT found:**

Tell the user: *"We need to install Node.js first — it's the engine that runs this tool. This is a one-time setup that takes about a minute."*

Then install it based on their OS:

### Mac — install via Homebrew

First check if Homebrew is installed:
```bash
which brew 2>/dev/null || echo "NOT_FOUND"
```

If Homebrew is found:
```bash
brew install node
```

If Homebrew is NOT found, install it first. Warn the user this will take a few minutes and ask them to leave the window open:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After Homebrew installs, add it to the PATH if on Apple Silicon (M1/M2/M3 Mac):
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile && eval "$(/opt/homebrew/bin/brew shellenv)"
```

Then install Node:
```bash
brew install node
```

### Windows — install via winget

```bash
winget install -e --id OpenJS.NodeJS.LTS
```

If winget isn't available, tell the user: *"Please download Node.js from nodejs.org — click the big green 'LTS' button, run the installer, then come back here and let me know when it's done."*

### Linux

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs
```

**After any installation, verify it worked:**
```bash
node --version
```

If this still fails, tell the user in plain language what happened and suggest they restart their terminal and try again, or ask for help.

---

## STEP 4 — Install the tool's dependencies

Navigate into the project folder (use the path you found in Step 1):

```bash
cd "[PROJECT_PATH]" && npm install
```

Replace `[PROJECT_PATH]` with the actual path from Step 1.

This downloads the small set of libraries the tool needs. It should take under 30 seconds.

If it fails:
- Check for a `node_modules` folder already present — if so, it may already be installed. Try proceeding to Step 5.
- If there's a permissions error on Mac/Linux, try: `sudo npm install`
- Tell the user what's happening in plain language.

---

## STEP 5 — Get the URL to scan

Ask the user:

*"What website would you like to scan? Please paste the full URL, including the https:// part (for example: https://yourcompany.com)."*

Wait for their response. Then validate the URL:
- Must start with `http://` or `https://`
- Must look like a real domain (has a dot in it)

If it doesn't look right, ask them to double-check: *"That URL doesn't look quite right — make sure it starts with https:// and doesn't have any extra spaces."*

Also ask (optional): *"How many pages should I scan? The default is 30, which covers most sites. You can say a smaller number like 10 for a quick check, or up to 40 for a thorough scan. Just press Enter to use the default."*

If they don't answer or say "default", use 30.

Store the URL as `TARGET_URL` and the page count as `MAX_PAGES`.

---

## STEP 6 — Run the scan

Tell the user: *"Starting the scan now. This usually takes 1–3 minutes depending on the site size. I'll update you as pages are crawled."*

Run the tool from inside the project folder:

```bash
cd "[PROJECT_PATH]" && MAX_PAGES=[MAX_PAGES] npx tsx src/index.ts [TARGET_URL]
```

Replace `[PROJECT_PATH]`, `[MAX_PAGES]`, and `[TARGET_URL]` with the actual values.

**While it runs**, narrate what's happening for the user in plain language. When you see lines like `[5/30] 200 https://...`, tell them something like: *"Scanning page 5 of 30..."*

**If the scan fails or errors out:**

Common issues and how to handle them:
- `ENOTFOUND` or `getaddrinfo` error → *"I couldn't reach that website. Please check that the URL is correct and that you're connected to the internet."*
- `ECONNREFUSED` → *"The website refused the connection. It may be blocking automated access, or the URL might be wrong."*
- `tsx: command not found` → run `npm install` again from the project folder, then retry
- Any TypeScript error → try `npm install` again; if it persists, copy the error message and tell the user to share it with whoever sent them this tool

---

## STEP 7 — Locate and open the report

After the scan completes, look for the output files. The tool will have printed their paths, which look like:

```
Markdown report: /path/to/report-domainname-2026-06-27.md
JSON data:       /path/to/report-domainname-2026-06-27.json
```

Open the Markdown report for the user. On Mac:
```bash
open "[REPORT_PATH]"
```

On Windows:
```bash
start "" "[REPORT_PATH]"
```

If the file opens in a text editor rather than a Markdown viewer, suggest the user open it in Claude.ai or paste it into a new Claude conversation for a nicely formatted view.

---

## STEP 8 — Summarize the results and explain next steps

Read the top section of the generated Markdown report (the Score Summary table) and summarize it for the user in 3–4 plain sentences. Something like:

*"Here's what I found: [Site] scored [X] out of 65 on the automated checks. The strongest areas were [categories with good scores]. The biggest opportunities for improvement are [categories with low scores]. The report file is saved on your computer at [path] — you can open it anytime."*

Then tell them about the AI scoring step:

*"The report includes a section at the bottom called 'AI Scoring' — it has the actual page text pulled from the site, along with a scoring guide. If you open that report in a new Claude conversation and say 'please score the content sections', Claude will fill in the remaining 35 points and give you the full score out of 100."*

---

## TROUBLESHOOTING REFERENCE

Use these if issues arise at any step. Never paste these directly to the user — translate them into plain language.

| Symptom | Likely cause | Fix |
|---|---|---|
| `node: command not found` after install | Shell hasn't reloaded | Run `source ~/.zprofile` (Mac) or restart terminal |
| `npm: command not found` | Node didn't install properly | Retry Node install |
| `Cannot find module` | `npm install` didn't complete | Re-run `npm install` in project folder |
| `DEPTH_ZERO_SELF_SIGNED_CERT` | Corporate proxy/VPN | Try running without VPN |
| Scan hangs for > 5 minutes | Site is very large or slow | Stop it (Ctrl+C) and rerun with `MAX_PAGES=10` |
| Empty or very low scores | Site is a JavaScript SPA | Note this in the results — the tool scores static HTML only |
| Report file not found | Tool errored mid-run | Check the output above for error messages |

---

## DONE

Once you've completed all steps and the user has their report, let them know:
- Where the report file is saved
- That they can run the tool again anytime for a different site by repeating Step 5 onward
- That they don't need to reinstall anything — Node and the dependencies are already set up

End with something friendly and brief.
