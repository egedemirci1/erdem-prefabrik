"use client";
import type { Metadata } from "next";

import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export default function KullanimKosullariPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-24 bg-secondary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extralight text-foreground mb-3">Kullanım Koşulları</h1>
            <p className="text-sm text-muted-foreground">Son güncelleme: 2025-01-01</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 space-y-8">
            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">1. Kabul</h2>
              <p className="text-muted-foreground font-light">
                Bu Siteye erişerek ve kullanarak, aşağıda belirtilen koşulları ve ilgili tüm
                mevzuatı kabul etmiş olursunuz. Koşulları kabul etmiyorsanız Siteyi kullanmayınız.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">2. Hizmetin Kapsamı</h2>
              <p className="text-muted-foreground font-light">
                Site, Erdem Prefabrik&#39;in ürün ve hizmetlerine ilişkin tanıtım, referans ve iletişim
                kanalıdır. Site içeriği bilgilendirme amaçlıdır; önceden haber verilmeksizin
                güncellenebilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">3. Fikri Mülkiyet</h2>
              <p className="text-muted-foreground font-light">
                Metin, görsel, logo ve tasarımlar dâhil Site içeriğinin tüm hakları Şirkete veya
                lisans verenlerine aittir. Kaynak gösterilse dahi izinsiz kopyalanamaz,
                çoğaltılamaz veya dağıtılamaz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">4. Kullanım Kuralları</h2>
              <ul className="list-disc pl-6 text-muted-foreground font-light space-y-1">
                <li>Siteye zarar verecek, güvenliği tehlikeye atacak işlemler yapmamak,</li>
                <li>Yanlış/eksik bilgi vermemek, üçüncü kişilerin haklarını ihlal etmemek,</li>
                <li>Hukuka aykırı içerik iletmemek ve spam faaliyetinde bulunmamak.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">5. Sorumluluk Reddi</h2>
              <p className="text-muted-foreground font-light">
                Site içeriğinin doğruluğu ve güncelliği için makul özen gösterilmekle birlikte
                hatasız/eksiksiz olacağı garanti edilmez. Site ve bağlantılı hizmetlerin
                kullanımı sonucunda doğabilecek zararlardan Şirket sorumlu tutulamaz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">6. Üçüncü Taraf Bağlantıları</h2>
              <p className="text-muted-foreground font-light">
                Site üzerinden verilen üçüncü taraf bağlantılar bilgilendirme amaçlıdır.
                İçeriklerinden ve güvenliğinden Şirket sorumlu değildir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">7. Değişiklik</h2>
              <p className="text-muted-foreground font-light">
                Şirket, Kullanım Koşulları&#39;nı dilediği zaman değiştirme hakkını saklı tutar.
                Güncel metin Site üzerinde yayımlanır ve yayımlandığı anda yürürlüğe girer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">8. Uygulanacak Hukuk ve Yetki</h2>
              <p className="text-muted-foreground font-light">
                İşbu koşullar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda Konya mahkemeleri
                ve icra daireleri yetkilidir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">9. İletişim</h2>
              <p className="text-muted-foreground font-light">
                Erdem Prefabrik • info@erdemprefabrikev.com • +90 332 351 80 60
              </p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}


