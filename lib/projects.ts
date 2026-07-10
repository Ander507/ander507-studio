export type ProjectCategory = "web" | "minecraft";

export interface ProjectScreenshot {
  src: string;
  alt: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  href: string;
  category: ProjectCategory;
  external?: boolean;
  status: string;
  statusColor?: string;
  description: string;
  longDescription: string;
  tags: string[];
  className: string;
  coverImage?: string;
  screenshots: ProjectScreenshot[];
  features: string[];
  year: string;
  links: ProjectLink[];
}

export const PROJECTS: Project[] = [
  {
    slug: "ztionix",
    title: "Ztionix",
    href: "https://www.ztionix.tech/",
    category: "web",
    external: true,
    status: "Online",
    description:
      "A collection of experimental projects, secure communications, and digital utilities featuring the Sakovajo Protocol brainrot translator.",
    longDescription:
      "Ztionix is my experimental playground for web utilities and side projects. It bundles secure communication tools, digital experiments, and the Sakovajo Protocol — a chaotic brainrot translator that turns normal text into unhinged internet speak. Built as a living lab where ideas ship fast and break often (on purpose).",
    tags: ["Next.js", "React", "Vercel"],
    className: "ztionix",
    coverImage: "/projects/ztionix/cover.png",
    screenshots: [
      { src: "/projects/ztionix/screenshot-1.png", alt: "Ztionix homepage" },
      { src: "/projects/ztionix/screenshot-2.png", alt: "Sakovajo Protocol translator" },
    ],
    features: [
      "Sakovajo Protocol brainrot translator",
      "Secure communication utilities",
      "Experimental web tools and demos",
      "Deployed on Vercel with Next.js",
    ],
    year: "2025",
    links: [{ label: "Visit Ztionix", href: "https://www.ztionix.tech/", external: true }],
  },
  {
    slug: "zlib",
    title: "zlib.lol",
    href: "https://www.zlib.lol/",
    category: "web",
    external: true,
    status: "Online",
    description:
      "The smart link generator. A highly secure platform to drag files, paste text, or shorten URLs instantly with burn-after-read capabilities.",
    longDescription:
      "zlib.lol is a zero-knowledge file and link sharing platform. Drag in files, paste text, or shorten URLs — everything is encrypted client-side before it ever hits the server. Links can be set to burn after reading, expire on a timer, or stay up until you delete them. No accounts, no tracking, just fast and private sharing.",
    tags: ["Next.js", "Zero-knowledge"],
    className: "zlib",
    coverImage: "/projects/zlib/cover.png",
    screenshots: [
      { src: "/projects/zlib/screenshot-1.png", alt: "zlib.lol homepage" },
      { src: "/projects/zlib/screenshot-2.png", alt: "Link generated" },
      { src: "/projects/zlib/screenshot-3.png", alt: "Shared snippet view" },
    ],
    features: [
      "Client-side encryption before upload",
      "Burn-after-read and timed expiry",
      "Drag-and-drop file sharing",
      "URL shortening with privacy controls",
    ],
    year: "2025",
    links: [{ label: "Open zlib.lol", href: "https://www.zlib.lol/", external: true }],
  },
  {
    slug: "noteai",
    title: "NoteForge AI",
    href: "/noteai",
    category: "web",
    status: "Active",
    statusColor: "#3b82f6",
    description:
      "AI-Powered Study Notes generator. Upload lectures, PDFs, slides, or notes and get perfect Obsidian-ready Markdown in seconds.",
    longDescription:
      "NoteForge AI turns messy lecture material into clean, structured study notes. Upload PDFs, slides, images, or raw text and let Gemini process it into Obsidian-ready Markdown with headings, bullet points, and LaTeX math. Built for students who want to spend time learning, not formatting.",
    tags: ["JavaScript", "Gemini API"],
    className: "noteai",
    coverImage: "/projects/noteai/cover.png",
    screenshots: [
      { src: "/projects/noteai/screenshot-1.png", alt: "NoteForge AI upload screen" },
    ],
    features: [
      "Upload PDFs, slides, images, or plain text",
      "Obsidian-ready Markdown output",
      "LaTeX math rendering with KaTeX",
      "Powered by Google Gemini API",
    ],
    year: "2025",
    links: [{ label: "Try NoteForge AI", href: "/noteai" }],
  },
  {
    slug: "packetspy",
    title: "PacketSpy",
    href: "https://modrinth.com/mod/packet-spy",
    category: "minecraft",
    external: true,
    status: "Online",
    description:
      "A Minecraft mod made to debug and log packets sent and received by the client. It hosts a local website via Java WebSockets to inspect the data.",
    longDescription:
      "PacketSpy is a developer-focused Minecraft mod for inspecting network traffic between the client and server. It logs every packet sent and received, then serves a local web dashboard over Java WebSockets so you can browse, filter, and debug protocol data in real time. Essential for modders and server developers who need to see what's actually happening on the wire.",
    tags: ["Minecraft Mod", "Java", "WebSockets"],
    className: "packetspy",
    coverImage: "/projects/packetspy/cover.png",
    screenshots: [
      { src: "/projects/packetspy/screenshot-1.png", alt: "PacketSpy terminal dashboard" },
      { src: "/projects/packetspy/screenshot-2.png", alt: "Packet log with expanded payload" },
    ],
    features: [
      "Real-time packet logging on client",
      "Local web dashboard via WebSockets",
      "Filter and inspect protocol data",
      "Built for mod and server debugging",
    ],
    year: "2025",
    links: [
      { label: "View on Modrinth", href: "https://modrinth.com/mod/packet-spy", external: true },
    ],
  },
  {
    slug: "catzycraft",
    title: "CatzyCraft",
    href: "https://modrinth.com/modpack/catzycraft",
    category: "minecraft",
    external: true,
    status: "Online",
    description:
      "The purr-fectly fun and techy Minecraft modpack! The ultimate mix of silly fun and cool tech stuff, perfect for you and your friends to play together.",
    longDescription:
      "CatzyCraft is a curated Minecraft modpack that balances goofy fun with serious tech progression. Think silly cat-themed chaos meets Create, storage systems, and quality-of-life mods — tuned for multiplayer sessions with friends. Easy to set up, hard to put down.",
    tags: ["Minecraft Modpack", "Multiplayer", "Tech"],
    className: "catzycraft",
    screenshots: [],
    features: [
      "Balanced mix of fun and tech mods",
      "Optimized for multiplayer",
      "Create and automation progression",
      "One-click install via Modrinth",
    ],
    year: "2025",
    links: [
      {
        label: "Download on Modrinth",
        href: "https://modrinth.com/modpack/catzycraft",
        external: true,
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((project) => project.slug);
}
