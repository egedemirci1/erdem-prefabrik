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

## 📄 Lisans

Bu proje Erdem Prefabrik'e aittir.

## 📞 İletişim

- **Website**: [erdemprefabrik.com](https://erdemprefabrik.com)
- **E-posta**: info@erdemprefabrik.com
- **Telefon**: +90 (212) 555 0123
