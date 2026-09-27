import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import ProjectGrid from "@/components/site/ProjectGrid";
import { isLocale } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { getProjects } from "@/lib/projects";

interface ProjectsProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: ProjectsProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getContent(lang);
  return {
    title: t.nav.work,
    description: t.projectsPage.body,
    alternates: { canonical: `/${lang}/projects`, languages: { en: "/en/projects", da: "/da/projects", "x-default": "/projects" } },
  };
}

export default async function ProjectsPage({ params }: ProjectsProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getContent(lang);

  return (
    <>
      <Nav locale={lang} />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{t.projectsPage.title}</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">{t.projectsPage.body}</p>
        <div className="mt-12">
          <ProjectGrid projects={getProjects(lang)} locale={lang} allLabel={t.projectsPage.all} />
        </div>

        <div className="mt-24 flex flex-col items-start justify-between gap-6 rounded-lg bg-panel p-8 text-on-panel sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">{t.projectsPage.ctaTitle}</h2>
            <p className="mt-1 text-on-panel/70">{t.projectsPage.ctaBody}</p>
          </div>
          <Link href="/contact" className="rounded-md bg-signal px-6 py-3 font-semibold text-white hover:bg-signal/85">
            {t.projectsPage.cta}
          </Link>
        </div>
      </main>
      <Footer locale={lang} />
    </>
  );
}
