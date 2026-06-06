import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Breadcrumb from "@/components/site/Breadcrumb";
import { routing } from "@/i18n/routing";
import { getAlternateLanguages, getLocaleOpenGraph } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "termsPage" });
  return {
    title: t("title"),
    description: (t.raw("sections") as Array<{ body: string }>)[0]?.body,
    openGraph: { title: t("title"), locale: getLocaleOpenGraph(locale as "tr" | "en") },
    alternates: getAlternateLanguages(locale as "tr" | "en", "/kullanim-kosullari/", "/terms/"),
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("termsPage");
  const tCommon = await getTranslations("common");
  const tFooter = await getTranslations("footer");
  const sections = t.raw("sections") as Array<{ title: string; body: string }>;

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-24 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ name: tCommon("home"), href: "/" as const }, { name: tFooter("terms"), href: "/terms" as const }]} />
          <h1 className="text-4xl font-extralight text-foreground mb-4">{t("title")}</h1>
          <p className="text-sm text-muted-foreground mb-8">{t("updated")}</p>
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-medium text-foreground mb-3">{section.title}</h2>
                <p className="text-muted-foreground font-light leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
