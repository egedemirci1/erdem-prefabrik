import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import KonteynerClient from "./KonteynerClient";
import { getKonteynerProjects } from "@/lib/projects";
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
    namespace: "containerPage",
    trPath: "/konteyner/",
    enPath: "/container/",
  });
}

export default async function ContainerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common");
  const tPage = await getTranslations("containerPage");
  const projects = getKonteynerProjects(locale as Locale);
  const serviceTypes = tPage.raw("jsonLdServiceTypes") as string[];

  return (
    <>
      <ServiceJsonLd
        id="konteyner-service-jsonld"
        name={tPage("jsonLdName")}
        description={tPage("jsonLdDescription")}
        serviceTypes={serviceTypes}
        countryName={t("country")}
      />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">{t("loading")}</div>}>
        <KonteynerClient initialProjects={projects} />
      </Suspense>
    </>
  );
}
