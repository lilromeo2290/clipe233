"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  BrainCircuit,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Target,
  TrendingUp,
  Settings,
  Lightbulb,
  GraduationCap,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const subServices = [
  {
    icon: TrendingUp,
    title: "Digital Transformation Strategy",
    subtitle: "Modernise Your Business",
    description:
      "We help organisations navigate the complexities of digital transformation by developing clear, actionable strategies that align technology investments with business objectives. Our consultants assess your current digital maturity, identify opportunities for improvement, and create a roadmap that guides your transformation journey from vision to execution.",
    features: [
      "Digital maturity assessment",
      "Technology roadmap development",
      "Change management planning",
      "ROI modelling & business case",
    ],
  },
  {
    icon: Shield,
    title: "Technology Audits & Assessments",
    subtitle: "Know Where You Stand",
    description:
      "Our comprehensive technology audits provide a thorough evaluation of your existing IT infrastructure, systems, and processes. We identify strengths, weaknesses, risks, and opportunities, delivering actionable recommendations that help you optimise your technology stack, reduce costs, and improve operational efficiency across your organisation.",
    features: [
      "Infrastructure & systems audit",
      "Security & compliance assessment",
      "Performance & scalability review",
      "Cost optimization analysis",
    ],
  },
  {
    icon: Settings,
    title: "Business Process Automation",
    subtitle: "Work Smarter, Not Harder",
    description:
      "We identify and automate repetitive, time-consuming business processes using modern technology solutions. From workflow automation and document management to customer relationship management and enterprise resource planning, we design automation strategies that free up your team to focus on high-value activities that drive growth.",
    features: [
      "Workflow automation design",
      "CRM & ERP implementation",
      "Document management systems",
      "Integration & API development",
    ],
  },
  {
    icon: Target,
    title: "IT Infrastructure Planning",
    subtitle: "Build for the Future",
    description:
      "We design scalable, resilient IT infrastructure architectures that support your current operations and future growth. Our infrastructure planning services cover cloud migration, hybrid environments, disaster recovery, and high-availability systems, ensuring your technology foundation is robust enough to handle whatever comes next.",
    features: [
      "Cloud migration strategy",
      "Hybrid & multi-cloud architecture",
      "Disaster recovery planning",
      "Capacity & scalability planning",
    ],
  },
  {
    icon: Lightbulb,
    title: "Vendor-Neutral Technology Advisory",
    subtitle: "Unbiased Expertise",
    description:
      "We provide vendor-neutral recommendations that put your business interests first. Our consultants evaluate technology solutions from all major vendors, comparing features, pricing, support, and compatibility to help you select the right tools and platforms for your specific needs, without any bias or conflict of interest.",
    features: [
      "Technology selection & evaluation",
      "Vendor comparison & negotiation",
      "Contract & SLA review",
      "Implementation oversight",
    ],
  },
  {
    icon: GraduationCap,
    title: "Professional IT Training",
    subtitle: "Empower Your Workforce",
    description:
      "We deliver structured training programs that enhance technical knowledge and improve workforce productivity. Our training covers a wide range of IT disciplines — from networking and cybersecurity to cloud computing and software development — tailored to the skill levels and objectives of your team.",
    features: [
      "Customised training programs",
      "Networking & cybersecurity courses",
      "Cloud & software development training",
      "Certification preparation",
    ],
  },
  {
    icon: Users,
    title: "IT Staffing Solutions",
    subtitle: "Skilled Professionals on Demand",
    description:
      "We support organizations with staffing solutions that connect them with experienced IT professionals for both short-term and long-term needs. Whether you need a specialist for a specific project or ongoing IT support, we match you with the right talent to keep your operations running smoothly.",
    features: [
      "Short-term & contract staffing",
      "Permanent IT recruitment",
      "Project-based specialists",
      "Skills assessment & vetting",
    ],
  },
];

const highlights = [
  { icon: BrainCircuit, label: "Strategic Guidance" },
  { icon: Zap, label: "Actionable Plans" },
  { icon: Shield, label: "Risk Mitigation" },
  { icon: GraduationCap, label: "IT Training" },
  { icon: Users, label: "Staffing Solutions" },
  { icon: Lightbulb, label: "Vendor Neutral" },
];

export default function ITConsultancyPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-falu/5 blur-[150px]" />
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
              IT Consultancy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                / Training
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              In most cases, company owners find themselves at crossroads with their existing solutions. Clipe233 Engineers offer support to enable small and large businesses to develop and adopt various solutions, systems, networks, software, and security policies. We first ensure that we understand your business and goals. Using our expertise and knowledge, we design IT support services based on the client&apos;s needs. We offer guidance that change based on business growth to ensure that our customers get adequate support.
            </p>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed mt-4">
              Professional IT Training — We deliver structured training programs that enhance technical knowledge and improve workforce productivity. In parallel, we support organizations with staffing solutions that connect them with experienced IT professionals for both short-term and long-term needs.
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
              Our IT Consultancy / Training{" "}
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
                Need Expert IT Guidance?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Let our consultants help you make the right technology decisions for your business. Get in touch today for a free initial consultation.
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
