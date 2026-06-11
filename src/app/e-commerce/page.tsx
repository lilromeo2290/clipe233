"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ShoppingCart,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  CreditCard,
  Package,
  BarChart3,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const subServices = [
  {
    icon: Store,
    title: "Custom E-Commerce Website Development",
    subtitle: "Tailored Online Stores",
    description:
      "We build fully customised e-commerce websites designed to showcase your products and convert visitors into paying customers. Every store is built with modern technologies, responsive design, and SEO best practices to maximise your online sales potential and deliver a seamless shopping experience across all devices.",
    features: [
      "Custom store design & development",
      "Responsive & mobile-first layouts",
      "SEO-optimised product pages",
      "Fast loading & performance tuned",
    ],
  },
  {
    icon: CreditCard,
    title: "Payment Gateway Integration",
    subtitle: "Secure Transactions",
    description:
      "We integrate reliable and secure payment gateways that enable your customers to pay conveniently using their preferred methods. From mobile money and local payment solutions to international card processors, we ensure every transaction is encrypted, compliant, and frictionless.",
    features: [
      "Mobile money integration (MTN, Vodafone, etc.)",
      "Card payment processing (Visa, Mastercard)",
      "PayPal & international gateways",
      "Secure SSL & PCI compliance",
    ],
  },
  {
    icon: Package,
    title: "Inventory & Order Management",
    subtitle: "Streamlined Operations",
    description:
      "Manage your products, stock levels, and orders efficiently with our integrated inventory and order management systems. We set up tools that give you real-time visibility into your inventory, automate order processing, and help you fulfil customer orders accurately and on time.",
    features: [
      "Real-time stock tracking",
      "Automated order processing",
      "Shipping & fulfilment integration",
      "Low-stock alerts & reporting",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics & Business Intelligence",
    subtitle: "Data-Driven Growth",
    description:
      "Gain valuable insights into your customers, sales trends, and business performance with our analytics and reporting solutions. We implement tracking, dashboards, and reporting tools that help you make informed decisions, optimise your marketing spend, and grow your revenue.",
    features: [
      "Sales analytics & reporting",
      "Customer behaviour tracking",
      "Conversion rate optimization",
      "Marketing ROI dashboards",
    ],
  },
  {
    icon: Shield,
    title: "E-Commerce Security & Compliance",
    subtitle: "Protect Your Business",
    description:
      "We implement robust security measures to protect your online store, customer data, and financial transactions from cyber threats. Our security solutions include SSL certificates, fraud detection, data encryption, and compliance with industry standards to give you and your customers peace of mind.",
    features: [
      "SSL certificates & encryption",
      "Fraud detection & prevention",
      "Data protection & GDPR compliance",
      "Regular security audits",
    ],
  },
];

const highlights = [
  { icon: ShoppingCart, label: "Online Stores" },
  { icon: Zap, label: "Fast & Reliable" },
  { icon: Shield, label: "Secure Payments" },
  { icon: CreditCard, label: "Multiple Gateways" },
  { icon: Package, label: "Inventory Mgmt" },
  { icon: BarChart3, label: "Analytics" },
];

export default function ECommercePage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-falu/5 blur-[150px]" />
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
              E-Commerce{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Solutions
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              Take your business online and reach customers beyond borders with our comprehensive e-commerce solutions. We design, develop, and deploy fully functional online stores that are secure, scalable, and optimised for conversions. Whether you are launching your first online store or upgrading an existing platform, we deliver e-commerce experiences that drive sales and build customer loyalty.
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
              Our E-Commerce{" "}
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
                Ready to Sell Online?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Let us build you a powerful online store that drives sales and grows your business. Get in touch today for a free consultation.
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
