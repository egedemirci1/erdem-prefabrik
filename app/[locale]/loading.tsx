"use client";

import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("common");
  return (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground">
      {t("loading")}
    </div>
  );
}
