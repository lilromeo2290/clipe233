"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Network,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Server,
  Wifi,
  Cable,
  Lock,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const subServices = [
  {
    icon: Network,
    title: "LAN/WAN Design & Implementation",
    subtitle: "Core Routing & Switching Solutions",
    description:
      "We design, install, and configure Local Area Networks (LAN) and Wide Area Networks (WAN) that provide reliable, high-speed connectivity across your organisation. Our certified engineers deliver enterprise-grade networking solutions tailored to your operational requirements, ensuring seamless communication and data flow between all points of your business.",
    features: [
      "Network topology design & planning",
      "Structured cabling & rack installation",
      "Switch & router configuration",
      "VLAN setup & traffic management",
    ],
  },
  {
    icon: Wifi,
    title: "Secure Wireless & Mobility Networks",
    subtitle: "Enterprise-Grade Wireless Solutions",
    description:
      "Deploy high-performance wireless networks that provide seamless coverage across your entire facility. From office buildings to large campuses, our wireless solutions deliver fast, reliable connectivity for all your devices, enabling mobility and flexibility without compromising on speed or security.",
    features: [
      "Wi-Fi site surveys & planning",
      "Enterprise access point deployment",
      "Mesh network configuration",
      "Guest network segregation",
    ],
  },
  {
    icon: Cable,
    title: "Fiber Optic & Structured Cabling",
    subtitle: "High-Bandwidth Infrastructure",
    description:
      "We deploy fiber optic backbone networks and structured cabling systems that form the physical foundation of your network infrastructure. Our certified cabling technicians ensure every cable run meets industry standards for performance, reliability, and future scalability.",
    features: [
      "Fiber optic installation & splicing",
      "Cat6/Cat6a structured cabling",
      "Cable management & labeling",
      "Certiﬁed testing & documentation",
    ],
  },
  {
    icon: Shield,
    title: "Network Security & Segmentation",
    subtitle: "Defense-in-Depth Architecture",
    description:
      "Protect your business from cyber threats with our comprehensive network security solutions. We implement multi-layered security architectures including firewalls, intrusion detection systems, VPNs, and access control policies that safeguard your critical data and infrastructure.",
    features: [
      "Firewall deployment & management",
      "Intrusion detection & prevention",
      "VPN & secure remote access",
      "Network segmentation & zero trust",
    ],
  },
  {
    icon: Server,
    title: "Server Room & Data Centre Setup",
    subtitle: "Mission-Critical Environments",
    description:
      "We design and build server rooms and data centre environments that house your critical IT infrastructure with maximum reliability and efficiency. From climate control and power management to rack systems and cable management, we create environments that keep your servers running optimally around the clock.",
    features: [
      "Server rack & cabinet installation",
      "Power management & UPS systems",
      "Climate control & cooling solutions",
      "Cable management & labeling",
    ],
  },
  {
    icon: Activity,
    title: "Network Monitoring & Managed Services",
    subtitle: "Proactive Performance Management",
    description:
      "Keep your network infrastructure running at peak performance with our proactive monitoring and managed services. We provide 24/7 monitoring, regular health checks, firmware updates, performance optimization, and rapid response troubleshooting to minimise downtime.",
    features: [
      "24/7 monitoring & alerting",
      "Regular health checks & updates",
      "Rapid response troubleshooting",
      "Performance optimization & reporting",
    ],
  },
];

const highlights = [
  { icon: Network, label: "Enterprise Grade" },
  { icon: Zap, label: "High Performance" },
  { icon: Shield, label: "Security First" },
  { icon: Server, label: "Data Centres" },
  { icon: Wifi, label: "Wireless Solutions" },
  { icon: Cable, label: "Fiber Optic" },
];

export default function NetworkingSolutionsPage() {
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
              What We Do
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
              Networking{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Solutions
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              Planning, Designing, and Implementing a network or an upgrade is an intimidating task even for established companies with an IT department. Clipe233 creates customized networking solutions designed around your unique business needs. We provide reliable networking services, including network design, installation, configuration, and maintenance, ensuring secure and seamless communication within organizations.
            </p>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed mt-4">
              We offer flexible networking services that are mandatory for the success of any firm. Our stable solutions are coupled with delivering better performance. Further, our scalable network solutions can be tailor-made based on the changing business needs.
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
              Our Networking{" "}
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
                Need a Network Solution?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Let us design and deploy a reliable network infrastructure tailored to your organisation. Get in touch today for a free site assessment and consultation.
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
