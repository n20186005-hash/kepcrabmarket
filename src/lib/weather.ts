/**
 * Server-side weather service for the Kep Crab Market guide.
 *
 * Runs inside the prerendered page's on-demand islands (Cloudflare Worker):
 *   - fetches readings plus a multi-day outlook, a coastal sea state and the
 *     predicted high and low waters
 *   - keeps a module-level memo so repeated renders inside the same isolate
 *     never hit the network again
 *   - lets Cloudflare's edge cache hold the upstream responses for 30 minutes
 *
 * Everything here is planning input for the visitor-facing advice engine; the
 * raw numbers on their own are of little use to someone deciding whether to
 * carry an umbrella or take a boat.
 *
 * Upstream specifics are intentionally confined to this file: the rendered page
 * only ever shows the readings themselves plus a "last updated" time.
 */
import { attraction } from '../config/site';
import { buildTide, type TideState } from './tide';

export interface WeatherNow {
  temperature: number;
  apparent: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  windDirection: number;
  gust: number;
  cloudCover: number;
  code: number;
  isDay: boolean;
}

export interface WeatherDay {
  date: string;
  weekday: number;
  code: number;
  tMax: number;
  tMin: number;
  precipSum: number;
  precipProb: number;
  uvMax: number;
  windMax: number;
  gustMax: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherHour {
  time: string;
  hour: number;
  temperature: number;
  precipProb: number;
  precipitation: number;
  windSpeed: number;
  uv: number;
  visibility: number;
  code: number;
  isDay: boolean;
}

export type SeaLevel = 'calm' | 'slight' | 'moderate' | 'rough';

export interface SeaState {
  /** Highest significant wave height expected in the next 24 hours (metres). */
  waveMax: number;
  /** Dominant wave period (seconds). */
  wavePeriod: number;
  /** Sea surface temperature (°C), or null when unavailable. */
  seaTemp: number | null;
  level: SeaLevel;
}

export interface WeatherBundle {
  now: WeatherNow;
  today: WeatherDay;
  days: WeatherDay[];
  /** Hourly points covering several days, used to find the day's best window. */
  hours: WeatherHour[];
  sea: SeaState | null;
  /** Predicted high and low waters, from the same marine request as `sea`. */
  tide: TideState | null;
  updatedAt: string;
}

/** Condition buckets the UI knows how to render. */
export type Condition =
  | 'clear'
  | 'mainlyClear'
  | 'partlyCloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'heavyRain'
  | 'showers'
  | 'thunderstorm'
  | 'snow';

const WMO_TO_CONDITION: Record<number, Condition> = {
  0: 'clear',
  1: 'mainlyClear',
  2: 'partlyCloudy',
  3: 'overcast',
  45: 'fog',
  48: 'fog',
  51: 'drizzle',
  53: 'drizzle',
  55: 'drizzle',
  56: 'drizzle',
  57: 'drizzle',
  61: 'rain',
  63: 'rain',
  65: 'heavyRain',
  66: 'rain',
  67: 'heavyRain',
  71: 'snow',
  73: 'snow',
  75: 'snow',
  77: 'snow',
  80: 'showers',
  81: 'showers',
  82: 'heavyRain',
  85: 'snow',
  86: 'snow',
  95: 'thunderstorm',
  96: 'thunderstorm',
  99: 'thunderstorm',
};

export const CONDITION_ICON: Record<Condition, string> = {
  clear: '☀️',
  mainlyClear: '🌤️',
  partlyCloudy: '⛅',
  overcast: '☁️',
  fog: '🌫️',
  drizzle: '🌦️',
  rain: '🌧️',
  heavyRain: '🌧️',
  showers: '🌦️',
  thunderstorm: '⛈️',
  snow: '🌨️',
};

const NIGHT_ICON = '🌙';

export function conditionOf(code: number): Condition {
  return WMO_TO_CONDITION[code] ?? 'partlyCloudy';
}

export function iconOf(code: number, isDay = true): string {
  const condition = conditionOf(code);
  if (!isDay && (condition === 'clear' || condition === 'mainlyClear')) return NIGHT_ICON;
  return CONDITION_ICON[condition];
}

/** Wind direction in degrees to an eight-point compass key. */
export function compassOf(deg: number): string {
  const points = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
  return points[Math.round((((deg % 360) + 360) % 360) / 45) % 8];
}

/** Local time in Kep (Indochina Time, UTC+7) — used to align hourly slices. */
export const LOCAL_UTC_OFFSET_MINUTES = 7 * 60;

/** `YYYY-MM-DDTHH` for "now" on the ground at the market, matching upstream
 *  hourly timestamps so slices stay correct whatever the server clock says. */
export function localHourKey(at: number = Date.now()): string {
  return new Date(at + LOCAL_UTC_OFFSET_MINUTES * 60_000).toISOString().slice(0, 13);
}

/** `HH:MM` for a local wall-clock time derived from an absolute instant. */
export function localClock(iso: string): string {
  const shifted = new Date(new Date(iso).getTime() + LOCAL_UTC_OFFSET_MINUTES * 60_000);
  return `${String(shifted.getUTCHours()).padStart(2, '0')}:${String(shifted.getUTCMinutes()).padStart(2, '0')}`;
}

/** Rolling window of hourly points starting at the current local hour. */
export function nextHours(hours: WeatherHour[], count = 24, from = localHourKey()): WeatherHour[] {
  const start = hours.findIndex((h) => h.time.slice(0, 13) >= from);
  if (start < 0) return hours.slice(0, count);
  return hours.slice(start, start + count);
}

// --- Derived scales ---------------------------------------------------------

/** Beaufort upper bounds in km/h; index 0–12. */
const BEAUFORT_MAX_KMH = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117];

/** Beaufort force for a sustained wind speed, so the copy can talk about
 *  "force 5–6" the way a shipping forecast would, not raw km/h. */
export function beaufortOf(kmh: number): number {
  for (let i = 0; i < BEAUFORT_MAX_KMH.length; i += 1) {
    if (kmh <= BEAUFORT_MAX_KMH[i]) return i;
  }
  return 12;
}

/** Sea state for a significant wave height in metres. */
export function seaLevelOf(waveHeight: number): SeaLevel {
  if (waveHeight >= 1.5) return 'rough';
  if (waveHeight >= 1.0) return 'moderate';
  if (waveHeight >= 0.5) return 'slight';
  return 'calm';
}

// --- Fetching ---------------------------------------------------------------

const FORECAST_ENDPOINT = 'https://api.open-meteo.com/v1/forecast';
const MARINE_ENDPOINT = 'https://marine-api.open-meteo.com/v1/marine';
const REVALIDATE_SECONDS = 1800;

const FORECAST_QUERY = {
  latitude: String(attraction.lat),
  longitude: String(attraction.lng),
  current:
    'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day',
  hourly:
    'temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,uv_index,visibility,is_day',
  daily:
    'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,uv_index_max,wind_speed_10m_max,wind_gusts_10m_max,sunrise,sunset',
  timezone: 'Asia/Phnom_Penh',
  forecast_days: '7',
  wind_speed_unit: 'kmh',
};

const MARINE_QUERY = {
  latitude: String(attraction.seaSampleLat),
  longitude: String(attraction.seaSampleLng),
  hourly: 'wave_height,wave_period,sea_surface_temperature,sea_level_height_msl',
  timezone: 'Asia/Phnom_Penh',
  // Three days gives the tide panel a full table to print and still keeps the
  // response a few kilobytes.
  forecast_days: '3',
};

let memo: { at: number; value: WeatherBundle } | null = null;

const CF_CACHE = {
  cacheEverything: true,
  cacheTtl: REVALIDATE_SECONDS,
} as const;

async function fetchJson(url: string): Promise<any | null> {
  try {
    // `cf` is honoured by the Workers runtime and ignored elsewhere.
    const response = await fetch(url, {
      headers: { accept: 'application/json' },
      cf: CF_CACHE,
    } as RequestInit);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

function round(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? Math.round(n * 10) / 10 : 0;
}

function buildHours(payload: any): WeatherHour[] {
  const hourly = payload?.hourly ?? {};
  if (!Array.isArray(hourly.time)) return [];
  return hourly.time.map((time: string, i: number) => ({
    time,
    hour: Number(time.slice(11, 13)),
    temperature: round(hourly.temperature_2m?.[i]),
    precipProb: round(hourly.precipitation_probability?.[i]),
    precipitation: round(hourly.precipitation?.[i]),
    windSpeed: round(hourly.wind_speed_10m?.[i]),
    uv: round(hourly.uv_index?.[i]),
    visibility: Number(hourly.visibility?.[i] ?? 0) || 0,
    code: Number(hourly.weather_code?.[i] ?? 0),
    isDay: Number(hourly.is_day?.[i] ?? 1) === 1,
  }));
}

function buildSea(payload: any | null): SeaState | null {
  const hourly = payload?.hourly ?? {};
  if (!Array.isArray(hourly.time) || hourly.time.length === 0) return null;

  const formatter = localHourKey().slice(0, 13);
  let start = hourly.time.findIndex((t: string) => String(t).slice(0, 13) >= formatter);
  if (start < 0) start = 0;
  const end = Math.min(hourly.time.length, start + 24);

  let waveMax = 0;
  let periodMax = 0;
  let tempSum = 0;
  let tempCount = 0;

  for (let i = start; i < end; i += 1) {
    const wave = Number(hourly.wave_height?.[i]);
    if (Number.isFinite(wave)) waveMax = Math.max(waveMax, wave);
    const period = Number(hourly.wave_period?.[i]);
    if (Number.isFinite(period)) periodMax = Math.max(periodMax, period);
    const temp = Number(hourly.sea_surface_temperature?.[i]);
    if (Number.isFinite(temp)) {
      tempSum += temp;
      tempCount += 1;
    }
  }

  if (waveMax === 0 && tempCount === 0) return null;

  return {
    waveMax: Math.round(waveMax * 10) / 10,
    wavePeriod: Math.round(periodMax),
    seaTemp: tempCount > 0 ? Math.round((tempSum / tempCount) * 10) / 10 : null,
    level: seaLevelOf(waveMax),
  };
}

function toBundle(payload: any, sea: SeaState | null, tide: TideState | null, now: Date): WeatherBundle {
  const current = payload?.current ?? {};
  const daily = payload?.daily ?? {};

  const days: WeatherDay[] = Array.isArray(daily.time)
    ? daily.time.map((date: string, i: number) => ({
        date,
        weekday: new Date(`${date}T00:00:00+07:00`).getUTCDay(),
        code: Number(daily.weather_code?.[i] ?? 0),
        tMax: round(daily.temperature_2m_max?.[i]),
        tMin: round(daily.temperature_2m_min?.[i]),
        precipSum: round(daily.precipitation_sum?.[i]),
        precipProb: round(daily.precipitation_probability_max?.[i]),
        uvMax: round(daily.uv_index_max?.[i]),
        windMax: round(daily.wind_speed_10m_max?.[i]),
        gustMax: round(daily.wind_gusts_10m_max?.[i]),
        sunrise: String(daily.sunrise?.[i] ?? '').slice(11, 16),
        sunset: String(daily.sunset?.[i] ?? '').slice(11, 16),
      }))
    : [];

  if (days.length === 0) throw new Error('no daily data');

  return {
    now: {
      temperature: round(current.temperature_2m),
      apparent: round(current.apparent_temperature),
      humidity: Math.round(Number(current.relative_humidity_2m ?? 0)),
      precipitation: round(current.precipitation),
      windSpeed: round(current.wind_speed_10m),
      windDirection: round(current.wind_direction_10m),
      gust: round(current.wind_gusts_10m),
      cloudCover: Math.round(Number(current.cloud_cover ?? 0)),
      code: Number(current.weather_code ?? 0),
      isDay: Number(current.is_day ?? 1) === 1,
    },
    today: days[0],
    days,
    hours: buildHours(payload),
    sea,
    tide,
    updatedAt: now.toISOString(),
  };
}

/**
 * Returns the current conditions, a multi-day outlook and the coastal sea
 * state, or `null` when the upstream services are unreachable — callers render
 * a neutral placeholder then. A missing sea reading is tolerated on its own:
 * the sea-advice block simply falls back to wind-derived guidance.
 */
export async function getWeather(): Promise<WeatherBundle | null> {
  const at = Date.now();
  if (memo && at - memo.at < REVALIDATE_SECONDS * 1000) return memo.value;

  const [forecast, marine] = await Promise.all([
    fetchJson(`${FORECAST_ENDPOINT}?${new URLSearchParams(FORECAST_QUERY).toString()}`),
    fetchJson(`${MARINE_ENDPOINT}?${new URLSearchParams(MARINE_QUERY).toString()}`),
  ]);

  if (!forecast) return memo?.value ?? null;

  try {
    const bundle = toBundle(forecast, buildSea(marine), buildTide(marine, localHourKey(at)), new Date());
    memo = { at: Date.now(), value: bundle };
    return bundle;
  } catch {
    return memo?.value ?? null;
  }
}
