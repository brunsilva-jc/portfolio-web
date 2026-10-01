import Link from "next/link";
import { notFound } from "next/navigation";
import { Experience } from "@/components/Experience";
import { Header } from "@/components/Header";
import { RichText } from "@/components/RichText";
import { SkillExplorer } from "@/components/SkillExplorer";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { profile } from "@/lib/profile";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Header lang={lang} />
      <main className="mx-auto max-w-5xl px-4 sm:px-6">
        <section id="about" className="py-16 sm:py-24">
          <p className="mb-4 font-mono text-sm text-accent">{profile.location[lang]}</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
          <p className="mt-2 text-xl text-muted sm:text-2xl">{profile.title[lang]}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">{profile.intro[lang]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg hover:opacity-90"
            >
              {t.hero.cta}
            </a>
            <Link
              href={`/${lang}/cv`}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-accent"
            >
              {t.hero.cv}
            </Link>
            <a href={profile.github} target="_blank" rel="noreferrer" className="px-2 py-2 text-sm text-muted hover:text-fg">
              GitHub ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="px-2 py-2 text-sm text-muted hover:text-fg">
              LinkedIn ↗
            </a>
          </div>
        </section>

        <section className="grid gap-10 border-t border-border py-14 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-subtle">{t.focus}</h2>
            <ul className="space-y-3">
              {profile.focus[lang].map((f) => (
                <li key={f} className="flex gap-3 leading-relaxed">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-subtle">{t.whatIDo}</h2>
            <ul className="space-y-3 text-muted">
              {profile.whatIDo[lang].map((w) => (
                <li key={w} className="leading-relaxed">
                  <RichText text={w} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="skills" className="scroll-mt-20 border-t border-border py-14">
          <h2 className="text-2xl font-semibold tracking-tight">{t.skills.title}</h2>
          <p className="mb-8 mt-2 max-w-2xl text-muted">{t.skills.lead}</p>
          <SkillExplorer lang={lang} groups={profile.skillGroups} projects={profile.projects} />
        </section>

        <section id="experience" className="scroll-mt-20 border-t border-border py-14">
          <h2 className="mb-8 text-2xl font-semibold tracking-tight">{t.experience.title}</h2>
          <Experience lang={lang} />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-subtle">{t.education}</h3>
              {profile.education.map((e) => (
                <p key={e.institution} className="text-sm leading-relaxed">
                  <span className="font-medium">{e.course[lang]}</span>
                  <br />
                  <span className="text-muted">
                    {e.institution} · {e.year}
                  </span>
                </p>
              ))}
            </div>
            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-subtle">{t.languages}</h3>
              {profile.languages.map((l) => (
                <p key={l.name.en} className="mb-2 text-sm leading-relaxed">
                  <span className="font-medium">{l.name[lang]}</span> — <span className="text-muted">{l.level[lang]}</span>
                </p>
              ))}
            </div>
            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-subtle">{t.certifications}</h3>
              {profile.certifications.map((c) => (
                <a key={c.url} href={c.url} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
                  {c.name} ↗
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-border py-14">
          <h2 className="text-2xl font-semibold tracking-tight">{t.contact.title}</h2>
          <p className="mt-2 text-muted">{t.contact.lead}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href={`mailto:${profile.email}`} className="font-medium text-accent hover:underline">
              {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-fg">
              LinkedIn ↗
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-muted hover:text-fg">
              GitHub ↗
            </a>
          </div>
        </section>
      </main>
      <footer className="border-t border-border py-8 text-center text-xs text-subtle">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
