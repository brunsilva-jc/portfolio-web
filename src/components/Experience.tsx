import { formatPeriod, getDictionary, type Locale } from "@/lib/i18n";
import { profile } from "@/lib/profile";

export function Experience({ lang, compact = false }: { lang: Locale; compact?: boolean }) {
  const t = getDictionary(lang);
  const period = (s: string, e: string | null) => formatPeriod(s, e, lang, t.experience.present);
  return (
    <div className={compact ? "space-y-4" : "space-y-8"}>
      {profile.experience.map((company) => (
        <div key={company.company}>
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold">{company.company}</h3>
            <span className="font-mono text-xs text-subtle">{period(company.start, company.end)}</span>
          </div>
          <ol className={`border-l border-border ${compact ? "space-y-3 pl-4" : "space-y-6 pl-5"}`}>
            {company.roles.map((role) => (
              <li key={role.title.en} className="relative break-inside-avoid">
                <span
                  className={`absolute top-2 h-2 w-2 rounded-full bg-accent ${compact ? "-left-[1.3rem]" : "-left-[1.55rem]"}`}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-medium">{role.title[lang]}</h4>
                  <span className="font-mono text-xs text-subtle">{period(role.start, role.end)}</span>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-muted marker:text-subtle">
                  {role.highlights[lang].map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                {role.tracks.map((track) => (
                  <div key={track.name.en} className="mt-3 rounded-lg border border-border bg-surface p-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm">
                        <span className="mr-2 text-xs uppercase tracking-wider text-subtle">{t.experience.parallel}</span>
                        <span className="font-medium">{track.name[lang]}</span>
                      </p>
                      <span className="font-mono text-xs text-subtle">{period(track.start, track.end)}</span>
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-muted marker:text-subtle">
                      {track.highlights[lang].map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
