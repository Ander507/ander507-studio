import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Schibsted_Grotesk } from "next/font/google";
import Script from "next/script";
import { LOCALES, isLocale } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { SITE } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import "../globals.css";

const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted" });

interface LayoutProps {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1424" },
  ],
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getContent(lang);

  return {
    metadataBase: new URL(SITE.url),
    title: { default: meta.title, template: `%s · ${SITE.name}` },
    description: meta.description,
    applicationName: SITE.domain,
    authors: [{ name: "Anders", url: SITE.url }],
    creator: "Anders",
    category: "technology",
    formatDetection: { telephone: false },
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", da: "/da", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      url: `${SITE.url}/${lang}`,
      siteName: SITE.domain,
      title: meta.title,
      description: meta.description,
      locale: lang === "da" ? "da_DK" : "en_US",
      alternateLocale: lang === "da" ? "en_US" : "da_DK",
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={schibsted.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Script id="vercel-analytics" strategy="afterInteractive">
          {`window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`}
        </Script>
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
