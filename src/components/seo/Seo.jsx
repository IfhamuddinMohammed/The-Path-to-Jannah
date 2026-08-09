import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { PAGE_META, DEFAULT_META } from "@/data/pageMeta";
import { SITE_URL, SITE_NAME, SITE_DEFAULT_IMAGE } from "@/lib/siteConfig";

// Rendered once, inside Layout.jsx, so it re-runs on every route change without needing to be
// added to each of the 21 page components individually. Looks up this route's title/description
// from pageMeta.js — previously every route rendered under the exact same static
// "<title>SIRAT</title>" with no meta description or Open Graph tags at all, which is why every
// page looked identical to Google and produced blank link-preview cards when shared.
export default function Seo() {
  // react-helmet-async only ever manages tags it rendered itself — it has no idea the static
  // data-seo-fallback tags in index.html exist, so without removing them explicitly they'd sit
  // alongside Helmet's, leaving two conflicting <meta name="description"> (etc.) tags in the DOM
  // for every JS-executing client. Non-JS crawlers never run this, so they still see the static
  // fallback exactly as intended.
  useEffect(() => {
    document.querySelectorAll("[data-seo-fallback]").forEach((el) => el.remove());
  }, []);

  const { pathname } = useLocation();
  const meta = PAGE_META[pathname] || DEFAULT_META;
  // "/" and "/Home" render the same page (see src/App.jsx) — every internal link uses
  // createPageUrl("Home") => "/Home", so that's treated as the one canonical URL for both,
  // rather than splitting duplicate-content signal across two identical pages.
  const canonicalPath = pathname === "/" ? "/Home" : pathname;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={SITE_DEFAULT_IMAGE} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={SITE_DEFAULT_IMAGE} />
    </Helmet>
  );
}
