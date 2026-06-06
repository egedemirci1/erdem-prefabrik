import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getAlternateLanguages, getLocaleOpenGraph } from "@/lib/i18n/metadata";

const ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

type PageMetadataOptions = {
  locale: string;
  namespace: "containerPage" | "modularPage" | "prefabSteelPage" | "projectsPage";
  trPath: string;
  enPath: string;
};

export async function buildSectionPageMetadata({
  locale,
  namespace,
  trPath,
  enPath,
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: t("metaKeywords"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaOgDescription"),
      type: "website",
      locale: getLocaleOpenGraph(locale as Locale),
      siteName: "Erdem Prefabrik",
      images: [{ url: "/images/Logo.png", width: 1200, height: 630, alt: "Erdem Prefabrik" }],
    },
    robots: ROBOTS,
    alternates: getAlternateLanguages(locale as Locale, trPath, enPath),
  };
}
