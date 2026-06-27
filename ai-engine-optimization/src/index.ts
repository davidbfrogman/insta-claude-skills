#!/usr/bin/env node
import { crawlSite, fetchRobotsTxt, fetchSitemap } from './crawler.js';
import { extractPage } from './extract.js';
import { checkCrawlability } from './checks/crawlability.js';
import { checkExtractability } from './checks/extractability.js';
import { checkStructuredData } from './checks/structuredData.js';
import { checkMarkdownAccess } from './checks/markdownAccess.js';
import { checkFreshness } from './checks/freshness.js';
import { checkPageExperience } from './checks/pageExperience.js';
import { aggregateScores } from './score.js';
import { writeReport } from './report.js';
import type { PageResult, SiteAudit } from './types.js';
import * as path from 'path';

async function main() {
  const urlArg = process.argv[2];
  if (!urlArg) {
    console.error('Usage: npx tsx src/index.ts <url>');
    console.error('Example: npx tsx src/index.ts https://example.com');
    process.exit(1);
  }

  let startUrl: string;
  try {
    startUrl = new URL(urlArg).toString();
  } catch {
    console.error(`Invalid URL: ${urlArg}`);
    process.exit(1);
  }

  const maxPages = parseInt(process.env.MAX_PAGES ?? '30', 10);
  const outputDir = process.env.OUTPUT_DIR ?? '.';

  console.log('');
  console.log('╔════════════════════════════════════════╗');
  console.log('║   AI Answer Readiness Scorer           ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');

  const origin = new URL(startUrl).origin;

  // Fetch site-level resources first
  console.log('Fetching robots.txt and sitemap...');
  const [robotsTxt, sitemap] = await Promise.all([
    fetchRobotsTxt(origin),
    fetchRobotsTxt(origin).then(r => fetchSitemap(origin, r)),
  ]);

  if (robotsTxt) console.log('  ✓ robots.txt found');
  else console.log('  ✗ robots.txt not found');
  if (sitemap) console.log(`  ✓ sitemap found (${sitemap.urls.length} URLs)`);
  else console.log('  ✗ sitemap not found');
  console.log('');

  // Crawl pages
  const crawled = await crawlSite(startUrl, maxPages);
  const allUrls = crawled.map(p => p.url);

  // Run checks on each page
  console.log('\nRunning checks...');
  const pages: PageResult[] = [];

  // Run markdown check only on homepage (site-level), then reuse for all
  const homepageMarkdown = await checkMarkdownAccess(startUrl);

  for (let i = 0; i < crawled.length; i++) {
    const crawl = crawled[i];
    process.stdout.write(`  [${i + 1}/${crawled.length}] ${crawl.url}\n`);

    const extracted = extractPage(crawl.html);

    const crawlability = checkCrawlability(crawl, robotsTxt, sitemap?.urls ?? [], allUrls);
    const extractability = checkExtractability(extracted, crawl.html);
    const structuredData = checkStructuredData(crawl.html);
    const markdownAccess = i === 0 ? homepageMarkdown : { ...homepageMarkdown, score: 0, notes: [] };
    const freshness = checkFreshness(crawl.html, sitemap, crawl.url);
    const pageExperience = checkPageExperience(crawl.html);

    pages.push({
      url: crawl.url,
      status: crawl.status,
      fetchedAt: crawl.fetchedAt,
      rawHtml: '',
      mainText: extracted.mainText,
      title: extracted.title,
      h1: extracted.h1,
      checks: { crawlability, extractability, structuredData, markdownAccess, freshness, pageExperience },
    });
  }



  const audit: SiteAudit = {
    url: startUrl,
    crawledAt: new Date().toISOString(),
    pageCount: pages.length,
    pages,
    robotsTxt,
    sitemap,
    scores: { crawlability: { score: 0, max: 0, percent: 0, label: '' }, extractability: { score: 0, max: 0, percent: 0, label: '' }, structuredData: { score: 0, max: 0, percent: 0, label: '' }, markdownAccess: { score: 0, max: 0, percent: 0, label: '' }, freshness: { score: 0, max: 0, percent: 0, label: '' }, pageExperience: { score: 0, max: 0, percent: 0, label: '' }, deterministicTotal: 0, deterministicMax: 65, deterministicPercent: 0 },
  };

  audit.scores = aggregateScores(audit);

  console.log('\nWriting report...');
  const { mdPath, jsonPath } = writeReport(audit, outputDir);

  console.log('');
  console.log('╔════════════════════════════════════════╗');
  console.log('║   Done!                                ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log(`Auto-score: ${audit.scores.deterministicTotal}/65 (${audit.scores.deterministicPercent}%)`);
  console.log('');
  console.log(`Markdown report: ${path.resolve(mdPath)}`);
  console.log(`JSON data:       ${path.resolve(jsonPath)}`);
  console.log('');
  console.log('Next step: Open the Markdown report in Claude and ask it to');
  console.log('score the Content Answerability and Entity & Trust sections.');
  console.log('');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
