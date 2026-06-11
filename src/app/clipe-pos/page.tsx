"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ShoppingCart,
  ArrowRight,
  CheckCircle2,
  Receipt,
  Package,
  Users,
  BarChart3,
  Wifi,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const features = [
  {
    icon: Receipt,
    title: "Sales Processing & Receipts",
    subtitle: "Fast & Accurate Transactions",
    description:
      "Process sales quickly and accurately with Clipe POS. Support for barcode scanning, quick-search product lookup, split payments, and instant receipt generation ensures smooth checkout experiences for both staff and customers, keeping queues short and satisfaction high.",
    items: [
      "Barcode scanning & quick search",
      "Split & multiple payment methods",
      "Instant receipt printing & digital receipts",
      "Refund & exchange processing",
    ],
  },
  {
    icon: Package,
    title: "Real-Time Inventory Tracking",
    subtitle: "Always Know Your Stock",
    description:
      "Keep your inventory accurate in real time with Clipe POS. Every sale automatically updates stock levels, low-stock alerts notify you before items run out, and detailed inventory reports help you make smarter purchasing decisions and reduce waste across all your product lines.",
    items: [
      "Real-time stock level updates",
      "Low-stock & reorder alerts",
      "Multi-location inventory tracking",
      "Supplier & purchase order management",
    ],
  },
  {
    icon: Users,
    title: "Customer Management & Loyalty",
    subtitle: "Build Lasting Relationships",
    description:
      "Build stronger customer relationships with Clipe POS's built-in CRM. Track purchase history, manage customer profiles, and run loyalty programmes that reward repeat business — turning occasional shoppers into loyal customers who keep coming back.",
    items: [
      "Customer profile & purchase history",
      "Loyalty points & reward programmes",
      "Targeted promotions & discounts",
      "Customer communication tools",
    ],
  },
  {
    icon: BarChart3,
    title: "Sales Analytics & Reports",
    subtitle: "Insights That Drive Growth",
    description:
      "Make data-driven decisions with Clipe POS's comprehensive analytics. Track sales trends, identify top-performing products, monitor staff performance, and generate detailed reports that give you full visibility into your business performance — anytime, anywhere.",
    items: [
      "Daily, weekly & monthly sales reports",
      "Product performance analytics",
      "Staff performance tracking",
      "Profit margin analysis",
    ],
  },
  {
    icon: Wifi,
    title: "Offline Capability",
    subtitle: "Never Stop Selling",
    description:
      "Clipe POS works seamlessly even without an internet connection. Process sales, manage inventory, and serve customers offline — all data automatically syncs when your connection is restored, ensuring your business never misses a beat regardless of network conditions.",
    items: [
      "Full offline sales processing",
      "Automatic data sync when online",
      "Local data caching & storage",
      "Seamless online/offline transition",
    ],
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    subtitle: "Protect Your Business",
    description:
      "Clipe POS is built with enterprise-grade security to protect your business and customer data. Role-based access control, encrypted transactions, audit trails, and compliance with payment security standards ensure your operations remain safe, trusted, and legally compliant.",
    items: [
      "Role-based user access control",
      "Encrypted payment processing",
      "Transaction audit trails",
      "PCI-DSS compliance ready",
    ],
  },
];

const highlights = [
  { icon: ShoppingCart, label: "Point of Sale" },
  { icon: Receipt, label: "Fast Checkout" },
  { icon: Package, label: "Inventory" },
  { icon: Users, label: "Customer CRM" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Wifi, label: "Offline Ready" },
];

export default function ClipePOSPage() {
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
              Clipe233 Products
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
              Clipe{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                POS
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              A robust point-of-sale system built for retail businesses, restaurants, and service providers. Clipe POS handles sales transactions, inventory management, customer tracking, and detailed reporting — all in one easy-to-use platform that works online and offline to keep your business running without interruption.
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
                Interested in Clipe POS?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Get in touch to request a demo, discuss pricing, or learn how Clipe POS can streamline your business operations.
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
