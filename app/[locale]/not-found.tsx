"use client";

import { useTranslations } from "next-intl";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFoundPage");
  const tCommon = useTranslations("common");

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-24 bg-secondary min-h-[calc(100vh-200px)] flex items-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-8xl font-extralight text-accent mb-4">404</h1>
          <h2 className="text-2xl font-light text-foreground mb-4">{t("title")}</h2>
          <p className="text-muted-foreground font-light mb-8">{t("desc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="inline-flex items-center justify-center bg-accent text-white px-8 h-12 rounded-xl font-medium hover:bg-accent/90 transition-colors">
              {tCommon("backToHome")}
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center border border-accent text-accent px-8 h-12 rounded-xl font-medium hover:bg-accent hover:text-white transition-colors">
              {tCommon("contactUs")}
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
