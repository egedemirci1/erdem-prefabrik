"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Clock, Award } from "lucide-react";

const TechnicalFeatures = () => {
  const features = [
    {
      id: 1,
      title: "Malzeme Kalitesi",
      description: "En Yüksek Kalitede Malzemeler Kullanarak Uzun Ömürlü Yapılar İnşa Ediyoruz",
      icon: Award,
      color: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Enerji Verimliliği",
      description: "Modern Yalıtım Teknolojileri İle Enerji Tasarrufu Sağlayan Yapılar",
      icon: Zap,
      color: "from-yellow-50 to-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      id: 3,
      title: "Dayanıklılık",
      description: "Zorlu Hava Koşullarına Karşı Dayanıklı Ve Güvenli Yapılar",
      icon: Shield,
      color: "from-green-50 to-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 4,
      title: "Hızlı Kurulum",
      description: "Modüler Sistem Sayesinde Geleneksel Yapılara Göre Çok Daha Hızlı Kurulum",
      icon: Clock,
      color: "from-orange-50 to-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-foreground font-extralight mb-6">
            Teknik Bilgiler
          </h2>
          <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">
            Yapılarımızın Kalitesini Ve Güvenilirliğini Sağlayan Teknik Özellikler
          </p>
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
                className="relative bg-white rounded-2xl shadow-xl p-8 text-center h-full"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className={`w-10 h-10 ${feature.iconColor}`} />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-light text-foreground mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground font-light leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-light text-foreground mb-4">
              Neden Erdem Prefabrik?
            </h3>
            <p className="text-muted-foreground font-light leading-relaxed text-lg">
              20 Yılı Aşkın Deneyimimiz, Uzman Ekibimiz Ve Kaliteli Malzemelerimiz İle 
              Her Projede Mükemmellik Hedefliyoruz. Müşteri Memnuniyeti Bizim İçin 
              En Önemli Başarı Kriteridir.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalFeatures;
