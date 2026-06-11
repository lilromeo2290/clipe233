"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  HeartPulse,
  ArrowRight,
  CheckCircle2,
  Users,
  Calendar,
  CreditCard,
  FileText,
  Shield,
  Pill,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const features = [
  {
    icon: Users,
    title: "Patient Records & Health History",
    subtitle: "Comprehensive Patient Data",
    description:
      "Maintain complete and accurate patient records with Clipe Medic. From personal details and medical history to diagnoses, treatments, and follow-ups, every piece of patient information is securely stored and instantly accessible — enabling healthcare providers to deliver informed, continuous care.",
    items: [
      "Digital patient profiles",
      "Complete medical history",
      "Diagnosis & treatment records",
      "Lab results & imaging attachments",
    ],
  },
  {
    icon: Calendar,
    title: "Appointment Scheduling & Management",
    subtitle: "Efficient Calendar System",
    description:
      "Manage patient appointments effortlessly with Clipe Medic's intelligent scheduling system. Reduce no-shows with automated reminders, optimise doctor schedules, and handle walk-ins and follow-ups seamlessly — ensuring your clinic runs on time and patients receive timely care.",
    items: [
      "Online & walk-in scheduling",
      "Automated SMS & email reminders",
      "Doctor availability management",
      "Recurring appointment support",
    ],
  },
  {
    icon: CreditCard,
    title: "Billing & Insurance Processing",
    subtitle: "Streamlined Financial Workflows",
    description:
      "Simplify billing and insurance claims with Clipe Medic's integrated financial module. Generate invoices, process insurance claims, track outstanding balances, and manage payments — all from a single platform that reduces administrative burden and accelerates revenue collection.",
    items: [
      "Automated invoice generation",
      "Insurance claim processing",
      "Payment tracking & receipts",
      "Outstanding balance management",
    ],
  },
  {
    icon: Pill,
    title: "Prescription & Pharmacy Integration",
    subtitle: "Connected Care Delivery",
    description:
      "Write and manage prescriptions digitally with Clipe Medic. prescriptions are securely transmitted to integrated pharmacies, reducing errors and wait times. Track prescription history, manage refills, and ensure patients receive the right medications promptly and safely.",
    items: [
      "Digital prescription writing",
      "Pharmacy integration & transmission",
      "Prescription history tracking",
      "Drug interaction alerts",
    ],
  },
  {
    icon: FileText,
    title: "Reporting & Compliance",
    subtitle: "Regulatory Ready",
    description:
      "Stay compliant with healthcare regulations using Clipe Medic's built-in reporting tools. Generate clinical, operational, and financial reports that meet regulatory requirements, support audits, and provide the transparency needed to maintain trust and accountability in your healthcare operations.",
    items: [
      "Clinical & operational reports",
      "Regulatory compliance templates",
      "Audit trail & data logging",
      "Custom report generation",
    ],
  },
  {
    icon: Shield,
    title: "Security & Data Protection",
    subtitle: "Patient Privacy First",
    description:
      "Clipe Medic prioritises patient data security with industry-leading protection measures. End-to-end encryption, role-based access, audit trails, and compliance with healthcare data protection standards ensure that sensitive medical information remains confidential and secure at all times.",
    items: [
      "End-to-end data encryption",
      "Role-based access control",
      "Audit trail & activity logging",
      "Healthcare compliance standards",
    ],
  },
];

const highlights = [
  { icon: HeartPulse, label: "Medical Practice" },
  { icon: Users, label: "Patient Records" },
  { icon: Calendar, label: "Appointments" },
  { icon: CreditCard, label: "Billing" },
  { icon: Pill, label: "Prescriptions" },
  { icon: Shield, label: "Secure" },
];

export default function ClipeMedicPage() {
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
              Clipe233 Products
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
              Clipe{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Medic
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              A powerful medical practice management solution designed for clinics, hospitals, and healthcare providers. Clipe Medic streamlines patient records, appointments, billing, and prescriptions — enabling healthcare professionals to focus on patient care while maintaining accurate and secure medical records.
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
                Interested in Clipe Medic?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Get in touch to request a demo, discuss pricing, or learn how Clipe Medic can transform your medical practice.
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
