import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";
import { isLocale } from "@/lib/i18n";
import { getLegal, type LegalKind } from "@/lib/legal";

type LegalParams = { params: Promise<{ lang: string }> };

export function legalMetadata(kind: LegalKind) {
  return async function generateMetadata({ params }: LegalParams): Promise<Metadata> {
    const { lang } = await params;
    if (!isLocale(lang)) return {};
    const doc = getLegal(kind, lang);
    return {
      title: doc.title,
      description: doc.description,
      alternates: {
        canonical: `/${lang}/${kind}`,
        languages: { en: `/en/${kind}`, da: `/da/${kind}`, "x-default": `/${kind}` },
      },
    };
  };
}

export function legalPage(kind: LegalKind) {
  return async function LegalPage({ params }: LegalParams) {
    const { lang } = await params;
    if (!isLocale(lang)) notFound();
    const doc = getLegal(kind, lang);

    return (
      <>
        <Nav locale={lang} />
        <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-[68ch]">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{doc.title}</h1>
            <p className="mt-3 text-sm text-muted">{doc.updated}</p>
            <p className="mt-8 text-lg leading-relaxed">{doc.intro}</p>

            {doc.sections.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="text-xl font-bold tracking-tight">{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-3 grid gap-2 text-muted">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed">
                        <span className="mt-2.5 h-1 w-3 shrink-0 bg-signal" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </main>
        <Footer locale={lang} />
      </>
    );
  };
}
