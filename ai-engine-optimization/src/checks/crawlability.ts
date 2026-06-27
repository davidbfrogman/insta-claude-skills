import type { CrawlResult } from '../crawler.js';
import type { CrawlabilityResult } from '../types.js';

const AI_BOTS = ['OAI-SearchBot', 'GPTBot', 'Googlebot', 'Google-Extended'];

function isBotBlocked(robotsTxt: string, bot: string): boolean {
  const lines = robotsTxt.split('\n').map(l => l.trim());
  let inRelevantBlock = false;
  let inWildcardBlock = false;
  const disallows: string[] = [];
  const wildDisallows: string[] = [];

  for (const line of lines) {
    if (line.toLowerCase().startsWith('user-agent:')) {
      const agent = line.slice('user-agent:'.length).trim();
      inRelevantBlock = agent.toLowerCase() === bot.toLowerCase();
      inWildcardBlock = agent === '*';
    } else if (line.toLowerCase().startsWith('disallow:')) {
      const path = line.slice('disallow:'.length).trim();
      if (inRelevantBlock) disallows.push(path);
      if (inWildcardBlock) wildDisallows.push(path);
    }
  }

  // If there's a specific block for this bot, check it
  const relevantDisallows = disallows.length > 0 ? disallows : wildDisallows;
  return relevantDisallows.includes('/');
}

export function checkCrawlability(
  page: CrawlResult,
  robotsTxt: string | null,
  sitemapUrls: string[],
  allPageUrls: string[],
): CrawlabilityResult {
  const notes: string[] = [];

  // returns200
  const returns200 = page.status === 200;
  if (!returns200) notes.push(`Page returned HTTP ${page.status}`);

  // robots.txt bot access
  const botResults: Record<string, boolean> = {};
  for (const bot of AI_BOTS) {
    botResults[bot] = robotsTxt ? !isBotBlocked(robotsTxt, bot) : true;
    if (robotsTxt && !botResults[bot]) notes.push(`robots.txt blocks ${bot}`);
  }

  // sitemap
  const sitemapExists = sitemapUrls.length > 0;
  const sitemapIncludesPage = sitemapUrls.some(u => u === page.url || u === page.url.replace(/\/$/, ''));

  // indexability — check for noindex in meta or HTTP header
  const noindexMeta = /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(page.html);
  const noindexHeader = false; // Would need response headers; stub false
  const isIndexable = !noindexMeta && !noindexHeader;
  if (!isIndexable) notes.push('Page has noindex directive');

  // canonical
  const canonicalMatch = page.html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  const hasCanonical = !!canonicalMatch;
  const canonicalUrl = canonicalMatch?.[1] ?? '';
  const canonicalIsSelf = hasCanonical && (canonicalUrl === page.url || canonicalUrl === page.url.replace(/\/$/, ''));
  if (hasCanonical && !canonicalIsSelf) notes.push(`Canonical points to a different URL: ${canonicalUrl}`);

  // internal links to this page
  const otherPages = allPageUrls.filter(u => u !== page.url);
  const hasInternalLinksToPage = otherPages.some(u => {
    // We don't have other pages' HTML here, but we flag false for the homepage
    return false; // Stub — scored in aggregate pass
  });

  // Scoring
  let score = 0;
  if (returns200) score += 4;
  if (!robotsTxt || !isBotBlocked(robotsTxt, 'OAI-SearchBot')) score += 1;
  if (!robotsTxt || !isBotBlocked(robotsTxt, 'GPTBot')) score += 1;
  if (!robotsTxt || !isBotBlocked(robotsTxt, 'Googlebot')) score += 1;
  if (!robotsTxt || !isBotBlocked(robotsTxt, 'Google-Extended')) score += 1;
  if (sitemapExists) score += 3;
  if (sitemapIncludesPage) score += 0; // included in sitemapExists points
  if (isIndexable) score += 3;
  if (hasCanonical && canonicalIsSelf) score += 2;
  // Internal links: award 2 if we assume it's discoverable (refined in aggregate)
  score += 2;

  if (score > 20) score = 20;

  return {
    score,
    maxScore: 20,
    details: {
      returns200,
      robotsAllowsOAISearchBot: botResults['OAI-SearchBot'] ?? true,
      robotsAllowsGPTBot: botResults['GPTBot'] ?? true,
      robotsAllowsGooglebot: botResults['Googlebot'] ?? true,
      robotsAllowsGoogleExtended: botResults['Google-Extended'] ?? true,
      sitemapExists,
      sitemapIncludesPage,
      isIndexable,
      hasCanonical,
      canonicalIsSelf,
      hasInternalLinksToPage,
    },
    notes,
  };
}
