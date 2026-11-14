import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site-url";

export default function robots(): MetadataRoute.Robots {
  // Vercel preview deployments stay out of search results; only production is indexed.
  const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
  return isProduction
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
