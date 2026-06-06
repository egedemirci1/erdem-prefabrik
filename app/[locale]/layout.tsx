import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import HtmlLangSetter from "@/components/site/HtmlLangSetter";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlLangSetter />
      <Script id="org-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Erdem Prefabrik",
          alternateName: "Erdem Prefabrik Konya",
          url: "https://erdemprefabrik.com",
          logo: "https://erdemprefabrik.com/images/Logo.png",
          sameAs: [
            "https://www.instagram.com/prefabrikerdem",
            "https://www.facebook.com/erdemprefabrik",
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress:
              "Fetih Mahallesi, Adana Çevreyolu Caddesi No:119 Pk:42030 BP Petrol Karşısı",
            addressLocality: "Karatay",
            addressRegion: "Konya",
            addressCountry: "TR",
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+90 332 351 80 60",
              contactType: "customer service",
              areaServed: ["Konya", "TR"],
              availableLanguage: ["tr", "en"],
            },
          ],
        })}
      </Script>
      {children}
    </NextIntlClientProvider>
  );
}
