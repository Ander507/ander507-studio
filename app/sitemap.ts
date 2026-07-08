import type { MetadataRoute } from "next";

const SITE_URL = "https://ander507.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/bio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // These two are static pages served via `public/` + rewrites in `next.config.ts`.
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/noteai`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}

