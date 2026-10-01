// Variantes do currículo por tipo de vaga. Rotas não listadas no site e fora dos buscadores:
// existem para gerar os PDFs (portfolio/integracoes/gerar_cvs.py) e para enviar o link direto.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CvDocument } from "@/components/CvDocument";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { profile } from "@/lib/profile";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => profile.cvVariants.map((v) => ({ lang, variant: v.id })));
}

const findVariant = (id: string) => profile.cvVariants.find((v) => v.id === id);

export async function generateMetadata({ params }: PageProps<"/[lang]/cv/[variant]">): Promise<Metadata> {
  const { lang, variant } = await params;
  const v = findVariant(variant);
  if (!hasLocale(lang) || !v) return {};
  return {
    title: `${profile.name} — ${getDictionary(lang).nav.cv} — ${v.title[lang]}`,
    robots: { index: false, follow: false },
  };
}

export default async function CvVariantPage({ params }: PageProps<"/[lang]/cv/[variant]">) {
  const { lang, variant } = await params;
  const v = findVariant(variant);
  if (!hasLocale(lang) || !v) notFound();
  return <CvDocument lang={lang} variant={v} />;
}
