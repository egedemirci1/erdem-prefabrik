"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/site/LanguageSwitcher";

const Header = () => {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
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

  const isLight = hasHero && !isScrolled;

  const navigationItems = [
    { name: t("home"), href: "/" as const },
    {
      name: t("container"),
      href: "/container" as const,
      dropdown: [
        { name: t("containerHomeOffice"), href: "/container/home" as const },
        { name: t("containerSecurity"), href: "/container/security-booth" as const },
        { name: t("containerWc"), href: "/container/wc-shower" as const },
      ],
    },
    {
      name: t("modular"),
      href: "/modular" as const,
      dropdown: [
        { name: t("modularBungalow"), href: "/modular/bungalow" as const },
        { name: t("modularOffice"), href: "/modular/office" as const },
      ],
    },
    {
      name: t("prefabSteel"),
      href: "/prefab-steel" as const,
      dropdown: [
        { name: t("prefabHomeVilla"), href: "/prefab-steel/prefab-home-villa" as const },
        { name: t("constructionSpecial"), href: "/prefab-steel/construction-special" as const },
        { name: t("steelHomeVilla"), href: "/prefab-steel/steel-home-villa" as const },
      ],
    },
    { name: t("zeroWaste"), href: "/modular/zero-waste" as const },
    { name: t("projects"), href: "/projects" as const },
    { name: t("about"), href: "/about" as const },
    { name: t("contact"), href: "/contact" as const },
  ];

  const linkClass = `transition-colors font-light text-sm xl:text-base whitespace-nowrap ${
    isLight ? "text-white hover:text-white/80" : "text-gray-800 hover:text-gray-600"
  }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform ${
        isLight ? "bg-white/20 backdrop-blur-xl" : "bg-white/95 backdrop-blur-xl shadow-xl"
      }`}
    >
      <div className="max-w-7xl mx-auto pl-4 pr-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 overflow-x-hidden w-full">
          <Link href="/" className="flex items-center shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/Logo-header.png"
                alt={tCommon("brand")}
                width={125}
                height={64}
                className="object-contain h-10 sm:h-11 md:h-12 lg:h-14 w-auto max-w-[100px] sm:max-w-[110px] lg:max-w-[125px]"
                priority
              />
            </motion.div>
          </Link>

          <nav className="hidden lg:flex flex-1 items-center justify-end gap-x-3 xl:gap-x-5 min-w-0 mx-3 xl:mx-6">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={`flex items-center gap-1 hover:bg-transparent p-0 h-auto font-light text-sm xl:text-base whitespace-nowrap transition-colors ${
                            isLight ? "text-white hover:text-white/80" : "text-gray-800 hover:text-gray-600"
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
                    <Link href={item.href} className={linkClass}>
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitcher isLight={isLight} className="hidden lg:flex" />

            <Button
              variant="ghost"
              size="lg"
              className="lg:hidden p-4 min-h-[48px] min-w-[48px]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMobileMenuOpen ? (
                <X className={`h-9 w-9 transition-colors ${isLight ? "text-white" : "text-gray-800"}`} />
              ) : (
                <Menu className={`h-9 w-9 transition-colors ${isLight ? "text-white" : "text-gray-800"}`} />
              )}
            </Button>
          </div>
        </div>
      </div>

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
            aria-label={t("mobileMenu")}
          >
            <div className="px-4 py-6 space-y-4">
              <div className="flex justify-end pb-2 border-b border-border">
                <LanguageSwitcher isLight={false} />
              </div>
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
