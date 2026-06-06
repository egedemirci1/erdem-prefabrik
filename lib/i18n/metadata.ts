import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";

const SITE_URL = "https://erdemprefabrik.com";

export function getLocaleOpenGraph(locale: Locale) {
  return locale === "tr" ? "tr_TR" : "en_US";
}

export function getAlternateLanguages(
  locale: Locale,
  trPath: string,
  enPath: string
): Metadata["alternates"] {
  const trUrl = `${SITE_URL}${trPath}`;
  const enUrl = `${SITE_URL}${enPath}`;

  return {
    canonical: locale === "tr" ? trUrl : enUrl,
    languages: {
      tr: trUrl,
      en: enUrl,
      "x-default": trUrl,
    },
  };
}

export function getLocalizedCanonical(locale: Locale, path: string): string {
  if (locale === "tr") {
    return `${SITE_URL}${path}`;
  }
  return `${SITE_URL}/en${path === "/" ? "" : path}`;
}
