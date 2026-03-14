import { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Footer from "@/components/site/Footer";

const CategoryCards = dynamic(() => import("@/components/site/CategoryCards"), { ssr: true });
const PortfolioGrid = dynamic(() => import("@/components/site/PortfolioGrid"), { ssr: true });
const TechnicalFeatures = dynamic(() => import("@/components/site/TechnicalFeatures"), { ssr: true });
const AboutSection = dynamic(() => import("@/components/site/AboutSection"), { ssr: true });

export const metadata: Metadata = {
  title: "Konya Prefabrik | Erdem Prefabrik - Prefabrik Ev, Modüler Yapı, Konteyner Fiyat",
  description: "Konya prefabrik ev, modüler yapı ve konteyner. Erdem Prefabrik 2003'ten beri Konya Karatay merkezli prefabrik ev, villa, şantiye yapısı sunuyor. 20+ yıl deneyim, 1000+ proje. Ücretsiz keşif: 0332 351 80 60.",
  keywords: "Konya prefabrik, Konya prefabrik ev, Erdem Prefabrik, Karatay prefabrik, prefabrik ev, modüler yapı, konteyner, çelik yapı, prefabrik villa, Konya prefabrik fiyat, Türkiye prefabrik",
  openGraph: {
    title: "Konya Prefabrik | Erdem Prefabrik - Prefabrik Ev, Modüler Yapı",
    description: "Konya'da prefabrik ev, modüler yapı ve konteyner. Erdem Prefabrik 20+ yıllık deneyim, Konya merkezli Türkiye geneli hizmet.",
    type: "website",
    locale: "tr_TR",
    siteName: "Erdem Prefabrik",
    images: [
      {
        url: "/images/Logo.png",
        width: 1200,
        height: 630,
        alt: "Erdem Prefabrik - Konya Prefabrik"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Konya Prefabrik | Erdem Prefabrik - Prefabrik Ev, Modüler Yapı",
    description: "Konya'da prefabrik ev, modüler yapı ve konteyner. Erdem Prefabrik 20+ yıl deneyim.",
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
      <Script id="local-business-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Erdem Prefabrik",
          alternateName: "Erdem Prefabrik Konya",
          description: "Konya prefabrik ev, modüler yapı ve konteyner. 20+ yıllık deneyim, Konya Karatay merkezli Türkiye geneli hizmet.",
          url: "https://erdemprefabrik.com",
          telephone: "+90 332 351 80 60",
          email: "info@erdemprefabrikev.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Fetih Mahallesi, Adana Çevreyolu Caddesi No:119 Pk:42030 BP Petrol Karşısı",
            addressLocality: "Karatay",
            addressRegion: "Konya",
            addressCountry: "TR",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 37.8746,
            longitude: 32.4932,
          },
          areaServed: [
            { "@type": "City", name: "Konya" },
            { "@type": "Country", name: "Türkiye" },
          ],
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
          ],
        })}
      </Script>
      <Header />
      {/* SEO: Sayfada tek, sabit ve anahtar kelime zengin H1 */}
      <section className="bg-foreground text-background py-4 sm:py-5 text-center" aria-label="Ana başlık">
        <h1 className="text-2xl sm:text-3xl font-extralight tracking-tight max-w-4xl mx-auto px-4">
          Konya Prefabrik | Erdem Prefabrik
        </h1>
      </section>
      <Hero />
      {/* SEO: Konya prefabrik anahtar kelimesi sayfa içinde görünür olsun */}
      <section className="bg-background py-8 text-center" aria-label="Konya prefabrik hizmet bölgesi">
        <p className="text-muted-foreground font-light max-w-3xl mx-auto px-4">
          <strong className="text-foreground">Konya prefabrik</strong> ve Türkiye genelinde prefabrik ev, modüler yapı, konteyner ve çelik yapı çözümleri sunuyoruz. Konya Karatay merkezli Erdem Prefabrik olarak 20+ yıldır hizmetinizdeyiz.
        </p>
      </section>
      {/* SEO: En çok aranan kelimeler – Konya prefabrik ev fiyatları, firmalar */}
      <section className="bg-secondary py-12 px-4" aria-label="Konya prefabrik ev fiyatları ve hizmetler">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extralight text-foreground mb-6">
            Konya Prefabrik Ev Fiyatları ve Hizmetlerimiz
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed mb-4">
            <strong className="text-foreground">Konya prefabrik ev fiyatları</strong> proje özelliğine ve metrekareye göre değişir. <strong className="text-foreground">Konya prefabrik ev yapan firmalar</strong> arasında Erdem Prefabrik olarak Karatay merkezli, 20+ yıllık deneyimle 1+1, 2+1, 3+1 prefabrik ev, modüler yapı ve konteyner çözümleri sunuyoruz. <strong className="text-foreground">Karatay prefabrik</strong> ve Konya genelinde ücretsiz keşif ve fiyat teklifi için iletişime geçebilirsiniz.
          </p>
        </div>
      </section>
      <CategoryCards />
      <PortfolioGrid />
      <TechnicalFeatures />
      <AboutSection />
      {/* SEO: SSS bölümü ve FAQ schema */}
      <section className="bg-background py-16 px-4" aria-label="Sıkça sorulan sorular">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extralight text-foreground mb-10 text-center">
            Konya Prefabrik Hakkında Sıkça Sorulan Sorular
          </h2>
          <dl className="space-y-8">
            <div>
              <dt className="text-lg font-medium text-foreground mb-2">Konya&apos;da prefabrik ev fiyatları ne kadar?</dt>
              <dd className="text-muted-foreground font-light leading-relaxed">
                Konya prefabrik ev fiyatları metrekare, model (1+1, 2+1, 3+1) ve kullanılan malzemeye göre değişir. Ücretsiz keşif sonrası size özel fiyat teklifi sunuyoruz. 0332 351 80 60 numarasından bize ulaşabilirsiniz.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-medium text-foreground mb-2">Konya prefabrik ev yapan firmalar arasında Erdem Prefabrik&apos;in farkı nedir?</dt>
              <dd className="text-muted-foreground font-light leading-relaxed">
                Erdem Prefabrik 2003&apos;ten beri Konya Karatay merkezli olarak prefabrik ev, modüler yapı ve konteyner üretiyor. 20+ yıllık deneyim, 1000+ tamamlanan proje ve kaliteli malzeme kullanımıyla Konya ve Türkiye genelinde hizmet veriyoruz.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-medium text-foreground mb-2">Prefabrik ev kurulum süresi ne kadar?</dt>
              <dd className="text-muted-foreground font-light leading-relaxed">
                Proje büyüklüğüne göre prefabrik ev kurulumu genellikle birkaç hafta ile birkaç ay arasında tamamlanır. Modüler ve konteyner çözümlerimizde hızlı kurulum süreleri sunuyoruz.
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Konya'da prefabrik ev fiyatları ne kadar?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Konya prefabrik ev fiyatları metrekare, model (1+1, 2+1, 3+1) ve kullanılan malzemeye göre değişir. Ücretsiz keşif sonrası size özel fiyat teklifi sunuyoruz. 0332 351 80 60 numarasından bize ulaşabilirsiniz.",
              },
            },
            {
              "@type": "Question",
              name: "Konya prefabrik ev yapan firmalar arasında Erdem Prefabrik'in farkı nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Erdem Prefabrik 2003'ten beri Konya Karatay merkezli olarak prefabrik ev, modüler yapı ve konteyner üretiyor. 20+ yıllık deneyim, 1000+ tamamlanan proje ve kaliteli malzeme kullanımıyla Konya ve Türkiye genelinde hizmet veriyoruz.",
              },
            },
            {
              "@type": "Question",
              name: "Prefabrik ev kurulum süresi ne kadar?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Proje büyüklüğüne göre prefabrik ev kurulumu genellikle birkaç hafta ile birkaç ay arasında tamamlanır. Modüler ve konteyner çözümlerimizde hızlı kurulum süreleri sunuyoruz.",
              },
            },
          ],
        })}
      </Script>
      <Footer />
    </main>
  );
}
