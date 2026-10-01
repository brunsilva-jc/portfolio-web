import Link from "next/link";
import { getDictionary, otherLocale, type Locale } from "@/lib/i18n";
import { profile } from "@/lib/profile";

export function Header({ lang, path = "" }: { lang: Locale; path?: string }) {
  const t = getDictionary(lang);
  const anchors = [
    ["skills", t.nav.skills],
    ["projects", t.nav.projects],
    ["experience", t.nav.experience],
  ] as const;
  return (
    <header className="no-print sticky top-0 z-10 border-b border-border bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3 text-sm sm:px-6">
        <Link href={`/${lang}`} className="font-semibold tracking-tight">
          {profile.name}
        </Link>
        <div className="ml-auto hidden items-center gap-5 text-muted md:flex">
          {anchors.map(([id, label]) => (
            <Link key={id} href={`/${lang}#${id}`} className="hover:text-fg">
              {label}
            </Link>
          ))}
          <Link href={`/${lang}/cv`} className="hover:text-fg">
            {t.nav.cv}
          </Link>
        </div>
        <Link
          href={`/${otherLocale(lang)}${path}`}
          className="ml-auto rounded-md border border-border px-2.5 py-1 text-xs text-muted hover:text-fg md:ml-0"
        >
          {t.switchTo}
        </Link>
      </nav>
    </header>
  );
}
