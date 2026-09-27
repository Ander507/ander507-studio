import Link from "next/link";
import { Menu } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import LanguageSwitch from "./LanguageSwitch";
import ThemeToggle from "./ThemeToggle";

export default function Nav({ locale }: { locale: Locale }) {
  const { nav } = getContent(locale);
  const links = [
    { label: nav.work, href: "/projects" },
    { label: nav.services, href: "/#services" },
    { label: nav.prices, href: "/#prices" },
    { label: nav.faq, href: "/#faq" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="h-2.5 w-2.5 bg-signal" aria-hidden />
          Ander507
        </Link>

        <div className="flex items-center gap-2 sm:gap-7">
          <ul className="hidden items-center gap-7 text-sm md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <span className="hidden md:block">
              <LanguageSwitch locale={locale} label={nav.switchTo} />
            </span>
            <ThemeToggle label={nav.theme} />
          </div>
          <Link
            href="/contact"
            className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-ink/85"
          >
            {nav.cta}
          </Link>

          <details className="group relative md:hidden">
            <summary
              className="grid h-9 w-9 cursor-pointer list-none place-items-center rounded-md border border-line [&::-webkit-details-marker]:hidden"
              aria-label="Menu"
            >
              <Menu className="h-4 w-4" aria-hidden />
            </summary>
            <ul className="absolute right-0 mt-2 w-52 rounded-md border border-line bg-paper p-2 text-sm shadow-lg">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="block rounded px-3 py-2 hover:bg-mist">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t border-line px-3 pb-1 pt-3">
                <LanguageSwitch locale={locale} label={nav.switchTo} />
              </li>
            </ul>
          </details>
        </div>
      </nav>
    </header>
  );
}
