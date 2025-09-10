"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<{
    title: string;
    subtitle: string;
    image?: string;
  }[]>([
    {
      title: "Zerafetin Modüler Hali",
      subtitle: "Modern Yaşamın İhtiyaçlarına Uygun Ve Estetik Çözümler Sunuyoruz.",
      image:
        "/images/projects/1-URUN-GORSELLERI/6-MODULER/EVLER/bungalow1/bilinmeyenm2.JPG",
    },
    {
      title: "Kaliteli Malzeme",
      subtitle: "Dayanıklı Ve Uzun Ömürlü Yapılar İçin 1. Kalite Malzeme Kullanıyoruz.",
      image:
        "/images/projects/1-URUN-GORSELLERI/2-HAFIF-CELIK YAPILAR/1-EVLER/casa erdem/2_Photo - 10.jpg",
    },
    {
      title: "Hızlı Kurulum",
      subtitle: "Zaman Tasarrufu Sağlayan Modüler Yapı Sistemleri Oluşturuyoruz.",
      image:
        "/images/projects/1-URUN-GORSELLERI/5-ŞANTIYE VE OZEL KULLANIM/OTOBÜS HAREKAT/IMG_20211225_150836.jpg",
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    // Arka plan için farklı kategorilerden kapak görsellerini topla
    (async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        const list: { category?: string; image?: string }[] = data.projects ?? [];
        // Prefabrik, Modüler, Konteyner gibi farklı kategorilerden ilk görselleri seçelim
        const pick = (cat: string) => list.find((p) => p.category === cat)?.image as string | undefined;
        const heroImages = [pick("prefabrik"), pick("moduler"), pick("konteyner")].filter(Boolean) as string[];
        if (heroImages.length) {
          setSlides((prev) => prev.map((s, i) => ({ ...s, image: s.image || heroImages[i % heroImages.length] })));
        }
      } catch {}
    })();
  }, []);

  return (
    <section className="relative h-screen pt-20 w-full overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {slides[currentSlide]?.image ? (
            <div className="absolute inset-0">
              <Image
                src={slides[currentSlide].image as string}
                alt={slides[currentSlide].title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background">
              <div className="absolute inset-0 bg-black/20" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            key={`text-${currentSlide}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <h1 className="text-white font-extralight tracking-tight">
              {slides[currentSlide].title}
            </h1>
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed"
            >
              {slides[currentSlide].subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg font-medium rounded-2xl shadow- xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Link href="/projeler">
                  Tüm Projelerimiz
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button
                asChild
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 px-8 py-6 text-lg font-medium rounded-2xl shadow-md"
              >
                <Link href="/iletisim">
                  <Mail className="mr-2 h-5 w-5" />
                  İletişime Geç
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators (above mouse icon) */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator (centered) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
