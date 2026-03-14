import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Projelerimiz | Konya Prefabrik - Erdem Prefabrik Referanslar",
  description: "Konya prefabrik projeleri. Erdem Prefabrik 20+ yıllık deneyimle tamamladığı prefabrik ev, modüler yapı, konteyner ve çelik yapı projeleri. 1000+ referans. Konya merkezli, Türkiye geneli.",
  keywords: "Konya prefabrik projeleri, prefabrik projeler, modüler projeler, konteyner projeler, prefabrik ev örnekleri, Erdem Prefabrik referanslar",
  openGraph: {
    title: "Projelerimiz | Konya Prefabrik - Erdem Prefabrik",
    description: "Konya prefabrik projeleri. 20+ yıl deneyim, 1000+ referans. Erdem Prefabrik.",
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
    canonical: "https://erdemprefabrik.com/projeler/"
  }
};

export default function ProjelerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="projeler-collection-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Erdem Prefabrik Projeleri",
          description: "20+ yıllık deneyimimizle tamamladığımız prefabrik ev, modüler yapı, konteyner ve çelik yapı projelerimiz.",
          url: "https://erdemprefabrik.com/projeler/",
          isPartOf: {
            "@type": "WebSite",
            name: "Erdem Prefabrik",
            url: "https://erdemprefabrik.com",
          },
        })}
      </Script>
      {children}
    </>
  );
}
