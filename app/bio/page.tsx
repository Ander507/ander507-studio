import type { Metadata } from "next";
import {
  Gamepad2,
  Github,
  Globe,
  Instagram,
  Link,
  MessageSquare,
  Twitch,
  Coffee,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "@Ander507 — Links",
  description: "Links and socials for Ander507 — developer building web apps and Minecraft mods.",
  alternates: { canonical: "/bio" },
  openGraph: {
    title: "@Ander507 — Links",
    description: "Links and socials for Ander507 — developer building web apps and Minecraft mods.",
    url: "https://ander507.dev/bio",
    type: "profile",
  },
};

type LinkCategory = "socials" | "work";

interface BioLink {
  title: string;
  url: string;
  icon: LucideIcon;
  category: LinkCategory;
}

const SECTION_LABELS: Record<LinkCategory, string> = {
  socials: "Socials",
  work: "Work & Projects",
};

const BIO_LINKS: BioLink[] = [
  {
    title: "@ander507_",
    url: "https://www.instagram.com/ander507_/",
    icon: Instagram,
    category: "socials",
  },
  {
    title: "GitHub",
    url: "https://github.com/Ander507",
    icon: Github,
    category: "socials",
  },
  {
    title: "Twitch",
    url: "https://twitch.tv/Ander507",
    icon: Twitch,
    category: "socials",
  },
  {
    title: "Discord",
    url: "https://discord.gg/cY6Xfc6csX",
    icon: MessageSquare,
    category: "socials",
  },
  {
    title: "Ko-fi",
    url: "https://ko-fi.com/ander507",
    icon: Coffee,
    category: "socials",
  },
  {
    title: "Ander507.dev",
    url: "https://ander507.dev",
    icon: Globe,
    category: "work",
  },
  {
    title: "zlib.lol",
    url: "https://www.zlib.lol/",
    icon: Link,
    category: "work",
  },
  {
    title: "CatzyCraft",
    url: "https://modrinth.com/modpack/catzycraft",
    icon: Gamepad2,
    category: "work",
  },
];

const CATEGORY_ORDER: LinkCategory[] = ["socials", "work"];

function LinkCard({ link }: { link: BioLink }) {
  const Icon = link.icon;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-500/50 hover:shadow-[0_8px_30px_rgba(192,38,211,0.12)]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300 transition-colors duration-300 group-hover:bg-fuchsia-500/10 group-hover:text-fuchsia-400">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="font-medium text-zinc-100">{link.title}</span>
    </a>
  );
}

export default function BioPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-12 text-zinc-100 sm:py-16">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8">
        <header className="flex flex-col items-center gap-3 text-center">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-full border border-zinc-800 bg-gradient-to-br from-zinc-800 to-zinc-900 text-2xl font-bold text-white shadow-inner"
            aria-hidden
          >
            A
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white">Anders</h1>
            <p className="text-sm text-zinc-400">@Ander507</p>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
            Full-stack developer, HTX student, &amp; creator.
          </p>
        </header>

        {CATEGORY_ORDER.map((category) => {
          const links = BIO_LINKS.filter((link) => link.category === category);

          return (
            <section key={category} className="flex flex-col gap-3">
              <h2 className="px-1 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                {SECTION_LABELS[category]}
              </h2>
              <div className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <LinkCard key={link.title} link={link} />
                ))}
              </div>
            </section>
          );
        })}

        <footer className="pt-4 text-center">
          <p className="text-xs text-zinc-600">Coded by @Ander507</p>
        </footer>
      </div>
    </main>
  );
}
