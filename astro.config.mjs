import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
function resolveSite() {
  const raw = (process.env.CURRENT_SITE_DOMAIN ?? 'kepcrabmarket.com').trim();
  const clean = raw.replace(/^https?:\/\//i, '').replace(/\/+$/, '');
  return `https://${clean}`;
}

// The site ships as fully prerendered HTML on Cloudflare Workers. The only
// on-demand rendering is the pair of live islands — conditions and tides — which
// are fetched, cached and rendered on the edge (see src/components/WeatherLive.astro
// and src/components/TidesLive.astro).
//
// Photos live in src/assets and are optimised at build time, so the Worker
// serves plain static files and never pays for image processing at runtime.
export default defineConfig({
  site: resolveSite(),
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  i18n: {
    defaultLocale: 'km',
    locales: ['km', 'en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
