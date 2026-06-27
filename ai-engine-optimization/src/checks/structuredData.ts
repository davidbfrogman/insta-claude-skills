import type { StructuredDataResult } from '../types.js';

export function checkStructuredData(html: string): StructuredDataResult {
  const notes: string[] = [];

  // JSON-LD
  const jsonLdMatches = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const hasJsonLd = jsonLdMatches.length > 0;
  const jsonLdTypes: string[] = [];

  let jsonLdMatchesContent = false;
  for (const match of jsonLdMatches) {
    try {
      const data = JSON.parse(match[1]);
      const type = Array.isArray(data) ? data.map((d: { '@type'?: string }) => d['@type']).filter(Boolean) : [data['@type']];
      jsonLdTypes.push(...type.filter(Boolean));
      jsonLdMatchesContent = true; // Stub: assume valid JSON-LD matches content
    } catch {
      notes.push('Found JSON-LD script block that failed to parse');
    }
  }

  if (hasJsonLd) notes.push(`JSON-LD types found: ${jsonLdTypes.join(', ') || 'unknown'}`);
  else notes.push('No JSON-LD structured data found');

  // Open Graph
  const hasOpenGraph = /<meta[^>]+property=["']og:/i.test(html);
  if (!hasOpenGraph) notes.push('No Open Graph meta tags');

  // Twitter card
  const hasTwitterCard = /<meta[^>]+name=["']twitter:card["']/i.test(html);

  // Meta description
  const hasMetaDescription = /<meta[^>]+name=["']description["']/i.test(html);
  if (!hasMetaDescription) notes.push('No meta description tag');

  // Canonical
  const hasCanonical = /<link[^>]+rel=["']canonical["']/i.test(html);

  // Breadcrumbs (in JSON-LD or HTML)
  const hasBreadcrumbs = jsonLdTypes.includes('BreadcrumbList') ||
    /<[^>]+class=["'][^"']*breadcrumb[^"']*["']/i.test(html) ||
    /<nav[^>]+aria-label=["'][^"']*breadcrumb[^"']*["']/i.test(html);

  // Dates
  const hasDates = /<time[^>]+(datetime|pubdate)/i.test(html) ||
    /"datePublished"\s*:/i.test(html) ||
    /"dateModified"\s*:/i.test(html);

  // Scoring
  let score = 0;
  if (hasJsonLd && jsonLdTypes.length > 0) score += 4;
  else if (hasJsonLd) score += 2;
  if (jsonLdMatchesContent) score += 2;
  if (hasOpenGraph) score += 1;
  if (hasTwitterCard) score += 0.5;
  if (hasMetaDescription) score += 0.5;
  if (hasCanonical) score += 1;
  if (hasBreadcrumbs) score += 1;
  if (hasDates) score += 1;

  score = Math.round(score);
  if (score > 10) score = 10;

  return {
    score,
    maxScore: 10,
    details: {
      hasJsonLd,
      jsonLdTypes,
      jsonLdMatchesContent,
      hasOpenGraph,
      hasTwitterCard,
      hasMetaDescription,
      hasCanonical,
      hasBreadcrumbs,
      hasDates,
    },
    notes,
  };
}
