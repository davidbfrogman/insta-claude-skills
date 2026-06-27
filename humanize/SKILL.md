---
name: humanize
description: >
  Audits text for "AI writing tells" — em dashes, hedging, rule-of-three,
  reversal framing, bullet-itis, sycophantic openers, delve/moreover/furthermore,
  and 50+ other patterns from a severity-rated ruleset — then rewrites to remove
  them while preserving the author's voice, and self-checks the rewrite for newly
  introduced tells. Use whenever the user pastes text and asks to "humanize this",
  "make this sound less AI-written/less like ChatGPT", "remove the AI tells",
  "de-AI this", "check this for AI writing patterns", or similar — even if they
  don't name the skill directly. Also use proactively if the user asks for a
  general critique of writing quality on a pasted passage.
---

# Humanize

## Why this exists

Most of the patterns this skill looks for are legitimate writing tools — an em
dash, a rule of three, a rhetorical question, a bulleted list. Each one is fine
on its own. What gives writing an "AI" feel is when these tools show up
*reflexively*, with no specific intent, and *mechanically*, the same way every
time. A human writer uses an em dash once because this particular sentence
needed a break. An LLM uses one in every third sentence because that's the
statistical groove it's in.

So treat `references/ai-writing-tells.json` as a lens for spotting
unmotivated, repetitive patterns — not as a banned-word list to mechanically
strip. If a pattern appears once, with clear purpose, and the rest of the
piece doesn't lean on it, it's probably not worth touching even if it's
technically "in the catalog."

## The ruleset

`references/ai-writing-tells.json` is the full catalog: 60 patterns across 7
categories (`punctuation`, `vocabulary`, `sentence_and_phrase_patterns`,
`structure_and_formatting`, `tone_and_voice`, `fiction_specific`,
`editing_and_revision_habits`). Each pattern has a `severity` (1-5), a
`description`, `examples`, and a `fix`/`prompt_instruction`.

Read this file fresh at the start of the audit, and read it again before the
self-review pass. The categories and severities are the backbone of this
skill's output structure — don't rely on a memorized summary of the rules,
and don't flatten them into vague "sounds AI-ish" gut checks.

Skip the `fiction_specific` category unless the input is clearly narrative
prose (a scene, story excerpt, or similar) — its patterns don't map onto
emails, posts, docs, or other non-fiction text.

## Workflow

### Step 1 — Audit

Go through the input against each of the 6 (or 7, for fiction) relevant
categories in the JSON. For every match, note:

- the category and pattern name
- its severity
- the exact span of text that triggered it (quote it)
- a one-line reason it's a fit here — not just "matches the pattern," but why
  *this instance* reads as reflexive/mechanical rather than purposeful

Audit everything you find, including severity 1-2 items — they get reported,
just not necessarily fixed (see Step 2).

### Step 2 — Rewrite

By default, fix everything severity ≥3. Leave severity 1-2 items
(`smart_quotes`, `single_character_ellipsis`, etc.) noted but untouched unless
fixing them is essentially free and carries zero risk to voice.

The biggest risk at this stage is the skill's own version of an AI tell:
`restructuring_during_edits` (severity 3) — rewriting more than was asked,
reordering sections, adding headers, or smoothing out a voice that wasn't
actually the problem. Make the smallest set of changes that resolves what you
flagged. Preserve the author's vocabulary level, sentence rhythm, and
formatting choices except where *that specific thing* is what you flagged.

After presenting the results, you can offer to do a second, more aggressive
pass that also addresses the severity 1-2 items — but don't do this
unprompted.

### Step 3 — Self-review

Re-run the Step 1 audit, this time against your rewrite, using the same JSON
categories. Check two things:

1. **Resolved** — are the originally-flagged violations actually gone?
2. **No new tells introduced** — did the rewrite trade one pattern for
   another? This is the failure mode to watch for: removing em dashes by
   restructuring into short fragments (`asyndeton`), or fixing a vocabulary
   issue by adding a "the truth is..." reversal sentence that wasn't there
   before.

If the self-review turns up new severity ≥3 issues, do **one** additional
targeted revision pass aimed only at those issues, then run the self-review
once more for reporting purposes. Don't loop further than that — two rewrite
passes total, maximum. Anything still flagged after that gets reported
honestly as residual, with a reason (low severity, voice trade-off, or
genuinely unavoidable given the content).

## Output format

Use this structure:

### Audit Summary
Findings grouped by category. For each: pattern name, severity, the quoted
span, and the one-line reason. If nothing was found, say so plainly — don't
pad this with praise about how clean the writing already is
(`sycophantic_validation` is itself one of the patterns in the catalog).

### Rewritten Text
The revised text, clearly delimited from the rest of the response. Omit this
section entirely if the audit found nothing to fix.

### Change Log
Map findings to what changed and why, grouped by category/severity. If the
same pattern occurs many times (e.g. a dozen em dashes), group them rather
than itemizing each one. Note anything left unchanged and why (low severity,
voice preservation, explicit user instruction).

### Self-Review Verdict
State plainly: which original issues were resolved, whether any new issues
were introduced (and what they were), whether a second revision pass ran, and
any residual issues with their rationale.

## Judgment notes and edge cases

- **Scope is conversational text**, not files or whole documents. If the user
  wants a full file or long document processed, ask them to paste the
  relevant excerpt instead of reading the file yourself.
- **Code and technical text**: if the input mixes prose with code (comments,
  docstrings, markdown around snippets), only audit and rewrite the prose.
  Leave code syntax, identifiers, and technical terms alone even if they
  technically match a pattern (e.g., "utilize" inside an API name).
- **Explicit style overrides win**: if the user says something like "this is a
  poem, keep the em dashes" or "I want it to sound formal," that instruction
  overrides the default severity thresholds for the relevant patterns.
- **Already-clean text**: if the audit finds nothing worth fixing, say so
  directly and skip the Rewritten Text and Change Log sections. Don't invent
  issues to seem thorough.
- **Voice over purity**: when a low-severity fix would meaningfully change how
  a sentence sounds, leaving it alone is usually the right call — note it in
  the audit, skip it in the rewrite.
