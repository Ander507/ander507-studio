import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { PROJECTS } from "@/lib/projects";
import { SITE } from "@/lib/site";

const PAGES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
  { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
  { path: "/bio", priority: 0.5, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ...PROJECTS.map((project) => ({
    path: `/projects/${project.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const localized = PAGES.flatMap((page) =>
    LOCALES.map((lang) => ({
      url: `${SITE.url}/${lang}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE.url}/${l}${page.path}`])),
      },
    })),
  );

  return [
    ...localized,
    // Static page served via `public/` + a rewrite in `next.config.ts`.
    { url: `${SITE.url}/noteai`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
