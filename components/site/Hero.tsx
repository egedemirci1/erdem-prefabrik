"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getOptimizedImagePath } from "@/lib/optimized-image";

const slides = [
  {
    title: "Zerafetin Modüler Hali",
    subtitle: "Modern Yaşamın İhtiyaçlarına Uygun Ve Estetik Çözümler Sunuyoruz.",
    image: "/images/projects/1-URUN-GORSELLERI/6-MODULER/bungalow1/bilinmeyenm2.JPG",
  },
  {
    title: "Kaliteli Malzeme",
    subtitle: "Dayanıklı Ve Uzun Ömürlü Yapılar İçin 1. Kalite Malzeme Kullanıyoruz.",
    image: "/images/projects/1-URUN-GORSELLERI/2-HAFIF-CELIK YAPILAR/casa erdem/2_Photo - 10.jpg",
  },
  {
    title: "Hızlı Kurulum",
    subtitle: "Zaman Tasarrufu Sağlayan Modüler Yapı Sistemleri Oluşturuyoruz.",
    image: "/images/projects/1-URUN-GORSELLERI/6-MODULER/bungalow5/2_Photo - 1.jpg",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen pt-20 w-full overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
            }`}
            aria-hidden={index !== currentSlide}
          >
            {slide.image ? (
              <div className="absolute inset-0">
                <Image
                  src={getOptimizedImagePath(slide.image)}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <div className="absolute inset-0 bg-black/60" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background">
                <div className="absolute inset-0 bg-black/20" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div key={currentSlide} className="space-y-8">
            <h2 className="text-white font-extralight tracking-tight">
              {slides[currentSlide].title}
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xs mx-auto sm:max-w-none">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg font-medium rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <Link href="/projeler">
                  Tüm Projelerimiz
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 px-8 py-6 text-lg font-medium rounded-2xl shadow-md w-full sm:w-auto"
              >
                <Link href="/iletisim">
                  <Mail className="mr-2 h-5 w-5" />
                  İletişime Geç
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 sm:bottom-20 left-1/2 -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slayt ${index + 1}: ${slides[index].title}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center animate-bounce">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
