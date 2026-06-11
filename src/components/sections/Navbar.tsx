"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
  isHome?: boolean;
  submenu?: { label: string; href: string; isPage?: boolean }[];
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#home", isHome: true },
  { label: "About Us", href: "#about" },
  {
    label: "What We Do",
    href: "#services",
    submenu: [
      { label: "Website Development", href: "/website-development", isPage: true },
      { label: "Networking Solutions", href: "/networking-solutions", isPage: true },
      { label: "IT Consultancy / Training", href: "/it-consultancy", isPage: true },
      { label: "Mobile App Development", href: "/mobile-app-development", isPage: true },
      { label: "Software / Application Development", href: "/software-development", isPage: true },
    ],
  },
  {
    label: "Products",
    href: "/products",
    submenu: [
      { label: "Clipe School", href: "/clipe-school", isPage: true },
      { label: "Clipe POS", href: "/clipe-pos", isPage: true },
      { label: "Clipe Medic", href: "/clipe-medic", isPage: true },
      { label: "Clipe Pharma", href: "/clipe-pharma", isPage: true },
      { label: "Clipe Complaint", href: "/clipe-complaint", isPage: true },
    ],
  },
  { label: "Our Team", href: "#team" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  const pathname = usePathname();



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (pathname !== "/") return;

      const allSections = ["home"];
      navLinks.forEach((l) => {
        if (!l.href.startsWith("#")) return;
        const id = l.href.replace("#", "");
        if (!allSections.includes(id)) allSections.push(id);
        l.submenu?.forEach((s) => {
          if (s.href.startsWith("#")) {
            const sid = s.href.replace("#", "");
            if (!allSections.includes(sid)) allSections.push(sid);
          }
        });
      });

      for (let i = allSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(allSections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(allSections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setOpenDropdown(null);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLinkClick = (href: string, isPage?: boolean, isHome?: boolean) => {
    if (isPage) {
      setMobileOpen(false);
      setOpenDropdown(null);
      return;
    }
    if (isHome && pathname !== "/") {
      window.location.href = "/#home";
      setMobileOpen(false);
      setOpenDropdown(null);
      return;
    }
    if (pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    scrollTo(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass shadow-lg shadow-gray-300/20 dark:shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="/#home"
              onClick={(e) => {
                e.preventDefault();
                if (pathname !== "/") {
                  window.location.href = "/#home";
                } else {
                  scrollTo("#home");
                }
              }}
              className="flex items-center gap-2.5 group"
            >
              <img
                src="/logo.jpg"
                alt="Clipe233 Engineers Logo"
                className="h-10 w-auto rounded-lg group-hover:glow-red transition-all duration-300"
              />
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.submenu ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.href)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 font-[family-name:var(--font-inter)] flex items-center gap-1 ${
                        activeSection === link.href.replace("#", "")
                          ? "text-falu-light bg-falu/10 dark:bg-falu/20 text-glow-red"
                          : "text-gray-500 dark:text-silver/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          openDropdown === link.href ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {openDropdown === link.href && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-1 min-w-[260px] glass rounded-xl shadow-xl shadow-gray-300/20 dark:shadow-black/40 border border-gray-200/60 dark:border-white/10 overflow-hidden"
                        >
                          <div className="py-2">
                            {link.submenu.map((sub) => (
                              <a
                                key={sub.href + sub.label}
                                href={sub.href}
                                onClick={(e) => {
                                  if (!sub.isPage) {
                                    e.preventDefault();
                                  }
                                  handleLinkClick(sub.href, sub.isPage);
                                }}
                                className="flex items-center px-4 py-2.5 text-sm text-gray-600 dark:text-silver/70 hover:text-falu-light hover:bg-falu/5 dark:hover:bg-falu/10 transition-all duration-200 font-[family-name:var(--font-inter)]"
                              >
                                {sub.label}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href, undefined, link.isHome);
                    }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 font-[family-name:var(--font-inter)] ${
                      activeSection === link.href.replace("#", "")
                        ? "text-falu-light bg-falu/10 dark:bg-falu/20 text-glow-red"
                        : "text-gray-500 dark:text-silver/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            {/* Desktop CTA + Theme Toggle */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <a href="/#contact">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("#contact");
                  }}
                  size="sm"
                  className="bg-falu hover:bg-falu-light text-white glow-red-sm hover:glow-red transition-all duration-300 font-[family-name:var(--font-inter)]"
                >
                  Request Consultation
                </Button>
              </a>
            </div>

            {/* Mobile toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-gray-700 dark:text-white hover:text-falu-light transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
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
            className="fixed inset-0 z-40 pt-20 bg-gray-50/95 dark:bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center gap-2 p-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
              {navLinks.map((link, i) =>
                link.submenu ? (
                  <div key={link.href} className="w-full">
                    <div className="flex items-center w-full">
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className={`flex-1 text-center py-3 px-6 rounded-lg text-lg font-medium transition-all font-[family-name:var(--font-inter)] ${
                          activeSection === link.href.replace("#", "")
                            ? "text-falu-light bg-falu/10 dark:bg-falu/20"
                            : "text-gray-500 dark:text-silver/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </button>
                      <button
                        onClick={() =>
                          setMobileSubmenuOpen(
                            mobileSubmenuOpen === link.href ? null : link.href
                          )
                        }
                        className={`p-3 rounded-lg transition-all ${
                          mobileSubmenuOpen === link.href
                            ? "text-falu-light bg-falu/10 dark:bg-falu/20"
                            : "text-gray-500 dark:text-silver/70 hover:text-gray-900 dark:hover:text-white"
                        }`}
                        aria-label="Toggle submenu"
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-300 ${
                            mobileSubmenuOpen === link.href ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    {/* Mobile Submenu */}
                    <AnimatePresence>
                      {mobileSubmenuOpen === link.href && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-2 space-y-1">
                            {link.submenu.map((sub) => (
                              <a
                                key={sub.href + sub.label}
                                href={sub.href}
                                onClick={(e) => {
                                  if (!sub.isPage) {
                                    e.preventDefault();
                                  }
                                  handleLinkClick(sub.href, sub.isPage);
                                }}
                                className="block py-2.5 px-4 rounded-lg text-base text-gray-500 dark:text-silver/60 hover:text-falu-light hover:bg-falu/5 dark:hover:bg-falu/10 transition-all font-[family-name:var(--font-inter)]"
                              >
                                {sub.label}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href, undefined, link.isHome);
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`w-full text-center py-3 px-6 rounded-lg text-lg font-medium transition-all font-[family-name:var(--font-inter)] ${
                      activeSection === link.href.replace("#", "")
                        ? "text-falu-light bg-falu/10 dark:bg-falu/20"
                        : "text-gray-500 dark:text-silver/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                )
              )}
              <div className="flex flex-col gap-3 w-full mt-4">
                <Button
                  onClick={() => handleLinkClick("#contact")}
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
