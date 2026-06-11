"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Smartphone,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Palette,
  Code2,
  Layers,
  RefreshCw,
  Cloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const subServices = [
  {
    icon: Palette,
    title: "Custom Mobile Solutions",
    subtitle: "Enhanced User Experience",
    description:
      "We develop custom mobile applications designed around user experience, performance, and long-term scalability. Every app we build is tailored to your specific business requirements and user expectations, ensuring an intuitive interface that keeps users engaged and drives meaningful interactions with your brand.",
    features: [
      "Custom UI/UX design & prototyping",
      "Native iOS & Android development",
      "User-centric interface design",
      "Brand-aligned visual identity",
    ],
  },
  {
    icon: Layers,
    title: "Cross-Platform Development",
    subtitle: "Scalable Architecture",
    description:
      "We build cross-platform mobile applications using modern frameworks that enable a single codebase to run seamlessly on both Android and iOS. This approach reduces development time and cost while maintaining native-like performance and ensuring your app reaches the widest possible audience without compromise.",
    features: [
      "React Native & Flutter development",
      "Single codebase for iOS & Android",
      "Native-like performance & feel",
      "Consistent design across platforms",
    ],
  },
  {
    icon: RefreshCw,
    title: "Cost Efficiency",
    subtitle: "Smart Development",
    description:
      "We optimise the development process to deliver high-quality mobile applications within budget and on schedule. By leveraging cross-platform technologies, reusable components, and agile development methodologies, we ensure you get maximum value from your investment without sacrificing quality or functionality.",
    features: [
      "Agile development methodology",
      "Reusable component architecture",
      "Efficient project management",
      "Transparent pricing & timelines",
    ],
  },
  {
    icon: Code2,
    title: "App Modernisation & Maintenance",
    subtitle: "Keep Your App Current",
    description:
      "We help you keep your existing mobile applications up to date with the latest platform requirements, design trends, and security standards. Whether it is migrating a legacy app to a modern framework, adding new features, or performing routine maintenance, we ensure your app continues to deliver value over time.",
    features: [
      "Legacy app migration & upgrades",
      "OS compatibility updates",
      "Feature enhancements & additions",
      "Performance optimization",
    ],
  },
  {
    icon: Cloud,
    title: "Backend & API Integration",
    subtitle: "Connected Experiences",
    description:
      "We design and integrate robust backend systems and APIs that power your mobile applications with real-time data, authentication, push notifications, and seamless third-party integrations. Our backend solutions are built for reliability, scalability, and security to support your app as it grows.",
    features: [
      "Custom API development",
      "Cloud backend infrastructure",
      "Push notification services",
      "Third-party service integration",
    ],
  },
];

const highlights = [
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Zap, label: "High Performance" },
  { icon: Shield, label: "Secure & Reliable" },
  { icon: Palette, label: "User-Centric Design" },
  { icon: Layers, label: "Cross-Platform" },
  { icon: Cloud, label: "Cloud Connected" },
];

export default function MobileAppDevelopmentPage() {
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
              Mobile App{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Development
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              Mobile technology continues to redefine how businesses connect with customers and deliver services. Our mobile app development service helps organisations create intuitive and scalable mobile applications that enhance engagement and accessibility.
            </p>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed mt-4">
              We create innovative and user-centric mobile applications for Android and iOS platforms, helping businesses reach customers anytime and anywhere.
            </p>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed mt-4">
              We develop custom applications designed around user experience, performance, and long-term scalability. From concept development to deployment, we ensure each solution aligns with your business needs and user expectations.
            </p>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed mt-4">
              Our goal is to help organisations extend their digital presence beyond traditional platforms and into the hands of their users in real time.
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
              Our Mobile App Development{" "}
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
                Ready to Build Your Mobile App?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Let us create a powerful mobile application that extends your digital presence and connects you with your users in real time. Get in touch today for a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact">
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
