"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Palette,
  RefreshCw,
  Wrench,
  Monitor,
  Search,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const subServices = [
  {
    icon: Palette,
    title: "Dynamic & Static Web Design",
    subtitle: "Tailored Web Experiences",
    description:
      "Whether you need a dynamic, content-rich platform or a clean, static informational site, we craft web experiences that perfectly align with your business goals. Our dynamic websites feature content management systems that empower you to update content effortlessly, while our static sites are optimised for blazing-fast performance and rock-solid reliability. Every design is built from the ground up with your brand identity, target audience, and business objectives in mind.",
    features: [
      "Custom CMS-powered dynamic sites",
      "Lightning-fast static website builds",
      "Brand-aligned visual design",
      "Responsive across all devices",
    ],
  },
  {
    icon: RefreshCw,
    title: "Website Re-Design",
    subtitle: "Modernise Your Digital Presence",
    description:
      "Is your current website looking outdated or underperforming? Our re-design service breathes new life into your existing online presence. We analyse your current site's performance metrics, user behaviour, and design shortcomings to create a modernised version that elevates your brand image, improves user experience, and drives better engagement and conversions. A re-design with us is not just a fresh coat of paint — it is a strategic upgrade.",
    features: [
      "UX audit & performance analysis",
      "Modern UI/UX redesign",
      "Improved navigation & user flow",
      "SEO & speed optimization",
    ],
  },
  {
    icon: Wrench,
    title: "Website Maintenance",
    subtitle: "Ongoing Performance & Security",
    description:
      "A website is never truly finished — it requires ongoing care to remain secure, fast, and relevant. Our website maintenance service ensures your digital presence stays in peak condition with regular updates, security patches, content refreshes, and performance monitoring. We handle the technical details so you can focus on running your business, knowing your website is always performing at its best.",
    features: [
      "Regular updates & security patches",
      "Content updates & management",
      "Performance monitoring & optimization",
      "Backup & disaster recovery",
    ],
  },
];

const highlights = [
  { icon: Globe, label: "Web Solutions" },
  { icon: Zap, label: "Fast & Responsive" },
  { icon: Shield, label: "Secure & Reliable" },
  { icon: Search, label: "SEO Optimised" },
  { icon: Smartphone, label: "Mobile-First" },
  { icon: Monitor, label: "Cross-Device" },
];

export default function WebsiteDevelopmentPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-falu/5 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-falu/3 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-falu-light text-sm font-semibold tracking-wider uppercase font-[family-name:var(--font-inter)]">
              What We Do
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
              Website{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Development
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              In the digital age, a web site frequently serves as your business or organization&apos;s front entrance through which many customers will pass. Our mission is to give you a professional on-line presence that will generally enhance your organization&apos;s image and branding.
            </p>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed mt-4">
              Our Website Development services focus on building modern, responsive, and performance-driven websites tailored to your business objectives. We design platforms that are not only visually appealing but also optimized for usability, speed, and search visibility. Every website is structured to guide visitors clearly toward engagement and conversion.
            </p>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed mt-4">
              From corporate websites to dynamic platforms, we ensure your digital presence reflects your brand identity while delivering measurable business impact.
            </p>
          </motion.div>

          {/* Highlight badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            {highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-gray-600 dark:text-silver/70 font-[family-name:var(--font-inter)]"
              >
                <h.icon className="h-4 w-4 text-falu-light" />
                {h.label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sub-services */}
      <section ref={ref} className="py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-poppins)]">
              Our Website Development{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Services
              </span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {subServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className="glass-card rounded-2xl p-8 md:p-10 hover-lift group"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:flex-1">
                    <div className="flex items-start gap-5 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-falu/20 flex items-center justify-center flex-shrink-0 group-hover:bg-falu/30 transition-colors">
                        <service.icon className="h-7 w-7 text-falu-light" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] group-hover:text-falu-light transition-colors">
                          {service.title}
                        </h3>
                        <span className="text-falu-light text-sm font-semibold font-[family-name:var(--font-inter)]">
                          {service.subtitle}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)] leading-relaxed mt-2">
                      {service.description}
                    </p>
                  </div>
                  <div className="lg:w-80 flex-shrink-0">
                    <div className="glass-card rounded-xl p-6">
                      <span className="text-sm font-semibold text-falu-light font-[family-name:var(--font-inter)] uppercase tracking-wider">
                        What&apos;s Included
                      </span>
                      <div className="mt-4 space-y-3">
                        {service.features.map((feature, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-silver/70 font-[family-name:var(--font-inter)]"
                          >
                            <CheckCircle2 className="h-4 w-4 text-falu-light flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="glass-card rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
                Ready to Build Your Website?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Let us create a professional online presence that enhances your brand and drives business growth. Get in touch today for a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/#contact">
                  <Button
                    size="lg"
                    className="bg-falu hover:bg-falu-light text-white glow-red-sm hover:glow-red transition-all duration-300 font-[family-name:var(--font-inter)]"
                  >
                    Request a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="https://wa.me/233249783736" target="_blank" rel="noopener noreferrer">
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
