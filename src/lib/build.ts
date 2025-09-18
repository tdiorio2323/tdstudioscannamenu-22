/**
 * Build utilities for cache busting and deployment info
 */

// Get build ID from environment or fallback to timestamp
export const BUILD_ID = process.env.NEXT_PUBLIC_BUILD_ID ?? Date.now().toString();

// Cache-busting parameter
export const CACHE_PARAM = `v=${BUILD_ID}`;

// Check if data badge should be shown
export const SHOW_DATA_BADGE = process.env.NEXT_PUBLIC_SHOW_DATA_BADGE === 'true';