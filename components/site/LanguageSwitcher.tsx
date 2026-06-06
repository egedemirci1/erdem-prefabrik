"use client";

import { useLocale } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type LanguageSwitcherProps = {
  isLight?: boolean;
  className?: string;
};

const LanguageSwitcher = ({ isLight = false, className = "" }: LanguageSwitcherProps) => {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    const href = getPathname({ href: pathname, locale: newLocale });
    // Static export has no /tr/ routes; full navigation uses localized slugs.
    window.location.assign(href);
  };

  const borderClass = isLight ? "border-white/30" : "border-gray-300";
  const baseClass = isLight ? "text-white" : "text-gray-800";
  const activeClass = isLight
    ? "bg-white/20 font-semibold text-white"
    : "bg-gray-100 font-semibold text-gray-900";
  const inactiveClass = isLight
    ? "text-white/70 hover:text-white hover:bg-white/10"
    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50";

  return (
    <div
      className={`inline-flex items-center rounded-full border p-0.5 text-xs font-medium shrink-0 ${borderClass} ${baseClass} ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => switchLocale("tr")}
        className={`min-w-[2rem] rounded-full px-2 py-1 transition-colors ${locale === "tr" ? activeClass : inactiveClass}`}
        aria-current={locale === "tr" ? "true" : undefined}
      >
        TR
      </button>
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={`min-w-[2rem] rounded-full px-2 py-1 transition-colors ${locale === "en" ? activeClass : inactiveClass}`}
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
