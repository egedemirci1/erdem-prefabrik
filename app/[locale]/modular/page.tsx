import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ModulerClient from "./ModulerClient";
import { getModulerProjects } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { buildSectionPageMetadata } from "@/lib/i18n/page-metadata";
import ServiceJsonLd from "@/components/site/ServiceJsonLd";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildSectionPageMetadata({
    locale,
    namespace: "modularPage",
    trPath: "/moduler/",
    enPath: "/modular/",
  });
}

export default async function ModularPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common");
  const tPage = await getTranslations("modularPage");
  const projects = getModulerProjects(locale as Locale);
  const serviceTypes = tPage.raw("jsonLdServiceTypes") as string[];

  return (
    <>
      <ServiceJsonLd
        id="moduler-service-jsonld"
        name={tPage("jsonLdName")}
        description={tPage("jsonLdDescription")}
        serviceTypes={serviceTypes}
        countryName={t("country")}
      />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">{t("loading")}</div>}>
        <ModulerClient initialProjects={projects} />
      </Suspense>
    </>
  );
}
