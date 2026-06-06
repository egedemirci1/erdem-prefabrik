import CategoryRedirect from "@/components/site/CategoryRedirect";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ContainerWcPage() {
  return <CategoryRedirect pathname="/container" category="wc-dus-kabini" />;
}
