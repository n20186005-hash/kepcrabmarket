import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

export const prerender = true;

// Generated rather than dropped in public/ so the sitemap URL follows
// CURRENT_SITE_DOMAIN instead of hardcoding a host that could drift from it.
export const GET: APIRoute = () =>
  new Response(
    ['User-agent: *', 'Allow: /', '', `Sitemap: ${siteConfig.baseUrl}/sitemap.xml`, ''].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
