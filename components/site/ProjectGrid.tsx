"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { CATEGORY_LABELS, CATEGORY_LABELS_DA, type Project, type ProjectCategory } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

type Filter = "all" | ProjectCategory;

interface ProjectGridProps {
  projects: Project[];
  locale: Locale;
  allLabel: string;
}

export default function ProjectGrid({ projects, locale, allLabel }: ProjectGridProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = projects.filter((project) => filter === "all" || project.category === filter);

  const filters: { label: string; value: Filter }[] = [
    { label: allLabel, value: "all" },
    ...(Object.keys(CATEGORY_LABELS) as ProjectCategory[]).map((category) => ({
      label: locale === "da" ? CATEGORY_LABELS_DA[category] : CATEGORY_LABELS[category].short,
      value: category,
    })),
  ];

  return (
    <>
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-4" role="group">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value)}
            aria-pressed={filter === item.value}
            className={`text-sm ${
              filter === item.value
                ? "font-semibold text-ink underline decoration-signal decoration-2 underline-offset-8"
                : "text-muted hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>
    </>
  );
}
