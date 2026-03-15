import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://erdemprefabrik.com"),
  title: {
    default: "Konya Prefabrik | Erdem Prefabrik - Prefabrik Ev, Modüler Yapı, Konteyner",
    template: "%s | Erdem Prefabrik Konya",
  },
  description:
    "Konya prefabrik ev, modüler yapı ve konteyner çözümleri. Erdem Prefabrik 20+ yıldır Konya Karatay merkezli, Türkiye genelinde prefabrik ev, villa ve şantiye yapıları sunuyor. Ücretsiz keşif ve fiyat teklifi.",
  keywords: [
    "Konya prefabrik",
    "Konya prefabrik ev",
    "Erdem Prefabrik",
    "prefabrik ev",
    "modüler ev",
    "konteyner",
    "Karatay prefabrik",
    "çelik yapılar",
    "prefabrik ofis",
  ],
  authors: [{ name: "Erdem Prefabrik", url: "https://erdemprefabrik.com" }],
  alternates: { canonical: "https://erdemprefabrik.com/" },
  openGraph: {
    title: "Konya Prefabrik | Erdem Prefabrik - Prefabrik Ev, Modüler Yapı",
    description:
      "Konya'da prefabrik ev, modüler yapı ve konteyner. Erdem Prefabrik 20+ yıllık deneyim, Konya merkezli Türkiye geneli hizmet.",
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: "Erdem Prefabrik",
    images: [{ url: "/images/Logo.png", width: 1200, height: 630, alt: "Erdem Prefabrik - Konya Prefabrik" }],
  },
  robots: { index: true, follow: true },
  verification: {
    google: "ezUB7b9jWElEM7uQaQ8QWiJsruNsjSPO0c9dwLxL8VA",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
        <body className={`${montserrat.variable} font-montserrat antialiased`}>
        {/* Organization JSON-LD – NAP (name, address, phone) must match Google İşletmem / Business Profile exactly for local SEO. */}
        <Script id="org-jsonld" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Erdem Prefabrik",
            alternateName: "Erdem Prefabrik Konya",
            url: "https://erdemprefabrik.com",
            logo: "https://erdemprefabrik.com/images/Logo.png",
            sameAs: [
              "https://www.instagram.com/prefabrikerdem",
              "https://www.facebook.com/erdemprefabrik",
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "Fetih Mahallesi, Adana Çevreyolu Caddesi No:119 Pk:42030 BP Petrol Karşısı",
              addressLocality: "Karatay",
              addressRegion: "Konya",
              addressCountry: "TR",
            },
            contactPoint: [{
              "@type": "ContactPoint",
              telephone: "+90 332 351 80 60",
              contactType: "customer service",
              areaServed: ["Konya", "TR"],
              availableLanguage: ["tr"],
            }],
          })}
        </Script>
        {children}
      </body>
    </html>
  );
}
