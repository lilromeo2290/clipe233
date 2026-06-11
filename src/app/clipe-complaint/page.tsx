"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquareWarning,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Search,
  GitBranch,
  Bell,
  CheckCheck,
  BarChart3,
  UserCog,
  Star,
  BookOpen,
  FileCheck,
  Target,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Scale,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const modules = [
  {
    icon: ClipboardList,
    title: "Complaint Registration Module",
    subtitle: "Multi-Channel Intake & Registration",
    description:
      "This module allows customers or staff to submit complaints through various channels such as web portals, mobile apps, email, phone calls, or walk-in requests. Every submission is automatically categorised, prioritised, and assigned a unique complaint reference number for easy tracking. Supporting documents or images can be attached to provide full context, ensuring that complaint handlers have all the information they need from the very start.",
    items: [
      "Complaint submission forms",
      "Complaint categorisation",
      "Priority assignment",
      "Attachment of supporting documents or images",
      "Automatic complaint reference number generation",
    ],
  },
  {
    icon: Search,
    title: "Complaint Tracking Module",
    subtitle: "Real-Time Status Monitoring",
    description:
      "Enables customers and administrators to monitor the status of complaints from submission to resolution. Every status change is logged and visible in real time, giving complainants confidence that their issue is being handled while providing administrators with a clear overview of all active complaints. Powerful search and filtering options, along with complaint reference number tracking, make it easy to locate any complaint instantly.",
    items: [
      "Real-time status updates",
      "Complaint history tracking",
      "Search and filtering options",
      "Tracking using complaint reference numbers",
    ],
  },
  {
    icon: GitBranch,
    title: "Workflow and Assignment Module",
    subtitle: "Automated Routing & Escalation",
    description:
      "Automatically routes complaints to the appropriate department, officer, or support team for action. The system's intelligent allocation engine considers complaint category, priority, and staff workload to assign each case to the right handler. Escalation management ensures that unresolved issues are raised to supervisors within defined timeframes, while Service Level Agreement (SLA) monitoring tracks compliance and task scheduling keeps everything on track.",
    items: [
      "Complaint allocation and reassignment",
      "Escalation management",
      "Service Level Agreement (SLA) monitoring",
      "Task scheduling and notifications",
    ],
  },
  {
    icon: Bell,
    title: "Communication and Notification Module",
    subtitle: "Keep Everyone Informed",
    description:
      "Facilitates communication between customers and complaint handlers through multiple channels. Email notifications, SMS alerts, and in-app notifications ensure that every stakeholder is kept informed at every stage of the complaint lifecycle. Customer feedback requests are sent automatically after resolution, and internal messaging allows teams to coordinate seamlessly without leaving the system.",
    items: [
      "Email notifications",
      "SMS alerts",
      "In-app notifications",
      "Customer feedback requests",
      "Internal messaging",
    ],
  },
  {
    icon: CheckCheck,
    title: "Resolution Management Module",
    subtitle: "Investigation, Actions & Closure",
    description:
      "Handles investigation, corrective actions, and complaint closure in a structured, transparent process. Resolution recording captures every step taken, while corrective action tracking ensures that agreed remedies are implemented and verified. Approval workflows provide oversight before closure, and customer confirmation of resolution ensures that complainants are satisfied before a case is marked as closed.",
    items: [
      "Resolution recording",
      "Corrective action tracking",
      "Approval workflows",
      "Complaint closure management",
      "Customer confirmation of resolution",
    ],
  },
  {
    icon: BarChart3,
    title: "Reporting and Analytics Module",
    subtitle: "Insights for Continuous Improvement",
    description:
      "Provides insights into complaint trends and organisational performance through a comprehensive analytics suite. Complaint statistics dashboards offer a high-level view, while resolution time analysis, department performance reports, and trend and root-cause analysis drill down into the details. All reports are exportable in PDF, Excel, and CSV formats, making it easy to share findings with stakeholders and leadership.",
    items: [
      "Complaint statistics dashboards",
      "Resolution time analysis",
      "Department performance reports",
      "Trend and root-cause analysis",
      "Exportable reports (PDF, Excel, CSV)",
    ],
  },
  {
    icon: UserCog,
    title: "User and Role Management Module",
    subtitle: "Secure Access Control",
    description:
      "Controls system access based on user responsibilities, ensuring that each team member sees only the tools and data relevant to their role. User account management is straightforward, with role-based access control and granular permissions that protect sensitive complaint data. Authentication and security controls safeguard the system against unauthorised access, maintaining the integrity and confidentiality of all complaint records.",
    items: [
      "User account management",
      "Role-based access control",
      "Permissions management",
      "Authentication and security controls",
    ],
  },
  {
    icon: Star,
    title: "Feedback and Satisfaction Module",
    subtitle: "Measure Customer Experience",
    description:
      "Measures customer satisfaction after complaint resolution to close the feedback loop. Customer surveys and rating systems capture the complainant's experience, while feedback collection tools gather qualitative insights. Service quality assessment reports help management understand how well the organisation is meeting customer expectations and identify opportunities for improvement in complaint handling processes.",
    items: [
      "Customer surveys",
      "Rating systems",
      "Feedback collection",
      "Service quality assessment",
    ],
  },
  {
    icon: BookOpen,
    title: "Knowledge Base Module",
    subtitle: "Self-Service & Faster Resolution",
    description:
      "Stores common issues and solutions to improve response times and empower customers to resolve issues independently. Frequently Asked Questions (FAQs), a searchable solution repository, and knowledge articles provide a self-service support option that reduces the volume of repeat complaints and equips support teams with proven resolution paths for known issues.",
    items: [
      "Frequently Asked Questions (FAQs)",
      "Solution repository",
      "Searchable knowledge articles",
      "Self-service support options",
    ],
  },
  {
    icon: FileCheck,
    title: "Audit and Compliance Module",
    subtitle: "Accountability & Regulatory Compliance",
    description:
      "Maintains detailed records of all complaint-related activities for accountability and regulatory compliance. Activity logs and audit trails capture every action taken on every complaint, creating an unbroken chain of custody. Compliance reporting meets regulatory requirements, while document management ensures that all supporting materials are securely stored and easily retrievable for audits, reviews, and investigations.",
    items: [
      "Activity logs",
      "Audit trails",
      "Compliance reporting",
      "Document management",
    ],
  },
];

const objectives = [
  { icon: Star, title: "Improve Customer Satisfaction & Trust", description: "Ensure every complaint is handled with professionalism and care, building lasting customer confidence." },
  { icon: Clock, title: "Ensure Timely Resolution", description: "SLA monitoring and escalation rules guarantee that no complaint goes unresolved beyond acceptable timeframes." },
  { icon: MessageSquareWarning, title: "Enhance Communication", description: "Multi-channel notifications keep customers and support teams connected at every stage of the process." },
  { icon: FileCheck, title: "Maintain Audit Records", description: "Comprehensive logging and audit trails support accountability, regulatory compliance, and management reviews." },
  { icon: TrendingUp, title: "Identify Trends for Improvement", description: "Analytics and root-cause analysis reveal recurring issues, enabling continuous improvement of products and services." },
];

const benefits = [
  { icon: Zap, title: "Faster Complaint Resolution", description: "Automated routing, escalation rules, and structured workflows ensure that complaints are resolved quickly and efficiently, reducing wait times and customer frustration." },
  { icon: Star, title: "Improved Customer Experience", description: "Transparent processes, real-time tracking, and proactive communication show customers that their concerns matter, turning complaints into opportunities to strengthen relationships." },
  { icon: TrendingUp, title: "Increased Operational Efficiency", description: "Centralised complaint handling eliminates duplication, reduces manual effort, and streamlines processes across departments, freeing up resources for higher-value work." },
  { icon: Scale, title: "Better Regulatory Compliance", description: "Complete audit trails, compliance reporting, and document management ensure that your organisation meets regulatory requirements and is always prepared for inspections." },
  { icon: Lightbulb, title: "Enhanced Decision-Making", description: "Comprehensive analytics, trend analysis, and root-cause identification give leadership the data-driven insights needed to make informed decisions and implement systemic improvements." },
  { icon: Shield, title: "Continuous Improvement", description: "Feedback collection, satisfaction measurement, and recurring issue identification create a virtuous cycle of improvement that elevates products, services, and customer trust over time." },
];

const highlights = [
  { icon: MessageSquareWarning, label: "Complaint Management" },
  { icon: ClipboardList, label: "Registration" },
  { icon: Search, label: "Tracking" },
  { icon: GitBranch, label: "Workflow" },
  { icon: BarChart3, label: "Analytics" },
  { icon: FileCheck, label: "Audit & Compliance" },
  { icon: BookOpen, label: "Knowledge Base" },
];

export default function ClipeComplaintPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const objectivesRef = useRef(null);
  const objectivesInView = useInView(objectivesRef, { once: true, margin: "-100px" });
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
                CMS
              </span>
            </h1>
            <div className="max-w-3xl mx-auto space-y-5">
              <p className="text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
                Clipe CMS (A Complaint Management System) is a software application designed to receive, track, manage, resolve, and monitor customer complaints efficiently. It helps organisations improve customer satisfaction by ensuring that complaints are addressed promptly, transparently, and professionally.
              </p>
              <p className="text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
                The system centralises complaint handling processes, enabling businesses to monitor service quality, identify recurring issues, and implement corrective actions — transforming complaints into opportunities for continuous improvement.
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

      {/* Key Objectives */}
      <section ref={objectivesRef} className="py-20 lg:py-28 bg-gray-50/50 dark:bg-black/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={objectivesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-poppins)]">
              Key{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Objectives
              </span>
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)]">
              The core goals that drive Clipe CMS&apos;s design and functionality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {objectives.map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={objectivesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(0.1 * i, 0.5) }}
                className="glass-card rounded-2xl p-6 hover-lift group text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-falu/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-falu/30 transition-colors">
                  <obj.icon className="h-7 w-7 text-falu-light" />
                </div>
                <h3 className="text-base font-bold mb-2 font-[family-name:var(--font-poppins)] group-hover:text-falu-light transition-colors">
                  {obj.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)] leading-relaxed">
                  {obj.description}
                </p>
              </motion.div>
            ))}
          </div>
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
              Ten comprehensive modules covering every aspect of complaint management, from registration through resolution and beyond.
            </p>
          </motion.div>

          <div className="space-y-8">
            {modules.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(0.12 * i, 1.0) }}
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
                        Features
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
                CMS
              </span>
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)]">
              A well-designed Complaint Management System that serves as a vital tool for organisations seeking to strengthen customer relationships, improve service delivery, and maintain high standards of accountability and transparency.
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
                Ready to Transform Complaint Handling?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Clipe CMS is a well-designed Complaint Management System that serves as a vital tool for organisations seeking to strengthen customer relationships, improve service delivery, and maintain high standards of accountability and transparency. Get in touch to request a demo.
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
