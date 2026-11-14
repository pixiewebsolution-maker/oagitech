import type { MetadataRoute } from "next";
import { categories, pages } from "@/data/catalog";
import { SITE_URL } from "@/data/site-url";

const UPDATED = "2026-11-15";

export default function sitemap(): MetadataRoute.Sitemap {
  const hubs = Object.values(categories)
    .map((c) => c.hub)
    .filter((h): h is string => Boolean(h));

  return [
    { url: `${SITE_URL}/`, lastModified: UPDATED, changeFrequency: "monthly", priority: 1 },
    ...hubs.map((h) => ({ url: `${SITE_URL}${h}`, lastModified: UPDATED, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...pages.map((p) => ({ url: `${SITE_URL}${p.route}`, lastModified: UPDATED, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${SITE_URL}/contact`, lastModified: UPDATED, changeFrequency: "yearly", priority: 0.6 },
  ];
}
