"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Network,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Server,
  Wifi,
  Cable,
  Lock,
  Eye,
  Repeat,
  Cloud,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const subServices = [
  {
    icon: Network,
    title: "Enterprise LAN/WAN Design & Implementation",
    subtitle: "Core Routing & Switching Solutions",
  },
  {
    icon: Wifi,
    title: "Secure Wireless & Mobility Networks",
    subtitle: "Enterprise-Grade Wireless Solutions",
  },
  {
    icon: Cable,
    title: "Fiber Optic Backbone & Structured Cabling",
    subtitle: "High-Bandwidth Infrastructure",
  },
  {
    icon: Network,
    title: "Campus, Metro & Wide Area Network (WAN) Deployments",
    subtitle: "Multi-Site Connectivity",
  },
  {
    icon: Shield,
    title: "Network Security & Segmentation Solutions",
    subtitle: "Defense-in-Depth Architecture",
  },
  {
    icon: Server,
    title: "Data Centre & Storage Area Networks (SAN)",
    subtitle: "Mission-Critical Storage Infrastructure",
  },
  {
    icon: Repeat,
    title: "High Availability & Redundancy Architectures",
    subtitle: "Zero-Downtime Design",
  },
  {
    icon: Cloud,
    title: "Business Continuity & Disaster Recovery Solutions",
    subtitle: "Resilient Operations",
  },
  {
    icon: Lock,
    title: "VPN, Remote Access & Multi-Branch Connectivity",
    subtitle: "Secure Anywhere Access",
  },
  {
    icon: Activity,
    title: "Network Monitoring, Optimization & Managed Services",
    subtitle: "Proactive Performance Management",
  },
];

const highlights = [
  { icon: Network, label: "Enterprise Grade" },
  { icon: Zap, label: "High Performance" },
  { icon: Shield, label: "Security First" },
  { icon: Server, label: "Data Centers" },
  { icon: Wifi, label: "Wireless Solutions" },
  { icon: Cable, label: "Fiber Optic" },
];

export default function EnterpriseNetworkSolutionsPage() {
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
              Enterprise Network{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Solutions
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              We deliver enterprise-grade network infrastructure solutions that power secure, scalable, and high-performance business operations. With decades of combined industry experience, our certified network engineers design, deploy, and manage advanced voice, data, wireless, and security networking solutions for organizations across multiple industries.
            </p>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed mt-4">
              We specialize in end-to-end Enterprise Networking Solutions including LAN/WAN infrastructure, campus and metropolitan fiber optic networks, wireless and mobility solutions, software-defined networking, and secure multi-site connectivity. Our expertise spans traditional routing and switching technologies as well as next-generation network security, high-availability systems, and intelligent network optimization.
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
              Our Enterprise Network{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Solutions
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {subServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className="glass-card rounded-2xl p-6 md:p-8 hover-lift group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-falu/20 flex items-center justify-center flex-shrink-0 group-hover:bg-falu/30 transition-colors">
                    <service.icon className="h-6 w-6 text-falu-light" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] group-hover:text-falu-light transition-colors">
                      {service.title}
                    </h3>
                    <span className="text-falu-light text-xs font-semibold font-[family-name:var(--font-inter)] uppercase tracking-wider">
                      {service.subtitle}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Vendor partnership & closing statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="glass-card rounded-2xl p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-falu/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-falu-light" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
                    We partner with leading global technology vendors to deliver reliable, secure, and future-ready network infrastructures that support digital transformation, cloud adoption, unified communications, and mission-critical business applications.
                  </p>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-falu/20 to-transparent my-6" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-falu/20 flex items-center justify-center flex-shrink-0">
                  <Eye className="h-6 w-6 text-falu-light" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
                    Whether you are building a new enterprise network, upgrading legacy infrastructure, or expanding across multiple locations, Techland provides the expertise and technology required to keep your organization connected, secure, and operational at all times.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
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
                Need a Network Solution?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Let us design and deploy a reliable network infrastructure tailored to your organisation. Get in touch today for a free site assessment and consultation.
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
