// Single source of truth for the production origin used across canonical URLs, Open Graph
// og:url, and sitemap.xml — currently the live base44.app hosting URL (no custom domain yet).
// Update this one value (and re-run scripts/generateSitemap.js if one exists) once a custom
// domain is live; every canonical/OG tag derives from it, so nothing else needs to change.
export const SITE_URL = "https://the-path-to-jannah-copy-copy-c11d62f8.base44.app";
export const SITE_NAME = "SIRAT";
export const SITE_DEFAULT_IMAGE = `${SITE_URL}/apple-touch-icon.png`;
