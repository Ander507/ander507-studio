import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import HeroBrowser from "@/components/site/HeroBrowser";
import PriceCalculator from "@/components/site/PriceCalculator";
import ProjectCard from "@/components/site/ProjectCard";
import ContactForm from "@/components/site/ContactForm";
import { isLocale } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { getProject } from "@/lib/projects";
import { FEATURED_SLUGS, SITE } from "@/lib/site";

interface HomeProps {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getContent(lang);

  const [lead, ...rest] = FEATURED_SLUGS.map((slug) => getProject(slug, lang)).filter(
    (project) => project !== undefined,
  );

  const pageUrl = `${SITE.url}/${lang}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.domain,
        inLanguage: lang,
        publisher: { "@id": `${SITE.url}/#business` },
      },
      {
        "@type": "Person",
        "@id": `${SITE.url}/#anders`,
        name: "Anders",
        alternateName: SITE.name,
        jobTitle: lang === "da" ? "Webudvikler" : "Web developer",
        url: SITE.url,
        sameAs: SITE.socials.map((social) => social.href),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}/#business`,
        name: SITE.domain,
        url: pageUrl,
        image: `${pageUrl}/opengraph-image`,
        description: t.meta.description,
        founder: { "@id": `${SITE.url}/#anders` },
        email: SITE.email,
        address: { "@type": "PostalAddress", addressCountry: "DK" },
        areaServed: [{ "@type": "Country", name: "Denmark" }, "Worldwide"],
        availableLanguage: ["da", "en"],
        currenciesAccepted: t.prices.currency,
        priceRange: `${t.prices.rows[0].price} – ${t.prices.rows[t.prices.rows.length - 1].price}+`,
        knowsAbout: ["Web development", "Next.js", "React", "TypeScript", "SEO"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.prices.title,
          itemListElement: t.prices.rows.map((row) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: row.name, description: row.description },
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: row.amount,
              priceCurrency: t.prices.currency,
              valueAddedTaxIncluded: false,
            },
          })),
        },
        sameAs: SITE.socials.map((social) => social.href),
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faq.items.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav locale={lang} />

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:pb-28 lg:pt-20">
          <div>
            <h1 className="text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-balance sm:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted">{t.hero.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/contact"
                className="rounded-md bg-ink px-6 py-3 font-semibold text-paper hover:bg-ink/85"
              >
                {t.hero.cta}
              </Link>
              <Link href="#work" className="font-semibold underline decoration-line decoration-2 underline-offset-8 hover:decoration-ink">
                {t.hero.secondary}
              </Link>
            </div>
            <p className="mt-10 text-sm text-muted">{t.hero.location}</p>
          </div>
          <HeroBrowser text={t.hero} />
        </section>

        <section id="services" className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_2fr]">
            <h2 className="text-3xl font-extrabold tracking-tight">{t.services.title}</h2>
            <div className="divide-y divide-line border-y border-line">
              {t.services.items.map((item) => (
                <article key={item.name} className="grid gap-2 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="leading-relaxed text-muted">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="border-t border-line bg-mist">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="text-3xl font-extrabold tracking-tight">{t.work.title}</h2>
              <Link href="/projects" className="shrink-0 font-semibold underline underline-offset-4 hover:text-signal">
                {t.work.all}
              </Link>
            </div>
            {lead && (
              <div className="mt-10">
                <ProjectCard project={lead} locale={lang} large />
              </div>
            )}
            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
              {rest.map((project) => (
                <ProjectCard key={project.slug} project={project} locale={lang} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <h2 className="text-3xl font-extrabold tracking-tight">{t.process.title}</h2>
            <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {t.process.steps.map((step, index) => (
                <li key={step.name} className="border-t-2 border-ink pt-5">
                  <span className="text-sm font-bold text-signal">{index + 1}</span>
                  <h3 className="mt-2 font-bold leading-snug">{step.name}</h3>
                  <p className="mt-2 text-muted">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="prices" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-10">
              <h2 className="text-3xl font-extrabold tracking-tight">{t.prices.title}</h2>
              <p className="max-w-xl text-lg leading-relaxed text-muted">{t.prices.intro}</p>
            </div>
            <div className="mt-10 divide-y divide-line border-y border-line">
              {t.prices.rows.map((row) => (
                <div key={row.name} className="grid gap-4 py-8 md:grid-cols-[1fr_1fr_1.2fr] md:gap-10">
                  <div>
                    <h3 className="text-xl font-bold">{row.name}</h3>
                    <p className="mt-2 text-muted">{row.description}</p>
                  </div>
                  <p className="text-4xl font-extrabold tracking-tight">
                    <span className="mr-2 text-base font-normal text-muted">{t.prices.from}</span>
                    {row.price}
                  </p>
                  <ul className="grid gap-1.5 text-muted">
                    {row.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2.5 h-1 w-3 shrink-0 bg-signal" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-6 text-muted">{t.prices.hourly}</p>
            <div className="mt-14">
              <PriceCalculator locale={lang} text={t.calculator} rows={t.prices.rows} form={t.contact.form} />
            </div>
          </div>
        </section>

        <section id="faq" className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_2fr]">
            <h2 className="text-3xl font-extrabold tracking-tight">{t.faq.title}</h2>
            <div className="divide-y divide-line border-y border-line">
              {t.faq.items.map((faq) => (
                <details key={faq.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <Plus className="h-5 w-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden />
                  </summary>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-panel text-on-panel">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <h2 className="text-4xl font-extrabold leading-tight tracking-tight">{t.contact.title}</h2>
              <p className="mt-4 text-lg text-on-panel/70">{t.contact.body}</p>
              <p className="mt-8 text-on-panel/70">
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
        </section>
      </main>

      <Footer locale={lang} />
    </>
  );
}
