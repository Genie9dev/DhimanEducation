"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, BookOpen, Languages } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/Button";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  // Close mobile menu when pathname changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.courses"), href: "/courses" },
    { name: t("nav.results"), href: "/results" },
    { name: t("nav.gallery"), href: "/gallery" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">
                Dhiman<span className="text-secondary">Education</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-foreground/60"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border/40">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setLanguage(language === 'en' ? 'gu' : 'en')}
                className="w-9 h-9 rounded-full relative group"
                aria-label="Toggle language"
              >
                <Languages className="h-[1.2rem] w-[1.2rem]" />
                <span className="absolute -bottom-6 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase">{language === 'en' ? 'ગુજ' : 'EN'}</span>
              </Button>
              <ThemeToggle />
              <Link href="/student/login">
                <Button variant="outline" size="sm">{t("nav.login")}</Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setLanguage(language === 'en' ? 'gu' : 'en')}
              className="w-9 h-9 rounded-full text-foreground"
            >
              <span className="text-xs font-bold uppercase">{language === 'en' ? 'ગુજ' : 'EN'}</span>
            </Button>
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-b border-border/40 bg-background"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium py-2 transition-colors ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-foreground/60"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border/40">
                <Link href="/student/login" className="block w-full">
                  <Button className="w-full">{t("nav.studentLogin")}</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
