"use client";

import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TechStackSection from "@/components/sections/TechStackSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import BlogSection from "@/components/sections/BlogSection";
import CareersSection from "@/components/sections/CareersSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import WhatsAppFloat from "@/components/sections/WhatsAppFloat";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-falu/30 to-transparent" />

      <AboutSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/30 to-transparent" />

      <ServicesSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/30 to-transparent" />

      <WhyChooseUsSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/30 to-transparent" />

      <TechStackSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/30 to-transparent" />

      <PortfolioSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/30 to-transparent" />

      <TestimonialsSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/30 to-transparent" />

      <IndustriesSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/30 to-transparent" />

      <BlogSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/30 to-transparent" />

      <CareersSection />

      <div className="h-px bg-gradient-to-r from-transparent via-falu/30 to-transparent" />

      <ContactSection />

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
