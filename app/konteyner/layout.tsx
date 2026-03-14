import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Konteyner Yapılar | Konya Prefabrik - Erdem Prefabrik",
  description: "Konya prefabrik konteyner ev, ofis, WC & duş kabini, güvenlik kulübesi. Mobil ve pratik konteyner yapılar. Hızlı kurulum, uygun fiyat. Konya Karatay merkezli, Türkiye geneli hizmet.",
  keywords: "Konya konteyner, konteyner ev, konteyner ofis, konteyner WC, güvenlik kulübesi, mobil konteyner, konteyner fiyat, Konya prefabrik",
  openGraph: {
    title: "Konteyner Yapılar | Konya Prefabrik - Erdem Prefabrik",
    description: "Konya konteyner ev, ofis, WC & duş kabini, güvenlik kulübesi. Erdem Prefabrik Konya.",
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
    canonical: "https://erdemprefabrik.com/konteyner/"
  }
};

export default function KonteynerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="konteyner-service-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Konteyner Yapılar",
          description: "Konteyner ev, ofis, WC & duş kabini, güvenlik kulübesi çözümleri. Mobil ve pratik konteyner yapılar.",
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
          serviceType: ["Konteyner Ev", "Konteyner Ofis", "Güvenlik Kulübesi", "WC & Duş Kabini"],
        })}
      </Script>
      {children}
    </>
  );
}
