"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Database,
  Cpu,
  Layers,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const subServices = [
  {
    icon: Code2,
    title: "Custom Software Development",
    subtitle: "Built for Your Business",
    description:
      "We design and build robust, scalable custom software solutions that streamline operations and drive business growth. From concept to deployment, our engineering team delivers tailor-made applications that align with your strategic objectives, using modern architectures and industry best practices to ensure long-term reliability and performance.",
    features: [
      "Requirements analysis & design",
      "Agile development methodology",
      "Modern tech stack & architecture",
      "Quality assurance & testing",
    ],
  },
  {
    icon: Layers,
    title: "Web Application Development",
    subtitle: "Powerful Online Platforms",
    description:
      "We build dynamic, feature-rich web applications that deliver exceptional user experiences across all devices. Whether you need a customer portal, a management dashboard, or a complex web platform, we develop scalable solutions using modern frameworks and cloud-native architectures that perform under pressure.",
    features: [
      "Single-page & progressive web apps",
      "Real-time & collaborative features",
      "API-first architecture",
      "Cloud-native deployment",
    ],
  },
  {
    icon: Database,
    title: "Database Design & Management",
    subtitle: "Data-Driven Solutions",
    description:
      "We design and manage efficient, secure database systems that form the backbone of your software applications. From relational databases to NoSQL solutions, we architect data layers that ensure fast access, data integrity, and scalability as your business grows and your data requirements evolve.",
    features: [
      "Database architecture & modelling",
      "SQL & NoSQL solutions",
      "Data migration & integration",
      "Performance optimization & indexing",
    ],
  },
  {
    icon: GitBranch,
    title: "API Development & Integration",
    subtitle: "Connect Your Systems",
    description:
      "We develop and integrate APIs that enable seamless communication between your software systems, third-party services, and external partners. Our API solutions are designed for security, performance, and reliability, ensuring your applications work together efficiently and your data flows freely across your organisation.",
    features: [
      "RESTful & GraphQL API design",
      "Third-party service integration",
      "API gateway & management",
      "Authentication & security",
    ],
  },
  {
    icon: Cpu,
    title: "Enterprise Software Solutions",
    subtitle: "Scale with Confidence",
    description:
      "We develop enterprise-grade software solutions that handle complex business processes, high user volumes, and demanding performance requirements. Our enterprise applications are built with scalability, security, and maintainability at their core, ensuring they grow with your organisation and deliver value for years to come.",
    features: [
      "ERP & CRM systems",
      "Workflow & process automation",
      "Multi-tenant architecture",
      "Enterprise security & compliance",
    ],
  },
  {
    icon: Shield,
    title: "Software Maintenance & Support",
    subtitle: "Continuous Improvement",
    description:
      "Keep your software running smoothly and evolving with your business through our comprehensive maintenance and support services. We provide ongoing bug fixes, performance optimization, feature enhancements, and security updates that ensure your applications remain reliable, secure, and aligned with your changing business needs.",
    features: [
      "Bug fixes & troubleshooting",
      "Performance optimization",
      "Feature enhancements & updates",
      "Security patches & monitoring",
    ],
  },
];

const highlights = [
  { icon: Code2, label: "Custom Development" },
  { icon: Zap, label: "Agile Process" },
  { icon: Shield, label: "Secure & Reliable" },
  { icon: Database, label: "Data Driven" },
  { icon: Layers, label: "Scalable Apps" },
  { icon: Cpu, label: "Enterprise Ready" },
];

export default function SoftwareDevelopmentPage() {
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
              What We Do
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
              Software / Application{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Development
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              We design and build robust, scalable software solutions that streamline operations and drive business growth. From concept to deployment, our engineering team delivers custom applications that align with your strategic objectives. Whether you need a web application, a mobile app, an enterprise system, or a custom integration, we have the expertise to bring your vision to life with clean code, modern architectures, and a focus on long-term maintainability.
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
              Our Software Development{" "}
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
                Have a Software Project?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Let us bring your software vision to life with clean code, modern architecture, and a focus on delivering real business value. Get in touch today.
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
