import type { NextConfig } from "next";
import { oldUrlRedirects } from "./data/redirects";

// Old WordPress URLs (e.g. /welding-2/) permanently redirect to the closest new page so search rankings carry over.
const redirectList = Object.entries(oldUrlRedirects).map(([source, destination]) => ({ source, destination, permanent: true }));

// Public assets keep their filenames, so they get a week of browser cache plus background revalidation.
const assetCache = "public, max-age=604800, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1920, 2560],
    minimumCacheTTL: 2678400, // 31 days on Vercel's image cache
  },
  redirects() {
    return redirectList;
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
      { source: "/accreditations/:file*", headers: [{ key: "Cache-Control", value: assetCache }] },
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
