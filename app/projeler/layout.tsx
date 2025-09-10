import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Projelerimiz | Erdem Prefabrik - Başarıyla Tamamlanan Prefabrik Projeler",
  description: "20+ yıllık deneyimimizle tamamladığımız prefabrik ev, modüler yapı, konteyner ve çelik yapı projelerimizi inceleyin. 1000+ başarılı proje referansımız.",
  keywords: "prefabrik projeler, modüler projeler, konteyner projeler, çelik yapı projeler, prefabrik ev örnekleri, başarılı projeler, referans projeler",
  openGraph: {
    title: "Projelerimiz | Erdem Prefabrik",
    description: "20+ yıllık deneyimimizle tamamladığımız prefabrik ev, modüler yapı, konteyner ve çelik yapı projelerimizi inceleyin.",
    type: "website",
    locale: "tr_TR",
    siteName: "Erdem Prefabrik"
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
    canonical: "https://erdemprefabrik.com/projeler"
  }
};

export default function ProjelerLayout({ children }: { children: React.ReactNode }) {
  return children;
}

