import type { MetadataRoute } from "next";
import { contentRoutes } from "@/data/catalog";
import { SITE_URL } from "@/data/site-url";

const UPDATED = "2026-11-17";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", ...contentRoutes, "/training/register", "/contact"];
  return routes.map((r) => ({
    url: `${SITE_URL}${r === "/" ? "/" : r}`,
    lastModified: UPDATED,
    changeFrequency: "monthly" as const,
    priority: r === "/" ? 1 : r.split("/").length === 2 ? 0.8 : 0.7,
  }));
}
