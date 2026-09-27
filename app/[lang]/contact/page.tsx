import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import ContactForm from "@/components/site/ContactForm";
import { isLocale } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { SITE } from "@/lib/site";

interface ContactProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: ContactProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getContent(lang);
  return {
    title: t.contact.title,
    description: t.contact.body,
    alternates: { canonical: `/${lang}/contact`, languages: { en: "/en/contact", da: "/da/contact", "x-default": "/contact" } },
  };
}

export default async function ContactPage({ params }: ContactProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getContent(lang);

  return (
    <>
      <Nav locale={lang} />
      <main className="bg-panel text-on-panel">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{t.contact.title}</h1>
            <p className="mt-4 text-lg text-on-panel/70">{t.contact.body}</p>

            <ol className="mt-10 grid gap-5">
              {t.process.steps.map((step, index) => (
                <li key={step.name} className="flex gap-4">
                  <span className="font-bold text-signal">{index + 1}</span>
                  <div>
                    <p className="font-semibold">{step.name}</p>
                    <p className="text-sm text-on-panel/60">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-10 text-on-panel/70">
              {t.contact.discordPrefix}{" "}
              <a
                href={SITE.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-on-panel underline underline-offset-4"
              >
                {t.contact.discordLink}
              </a>{" "}
              {t.contact.emailPrefix}{" "}
              <a href={`mailto:${SITE.email}`} className="font-semibold text-on-panel underline underline-offset-4">
                {SITE.email}
              </a>
            </p>
          </div>
          <ContactForm text={t.contact.form} />
        </div>
      </main>
      <Footer locale={lang} />
    </>
  );
}
