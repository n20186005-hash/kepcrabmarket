/**
 * Single source of truth for the photo set.
 *
 * Photos live in `src/assets/gallery` under the `kep-crab-market-N.jpg` naming
 * convention, which lets the build emit responsive, compressed derivatives
 * instead of shipping multi-megabyte camera originals from `public/`.
 */
import type { ImageMetadata } from 'astro';

const modules = import.meta.glob<{ default: ImageMetadata }>('../assets/gallery/*.jpg', { eager: true });

/** Photos in numeric order (…-2 before …-10), not the alphabetical glob order. */
export const galleryImages: ImageMetadata[] = Object.entries(modules)
  .map(([filePath, mod]) => ({ order: Number(filePath.match(/-(\d+)\.jpg$/)?.[1] ?? 0), image: mod.default }))
  .sort((a, b) => a.order - b.order)
  .map((entry) => entry.image);

/** Lead photo, reused for the hero figure. */
export const heroPhoto = galleryImages[0];
