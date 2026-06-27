import * as cheerio from 'cheerio';

const CHROME_SELECTORS = [
  'nav', 'header', 'footer', 'aside',
  '.nav', '.header', '.footer', '.sidebar', '.menu', '.cookie', '.banner', '.popup', '.modal', '.ad', '.ads',
  '[role="navigation"]', '[role="banner"]', '[role="contentinfo"]', '[aria-hidden="true"]',
  'script', 'style', 'noscript',
];

const MAIN_SELECTORS = [
  'main', '[role="main"]', 'article', '.content', '#content', '.post', '.entry', '.page-content',
  '#main', '.main-content', '.article-body', '.prose',
];

export interface ExtractedPage {
  title: string;
  h1: string;
  mainText: string;
  allText: string;
  headings: string[];
  paragraphCount: number;
  listCount: number;
  tableCount: number;
  headingCount: number;
  contentRatio: number;
  htmlLength: number;
}

export function extractPage(html: string): ExtractedPage {
  const $ = cheerio.load(html);

  const title = $('title').first().text().trim();
  const h1 = $('h1').first().text().trim();
  const htmlLength = html.length;

  // Remove chrome
  $(CHROME_SELECTORS.join(',')).remove();

  // Try to find main content container
  let mainEl: cheerio.Cheerio<cheerio.Element> | null = null;
  for (const sel of MAIN_SELECTORS) {
    const el = $(sel).first();
    if (el.length) { mainEl = el; break; }
  }

  const mainText = (mainEl ?? $('body')).text().replace(/\s+/g, ' ').trim();
  const allText = $('body').text().replace(/\s+/g, ' ').trim();

  const headings: string[] = [];
  $('h1,h2,h3,h4').each((_, el) => {
    const text = $(el).text().trim();
    if (text) headings.push(text);
  });

  const paragraphCount = $('p').length;
  const listCount = $('ul,ol').length;
  const tableCount = $('table').length;
  const headingCount = $('h1,h2,h3,h4,h5,h6').length;

  // Content-to-chrome ratio: main text vs total HTML chars
  const contentRatio = htmlLength > 0 ? mainText.length / htmlLength : 0;

  return { title, h1, mainText, allText, headings, paragraphCount, listCount, tableCount, headingCount, contentRatio, htmlLength };
}
