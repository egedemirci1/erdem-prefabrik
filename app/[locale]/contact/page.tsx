import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ContactForm from "@/components/site/ContactForm";
import Breadcrumb from "@/components/site/Breadcrumb";
import { Instagram, Facebook, Phone, Mail, MapPin, Clock } from "lucide-react";
import { routing } from "@/i18n/routing";
import { getAlternateLanguages, getLocaleOpenGraph } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });

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
    alternates: getAlternateLanguages(locale as "tr" | "en", "/iletisim/", "/contact/"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const tFooter = await getTranslations("footer");

  return (
    <main className="min-h-screen">
      <Script id="contact-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `${tNav("contact")} - Erdem Prefabrik`,
          url: locale === "tr" ? "https://erdemprefabrik.com/iletisim/" : "https://erdemprefabrik.com/en/contact/",
          mainEntity: {
            "@type": "LocalBusiness",
            name: "Erdem Prefabrik",
            telephone: "+90 332 351 80 60",
            email: "info@erdemprefabrikev.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Fetih Mahallesi, Adana Çevreyolu Caddesi No:119 Pk:42030 BP Petrol Karşısı",
              addressLocality: "Karatay",
              addressRegion: "Konya",
              addressCountry: "TR",
            },
          },
        })}
      </Script>
      <Header />
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ name: tCommon("home"), href: "/" as const }, { name: tNav("contact"), href: "/contact" as const }]} />
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extralight text-foreground mb-4">{t("title")}</h1>
            <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">{t("subtitle")}</p>
            <div className="mt-4 h-px w-96 mx-auto bg-muted-foreground/80" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="min-w-0 space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow"><MapPin className="h-5 w-5 text-accent" /></div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-light text-foreground mb-2">{t("address")}</h3>
                    <p className="text-muted-foreground font-light leading-relaxed">{tCommon("address")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow"><Phone className="h-5 w-5 text-accent" /></div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-light text-foreground mb-2">{t("phone")}</h3>
                    <p className="text-muted-foreground font-light">+90 332 351 80 60</p>
                    <p className="text-muted-foreground font-light">+90 533 379 25 88 • +90 533 380 25 88</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow"><Mail className="h-5 w-5 text-accent" /></div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-light text-foreground mb-2">{t("email")}</h3>
                    <a href="mailto:info@erdemprefabrikev.com" className="text-accent hover:underline font-light">info@erdemprefabrikev.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow"><Instagram className="h-5 w-5 text-accent" /></div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-light text-foreground mb-2">{t("instagram")}</h3>
                    <a href="https://www.instagram.com/prefabrikerdem" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
                      <Instagram className="w-4 h-4" />
                      <span className="text-sm font-medium">{tFooter("followInstagram")}</span>
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow"><Facebook className="h-5 w-5 text-accent" /></div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-light text-foreground mb-2">{t("facebook")}</h3>
                    <a href="https://www.facebook.com/erdemprefabrik" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300">
                      <Facebook className="w-4 h-4" />
                      <span className="text-sm font-medium">{t("followFacebook")}</span>
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow"><Clock className="h-5 w-5 text-accent" /></div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-light text-foreground mb-2">{t("hours")}</h3>
                    <p className="text-muted-foreground font-light">{t("weekdays")}</p>
                    <p className="text-muted-foreground font-light">{t("saturday")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6"><ContactForm /></div>
          </div>
          <div className="mt-16">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
              <iframe title={t("mapTitle")} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Fetih%20Mahallesi%2C%20Adana%20%C3%87evreyolu%20Caddesi%20No%3A119%2C%20Karatay%2FKonya&output=embed" />
            </div>
            <div className="mt-4 text-center">
              <a href="https://maps.app.goo.gl/pA2wcuhfdE3q6M729" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{t("openMaps")}</a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
