import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Modüler Yapılar | Erdem Prefabrik - Modüler Ev, Bungalow, Tiny House & Ofis",
  description: "Modüler ev, bungalow, tiny house, ofis ve sıfır atık merkezi çözümleri. Esnek ve özelleştirilebilir modüler yapılar. Hızlı kurulum, kaliteli malzeme. Konya merkezli, Türkiye geneli hizmet.",
  keywords: "modüler ev, bungalow, tiny house, modüler ofis, sıfır atık merkezi, modüler yapı, modüler projeler, modüler fiyat, tiny house fiyat",
  openGraph: {
    title: "Modüler Yapılar | Erdem Prefabrik",
    description: "Modüler ev, bungalow, tiny house, ofis ve sıfır atık merkezi çözümleri. Esnek ve özelleştirilebilir modüler yapılar.",
    type: "website",
    locale: "tr_TR",
    siteName: "Erdem Prefabrik",
    images: [{ url: "/images/Logo.png", width: 1200, height: 630, alt: "Erdem Prefabrik" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://erdemprefabrik.com/moduler/"
  }
};

export default function ModulerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="moduler-service-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Modüler Yapılar",
          description: "Modüler ev, bungalow, tiny house, ofis ve sıfır atık merkezi çözümleri.",
          provider: {
            "@type": "LocalBusiness",
            name: "Erdem Prefabrik",
            url: "https://erdemprefabrik.com",
            telephone: "+90 332 351 80 60",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Fetih Mahallesi, Adana Çevreyolu Caddesi No:119",
              addressLocality: "Karatay",
              addressRegion: "Konya",
              postalCode: "42030",
              addressCountry: "TR",
            },
          },
          areaServed: { "@type": "Country", name: "Türkiye" },
          serviceType: ["Modüler Ev", "Bungalow", "Tiny House", "Modüler Ofis", "Sıfır Atık Merkezi"],
        })}
      </Script>
      {children}
    </>
  );
}
