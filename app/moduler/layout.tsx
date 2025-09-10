import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Modüler Yapılar | Erdem Prefabrik - Modüler Ev, Bungalow, Tiny House & Ofis",
  description: "Modüler ev, bungalow, tiny house, ofis ve sıfır atık merkezi çözümleri. Esnek ve özelleştirilebilir modüler yapılar. Hızlı kurulum, kaliteli malzeme.",
  keywords: "modüler ev, bungalow, tiny house, modüler ofis, sıfır atık merkezi, modüler yapı, modüler projeler, modüler fiyat",
  openGraph: {
    title: "Modüler Yapılar | Erdem Prefabrik",
    description: "Modüler ev, bungalow, tiny house, ofis ve sıfır atık merkezi çözümleri. Esnek ve özelleştirilebilir modüler yapılar.",
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
    canonical: "https://erdemprefabrik.com/moduler"
  }
};

export default function ModulerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
