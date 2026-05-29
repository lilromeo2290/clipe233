"use client";

import dynamic from "next/dynamic";

// Lazy-load all sections to reduce SSR memory footprint
const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const HeroSection = dynamic(() => import("@/components/sections/HeroSection"), { ssr: false });
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), { ssr: false });
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"), { ssr: false });
const WhyChooseUsSection = dynamic(() => import("@/components/sections/WhyChooseUsSection"), { ssr: false });
const TechStackSection = dynamic(() => import("@/components/sections/TechStackSection"), { ssr: false });
const PortfolioSection = dynamic(() => import("@/components/sections/PortfolioSection"), { ssr: false });
const IndustriesSection = dynamic(() => import("@/components/sections/IndustriesSection"), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), { ssr: false });
const BlogSection = dynamic(() => import("@/components/sections/BlogSection"), { ssr: false });
const CareersSection = dynamic(() => import("@/components/sections/CareersSection"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-falu/20 dark:via-falu/30 to-transparent" />

      <AboutSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/20 dark:via-falu/30 to-transparent" />

      <ServicesSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/20 dark:via-falu/30 to-transparent" />

      <WhyChooseUsSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/20 dark:via-falu/30 to-transparent" />

      <TechStackSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/20 dark:via-falu/30 to-transparent" />

      <PortfolioSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/20 dark:via-falu/30 to-transparent" />

      <TestimonialsSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/20 dark:via-falu/30 to-transparent" />

      <IndustriesSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/20 dark:via-falu/30 to-transparent" />

      <BlogSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/20 dark:via-falu/30 to-transparent" />

      <CareersSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/20 dark:via-falu/30 to-transparent" />

      <ContactSection />

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
