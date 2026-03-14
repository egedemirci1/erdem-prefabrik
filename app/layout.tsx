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
  title: "Erdem Prefabrik - Zerafetin Modüler Hali",
  description:
    "Erdem Prefabrik olarak prefabrik ev, modüler yapılar ve konteyner çözümleri sunuyoruz. Kaliteli malzeme, enerji verimliliği ve hızlı kurulum.",
  keywords: [
    "prefabrik ev",
    "modüler ev",
    "konteyner",
    "çelik yapılar",
    "prefabrik ofis",
  ],
  authors: [{ name: "Erdem Prefabrik" }],
  alternates: { canonical: "https://erdemprefabrik.com/" },
  openGraph: {
    title: "Erdem Prefabrik - Zerafetin Modüler Hali",
    description:
      "Kaliteli prefabrik ev, modüler yapılar ve konteyner çözümleri",
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: "Erdem Prefabrik",
    images: [{ url: "/images/Logo.png", width: 1200, height: 630, alt: "Erdem Prefabrik" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
      </head>
        <body className={`${montserrat.variable} font-montserrat antialiased`}>
        {/* Organization JSON-LD */}
        <Script id="org-jsonld" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Erdem Prefabrik",
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
              areaServed: "TR",
              availableLanguage: ["tr"],
            }],
          })}
        </Script>
        {children}
      </body>
    </html>
  );
}
