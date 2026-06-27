import type { SiteAudit } from './types.js';
import * as fs from 'fs';
import * as path from 'path';

function bar(score: number, max: number, width = 20): string {
  const filled = Math.round((score / max) * width);
  return '█'.repeat(filled) + '░'.repeat(width - filled);
}

function gradeEmoji(percent: number): string {
  if (percent >= 90) return '🟢';
  if (percent >= 75) return '🟡';
  if (percent >= 60) return '🟠';
  return '🔴';
}

export function renderMarkdownReport(audit: SiteAudit): string {
  const s = audit.scores;
  const date = new Date(audit.crawledAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const lines: string[] = [];

  lines.push(`# AI Answer Readiness Report`);
  lines.push(`**Site:** ${audit.url}  `);
  lines.push(`**Crawled:** ${date}  `);
  lines.push(`**Pages analyzed:** ${audit.pageCount}  `);
  lines.push('');

  // Score summary
  lines.push('## Score Summary');
  lines.push('');
  lines.push('> **Note:** This report scores 65 deterministic points automatically.');
  lines.push('> The remaining 35 points (Content Answerability + Entity & Trust) require');
  lines.push('> Claude to evaluate. See the **AI Scoring Section** at the bottom and ask');
  lines.push('> Claude to complete it.');
  lines.push('');
  lines.push(`| Category | Score | Max | Grade |`);
  lines.push(`|---|---|---|---|`);
  lines.push(`| Crawlability & AI Bot Access | ${s.crawlability.score} | 20 | ${gradeEmoji(s.crawlability.percent)} ${s.crawlability.label} |`);
  lines.push(`| Text Extractability | ${s.extractability.score} | 15 | ${gradeEmoji(s.extractability.percent)} ${s.extractability.label} |`);
  lines.push(`| Structured Data | ${s.structuredData.score} | 10 | ${gradeEmoji(s.structuredData.percent)} ${s.structuredData.label} |`);
  lines.push(`| Markdown / LLM Access | ${s.markdownAccess.score} | 10 | ${gradeEmoji(s.markdownAccess.percent)} ${s.markdownAccess.label} |`);
  lines.push(`| Freshness & Maintenance | ${s.freshness.score} | 5 | ${gradeEmoji(s.freshness.percent)} ${s.freshness.label} |`);
  lines.push(`| Page Experience (static) | ${s.pageExperience.score} | 5 | ${gradeEmoji(s.pageExperience.percent)} ${s.pageExperience.label} |`);
  lines.push(`| **Content Answerability** | *pending* | 20 | *(see below)* |`);
  lines.push(`| **Entity & Trust Clarity** | *pending* | 15 | *(see below)* |`);
  lines.push(`| **TOTAL (auto)** | **${s.deterministicTotal}** | 65 | ${gradeEmoji(s.deterministicPercent)} |`);
  lines.push(`| **TOTAL (full/100)** | *pending* | 100 | *(after Claude scores)* |`);
  lines.push('');

  lines.push(`### Auto-Score Visual`);
  lines.push('');
  lines.push(`\`\`\``);
  lines.push(`Crawlability  ${bar(s.crawlability.score, 20)} ${s.crawlability.score}/20`);
  lines.push(`Extractability ${bar(s.extractability.score, 15)} ${s.extractability.score}/15`);
  lines.push(`Struct. Data  ${bar(s.structuredData.score, 10)} ${s.structuredData.score}/10`);
  lines.push(`Markdown/LLM  ${bar(s.markdownAccess.score, 10)} ${s.markdownAccess.score}/10`);
  lines.push(`Freshness     ${bar(s.freshness.score, 5)} ${s.freshness.score}/5`);
  lines.push(`Page Exp.     ${bar(s.pageExperience.score, 5)} ${s.pageExperience.score}/5`);
  lines.push(`Auto Total    ${bar(s.deterministicTotal, 65)} ${s.deterministicTotal}/65 (${s.deterministicPercent}%)`);
  lines.push(`\`\`\``);
  lines.push('');

  // Per-category findings
  lines.push('---');
  lines.push('');
  lines.push('## Category Findings');
  lines.push('');

  // Collect all unique notes per category across pages
  const categorize = (cat: 'crawlability' | 'extractability' | 'structuredData' | 'markdownAccess' | 'freshness' | 'pageExperience') => {
    const allNotes = new Set<string>();
    for (const page of audit.pages) {
      for (const note of page.checks[cat].notes) allNotes.add(note);
    }
    return [...allNotes];
  };

  lines.push('### Crawlability & AI Bot Access');
  lines.push('');
  const crawlNotes = categorize('crawlability');
  if (crawlNotes.length) crawlNotes.forEach(n => lines.push(`- ${n}`));
  else lines.push('- No issues found.');
  lines.push('');

  lines.push('### Text Extractability');
  lines.push('');
  const extractNotes = categorize('extractability');
  if (extractNotes.length) extractNotes.forEach(n => lines.push(`- ${n}`));
  else lines.push('- No issues found.');
  lines.push('');

  lines.push('### Structured Data');
  lines.push('');
  const sdNotes = categorize('structuredData');
  if (sdNotes.length) sdNotes.forEach(n => lines.push(`- ${n}`));
  else lines.push('- No issues found.');
  lines.push('');

  lines.push('### Markdown / LLM Access');
  lines.push('');
  const mdNotes = categorize('markdownAccess');
  if (mdNotes.length) mdNotes.forEach(n => lines.push(`- ${n}`));
  else lines.push('- No issues found.');
  lines.push('');

  lines.push('### Freshness');
  lines.push('');
  const freshNotes = categorize('freshness');
  if (freshNotes.length) freshNotes.forEach(n => lines.push(`- ${n}`));
  else lines.push('- No issues found.');
  lines.push('');

  // Per-page table
  lines.push('---');
  lines.push('');
  lines.push('## Per-Page Scores');
  lines.push('');
  lines.push('| Page | Status | Crawl | Extract | Struct | Fresh | Exp |');
  lines.push('|---|---|---|---|---|---|---|');
  for (const page of audit.pages) {
    const c = page.checks;
    const shortUrl = page.url.replace(audit.url.replace(/\/$/, ''), '') || '/';
    lines.push(`| ${shortUrl} | ${page.status} | ${c.crawlability.score}/20 | ${c.extractability.score}/15 | ${c.structuredData.score}/10 | ${c.freshness.score}/5 | ${c.pageExperience.score}/5 |`);
  }
  lines.push('');

  // Priority fix list
  lines.push('---');
  lines.push('');
  lines.push('## Priority Fix List');
  lines.push('');
  lines.push('*(Highest-impact items first, based on auto-scoring)*');
  lines.push('');

  const fixes: Array<{ priority: number; fix: string }> = [];

  if (s.crawlability.score < 15) fixes.push({ priority: 1, fix: 'Review robots.txt — ensure OAI-SearchBot and GPTBot are not blocked if you want ChatGPT/Google AI visibility' });
  if (!audit.sitemap) fixes.push({ priority: 1, fix: 'Create and submit an XML sitemap' });
  if (s.extractability.score < 10) fixes.push({ priority: 2, fix: 'Reduce JavaScript dependency for main content — use server-side rendering or static HTML' });
  if (s.markdownAccess.score < 4) fixes.push({ priority: 2, fix: 'Add /llms.txt with a brief site summary and links to key pages' });
  if (s.structuredData.score < 5) fixes.push({ priority: 3, fix: 'Add JSON-LD structured data: at minimum Organization, WebSite, and relevant page types' });
  if (s.freshness.score < 3) fixes.push({ priority: 3, fix: 'Add published/updated dates to content pages; add <lastmod> to sitemap' });

  fixes.sort((a, b) => a.priority - b.priority);
  if (fixes.length === 0) lines.push('- No major auto-detected issues. Review the AI scoring section below.');
  else fixes.forEach(f => lines.push(`- **[Priority ${f.priority}]** ${f.fix}`));
  lines.push('');

  // AI SCORING SECTION
  lines.push('---');
  lines.push('');
  lines.push('## AI Scoring Section');
  lines.push('');
  lines.push('> **Instructions for Claude:** Read the page excerpts below, then score each section');
  lines.push('> using the rubric provided. Replace each `[ score / max ]` with your assessment.');
  lines.push('> After scoring all pages, compute the averages and fill in the final score above.');
  lines.push('');
  lines.push('### Content Answerability Rubric (20 points total)');
  lines.push('');
  lines.push('Score each page on:');
  lines.push('- **4 pts** — Clear primary topic in title, H1, intro, and body');
  lines.push('- **5 pts** — Page directly answers likely user questions in plain language');
  lines.push('- **4 pts** — Includes specific facts, definitions, comparisons, pricing, steps, or use cases');
  lines.push('- **3 pts** — Section headings map to search/answer queries');
  lines.push('- **4 pts** — Non-generic, non-commodity content — things only this company/product can say');
  lines.push('');
  lines.push('### Entity & Trust Clarity Rubric (15 points total)');
  lines.push('');
  lines.push('Score each page on:');
  lines.push('- **3 pts** — Organization/entity clearly named and consistently described');
  lines.push('- **3 pts** — Product/service category is explicit');
  lines.push('- **3 pts** — Target customer/use case is explicit');
  lines.push('- **2 pts** — Author, contact, about info available');
  lines.push('- **3 pts** — Claims supported with proof: case studies, customer names, data, dates');
  lines.push('- **1 pt** — No vague or unverifiable claims');
  lines.push('');

  // Page text dumps
  lines.push('---');
  lines.push('');
  lines.push('## Page Content Excerpts');
  lines.push('');

  for (const page of audit.pages) {
    lines.push(`### ${page.url}`);
    lines.push('');
    lines.push(`**Title:** ${page.title || '(none)'}  `);
    lines.push(`**H1:** ${page.h1 || '(none)'}  `);
    lines.push('');
    // Truncate to ~1500 chars per page
    const excerpt = page.mainText.slice(0, 1500);
    lines.push('```');
    lines.push(excerpt + (page.mainText.length > 1500 ? '\n...[truncated]' : ''));
    lines.push('```');
    lines.push('');
    lines.push('**Claude: score this page**');
    lines.push('');
    lines.push('| Category | Score | Notes |');
    lines.push('|---|---|---|');
    lines.push('| Content Answerability | [ /20 ] | |');
    lines.push('| Entity & Trust Clarity | [ /15 ] | |');
    lines.push('');
  }

  return lines.join('\n');
}

export function writeReport(audit: SiteAudit, outputDir: string): { mdPath: string; jsonPath: string } {
  const timestamp = new Date().toISOString().slice(0, 10);
  const safeDomain = new URL(audit.url).hostname.replace(/[^a-z0-9]/gi, '-');
  const baseName = `report-${safeDomain}-${timestamp}`;

  const mdPath = path.join(outputDir, `${baseName}.md`);
  const jsonPath = path.join(outputDir, `${baseName}.json`);

  fs.writeFileSync(mdPath, renderMarkdownReport(audit), 'utf8');
  fs.writeFileSync(jsonPath, JSON.stringify(audit, null, 2), 'utf8');

  return { mdPath, jsonPath };
}
