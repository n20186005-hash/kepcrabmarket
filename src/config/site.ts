export const siteConfig = {
  name: 'Kep Crab Market',
  baseUrl: 'https://kepcrabmarket.com',
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
  embedUrl: 'https://www.google.com/maps?q=10.4888976,104.2862596&output=embed',
  lat: 10.4888976,
  lng: 104.2862596,
  hoursOpen: '05:00',
  hoursClose: '17:30',
  address: 'Kep Crab Market, Krong Kaeb, Kep Province, Cambodia',
  country: 'KH',
  phone: '+85510833168',
};
