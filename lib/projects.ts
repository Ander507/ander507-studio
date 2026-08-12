export type ProjectCategory = "web" | "minecraft" | "stardance" | "desktop";

export const CATEGORY_LABELS: Record<
  ProjectCategory,
  { short: string; long: string; schemaCategory: string; schemaOS: string }
> = {
  web: {
    short: "Web App",
    long: "Website & App",
    schemaCategory: "WebApplication",
    schemaOS: "Web",
  },
  minecraft: {
    short: "Minecraft",
    long: "Minecraft",
    schemaCategory: "GameApplication",
    schemaOS: "Minecraft",
  },
  stardance: {
    short: "Stardance HackClub",
    long: "Stardance HackClub",
    schemaCategory: "WebApplication",
    schemaOS: "Web",
  },
  desktop: {
    short: "Desktop",
    long: "Desktop Engineering & Developer Tools",
    schemaCategory: "DesktopApplication",
    schemaOS: "Windows",
  },
};

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
    slug: "portsentinel",
    title: "PortSentinel",
    href: "https://github.com/Ander507/PortSentinel",
    category: "desktop",
    external: true,
    status: "Online",
    description:
      "Real-time Windows TCP listener & process sentinel — baseline diffs, signature shields, and tray alerts when something new starts listening.",
    longDescription:
      "PortSentinel is a lightweight Windows system tray utility for developers and sysadmins who need immediate visibility into local TCP listeners (0.0.0.0, 127.0.0.1, IPv6). It diffs current listening ports against a saved baseline, alerts when a background service, Docker container, or untrusted binary opens an unexpected port, and surfaces process command lines, paths, and digital signature status — all without admin elevation. Optional LAN ARP discovery, pause/resume monitoring, and one-click kill with a protected-process blocklist round out the workflow.",
    tags: [".NET 8", "WPF", "C# 12"],
    className: "portsentinel",
    coverImage: "/projects/portsentinel/cover.png",
    screenshots: [
      {
        src: "/projects/portsentinel/screenshot-1.png",
        alt: "PortSentinel listening TCP ports grid with baseline statuses",
      },
      {
        src: "/projects/portsentinel/screenshot-2.png",
        alt: "Digitally signed process shield tooltip",
      },
      {
        src: "/projects/portsentinel/screenshot-3.png",
        alt: "Unsigned or unknown signature shield tooltip",
      },
    ],
    features: [
      "Baseline diffing with Unchanged / New / Closed port states",
      "Async process inspection — command line, path, WMI + iphlpapi caching",
      "Digital signature shields via WinVerifyTrust / X509 checks",
      "Tray monitoring with batched toast alerts and pause/resume",
      "Row actions: open file location, copy localhost, kill process",
      "Glassmorphic Fluent UI with Acrylic on Windows 11",
    ],
    year: "2026",
    links: [
      {
        label: "Download Windows release",
        href: "https://github.com/Ander507/PortSentinel/releases",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/Ander507/PortSentinel",
        external: true,
      },
      {
        label: "Support on Ko-fi",
        href: "https://ko-fi.com/ander507",
        external: true,
      },
    ],
  },
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
  {
    slug: "snipclip",
    title: "SnipClip",
    href: "https://github.com/Ander507/SnipClip/releases/latest",
    category: "stardance",
    external: true,
    status: "Online",
    description:
      "Lightning-fast clipboard vault + screen snipper — SQLite history, region capture, and canvas annotation in a native Windows tray app.",
    longDescription:
      "SnipClip is a native desktop utility built for Stardance / Hack Club with Tauri, Rust, and React. It pairs a local SQLite-backed clipboard history vault with a custom screen-snipping tool: translucent region overlay, pen/arrow/highlight/callout tools, true HTML5 canvas pixel blur (no CSS backdrop-filter glitches), mouse-wheel zoom, and middle-click pan. Close hides to the tray; Ctrl+Shift+V toggles the vault and Ctrl+Shift+S starts a snip. Optional launch-at-startup and auto-clear for unpinned history.",
    tags: ["Tauri", "Rust", "React"],
    className: "snipclip",
    coverImage: "/projects/snipclip/cover.png",
    screenshots: [
      { src: "/projects/snipclip/screenshot-1.png", alt: "Clipboard vault — Images filter" },
      { src: "/projects/snipclip/screenshot-2.png", alt: "Region snip selection overlay" },
      { src: "/projects/snipclip/screenshot-3.png", alt: "Settings — startup, hotkeys, vault cleanup" },
      { src: "/projects/snipclip/icon.png", alt: "SnipClip app icon" },
    ],
    features: [
      "Clipboard vault for text, links, and images in SQLite",
      "Region snip with annotation, pixel blur, zoom, and pan",
      "Re-edit screenshots from the vault lightbox",
      "Global hotkeys and system-tray background mode",
      "Auto-clear unpinned history on reboot or schedule",
    ],
    year: "2026",
    links: [
      {
        label: "Download Windows release",
        href: "https://github.com/Ander507/SnipClip/releases/latest",
        external: true,
      },
      { label: "GitHub", href: "https://github.com/Ander507/SnipClip", external: true },
    ],
  },
  {
    slug: "aurawatch",
    title: "AuraWatch",
    href: "https://aura-watching.vercel.app/",
    category: "stardance",
    external: true,
    status: "Online",
    description:
      "A vibe finder for movies, TV, anime, and songs — tell it what you’re in the mood for, get titles that actually fit.",
    longDescription:
      "AuraWatch is a recommendation concierge built for Stardance / Hack Club. Pick a format, multi-select genres, describe a vibe, or search “similar to…” titles — then get a handful of picks with posters and where-to-watch providers. Dual UI themes (dark minimal or light desktop board), region-aware streaming logos via TMDB, and song listen links via iTunes. Falls back to a curated local catalog when APIs flake.",
    tags: ["SvelteKit", "Gemini", "TMDB"],
    className: "aurawatch",
    coverImage: "/projects/aurawatch/cover.png",
    screenshots: [
      { src: "/projects/aurawatch/screenshot-1.png", alt: "AuraWatch minimal theme" },
      { src: "/projects/aurawatch/screenshot-2.png", alt: "AuraWatch song recommendations" },
    ],
    features: [
      "Movies, series, anime, songs, or all-formats mode",
      "Vibe prompt and similar-title search with live lookup",
      "Region-aware streaming provider logos",
      "Dual themes remembered in localStorage",
      "Gemini + TMDB pipeline with local catalog fallback",
    ],
    year: "2026",
    links: [
      { label: "Open live demo", href: "https://aura-watching.vercel.app/", external: true },
      { label: "GitHub", href: "https://github.com/Ander507/AuraWatch", external: true },
    ],
  },
  {
    slug: "ztionix-os",
    title: "ZtionixOS",
    href: "https://ztionix-os.vercel.app/",
    category: "stardance",
    external: true,
    status: "Online",
    description:
      "A fake desktop in the browser — boot screen, draggable windows, a real filesystem, and a bunch of small apps.",
    longDescription:
      "ZtionixOS is a browser OS built for Stardance / Hack Club: boot into a login screen, then a full desktop with a top bar, dock, and window manager. Apps return plain DOM nodes — no React. There’s a real virtual filesystem in IndexedDB under /home/user, drag-to-import files, dock pin customization, and apps for Files, Terminal, Editor, Browser, Paint, music/video, Writer/Calc/Impress, Snake, Doom, Photo Booth, and more.",
    tags: ["Vite", "TypeScript", "IndexedDB"],
    className: "ztionix-os",
    coverImage: "/projects/ztionix-os/cover.png",
    screenshots: [
      { src: "/projects/ztionix-os/cover.png", alt: "ZtionixOS desktop with open apps" },
    ],
    features: [
      "Draggable/resizable windows with snap and GPU transforms",
      "Persistent VFS in IndexedDB",
      "Dock pins, themes, and wallpaper in Settings",
      "Office-style Writer, Calc, and Impress apps",
      "Doom, Snake, Photo Booth, and other easter eggs",
    ],
    year: "2026",
    links: [
      { label: "Open live demo", href: "https://ztionix-os.vercel.app/", external: true },
      { label: "GitHub", href: "https://github.com/Ander507/ZtionixOS", external: true },
    ],
  },
  {
    slug: "omnitab",
    title: "OmniTab",
    href: "https://omni-tab.vercel.app/",
    category: "stardance",
    external: true,
    status: "Online",
    description:
      "Your new tab, but useful — one bar for search, links, and Gemini.",
    longDescription:
      "OmniTab replaces the empty new-tab page with an Omni-Bar that searches, opens URLs, or talks to Gemini via slash commands. Speed dial with drag-reorder and bookmark import, a scratchpad for messy code/errors, and optional widgets for clock, weather, focus, BBC news, and quote of the day. No login — everything sticks in localStorage. Shared Gemini keys stay on the server behind /api/gemini with free-tier rotation.",
    tags: ["Vite", "React", "Gemini"],
    className: "omnitab",
    coverImage: "/projects/omnitab/cover.png",
    screenshots: [
      { src: "/projects/omnitab/screenshot-1.png", alt: "OmniTab first-run setup wizard" },
    ],
    features: [
      "Omni-Bar: search, URLs, and Gemini slash commands",
      "Engine picker plus one-shot @engine shortcuts",
      "Draggable speed dial with Ctrl+1–9",
      "Scratchpad and optional ambient widgets",
      "Server-side Gemini key rotation for shared-key mode",
    ],
    year: "2026",
    links: [
      { label: "Open live demo", href: "https://omni-tab.vercel.app/", external: true },
      { label: "GitHub", href: "https://github.com/Ander507/OmniTab", external: true },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((project) => project.slug);
}
