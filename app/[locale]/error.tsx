"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errorPage");
  const tCommon = useTranslations("common");

  useEffect(() => {}, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-3xl font-light text-foreground mb-3">{t("title")}</h1>
        <p className="text-muted-foreground font-light mb-8">{t("desc")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={reset} className="inline-flex items-center justify-center bg-accent text-white px-8 h-12 rounded-xl font-medium hover:bg-accent/90 transition-colors">
            {tCommon("tryAgain")}
          </button>
          <Link href="/" className="inline-flex items-center justify-center border border-accent text-accent px-8 h-12 rounded-xl font-medium hover:bg-accent hover:text-white transition-colors">
            {tCommon("backToHome")}
          </Link>
        </div>
      </div>
    </main>
  );
}
