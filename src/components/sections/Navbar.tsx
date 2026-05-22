"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Industries", href: "#industries" },
  { label: "Blog", href: "#blog" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#home");
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-lg bg-falu flex items-center justify-center glow-red-sm group-hover:glow-red transition-all duration-300">
                <span className="text-white font-bold text-lg font-[family-name:var(--font-space-grotesk)]">
                  C
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-tight font-[family-name:var(--font-poppins)]">
                  Clipe<span className="text-falu-light">233</span>
                </span>
                <span className="text-silver/60 text-[10px] tracking-[0.2em] uppercase leading-tight">
                  Engineers
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 font-[family-name:var(--font-inter)] ${
                    activeSection === link.href.replace("#", "")
                      ? "text-white bg-falu/20 text-glow-red"
                      : "text-silver/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                onClick={() => scrollTo("#contact")}
                variant="outline"
                size="sm"
                className="border-falu/50 text-falu-light hover:bg-falu/10 hover:border-falu font-[family-name:var(--font-inter)]"
              >
                Get Started
              </Button>
              <Button
                onClick={() => scrollTo("#contact")}
                size="sm"
                className="bg-falu hover:bg-falu-light text-white glow-red-sm hover:glow-red transition-all duration-300 font-[family-name:var(--font-inter)]"
              >
                Request Consultation
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white hover:text-falu-light transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-20 bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center gap-2 p-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`w-full text-center py-3 px-6 rounded-lg text-lg font-medium transition-all font-[family-name:var(--font-inter)] ${
                    activeSection === link.href.replace("#", "")
                      ? "text-white bg-falu/20"
                      : "text-silver/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="flex flex-col gap-3 w-full mt-4">
                <Button
                  onClick={() => scrollTo("#contact")}
                  variant="outline"
                  className="border-falu/50 text-falu-light hover:bg-falu/10 w-full font-[family-name:var(--font-inter)]"
                >
                  Get Started
                </Button>
                <Button
                  onClick={() => scrollTo("#contact")}
                  className="bg-falu hover:bg-falu-light text-white w-full font-[family-name:var(--font-inter)]"
                >
                  Request Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
