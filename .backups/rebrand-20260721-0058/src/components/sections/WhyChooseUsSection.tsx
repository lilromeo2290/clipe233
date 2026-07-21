"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Lightbulb,
  ShieldCheck,
  Zap,
  BrainCircuit,
  HeartHandshake,
} from "lucide-react";

const reasons = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We leverage the latest technologies and creative approaches to deliver solutions that are not just functional but truly innovative. Our team stays at the forefront of technological advancement, ensuring your business benefits from cutting-edge tools and methodologies.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "When we commit to a project, we deliver. Our track record of on-time delivery, consistent quality, and dependable support has earned us the trust of businesses and organizations across multiple sectors. You can count on us to be there when it matters most.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description:
      "We understand that time is money. Our agile development processes and efficient project management ensure rapid delivery without compromising quality. From initial consultation to deployment, we keep your project on track and moving forward.",
  },
  {
    icon: BrainCircuit,
    title: "Technical Expertise",
    description:
      "Our team comprises highly skilled engineers, developers, and designers with deep expertise across multiple technology domains. Whether it is custom software, network infrastructure, or digital strategy, we have the knowledge and experience to deliver exceptional results.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Satisfaction",
    description:
      "Your success is our success. We take a client-first approach, listening carefully to your needs, providing transparent communication, and going above and beyond to ensure every solution exceeds expectations. Our long-term client relationships speak to our commitment.",
  },
];

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-falu/3 blur-[150px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-falu-light text-sm font-semibold tracking-wider uppercase font-[family-name:var(--font-inter)]">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
            Why Businesses{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
              Choose Clipe233
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
            We are more than a technology company. We are your strategic
            partner in digital transformation, committed to delivering
            solutions that drive real, measurable business outcomes.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass-card rounded-2xl p-6 text-center hover-lift group"
            >
              <div className="w-16 h-16 rounded-2xl bg-falu/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-falu/30 group-hover:glow-red-sm transition-all duration-300">
                <reason.icon className="h-8 w-8 text-falu-light" />
              </div>
              <h3 className="text-lg font-bold mb-3 font-[family-name:var(--font-poppins)] group-hover:text-falu-light transition-colors">
                {reason.title}
              </h3>
              <p className="text-gray-500 dark:text-silver/60 text-sm font-[family-name:var(--font-inter)] leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
