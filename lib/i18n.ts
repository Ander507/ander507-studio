export const LOCALES = ["en", "da"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "lang";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Danish if the browser lists Danish (or Norwegian/Swedish, which read Danish fine) before English. */
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;
  const languages = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().slice(0, 2), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of languages) {
    if (lang === "da" || lang === "nb" || lang === "no" || lang === "sv") return "da";
    if (lang === "en") return "en";
  }
  return DEFAULT_LOCALE;
}

/** 2500 → "2.500 kr." in Danish, 350 → "$350" in English. */
export function formatMoney(amount: number, locale: Locale): string {
  return locale === "da" ? `${amount.toLocaleString("da-DK")} kr.` : `$${amount.toLocaleString("en-US")}`;
}
