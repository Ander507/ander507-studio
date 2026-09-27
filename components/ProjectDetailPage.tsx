"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { CATEGORY_LABELS, PROJECTS } from "@/lib/projects";
import { MotionConfig } from "motion/react";
import TextRoll from "./TextRoll";
import "./project-detail.css";

interface ProjectDetailPageProps {
  project: Project;
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const shots = project.screenshots;

  const index = PROJECTS.findIndex((item) => item.slug === project.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(
    () => setLightboxIndex((current) => (current === null ? null : (current - 1 + shots.length) % shots.length)),
    [shots.length],
  );
  const showNext = useCallback(
    () => setLightboxIndex((current) => (current === null ? null : (current + 1) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="detail">
        <div className="detail-wrap">
          <div className="detail-info">
            <Link href="/" className="detail-back">
              <TextRoll>← Ander507</TextRoll>
            </Link>

            <header className="detail-header">
              <h1>{project.title}</h1>
              <p className="detail-desc">{project.description}</p>
              <ul className="detail-links">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      <TextRoll>{link.label}</TextRoll>
                    </a>
                  </li>
                ))}
              </ul>
            </header>

            <dl className="detail-meta">
              <div>
                <dt>Type</dt>
                <dd>{CATEGORY_LABELS[project.category].long}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{project.status}</dd>
              </div>
              <div>
                <dt>Built with</dt>
                <dd>{project.tags.join(", ")}</dd>
              </div>
            </dl>
          </div>

          <div className="detail-main">
            {shots.length > 0 ? (
              <div className="detail-shots">
                {shots.map((shot, i) => (
                  <figure key={shot.src}>
                    <button type="button" onClick={() => setLightboxIndex(i)} aria-label={`Enlarge: ${shot.alt}`}>
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        priority={i === 0}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </button>
                    <figcaption>{shot.alt}</figcaption>
                  </figure>
                ))}
              </div>
            ) : project.coverImage ? (
              <div className="detail-shots">
                <figure>
                  <div className="detail-cover">
                    <Image src={project.coverImage} alt="" fill priority sizes="(max-width: 1024px) 100vw, 60vw" />
                  </div>
                </figure>
              </div>
            ) : null}

            <section className="detail-body">
              <h2>About</h2>
              <p>{project.longDescription}</p>

              <h2>Features</h2>
              <ul className="detail-features">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>

            {next && next.slug !== project.slug && (
              <Link href={`/projects/${next.slug}`} className="detail-next">
                <span className="detail-next-label">Next project</span>
                <TextRoll lineHeight={1}>{next.title}</TextRoll>
              </Link>
            )}
          </div>
        </div>

        {lightboxIndex !== null && (
          <div className="lightbox" role="dialog" aria-modal="true" aria-label="Screenshot viewer" onClick={closeLightbox}>
            <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Close">
              ×
            </button>
            {shots.length > 1 && (
              <button
                type="button"
                className="lightbox-nav lightbox-prev"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous screenshot"
              >
                ‹
              </button>
            )}
            <figure className="lightbox-content" onClick={(event) => event.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shots[lightboxIndex].src} alt={shots[lightboxIndex].alt} />
              <figcaption>{shots[lightboxIndex].alt}</figcaption>
            </figure>
            {shots.length > 1 && (
              <button
                type="button"
                className="lightbox-nav lightbox-next"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                aria-label="Next screenshot"
              >
                ›
              </button>
            )}
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
