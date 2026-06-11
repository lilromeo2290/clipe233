"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Users,
  BookOpen,
  CreditCard,
  Calendar,
  BarChart3,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const features = [
  {
    icon: Users,
    title: "Student Enrollment & Records",
    subtitle: "Centralised Student Data",
    description:
      "Manage the entire student lifecycle from admission to graduation. Clipe School provides a centralised platform for enrolling students, maintaining academic and personal records, and tracking progress throughout their educational journey. All data is securely stored and easily accessible for authorised staff.",
    items: [
      "Online & offline enrollment",
      "Student profile management",
      "Academic history tracking",
      "Document & certificate storage",
    ],
  },
  {
    icon: Calendar,
    title: "Attendance Tracking & Reporting",
    subtitle: "Real-Time Attendance Data",
    description:
      "Track student and staff attendance with ease using Clipe School's automated attendance system. Generate detailed reports, identify attendance patterns, and receive alerts for chronic absenteeism — all in real time, helping institutions maintain accountability and improve student outcomes.",
    items: [
      "Daily & period-based attendance",
      "Automated absence notifications",
      "Attendance trend analytics",
      "Parent portal integration",
    ],
  },
  {
    icon: BookOpen,
    title: "Grading & Transcript Generation",
    subtitle: "Accurate Academic Records",
    description:
      "Simplify the grading process with Clipe School's flexible grading system. Support for multiple grading schemes, automated GPA calculations, and one-click transcript generation ensure that academic records are accurate, consistent, and ready whenever they are needed.",
    items: [
      "Customisable grading scales",
      "Automated GPA calculation",
      "Report card generation",
      "Official transcript export",
    ],
  },
  {
    icon: CreditCard,
    title: "Fee Management & Payment Tracking",
    subtitle: "Financial Administration",
    description:
      "Streamline fee collection and financial management with Clipe School's integrated fee module. Set up fee structures, track payments, send reminders for outstanding balances, and generate comprehensive financial reports that keep your institution's finances organised and transparent.",
    items: [
      "Flexible fee structure setup",
      "Online & offline payment tracking",
      "Automated balance reminders",
      "Financial reporting & receipts",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting Dashboard",
    subtitle: "Data-Driven Decisions",
    description:
      "Gain valuable insights into your institution's performance with Clipe School's analytics dashboard. Visualise enrollment trends, academic performance, financial data, and attendance metrics — empowering administrators to make informed, data-driven decisions that improve outcomes across the board.",
    items: [
      "Enrollment & demographic analytics",
      "Academic performance trends",
      "Financial overview & forecasting",
      "Custom report builder",
    ],
  },
  {
    icon: Shield,
    title: "Security & Access Control",
    subtitle: "Protect Sensitive Data",
    description:
      "Clipe School is built with security at its core. Role-based access control, data encryption, audit logs, and secure authentication ensure that sensitive student and institutional data is protected at all times, meeting regulatory compliance requirements and giving administrators peace of mind.",
    items: [
      "Role-based access control",
      "Data encryption at rest & in transit",
      "Audit trail & activity logging",
      "Two-factor authentication",
    ],
  },
];

const highlights = [
  { icon: GraduationCap, label: "School Management" },
  { icon: Users, label: "Student Records" },
  { icon: Calendar, label: "Attendance" },
  { icon: BookOpen, label: "Grading" },
  { icon: CreditCard, label: "Fee Tracking" },
  { icon: Shield, label: "Secure" },
];

export default function ClipeSchoolPage() {
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
                School
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              A comprehensive school management system designed to streamline administrative tasks, student enrollment, grading, attendance tracking, and fee management for educational institutions of all sizes. Built with modern technology and an intuitive interface, it empowers schools to operate efficiently and focus on delivering quality education.
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
                Interested in Clipe School?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Get in touch to request a demo, discuss pricing, or learn how Clipe School can be customised for your institution.
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
