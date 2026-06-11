"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Pill,
  ArrowRight,
  CheckCircle2,
  Package,
  FileText,
  ShoppingCart,
  BarChart3,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const features = [
  {
    icon: Package,
    title: "Drug Inventory & Expiry Tracking",
    subtitle: "Never Lose Track of Stock",
    description:
      "Manage your entire drug inventory with precision using Clipe Pharma. Track stock levels in real time, monitor expiry dates with automated alerts, and prevent costly losses from expired products. Batch tracking and lot management ensure full traceability from supplier to patient.",
    items: [
      "Real-time stock level monitoring",
      "Automated expiry date alerts",
      "Batch & lot tracking",
      "Multi-location inventory management",
    ],
  },
  {
    icon: FileText,
    title: "Prescription Processing & Verification",
    subtitle: "Accurate Dispensing",
    description:
      "Process prescriptions quickly and accurately with Clipe Pharma's verification system. Validate prescriptions against patient records, check for drug interactions and allergies, and maintain a complete audit trail of every dispensing event — reducing errors and ensuring patient safety at all times.",
    items: [
      "Digital prescription intake",
      "Drug interaction & allergy checks",
      "Dispensing verification workflow",
      "Complete dispensing audit trail",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Sales & Supplier Management",
    subtitle: "Streamlined Procurement",
    description:
      "Handle pharmacy sales and supplier relationships from a single platform. Clipe Pharma manages point-of-sale transactions, supplier orders, purchase tracking, and vendor performance — helping you maintain optimal stock levels while minimising costs and delivery delays.",
    items: [
      "Point-of-sale transaction processing",
      "Supplier order & purchase management",
      "Vendor performance tracking",
      "Automated reorder point calculations",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Controlled Substance Management",
    subtitle: "Regulatory Compliance",
    description:
      "Safely manage controlled and scheduled substances with Clipe Pharma's dedicated compliance module. Track every movement of controlled drugs, maintain required records, generate regulatory reports, and ensure your pharmacy meets all legal obligations for handling sensitive medications.",
    items: [
      "Controlled drug register",
      "Movement tracking & documentation",
      "Regulatory report generation",
      "Dual-verification dispensing",
    ],
  },
  {
    icon: BarChart3,
    title: "Reporting & Business Analytics",
    subtitle: "Data-Driven Pharmacy Management",
    description:
      "Gain deep insights into your pharmacy's performance with Clipe Pharma's analytics and reporting tools. Track sales trends, identify profitable product lines, monitor inventory turnover, and generate financial and operational reports that help you make smarter business decisions.",
    items: [
      "Sales & revenue analytics",
      "Inventory turnover reports",
      "Profitability analysis by product",
      "Custom report generation",
    ],
  },
  {
    icon: Shield,
    title: "Security & Regulatory Compliance",
    subtitle: "Industry Standards Ready",
    description:
      "Clipe Pharma is designed to meet the strict regulatory requirements of the pharmaceutical industry. Role-based access control, encrypted data storage, audit trails, and compliance reporting tools ensure your pharmacy operates within legal frameworks while protecting sensitive patient and business data.",
    items: [
      "Role-based access & permissions",
      "Data encryption & secure storage",
      "Full audit trail & logging",
      "Regulatory compliance reporting",
    ],
  },
];

const highlights = [
  { icon: Pill, label: "Pharmacy Management" },
  { icon: Package, label: "Inventory Control" },
  { icon: FileText, label: "Prescriptions" },
  { icon: AlertTriangle, label: "Controlled Drugs" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Shield, label: "Compliant" },
];

export default function ClipePharmaPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-falu/5 blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-falu/3 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-falu-light text-sm font-semibold tracking-wider uppercase font-[family-name:var(--font-inter)]">
              Clipe233 Products
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
              Clipe{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Pharma
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              An end-to-end pharmacy management system that helps pharmaceutical businesses manage inventory, prescriptions, sales, and regulatory compliance with ease. Clipe Pharma is designed to streamline operations, reduce errors, and ensure that your pharmacy runs efficiently while meeting all industry standards.
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

      {/* Features */}
      <section ref={ref} className="py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-poppins)]">
              Key{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Features
              </span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {features.map((feature, i) => (
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
                        <feature.icon className="h-7 w-7 text-falu-light" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] group-hover:text-falu-light transition-colors">
                          {feature.title}
                        </h3>
                        <span className="text-falu-light text-sm font-semibold font-[family-name:var(--font-inter)]">
                          {feature.subtitle}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)] leading-relaxed mt-2">
                      {feature.description}
                    </p>
                  </div>
                  <div className="lg:w-80 flex-shrink-0">
                    <div className="glass-card rounded-xl p-6">
                      <span className="text-sm font-semibold text-falu-light font-[family-name:var(--font-inter)] uppercase tracking-wider">
                        What&apos;s Included
                      </span>
                      <div className="mt-4 space-y-3">
                        {feature.items.map((item, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-silver/70 font-[family-name:var(--font-inter)]"
                          >
                            <CheckCircle2 className="h-4 w-4 text-falu-light flex-shrink-0" />
                            {item}
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
                Interested in Clipe Pharma?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Get in touch to request a demo, discuss pricing, or learn how Clipe Pharma can optimise your pharmacy operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/#contact">
                  <Button
                    size="lg"
                    className="bg-falu hover:bg-falu-light text-white glow-red-sm hover:glow-red transition-all duration-300 font-[family-name:var(--font-inter)]"
                  >
                    Request a Demo
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
