// Centralized domain resolution. Reads the deployment-time env var
// CURRENT_SITE_DOMAIN; falls back to the canonical domain for this site.
function resolveBaseUrl(): string {
  const raw = (process.env.CURRENT_SITE_DOMAIN ?? 'kepcrabmarket.com').trim();
  const clean = raw.replace(/^https?:\/\//i, '').replace(/\/+$/, '');
  return `https://${clean}`;
}

export const siteConfig = {
  name: 'Kep Crab Market',
  baseUrl: resolveBaseUrl(),
  slug: 'kep-crab-market',
  locales: ['km', 'en', 'zh'] as const,
};

export const ogLocale: Record<string, string> = {
  km: 'km_KH',
  en: 'en_US',
  zh: 'zh_CN',
};

// Public, factual attraction data used by JSON-LD and shared components.
export const attraction = {
  mapsUrl: 'https://maps.app.goo.gl/yXBZL3FjfpbNFYePA',
  embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.1492653921473!2d104.28625961222555!3d10.48889718959976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109cd4cf7e1e403%3A0xca401e39a050356b!2sKep%20Crab%20Market!5e0!3m2!1szh-CN!2sus!4v1784862900207!5m2!1szh-CN!2sus',
  lat: 10.4888976,
  lng: 104.2862596,
  hoursOpen: '05:00',
  hoursClose: '17:30',
  address: 'Kep Crab Market, Krong Kaeb, Kep Province, Cambodia',
  country: 'KH',
  phone: '+85510833168',
};
