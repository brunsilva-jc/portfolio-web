export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const otherLocale = (lang: Locale): Locale => (lang === "pt" ? "en" : "pt");

const dictionaries = {
  pt: {
    nav: { about: "Sobre", skills: "Habilidades", projects: "Projetos", experience: "Experiência", cv: "Currículo" },
    switchTo: "English",
    hero: { cta: "Ver projetos", cv: "Currículo" },
    focus: "Foco atual",
    whatIDo: "O que eu faço",
    skills: {
      title: "Habilidades e provas",
      lead: "Cada habilidade aponta para onde ela está demonstrada. Escolha uma para ver os projetos que a provam.",
      all: "Todas",
      provenBy: (n: number) => (n === 1 ? "1 projeto público" : `${n} projetos públicos`),
      experienceOnly: "Usada na experiência profissional — ainda sem projeto público.",
      showing: "Projetos que provam",
    },
    projects: {
      title: "Projetos",
      lead: "Código aberto no GitHub. Os destaques foram escolhidos por demonstrar o que afirmo saber.",
      featured: "Destaque",
      repo: "Ver código",
      others: "Outros projetos",
    },
    experience: { title: "Experiência", present: "atual", parallel: "Frente paralela" },
    education: "Formação",
    languages: "Idiomas",
    certifications: "Certificações",
    contact: { title: "Contato", lead: "Aberto a oportunidades em backend e arquitetura de software." },
    cv: { back: "Voltar ao site", print: "Baixar PDF", summary: "Resumo", skills: "Habilidades", projects: "Projetos selecionados" },
  },
  en: {
    nav: { about: "About", skills: "Skills", projects: "Projects", experience: "Experience", cv: "Résumé" },
    switchTo: "Português",
    hero: { cta: "See projects", cv: "Résumé" },
    focus: "Currently focused on",
    whatIDo: "What I do",
    skills: {
      title: "Skills and evidence",
      lead: "Every skill points to where it is demonstrated. Pick one to see the projects that prove it.",
      all: "All",
      provenBy: (n: number) => (n === 1 ? "1 public project" : `${n} public projects`),
      experienceOnly: "Used in professional work — no public project yet.",
      showing: "Projects proving",
    },
    projects: {
      title: "Projects",
      lead: "Open source on GitHub. The featured ones were chosen because they demonstrate what I claim to know.",
      featured: "Featured",
      repo: "View code",
      others: "Other projects",
    },
    experience: { title: "Experience", present: "present", parallel: "Parallel track" },
    education: "Education",
    languages: "Languages",
    certifications: "Certifications",
    contact: { title: "Contact", lead: "Open to backend and software architecture opportunities." },
    cv: { back: "Back to site", print: "Download PDF", summary: "Summary", skills: "Skills", projects: "Selected projects" },
  },
};

export type Dictionary = (typeof dictionaries)["pt"];
export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang];

export function formatPeriod(start: string, end: string | null, lang: Locale, present: string) {
  const fmt = (ym: string) => {
    const [y, m] = ym.split("-").map(Number);
    return new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", { month: "short", year: "numeric" })
      .format(new Date(y, m - 1))
      .replace(".", "");
  };
  return `${fmt(start)} — ${end ? fmt(end) : present}`;
}
