"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code2,
  Globe,
  Palette,
  Network,
  BrainCircuit,
  Package,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Code2,
    title: "Software Development",
    description:
      "We design and build robust, scalable software solutions that streamline operations and drive business growth. From concept to deployment, our engineering team delivers custom applications that align with your strategic objectives.",
    features: [
      "Web Applications",
      "Mobile Apps",
      "Enterprise Software",
      "Custom Systems",
    ],
    benefits: [
      "Tailored to your business processes",
      "Scalable architecture",
      "Agile development methodology",
      "Post-launch support & maintenance",
    ],
  },
  {
    icon: Globe,
    title: "Website Design & Development",
    description:
      "We create stunning, high-performance websites that captivate audiences and convert visitors into customers. Every site is built with modern technologies, responsive design, and SEO best practices to maximize your online presence.",
    features: [
      "Corporate Websites",
      "E-commerce Platforms",
      "Web Portals",
      "CMS Systems",
    ],
    benefits: [
      "Mobile-first responsive design",
      "SEO optimized structure",
      "Fast loading performance",
      "Easy content management",
    ],
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Our creative team produces visually striking designs that communicate your brand identity with clarity and impact. From logos to comprehensive brand systems, we craft visual assets that resonate with your target audience.",
    features: [
      "Brand Identity & Logo Design",
      "Social Media Graphics",
      "Print Materials",
      "Marketing Collateral",
    ],
    benefits: [
      "Consistent brand messaging",
      "Professional visual identity",
      "Multi-platform design assets",
      "Unlimited revision rounds",
    ],
  },
  {
    icon: Network,
    title: "Networking Installation",
    description:
      "We design, install, and maintain reliable network infrastructure that keeps your business connected and secure. Our certified engineers deliver enterprise-grade networking solutions for organizations of all sizes.",
    features: [
      "LAN/WAN Setup",
      "CCTV Systems",
      "Structured Cabling",
      "Network Security",
    ],
    benefits: [
      "Certified network engineers",
      "24/7 monitoring options",
      "Scalable infrastructure",
      "Security-first approach",
    ],
  },
  {
    icon: BrainCircuit,
    title: "IT Consultancy",
    description:
      "Our experienced consultants provide strategic technology guidance that helps organizations make informed decisions, optimize their IT investments, and navigate the complexities of digital transformation with confidence.",
    features: [
      "Digital Transformation",
      "Technology Audits",
      "Business Automation",
      "Infrastructure Planning",
    ],
    benefits: [
      "Vendor-neutral recommendations",
      "Cost optimization strategies",
      "Risk assessment & mitigation",
      "Implementation roadmap",
    ],
  },
  {
    icon: Package,
    title: "Software & Hardware Supply",
    description:
      "We supply and deploy enterprise-grade software and hardware solutions, ensuring seamless integration with your existing systems. From procurement to installation and ongoing support, we manage the complete technology lifecycle.",
    features: [
      "Enterprise Systems",
      "Hardware & Accessories",
      "Installation & Setup",
      "Ongoing Support",
    ],
    benefits: [
      "Competitive pricing",
      "Genuine licensed products",
      "Professional installation",
      "Warranty & support packages",
    ],
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeService, setActiveService] = useState<number | null>(null);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full bg-falu/3 blur-[150px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-falu-light text-sm font-semibold tracking-wider uppercase font-[family-name:var(--font-inter)]">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
            Comprehensive{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
              Technology Solutions
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
            From custom software development to network infrastructure, we
            provide end-to-end IT services designed to accelerate your
            business growth and digital transformation journey.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              onMouseEnter={() => setActiveService(i)}
              onMouseLeave={() => setActiveService(null)}
              className={`glass-card rounded-2xl p-6 hover-lift group cursor-pointer transition-all duration-500 ${
                activeService === i ? "glow-red" : ""
              }`}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-falu/20 flex items-center justify-center mb-6 group-hover:bg-falu/30 transition-colors">
                <service.icon className="h-7 w-7 text-falu-light" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-poppins)] group-hover:text-falu-light transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 dark:text-silver/60 text-sm font-[family-name:var(--font-inter)] leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {service.features.map((feature, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-2 text-sm text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-falu-light flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button
                variant="ghost"
                className="text-falu-light hover:text-white hover:bg-falu/20 p-0 h-auto font-[family-name:var(--font-inter)] group/btn"
                onClick={() => scrollTo("#contact")}
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-card rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
              Every business is unique. Let us design a tailored technology
              solution that perfectly fits your requirements and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollTo("#contact")}
                className="bg-falu hover:bg-falu-light text-white glow-red-sm hover:glow-red transition-all duration-300 font-[family-name:var(--font-inter)]"
              >
                Request a Quote
              </Button>
              <Button
                onClick={() => scrollTo("#contact")}
                variant="outline"
                className="border-falu/40 text-falu-light hover:bg-falu/10 font-[family-name:var(--font-inter)]"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
