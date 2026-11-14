import type { NextConfig } from "next";
import pages from "./data/pages.json";

// Old WordPress URLs (e.g. /welding-2/) permanently redirect to the new routes so search rankings carry over.
const oldUrlRedirects = (pages as { old: string; route: string }[])
  .map((p) => ({ source: p.old.replace(/\/$/, ""), destination: p.route, permanent: true }))
  .filter((r) => r.source !== r.destination);

// Public assets keep their filenames, so they get a week of browser cache plus background revalidation.
const assetCache = "public, max-age=604800, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1920, 2560],
    minimumCacheTTL: 2678400, // 31 days on Vercel's image cache
  },
  redirects() {
    return [...oldUrlRedirects, { source: "/contact-us", destination: "/contact", permanent: true }];
  },
  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      { source: "/photos/:file*", headers: [{ key: "Cache-Control", value: assetCache }] },
      { source: "/old/:file*", headers: [{ key: "Cache-Control", value: assetCache }] },
      { source: "/brand/:file*", headers: [{ key: "Cache-Control", value: assetCache }] },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
