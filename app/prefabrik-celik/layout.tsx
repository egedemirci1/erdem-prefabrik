import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Prefabrik & Çelik Yapılar | Erdem Prefabrik - Prefabrik Ev, Villa, Ofis & Şantiye",
  description: "Prefabrik ev, villa, ofis ve şantiye yapıları. Çelik konstrüksiyonlu dayanıklı yapılar. Hızlı kurulum, kaliteli malzeme, uygun fiyat.",
  keywords: "prefabrik ev, prefabrik villa, çelik ev, çelik villa, prefabrik ofis, şantiye yapısı, prefabrik fiyat, çelik yapı fiyat",
  openGraph: {
    title: "Prefabrik & Çelik Yapılar | Erdem Prefabrik",
    description: "Prefabrik ev, villa, ofis ve şantiye yapıları. Çelik konstrüksiyonlu dayanıklı yapılar.",
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
    canonical: "https://erdemprefabrik.com/prefabrik-celik"
  }
};

export default function PrefabrikCelikLayout({ children }: { children: React.ReactNode }) {
  return children;
}
