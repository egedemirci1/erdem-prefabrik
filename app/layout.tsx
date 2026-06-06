import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import { routing } from "@/i18n/routing";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://erdemprefabrik.com"),
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

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang={routing.defaultLocale} suppressHydrationWarning>
      <body className={`${montserrat.variable} font-montserrat antialiased`}>
        {children}
      </body>
    </html>
  );
}
