import type { useTranslations } from "next-intl";

type Translator = ReturnType<typeof useTranslations<"categories">>;

export function getCategoryFilters(t: Translator) {
  return [
    { id: "all", name: t("all") },
    { id: "prefabrik", name: t("prefabrik") },
    { id: "celik", name: t("celik") },
    { id: "santiye", name: t("santiye") },
    { id: "moduler", name: t("moduler") },
  ];
}
