"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Package, Truck } from "lucide-react";
import { getOptimizedImagePath } from "@/lib/optimized-image";
import { Link } from "@/i18n/navigation";

const CategoryCards = () => {
  const t = useTranslations("categoryCards");
  const tCommon = useTranslations("common");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const categories = [
    {
      id: 1,
      title: t("prefab"),
      description: t("prefabDesc"),
      icon: Home,
      image: "/images/projects/1-URUN-GORSELLERI/1-PREFABRIK YAPILAR/DURMUŞ ÜNER 97-M2/a26.jpg",
      href: "/prefab-steel" as const,
    },
    {
      id: 2,
      title: t("modular"),
      description: t("modularDesc"),
      icon: Package,
      image: "/images/projects/1-URUN-GORSELLERI/6-MODULER/OFIS-SHOWROOM/bilinmeyenm2.JPG",
      href: "/modular" as const,
    },
    {
      id: 3,
      title: t("container"),
      description: t("containerDesc"),
      icon: Truck,
      image: "/images/projects/1-URUN-GORSELLERI/3-KONTEYNERLAR/2-OZEL-TASARIM/4X10/1_22 - Foto.jpg",
      href: "/container" as const,
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
          <h2 className="text-foreground font-extralight mb-6">{t("title")}</h2>
          <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">{t("subtitle")}</p>
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
                <div className="absolute inset-0">
                  <Image
                    src={getOptimizedImagePath(category.image)}
                    alt={category.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div
                  className={`absolute inset-0 z-10 flex items-end justify-start p-6 transition-opacity ${hoveredCard === category.id ? "opacity-0" : "opacity-100"}`}
                >
                  <div className="inline-block rounded-2xl px-5 py-3 bg-black/45 backdrop-blur-sm">
                    <h3 className="text-2xl font-light text-white mb-1">{category.title}</h3>
                    <p className="text-white/90 text-sm font-light leading-relaxed">{category.description}</p>
                  </div>
                </div>

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
                        {tCommon("explore")}
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
