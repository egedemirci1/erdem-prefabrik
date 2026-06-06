import type { Locale } from "@/i18n/routing";
import type { Project } from "@/lib/categories";

import featuredTr from "@/data/tr/featured-projects.json";
import projectsTr from "@/data/tr/projects.json";
import konteynerTr from "@/data/tr/projects-konteyner.json";
import modulerTr from "@/data/tr/projects-moduler.json";
import prefabrikCelikTr from "@/data/tr/projects-prefabrik-celik.json";

import featuredEn from "@/data/en/featured-projects.json";
import projectsEn from "@/data/en/projects.json";
import konteynerEn from "@/data/en/projects-konteyner.json";
import modulerEn from "@/data/en/projects-moduler.json";
import prefabrikCelikEn from "@/data/en/projects-prefabrik-celik.json";

const dataByLocale = {
  tr: {
    featured: featuredTr,
    projects: projectsTr,
    konteyner: konteynerTr,
    moduler: modulerTr,
    prefabrikCelik: prefabrikCelikTr,
  },
  en: {
    featured: featuredEn,
    projects: projectsEn,
    konteyner: konteynerEn,
    moduler: modulerEn,
    prefabrikCelik: prefabrikCelikEn,
  },
} as const;

export function getFeaturedProjects(locale: Locale): Project[] {
  return dataByLocale[locale].featured as Project[];
}

export function getAllProjects(locale: Locale): Project[] {
  return dataByLocale[locale].projects as Project[];
}

export function getKonteynerProjects(locale: Locale): Project[] {
  return dataByLocale[locale].konteyner as Project[];
}

export function getModulerProjects(locale: Locale): Project[] {
  return dataByLocale[locale].moduler as Project[];
}

export function getPrefabrikCelikProjects(locale: Locale): Project[] {
  return dataByLocale[locale].prefabrikCelik as Project[];
}
