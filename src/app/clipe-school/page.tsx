"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Shield,
  Settings,
  BookOpen,
  Users,
  UserCheck,
  Cloud,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const modules = [
  {
    icon: Settings,
    title: "Admin Panel",
    subtitle: "Full Institutional Control",
    description:
      "The Admin Panel gives school administrators complete control over every aspect of the institution. From managing user accounts and class routines to overseeing finances, events, and system settings — everything is accessible from a single, intuitive dashboard designed for efficiency and ease of use.",
    items: [
      "Managing user accounts (teacher, student, and parent)",
      "Managing classes and subjects",
      "Managing class routines",
      "Managing exams and grades",
      "Managing exam marks",
      "Sending exam marks via SMS",
      "Managing students' attendance",
      "Managing accounting, income, and expenses",
      "Managing school events",
      "Managing library, dormitory, and transport",
      "Messaging between other users",
      "Managing system settings (general, SMS, and language)",
    ],
  },
  {
    icon: BookOpen,
    title: "Teacher Panel",
    subtitle: "Empower Educators",
    description:
      "The Teacher Panel equips educators with the tools they need to manage their students effectively. From recording exam marks and attendance to sharing study materials, teachers can handle their day-to-day academic responsibilities efficiently — freeing up more time for actual teaching and student engagement.",
    items: [
      "Managing students",
      "Managing exam marks",
      "Provide study materials/files to students",
      "Managing attendance",
    ],
  },
  {
    icon: Users,
    title: "Student Panel",
    subtitle: "Student Self-Service",
    description:
      "The Student Panel gives learners direct access to their academic information anytime, anywhere. Students can view their class routines, check exam marks, track attendance, download study materials, pay invoices online, and communicate with their teachers — all from a simple, mobile-friendly interface.",
    items: [
      "Get class routines",
      "Get exam marks",
      "Get attendance status",
      "Get study materials/files from teacher",
      "Get payment invoices and pay online",
      "Communicate with teacher",
    ],
  },
  {
    icon: UserCheck,
    title: "Parent Panel",
    subtitle: "Stay Connected",
    description:
      "The Parent Panel keeps parents actively involved in their children's education. With real-time access to grades, payment invoices, class routines, and direct messaging with teachers, parents stay informed and engaged — fostering a stronger partnership between home and school that supports student success.",
    items: [
      "Get children's marks",
      "Get children's payment invoices",
      "Get children's class routines",
      "Messaging with teachers",
    ],
  },
];

const highlights = [
  { icon: Settings, label: "Admin Panel" },
  { icon: BookOpen, label: "Teacher Panel" },
  { icon: Users, label: "Student Panel" },
  { icon: UserCheck, label: "Parent Panel" },
  { icon: Cloud, label: "Cloud or On-Premises" },
  { icon: Shield, label: "24x7 Access" },
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
              Managing a school in this modern day requires a robust application that allows you to manage admissions, students, fees, teachers, payroll, facilities, and many other functions from one single system running on one database, so you won&apos;t have to repeatedly duplicate efforts, waste time, and lose money.
            </p>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed mt-4">
              Our school management system is a complete suite of applications that permits you to automate all aspects of your school or college management, from your administrators to teachers, and students and parents. Parents can view or be alerted to absences, grades, assignments, and school events. Students can view their grades, timetable, and assignments, and receive assistance outside of the classroom. Manage all student affairs, human resources, library, transport, hostel, finance, etc. from one efficient system.
            </p>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed mt-4">
              Clipe School deployment is affordable, feature-rich, and user-friendly. It can be deployed in the computer network on your premises (Enterprise Version) or in our cloud infrastructure (web-based) with a monthly subscription. Deploying it in the cloud makes it accessible to all users anywhere in the world; parents will particularly love this feature.
            </p>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed mt-4">
              24x7 access to your administrators, teachers, students, parents, and accountant. The application provides access to all your stakeholders who get to monitor comprehensively. We have also simplified the complexity of user privileges so that you don&apos;t need to worry about them.
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

      {/* Deployment Options */}
      <section className="py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            <div className="glass-card rounded-2xl p-8 text-center hover-lift group">
              <div className="w-14 h-14 rounded-xl bg-falu/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-falu/30 transition-colors">
                <Monitor className="h-7 w-7 text-falu-light" />
              </div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] group-hover:text-falu-light transition-colors">
                Enterprise Version
              </h3>
              <p className="text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)] mt-2 leading-relaxed">
                Deployed on your premises within your computer network. Full control over your infrastructure with one-time licensing and local data storage for maximum privacy and customisation.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 text-center hover-lift group">
              <div className="w-14 h-14 rounded-xl bg-falu/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-falu/30 transition-colors">
                <Cloud className="h-7 w-7 text-falu-light" />
              </div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] group-hover:text-falu-light transition-colors">
                Cloud Version
              </h3>
              <p className="text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)] mt-2 leading-relaxed">
                Hosted on our cloud infrastructure with a monthly subscription. Accessible to all users anywhere in the world — parents will particularly love this feature. No server setup required.
              </p>
            </div>
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
              Clipe School{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Modules
              </span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {modules.map((mod, i) => (
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
                        <mod.icon className="h-7 w-7 text-falu-light" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] group-hover:text-falu-light transition-colors">
                          {mod.title}
                        </h3>
                        <span className="text-falu-light text-sm font-semibold font-[family-name:var(--font-inter)]">
                          {mod.subtitle}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)] leading-relaxed mt-2">
                      {mod.description}
                    </p>
                  </div>
                  <div className="lg:w-80 flex-shrink-0">
                    <div className="glass-card rounded-xl p-6">
                      <span className="text-sm font-semibold text-falu-light font-[family-name:var(--font-inter)] uppercase tracking-wider">
                        Capabilities
                      </span>
                      <div className="mt-4 space-y-3">
                        {mod.items.map((item, j) => (
                          <div
                            key={j}
                            className="flex items-start gap-2 text-sm text-gray-600 dark:text-silver/70 font-[family-name:var(--font-inter)]"
                          >
                            <CheckCircle2 className="h-4 w-4 text-falu-light flex-shrink-0 mt-0.5" />
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
