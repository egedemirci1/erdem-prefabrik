import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | Erdem Prefabrik - Prefabrik Ev Fiyat Teklifi Alın",
  description: "Prefabrik ev, modüler yapı ve konteyner projeleriniz için ücretsiz fiyat teklifi alın. Konya merkezli, Türkiye geneli hizmet. Telefon: +90 332 351 80 60",
  keywords: "prefabrik ev fiyat, prefabrik ev teklifi, modüler yapı fiyat, konteyner fiyat, prefabrik iletişim, Konya prefabrik, ücretsiz keşif",
  openGraph: {
    title: "İletişim | Erdem Prefabrik",
    description: "Prefabrik ev, modüler yapı ve konteyner projeleriniz için ücretsiz fiyat teklifi alın. Konya merkezli, Türkiye geneli hizmet.",
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
    canonical: "https://erdemprefabrik.com/iletisim"
  }
};
import ContactForm from "@/components/site/ContactForm";
import { Instagram, Facebook, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function IletisimPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extralight text-foreground mb-4">İletişim</h1>
            <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">
              İhtiyacınıza Uygun Çözümler Sunuyoruz
            </p>
            <div className="mt-4 h-px w-96 mx-auto bg-muted-foreground/80" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Info list */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-white shadow flex items-center justify-center mr-4">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-foreground mb-2">Adres</h3>
                    <p className="text-muted-foreground font-light leading-relaxed">
                      Fetih Mahallesi, Adana Çevreyolu Caddesi No:119 Pk:42030 BP Petrol Karşısı, Karatay / KONYA
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-white shadow flex items-center justify-center mr-4">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-foreground mb-2">Telefon</h3>
                    <p className="text-muted-foreground font-light">+90 332 351 80 60</p>
                    <p className="text-muted-foreground font-light">+90 533 379 25 88 • +90 533 380 25 88</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-white shadow flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-foreground mb-2">E‑posta</h3>
                    <a href="mailto:info@erdemprefabrikev.com" className="text-accent hover:underline font-light">info@erdemprefabrikev.com</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-white shadow flex items-center justify-center mr-4">
                    <Instagram className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-foreground mb-2">Instagram</h3>
                    <a
                      href="https://www.instagram.com/prefabrikerdem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                    >
                      <Instagram className="w-4 h-4" />
                      <span className="text-sm font-medium">Instagram&#39;da Takip Et</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-white shadow flex items-center justify-center mr-4">
                    <Facebook className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-foreground mb-2">Facebook</h3>
                    <a
                      href="https://www.facebook.com/erdemprefabrik"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
                    >
                      <Facebook className="w-4 h-4" />
                      <span className="text-sm font-medium">Facebook&#39;ta Takip Et</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-white shadow flex items-center justify-center mr-4">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-foreground mb-2">Çalışma Saatleri</h3>
                    <p className="text-muted-foreground font-light">Pazartesi - Cuma: 08:00 - 18:00</p>
                    <p className="text-muted-foreground font-light">Cumartesi: 09:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form card */}
            <div className="space-y-6">
              <ContactForm />
            </div>
          </div>

          {/* Map */}
          <div className="mt-16">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
              <iframe
                title="Erdem Prefabrik Konum"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Fetih%20Mahallesi%2C%20Adana%20%C3%87evreyolu%20Caddesi%20No%3A119%2C%20Karatay%2FKonya&output=embed"
              />
            </div>
            <div className="mt-4 text-center">
              <a
                href="https://maps.app.goo.gl/pA2wcuhfdE3q6M729"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Google Haritalar&#39;da Aç
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

