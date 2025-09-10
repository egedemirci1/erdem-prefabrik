import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Konteyner Yapılar | Erdem Prefabrik - Konteyner Ev, Ofis, WC & Güvenlik Kulübesi",
  description: "Konteyner ev, ofis, WC & duş kabini, güvenlik kulübesi çözümleri. Mobil ve pratik konteyner yapılar. Hızlı kurulum, uygun fiyat.",
  keywords: "konteyner ev, konteyner ofis, konteyner WC, güvenlik kulübesi, mobil konteyner, konteyner fiyat, konteyner projeler",
  openGraph: {
    title: "Konteyner Yapılar | Erdem Prefabrik",
    description: "Konteyner ev, ofis, WC & duş kabini, güvenlik kulübesi çözümleri. Mobil ve pratik konteyner yapılar.",
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
    canonical: "https://erdemprefabrik.com/konteyner"
  }
};

export default function KonteynerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
