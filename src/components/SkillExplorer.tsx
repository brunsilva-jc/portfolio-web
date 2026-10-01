"use client";

import { useState } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";
import type { Profile, Project } from "@/lib/profile";

type Props = {
  lang: Locale;
  groups: Profile["skillGroups"];
  projects: Project[];
};

export function SkillExplorer({ lang, groups, projects }: Props) {
  const t = getDictionary(lang);
  const [selected, setSelected] = useState<string | null>(null);

  const proofCount = (skill: string) => projects.filter((p) => p.proves.includes(skill)).length;
  const visible = selected ? projects.filter((p) => p.proves.includes(selected)) : projects;
  const ordered = [...visible].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        {groups.map((group) => (
          <div key={group.key} className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-4">
            <h3 className="pt-1 text-xs font-medium uppercase tracking-wider text-subtle">
              {group.label[lang]}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((skill) => {
                const count = proofCount(skill);
                const active = selected === skill;
                return (
                  <li key={skill}>
                    <button
                      type="button"
                      onClick={() => setSelected(active ? null : skill)}
                      aria-pressed={active}
                      title={count ? t.skills.provenBy(count) : t.skills.experienceOnly}
                      className={[
                        "rounded-full border px-3 py-1 text-sm transition-colors",
                        active
                          ? "border-accent bg-accent text-accent-fg"
                          : count
                            ? "border-border bg-surface hover:border-accent"
                            : "border-dashed border-border text-muted hover:border-accent",
                      ].join(" ")}
                    >
                      {skill}
                      {count > 0 && (
                        <span className={`ml-1.5 font-mono text-xs ${active ? "" : "text-accent"}`}>{count}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <p className="text-xs text-subtle">
          <span className="mr-1 inline-block rounded-full border border-dashed border-border px-2">—</span>
          {t.skills.experienceOnly}
        </p>
      </div>

      <div id="projects" className="scroll-mt-20">
        <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">{t.projects.title}</h2>
          {selected ? (
            <p className="text-sm text-muted">
              {t.skills.showing} <span className="font-medium text-accent">{selected}</span>
              <button type="button" onClick={() => setSelected(null)} className="ml-2 underline hover:text-fg">
                {t.skills.all}
              </button>
            </p>
          ) : (
            <p className="text-sm text-muted">{t.projects.lead}</p>
          )}
        </div>

        {selected && ordered.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border p-6 text-sm text-muted">
            {t.skills.experienceOnly}
          </p>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {ordered.map((p) => (
              <li key={p.slug} className="flex flex-col rounded-xl border border-border bg-surface p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="font-semibold">{p.name}</h3>
                  {p.featured && (
                    <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-xs text-fg">
                      {t.projects.featured}
                    </span>
                  )}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted">{p.description[lang]}</p>
                <ul className="mb-4 mt-auto flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className={`rounded px-1.5 py-0.5 font-mono text-xs ${
                        s === selected ? "bg-accent text-accent-fg" : "bg-bg text-muted"
                      }`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <a href={p.repo} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent hover:underline">
                  {t.projects.repo} →
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
