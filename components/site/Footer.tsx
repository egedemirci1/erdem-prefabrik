"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Mail, Phone, Instagram, Facebook, Send, ArrowUp, MessageCircle, CheckCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { isValidPhone, sanitizePhoneInput } from "@/lib/phone";

const Footer = () => {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const [newsletterMsg, setNewsletterMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [newsletterPhone, setNewsletterPhone] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrollVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: tNav("home"), href: "/" as const },
    { name: t("konyaPrefabrik"), href: "/" as const },
    { name: t("ourProjects"), href: "/projects" as const },
    { name: tNav("about"), href: "/about" as const },
    { name: tNav("contact"), href: "/contact" as const },
  ];

  const socialLinks = [
    { name: "WhatsApp", icon: MessageCircle, href: "https://wa.me/905333802588", color: "hover:bg-green-600" },
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/erdemprefabrik", color: "hover:bg-blue-600" },
  ];

  return (
    <footer className="bg-foreground text-white">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h3 className="text-2xl font-light mb-6">{tCommon("brand")}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-white/80">
                  <Phone className="w-5 h-5 text-accent" />
                  <span className="text-sm">+90 332 351 80 60 • +90 533 379 25 88</span>
                </div>
                <div className="flex items-center space-x-3 text-white/80">
                  <Mail className="w-5 h-5 text-accent" />
                  <span className="text-sm">info@erdemprefabrikev.com</span>
                </div>
                <div className="flex items-center space-x-3 text-white/80">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-accent" aria-hidden="true">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="text-sm">{tCommon("address")}</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
              <h4 className="text-lg font-medium mb-6">{t("quickLinks")}</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/80 hover:text-accent transition-colors duration-300 text-sm font-light">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
              <h4 className="text-lg font-medium mb-6">{t("services")}</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-white/80 hover:text-accent transition-colors duration-300 text-sm font-light">{t("prefabHomeKonya")}</Link></li>
                <li><Link href="/prefab-steel" className="text-white/80 hover:text-accent transition-colors duration-300 text-sm font-light">{t("prefabHomeVilla")}</Link></li>
                <li><Link href="/modular" className="text-white/80 hover:text-accent transition-colors duration-300 text-sm font-light">{t("modularStructures")}</Link></li>
                <li><Link href="/container" className="text-white/80 hover:text-accent transition-colors duration-300 text-sm font-light">{t("containerSolutions")}</Link></li>
                <li><Link href="/prefab-steel/steel-home-villa" className="text-white/80 hover:text-accent transition-colors duration-300 text-sm font-light">{t("steelHomeVilla")}</Link></li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}>
              <h4 className="text-lg font-medium mb-6">{t("social")}</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className={`w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:text-white transition-all duration-300 ${social.color}`}>
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <div className="mt-6">
                <a href="https://www.instagram.com/prefabrikerdem" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
                  <Instagram className="w-4 h-4" />
                  <span className="text-sm font-medium">{t("followInstagram")}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }} className="bg-accent py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <h4 className="text-xl font-light text-white mb-2">{t("newsletterTitle")}</h4>
              <p className="text-white/90 font-light">{t("newsletterDesc")}</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto items-center relative">
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
              </div>
              <Input
                id="newsletter-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={newsletterPhone}
                onChange={(e) => setNewsletterPhone(sanitizePhoneInput(e.target.value))}
                maxLength={20}
                placeholder={t("phonePlaceholder")}
                aria-label={t("phoneAria")}
                className="w-full sm:w-64 h-12 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:border-white/40 focus:ring-white/20"
              />
              <Button
                className="bg-white text-accent hover:bg-white/90 h-12 px-6 rounded-xl font-medium"
                disabled={isSubmitting}
                onClick={async () => {
                  if (honeypot) {
                    setNewsletterMsg({ type: "success", text: t("subscribeSuccess") });
                    return;
                  }
                  const phone = newsletterPhone.trim();
                  if (!phone) {
                    setNewsletterMsg({ type: "error", text: t("phoneRequired") });
                    return;
                  }
                  if (!isValidPhone(phone)) {
                    setNewsletterMsg({ type: "error", text: t("phoneInvalid") });
                    return;
                  }
                  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
                  if (!scriptUrl) {
                    setNewsletterMsg({ type: "error", text: t("systemClosed") });
                    return;
                  }
                  setIsSubmitting(true);
                  setNewsletterMsg(null);
                  try {
                    const formDataToSend = new FormData();
                    formDataToSend.append("type", "bulten");
                    formDataToSend.append("phone", phone);
                    await fetch(scriptUrl, { method: "POST", mode: "no-cors", body: formDataToSend });
                    setNewsletterMsg({ type: "success", text: t("subscribeSuccess") });
                    setNewsletterPhone("");
                  } catch {
                    setNewsletterMsg({ type: "error", text: t("connectionError") });
                  } finally {
                    setIsSubmitting(false);
                    setTimeout(() => setNewsletterMsg(null), 5000);
                  }
                }}
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? t("submitting") : t("subscribe")}
              </Button>
              {newsletterMsg && (
                <span className={`text-sm font-medium ${newsletterMsg.type === "error" ? "text-red-300" : "text-green-300"}`}>
                  {newsletterMsg.type === "success" && <CheckCircle className="w-4 h-4 inline mr-1" />}
                  {newsletterMsg.text}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm font-light">{t("copyright", { year: new Date().getFullYear() })}</div>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors text-sm font-light">{t("privacy")}</Link>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors text-sm font-light">{t("terms")}</Link>
            </div>
          </div>
        </div>
      </div>

      {isScrollVisible && (
        <motion.button
          onClick={scrollToTop}
          aria-label={tCommon("scrollToTop")}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 right-8 w-12 h-12 bg-accent hover:bg-accent/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;
