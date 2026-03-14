import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Projelerimiz | Erdem Prefabrik - Başarıyla Tamamlanan Prefabrik Projeler",
  description: "20+ yıllık deneyimimizle tamamladığımız prefabrik ev, modüler yapı, konteyner ve çelik yapı projelerimizi inceleyin. 1000+ başarılı proje referansımız. Konya merkezli, Türkiye geneli.",
  keywords: "prefabrik projeler, modüler projeler, konteyner projeler, çelik yapı projeler, prefabrik ev örnekleri, başarılı projeler, referans projeler, proje galerisi",
  openGraph: {
    title: "Projelerimiz | Erdem Prefabrik",
    description: "20+ yıllık deneyimimizle tamamladığımız prefabrik ev, modüler yapı, konteyner ve çelik yapı projelerimizi inceleyin.",
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
