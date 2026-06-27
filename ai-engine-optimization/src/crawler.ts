import * as cheerio from 'cheerio';
import type { SitemapData } from './types.js';

const USER_AGENT = 'Mozilla/5.0 (compatible; AIAnswerScorer/1.0; +https://github.com/ai-answer-scorer)';
const FETCH_TIMEOUT = 10_000;
const CONCURRENCY = 3;

export interface CrawlResult {
  url: string;
  status: number;
  html: string;
  fetchedAt: string;
}

export async function fetchPage(url: string): Promise<CrawlResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      signal: controller.signal,
      redirect: 'follow',
    });
    const html = await res.text();
    return { url, status: res.status, html, fetchedAt: new Date().toISOString() };
  } catch {
    return { url, status: 0, html: '', fetchedAt: new Date().toISOString() };
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchRobotsTxt(origin: string): Promise<string | null> {
  try {
    const res = await fetch(`${origin}/robots.txt`, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
    });
    if (res.ok) return res.text();
    return null;
  } catch {
    return null;
  }
}

export async function fetchSitemap(origin: string, robotsTxt: string | null): Promise<SitemapData | null> {
  // Try to find sitemap URL from robots.txt first
  let sitemapUrl = `${origin}/sitemap.xml`;
  if (robotsTxt) {
    const match = robotsTxt.match(/^Sitemap:\s*(.+)$/mi);
    if (match) sitemapUrl = match[1].trim();
  }

  try {
    const res = await fetch(sitemapUrl, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
    });
    if (!res.ok) return null;
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].trim());
    const hasLastmod = xml.includes('<lastmod>');
    return { urls, hasLastmod };
  } catch {
    return null;
  }
}

function isSameOrigin(base: string, href: string): boolean {
  try {
    const baseUrl = new URL(base);
    const targetUrl = new URL(href, base);
    return targetUrl.origin === baseUrl.origin;
  } catch {
    return false;
  }
}

function normalizeUrl(base: string, href: string): string | null {
  try {
    const url = new URL(href, base);
    // Drop fragments, keep path/query
    url.hash = '';
    const str = url.toString();
    // Skip non-page resources
    if (/\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot|pdf|zip|mp4|mp3)(\?|$)/i.test(str)) return null;
    return str;
  } catch {
    return null;
  }
}

export function extractLinks(html: string, baseUrl: string): string[] {
  const $ = cheerio.load(html);
  const links = new Set<string>();
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') ?? '';
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
    const normalized = normalizeUrl(baseUrl, href);
    if (normalized && isSameOrigin(baseUrl, normalized)) links.add(normalized);
  });
  return [...links];
}

export async function crawlSite(startUrl: string, maxPages = 35): Promise<CrawlResult[]> {
  const origin = new URL(startUrl).origin;
  const visited = new Set<string>();
  const queue: string[] = [startUrl];
  const results: CrawlResult[] = [];

  console.log(`Crawling ${startUrl} (max ${maxPages} pages)...`);

  while (queue.length > 0 && results.length < maxPages) {
    // Take up to CONCURRENCY items
    const remaining = maxPages - results.length;
    const batch = queue.splice(0, Math.min(CONCURRENCY, remaining)).filter(u => !visited.has(u));
    if (batch.length === 0) continue;
    batch.forEach(u => visited.add(u));

    const fetched = await Promise.all(batch.map(fetchPage));
    for (const result of fetched) {
      if (results.length >= maxPages) break;
      results.push(result);
      process.stdout.write(`  [${results.length}/${maxPages}] ${result.status} ${result.url}\n`);
      if (result.status === 200 && result.html) {
        const links = extractLinks(result.html, result.url);
        for (const link of links) {
          if (!visited.has(link) && !queue.includes(link)) {
            queue.push(link);
          }
        }
      }
    }
  }

  console.log(`\nCrawled ${results.length} pages.`);
  return results;
}
