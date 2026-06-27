"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Package,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  GraduationCap,
  ShoppingCart,
  HeartPulse,
  Pill,
  MessageSquareWarning,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const products = [
  {
    icon: GraduationCap,
    title: "Clipe School",
    subtitle: "School Management System",
    href: "/clipe-school",
    description:
      "A comprehensive school management system designed to streamline administrative tasks, student enrollment, grading, attendance tracking, and fee management for educational institutions of all sizes. Built with modern technology and an intuitive interface, it empowers schools to operate efficiently and focus on delivering quality education.",
    features: [
      "Student enrollment & records management",
      "Attendance tracking & reporting",
      "Grading & transcript generation",
      "Fee management & payment tracking",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Clipe POS",
    subtitle: "Point of Sale Solution",
    href: "/clipe-pos",
    description:
      "A robust point-of-sale system built for retail businesses, restaurants, and service providers. Clipe POS handles sales transactions, inventory management, customer tracking, and detailed reporting — all in one easy-to-use platform that works online and offline to keep your business running without interruption.",
    features: [
      "Sales processing & receipt generation",
      "Real-time inventory tracking",
      "Customer management & loyalty",
      "Detailed sales analytics & reports",
    ],
  },
  {
    icon: HeartPulse,
    title: "Clipe Medic",
    subtitle: "Medical Practice Management",
    href: "/clipe-medic",
    description:
      "A powerful medical practice management solution designed for clinics, hospitals, and healthcare providers. Clipe Medic streamlines patient records, appointments, billing, and prescriptions — enabling healthcare professionals to focus on patient care while maintaining accurate and secure medical records.",
    features: [
      "Patient records & health history",
      "Appointment scheduling & management",
      "Billing & insurance processing",
      "Prescription & pharmacy integration",
    ],
  },
  {
    icon: Pill,
    title: "Clipe Pharma",
    subtitle: "Pharmacy Management System",
    href: "/clipe-pharma",
    description:
      "An end-to-end pharmacy management system that helps pharmaceutical businesses manage inventory, prescriptions, sales, and regulatory compliance with ease. Clipe Pharma is designed to streamline operations, reduce errors, and ensure that your pharmacy runs efficiently while meeting all industry standards.",
    features: [
      "Drug inventory & expiry tracking",
      "Prescription processing & verification",
      "Sales & supplier management",
      "Regulatory compliance & reporting",
    ],
  },
  {
    icon: MessageSquareWarning,
    title: "Clipe Complaint",
    subtitle: "Complaint Management Platform",
    href: "/clipe-complaint",
    description:
      "A centralised complaint management platform that helps organisations track, manage, and resolve customer complaints efficiently. Clipe Complaint provides a structured workflow from complaint submission to resolution, ensuring accountability, transparency, and improved customer satisfaction across your operations.",
    features: [
      "Complaint submission & tracking",
      "Automated routing & escalation",
      "Resolution workflow management",
      "Reporting & analytics dashboard",
    ],
  },
  {
    icon: MessageSquare,
    title: "Clipe SMS CRM",
    subtitle: "SMS & Customer Relationship Management",
    href: "/clipe-sms-crm",
    description:
      "A powerful SMS-based Customer Relationship Management platform that helps businesses engage customers through bulk messaging, automated campaigns, and contact management. Clipe SMS CRM combines the reach of SMS with smart CRM tools to boost customer retention, drive sales, and streamline communication — all from one intuitive dashboard.",
    features: [
      "Bulk SMS & scheduled messaging",
      "Contact & group management",
      "Automated campaigns & follow-ups",
      "Delivery reports & analytics",
    ],
  },
];

const highlights = [
  { icon: GraduationCap, label: "Clipe School" },
  { icon: ShoppingCart, label: "Clipe POS" },
  { icon: HeartPulse, label: "Clipe Medic" },
  { icon: Pill, label: "Clipe Pharma" },
  { icon: MessageSquareWarning, label: "Clipe Complaint" },
  { icon: MessageSquare, label: "Clipe SMS CRM" },
  { icon: Shield, label: "Secure & Reliable" },
];

export default function ProductsPage() {
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
              Clipe233 Engineers
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Products
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              Beyond services, Clipe233 Engineers builds ready-to-deploy software products designed to solve real business challenges. Our products are reliable, secure, easy-to-use, and scalable — crafted with the same quality and attention to detail that defines everything we do.
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

      {/* Products */}
      <section ref={ref} className="py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-poppins)]">
              Explore Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Products
              </span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {products.map((product, i) => (
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
                        <product.icon className="h-7 w-7 text-falu-light" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] group-hover:text-falu-light transition-colors">
                          {product.title}
                        </h3>
                        <span className="text-falu-light text-sm font-semibold font-[family-name:var(--font-inter)]">
                          {product.subtitle}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)] leading-relaxed mt-2">
                      {product.description}
                    </p>
                    <a
                      href={product.href}
                      className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-falu-light hover:text-falu transition-colors font-[family-name:var(--font-inter)]"
                    >
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <div className="lg:w-80 flex-shrink-0">
                    <div className="glass-card rounded-xl p-6">
                      <span className="text-sm font-semibold text-falu-light font-[family-name:var(--font-inter)] uppercase tracking-wider">
                        Key Features
                      </span>
                      <div className="mt-4 space-y-3">
                        {product.features.map((feature, j) => (
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
                Interested in Our Products?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Get in touch to learn more about our products, request a demo, or discuss how we can customise a solution for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact">
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
