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
  domain: resolveBaseUrl().replace(/^https:\/\//, ''),
  slug: 'kep-crab-market',
  locales: ['km', 'en', 'zh'] as const,
  // Google Analytics 4 measurement ID.
  ga4Id: 'G-HXM22WWPKP',
  themeColor: '#0369a1',
  backgroundColor: '#f8fafc',
};

export const ogLocale: Record<string, string> = {
  km: 'km_KH',
  en: 'en_US',
  zh: 'zh_CN',
};

// ---------------------------------------------------------------------------
// Single-attraction entity binding.
//
// This table is the one place where the site binds the domain meaning to the
// physical Google Maps entity. Every component (JSON-LD, TDK, headings, map,
// review citation) reads from here, so swapping to another attraction only
// means replacing the values below.
//
//   fullName      -> {{ATTRACTION_FULL_NAME}}
//   shortName     -> {{ATTRACTION_SHORT_NAME}}
//   city          -> {{CITY_NAME}}
//   region        -> {{STATE_PROVINCE}}
//   countryName   -> {{COUNTRY_NAME}}
//   country       -> {{COUNTRY_CODE_2LETTER}}
//   postalCode    -> {{POSTAL_CODE}}
//   lat / lng     -> {{LATITUDE}} / {{LONGITUDE}}
//   mapsUrl       -> {{MAPS_SHARE_URL}}
//   embedUrl      -> {{MAPS_EMBED_SRC}}
//   landmarks     -> {{NEARBY_LANDMARK_1}} / {{NEARBY_LANDMARK_2}}
//   tourismPortal -> {{GOVT_TOURISM_URL}}
// ---------------------------------------------------------------------------
export const attraction = {
  // Names ------------------------------------------------------------------
  fullName: 'Kep Crab Market',
  shortName: 'Kep Crab Market',
  localName: 'ផ្សារក្ដាមក្រុងកែប',
  zhName: '白马螃蟹市场',
  category: 'Seafood market',

  // Geography --------------------------------------------------------------
  city: 'Kep',
  addressLocality: 'Krong Kaeb',
  region: 'Kep Province',
  countryName: 'Cambodia',
  country: 'KH',
  postalCode: '23020000',
  plusCode: 'F7QQ+HG4',
  streetAddress: 'F7QQ+HG4, Kep Crab Market',
  lat: 10.4888976,
  lng: 104.2862596,
  // Offshore sample point (~3 km south-west of the market) used for sea-state
  // readings: wave height and sea temperature must be sampled in open water,
  // not on the quay itself.
  seaSampleLat: 10.46,
  seaSampleLng: 104.28,
  // Ridge height of Kep National Park, used for the lapse-rate temperature
  // difference quoted in the hill-walking guidance.
  nearbyRidgeElevation: 270,

  // Google Maps ------------------------------------------------------------
  // Latest share link for the listing (kept as the canonical https://maps.app.goo.gl share URL).
  mapsUrl: 'https://maps.app.goo.gl/fKPzNByy6MjQjw6Q7',
  embedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.1492653921473!2d104.28625961222555!3d10.48889718959976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109cd4cf7e1e403%3A0xca401e39a050356b!2sKep%20Crab%20Market!5e0!3m2!1szh-CN!2sus!4v1784862900207!5m2!1szh-CN!2sus',

  // Official / authoritative outbound references --------------------------
  tourismPortal: 'https://tourism.gov.kh/en/',
  tourismPortalOrg: 'https://www.tourismcambodia.org/',

  // Name variants the place is genuinely searched by, beyond the canonical
  // names above. Feeds structured data `alternateName` so the entity keeps
  // matching real queries ("kep seafood market", "kep crab market cambodia").
  // Nothing here is invented — all of these are names this market is known by.
  searchAliases: ['Kep Seafood Market', 'Kep Crab Market, Cambodia', 'Kep Market'],

  // Nearby semantic cluster -------------------------------------------------
  landmarks: ['Kep National Park', 'Rabbit Island (Koh Tonsay)'],

  // Google Maps rating snapshot --------------------------------------------
  // Display-only citation: these numbers are shown on the page with an explicit
  // Google Maps attribution and are deliberately NOT emitted as aggregateRating
  // / review structured data.
  rating: 4.1,
  reviewCount: 5618,
  reviewsSyncedISO: '2026-09',
  reviewsSyncYear: 2026,
  reviewsSyncMonth: 9,

  // Practical facts ---------------------------------------------------------
  hoursOpen: '05:00',
  hoursClose: '17:30',
  address: 'Kep Crab Market, Krong Kaeb, Kep Province, Cambodia',
  phone: '+85510833168',
};

// Fixed 1200x630 social cards, generated once into public/og so the URLs stay
// stable and absolute for og:image, Twitter cards and structured data. The
// gallery photos themselves are build-time optimised from src/assets.
export const heroImage = `${siteConfig.baseUrl}/og/kep-crab-market-og-1.jpg`;
export const jsonLdImages = [1, 2, 3].map((n) => `${siteConfig.baseUrl}/og/kep-crab-market-og-${n}.jpg`);
