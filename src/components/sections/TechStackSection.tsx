"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  {
    name: "React",
    category: "Frontend",
    color: "#61DAFB",
  },
  {
    name: "Node.js",
    category: "Backend",
    color: "#339933",
  },
  {
    name: "Python",
    category: "Backend / AI",
    color: "#3776AB",
  },
  {
    name: "PHP",
    category: "Backend",
    color: "#777BB4",
  },
  {
    name: "MySQL",
    category: "Database",
    color: "#4479A1",
  },
  {
    name: "Firebase",
    category: "Cloud / BaaS",
    color: "#FFCA28",
  },
  {
    name: "Linux",
    category: "Infrastructure",
    color: "#FCC624",
  },
  {
    name: "Cisco",
    category: "Networking",
    color: "#0076D6",
  },
  {
    name: "Next.js",
    category: "Fullstack",
    color: "#FFFFFF",
  },
  {
    name: "TypeScript",
    category: "Language",
    color: "#3178C6",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    color: "#06B6D4",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    color: "#4169E1",
  },
];

export default function TechStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-falu/2 blur-[120px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-falu-light text-sm font-semibold tracking-wider uppercase font-[family-name:var(--font-inter)]">
            Technology Stack
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
            Powered by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
              Modern Tech
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
            We build solutions using industry-leading technologies and
            frameworks, ensuring performance, scalability, and long-term
            maintainability for every project we deliver.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass-card rounded-xl p-5 text-center group cursor-pointer"
            >
              {/* Tech icon placeholder with first letter */}
              <div
                className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center font-bold text-lg font-[family-name:var(--font-space-grotesk)] transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${tech.color}15`,
                  color: tech.color,
                  border: `1px solid ${tech.color}30`,
                }}
              >
                {tech.name.charAt(0)}
              </div>
              <h4 className="text-sm font-semibold font-[family-name:var(--font-poppins)] mb-1 group-hover:text-falu-light transition-colors">
                {tech.name}
              </h4>
              <span className="text-xs text-gray-300 dark:text-silver/40 font-[family-name:var(--font-inter)]">
                {tech.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
