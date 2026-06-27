import type { PageExperienceResult } from '../types.js';
import * as cheerio from 'cheerio';

export function checkPageExperience(html: string): PageExperienceResult {
  const notes: string[] = [];
  const $ = cheerio.load(html);

  const pageSizeKb = Math.round(Buffer.byteLength(html, 'utf8') / 1024);

  // Images with alt text
  const images = $('img');
  const imagesWithAlt = $('img[alt]').length;
  const imagesHaveAlt = images.length === 0 || imagesWithAlt / images.length > 0.8;
  if (!imagesHaveAlt) notes.push(`${images.length - imagesWithAlt} image(s) missing alt text`);

  // Buttons with accessible labels
  const buttons = $('button, [role="button"]');
  const labeledButtons = buttons.filter((_, el) => {
    const $el = $(el);
    return !!($el.text().trim() || $el.attr('aria-label') || $el.attr('title'));
  }).length;
  const buttonsHaveLabels = buttons.length === 0 || labeledButtons / buttons.length > 0.8;
  if (!buttonsHaveLabels) notes.push('Some buttons lack accessible labels');

  // Form labels
  const inputs = $('input:not([type="hidden"]):not([type="submit"])');
  const formsHaveLabels = inputs.length === 0 || $('label').length >= inputs.length * 0.5;
  if (!formsHaveLabels) notes.push('Form inputs may lack labels');

  if (pageSizeKb > 500) notes.push(`Page HTML is large: ${pageSizeKb}KB`);

  let score = 0;
  if (pageSizeKb < 300) score += 1;
  if (imagesHaveAlt) score += 1;
  if (buttonsHaveLabels) score += 1;
  if (formsHaveLabels) score += 1;
  score += 1; // stub: assume no intrusive popups (can't detect without browser)

  if (score > 5) score = 5;

  return {
    score,
    maxScore: 5,
    details: {
      pageSizeKb,
      imagesHaveAlt,
      buttonsHaveLabels,
      formsHaveLabels,
    },
    notes,
  };
}
