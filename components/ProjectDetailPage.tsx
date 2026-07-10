"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import "./project-detail.css";

interface ProjectDetailPageProps {
  project: Project;
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null;
      return current === 0 ? project.screenshots.length - 1 : current - 1;
    });
  }, [project.screenshots.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null;
      return current === project.screenshots.length - 1 ? 0 : current + 1;
    });
  }, [project.screenshots.length]);

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

  const primaryLink = project.links[0];

  return (
    <div className={`project-detail-page ${project.className}`}>
      <div className="project-ambient" aria-hidden />

      <div className="project-detail-container">
        <Link href="/" className="project-back-link">
          <span className="project-back-icon" aria-hidden>
            ←
          </span>
          Back to portfolio
        </Link>

        <div className="project-banner">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt=""
              fill
              priority
              className="project-banner-image"
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
          ) : (
            <div className="project-banner-placeholder" />
          )}
          <div className="project-banner-vignette" />
        </div>

        <header className="project-header-card">
          <div className="project-header-main">
            <div className="project-meta-row">
              <span className="project-category">
                {project.category === "web" ? "Web App" : "Minecraft"}
              </span>
              <span className="project-status">
                <span
                  className="project-status-dot"
                  style={
                    project.statusColor
                      ? {
                          backgroundColor: project.statusColor,
                          boxShadow: `0 0 10px ${project.statusColor}`,
                        }
                      : undefined
                  }
                />
                {project.status}
              </span>
              <span className="project-year">{project.year}</span>
            </div>

            <h1>{project.title}</h1>
            <p className="project-tagline">{project.description}</p>

            <div className="project-tag-row">
              {project.tags.map((tag) => (
                <span key={tag} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="project-header-side">
            {primaryLink && (
              <a
                href={primaryLink.href}
                className="project-cta-primary"
                target={primaryLink.external ? "_blank" : undefined}
                rel={primaryLink.external ? "noopener noreferrer" : undefined}
              >
                {primaryLink.label}
                <span aria-hidden>→</span>
              </a>
            )}

            <dl className="project-quick-details">
              <div>
                <dt>Category</dt>
                <dd>{project.category === "web" ? "Website & App" : "Minecraft"}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{project.status}</dd>
              </div>
              <div>
                <dt>Tech</dt>
                <dd>{project.tags.join(" · ")}</dd>
              </div>
            </dl>
          </aside>
        </header>

        {project.screenshots.length > 0 && (
          <section className="project-section project-gallery">
            <div className="project-section-head">
              <h2>Screenshots</h2>
              <p>Click to expand</p>
            </div>

            <button
              type="button"
              className="project-featured-shot"
              onClick={() => setLightboxIndex(activeScreenshot)}
              aria-label={`View screenshot: ${project.screenshots[activeScreenshot].alt}`}
            >
              <Image
                src={project.screenshots[activeScreenshot].src}
                alt={project.screenshots[activeScreenshot].alt}
                fill
                className="project-featured-shot-image"
                sizes="(max-width: 1100px) 100vw, 1100px"
              />
              <span className="project-featured-shot-label">
                {project.screenshots[activeScreenshot].alt}
              </span>
            </button>

            {project.screenshots.length > 1 && (
              <div className="project-gallery-strip" role="list">
                {project.screenshots.map((screenshot, index) => (
                  <button
                    key={screenshot.src}
                    type="button"
                    role="listitem"
                    className={`project-gallery-thumb${activeScreenshot === index ? " active" : ""}`}
                    onClick={() => setActiveScreenshot(index)}
                    aria-label={`Show screenshot: ${screenshot.alt}`}
                    aria-current={activeScreenshot === index}
                  >
                    <Image
                      src={screenshot.src}
                      alt=""
                      fill
                      className="project-gallery-thumb-image"
                      sizes="160px"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        <div className="project-content-grid">
          <section className="project-section">
            <h2>About</h2>
            <p className="project-about">{project.longDescription}</p>
          </section>

          <section className="project-section">
            <h2>Features</h2>
            <ul className="project-features">
              {project.features.map((feature) => (
                <li key={feature}>
                  <span className="project-feature-icon" aria-hidden>
                    ✦
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot viewer"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="project-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close screenshot viewer"
          >
            ×
          </button>
          {project.screenshots.length > 1 && (
            <button
              type="button"
              className="project-lightbox-nav project-lightbox-prev"
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              aria-label="Previous screenshot"
            >
              ‹
            </button>
          )}
          <div className="project-lightbox-content" onClick={(event) => event.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.screenshots[lightboxIndex].src}
              alt={project.screenshots[lightboxIndex].alt}
              className="project-lightbox-image"
            />
            <p className="project-lightbox-caption">{project.screenshots[lightboxIndex].alt}</p>
          </div>
          {project.screenshots.length > 1 && (
            <button
              type="button"
              className="project-lightbox-nav project-lightbox-next"
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
  );
}
