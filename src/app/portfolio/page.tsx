"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import PortfolioSection from "@/components/sections/PortfolioSection";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

export default function PortfolioPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-falu/5 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-falu/3 blur-[120px]" />

        <div
          ref={heroRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-falu-light text-sm font-semibold tracking-wider uppercase font-[family-name:var(--font-inter)]">
              Our Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)] leading-tight">
              Projects That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Define Excellence
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              Explore our portfolio of successfully delivered projects across
              software development, web design, branding, and network
              infrastructure. Each project represents our commitment to quality,
              innovation, and measurable impact for clients across Ghana and
              beyond.
            </p>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 max-w-4xl mx-auto"
          >
            {[
              { value: "200+", label: "Projects Completed" },
              { value: "9+", label: "Years of Experience" },
              { value: "150+", label: "Happy Clients" },
              { value: "8+", label: "Core Services" },
            ].map((stat, i) => (
              <div key={i} className="glass-card rounded-xl p-6 text-center hover-lift">
                <div className="text-3xl sm:text-4xl font-bold text-falu-light font-[family-name:var(--font-space-grotesk)] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio grid (reuses homepage section) */}
      <PortfolioSection />

      {/* CTA */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="glass-card rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
                Have a Project in Mind?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Whether you need a custom software solution, a stunning website,
                a complete brand identity, or robust network infrastructure — our
                team is ready to bring your vision to life. Let&apos;s build
                something exceptional together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact">
                  <Button
                    size="lg"
                    className="bg-falu hover:bg-falu-light text-white glow-red-sm hover:glow-red transition-all duration-300 font-[family-name:var(--font-inter)]"
                  >
                    Start a Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a
                  href="https://wa.me/233249783736"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-falu/40 text-falu-light hover:bg-falu/10 font-[family-name:var(--font-inter)]"
                  >
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
