import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import AboutTabs from "@/components/site/AboutTabs";
import Breadcrumb from "@/components/site/Breadcrumb";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAlternateLanguages, getLocaleOpenGraph } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      type: "website",
      locale: getLocaleOpenGraph(locale as "tr" | "en"),
      siteName: "Erdem Prefabrik",
      images: [{ url: "/images/Logo.png", width: 1200, height: 630, alt: "Erdem Prefabrik" }],
    },
    alternates: getAlternateLanguages(locale as "tr" | "en", "/hakkimizda/", "/about/"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-24 bg-secondary min-h-[calc(100vh-200px)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { name: tCommon("home"), href: "/" as const },
              { name: tNav("about"), href: "/about" as const },
            ]}
          />
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extralight text-foreground mb-6">{t("title")}</h1>
            <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">{t("subtitle")}</p>
            <div className="mt-4 h-px w-96 mx-auto bg-muted-foreground/80" />
          </div>
          <div className="mt-6 sm:mt-10">
            <AboutTabs />
          </div>
          <div className="mt-6 sm:mt-8 mx-auto w-full max-w-4xl px-4">
            <div className="bg-accent text-white rounded-2xl px-4 sm:px-6 py-4 sm:py-6 flex flex-col md:flex-row md:items-center md:justify-between shadow-xl">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <div className="text-lg sm:text-xl font-bold">{t("ctaTitle")}</div>
                <div className="text-white/90 text-xs sm:text-sm">{t("ctaDesc")}</div>
              </div>
              <Link href="/contact" className="inline-flex items-center justify-center bg-white text-accent px-4 sm:px-6 h-10 sm:h-12 rounded-xl font-medium hover:bg-white/90 transition-colors text-sm sm:text-base">
                {tCommon("contactUs")}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
