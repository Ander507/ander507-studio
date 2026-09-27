import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { categoryLabel, type Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  large?: boolean;
}

export default function ProjectCard({ project, locale, large = false }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div
        className={`relative overflow-hidden rounded-lg border border-line bg-mist ${
          large ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[16/10]"
        }`}
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt=""
            fill
            className="object-cover object-top"
            sizes={large ? "(max-width: 1152px) 100vw, 1152px" : "(max-width: 640px) 100vw, 560px"}
          />
        ) : (
          <div className="grid h-full place-items-center text-3xl font-bold text-muted">{project.title}</div>
        )}
      </div>
      <div className={`mt-4 ${large ? "grid gap-2 sm:grid-cols-[1fr_2fr] sm:gap-8" : ""}`}>
        <div>
          <h3 className="text-lg font-bold tracking-tight underline-offset-4 group-hover:underline">
            {project.title}
          </h3>
          <p className="text-sm text-muted">{categoryLabel(project.category, locale)}</p>
        </div>
        <p className={`text-muted ${large ? "" : "mt-2 line-clamp-2"}`}>{project.description}</p>
      </div>
    </Link>
  );
}
