"use client";

import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import Script from "next/script";

type LinkHref = ComponentProps<typeof Link>["href"];

export interface BreadcrumbItem {
  name: string;
  href: LinkHref;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

function hrefToString(href: LinkHref): string {
  if (typeof href === "string") return href;
  if ("pathname" in href) {
    const query = "query" in href && href.query
      ? `?${new URLSearchParams(href.query as Record<string, string>).toString()}`
      : "";
    return `${href.pathname}${query}`;
  }
  return String(href);
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://erdemprefabrik.com${hrefToString(item.href).endsWith("/") ? hrefToString(item.href) : hrefToString(item.href) + "/"}`,
    })),
  };

  return (
    <>
      <Script
        id={`breadcrumb-jsonld-${items.length}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center flex-wrap gap-1 text-sm text-muted-foreground">
          {items.map((item, index) => (
            <li key={`${item.name}-${index}`} className="flex items-center">
              {index > 0 && <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-muted-foreground/50" />}
              {index === items.length - 1 ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-accent transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
