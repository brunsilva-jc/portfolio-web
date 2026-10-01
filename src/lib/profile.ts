// Gerado por portfolio/integracoes/exportar_site.py — não editar profile.json à mão.
import data from "@/data/profile.json";

export type Bilingual<T = string> = { pt: T; en: T };

export type Project = {
  slug: string;
  name: string;
  repo: string;
  featured: boolean;
  stack: string[];
  proves: string[];
  description: Bilingual;
};

export type Profile = {
  name: string;
  location: Bilingual;
  email: string;
  linkedin: string;
  github: string;
  site: string | null;
  title: Bilingual;
  summary: Bilingual;
  intro: Bilingual;
  focus: Bilingual<string[]>;
  whatIDo: Bilingual<string[]>;
  skillGroups: { key: string; label: Bilingual; items: string[] }[];
  experience: {
    company: string;
    start: string;
    end: string | null;
    roles: {
      title: Bilingual;
      start: string;
      end: string | null;
      highlights: Bilingual<string[]>;
      tracks: { name: Bilingual; start: string; end: string | null; highlights: Bilingual<string[]> }[];
    }[];
  }[];
  projects: Project[];
  education: { course: Bilingual; institution: string; year: number }[];
  languages: { name: Bilingual; level: Bilingual }[];
  certifications: { name: string; date: string; url: string }[];
  cvVariants: CvVariant[];
};

export type CvVariant = {
  id: string;
  title: Bilingual;
  summary: Bilingual | null;
  groupOrder: string[];
  highlightSkills: string[];
  projects: string[];
};

export const profile = data as Profile;
