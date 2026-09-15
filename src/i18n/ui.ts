import km from './km.json';
import en from './en.json';
import zh from './zh.json';
import { siteConfig } from '../config/site';

export const defaultLang = 'km';
export const languagesList = ['km', 'en', 'zh'] as const;

export const languages: Record<string, string> = {
  km: 'ខ្មែរ',
  en: 'English',
  zh: '中文',
};

// Order shown in the language switcher (default first).
export const langOrder: string[] = ['km', 'en', 'zh'];

const ui: Record<string, any> = { km, en, zh };

export function getLangFromUrl(url: URL): string {
  const seg = url.pathname.split('/').filter(Boolean);
  const lang = seg[0];
  return (languagesList as readonly string[]).includes(lang) ? lang : defaultLang;
}

/** Messages for an explicit locale code (used by on-demand server islands that
 *  cannot read the page URL). */
export function getMessagesByLang(lang: string | undefined) {
  const key = (languagesList as readonly string[]).includes(lang ?? '') ? (lang as string) : defaultLang;
  return { lang: key, messages: ui[key] };
}

export function getI18n(url: URL) {
  const lang = getLangFromUrl(url);
  const messages = ui[lang];
  const t = (key: string): string => {
    const found = key
      .split('.')
      .reduce<any>((o, i) => (o == null ? undefined : o[i]), messages);
    return found ?? '';
  };
  return { lang, messages, t };
}

/** The current URL's path with its locale prefix stripped, so
 *  "/en/privacy-policy/" and "/privacy-policy/" both yield "privacy-policy". */
export function pathWithoutLang(url: URL): string {
  const segments = url.pathname.split('/').filter(Boolean);
  if ((languagesList as readonly string[]).includes(segments[0])) segments.shift();
  return segments.join('/');
}

/** Absolute URL of `path` in a given language. The default locale is served
 *  from the root (see `prefixDefaultLocale: false`), the others behind a prefix. */
export function localisedUrl(lang: string, path = ''): string {
  const tail = path.replace(/^\/+|\/+$/g, '');
  const prefix = lang === defaultLang ? '' : `${lang}/`;
  return `${siteConfig.baseUrl}/${prefix}${tail ? `${tail}/` : ''}`;
}

/**
 * hreflang map for one page — every language that actually has that page, plus
 * an x-default. Taking the page path as an argument is what keeps sub-pages
 * from declaring the home page as their alternate.
 */
export function buildAlternates(path = ''): Record<string, string> {
  return {
    km: localisedUrl('km', path),
    en: localisedUrl('en', path),
    zh: localisedUrl('zh', path),
    // Pointed at English rather than Khmer: x-default serves the visitors whose
    // language matches none of the three, and those are almost all arriving
    // from outside Cambodia.
    xDefault: localisedUrl('en', path),
  };
}

export function htmlLangAttr(lang: string): string {
  if (lang === 'zh') return 'zh-CN';
  if (lang === 'km') return 'km';
  return lang;
}
