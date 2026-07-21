"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Users,
  Send,
  BarChart3,
  CalendarClock,
  Contact,
  Megaphone,
  Mail,
  Smartphone,
  Shield,
  Zap,
  Globe,
  Clock,
  Reply,
  ListChecks,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const features = [
  {
    icon: Send,
    title: "Bulk SMS Messaging",
    subtitle: "Reach Thousands Instantly",
    description:
      "Send SMS messages to thousands of recipients in seconds. Whether you need to notify customers about promotions, send reminders, or broadcast important announcements, Clipe SMS CRM handles high-volume messaging with reliable delivery. Import contacts, compose your message, and hit send — it's that simple.",
    items: [
      "Send to unlimited recipients at once",
      "Personalised messages with merge fields",
      "Flash SMS and Unicode support",
      "Scheduled delivery for optimal timing",
    ],
  },
  {
    icon: Contact,
    title: "Contact & Group Management",
    subtitle: "Organise Your Audience",
    description:
      "Build a structured contact database with smart group management. Import contacts from CSV, create custom groups based on demographics or behaviour, and segment your audience for targeted messaging. Keep your contact list clean with deduplication, validation, and opt-out management built right in.",
    items: [
      "CSV import and manual entry",
      "Custom groups and smart segments",
      "Duplicate detection and removal",
      "Automatic opt-out and compliance",
    ],
  },
  {
    icon: CalendarClock,
    title: "Automated Campaigns",
    subtitle: "Set It and Forget It",
    description:
      "Create automated messaging campaigns that run on their own. Set up drip sequences, birthday messages, appointment reminders, and follow-up campaigns triggered by dates or events. Build customer journeys that nurture relationships while you focus on running your business.",
    items: [
      "Drip campaign sequences",
      "Date-triggered messages",
      "Auto-follow-ups and reminders",
      "Conditional branching workflows",
    ],
  },
  {
    icon: BarChart3,
    title: "Delivery Reports & Analytics",
    subtitle: "Measure What Matters",
    description:
      "Track every message with detailed delivery reports and real-time analytics. See who received, opened, and responded to your messages. Monitor campaign performance, compare results over time, and make data-driven decisions to improve your messaging strategy and maximise engagement.",
    items: [
      "Real-time delivery status tracking",
      "Open and response rate analytics",
      "Campaign comparison reports",
      "Exportable data and dashboards",
    ],
  },
  {
    icon: Megaphone,
    title: "Marketing Campaigns",
    subtitle: "Drive Sales with SMS",
    description:
      "Launch SMS marketing campaigns that get results. With open rates exceeding 98%, SMS is the most effective marketing channel. Create compelling campaigns with Clipe SMS CRM — from promotional offers and flash sales to loyalty programs and product launches — and watch your conversions climb.",
    items: [
      "Promotional broadcasts",
      "Loyalty and reward programs",
      "Flash sale announcements",
      "Personalised offers by segment",
    ],
  },
  {
    icon: Reply,
    title: "Two-Way Messaging",
    subtitle: "Converse, Don't Just Broadcast",
    description:
      "Engage customers with two-way SMS conversations. Receive replies, answer questions, provide support, and build real relationships — all through SMS. Route incoming messages to the right team members, auto-respond to common queries, and keep every conversation organised in one place.",
    items: [
      "Inbound message inbox",
      "Auto-reply and keyword responses",
      "Team routing and assignment",
      "Conversation history per contact",
    ],
  },
];

const useCases = [
  {
    icon: Globe,
    title: "Businesses & Retail",
    description: "Send promotions, order confirmations, and delivery updates directly to customers' phones.",
  },
  {
    icon: Shield,
    title: "Churches & Organisations",
    description: "Keep members informed about events, meetings, and announcements with reliable group messaging.",
  },
  {
    icon: Smartphone,
    title: "Healthcare Providers",
    description: "Send appointment reminders, test results, and health tips to patients via SMS.",
  },
  {
    icon: TrendingUp,
    title: "Financial Services",
    description: "Deliver transaction alerts, payment reminders, and account updates instantly and securely.",
  },
  {
    icon: ListChecks,
    title: "Schools & Education",
    description: "Notify parents about fees, events, attendance, and exam results through automated SMS.",
  },
  {
    icon: Mail,
    title: "NGOs & Government",
    description: "Reach communities with public health alerts, program updates, and emergency notifications.",
  },
];

export default function ClipeSMSCRMPage() {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <MessageSquare className="h-4 w-4 text-falu-light" />
              <span className="text-sm font-semibold text-falu-light font-[family-name:var(--font-inter)]">
                CLIPE CONSULT
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-poppins)]">
              Clipe{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                SMS CRM
              </span>
            </h1>
            <p className="text-xl text-falu-light font-semibold mb-4 font-[family-name:var(--font-inter)]">
              SMS &amp; Customer Relationship Management
            </p>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              Engage your customers where they are — on their phones. Clipe SMS CRM combines the power of bulk SMS
              messaging with smart customer relationship management tools to help you build lasting relationships,
              drive sales, and grow your business.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              {[
                { value: "98%", label: "SMS Open Rate" },
                { value: "5s", label: "Avg. Read Time" },
                { value: "10K+", label: "Messages/Min" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-falu-light font-[family-name:var(--font-poppins)]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
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
              Powerful{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Features
              </span>
            </h2>
            <p className="mt-4 text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] max-w-2xl mx-auto">
              Everything you need to manage contacts, launch campaigns, and track results — all from one platform.
            </p>
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
                        Key Capabilities
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

      {/* Use Cases */}
      <section className="py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-poppins)]">
              Who{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Benefits?
              </span>
            </h2>
            <p className="mt-4 text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] max-w-2xl mx-auto">
              Clipe SMS CRM is built for any organisation that needs to reach people quickly and reliably.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="glass-card rounded-2xl p-6 hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-falu/20 flex items-center justify-center mb-4">
                  <uc.icon className="h-6 w-6 text-falu-light" />
                </div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-2">
                  {uc.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)] leading-relaxed">
                  {uc.description}
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
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="glass-card rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-falu/20 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-falu-light" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
                Start Engaging Your Customers Today
              </h3>
              <p className="text-gray-500 dark:text-silver/70 mb-6 font-[family-name:var(--font-inter)]">
                Request a demo and see how Clipe SMS CRM can transform the way you communicate with your audience.
                From bulk messaging to automated campaigns, everything you need is in one platform.
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
