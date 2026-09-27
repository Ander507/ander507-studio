"use client";

import { LOCALE_COOKIE, LOCALES, type Locale } from "@/lib/i18n";

export default function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  const other = locale === "da" ? "en" : "da";

  function switchLanguage() {
    document.cookie = `${LOCALE_COOKIE}=${other}; path=/; max-age=31536000; samesite=lax`;
    // Drop an explicit /en or /da prefix so the cookie decides the language.
    const [, first, ...rest] = window.location.pathname.split("/");
    const path = (LOCALES as readonly string[]).includes(first) ? `/${rest.join("/")}` : window.location.pathname;
    window.location.assign(path + window.location.hash);
  }

  return (
    <button
      type="button"
      onClick={switchLanguage}
      lang={other}
      className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
    >
      {label}
    </button>
  );
}
