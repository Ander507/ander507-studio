"use client";

import {
  Atom,
  AppWindow,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Triangle,
  Wind,
  Workflow,
  Wand2,
  type LucideIcon,
} from "lucide-react";

interface TechItem {
  name: string;
  icon: LucideIcon;
}

const TECH_STACK: TechItem[] = [
  { name: "Next.js", icon: Layers },
  { name: "React", icon: Atom },
  { name: "Svelte", icon: Sparkles },
  { name: "Tailwind CSS", icon: Wind },
  { name: "Rust", icon: Cpu },
  { name: "Java", icon: Code2 },
  { name: "Tauri", icon: AppWindow },
  { name: "ComfyUI", icon: Workflow },
  { name: "Stable Diffusion", icon: Wand2 },
  { name: "Vercel", icon: Triangle },
];

function TechBadge({ item }: { item: TechItem }) {
  const Icon = item.icon;

  return (
    <span className="group/badge inline-flex shrink-0 items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400 transition-all duration-300 hover:border-fuchsia-500/50 hover:text-white hover:shadow-[0_0_16px_rgba(192,38,211,0.15)]">
      <Icon
        className="h-4 w-4 transition-colors duration-300 group-hover/badge:text-white"
        aria-hidden
      />
      <span>{item.name}</span>
    </span>
  );
}

export default function TechStack() {
  const marqueeItems = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="mt-16 w-full bg-transparent" aria-label="Tech stack">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-zinc-600">
        Tech Stack &amp; Tools
      </p>

      {/* Marquee — desktop / wide screens */}
      <div className="group relative hidden overflow-hidden md:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent" />
        <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
          {marqueeItems.map((item, index) => (
            <TechBadge key={`${item.name}-${index}`} item={item} />
          ))}
        </div>
      </div>

      {/* Wrapped grid — mobile fallback */}
      <div className="flex flex-wrap justify-center gap-3 md:hidden">
        {TECH_STACK.map((item) => (
          <TechBadge key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
