"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Package, Truck } from "lucide-react";

const CategoryCards = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const categories = [
    {
      id: 1,
      title: "Prefabrik",
      description: "Modern Ve Estetik Prefabrik Ev Çözümleri",
      icon: Home,
      image: "/images/projects/1-URUN-GORSELLERI/1-PREFABRIK YAPILAR/DURMUŞ ÜNER 97-M2/a26.jpg",
      href: "/prefabrik-celik",
      color: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Modüler",
      description: "Esnek Ve Özelleştirilebilir Modüler Yapılar",
      icon: Package,
      image:
        "/images/projects/1-URUN-GORSELLERI/6-MODULER/OFIS-SHOWROOM/bilinmeyenm2.JPG",
      href: "/moduler",
      color: "from-green-50 to-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      title: "Konteyner",
      description: "Pratik Ve Mobil Konteyner Çözümleri",
      icon: Truck,
      image:
        "/images/projects/1-URUN-GORSELLERI/3-KONTEYNERLAR/2-OZEL-TASARIM/4X10/1_22 - Foto.jpg",
      href: "/konteyner",
      color: "from-orange-50 to-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section className="py-12 sm:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-foreground font-extralight mb-6">
            Uzmanlık Alanlarımız
          </h2>
          <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">
            Her İhtiyaca Uygun, Kaliteli Ve Estetik Çözümler Sunuyoruz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                className="relative h-80 sm:h-96 bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setHoveredCard(category.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image src={category.image} alt={category.title} fill className="object-cover" />
                </div>

                {/* Centered Text with contained backdrop */}
                <div className={`absolute inset-0 z-10 flex items-end justify-start p-6 transition-opacity ${hoveredCard === category.id ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="inline-block rounded-2xl px-5 py-3 bg-black/45 backdrop-blur-sm">
                    <h3 className="text-2xl font-light text-white mb-1">{category.title}</h3>
                    <p className="text-white/90 text-sm font-light leading-relaxed">{category.description}</p>
                  </div>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 z-20 bg-black/40 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === category.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center text-white">
                    <Button
                      asChild
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-medium rounded-2xl shadow-xl"
                    >
                      <Link href={category.href}>
                        Keşfet
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
