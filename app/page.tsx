import type { Metadata } from "next";
import PortfolioPage from "@/components/PortfolioPage";

export const metadata: Metadata = {
  title: "Ander507.dev — Web Apps, Minecraft Mods & Projects",
  description:
    "Portfolio of Ander507.dev — web apps like NoteForge AI and zlib.lol, Minecraft mods including PacketSpy, and sites built for clients. Student developer building cool stuff.",
  authors: [{ name: "Ander507" }],
  robots: "index, follow",
  alternates: { canonical: "https://ander507.dev/" },
  openGraph: {
    type: "website",
    url: "https://ander507.dev/",
    title: "Ander507.dev — Web Apps, Minecraft Mods & Projects",
    description:
      "Portfolio of Ander507.dev — web apps, Minecraft mods, AI tools, and client sites. Built by a student developer in their free time.",
    siteName: "Ander507.dev",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Ander507.dev — Web Apps, Minecraft Mods & Projects",
    description:
      "Portfolio of Ander507.dev — web apps, Minecraft mods, AI tools, and client sites.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Ander507",
      url: "https://ander507.dev",
      jobTitle: "Developer",
      description:
        "Student developer building web apps, Minecraft mods, and experimental utilities.",
      sameAs: [
        "https://www.instagram.com/ander507_/",
        "https://github.com/ander507",
        "https://ko-fi.com/ander507",
        "https://discord.gg/cY6Xfc6csX",
        "https://ander507.itch.io/",
      ],
    },
    {
      "@type": "WebSite",
      name: "Ander507.dev",
      url: "https://ander507.dev",
      description:
        "Personal portfolio showcasing web applications, Minecraft mods, and client projects.",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioPage />
    </>
  );
}
