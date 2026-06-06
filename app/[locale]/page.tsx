import { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Footer from "@/components/site/Footer";
import { routing } from "@/i18n/routing";
import { getAlternateLanguages, getLocaleOpenGraph } from "@/lib/i18n/metadata";

const CategoryCards = dynamic(() => import("@/components/site/CategoryCards"), { ssr: true });
const PortfolioGrid = dynamic(() => import("@/components/site/PortfolioGrid"), { ssr: true });
const TechnicalFeatures = dynamic(() => import("@/components/site/TechnicalFeatures"), { ssr: true });
const AboutSection = dynamic(() => import("@/components/site/AboutSection"), { ssr: true });

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    openGraph: {
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      type: "website",
      locale: getLocaleOpenGraph(locale as "tr" | "en"),
      siteName: "Erdem Prefabrik",
      images: [{ url: "/images/Logo.png", width: 1200, height: 630, alt: t("ogImageAlt") }],
    },
    alternates: getAlternateLanguages(locale as "tr" | "en", "/", "/"),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const faq = t.raw("faq") as Array<{ q: string; a: string }>;

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Script id="local-business-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Erdem Prefabrik",
          alternateName: "Erdem Prefabrik Konya",
          description: String(t.raw("intro")).replace(/<[^>]+>/g, ""),
          url: "https://erdemprefabrik.com",
          telephone: "+90 332 351 80 60",
          email: "info@erdemprefabrikev.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Fetih Mahallesi, Adana Çevreyolu Caddesi No:119 Pk:42030 BP Petrol Karşısı",
            addressLocality: "Karatay",
            addressRegion: "Konya",
            addressCountry: "TR",
          },
          geo: { "@type": "GeoCoordinates", latitude: 37.8746, longitude: 32.4932 },
          areaServed: [
            { "@type": "City", name: "Konya" },
            { "@type": "Country", name: locale === "tr" ? "Türkiye" : "Turkey" },
          ],
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
          ],
        })}
      </Script>
      <Header />
      <section className="bg-foreground text-background py-4 sm:py-5 text-center" aria-label={t("h1Aria")}>
        <h1 className="text-2xl sm:text-3xl font-extralight tracking-tight max-w-4xl mx-auto px-4">{t("h1")}</h1>
      </section>
      <Hero />
      <section className="bg-background py-8 text-center" aria-label={t("serviceAreaAria")}>
        <p className="text-muted-foreground font-light max-w-3xl mx-auto px-4" dangerouslySetInnerHTML={{ __html: t.raw("intro") as string }} />
      </section>
      <section className="bg-secondary py-12 px-4" aria-label={t("pricingAria")}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extralight text-foreground mb-6">{t("pricingTitle")}</h2>
          <p className="text-muted-foreground font-light leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t.raw("pricingDesc") as string }} />
        </div>
      </section>
      <CategoryCards />
      <PortfolioGrid />
      <TechnicalFeatures />
      <AboutSection />
      <section className="bg-background py-16 px-4" aria-label={t("faqAria")}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extralight text-foreground mb-10 text-center">{t("faqTitle")}</h2>
          <dl className="space-y-8">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="text-lg font-medium text-foreground mb-2">{item.q}</dt>
                <dd className="text-muted-foreground font-light leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        })}
      </Script>
      <Footer />
    </main>
  );
}
