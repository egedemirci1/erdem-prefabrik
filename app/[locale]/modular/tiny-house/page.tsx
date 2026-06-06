import CategoryRedirect from "@/components/site/CategoryRedirect";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ModularTinyHousePage() {
  return <CategoryRedirect pathname="/modular" category="tiny-house" />;
}
