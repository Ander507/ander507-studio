import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailPage from "@/components/ProjectDetailPage";
import { getAllProjectSlugs, getProject } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — Ander507.dev`,
      description: project.description,
      url: `https://ander507.dev/projects/${project.slug}`,
      type: "website",
      ...(project.coverImage
        ? { images: [{ url: project.coverImage, alt: `${project.title} cover` }] }
        : {}),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.longDescription,
    url: `https://ander507.dev/projects/${project.slug}`,
    applicationCategory: project.category === "web" ? "WebApplication" : "GameApplication",
    operatingSystem: project.category === "web" ? "Web" : "Minecraft",
    ...(project.coverImage ? { image: `https://ander507.dev${project.coverImage}` } : {}),
    author: {
      "@type": "Person",
      name: "Ander507",
      url: "https://ander507.dev",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailPage project={project} />
    </>
  );
}
