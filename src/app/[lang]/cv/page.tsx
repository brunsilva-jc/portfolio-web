import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Experience } from "@/components/Experience";
import { Header } from "@/components/Header";
import { PrintButton } from "@/components/PrintButton";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { profile } from "@/lib/profile";

export async function generateMetadata({ params }: PageProps<"/[lang]/cv">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: `${profile.name} — ${getDictionary(lang).nav.cv}` };
}

const strip = (url: string) => url.replace(/^https?:\/\//, "");

export default async function CV({ params }: PageProps<"/[lang]/cv">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const featured = profile.projects.filter((p) => p.featured);

  return (
    <>
      <Header lang={lang} path="/cv" />
      <div className="no-print mx-auto flex max-w-3xl items-center justify-between px-4 pt-8 sm:px-6">
        <Link href={`/${lang}`} className="text-sm text-muted hover:text-fg">
          ← {t.cv.back}
        </Link>
        <PrintButton label={t.cv.print} />
      </div>

      <main className="mx-auto max-w-3xl px-4 py-10 text-[15px] sm:px-6 print:max-w-none print:p-0 print:text-[10.5pt]">
        <header className="mb-8 border-b border-border pb-6 print:mb-5 print:pb-4">
          <h1 className="text-3xl font-semibold tracking-tight print:text-[22pt]">{profile.name}</h1>
          <p className="mt-1 text-lg text-accent print:text-[12pt]">{profile.title[lang]}</p>
          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted print:text-[9pt]">
            <span>{profile.location[lang]}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin}>{strip(profile.linkedin)}</a>
            <a href={profile.github}>{strip(profile.github)}</a>
            {profile.site && <a href={profile.site}>{strip(profile.site)}</a>}
          </p>
        </header>

        <CvSection title={t.cv.summary}>
          <p className="leading-relaxed">{profile.summary[lang]}</p>
        </CvSection>

        <CvSection title={t.cv.skills}>
          <dl className="grid gap-x-4 gap-y-1.5 sm:grid-cols-[8rem_1fr] print:grid-cols-[7rem_1fr]">
            {profile.skillGroups.map((g) => (
              <div key={g.key} className="contents">
                <dt className="font-medium">{g.label[lang]}</dt>
                <dd className="text-muted">{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </CvSection>

        <CvSection title={t.experience.title}>
          <Experience lang={lang} compact />
        </CvSection>

        <CvSection title={t.cv.projects}>
          <ul className="space-y-2.5">
            {featured.map((p) => (
              <li key={p.slug} className="break-inside-avoid">
                <a href={p.repo} className="font-medium hover:text-accent">
                  {p.name}
                </a>
                <span className="ml-2 font-mono text-xs text-subtle">{p.stack.slice(0, 4).join(" · ")}</span>
                <p className="text-sm leading-relaxed text-muted">{p.description[lang]}</p>
              </li>
            ))}
          </ul>
        </CvSection>

        <div className="grid gap-6 sm:grid-cols-2 print:grid-cols-2">
          <CvSection title={t.education}>
            {profile.education.map((e) => (
              <p key={e.institution}>
                <span className="font-medium">{e.course[lang]}</span>
                <br />
                <span className="text-muted">
                  {e.institution} · {e.year}
                </span>
              </p>
            ))}
          </CvSection>
          <CvSection title={t.languages}>
            {profile.languages.map((l) => (
              <p key={l.name.en} className="mb-1">
                <span className="font-medium">{l.name[lang]}</span> — <span className="text-muted">{l.level[lang]}</span>
              </p>
            ))}
          </CvSection>
        </div>
      </main>
    </>
  );
}

function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 print:mb-4">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent print:mb-2">{title}</h2>
      {children}
    </section>
  );
}
