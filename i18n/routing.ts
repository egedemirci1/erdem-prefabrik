import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/about": {
      tr: "/hakkimizda",
      en: "/about",
    },
    "/contact": {
      tr: "/iletisim",
      en: "/contact",
    },
    "/projects": {
      tr: "/projeler",
      en: "/projects",
    },
    "/privacy": {
      tr: "/gizlilik",
      en: "/privacy",
    },
    "/terms": {
      tr: "/kullanim-kosullari",
      en: "/terms",
    },
    "/container": {
      tr: "/konteyner",
      en: "/container",
    },
    "/container/home": {
      tr: "/konteyner/ev",
      en: "/container/home",
    },
    "/container/office": {
      tr: "/konteyner/ofis",
      en: "/container/office",
    },
    "/container/security-booth": {
      tr: "/konteyner/guvenlik-kulubesi",
      en: "/container/security-booth",
    },
    "/container/wc-shower": {
      tr: "/konteyner/wc-dus-kabini",
      en: "/container/wc-shower",
    },
    "/modular": {
      tr: "/moduler",
      en: "/modular",
    },
    "/modular/bungalow": {
      tr: "/moduler/bungalow",
      en: "/modular/bungalow",
    },
    "/modular/office": {
      tr: "/moduler/ofis",
      en: "/modular/office",
    },
    "/modular/tiny-house": {
      tr: "/moduler/tiny-house",
      en: "/modular/tiny-house",
    },
    "/modular/modular-home": {
      tr: "/moduler/moduler-ev",
      en: "/modular/modular-home",
    },
    "/modular/zero-waste": {
      tr: "/moduler/sifir-atik",
      en: "/modular/zero-waste",
    },
    "/prefab-steel": {
      tr: "/prefabrik-celik",
      en: "/prefab-steel",
    },
    "/prefab-steel/prefab-home-villa": {
      tr: "/prefabrik-celik/prefabrik-ev-villa",
      en: "/prefab-steel/prefab-home-villa",
    },
    "/prefab-steel/construction-special": {
      tr: "/prefabrik-celik/santiye-ozel-kullanim",
      en: "/prefab-steel/construction-special",
    },
    "/prefab-steel/steel-home-villa": {
      tr: "/prefabrik-celik/celik-ev-villa",
      en: "/prefab-steel/steel-home-villa",
    },
    "/prefab-steel/construction-buildings": {
      tr: "/prefabrik-celik/prefabrik-santiye-yapilari",
      en: "/prefab-steel/construction-buildings",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;
