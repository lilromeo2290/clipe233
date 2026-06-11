"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  HeartPulse,
  ArrowRight,
  CheckCircle2,
  Users,
  BedDouble,
  Scissors,
  Pill,
  FlaskConical,
  FileBarChart,
  Settings,
  UserCog,
  Database,
  Stethoscope,
  BarChart3,
  ShieldCheck,
  Globe,
  ClipboardCheck,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const modules = [
  {
    icon: BedDouble,
    title: "Patient Admission Module",
    subtitle: "Streamlined Admissions & Discharges",
    description:
      "Manage the entire patient admission and discharge workflow from a single module. Record patient demographics, assign wards and beds, track admission status, and process discharges with full billing integration. The module ensures that no bed stays unassigned and every patient transition is logged for accurate record-keeping and smooth handovers between departments.",
    items: [
      "Patient demographics & registration",
      "Ward & bed assignment management",
      "Admission status tracking",
      "Discharge processing & billing",
    ],
  },
  {
    icon: Scissors,
    title: "Operation Theatre Management Module",
    subtitle: "Surgical Scheduling & Tracking",
    description:
      "Plan, schedule, and manage all surgical procedures with the Operation Theatre Management Module. Track theatre availability, assign surgical teams, manage pre-operative checklists, and record post-operative notes — ensuring that every operation runs efficiently and that theatre time is utilised optimally without scheduling conflicts or resource shortfalls.",
    items: [
      "Surgical scheduling & calendar",
      "Theatre availability tracking",
      "Surgical team assignment",
      "Pre- & post-operative records",
    ],
  },
  {
    icon: Pill,
    title: "Pharmacy Module",
    subtitle: "Sales & Stock Management",
    description:
      "Handle pharmacy sales and stock management directly within Clipe Medic. Dispense medications against prescriptions, track stock levels in real time, manage expiry dates, and generate pharmacy income reports. The module ensures that drug usage is properly monitored and that pharmaceutical supplies are always available when needed, reducing waste and preventing stockouts.",
    items: [
      "Prescription-based dispensing",
      "Real-time stock level tracking",
      "Expiry date management & alerts",
      "Pharmacy sales & income reports",
    ],
  },
  {
    icon: FlaskConical,
    title: "Laboratory Module",
    subtitle: "Testing & Results Management",
    description:
      "Manage all laboratory and testing operations with the Laboratory Module. Log test requests, track sample processing, record results, and deliver reports to doctors and patients. The module integrates with the patient admission and pharmacy modules, ensuring that test results feed directly into treatment decisions and billing, creating a seamless diagnostic workflow.",
    items: [
      "Test request logging & tracking",
      "Sample processing management",
      "Results recording & reporting",
      "Laboratory income reporting",
    ],
  },
  {
    icon: FileBarChart,
    title: "Reports Module",
    subtitle: "Comprehensive Revenue & Operational Reports",
    description:
      "Generate virtually every report needed for efficient hospital management. The Reports Module produces categorised income reports covering admissions, operations and procedures, pharmacy sales, and laboratory income. High-level executive revenue reports are available on a daily, monthly, and yearly basis, giving hospital authorities the data they need to develop comprehensive health care policies and make informed strategic decisions.",
    items: [
      "Admission & operations income reports",
      "Pharmacy & laboratory income reports",
      "Daily, monthly & yearly executive reports",
      "Custom report generation",
    ],
  },
  {
    icon: Settings,
    title: "Settings & Configuration Module",
    subtitle: "Tailor the System to Your Facility",
    description:
      "Configure Clipe Medic to match your facility's specific workflows, pricing structures, department setups, and operational rules. The Settings & Configuration Module lets administrators define wards, services, fee schedules, and operational parameters so the system works exactly the way your hospital or clinic operates — without forcing you to adapt to rigid, one-size-fits-all software.",
    items: [
      "Ward & department configuration",
      "Fee schedule & pricing setup",
      "Service & procedure definitions",
      "Workflow rule customisation",
    ],
  },
  {
    icon: UserCog,
    title: "Users Management Module",
    subtitle: "Role-Based Access & Responsibilities",
    description:
      "Control who can access what within Clipe Medic through the Users Management Module. Create different user groups with their own responsibilities and permission levels, ensuring that doctors, nurses, pharmacists, lab technicians, and administrators each see only the tools and data relevant to their role. This protects patient confidentiality, reduces errors, and keeps your system organised and secure.",
    items: [
      "User account creation & management",
      "Group-based responsibility assignment",
      "Role-based permission levels",
      "Activity logging per user",
    ],
  },
  {
    icon: Database,
    title: "Database Backup & Restore Module",
    subtitle: "Protect Your Data",
    description:
      "Safeguard your hospital's critical data with the Database Backup & Restore Module. Schedule automatic backups, perform manual backups before major changes, and restore data quickly in the event of hardware failure, accidental deletion, or system migration. All modules are well-documented and come with a development guide, making it easy for your IT team to manage and maintain the system.",
    items: [
      "Scheduled automatic backups",
      "Manual backup on demand",
      "Quick data restore capability",
      "Development guide & documentation",
    ],
  },
];

const benefits = [
  {
    icon: Stethoscope,
    title: "Easy Access to Doctors' Data",
    description:
      "Generate varied records based on demographics, gender, age, and more. This is especially beneficial at ambulatory (outpatient) points, enhancing continuity of care. Internet-based access also improves the ability to remotely access such data, enabling doctors to review patient information from anywhere at any time.",
  },
  {
    icon: BarChart3,
    title: "Decision Support for Hospital Authorities",
    description:
      "Clipe Medic serves as a decision support system for hospital authorities, providing the data and insights needed for developing comprehensive health care policies. With detailed revenue and operational reports always at hand, leadership can make evidence-based decisions that improve patient outcomes and financial sustainability.",
  },
  {
    icon: ClipboardCheck,
    title: "Efficient & Accurate Administration",
    description:
      "Achieve efficient and accurate administration of finance, patient diet, engineering, and distribution of medical aid. Clipe Medic helps hospital administrators view a broad picture of hospital growth, identify areas for improvement, and ensure that resources are allocated where they are needed most.",
  },
  {
    icon: Pill,
    title: "Improved Drug Usage Monitoring",
    description:
      "Monitor drug usage and study effectiveness across your facility. This leads to the reduction of adverse drug interactions while promoting more appropriate pharmaceutical utilisation. Clipe Medic's pharmacy module tracks every dispensed medication, making it easy to identify patterns, flag concerns, and optimise formulary decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Enhanced Information Integrity",
    description:
      "Reduce transcription errors and eliminate duplication of information entries. Clipe Medic ensures that data is entered once and flows accurately throughout the system, preventing the inconsistencies and mistakes that arise from manual, paper-based record-keeping across multiple departments.",
  },
  {
    icon: Cpu,
    title: "Easy to Use & Error-Free",
    description:
      "Hospital software is easy to use and eliminates errors caused by handwriting. New technology computer systems give perfect performance to pull up information from a server or cloud servers. Clipe Medic's intuitive interface means staff can be trained quickly, and the system's reliability ensures that critical patient data is always available when needed.",
  },
];

const highlights = [
  { icon: HeartPulse, label: "Hospital Management" },
  { icon: BedDouble, label: "Admissions" },
  { icon: Scissors, label: "Operation Theatre" },
  { icon: Pill, label: "Pharmacy" },
  { icon: FlaskConical, label: "Laboratory" },
  { icon: FileBarChart, label: "Reports" },
  { icon: Database, label: "Backup & Restore" },
];

export default function ClipeMedicPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const benefitsRef = useRef(null);
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-100px" });

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
            <div className="max-w-3xl mx-auto space-y-5">
              <p className="text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
                Advanced management software for hospitals, clinics, and doctors&apos; offices. Clipe Medic (Hospital Management Information System) is a complete hospital/medical centre automation solution covering all the processes that medical facilities have.
              </p>
              <p className="text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
                From Patient Admissions &amp; Discharges, Operation Theatre Management, Pharmacy Sales &amp; Stock Management, Laboratory &amp; Testing Management, Doctors/Staff Management, Patient Accounts Management, and Comprehensive Reporting — Clipe Medic generates categorised income reports such as admissions, operations/procedures, pharmacy sales, laboratory income reports, and high-level executive revenue reports on a daily, monthly, and yearly basis.
              </p>
            </div>
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

      {/* Modules */}
      <section ref={ref} className="py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-poppins)]">
              System{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Modules
              </span>
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)]">
              All modules are well-documented and come with the development guide, making implementation and customisation straightforward.
            </p>
          </motion.div>

          <div className="space-y-8">
            {modules.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(0.15 * i, 0.9) }}
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

      {/* Benefits */}
      <section ref={benefitsRef} className="py-20 lg:py-28 bg-gray-50/50 dark:bg-black/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-poppins)]">
              Benefits of Clipe{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Medic
              </span>
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)]">
              A Hospital Management System designed to transform every aspect of your medical facility&apos;s operations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(0.1 * i, 0.6) }}
                className="glass-card rounded-2xl p-8 hover-lift group"
              >
                <div className="w-14 h-14 rounded-xl bg-falu/20 flex items-center justify-center mb-5 group-hover:bg-falu/30 transition-colors">
                  <benefit.icon className="h-7 w-7 text-falu-light" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-poppins)] group-hover:text-falu-light transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)] leading-relaxed">
                  {benefit.description}
                </p>
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
                Ready to Modernise Your Hospital?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Get in touch to request a demo, discuss pricing, or learn how Clipe Medic can automate and streamline your hospital or medical centre operations.
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
