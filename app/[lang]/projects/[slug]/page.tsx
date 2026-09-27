import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import ScreenshotGallery from "@/components/site/ScreenshotGallery";
import { isLocale } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { getAllProjectSlugs, getProject, categoryLabel, CATEGORY_LABELS } from "@/lib/projects";
import { SITE } from "@/lib/site";

interface ProjectPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = isLocale(lang) ? getProject(slug, lang) : undefined;
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: { en: `/en/projects/${slug}`, da: `/da/projects/${slug}`, "x-default": `/projects/${slug}` },
    },
    openGraph: {
      title: `${project.title} · ${SITE.name}`,
      description: project.description,
      url: `${SITE.url}/${lang}/projects/${slug}`,
      type: "website",
      ...(project.coverImage ? { images: [{ url: project.coverImage, alt: project.title }] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const project = getProject(slug, lang);
  if (!project) notFound();
  const t = getContent(lang);

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE.domain, item: `${SITE.url}/${lang}` },
      { "@type": "ListItem", position: 2, name: t.nav.work, item: `${SITE.url}/${lang}/projects` },
      { "@type": "ListItem", position: 3, name: project.title },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    inLanguage: lang,
    name: project.title,
    description: project.longDescription,
    url: `${SITE.url}/${lang}/projects/${project.slug}`,
    applicationCategory: CATEGORY_LABELS[project.category].schemaCategory,
    operatingSystem: CATEGORY_LABELS[project.category].schemaOS,
    ...(project.coverImage ? { image: `${SITE.url}${project.coverImage}` } : {}),
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
  };

  const [primaryLink, ...otherLinks] = project.links;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Nav locale={lang} />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t.project.back}
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">{project.title}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{project.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-end">
            {primaryLink && (
              <a
                href={primaryLink.href}
                target={primaryLink.external ? "_blank" : undefined}
                rel={primaryLink.external ? "noopener noreferrer" : undefined}
                className="rounded-md bg-ink px-5 py-3 font-semibold text-paper hover:bg-ink/85"
              >
                {primaryLink.label}
              </a>
            )}
            {otherLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="font-semibold underline underline-offset-4 hover:text-signal"
              >
                {link.label}
              </a>
            ))}
          </div>
        </header>

        <div className="mt-10">
          {project.screenshots.length > 0 ? (
            <ScreenshotGallery screenshots={project.screenshots} text={t.project} />
          ) : project.coverImage ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-line">
              <Image src={project.coverImage} alt="" fill priority className="object-cover" sizes="1152px" />
            </div>
          ) : null}
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <section>
            <h2 className="text-2xl font-extrabold tracking-tight">{t.project.about}</h2>
            <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-muted">{project.longDescription}</p>

            <h2 className="mt-12 text-2xl font-extrabold tracking-tight">{t.project.features}</h2>
            <ul className="mt-4 grid gap-2.5 text-muted">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-2.5 h-1 w-3 shrink-0 bg-signal" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <dl className="grid h-fit gap-6 border-t-2 border-ink pt-6">
            <div>
              <dt className="text-sm text-muted">{t.project.type}</dt>
              <dd className="mt-1 font-semibold">{categoryLabel(project.category, lang)}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">{t.project.status}</dt>
              <dd className="mt-1 font-semibold">
                {project.status}, {project.year}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">{t.project.builtWith}</dt>
              <dd className="mt-1 font-semibold">{project.tags.join(", ")}</dd>
            </div>
          </dl>
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
