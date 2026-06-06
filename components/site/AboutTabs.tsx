"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Rocket, Eye, BookOpen, CheckCircle } from "lucide-react";

const AboutTabs = () => {
  const t = useTranslations("aboutTabs");
  const [active, setActive] = useState<"mission" | "vision" | "story">("mission");

  const tabs = [
    { id: "mission" as const, title: t("mission"), icon: Rocket, content: t("missionText") },
    { id: "vision" as const, title: t("vision"), icon: Eye, content: t("visionText") },
    { id: "story" as const, title: t("story"), icon: BookOpen, content: t("storyText") },
  ];

  const features = [t("feature1"), t("feature2"), t("feature3"), t("feature4")];

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-8 justify-center" role="tablist" aria-label={t("tabsAria")}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                isActive
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

      <div
        className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100"
        role="tabpanel"
        id={`tabpanel-${active}`}
        aria-labelledby={`tab-${active}`}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-4">
            {tabs.find((tab) => tab.id === active)?.title}
          </h3>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground leading-relaxed text-center text-base sm:text-lg mb-8">
            {tabs.find((tab) => tab.id === active)?.content}
          </p>

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
