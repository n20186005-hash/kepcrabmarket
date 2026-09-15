/**
 * Tide derivation for the Kep Crab Market guide.
 *
 * The marine service returns hourly sea level heights relative to mean sea
 * level. An hourly column of numbers is not what a visitor needs, so this module
 * reduces it to what a tide table actually shows: the next high and low water,
 * when each falls, and how far the water travels between them.
 *
 * The Gulf of Thailand is a diurnal basin — broadly one high and one low a day,
 * arriving roughly 50 minutes later each day — so the extremum finder is tuned
 * for that regime rather than the semi-diurnal rhythm most tide apps assume.
 *
 * Times returned by the upstream service are already local to Asia/Phnom_Penh,
 * so everything here works on wall-clock strings and never touches UTC offsets.
 */

export type TideKind = 'high' | 'low';

export interface TidePoint {
  /** Local hourly stamp, `YYYY-MM-DDTHH:MM`. */
  time: string;
  hour: number;
  /** Height above mean sea level, metres. */
  height: number;
}

export interface TideExtreme {
  kind: TideKind;
  /** Interpolated local wall clock, `HH:MM`. */
  clock: string;
  /** Local calendar day the water falls on, `YYYY-MM-DD`. */
  day: string;
  /** Height above mean sea level, metres. */
  height: number;
  /** Whole hours from now until this water; negative once it has passed. */
  offsetHours: number;
}

export interface TideState {
  /** Local hour the whole state is anchored to, `YYYY-MM-DDTHH`. */
  now: string;
  /** Hourly heights, aligned to `now`, for drawing the curve. */
  series: TidePoint[];
  extremes: TideExtreme[];
  /** First high or low water still ahead, or null when none falls in the window. */
  next: TideExtreme | null;
  /** Height at the current hour, metres above mean sea level. */
  level: number;
  /** True while the water is still coming in. */
  rising: boolean;
  /** Highest and lowest water expected in the next 24 hours. */
  min: number;
  max: number;
}

/**
 * Hours either side of a candidate used to decide whether it is a real turning
 * point. Half a diurnal cycle is ~12 h, so a six-hour window can never contain a
 * second genuine high (or low), but it does swallow the small wobbles that a
 * shallow, semi-enclosed gulf produces between the two main turns of the day.
 */
const PROMINENCE_WINDOW = 6;

/** A high and the low after it must differ by at least this much (metres) to be
 *  worth listing; anything smaller reads as noise rather than as a tide. */
const MIN_SWING = 0.15;

function parseLocal(time: string): number {
  const year = Number(time.slice(0, 4));
  const month = Number(time.slice(5, 7));
  const day = Number(time.slice(8, 10));
  const hour = Number(time.slice(11, 13));
  const minute = Number(time.slice(14, 16)) || 0;
  return Date.UTC(year, month - 1, day, hour, minute) / 60_000;
}

function formatLocal(minutes: number): { day: string; clock: string } {
  const date = new Date(minutes * 60_000);
  const pad = (value: number) => String(value).padStart(2, '0');
  return {
    day: `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`,
    clock: `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`,
  };
}

/** Quadratic peak offset, in hours, of the point between two neighbours. */
function peakOffset(before: TidePoint, peak: TidePoint, after: TidePoint): number {
  const denominator = before.height - 2 * peak.height + after.height;
  if (denominator === 0) return 0;
  return Math.max(-0.5, Math.min(0.5, (0.5 * (before.height - after.height)) / denominator));
}

interface Candidate {
  index: number;
  kind: TideKind;
  height: number;
}

function findCandidates(series: TidePoint[]): Candidate[] {
  const found: Candidate[] = [];

  for (let i = 1; i < series.length - 1; i += 1) {
    const previous = series[i - 1].height;
    const current = series[i].height;
    const following = series[i + 1].height;

    let kind: TideKind | null = null;
    if (current > previous && current >= following) kind = 'high';
    else if (current < previous && current <= following) kind = 'low';
    if (!kind) continue;

    const last = found[found.length - 1];
    if (last && last.kind === kind) {
      // A flat stretch can report the same turn twice; keep the stronger reading.
      const stronger = kind === 'high' ? current > last.height : current < last.height;
      if (stronger) found[found.length - 1] = { index: i, kind, height: current };
      continue;
    }

    found.push({ index: i, kind, height: current });
  }

  return found;
}

/** True when nothing within the prominence window rises above (or falls below) it. */
function isProminent(series: TidePoint[], candidate: Candidate): boolean {
  const from = Math.max(0, candidate.index - PROMINENCE_WINDOW);
  const to = Math.min(series.length - 1, candidate.index + PROMINENCE_WINDOW);

  for (let i = from; i <= to; i += 1) {
    if (i === candidate.index) continue;
    const height = series[i].height;
    if (candidate.kind === 'high' ? height > candidate.height : height < candidate.height) return false;
  }

  return true;
}

function toExtreme(series: TidePoint[], candidate: Candidate, nowMinutes: number): TideExtreme {
  const { index, kind } = candidate;
  const offset = peakOffset(series[index - 1], series[index], series[index + 1]);
  const at = parseLocal(series[index].time) + offset * 60;
  const { day, clock } = formatLocal(Math.round(at));

  return {
    kind,
    clock,
    day,
    height: Math.round(candidate.height * 100) / 100,
    offsetHours: Math.round((at - nowMinutes) / 60),
  };
}

/**
 * Reduces an hourly sea level column to the high and low waters it contains.
 * Returns null when the payload carries no usable sea level series, so callers
 * can fall back to the rest of the page.
 */
export function buildTide(payload: any, nowKey: string): TideState | null {
  const hourly = payload?.hourly ?? {};
  if (!Array.isArray(hourly.time)) return null;

  const series: TidePoint[] = hourly.time
    .map((time: string, i: number) => ({
      time: String(time),
      hour: Number(String(time).slice(11, 13)),
      height: Number(hourly.sea_level_height_msl?.[i]),
    }))
    .filter((point: TidePoint) => Number.isFinite(point.height));

  if (series.length < 12) return null;

  const nowMinutes = parseLocal(`${nowKey}:00`);
  const kept: Candidate[] = [];

  for (const candidate of findCandidates(series)) {
    if (!isProminent(series, candidate)) continue;

    const last = kept[kept.length - 1];
    if (last) {
      // A turning point that barely moves the water is a wobble, not a tide.
      if (Math.abs(candidate.height - last.height) < MIN_SWING) {
        kept.pop();
        continue;
      }
    }

    kept.push(candidate);
  }

  const extremes = kept.map((candidate) => toExtreme(series, candidate, nowMinutes));

  const nowIndex = Math.max(
    0,
    series.findIndex((point) => point.time.slice(0, 13) >= nowKey),
  );
  const level = series[nowIndex].height;
  const following = series[nowIndex + 1] ?? series[nowIndex - 1] ?? series[nowIndex];

  const nextDay = series.slice(nowIndex, nowIndex + 24);

  return {
    now: nowKey,
    series,
    extremes,
    next: extremes.find((extreme) => parseLocal(`${extreme.day}T${extreme.clock}`) > nowMinutes) ?? null,
    level: Math.round(level * 100) / 100,
    rising: following.height > level,
    min: Math.round(Math.min(...nextDay.map((point) => point.height)) * 100) / 100,
    max: Math.round(Math.max(...nextDay.map((point) => point.height)) * 100) / 100,
  };
}

/** Extremes still ahead, oldest first. */
export function upcoming(state: TideState): TideExtreme[] {
  return state.extremes.filter((extreme) => extreme.offsetHours >= 0);
}

/** Next water of a given kind, or null when none is forecast in the window. */
export function nextOf(state: TideState, kind: TideKind): TideExtreme | null {
  return upcoming(state).find((extreme) => extreme.kind === kind) ?? null;
}

/** How far the water travels over the next 24 hours — a far more meaningful
 *  "today" figure than the spread across the whole forecast window. */
export function range24h(state: TideState): number {
  return Math.round((state.max - state.min) * 100) / 100;
}
