"use client";

import { useState } from "react";
import Script from "next/script";
import TechStack from "./TechStack";
import "./portfolio.css";

type Filter = "all" | "web" | "minecraft";

interface Project {
  title: string;
  href: string;
  category: "web" | "minecraft";
  external?: boolean;
  status: string;
  statusColor?: string;
  description: string;
  tags: string[];
  className: string;
}

const PROJECTS: Project[] = [
  {
    title: "Ztionix",
    href: "https://www.ztionix.tech/",
    category: "web",
    external: true,
    status: "Online",
    description:
      "A collection of experimental projects, secure communications, and digital utilities featuring the Sakovajo Protocol brainrot translator.",
    tags: ["Next.js", "React", "Vercel"],
    className: "ztionix",
  },
  {
    title: "zlib.lol",
    href: "https://www.zlib.lol/",
    category: "web",
    external: true,
    status: "Online",
    description:
      "The smart link generator. A highly secure platform to drag files, paste text, or shorten URLs instantly with burn-after-read capabilities.",
    tags: ["Next.js", "Zero-knowledge"],
    className: "zlib",
  },
  {
    title: "NoteForge AI",
    href: "/noteai",
    category: "web",
    status: "Active",
    statusColor: "#3b82f6",
    description:
      "AI-Powered Study Notes generator. Upload lectures, PDFs, slides, or notes and get perfect Obsidian-ready Markdown in seconds.",
    tags: ["JavaScript", "Gemini API"],
    className: "noteai",
  },
  {
    title: "PacketSpy",
    href: "https://modrinth.com/mod/packet-spy",
    category: "minecraft",
    external: true,
    status: "Online",
    description:
      "A Minecraft mod made to debug and log packets sent and received by the client. It hosts a local website via Java WebSockets to inspect the data.",
    tags: ["Minecraft Mod", "Java", "WebSockets"],
    className: "packetspy",
  },
  {
    title: "CatzyCraft",
    href: "https://modrinth.com/modpack/catzycraft",
    category: "minecraft",
    external: true,
    status: "Online",
    description:
      "The purr-fectly fun and techy Minecraft modpack! The ultimate mix of silly fun and cool tech stuff, perfect for you and your friends to play together.",
    tags: ["Minecraft Modpack", "Multiplayer", "Tech"],
    className: "catzycraft",
  },
];

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Websites & Apps", value: "web" },
  { label: "Minecraft", value: "minecraft" },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const visibleProjects = PROJECTS.filter(
    (project) => activeFilter === "all" || project.category === activeFilter,
  );

  return (
    <div className="portfolio-page">
      <Script id="vercel-analytics" strategy="afterInteractive">
        {`window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`}
      </Script>
      <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2849247335999308"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <div className="container">
        <header>
          <h1>Ander507.dev</h1>
          <p className="subtitle">
            18 • coding in my freetime while I study • fueled by White Monster • web apps,
            Minecraft mods, and whatever else I&apos;m building
          </p>
          <a href="/bio" className="bio-btn">
            My Bio &amp; Links →
          </a>
        </header>

        <main>
          <div className="filters">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={`filter-btn${activeFilter === filter.value ? " active" : ""}`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid">
            {visibleProjects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                className={`card ${project.className}`}
                target={project.external ? "_blank" : undefined}
                rel={project.external ? "noopener noreferrer" : undefined}
              >
                <div className="card-header">
                  <h2 className="card-title">{project.title}</h2>
                  <div className="status-indicator">
                    <div
                      className="status-dot"
                      style={
                        project.statusColor
                          ? {
                              backgroundColor: project.statusColor,
                              boxShadow: `0 0 8px ${project.statusColor}`,
                            }
                          : undefined
                      }
                    />
                    {project.status}
                  </div>
                </div>
                <p className="card-desc">{project.description}</p>
                <div className="card-footer">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </main>

        <TechStack />

        <section className="support-section">
          <h2>Support my work</h2>
          <p>
            If you like my projects, use my mods, or just want to help keep the servers running —
            every coffee helps.
          </p>
          <a
            href="https://ko-fi.com/ander507"
            className="kofi-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            ☕ Buy me a coffee
          </a>
        </section>

        <footer>
          <p>&copy; 2026 Ander507.dev. All systems nominal.</p>
          <p style={{ marginTop: "0.75rem" }}>
            <a href="/contact" className="footer-link">
              Contact
            </a>
          </p>
          <div className="social-links">
            <a
              href="https://github.com/ander507"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://ko-fi.com/ander507"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ko-fi"
            >
              <svg viewBox="0 0 24 24">
                <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/ander507_/"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://discord.gg/cY6Xfc6csX"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
            >
              <svg viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
