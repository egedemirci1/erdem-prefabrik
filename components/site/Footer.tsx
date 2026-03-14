"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Mail, Phone, Instagram, Facebook, Send, ArrowUp, MessageCircle, CheckCircle } from "lucide-react";

const Footer = () => {
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const [newsletterMsg, setNewsletterMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrollVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Konya Prefabrik", href: "/" },
    { name: "Projelerimiz", href: "/projeler" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "İletişim", href: "/iletisim" },
  ];

  const socialLinks = [
    { name: "WhatsApp", icon: MessageCircle, href: "https://wa.me/905333802588", color: "hover:bg-green-600" },
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/erdemprefabrik", color: "hover:bg-blue-600" },
  ];

  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h3 className="text-2xl font-light mb-6">Erdem Prefabrik</h3>

              {/* Contact Info */}
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
                  <span className="text-sm">Fetih Mahallesi, Adana Çevreyolu Caddesi No:119 Pk:42030 BP Petrol Karşısı, Karatay / KONYA</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-medium mb-6">Başlıklarımız</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-accent transition-colors duration-300 text-sm font-light"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-medium mb-6">Hizmetlerimiz</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-white/80 hover:text-accent transition-colors duration-300 text-sm font-light">
                    Prefabrik Ev Konya
                  </Link>
                </li>
                <li>
                  <Link href="/prefabrik-celik" className="text-white/80 hover:text-accent transition-colors duration-300 text-sm font-light">
                    Prefabrik Ev & Villa
                  </Link>
                </li>
                <li>
                  <Link href="/moduler" className="text-white/80 hover:text-accent transition-colors duration-300 text-sm font-light">
                    Modüler Yapılar
                  </Link>
                </li>
                <li>
                  <Link href="/konteyner" className="text-white/80 hover:text-accent transition-colors duration-300 text-sm font-light">
                    Konteyner Çözümleri
                  </Link>
                </li>
                <li>
                  <Link href="/prefabrik-celik/celik-ev-villa" className="text-white/80 hover:text-accent transition-colors duration-300 text-sm font-light">
                    Çelik Ev & Villa
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-medium mb-6">Sosyal Medya</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:text-white transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              
              {/* Instagram Floating Button */}
              <div className="mt-6">
                <a
                  href="https://www.instagram.com/prefabrikerdem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="text-sm font-medium">Instagram&#39;da Takip Et</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Newsletter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="bg-accent py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <h4 className="text-xl font-light text-white mb-2">
                Güncel Projelerimizden Haberdar Olun
              </h4>
              <p className="text-white/90 font-light">
                E-bültenimize abone olun, yeni projeler ve kampanyalardan ilk siz haberdar olun.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto items-center">
              <Input
                id="newsletter-email"
                type="email"
                placeholder="E-posta adresiniz"
                aria-label="E-bülten için e-posta adresiniz"
                className="w-full sm:w-64 h-12 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:border-white/40 focus:ring-white/20"
              />
              <Button
                className="bg-white text-accent hover:bg-white/90 h-12 px-6 rounded-xl font-medium"
                onClick={() => {
                  const input = document.getElementById('newsletter-email') as HTMLInputElement | null;
                  const email = input?.value?.trim() || '';
                  if (!email) {
                    setNewsletterMsg({ type: 'error', text: 'Lütfen e‑posta adresinizi girin.' });
                    return;
                  }
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(email)) {
                    setNewsletterMsg({ type: 'error', text: 'Lütfen geçerli bir e‑posta adresi girin.' });
                    return;
                  }
                  const subject = encodeURIComponent('Newsletter Aboneliği');
                  const body = encodeURIComponent(`Merhaba,\n\nE-bülten aboneliği için başvuru yapıyorum.\n\nE-posta: ${email}\n\nTeşekkürler.`);
                  window.open(`mailto:info@erdemprefabrikev.com?subject=${subject}&body=${body}`);
                  if (input) input.value = '';
                  setNewsletterMsg({ type: 'success', text: 'E-posta uygulamanız açılacak.' });
                  setTimeout(() => setNewsletterMsg(null), 4000);
                }}
              >
                <Send className="w-4 h-4 mr-2" />
                Abone Ol
              </Button>
              {newsletterMsg && (
                <span className={`text-sm font-medium ${newsletterMsg.type === 'error' ? 'text-red-300' : 'text-green-300'}`}>
                  {newsletterMsg.type === 'success' && <CheckCircle className="w-4 h-4 inline mr-1" />}
                  {newsletterMsg.text}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm font-light">
              © {new Date().getFullYear()} Erdem Prefabrik. Tüm Hakları Saklıdır.
            </div>
            
            <div className="flex items-center space-x-6">
              <Link href="/gizlilik" className="text-white/60 hover:text-white transition-colors text-sm font-light">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-kosullari" className="text-white/60 hover:text-white transition-colors text-sm font-light">
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {isScrollVisible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Sayfanın başına dön"
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
