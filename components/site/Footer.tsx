import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function Footer({ locale }: { locale: Locale }) {
  const { nav, footer } = getContent(locale);

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {SITE.domain}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <Link href="/projects" className="hover:text-ink">
              {nav.work}
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-ink">
              {footer.contact}
            </Link>
          </li>
          <li>
            <a href={`mailto:${SITE.email}`} className="hover:text-ink">
              {SITE.email}
            </a>
          </li>
          <li>
            <Link href="/terms" className="hover:text-ink">
              {footer.terms}
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:text-ink">
              {footer.privacy}
            </Link>
          </li>
          {SITE.socials.map((social) => (
            <li key={social.href}>
              <a href={social.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
