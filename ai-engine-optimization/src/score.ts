import type { SiteAudit, SiteScores, CategoryScore } from './types.js';

function avg(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function toCategory(score: number, max: number): CategoryScore {
  const percent = max > 0 ? Math.round((score / max) * 100) : 0;
  let label = 'Poor';
  if (percent >= 90) label = 'Excellent';
  else if (percent >= 75) label = 'Good';
  else if (percent >= 60) label = 'Fair';
  else if (percent >= 40) label = 'Weak';
  return { score: Math.round(score), max, percent, label };
}

export function aggregateScores(audit: SiteAudit): SiteScores {
  const pages = audit.pages;
  if (pages.length === 0) {
    const empty = toCategory(0, 0);
    return {
      crawlability: empty,
      extractability: empty,
      structuredData: empty,
      markdownAccess: empty,
      freshness: empty,
      pageExperience: empty,
      deterministicTotal: 0,
      deterministicMax: 65,
      deterministicPercent: 0,
    };
  }

  const crawlability = toCategory(
    avg(pages.map(p => p.checks.crawlability.score)),
    20,
  );
  const extractability = toCategory(
    avg(pages.map(p => p.checks.extractability.score)),
    15,
  );
  const structuredData = toCategory(
    avg(pages.map(p => p.checks.structuredData.score)),
    10,
  );
  // Markdown: only score based on homepage (llms.txt is site-level)
  const markdownAccess = toCategory(
    pages[0]?.checks.markdownAccess.score ?? 0,
    10,
  );
  const freshness = toCategory(
    avg(pages.map(p => p.checks.freshness.score)),
    5,
  );
  const pageExperience = toCategory(
    avg(pages.map(p => p.checks.pageExperience.score)),
    5,
  );

  const deterministicTotal =
    crawlability.score +
    extractability.score +
    structuredData.score +
    markdownAccess.score +
    freshness.score +
    pageExperience.score;

  const deterministicMax = 65;
  const deterministicPercent = Math.round((deterministicTotal / deterministicMax) * 100);

  return {
    crawlability,
    extractability,
    structuredData,
    markdownAccess,
    freshness,
    pageExperience,
    deterministicTotal,
    deterministicMax,
    deterministicPercent,
  };
}
