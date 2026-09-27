import type { Metadata } from "next";
import {
  Gamepad2,
  Github,
  Globe,
  Instagram,
  Joystick,
  Link as LinkIcon,
  MessageSquare,
  Twitch,
  Coffee,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getContent } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getContent(lang).bio;
  return {
    title: "@Ander507",
    description: t.tagline,
    alternates: { canonical: `/${lang}/bio`, languages: { en: "/en/bio", da: "/da/bio", "x-default": "/bio" } },
    openGraph: { title: "@Ander507", description: t.tagline, url: `https://ander507.dev/${lang}/bio`, type: "profile" },
  };
}

type LinkCategory = "socials" | "work";

interface BioLink {
  title: string;
  url: string;
  icon: LucideIcon;
  category: LinkCategory;
}

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
    icon: LinkIcon,
    category: "work",
  },
  {
    title: "CatzyCraft",
    url: "https://modrinth.com/modpack/catzycraft",
    icon: Gamepad2,
    category: "work",
  },
  {
    title: "itch.io",
    url: "https://ander507.itch.io/",
    icon: Joystick,
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
      className="group flex items-center gap-4 rounded-md border border-line bg-paper px-4 py-3 hover:border-ink"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center text-muted group-hover:text-ink">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="font-semibold">{link.title}</span>
    </a>
  );
}

export default async function BioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getContent(lang).bio;
  const sectionLabels: Record<LinkCategory, string> = { socials: t.socials, work: t.work };

  return (
    <main className="min-h-screen bg-mist px-4 py-12 sm:py-16">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8">
        <header className="flex flex-col items-center gap-3 text-center">
          <span className="h-3 w-3 bg-signal" aria-hidden />
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold tracking-tight">Ander507</h1>
            <p className="text-muted">{t.tagline}</p>
          </div>
        </header>

        <Link
          href="/contact"
          className="rounded-md bg-ink px-4 py-3.5 text-center font-semibold text-paper hover:bg-ink/85"
        >
          {t.hire}
        </Link>

        {CATEGORY_ORDER.map((category) => {
          const links = BIO_LINKS.filter((link) => link.category === category);

          return (
            <section key={category} className="flex flex-col gap-3">
              <h2 className="px-1 text-sm font-semibold text-muted">{sectionLabels[category]}</h2>
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <LinkCard key={link.title} link={link} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
