import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjelerClient from "./ProjelerClient";
import { getAllProjects } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { buildSectionPageMetadata } from "@/lib/i18n/page-metadata";
import ProjectsCollectionJsonLd from "@/components/site/ProjectsCollectionJsonLd";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildSectionPageMetadata({
    locale,
    namespace: "projectsPage",
    trPath: "/projeler/",
    enPath: "/projects/",
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tPage = await getTranslations("projectsPage");
  const projects = getAllProjects(locale as Locale);
  const jsonLdUrl =
    locale === "tr" ? "https://erdemprefabrik.com/projeler/" : "https://erdemprefabrik.com/en/projects/";

  return (
    <>
      <ProjectsCollectionJsonLd
        name={tPage("jsonLdName")}
        description={tPage("jsonLdDescription")}
        url={jsonLdUrl}
      />
      <ProjelerClient initialProjects={projects} />
    </>
  );
}
