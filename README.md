# Erdem Prefabrik - Zerafetin Modüler Hali

Modern prefabrik yapı çözümleri sunan Erdem Prefabrik'in resmi web sitesi.

## 🏗️ Proje Hakkında

Bu proje, Erdem Prefabrik'in prefabrik ev, modüler yapılar ve konteyner çözümlerini tanıtan modern bir web sitesidir. Next.js 15, React 19 ve Tailwind CSS kullanılarak geliştirilmiştir.

## ✨ Özellikler

- **Ana Sayfa**: Hero section, kategori kartları, portföy grid'i, teknik özellikler
- **Prefabrik & Çelik**: Çelik ev, villa, ofis ve şantiye yapıları
- **Modüler Yapılar**: Modüler ev, bungalow, tiny house ve ofis çözümleri
- **Konteyner**: Ev, ofis, güvenlik kulübesi ve WC & duş kabini
- **Hakkımızda**: Şirket misyonu, vizyonu ve değerleri
- **İletişim**: İletişim formu ve bilgileri

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18.x veya üzeri
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone [repository-url]
cd erdem-prefabrik
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

4. **Tarayıcıda açın**
```
http://localhost:3000
```

## 📁 Proje Yapısı

```
erdem-prefabrik/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Ana sayfa
│   ├── layout.tsx         # Root layout
│   ├── prefabrik-celik/   # Prefabrik & çelik sayfaları
│   ├── moduler/           # Modüler yapı sayfaları
│   ├── konteyner/         # Konteyner sayfaları
│   ├── hakkimizda/        # Hakkımızda sayfası
│   └── iletisim/          # İletişim sayfası
├── components/             # React bileşenleri
│   ├── site/              # Site bileşenleri
│   └── ui/                # UI bileşenleri
├── lib/                    # Yardımcı fonksiyonlar
└── public/                 # Statik dosyalar
```

## 🛠️ Teknolojiler

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **UI Components**: Radix UI, Lucide React
- **Form Handling**: React Hook Form, Zod
- **Development**: ESLint, Prettier

## 📱 Responsive Tasarım

Site tüm cihazlarda (mobil, tablet, desktop) optimize edilmiştir ve modern UX/UI prensiplerini takip eder.

## 🚀 Production Build

```bash
npm run build
npm run start
```

## Yerel SEO (NAP / Google İşletmem)

Arama sonuçlarında hem harita hem web sitesinin güçlü çıkması için sitedeki NAP (Name, Address, Phone) bilgileri ile **Google İşletmem (Google Business Profile)** kaydı bire bir aynı olmalı. Periyodik kontrol listesi:

- **İşletme adı:** Sitede "Erdem Prefabrik" / "Erdem Prefabrik Konya" kullanılıyor; GBP’de aynı isim olmalı.
- **Adres:** Fetih Mahallesi, Adana Çevreyolu Caddesi No:119 Pk:42030 BP Petrol Karşısı, Karatay / KONYA — GBP adresi kelime kelime aynı yazılmalı.
- **Telefon:** +90 332 351 80 60 (ve varsa ikinci numara) — GBP’de aynı numara(lar) görünmeli.
- **Web sitesi:** Canonical adres (https://erdemprefabrik.com) GBP’de "Web sitesi" alanına yazılmalı.

Bu tutarlılık, "Konya erdem prefabrik" gibi aramalarda harita paneli ile organik sonuçların birlikte güçlenmesine yardımcı olur.

## Google Search Console – "Ben Buradayım" Demek

Google'ın sitenizi hemen bulması için Search Console üzerinden siteyi tanıtın. Kendi kendine bulmasını beklersen haftalar sürebilir.

### 1. Hesap aç ve siteyi ekle

1. [Google Search Console](https://search.google.com/search-console) sayfasına gidin.
2. **Mülk ekle** (veya "Add property") ile sitenin domain'ini ekleyin:
   - **Alan adı (Domain):** `erdemprefabrik.com` — tüm alt alan adları (www, vb.) dahil edilir.
   - Veya **URL öneki:** Tam adresiniz neyse (örn. `https://www.erdemprefabrikev.com` veya Vercel linki) onu girin.
3. Sahipliği doğrulayın (DNS TXT kaydı veya HTML dosyası / meta etiket — ekrandaki talimatları izleyin).

### 2. Site haritasını gönder

1. Sol menüden **Site haritaları** (Sitemaps) sekmesine girin.
2. **Yeni site haritası ekle** alanına şunu yazın:  
   `sitemap.xml`  
   (Tam URL: `https://erdemprefabrik.com/sitemap.xml` — canlı domain'iniz neyse o geçerli.)
3. **Gönder** (Submit) butonuna tıklayın.  
   Sitemap, projede `pnpm run build` sonrası `postbuild` ile otomatik üretilir; canlı sitede `/sitemap.xml` adresi çalışıyor olmalı.

### 3. Ana sayfayı hemen tarat

1. Search Console üstündeki **URL denetleme** (URL Inspection) arama çubuğuna sitenin ana sayfa URL'sini yapıştırın (örn. `https://erdemprefabrik.com/` veya `https://www.erdemprefabrikev.com/`).
2. Enter'a basın.
3. **Dizine eklenmesini iste** (Request Indexing) butonuna tıklayın.  
   Bu işlem Google botlarını sitenize kısa süre içinde gönderir; sonuçlar birkaç gün içinde görülebilir.

Bu üç adım, "Konya prefabrik" gibi aramalarda sitenin daha hızlı listelenmesine yardımcı olur.

## 📄 Lisans

Bu proje Erdem Prefabrik'e aittir.

## 📞 İletişim

- **Website**: [erdemprefabrik.com](https://erdemprefabrik.com)
- **E-posta**: info@erdemprefabrik.com
- **Telefon**: +90 (212) 555 0123
