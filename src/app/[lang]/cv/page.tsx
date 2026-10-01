import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CvDocument } from "@/components/CvDocument";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { profile } from "@/lib/profile";

export async function generateMetadata({ params }: PageProps<"/[lang]/cv">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: `${profile.name} — ${getDictionary(lang).nav.cv}` };
}

export default async function CV({ params }: PageProps<"/[lang]/cv">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <CvDocument lang={lang} />;
}
