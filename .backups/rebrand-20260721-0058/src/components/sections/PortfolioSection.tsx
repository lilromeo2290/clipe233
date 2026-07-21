"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ExternalLink,
  Filter,
  Code2,
  Globe,
  Network,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Software",
  "Websites",
  "Networking",
];

const projects = [
  {
    title: "School Management System",
    category: "Software",
    description:
      "A comprehensive school management platform with student enrollment, grading, attendance tracking, and parent portal for a network of 15 schools in the Volta Region.",
    tags: ["React", "Node.js", "PostgreSQL"],
    icon: Code2,
  },
  {
    title: "Church Community Portal",
    category: "Websites",
    description:
      "An interactive church website with event management, sermon streaming, donation integration, and member directory serving over 2,000 congregants.",
    tags: ["Next.js", "Tailwind CSS", "Stripe"],
    icon: Globe,
  },
  {
    title: "Enterprise Network Infrastructure",
    category: "Networking",
    description:
      "Full LAN/WAN setup with structured cabling, VPN configuration, firewall deployment, and CCTV installation for a multi-story corporate office building.",
    tags: ["Cisco", "CCTV", "VPN", "Security"],
    icon: Network,
  },
  {
    title: "E-Commerce Platform",
    category: "Websites",
    description:
      "A feature-rich e-commerce platform with product catalog, payment processing via Paystack, inventory management, and analytics dashboard for a retail chain.",
    tags: ["Next.js", "Paystack", "Firebase"],
    icon: Globe,
  },
  {
    title: "Healthcare Booking App",
    category: "Software",
    description:
      "A patient appointment scheduling and telemedicine application enabling healthcare facilities to manage bookings, virtual consultations, and medical records securely.",
    tags: ["React Native", "Node.js", "HIPAA"],
    icon: Code2,
  },
];

export default function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-falu/3 blur-[150px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-falu-light text-sm font-semibold tracking-wider uppercase font-[family-name:var(--font-inter)]">
            Our Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
            Projects That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
              Define Excellence
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
            Explore our portfolio of successfully delivered projects across
            software development, web design, branding, and network
            infrastructure. Each project represents our commitment to quality
            and innovation.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 font-[family-name:var(--font-inter)] ${
                activeCategory === cat
                  ? "bg-falu text-white glow-red-sm"
                  : "glass text-gray-500 dark:text-silver/70 hover:text-white hover:bg-gray-100 dark:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              layout
              className="glass-card rounded-2xl p-6 hover-lift group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-falu/20 flex items-center justify-center flex-shrink-0 group-hover:bg-falu/30 transition-colors">
                  <project.icon className="h-6 w-6 text-falu-light" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] group-hover:text-falu-light transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-falu/10 text-falu-light font-[family-name:var(--font-inter)]">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-silver/60 text-sm font-[family-name:var(--font-inter)] leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-2 py-1 rounded text-xs text-gray-500 dark:text-silver/50 border border-gray-200 dark:border-white/10 font-[family-name:var(--font-inter)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
