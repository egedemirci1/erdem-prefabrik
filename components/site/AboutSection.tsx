"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, Users, Award, Clock, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";

const AboutSection = () => {
  const t = useTranslations("aboutSection");
  const tCommon = useTranslations("common");

  const stats = [
    { id: 1, number: "1000+", label: t("completedProjects"), icon: Award },
    { id: 2, number: "20+", label: t("yearsExperience"), icon: Clock },
    { id: 3, number: "50+", label: t("expertTeam"), icon: Users },
    { id: 4, number: "15+", label: t("citiesServed"), icon: MapPin },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-foreground font-extralight mb-6 text-center lg:text-left">{t("title")}</h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed mb-6">{t("p1")}</p>
              <p className="text-muted-foreground font-light leading-relaxed mb-8">{t("p2")}</p>
            </div>

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
                  <div className="text-3xl font-light text-foreground mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground font-light">{stat.label}</div>
                </motion.div>
              ))}
            </div>

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
                <Link href="/about">
                  {tCommon("moreInfo")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[400px] sm:h-[600px] rounded-2xl shadow-xl overflow-hidden">
              <Image
                src="/images/slider-2.jpg"
                alt={t("imageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl p-4 sm:p-6 max-w-xs"
            >
              <h3 className="text-lg font-light text-foreground mb-2">{t("satisfactionTitle")}</h3>
              <p className="text-sm text-muted-foreground font-light">{t("satisfactionDesc")}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
