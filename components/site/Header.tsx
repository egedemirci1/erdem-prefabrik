"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const hasHero = pathname === "/";

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Ana Sayfa", href: "/" },
    {
      name: "Konteyner",
      href: "/konteyner",
      dropdown: [
        { name: "Ev & Ofis", href: "/konteyner/ev" },
        { name: "Güvenlik Kulübesi", href: "/konteyner/guvenlik-kulubesi" },
        { name: "WC & Duş Kabini", href: "/konteyner/wc-dus-kabini" },
      ],
    },
    {
      name: "Modüler",
      href: "/moduler",
      dropdown: [
        { name: "Bungalow & Tiny House", href: "/moduler/bungalow" },
        { name: "Modüler Ev & Ofis", href: "/moduler/ofis" },
      ],
    },
    {
      name: "Prefabrik & Çelik",
      href: "/prefabrik-celik",
      dropdown: [
        { name: "Prefabrik Ev & Villa", href: "/prefabrik-celik/prefabrik-ev-villa" },
        { name: "Şantiye & Özel Kullanım", href: "/prefabrik-celik/santiye-ozel-kullanim" },
        { name: "Çelik Ev & Villa", href: "/prefabrik-celik/celik-ev-villa" },
      ],
    },
    { name: "Sıfır Atık", href: "/moduler/sifir-atik" },
    { name: "Projeler", href: "/projeler" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "İletişim", href: "/iletisim" },
  ];

  return (
    <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform ${
        hasHero && !isScrolled
          ? "bg-white/20 backdrop-blur-xl"
          : "bg-white/95 backdrop-blur-xl shadow-xl"
      }`}
    >
          <div className="max-w-7xl mx-auto pl-4 pr-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 overflow-x-hidden w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image 
                src="/images/Logo-header.png" 
                alt="Erdem Prefabrik" 
                width={105} 
                height={25} 
                className="object-contain w-16 sm:w-20 md:w-24 lg:w-[105px] h-auto" 
                priority 
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 overflow-visible max-w-[calc(100%-260px)]">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`flex items-center gap-1 hover:bg-transparent p-0 h-auto font-light text-base transition-colors ${
                          hasHero && !isScrolled ? "text-white hover:text-white/80" : "text-gray-800 hover:text-gray-600"
                        }`}
                      >
                        {item.name}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="w-64 bg-white border border-border shadow-xl rounded-2xl p-2 will-change-auto"
                      sideOffset={8}
                      avoidCollisions={true}
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <DropdownMenuItem key={dropdownItem.name} asChild>
                          <Link
                            href={dropdownItem.href}
                            className="flex items-center px-4 py-3 text-sm text-foreground hover:text-accent hover:bg-secondary rounded-xl transition-colors cursor-pointer"
                          >
                            {dropdownItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.href}
                        className={`transition-colors font-light text-base ${
                          hasHero && !isScrolled ? "text-white hover:text-white/80" : "text-gray-800 hover:text-gray-600"
                        }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="lg"
            className="lg:hidden p-4 min-h-[48px] min-w-[48px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMobileMenuOpen ? (
              <X className={`h-9 w-9 transition-colors ${
                hasHero && !isScrolled ? "text-white" : "text-gray-800"
              }`} />
            ) : (
              <Menu className={`h-9 w-9 transition-colors ${
                hasHero && !isScrolled ? "text-white" : "text-gray-800"
              }`} />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-border"
            id="mobile-nav"
            role="navigation"
            aria-label="Mobil menü"
          >
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="space-y-2">
                      <div className="font-medium text-gray-800">{item.name}</div>
                      <div className="ml-4 space-y-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block text-sm text-gray-600 hover:text-gray-800 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block font-medium text-gray-800 hover:text-gray-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
