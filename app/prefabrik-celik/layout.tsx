import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Prefabrik & Çelik Yapılar | Erdem Prefabrik - Prefabrik Ev, Villa, Ofis & Şantiye",
  description: "Prefabrik ev, villa, ofis ve şantiye yapıları. Çelik konstrüksiyonlu dayanıklı yapılar. Hızlı kurulum, kaliteli malzeme, uygun fiyat. Konya merkezli, Türkiye geneli hizmet.",
  keywords: "prefabrik ev, prefabrik villa, çelik ev, çelik villa, prefabrik ofis, şantiye yapısı, prefabrik fiyat, çelik yapı fiyat, prefabrik ev fiyatları",
  openGraph: {
    title: "Prefabrik & Çelik Yapılar | Erdem Prefabrik",
    description: "Prefabrik ev, villa, ofis ve şantiye yapıları. Çelik konstrüksiyonlu dayanıklı yapılar.",
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
    canonical: "https://erdemprefabrik.com/prefabrik-celik/"
  }
};

export default function PrefabrikCelikLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="prefabrik-celik-service-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Prefabrik & Çelik Yapılar",
          description: "Prefabrik ev, villa, ofis ve şantiye yapıları. Çelik konstrüksiyonlu dayanıklı yapılar.",
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
          serviceType: ["Prefabrik Ev", "Prefabrik Villa", "Çelik Ev", "Çelik Villa", "Şantiye Yapıları"],
        })}
      </Script>
      {children}
    </>
  );
}
