import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ander507.dev"),
  title: {
    default: "Ander507.dev — Web Apps, Minecraft Mods & Projects",
    template: "%s — Ander507.dev",
  },
  description:
    "Portfolio of Ander507.dev — web apps, Minecraft mods, AI tools, and client projects. Built by a student developer in their free time.",
  applicationName: "Ander507.dev",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://ander507.dev/",
    siteName: "Ander507.dev",
    title: "Ander507.dev — Web Apps, Minecraft Mods & Projects",
    description:
      "Portfolio of Ander507.dev — web apps, Minecraft mods, AI tools, and client projects.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ander507.dev — Web Apps, Minecraft Mods & Projects",
    description:
      "Portfolio of Ander507.dev — web apps, Minecraft mods, AI tools, and client projects.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
