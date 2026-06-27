import type { MarkdownAccessResult } from '../types.js';

const FETCH_TIMEOUT = 8_000;
const UA = 'Mozilla/5.0 (compatible; AIAnswerScorer/1.0)';

async function tryFetch(url: string): Promise<{ ok: boolean; text: string }> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
    });
    if (res.ok) {
      const text = await res.text();
      return { ok: true, text };
    }
    return { ok: false, text: '' };
  } catch {
    return { ok: false, text: '' };
  }
}

export async function checkMarkdownAccess(pageUrl: string): Promise<MarkdownAccessResult> {
  const origin = new URL(pageUrl).origin;
  const notes: string[] = [];

  // Check /llms.txt
  const llmsTxt = await tryFetch(`${origin}/llms.txt`);
  const llmsTxtExists = llmsTxt.ok;
  let llmsTxtHasSummary = false;
  let llmsTxtHasLinks = false;
  let markdownIsDiscoverable = false;

  if (llmsTxtExists) {
    llmsTxtHasSummary = llmsTxt.text.length > 100;
    llmsTxtHasLinks = /\[.*?\]\(https?:\/\//i.test(llmsTxt.text) || /^https?:\/\//m.test(llmsTxt.text);
    markdownIsDiscoverable = /\.md/i.test(llmsTxt.text);
    notes.push('/llms.txt found');
    if (!llmsTxtHasSummary) notes.push('/llms.txt exists but is very short — add a site summary');
    if (!llmsTxtHasLinks) notes.push('/llms.txt has no links to important resources');
  } else {
    notes.push('/llms.txt not found — consider adding one for AI agents');
  }

  // Check for markdown versions of the current page
  const urlWithoutTrailingSlash = pageUrl.replace(/\/$/, '');
  const candidates = [
    `${urlWithoutTrailingSlash}.md`,
    `${urlWithoutTrailingSlash}?format=md`,
    `${urlWithoutTrailingSlash}/index.md`,
  ];

  let markdownVersionExists = false;
  let markdownVersionIsClean = false;

  for (const candidate of candidates) {
    const result = await tryFetch(candidate);
    if (result.ok && result.text.trim().startsWith('#')) {
      markdownVersionExists = true;
      // Clean = has headings, minimal HTML tags
      const htmlTagCount = (result.text.match(/<[a-z]/gi) ?? []).length;
      markdownVersionIsClean = htmlTagCount < 5;
      notes.push(`Markdown version found: ${candidate}`);
      break;
    }
  }

  if (!markdownVersionExists) notes.push('No markdown version of this page found (.md / ?format=md)');

  // Scoring
  let score = 0;
  if (llmsTxtExists) score += 2;
  if (llmsTxtHasSummary) score += 1;
  if (llmsTxtHasLinks) score += 1;
  if (markdownVersionExists) score += 3;
  if (markdownVersionIsClean) score += 1;
  if (markdownIsDiscoverable) score += 1;
  // +1 if linked from headers (stub: not implemented, skip)

  if (score > 10) score = 10;

  return {
    score,
    maxScore: 10,
    details: {
      llmsTxtExists,
      llmsTxtHasSummary,
      llmsTxtHasLinks,
      markdownVersionExists,
      markdownVersionIsClean,
      markdownIsDiscoverable,
    },
    notes,
  };
}
