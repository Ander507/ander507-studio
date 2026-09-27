"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, Shuffle } from "lucide-react";
import type { Content } from "@/lib/content";
import { HERO_SITES } from "@/lib/site";

const INTERVAL_MS = 3000;

/** Looks for the visitor's pretend homepage. Deliberately different from each other, like different clients. */
const MOCK_STYLES = [
  { bg: "#f6efe4", fg: "#3b2a1a", accent: "#c2692f", font: "Georgia, 'Times New Roman', serif", radius: "2px" },
  { bg: "#0f1a14", fg: "#e9f5ec", accent: "#7ee0a1", font: "var(--font-schibsted), sans-serif", radius: "999px" },
  { bg: "#eaf1ff", fg: "#0d2a66", accent: "#2f5bff", font: "var(--font-schibsted), sans-serif", radius: "6px" },
  { bg: "#ffe9ef", fg: "#4a0f25", accent: "#e0406f", font: "'Trebuchet MS', 'Segoe UI', sans-serif", radius: "14px" },
];

function toDomain(name: string, tld: string): string {
  const slug = name
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9-]/g, "");
  return (slug || "ditfirma") + tld;
}

// Cycles through live sites I've built and ends on an empty slot for the visitor's business.
// Typing a business name below the window turns that slot into a small homepage for it.
export default function HeroBrowser({ text }: { text: Content["hero"] }) {
  const inputId = useId();
  const slideCount = HERO_SITES.length + 1;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [name, setName] = useState("");
  const [styleIndex, setStyleIndex] = useState(0);

  const trimmed = name.trim();
  const personal = trimmed.length > 0;

  useEffect(() => {
    if (paused || personal || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % slideCount), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, personal, slideCount]);

  const onPlaceholder = personal || index === HERO_SITES.length;
  const domain = personal
    ? toDomain(trimmed, text.tldSuffix)
    : onPlaceholder
      ? text.placeholderDomain
      : HERO_SITES[index].domain;
  const style = MOCK_STYLES[styleIndex];
  const headlineSize = trimmed.length > 18 ? "7cqw" : trimmed.length > 10 ? "9cqw" : "11cqw";

  return (
    <div>
      <div
        className="overflow-hidden rounded-lg border border-line bg-paper shadow-[0_30px_60px_-30px_var(--shadow)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex items-center gap-3 border-b border-line bg-mist px-3 py-2.5">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded bg-paper px-3 py-1 text-sm text-muted">
            <Lock className="h-3 w-3 shrink-0" aria-hidden />
            <span aria-live="polite" className={`truncate ${onPlaceholder ? "font-semibold text-signal" : ""}`}>
              {domain}
            </span>
          </div>
        </div>

        <div className="@container relative aspect-[16/10] bg-mist">
          {HERO_SITES.map((site, i) => (
            <Image
              key={site.domain}
              src={site.image}
              alt={site.domain}
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 620px"
              className={`object-cover object-top transition-opacity duration-700 ${
                !onPlaceholder && i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Empty slot at the end of the carousel. */}
          <div
            className={`absolute inset-0 flex flex-col justify-between bg-paper p-6 transition-opacity duration-700 sm:p-8 ${
              onPlaceholder && !personal ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={!onPlaceholder || personal}
          >
            <div className="space-y-2" aria-hidden>
              <div className="h-3 w-24 rounded-sm bg-mist" />
              <div className="h-3 w-40 rounded-sm bg-mist" />
            </div>
            <div>
              <p className="max-w-xs text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                {text.placeholderText}
              </p>
              <Link
                href="/contact"
                tabIndex={onPlaceholder && !personal ? 0 : -1}
                className="mt-5 inline-block rounded-md bg-signal px-4 py-2 text-sm font-semibold text-white hover:bg-signal/85"
              >
                {text.placeholderCta}
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3" aria-hidden>
              <div className="h-12 rounded-sm bg-mist" />
              <div className="h-12 rounded-sm bg-mist" />
              <div className="h-12 rounded-sm bg-mist" />
            </div>
          </div>

          {/* The visitor's own pretend homepage. */}
          <div
            className={`absolute inset-0 flex flex-col transition-opacity duration-300 ${
              personal ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            style={{ background: style.bg, color: style.fg, fontFamily: style.font }}
            aria-hidden
          >
            <div className="flex items-center justify-between px-[5cqw] py-[3.5cqw] text-[2.6cqw]">
              <span className="font-bold">{trimmed}</span>
              <span className="flex gap-[3cqw] opacity-70">
                {text.mock.links.map((link) => (
                  <span key={link}>{link}</span>
                ))}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center px-[5cqw]">
              <p className="font-bold leading-[1.02] tracking-tight" style={{ fontSize: headlineSize }}>
                {trimmed}
              </p>
              <p className="mt-[2cqw] max-w-[60cqw] text-[2.8cqw] opacity-75">{text.mock.tagline}</p>
              <span
                className="mt-[3cqw] w-fit px-[3cqw] py-[1.4cqw] text-[2.4cqw] font-semibold"
                style={{ background: style.accent, color: style.bg, borderRadius: style.radius }}
              >
                {text.mock.button}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-[2cqw] px-[5cqw] pb-[4cqw]">
              {[0.35, 0.2, 0.5].map((alpha) => (
                <div
                  key={alpha}
                  className="h-[9cqw]"
                  style={{
                    background: `color-mix(in srgb, ${style.accent} ${alpha * 100}%, transparent)`,
                    borderRadius: style.radius === "999px" ? "12px" : style.radius,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label htmlFor={inputId} className="text-sm font-semibold">
          {text.tryLabel}
        </label>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <input
            id={inputId}
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={40}
            placeholder={text.tryPlaceholder}
            autoComplete="organization"
            className="min-w-0 flex-1 rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none placeholder:text-muted/70 focus:border-ink"
          />
          {personal && (
            <button
              type="button"
              onClick={() => setStyleIndex((i) => (i + 1) % MOCK_STYLES.length)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line px-3 py-2 text-sm font-semibold hover:border-ink"
            >
              <Shuffle className="h-3.5 w-3.5" aria-hidden />
              {text.tryStyle}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
