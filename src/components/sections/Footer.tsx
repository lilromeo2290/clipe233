"use client";

import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "What We Do", href: "#services" },
  { label: "Products", href: "/products" },
  { label: "Our Team", href: "#team" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Website Development", href: "/website-development" },
  { label: "Networking Solutions", href: "/networking-solutions" },
  { label: "IT Consultancy / Training", href: "/it-consultancy" },
  { label: "Mobile App Development", href: "/mobile-app-development" },
  { label: "Software / Application Development", href: "/software-development" },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative border-t border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/logo.jpg"
                alt="Clipe233 Engineers Logo"
                className="h-10 w-auto rounded-lg"
              />
            </div>
            <p className="text-gray-500 dark:text-silver/60 text-sm font-[family-name:var(--font-inter)] leading-relaxed mb-4">
              Engineering Digital Possibilities. We deliver innovative
              software, networking, branding, and digital transformation
              solutions for modern businesses.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-silver/60 hover:bg-falu/20 hover:text-falu-light transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4 font-[family-name:var(--font-poppins)]">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("/")) return; // let page links navigate naturally
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-sm text-gray-500 dark:text-silver/60 hover:text-falu-light transition-colors font-[family-name:var(--font-inter)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4 font-[family-name:var(--font-poppins)]">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((service, i) => (
                <li key={i}>
                  <a
                    href={service.href}
                    className="text-sm text-gray-500 dark:text-silver/60 hover:text-falu-light transition-colors font-[family-name:var(--font-inter)]"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4 font-[family-name:var(--font-poppins)]">
              Stay Updated
            </h4>
            <p className="text-sm text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)] mb-4 leading-relaxed">
              Subscribe to our newsletter for the latest tech insights,
              company news, and exclusive offers.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-silver/40 text-sm font-[family-name:var(--font-inter)]"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-falu hover:bg-falu-light text-white flex-shrink-0"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-silver/50 font-[family-name:var(--font-inter)]">
                <Mail className="h-4 w-4 text-falu-light" />
                <a href="mailto:info@clipe233eng.net" className="hover:text-falu-light transition-colors">
                  info@clipe233eng.net
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-silver/50 font-[family-name:var(--font-inter)]">
                <Mail className="h-4 w-4 text-falu-light" />
                <a href="mailto:clipe233eng@gmail.com" className="hover:text-falu-light transition-colors">
                  clipe233eng@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-silver/50 font-[family-name:var(--font-inter)]">
                <Phone className="h-4 w-4 text-falu-light" />
                +233 24 978 3736
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-silver/50 font-[family-name:var(--font-inter)]">
                <MapPin className="h-4 w-4 text-falu-light" />
                Ho, Volta Region, Ghana
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400 dark:text-silver/40 font-[family-name:var(--font-inter)]">
              &copy; {new Date().getFullYear()} Clipe233 Engineers. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-400 dark:text-silver/40 font-[family-name:var(--font-inter)]">
              <a href="#" className="hover:text-falu-light transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-falu-light transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
