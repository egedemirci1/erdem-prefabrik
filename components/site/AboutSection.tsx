"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, Users, Award, Clock, MapPin } from "lucide-react";
import Link from "next/link";

const AboutSection = () => {
  const stats = [
    {
      id: 1,
      number: "1000+",
      label: "Tamamlanan Proje",
      icon: Award,
    },
    {
      id: 2,
      number: "20+",
      label: "Yıllık Deneyim",
      icon: Clock,
    },
    {
      id: 3,
      number: "50+",
      label: "Uzman Ekip",
      icon: Users,
    },
    {
      id: 4,
      number: "15+",
      label: "Şehirde Hizmet",
      icon: MapPin,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-foreground font-extralight mb-6 text-center lg:text-left">
                Hakkımızda
              </h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed mb-6">
                Erdem Prefabrik olarak, 2003 yılından bu yana prefabrik yapı sektöründe 
                faaliyet gösteriyoruz. Modern yaşamın ihtiyaçlarına uygun, kaliteli ve 
                estetik çözümler üretiyoruz.
              </p>
              
              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                Deneyimli ekibimiz, en son teknolojileri kullanarak müşterilerimizin 
                hayallerindeki yaşam alanlarını gerçeğe dönüştürüyor. Kalite, güvenilirlik 
                ve müşteri memnuniyeti bizim için en önemli değerlerdir.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-secondary flex items-center justify-center">
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                  </div>
                  <div className="text-3xl font-light text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-light">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-medium rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Link href="/hakkimizda">
                  Daha Fazla Bilgi
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[400px] sm:h-[600px] rounded-2xl shadow-xl overflow-hidden">
              <Image src="/images/slider-2.jpg" alt="Erdem Prefabrik Yapı Alanı" fill sizes="(max-width: 1024px) 100vw, 50vw" loading="lazy" className="object-cover" />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl p-4 sm:p-6 max-w-xs"
            >
              <h3 className="text-lg font-light text-foreground mb-2">
                Müşteri Memnuniyeti
              </h3>
              <p className="text-sm text-muted-foreground font-light">
                %98 müşteri memnuniyet oranı ile sektörde öncü konumdayız.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
