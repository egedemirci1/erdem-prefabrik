import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Breadcrumb from "@/components/site/Breadcrumb";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Erdem Prefabrik",
  description: "Erdem Prefabrik gizlilik politikası. Kişisel verilerin korunması, KVKK uyumu, çerez politikası ve veri işleme süreçleri hakkında bilgiler.",
  openGraph: {
    title: "Gizlilik Politikası | Erdem Prefabrik",
    description: "Kişisel verilerin korunması, KVKK uyumu ve çerez politikası hakkında bilgiler.",
    type: "website",
    locale: "tr_TR",
    siteName: "Erdem Prefabrik",
    images: [{ url: "/images/Logo.png", width: 1200, height: 630, alt: "Erdem Prefabrik" }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://erdemprefabrik.com/gizlilik/" },
};

export default function GizlilikPolitikasiPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-24 bg-secondary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { name: "Ana Sayfa", href: "/" },
            { name: "Gizlilik Politikası", href: "/gizlilik" },
          ]} />
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extralight text-foreground mb-3">Gizlilik Politikası</h1>
            <p className="text-sm text-muted-foreground">Son güncelleme: 2025-01-01</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 space-y-8">
            <p className="text-muted-foreground font-light">
              Bu Gizlilik Politikası, Erdem Prefabrik (&quot;Şirket&quot;) tarafından işletilen web sitesini
              (&quot;Site&quot;) ziyaret ettiğinizde ve iletişim formlarını kullandığınızda kişisel
              verilerinizin nasıl işlendiğini açıklar. Kişisel verilerinizin güvenliğine önem
              veriyor, mevzuata (KVKK ve ilgili ikincil düzenlemeler) uygun hareket ediyoruz.
            </p>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">1. Toplanan Veriler</h2>
              <p className="text-muted-foreground font-light">
                Site üzerinden; ad-soyad, telefon, e‑posta ve mesaj içeriği gibi iletişim verileri;
                çerezler aracılığıyla IP adresi, tarayıcı bilgisi ve kullanım verileri işlenebilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">2. İşleme Amaçları</h2>
              <ul className="list-disc pl-6 text-muted-foreground font-light space-y-1">
                <li>Talep ve sorularınıza cevap verebilmek, tekliflendirme yapmak,</li>
                <li>Hizmetlerimizi geliştirmek ve Site deneyimini iyileştirmek,</li>
                <li>Mevzuattan kaynaklanan yükümlülüklerimizi yerine getirmek.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">3. Hukuki Sebepler</h2>
              <p className="text-muted-foreground font-light">
                Veriler; bir sözleşmenin kurulması/ifası, meşru menfaatlerimiz veya açık rızanız
                kapsamında işlenebilir (KVKK md. 5). Ziyaret verileri, çerez tercihleriniz
                doğrultusunda toplanır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">4. Aktarım</h2>
              <p className="text-muted-foreground font-light">
                Zorunlu olması hâlinde tedarikçilerimiz ve barındırma/altyapı sağlayıcılarıyla,
                mevzuat gereği yetkili kurumlarla paylaşılabilir. Yurt dışına aktarım söz konusu
                olduğunda KVKK md. 9 hükümlerine uyulur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">5. Saklama Süreleri</h2>
              <p className="text-muted-foreground font-light">
                İletişim kayıtları makul bir süre boyunca veya yasal zamanaşımı süresi
                boyunca saklanır; amaç ortadan kalktığında güvenli şekilde silinir/anonomize edilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">6. Haklarınız</h2>
              <p className="text-muted-foreground font-light">
                KVKK md. 11 uyarınca veri sahibi olarak; kişisel verilerinize erişme,
                düzeltilmesini/silinmesini isteme, işleme faaliyetini kısıtlama ve itiraz etme
                haklarına sahipsiniz. Taleplerinizi aşağıdaki iletişim bilgilerinden iletebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">7. Çerezler</h2>
              <p className="text-muted-foreground font-light">
                Site, zorunlu çerezler ve performans/analitik çerezler kullanabilir. Tarayıcı
                ayarlarınızdan çerez tercihlerinizi yönetebilirsiniz. Çerezlerin devre dışı
                bırakılması bazı işlevlerin kısıtlanmasına neden olabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-2">8. İletişim</h2>
              <p className="text-muted-foreground font-light">
                Erdem Prefabrik – Fetih Mahallesi, Adana Çevreyolu Caddesi No:119 Pk:42030 BP Petrol
                Karşısı, Karatay / KONYA • E‑posta: info@erdemprefabrikev.com • Telefon: +90 332 351 80 60
              </p>
            </section>

            <p className="text-xs text-muted-foreground">
              Bu politika, gerektiğinde güncellenebilir. Güncel sürüm Site üzerinde yayımlandığı
              tarihten itibaren geçerlidir.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}



