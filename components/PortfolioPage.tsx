"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { MotionConfig, motion, useReducedMotion, useSpring } from "motion/react";
import { PROJECTS, type ProjectCategory } from "@/lib/projects";
import TextRoll from "./TextRoll";
import "./portfolio.css";

const CATEGORY: Record<ProjectCategory, string> = {
  web: "Web",
  stardance: "Hack Club",
  desktop: "Desktop",
  minecraft: "Minecraft",
};

const LINKS = [
  { label: "GitHub", href: "https://github.com/Ander507" },
  { label: "Discord", href: "https://discord.gg/cY6Xfc6csX" },
  { label: "itch.io", href: "https://ander507.itch.io/" },
  { label: "Instagram", href: "https://www.instagram.com/ander507_/" },
  { label: "Ko-fi", href: "https://ko-fi.com/ander507" },
];

const STACK = [
  "Next.js",
  "React",
  "Svelte",
  "Tailwind CSS",
  ".NET / WPF",
  "Rust",
  "Java",
  "Tauri",
  "ComfyUI",
  "Stable Diffusion",
  "Vercel",
];

// Newest first; Array.sort is stable, so same-year projects keep their order from lib/projects.
const SORTED = [...PROJECTS].sort((a, b) => Number(b.year) - Number(a.year));
const COVERS = SORTED.filter((project) => project.coverImage);

// Cursor-following preview, adapted from "Hover Image List" by educalvolpz on 21st.dev.
const PREVIEW_WIDTH = 320;
const PREVIEW_HEIGHT = 200;
const CURSOR_GAP = 28;
const SPRING = { damping: 26, stiffness: 260 };
const SKEW_SPRING = { damping: 18, stiffness: 220 };
const MAX_SKEW = 8;
const SKEW_FACTOR = 0.12;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function PortfolioPage() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const lastPointer = useRef<{ t: number; x: number } | null>(null);

  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const skew = useSpring(0, SKEW_SPRING);

  function movePreview(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;

    // Sit to the right of the cursor, or flip to the left near the screen edge.
    const right = event.clientX + CURSOR_GAP;
    const left = right + PREVIEW_WIDTH > window.innerWidth - 16 ? event.clientX - CURSOR_GAP - PREVIEW_WIDTH : right;
    const top = clamp(event.clientY - PREVIEW_HEIGHT / 2, 16, window.innerHeight - PREVIEW_HEIGHT - 16);

    const now = performance.now();
    const previous = lastPointer.current;
    lastPointer.current = { t: now, x: event.clientX };

    // First move after entering the list, or reduced motion: jump instead of flying in from the corner.
    if (!previous || reduceMotion) {
      x.jump(left);
      y.jump(top);
      skew.jump(0);
      return;
    }

    x.set(left);
    y.set(top);
    const dt = Math.min(now - previous.t, 50);
    if (dt > 0) skew.set(clamp(((event.clientX - previous.x) / dt) * SKEW_FACTOR, -MAX_SKEW, MAX_SKEW));
  }

  function leaveList() {
    setActive(null);
    lastPointer.current = null;
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="home">
        <Script id="vercel-analytics" strategy="afterInteractive">
          {`window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`}
        </Script>
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />

        <div className="home-wrap">
          <header className="home-header">
            <h1 className="home-name">
              <TextRoll center lineHeight={0.85}>
                Ander507
              </TextRoll>
            </h1>
            <p className="home-intro">
              18 • coding in my freetime while I study • fueled by White Monster • web apps, Minecraft mods, and
              whatever else I&apos;m building
            </p>
            <ul className="home-links">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <TextRoll>{link.label}</TextRoll>
                  </a>
                </li>
              ))}
              <li>
                <Link href="/contact">
                  <TextRoll>Contact</TextRoll>
                </Link>
              </li>
            </ul>
          </header>

          <main className="home-main" onPointerMove={movePreview} onPointerLeave={leaveList}>
            <h2 className="home-heading">Projects</h2>
            <ul className="project-list">
              {SORTED.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="project-row"
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") setActive(project.slug);
                    }}
                  >
                    <span className="project-title">{project.title}</span>
                    <span className="project-desc">{project.description}</span>
                    <span className="project-category">{CATEGORY[project.category]}</span>
                    <span className="project-year">{project.year}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </main>

          <footer className="home-foot">
            <p className="home-stack">
              <span className="home-stack-label">Stack</span>
              {STACK.join(", ")}
            </p>
            <div className="home-foot-bottom">
              <p>&copy; 2026 Ander507.dev. All systems nominal.</p>
              <Link href="/bio">
                <TextRoll>Bio &amp; links</TextRoll>
              </Link>
            </div>
          </footer>
        </div>

        <motion.div
          className="project-preview"
          aria-hidden
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.94 }}
          transition={{ type: "spring", bounce: 0.1, duration: 0.25 }}
          style={{ x, y, skewX: skew, width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
        >
          {COVERS.map((project) => (
            <motion.div
              key={project.slug}
              className="project-preview-item"
              initial={false}
              animate={{ opacity: active === project.slug ? 1 : 0, scale: active === project.slug ? 1 : 0.96 }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.25 }}
            >
              <Image src={project.coverImage!} alt="" fill sizes={`${PREVIEW_WIDTH}px`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MotionConfig>
  );
}
