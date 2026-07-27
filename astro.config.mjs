import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
function resolveSite() {
  const raw = (process.env.CURRENT_SITE_DOMAIN ?? 'kepcrabmarket.com').trim();
  const clean = raw.replace(/^https?:\/\//i, '').replace(/\/+$/, '');
  return `https://${clean}`;
}

export default defineConfig({
  site: resolveSite(),
  output: 'static',
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
