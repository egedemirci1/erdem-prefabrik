import { Metadata } from "next";
import dynamic from "next/dynamic";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import CategoryCards from "@/components/site/CategoryCards";
import Footer from "@/components/site/Footer";

const PortfolioGrid = dynamic(() => import("@/components/site/PortfolioGrid"), { ssr: true });
const TechnicalFeatures = dynamic(() => import("@/components/site/TechnicalFeatures"), { ssr: true });
const AboutSection = dynamic(() => import("@/components/site/AboutSection"), { ssr: true });

export const metadata: Metadata = {
  title: "Erdem Prefabrik - 20+ Yıllık Deneyimle Prefabrik Yapı Çözümleri | Ana Sayfa",
  description: "Erdem Prefabrik olarak 2003'ten beri prefabrik ev, modüler yapı, konteyner ve çelik yapı çözümleri sunuyoruz. 20+ yıllık deneyim, 1000+ başarılı proje. Kaliteli malzeme, hızlı kurulum, uygun fiyat. Konya merkezli, Türkiye geneli hizmet.",
  keywords: "Erdem Prefabrik, prefabrik ev, modüler yapı, konteyner, çelik yapı, prefabrik villa, tiny house, bungalow, şantiye yapısı, Konya prefabrik, Türkiye prefabrik, 20 yıllık deneyim",
  openGraph: {
    title: "Erdem Prefabrik - 20+ Yıllık Deneyimle Prefabrik Yapı Çözümleri",
    description: "Erdem Prefabrik olarak 2003'ten beri prefabrik ev, modüler yapı, konteyner ve çelik yapı çözümleri sunuyoruz. 20+ yıllık deneyim, 1000+ başarılı proje.",
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
    title: "Erdem Prefabrik - 20+ Yıllık Deneyimle Prefabrik Yapı Çözümleri",
    description: "Erdem Prefabrik olarak 2003'ten beri prefabrik ev, modüler yapı, konteyner ve çelik yapı çözümleri sunuyoruz. 20+ yıllık deneyim, 1000+ başarılı proje.",
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
    canonical: "https://erdemprefabrik.com/"
  }
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
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
