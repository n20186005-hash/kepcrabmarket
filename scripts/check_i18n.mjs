// Validate key parity and required content across the three locale files.
import { readFileSync } from 'node:fs';

const langs = ['km', 'en', 'zh'];
const base = new URL('../src/i18n/', import.meta.url);
const data = {};
for (const l of langs) {
  data[l] = JSON.parse(readFileSync(new URL(`${l}.json`, base), 'utf8'));
}

function paths(obj, prefix = '') {
  let out = [];
  for (const k of Object.keys(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (obj[k] && typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
      out = out.concat(paths(obj[k], p));
    } else {
      out.push(p);
    }
  }
  return out;
}

const sets = {};
for (const l of langs) sets[l] = new Set(paths(data[l]));

const ref = sets.en;
let problems = 0;
for (const l of langs) {
  const missing = [...ref].filter((p) => !sets[l].has(p));
  const extra = [...sets[l]].filter((p) => !ref.has(p));
  if (missing.length) { console.log(`[${l}] MISSING: ${missing.join(', ')}`); problems++; }
  if (extra.length) { console.log(`[${l}] EXTRA: ${extra.join(', ')}`); problems++; }
}

// gallery must have 25 alts each
for (const l of langs) {
  const n = data[l].gallery.alts.length;
  if (n !== 25) { console.log(`[${l}] gallery.alts length = ${n} (expected 25)`); problems++; }
}

// nav must stay in step across locales
const navCount = Object.keys(data.en.nav).length;
for (const l of langs) {
  const n = Object.keys(data[l].nav).length;
  if (n !== navCount) { console.log(`[${l}] nav keys = ${n} (expected ${navCount})`); problems++; }
}

// Every advice key the weather engine can emit must exist in all three locales,
// otherwise a triggered condition would render a raw key on the page.
const adviceKeys = [
  'headline.good', 'headline.mixed', 'headline.poor', 'alerts.calm',
  'alert.thunder', 'alert.rain', 'alert.wind', 'alert.gust', 'alert.heat', 'alert.uv', 'alert.fog',
  'outfit.hot', 'outfit.mild', 'outfit.swing', 'outfit.cool', 'outfit.rain', 'outfit.showerLayer',
  'outfit.wind', 'outfit.grip', 'outfit.uv',
  'plan.goodOutdoor', 'plan.avoidMidday', 'plan.window', 'plan.wetWindow', 'plan.noBoats',
  'plan.boatCaution', 'plan.boatGood', 'plan.parkThunder', 'plan.parkWet', 'plan.parkGood',
  'plan.coveredMeal', 'plan.shortStops', 'plan.photos', 'plan.flats',
  'bring.umbrella', 'bring.raincoat', 'bring.dryBag', 'bring.sunKit', 'bring.water', 'bring.wipes',
  'bring.repellent', 'bring.towel', 'bring.footwear', 'bring.cash',
  'scene.sea', 'scene.hill', 'scene.market',
  'sea.waveCalm', 'sea.waveModerate', 'sea.waveRough', 'sea.windCalm', 'sea.windChoppy',
  'sea.windRough', 'sea.swimWarm', 'sea.swimMild', 'sea.swimCool', 'sea.lifeguard', 'sea.rocks',
  'sea.tideNote',
  'hill.lapse', 'hill.thunder', 'hill.slip', 'hill.dry', 'hill.heat', 'hill.haze', 'hill.view', 'hill.bugs',
  'market.arrive', 'market.tide', 'market.covered', 'market.coldChain', 'market.boats',
  'tide.slack', 'tide.rising', 'tide.falling', 'tide.lowDaylight', 'tide.lowDark',
  'tide.highDaylight', 'tide.highDark', 'tide.bigRange', 'tide.smallRange', 'tide.marketRhythm',
];
for (const l of langs) {
  for (const key of adviceKeys) {
    if (typeof data[l].weather?.smart?.[key] !== 'string') {
      console.log(`[${l}] weather.smart.${key} missing`); problems++;
    }
  }
}

// Content-heavy sections must stay populated, not silently emptied
for (const l of langs) {
  const checks = [
    ['facilities.items', data[l].facilities?.items, 15],
    ['science.items', data[l].science?.items, 6],
    ['science.duties', data[l].science?.duties, 8],
    ['guide.plans', data[l].guide?.plans, 2],
    ['guide.audience', data[l].guide?.audience, 3],
    ['weather.seasonal.rows', data[l].weather?.seasonal?.rows, 4],
    ['faq.items', data[l].faq?.items, 14],
    ['tides.guide.items', data[l].tides?.guide?.items, 4],
    ['tides.terms.rows', data[l].tides?.terms?.rows, 5],
    ['tides.live.columns', data[l].tides?.live ? Object.values(data[l].tides.live.columns).filter(Boolean) : [], 3],
  ];
  for (const [name, value, min] of checks) {
    if (!Array.isArray(value) || value.length < min) {
      console.log(`[${l}] ${name} = ${Array.isArray(value) ? value.length : 'missing'} (expected >= ${min})`);
      problems++;
    }
  }
}

// touristType present and array
for (const l of langs) {
  if (!Array.isArray(data[l].meta.touristType)) { console.log(`[${l}] meta.touristType missing`); problems++; }
}

// review citation + sources attribution must exist in every locale
for (const l of langs) {
  for (const key of ['sourceNote', 'syncLine', 'button']) {
    if (!data[l].reviews?.[key]) { console.log(`[${l}] reviews.${key} missing`); problems++; }
  }
  for (const key of ['reviewLabel', 'reviewSync', 'mapsLinkLabel', 'officialLink', 'imageRights']) {
    if (!data[l].sources?.[key]) { console.log(`[${l}] sources.${key} missing`); problems++; }
  }
  if (!data[l].footer?.imageRights) { console.log(`[${l}] footer.imageRights missing`); problems++; }
}

if (problems === 0) {
  console.log(
    `OK: key parity, gallery(25), nav(${navCount}), advice keys(${adviceKeys.length}), section content, ` +
      'touristType, review citation & sources all consistent across km/en/zh.',
  );
} else {
  console.log(`\n${problems} problem(s) found.`);
  process.exit(1);
}
