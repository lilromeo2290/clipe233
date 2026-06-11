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
  Monitor,
  Store,
  Tag,
  FileBarChart,
  ScanBarcode,
  Printer,
  PauseCircle,
  LayoutTemplate,
  Zap,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const features = [
  {
    icon: Users,
    title: "Handling Multiple Customers",
    subtitle: "Serve Everyone Seamlessly",
    description:
      "Clipe POS allows you to manage and serve multiple customers simultaneously without confusion or delays. Whether you run a busy retail store, a restaurant, or a multi-counter business, the system keeps each transaction isolated and organised so your staff can deliver fast, accurate service to every customer at the same time.",
    items: [
      "Simultaneous customer transactions",
      "Individual customer tracking per sale",
      "Customer-specific discount support",
      "Purchase history per customer",
    ],
  },
  {
    icon: Store,
    title: "Handling Multiple Stores",
    subtitle: "One System, Many Locations",
    description:
      "Manage all your store locations from a single Clipe POS installation. Stock levels, sales data, and reports are synced across every branch in real time, giving you a unified view of your entire operation. Whether you have two stores or twenty, Clipe POS scales effortlessly with your business.",
    items: [
      "Centralised multi-store management",
      "Real-time stock sync across locations",
      "Per-store sales & performance reports",
      "Unified product & pricing catalogues",
    ],
  },
  {
    icon: Package,
    title: "Simple Stock Management",
    subtitle: "Keep Inventory Under Control",
    description:
      "Clipe POS makes inventory management straightforward and hassle-free. Track product quantities in real time, receive low-stock alerts, and update stock levels automatically with every sale or restock. The intuitive interface means anyone on your team can manage inventory without extensive training.",
    items: [
      "Real-time quantity tracking",
      "Low-stock alerts & notifications",
      "Automatic stock adjustment on sales",
      "Easy restock & adjustment entries",
    ],
  },
  {
    icon: Receipt,
    title: "Register Report",
    subtitle: "Know Your Numbers",
    description:
      "Generate detailed register reports at the end of every shift or trading day. Clipe POS records every transaction, payment method, refund, and discount so you can reconcile your register with confidence. Clear, accurate reports eliminate guesswork and help you spot discrepancies before they become problems.",
    items: [
      "End-of-day register summaries",
      "Payment method breakdowns",
      "Refund & void tracking",
      "Cash drawer reconciliation",
    ],
  },
  {
    icon: Tag,
    title: "Products with Taxes & Discounts",
    subtitle: "Flexible Pricing Made Easy",
    description:
      "Apply taxes and discounts with total flexibility in Clipe POS. You can assign a specific discount to every individual customer, or apply a discount to each sale as needed. Tax rules can be configured per product or product category, ensuring compliance while keeping pricing simple for your staff to manage at the checkout.",
    items: [
      "Per-product tax configuration",
      "Customer-specific discounts",
      "Per-sale discount application",
      "Automatic tax calculation & rounding",
    ],
  },
  {
    icon: FileBarChart,
    title: "Comprehensive Reports",
    subtitle: "Insights That Drive Decisions",
    description:
      "Clipe POS generates detailed reports on customers, product numbers, and monthly statistics for the current year or any previous year. You can also generate client or product reports within a specific date range, giving you the precise data you need to identify trends, plan inventory, and make informed business decisions.",
    items: [
      "Customer & product number reports",
      "Monthly stats — current & prior years",
      "Custom date-range reports",
      "Exportable report formats",
    ],
  },
  {
    icon: ScanBarcode,
    title: "Barcode Scanner Compatible",
    subtitle: "Scan & Go",
    description:
      "Clipe POS is fully compatible with barcode scanners for both products and sales receipts. Simply scan a product barcode to instantly add it to the cart, or scan a receipt barcode to quickly pull up a past transaction for returns or reference. This speeds up checkout and reduces manual entry errors significantly.",
    items: [
      "Product barcode scanning",
      "Receipt barcode lookup",
      "Supports USB & Bluetooth scanners",
      "Instant product lookup & add-to-cart",
    ],
  },
  {
    icon: Printer,
    title: "Print & Save Receipts",
    subtitle: "Professional Transaction Records",
    description:
      "Every sale generates a professional receipt that you can print immediately for the customer or save digitally for your records. Clipe POS supports thermal receipt printers and standard printers, and digital receipts can be stored for future reference, returns processing, or compliance requirements.",
    items: [
      "Thermal & standard printer support",
      "Digital receipt storage",
      "Custom receipt formatting",
      "Receipt reprint capability",
    ],
  },
  {
    icon: PauseCircle,
    title: "Hold Sales Option",
    subtitle: "Pause & Resume Anytime",
    description:
      "Need to pause a transaction mid-sale? Clipe POS lets you place a sale on hold and resume it later without losing any data. This is perfect for situations where a customer needs to grab an additional item, a payment issue needs resolving, or another customer requires urgent attention at the counter.",
    items: [
      "Park & retrieve sales instantly",
      "Unlimited held transactions",
      "No data loss on hold/resume",
      "Priority handling for urgent sales",
    ],
  },
  {
    icon: LayoutTemplate,
    title: "Custom Receipt Header & Footer",
    subtitle: "Brand Every Receipt",
    description:
      "Personalise your receipts with a custom header and footer. Add your business name, logo, contact details, promotional messages, return policies, or thank-you notes. Every receipt that leaves your store becomes a branded touchpoint that reinforces your business identity and keeps customers informed.",
    items: [
      "Custom business name & logo",
      "Contact information & address",
      "Promotional messages & offers",
      "Return policy & legal disclaimers",
    ],
  },
  {
    icon: Zap,
    title: "Optimised for Best Performance",
    subtitle: "Speed You Can Rely On",
    description:
      "Clipe POS is engineered for speed and efficiency. Every action — from scanning a product to generating a report — is optimised to respond instantly, even during peak trading hours with high transaction volumes. No lag, no waiting, just a smooth experience that keeps your checkout lines moving and your customers happy.",
    items: [
      "Instant product lookup & checkout",
      "Fast report generation",
      "Handles high transaction volumes",
      "Low system resource requirements",
    ],
  },
  {
    icon: Smartphone,
    title: "Responsive & Multi-Device",
    subtitle: "Works Everywhere You Do",
    description:
      "Clipe POS is fully responsive and runs on iPads, Android tablets, laptops, and desktop computers. Whether you prefer a touchscreen at the counter or a full keyboard at the back office, the interface adapts beautifully to any screen size. Use it online or deploy it locally — Clipe POS is a truly dynamic product that transforms your business on any device.",
    items: [
      "iPad & Android tablet support",
      "Laptop & desktop compatible",
      "Online or local deployment",
      "Touch-optimised interface",
    ],
  },
];

const highlights = [
  { icon: ShoppingCart, label: "Point of Sale" },
  { icon: Store, label: "Multi-Store" },
  { icon: ScanBarcode, label: "Barcode Scanner" },
  { icon: Smartphone, label: "Multi-Device" },
  { icon: FileBarChart, label: "Reports" },
  { icon: Wifi, label: "Online / Local" },
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
            <div className="max-w-3xl mx-auto space-y-5">
              <p className="text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
                Clipe POS Point of Sale app has a user-friendly interface that everyone can use without difficulty. The POS can be used online, on iPads, Android tablets, or laptops — say goodbye to ugly, expensive, outdated POS systems and enjoy the Clipe POS web interface designed for the modern retailer.
              </p>
              <p className="text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
                Clipe POS can be hosted or deployed locally, making it a dynamic product to transform your business. Whether you operate a single store or manage multiple locations, Clipe POS adapts to your needs with powerful features wrapped in an intuitive interface that your staff will love from day one.
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
                transition={{ duration: 0.5, delay: Math.min(0.15 * i, 0.9) }}
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

          {/* Coming soon note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-center mt-12"
          >
            <p className="text-gray-400 dark:text-silver/40 font-[family-name:var(--font-inter)] text-sm italic">
              And many more features coming in future updates…
            </p>
          </motion.div>
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
                Ready to Transform Your Business?
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Say goodbye to ugly, expensive, outdated POS systems. Get in touch to request a demo, discuss pricing, or learn how Clipe POS can streamline your business operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact">
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
