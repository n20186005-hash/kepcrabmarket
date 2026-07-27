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

// nav must have 11 entries
for (const l of langs) {
  const n = Object.keys(data[l].nav).length;
  if (n !== 11) { console.log(`[${l}] nav keys = ${n} (expected 11)`); problems++; }
}

// touristType present and array
for (const l of langs) {
  if (!Array.isArray(data[l].meta.touristType)) { console.log(`[${l}] meta.touristType missing`); problems++; }
}

if (problems === 0) {
  console.log('OK: key parity, gallery(25), nav(11), touristType all consistent across km/en/zh.');
} else {
  console.log(`\n${problems} problem(s) found.`);
  process.exit(1);
}
