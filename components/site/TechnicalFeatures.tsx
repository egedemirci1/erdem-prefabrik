"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Shield, Zap, Clock, Award } from "lucide-react";

const TechnicalFeatures = () => {
  const t = useTranslations("technical");

  const features = [
    { id: 1, title: t("materialTitle"), description: t("materialDesc"), icon: Award, color: "from-blue-50 to-blue-100", iconColor: "text-blue-600" },
    { id: 2, title: t("energyTitle"), description: t("energyDesc"), icon: Zap, color: "from-yellow-50 to-yellow-100", iconColor: "text-yellow-600" },
    { id: 3, title: t("durabilityTitle"), description: t("durabilityDesc"), icon: Shield, color: "from-green-50 to-green-100", iconColor: "text-green-600" },
    { id: 4, title: t("speedTitle"), description: t("speedDesc"), icon: Clock, color: "from-orange-50 to-orange-100", iconColor: "text-orange-600" },
  ];

  return (
    <section className="py-24 bg-secondary">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center h-full"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${feature.iconColor}`} />
                </motion.div>
                <h3 className="text-xl font-light text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{feature.description}</p>
                <motion.div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-light text-foreground mb-4">{t("whyTitle")}</h3>
            <p className="text-muted-foreground font-light leading-relaxed text-lg">{t("whyDesc")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalFeatures;
