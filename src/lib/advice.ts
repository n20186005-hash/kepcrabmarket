/**
 * Turns raw readings into "what should I actually do today?" advice.
 *
 * The whole point of this module is that a visitor should never have to
 * translate a number into a decision. Every entry produced here is either
 * hidden or shown based on the readings, and each one is short, plain-language
 * and actionable. Nothing technical (wind speeds in km/h, relative humidity
 * percentages, UV indices) is exposed as a sentence fragment on its own — the
 * numbers stay in the readings panel, the copy talks about umbrellas, boats,
 * slippery stairs and drinking water.
 *
 * Only keys are produced; the component resolves them through the locale files
 * so all three languages stay in sync.
 */
import { attraction } from '../config/site';
import {
  beaufortOf,
  conditionOf,
  nextHours,
  type SeaLevel,
  type WeatherBundle,
  type WeatherHour,
} from './weather';
import { nextOf, range24h, type TideState } from './tide';

export type Tone = 'good' | 'ok' | 'caution' | 'alert';

/** A single advice line: an i18n key plus optional `{placeholder}` values. */
export interface Advice {
  id: string;
  tone: Tone;
  params?: Record<string, string | number>;
}

export interface AdviceScene {
  icon: string;
  titleId: string;
  lines: Advice[];
}

export interface SmartAdvice {
  headlineId: string;
  headlineTone: Tone;
  alerts: Advice[];
  outfit: Advice[];
  plan: Advice[];
  bring: Advice[];
  scenes: AdviceScene[];
  /** Highlighted outdoor window, as 0–23 hour marks, when one exists. */
  window: { from: number; to: number } | null;
}

/** Ridge height above sea level, for the lapse-rate temperature difference. */
const RIDGE_ELEVATION = attraction.nearbyRidgeElevation;
const LAPSE_RATE_PER_METRE = 0.0065;

function cap<T>(items: T[], max: number): T[] {
  return items.length > max ? items.slice(0, max) : items;
}

function clock(hour: number): string {
  return `${String(((hour % 24) + 24) % 24).padStart(2, '0')}:00`;
}

/** Longest run of consecutive daylight hours that are unlikely to be wet. */
function findDryWindow(hours: WeatherHour[]): { from: number; to: number } | null {
  let best: { from: number; to: number } | null = null;
  let start = -1;

  for (let i = 0; i <= hours.length; i += 1) {
    const point = hours[i];
    const usable = !!point && point.isDay && point.hour >= 6 && point.hour <= 17 && point.precipProb <= 30;

    if (usable) {
      if (start < 0) start = i;
    } else if (start >= 0) {
      const length = i - start;
      if (length >= 2 && (!best || length > best.to - best.from)) {
        best = { from: hours[start].hour, to: hours[i - 1].hour + 1 };
      }
      start = -1;
    }
  }

  return best;
}

/** First and last hour of the most significant wet spell in the next 24 hours. */
function findWetWindow(hours: WeatherHour[]): { from: number; to: number } | null {
  let best: { from: number; to: number } | null = null;
  let start = -1;

  for (let i = 0; i <= hours.length; i += 1) {
    const point = hours[i];
    const wet = !!point && (point.precipProb >= 60 || point.precipitation >= 0.5);

    if (wet) {
      if (start < 0) start = i;
    } else if (start >= 0) {
      const length = i - start;
      if (!best || length > best.to - best.from) {
        best = { from: hours[start].hour, to: hours[i - 1].hour + 1 };
      }
      start = -1;
    }
  }

  return best;
}

export function buildAdvice(data: WeatherBundle): SmartAdvice {
  const { now, today, sea } = data;
  const conditions = conditionOf(now.code);
  const dayConditions = conditionOf(today.code);
  const hours = nextHours(data.hours, 24);

  const apparentMax = Math.max(now.apparent, today.tMax);
  const swing = today.tMax - today.tMin;
  const gustMax = Math.max(now.gust, today.gustMax);
  const beaufort = beaufortOf(Math.max(today.windMax, now.windSpeed));

  const thunderstorms =
    conditions === 'thunderstorm' || dayConditions === 'thunderstorm' || hours.some((h) => conditionOf(h.code) === 'thunderstorm');
  const heavyRain = today.precipSum >= 25 || conditions === 'heavyRain' || dayConditions === 'heavyRain';
  const wet = heavyRain || today.precipProb >= 60 || ['rain', 'showers'].includes(dayConditions);
  const maybeWet =
    wet || today.precipSum >= 3 || today.precipProb >= 40 || ['drizzle', 'showers'].includes(conditions);

  const daylightHours = hours.filter((h) => h.isDay && h.visibility > 0);
  const visibility = daylightHours.length
    ? Math.min(...daylightHours.map((h) => h.visibility))
    : Number.POSITIVE_INFINITY;
  const foggy = conditions === 'fog' || dayConditions === 'fog' || visibility < 2000;

  const seaLevel: SeaLevel | null = sea ? sea.level : null;
  const roughSea = seaLevel === 'rough' || beaufort >= 7;
  const choppySea = !roughSea && (seaLevel === 'moderate' || beaufort >= 6);
  const calmSea = !roughSea && !choppySea && (seaLevel === 'calm' || seaLevel === 'slight');
  const drySpell = findDryWindow(hours);
  const wetSpell = findWetWindow(hours);

  // --- 1. Risk notices (highest priority, only when something is actually up) --
  const alerts: Advice[] = [];
  if (thunderstorms) alerts.push({ id: 'alert.thunder', tone: 'alert' });
  if (heavyRain) alerts.push({ id: 'alert.rain', tone: 'alert' });
  if (roughSea) alerts.push({ id: 'alert.wind', tone: 'alert' });
  else if (gustMax >= 60) alerts.push({ id: 'alert.gust', tone: 'caution' });
  if (apparentMax >= 38) alerts.push({ id: 'alert.heat', tone: 'alert' });
  else if (today.uvMax >= 11) alerts.push({ id: 'alert.uv', tone: 'caution' });
  if (foggy) alerts.push({ id: 'alert.fog', tone: 'caution' });

  const headlineId = thunderstorms || heavyRain || roughSea
    ? 'headline.poor'
    : wet || maybeWet || gustMax >= 50 || apparentMax >= 35
      ? 'headline.mixed'
      : 'headline.good';
  const headlineTone: Tone =
    headlineId === 'headline.poor' ? 'alert' : headlineId === 'headline.mixed' ? 'caution' : 'good';

  // --- 2. What to wear ------------------------------------------------------
  const outfit: Advice[] = [];
  if (apparentMax >= 32) outfit.push({ id: 'outfit.hot', tone: 'caution' });
  else outfit.push({ id: 'outfit.mild', tone: 'ok' });
  if (swing >= 8) outfit.push({ id: 'outfit.swing', tone: 'ok', params: { min: today.tMin.toFixed(0), max: today.tMax.toFixed(0) } });
  if (today.tMax <= 22) outfit.push({ id: 'outfit.cool', tone: 'caution' });
  if (wet) outfit.push({ id: 'outfit.rain', tone: 'caution' });
  else if (maybeWet) outfit.push({ id: 'outfit.showerLayer', tone: 'ok' });
  if (beaufort >= 5) outfit.push({ id: 'outfit.wind', tone: 'caution' });
  if (maybeWet) outfit.push({ id: 'outfit.grip', tone: 'ok' });
  if (today.uvMax >= 6) outfit.push({ id: 'outfit.uv', tone: 'caution' });

  // --- 3. What to do -------------------------------------------------------
  const plan: Advice[] = [];
  if (!wet && !thunderstorms && beaufort < 7) plan.push({ id: 'plan.goodOutdoor', tone: 'good' });
  if (apparentMax >= 33) plan.push({ id: 'plan.avoidMidday', tone: 'caution' });
  if (drySpell && drySpell.to - drySpell.from >= 2) {
    plan.push({ id: 'plan.window', tone: 'good', params: { from: clock(drySpell.from), to: clock(drySpell.to) } });
  }
  if (wetSpell && maybeWet) {
    plan.push({ id: 'plan.wetWindow', tone: 'caution', params: { from: clock(wetSpell.from), to: clock(wetSpell.to) } });
  }
  if (roughSea) plan.push({ id: 'plan.noBoats', tone: 'alert' });
  else if (choppySea) plan.push({ id: 'plan.boatCaution', tone: 'caution' });
  else if (calmSea && !wet) plan.push({ id: 'plan.boatGood', tone: 'good' });
  if (thunderstorms) plan.push({ id: 'plan.parkThunder', tone: 'alert' });
  else if (maybeWet) plan.push({ id: 'plan.parkWet', tone: 'caution' });
  else plan.push({ id: 'plan.parkGood', tone: 'good' });
  if (maybeWet) plan.push({ id: 'plan.coveredMeal', tone: 'ok' });
  if (apparentMax >= 35) plan.push({ id: 'plan.shortStops', tone: 'caution' });
  if (dayConditions === 'overcast' || dayConditions === 'partlyCloudy') plan.push({ id: 'plan.photos', tone: 'ok' });
  if (calmSea && !maybeWet) plan.push({ id: 'plan.flats', tone: 'ok' });

  // --- 4. What to pack -----------------------------------------------------
  const bring: Advice[] = [];
  if (wet) bring.push({ id: 'bring.raincoat', tone: 'ok' });
  else if (maybeWet) bring.push({ id: 'bring.umbrella', tone: 'ok' });
  if (maybeWet) bring.push({ id: 'bring.dryBag', tone: 'ok' });
  if (today.uvMax >= 6) bring.push({ id: 'bring.sunKit', tone: 'ok' });
  if (apparentMax >= 29) bring.push({ id: 'bring.water', tone: 'ok' });
  if (apparentMax >= 31) bring.push({ id: 'bring.wipes', tone: 'ok' });
  if (now.humidity >= 72 && today.tMax >= 26) bring.push({ id: 'bring.repellent', tone: 'ok' });
  if (calmSea || choppySea) bring.push({ id: 'bring.towel', tone: 'ok' });
  if (maybeWet || roughSea) bring.push({ id: 'bring.footwear', tone: 'ok' });
  bring.push({ id: 'bring.cash', tone: 'ok' });

  // --- 5. Scenario guidance -------------------------------------------------
  const scenes: AdviceScene[] = [];

  const seaLines: Advice[] = [];
  if (sea) {
    const wave = sea.waveMax.toFixed(1);
    if (seaLevel === 'rough') seaLines.push({ id: 'sea.waveRough', tone: 'alert', params: { wave } });
    else if (seaLevel === 'moderate') seaLines.push({ id: 'sea.waveModerate', tone: 'caution', params: { wave } });
    else seaLines.push({ id: 'sea.waveCalm', tone: 'good', params: { wave } });

    if (sea.seaTemp !== null) {
      const temp = sea.seaTemp.toFixed(0);
      if (sea.seaTemp >= 29) seaLines.push({ id: 'sea.swimWarm', tone: 'good', params: { temp } });
      else if (sea.seaTemp >= 26) seaLines.push({ id: 'sea.swimMild', tone: 'ok', params: { temp } });
      else seaLines.push({ id: 'sea.swimCool', tone: 'caution', params: { temp } });
    }
  } else if (roughSea) {
    seaLines.push({ id: 'sea.windRough', tone: 'alert' });
  } else if (choppySea) {
    seaLines.push({ id: 'sea.windChoppy', tone: 'caution' });
  } else {
    seaLines.push({ id: 'sea.windCalm', tone: 'good' });
  }
  seaLines.push({ id: 'sea.lifeguard', tone: 'ok' });
  if (roughSea) seaLines.push({ id: 'sea.rocks', tone: 'alert' });
  else if (!foggy) seaLines.push({ id: 'sea.tideNote', tone: 'ok' });
  scenes.push({ icon: '🏖️', titleId: 'scene.sea', lines: seaLines });

  const hillDelta = Math.max(1, Math.round(RIDGE_ELEVATION * LAPSE_RATE_PER_METRE));
  const hillLines: Advice[] = [
    { id: 'hill.lapse', tone: 'ok', params: { delta: hillDelta } },
  ];
  if (thunderstorms) hillLines.push({ id: 'hill.thunder', tone: 'alert' });
  if (maybeWet) hillLines.push({ id: 'hill.slip', tone: 'caution' });
  else hillLines.push({ id: 'hill.dry', tone: 'good' });
  if (apparentMax >= 33) hillLines.push({ id: 'hill.heat', tone: 'caution' });
  if (foggy || visibility < 8000) hillLines.push({ id: 'hill.haze', tone: 'caution' });
  else hillLines.push({ id: 'hill.view', tone: 'good' });
  if (now.humidity >= 72 && today.tMax >= 26) hillLines.push({ id: 'hill.bugs', tone: 'ok' });
  scenes.push({ icon: '⛰️', titleId: 'scene.hill', lines: hillLines });

  const marketLines: Advice[] = [
    { id: 'market.arrive', tone: 'good' },
    { id: 'market.tide', tone: 'ok' },
  ];
  if (maybeWet) marketLines.push({ id: 'market.covered', tone: 'caution' });
  if (apparentMax >= 30) marketLines.push({ id: 'market.coldChain', tone: 'caution' });
  if (calmSea) marketLines.push({ id: 'market.boats', tone: 'good' });
  scenes.push({ icon: '🦀', titleId: 'scene.market', lines: marketLines });

  return {
    headlineId,
    headlineTone,
    alerts: cap(alerts, 3),
    outfit: cap(outfit, 4),
    plan: cap(plan, 5),
    bring: cap(bring, 6),
    scenes,
    window: drySpell && drySpell.to - drySpell.from >= 2 ? drySpell : null,
  };
}

// --- Tides -------------------------------------------------------------------

/**
 * What the water is doing today, in the same decision-first voice as the rest
 * of this module. The tide is the reason the quay looks different in the
 * morning and the evening, so every line here is aimed at a choice the visitor
 * is about to make rather than at the prediction itself.
 *
 * Sunrise and sunset decide which of the two turns of the day is actually
 * usable: a low water at 22:00 is true but useless, and saying so is more
 * helpful than silently omitting it.
 */
export function buildTideAdvice(tide: TideState, sunrise: string, sunset: string): Advice[] {
  const lines: Advice[] = [];
  const nextLow = nextOf(tide, 'low');
  const nextHigh = nextOf(tide, 'high');
  const inDaylight = (clock: string): boolean => clock >= sunrise && clock <= sunset;

  // Slack water is the calmest the pier ever gets, but it only lasts about an
  // hour, so it leads when it happens to fall now.
  if (tide.next && Math.abs(tide.next.offsetHours) < 1) {
    lines.push({ id: 'tide.slack', tone: 'good', params: { time: tide.next.clock } });
  }

  lines.push({ id: tide.rising ? 'tide.rising' : 'tide.falling', tone: 'ok' });

  if (nextLow) {
    lines.push({
      id: inDaylight(nextLow.clock) ? 'tide.lowDaylight' : 'tide.lowDark',
      tone: inDaylight(nextLow.clock) ? 'good' : 'ok',
      params: { time: nextLow.clock },
    });
  }

  if (nextHigh) {
    lines.push({
      id: inDaylight(nextHigh.clock) ? 'tide.highDaylight' : 'tide.highDark',
      tone: inDaylight(nextHigh.clock) ? 'good' : 'ok',
      params: { time: nextHigh.clock },
    });
  }

  lines.push({ id: 'tide.marketRhythm', tone: 'ok' });

  // Only worth mentioning when the water is travelling an unusual distance.
  const range = range24h(tide);
  if (range >= 0.9) lines.push({ id: 'tide.bigRange', tone: 'caution', params: { range: range.toFixed(1) } });
  else if (range <= 0.4) lines.push({ id: 'tide.smallRange', tone: 'ok', params: { range: range.toFixed(1) } });

  return cap(lines, 5);
}
