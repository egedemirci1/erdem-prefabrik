"use client";

import { useState } from "react";
import { Rocket, Eye, BookOpen, CheckCircle } from "lucide-react";

const AboutTabs = () => {
  const [active, setActive] = useState<"mission" | "vision" | "story">("mission");

  const tabs = [
    {
      id: "mission",
      title: "Misyonumuz",
      icon: Rocket,
      content: "Modern Yaşamın İhtiyaçlarına Uygun, Kaliteli Ve Estetik Prefabrik Yapı Çözümleri Sunarak Müşterilerimizin Hayallerindeki Yaşam Alanlarını Gerçeğe Dönüştürüyoruz. Teknoloji Ve Zanaati Birleştirerek Dayanıklı, Hızlı Ve Ekonomik Yapılar Üretiyoruz."
    },
    {
      id: "vision", 
      title: "Vizyonumuz",
      icon: Eye,
      content: "Prefabrik Yapı Sektöründe Öncü Ve Güvenilir Bir Marka Olarak; SÜRDÜRÜLEBİLİR, ENERJİ VERİMLİ Ve KULLANICI ODAKLI Çözümlerle Geleceğin Yaşam Alanlarını Bugünden İnşa Etmek."
    },
    {
      id: "story",
      title: "Hikayemiz", 
      icon: BookOpen,
      content: "2003 Yılında Atölye Ölçeğinde Başlayan Yolculuğumuz, Bugün Türkiye'nin Dört Bir Yanında Konforlu Yaşam Ve Çalışma Alanları Üreten Bir Yapıya Dönüştü. Her Projede; Hızlı Teslimat, Sağlamlık Ve Estetikten Ödün Vermeden İlerledik. Müşterilerimizin İhtiyaçlarını Gerçekten Dinleyen Bir Ekip Olduk. Bu Yaklaşım, Bizi Daima Daha İyi Çözümler Geliştirmeye Ve Sektörde Güvenilir Bir Marka Olmaya Taşıdı."
    }
  ];

  const features = [
    "20+ Yıllık Deneyim",
    "1000+ Tamamlanan Proje", 
    "7/24 Müşteri Desteği",
    "Kaliteli Malzeme Garantisi"
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-8 justify-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
                    onClick={() => setActive(tab.id as "mission" | "vision" | "story")}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                active === tab.id
                  ? "bg-accent text-white shadow-lg transform scale-105"
                  : "bg-white text-foreground hover:bg-secondary hover:shadow-md"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="font-medium text-sm sm:text-base">{tab.title}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-4">
            {tabs.find(tab => tab.id === active)?.title}
          </h3>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground leading-relaxed text-center text-base sm:text-lg mb-8">
            {tabs.find(tab => tab.id === active)?.content}
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-4 bg-secondary/50 rounded-xl">
                <CheckCircle className="w-6 h-6 text-accent mx-auto mb-2" />
                <span className="text-sm font-medium text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTabs;


