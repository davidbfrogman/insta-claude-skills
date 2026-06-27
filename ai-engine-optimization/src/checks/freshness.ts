import type { FreshnessResult } from '../types.js';
import type { SitemapData } from '../types.js';

const DATE_PATTERNS = [
  /(?:published|updated|posted|date)[:\s]+([A-Z][a-z]+ \d{1,2},?\s+\d{4})/i,
  /(\d{4}-\d{2}-\d{2})/,
  /<time[^>]+datetime=["']([^"']+)["']/i,
  /"datePublished"\s*:\s*["']([^"']+)["']/i,
  /"dateModified"\s*:\s*["']([^"']+)["']/i,
];

function extractDates(html: string): { published: string | null; updated: string | null } {
  let published: string | null = null;
  let updated: string | null = null;

  const pubMatch = html.match(/"datePublished"\s*:\s*["']([^"']+)["']/i);
  if (pubMatch) published = pubMatch[1];

  const modMatch = html.match(/"dateModified"\s*:\s*["']([^"']+)["']/i);
  if (modMatch) updated = modMatch[1];

  if (!published) {
    for (const pattern of DATE_PATTERNS) {
      const m = html.match(pattern);
      if (m) { published = m[1]; break; }
    }
  }

  return { published, updated };
}

export function checkFreshness(html: string, sitemap: SitemapData | null, pageUrl: string): FreshnessResult {
  const notes: string[] = [];

  const sitemapHasLastmod = sitemap?.hasLastmod ?? false;
  if (!sitemapHasLastmod) notes.push('Sitemap does not include <lastmod> dates');

  const { published, updated } = extractDates(html);
  const pageHasVisibleDates = !!(published || updated);

  if (published) notes.push(`Published date found: ${published}`);
  if (updated) notes.push(`Updated date found: ${updated}`);
  if (!pageHasVisibleDates) notes.push('No visible published or updated dates found on page');

  let score = 0;
  if (sitemapHasLastmod) score += 1;
  if (pageHasVisibleDates) score += 1;
  if (published) score += 1;
  if (updated) score += 1;
  // Broken links check skipped (too expensive in stub)
  score += 1; // assume no broken links for stub

  if (score > 5) score = 5;

  return {
    score,
    maxScore: 5,
    details: {
      sitemapHasLastmod,
      pageHasVisibleDates,
      publishedDate: published,
      updatedDate: updated,
    },
    notes,
  };
}
