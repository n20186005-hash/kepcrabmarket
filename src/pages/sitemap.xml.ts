import type { APIRoute } from 'astro';
import { buildAlternates, languagesList } from '../i18n/ui';

export const prerender = true;

/**
 * Every page on the site, listed once. Each entry is expanded into one <url>
 * per language, and every one of those carries the full set of hreflang
 * alternates. That is what tells Google these are four pages in three languages
 * rather than twelve documents competing with each other.
 *
 * Kept as a single list so a new page cannot be added to the site and then
 * silently left out of the sitemap. The alternates come from `buildAlternates`,
 * the same helper the <head> uses, so the sitemap and the page markup can never
 * disagree about which URL represents which language.
 */
const pages = [
  { path: '', priority: '1.0' },
  { path: 'privacy-policy', priority: '0.3' },
  { path: 'terms-of-service', priority: '0.3' },
  { path: 'cookie-settings', priority: '0.3' },
  // English-only topic pages — advertise only en + x-default so we never point
  // hreflang at km/zh variants that do not exist.
  { path: 'en/crab-prices', priority: '0.6', langs: ['en'] },
  { path: 'en/how-to-buy-crab', priority: '0.6', langs: ['en'] },
  { path: 'en/how-to-get-there', priority: '0.6', langs: ['en'] },
  { path: 'en/kep-day-trip-from-kampot', priority: '0.6', langs: ['en'] },
];

const xmlEscape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = () => {
  // Every deploy rewrites the HTML these URLs point at, so the build date is
  // genuinely the modification date of what we serve — and it matches the
  // Last-Modified header Cloudflare derives from the same upload. Keeping the
  // two consistent is what makes lastmod worth reading; an invented date would
  // just be ignored.
  const lastmod = new Date().toISOString().slice(0, 10);

  const entries = pages.flatMap((page) => {
    const alternates = buildAlternates(page.path);
    const langs = page.langs ?? languagesList;

    const links = [
      ...langs.map((lang) => [lang, alternates[lang]] as [string, string]),
      ['x-default', alternates.xDefault],
    ]
      .map(
        ([hreflang, href]) =>
          `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${xmlEscape(href)}" />`,
      )
      .join('\n');

    return langs.map((lang) =>
      [
        '  <url>',
        `    <loc>${xmlEscape(alternates[lang])}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <priority>${page.priority}</priority>`,
        links,
        '  </url>',
      ].join('\n'),
    );
  });

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
