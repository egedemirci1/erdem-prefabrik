import { Metadata } from "next";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import CategoryCards from "@/components/site/CategoryCards";
import PortfolioGrid from "@/components/site/PortfolioGrid";
import TechnicalFeatures from "@/components/site/TechnicalFeatures";
import AboutSection from "@/components/site/AboutSection";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Erdem Prefabrik - Zerafetin Modüler Hali | Prefabrik Ev, Modüler Yapı, Konteyner Çözümleri",
  description: "20+ yıllık deneyimle prefabrik ev, modüler yapı, konteyner ve çelik yapı çözümleri sunuyoruz. Kaliteli malzeme, hızlı kurulum, uygun fiyat. Konya merkezli, Türkiye geneli hizmet.",
  keywords: "prefabrik ev, modüler yapı, konteyner, çelik yapı, prefabrik villa, tiny house, bungalow, şantiye yapısı, Konya prefabrik, Türkiye prefabrik",
  openGraph: {
    title: "Erdem Prefabrik - Zerafetin Modüler Hali",
    description: "20+ yıllık deneyimle prefabrik ev, modüler yapı, konteyner ve çelik yapı çözümleri sunuyoruz.",
    type: "website",
    locale: "tr_TR",
    siteName: "Erdem Prefabrik",
    images: [
      {
        url: "/images/Logo.png",
        width: 1200,
        height: 630,
        alt: "Erdem Prefabrik Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Erdem Prefabrik - Zerafetin Modüler Hali",
    description: "20+ yıllık deneyimle prefabrik ev, modüler yapı, konteyner ve çelik yapı çözümleri sunuyoruz.",
    images: ["/images/Logo.png"]
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
    canonical: "https://erdemprefabrik.com"
  }
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CategoryCards />
      <PortfolioGrid />
      <TechnicalFeatures />
      <AboutSection />
      <Footer />
    </main>
  );
}
