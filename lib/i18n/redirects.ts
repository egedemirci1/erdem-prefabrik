import { permanentRedirect } from "next/navigation";
import type { Pathnames, Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

function getLocalizedPath(locale: Locale, pathname: Pathnames, query?: Record<string, string>) {
  const pathConfig = routing.pathnames[pathname];
  let localizedPath: string;

  if (typeof pathConfig === "string") {
    localizedPath = pathConfig;
  } else {
    localizedPath = pathConfig[locale];
  }

  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const base = `${prefix}${localizedPath}`;
  const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";

  return `${base}${queryString}`;
}

export function redirectWithQuery(
  locale: Locale,
  pathname: Pathnames,
  query: Record<string, string>
) {
  permanentRedirect(getLocalizedPath(locale, pathname, query));
}
