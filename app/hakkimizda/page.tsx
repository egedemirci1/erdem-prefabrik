import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import AboutTabs from "@/components/site/AboutTabs";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | Erdem Prefabrik - 20+ Yıllık Deneyimle Prefabrik Yapı Çözümleri",
  description: "2003'ten beri prefabrik yapı sektöründe hizmet veren Erdem Prefabrik. 20+ yıllık deneyim, 1000+ başarılı proje, kaliteli malzeme ve güvenilir hizmet anlayışımızla müşterilerimizin hayallerini gerçeğe dönüştürüyoruz.",
  keywords: "Erdem Prefabrik hakkında, prefabrik yapı deneyimi, 20 yıllık deneyim, prefabrik şirket, modüler yapı uzmanı, Konya prefabrik firması, güvenilir prefabrik",
  openGraph: {
    title: "Hakkımızda | Erdem Prefabrik",
    description: "2003'ten beri prefabrik yapı sektöründe hizmet veren Erdem Prefabrik. 20+ yıllık deneyim, 1000+ başarılı proje ile güvenilir hizmet.",
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
    canonical: "https://erdemprefabrik.com/hakkimizda"
  }
};

export default function HakkimizdaPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-24 bg-secondary min-h-[calc(100vh-200px)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extralight text-foreground mb-6">
              Hakkımızda
            </h1>
            <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">
              Prefabrik Yapı Sektöründe Kalite Ve Güvenin Doğru Adresi
            </p>
            <div className="mt-4 h-px w-96 mx-auto bg-muted-foreground/80" />
          </div>
          
          {/* Tabs area */}
          <div className="mt-6 sm:mt-10">
            <AboutTabs />
          </div>

          {/* CTA outside the grey box */}
          <div className="mt-6 sm:mt-8 mx-auto w-full max-w-4xl px-4">
            <div className="bg-accent text-white rounded-2xl px-4 sm:px-6 py-4 sm:py-6 flex flex-col md:flex-row md:items-center md:justify-between shadow-xl">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <div className="text-lg sm:text-xl font-bold">Projenizi Birlikte Planlayalım</div>
                <div className="text-white/90 text-xs sm:text-sm">Sorularınız İçin Hemen İletişim Sayfasına Geçebilirsiniz.</div>
              </div>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center bg-white text-accent px-4 sm:px-6 h-10 sm:h-12 rounded-xl font-medium hover:bg-white/90 transition-colors text-sm sm:text-base"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
