import type { ExtractedPage } from '../extract.js';
import type { ExtractabilityResult } from '../types.js';

export function checkExtractability(extracted: ExtractedPage, rawHtml: string): ExtractabilityResult {
  const notes: string[] = [];

  // Main content in HTML (not JS-rendered)
  const textLength = extracted.mainText.length;
  const mainContentInHtml = textLength > 200;
  if (!mainContentInHtml) notes.push('Very little text found in raw HTML — page may require JavaScript to render content');

  // Content ratio: main text length vs total HTML size
  const contentRatio = extracted.contentRatio;
  const goodRatio = contentRatio > 0.05;
  if (!goodRatio) notes.push(`Content-to-HTML ratio is low (${(contentRatio * 100).toFixed(1)}%) — lots of nav/chrome relative to content`);

  // Semantic structure
  const hasSemanticStructure = extracted.headingCount > 0 && (extracted.paragraphCount > 0 || extracted.listCount > 0);
  if (!hasSemanticStructure) notes.push('Page lacks semantic structure (no headings + paragraphs/lists)');

  // JS dependency proxy: look for common SPA patterns
  const hasSpaShell = /<div id=["']root["']>\s*<\/div>/i.test(rawHtml) || /<div id=["']app["']>\s*<\/div>/i.test(rawHtml);
  const jsNotRequired = !hasSpaShell && mainContentInHtml;
  if (hasSpaShell) notes.push('Page appears to be a JavaScript SPA — content may not be visible to crawlers');

  // Scoring
  let score = 0;
  if (mainContentInHtml) score += 4;
  if (goodRatio) score += 3;
  if (hasSemanticStructure) score += 2;
  if (jsNotRequired) score += 2;
  // Text richness (headings + lists + tables)
  const hasRichFormatting = extracted.headingCount >= 2 && (extracted.listCount > 0 || extracted.tableCount > 0);
  if (hasRichFormatting) score += 2;
  if (extracted.tableCount > 0) notes.push(`Page has ${extracted.tableCount} table(s) — good for structured data extraction`);

  if (score > 15) score = 15;

  return {
    score,
    maxScore: 15,
    details: {
      mainContentInHtml,
      contentRatio,
      hasSemanticStructure,
      jsNotRequired,
      textLength,
      headingCount: extracted.headingCount,
      listCount: extracted.listCount,
      tableCount: extracted.tableCount,
    },
    notes,
  };
}
