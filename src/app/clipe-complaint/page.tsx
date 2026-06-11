"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquareWarning,
  ArrowRight,
  CheckCircle2,
  Inbox,
  ArrowLeftRight,
  Users,
  BarChart3,
  Bell,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const features = [
  {
    icon: Inbox,
    title: "Complaint Submission & Tracking",
    subtitle: "Multi-Channel Intake",
    description:
      "Receive complaints from multiple channels — web forms, email, phone, or walk-in — all funnelled into a single centralised system. Clipe Complaint assigns unique tracking IDs, records full complaint details, and provides real-time status updates to both staff and complainants, ensuring nothing falls through the cracks.",
    items: [
      "Multi-channel complaint intake",
      "Unique tracking ID assignment",
      "Real-time status updates",
      "Complainant self-service portal",
    ],
  },
  {
    icon: ArrowLeftRight,
    title: "Automated Routing & Escalation",
    subtitle: "Smart Workflows",
    description:
      "Route complaints to the right department or team member automatically based on category, priority, and urgency. Clipe Complaint's escalation rules ensure that unresolved issues are automatically escalated to supervisors or management within defined timeframes, preventing delays and ensuring accountability.",
    items: [
      "Rule-based auto-routing",
      "Priority & urgency classification",
      "Time-based escalation rules",
      "Supervisor override & reassignment",
    ],
  },
  {
    icon: Users,
    title: "Resolution Workflow Management",
    subtitle: "Structured Resolution Process",
    description:
      "Manage the entire resolution process with structured workflows that guide teams from complaint acknowledgement to closure. Assign tasks, set deadlines, collaborate across departments, and document every action taken — ensuring consistent, transparent, and timely resolution of every complaint.",
    items: [
      "Step-by-step resolution workflow",
      "Task assignment & deadline tracking",
      "Cross-department collaboration",
      "Resolution documentation & notes",
    ],
  },
  {
    icon: Bell,
    title: "Notifications & Communication",
    subtitle: "Keep Everyone Informed",
    description:
      "Keep all stakeholders informed with automated notifications at every stage of the complaint lifecycle. Complainants receive acknowledgements and resolution updates, while staff get alerts for new assignments, approaching deadlines, and escalations — ensuring clear, timely communication throughout the process.",
    items: [
      "Automated acknowledgement emails",
      "Status change notifications",
      "Deadline & escalation alerts",
      "Internal team notifications",
    ],
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics Dashboard",
    subtitle: "Insights for Improvement",
    description:
      "Turn complaint data into actionable insights with Clipe Complaint's analytics dashboard. Track resolution times, identify recurring issues, measure team performance, and spot trends that reveal systemic problems — empowering management to make improvements that reduce complaints and improve customer satisfaction over time.",
    items: [
      "Resolution time analytics",
      "Recurring issue identification",
      "Team performance metrics",
      "Trend analysis & forecasting",
    ],
  },
  {
    icon: Shield,
    title: "Security & Audit Trail",
    subtitle: "Accountability & Transparency",
    description:
      "Every action within Clipe Complaint is logged in a comprehensive audit trail, ensuring full accountability and transparency. Role-based access control protects sensitive data, while detailed logs support investigations, compliance requirements, and management reviews of complaint handling processes.",
    items: [
      "Complete action audit trail",
      "Role-based access control",
      "Data protection & encryption",
      "Compliance-ready reporting",
    ],
  },
];

const highlights = [
  { icon: MessageSquareWarning, label: "Complaint Management" },
  { icon: Inbox, label: "Multi-Channel" },
  { icon: ArrowLeftRight, label: "Auto-Routing" },
  { icon: Users, label: "Team Collaboration" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Shield, label: "Auditable" },
];

export default function ClipeComplaintPage() {
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
                Complaint
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              A centralised complaint management platform that helps organisations track, manage, and resolve customer complaints efficiently. Clipe Complaint provides a structured workflow from complaint submission to resolution, ensuring accountability, transparency, and improved customer satisfaction across your operations.
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
                Interested in Clipe Complaint?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Get in touch to request a demo, discuss pricing, or learn how Clipe Complaint can improve your complaint handling processes.
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
