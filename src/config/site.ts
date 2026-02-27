/**
 * Site configuration
 *
 * Two key settings to update before deploying:
 *
 * 1. `url`            — The domain the site will be hosted on.
 *                       Used for canonical URLs, Open Graph tags, and sitemaps.
 *
 * 2. `trailingSlash`  — Whether internal links end with a slash.
 *                       Set to `true`  if your host requires /about/
 *                       Set to `false` if your host prefers  /about
 *                       (must match the `trailingSlash` option in astro.config.mjs)
 */
export const siteConfig = {
  url: "https://mesco.pages.dev",
  email: "kyriah@mesco.au",
  phone: "+61 431 308 396",
  trailingSlash: true,
} as const;

/**
 * Generates an internal URL path, applying the trailing-slash rule from siteConfig.
 *
 * Pass the canonical path without a trailing slash, e.g. link("/about").
 * The root "/" is always returned unchanged.
 *
 * @example
 * link("/about")         // → "/about"  or "/about/"
 * link("/services/foo")  // → "/services/foo" or "/services/foo/"
 */
export function link(path: string): string {
  if (path === "/" || path === "") return "/";
  const clean = path.replace(/\/$/, "");
  return siteConfig.trailingSlash ? `${clean}/` : clean;
}
