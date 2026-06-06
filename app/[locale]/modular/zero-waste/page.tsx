import CategoryRedirect from "@/components/site/CategoryRedirect";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ModularZeroWastePage() {
  return <CategoryRedirect pathname="/modular" category="sifir-atik" />;
}
