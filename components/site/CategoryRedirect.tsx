"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import type { Pathnames } from "@/i18n/routing";

type CategoryRedirectProps = {
  pathname: Pathnames;
  category: string;
};

export default function CategoryRedirect({ pathname, category }: CategoryRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    router.replace({ pathname, query: { category } });
  }, [router, pathname, category]);

  return null;
}
