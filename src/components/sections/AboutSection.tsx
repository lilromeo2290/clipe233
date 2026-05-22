"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Target,
  Eye,
  Heart,
  Lightbulb,
  Shield,
  Zap,
  Users,
  Award,
} from "lucide-react";

const timelineItems = [
  {
    year: "2016",
    title: "Founded as Clipe Technologies",
    description:
      "Clipe Technologies (Clipetech) was established on April 20, 2016, with a vision to deliver innovative technology solutions to businesses in Ghana's Volta Region and beyond. Starting with a small but passionate team, the company focused on software development and IT support services.",
  },
  {
    year: "2018",
    title: "Expanded Service Portfolio",
    description:
      "The company expanded its offerings to include website design, graphic design, and networking installation services. This growth allowed Clipe Technologies to serve a wider range of clients including schools, churches, and small businesses.",
  },
  {
    year: "2020",
    title: "Digital Transformation Push",
    description:
      "In response to the global shift towards digital operations, Clipe Technologies intensified its focus on digital business solutions, helping organizations transition to cloud-based systems and remote work infrastructure during challenging times.",
  },
  {
    year: "2022",
    title: "Enterprise Solutions & Consulting",
    description:
      "Launched a dedicated IT consultancy division, providing strategic technology audits, infrastructure planning, and business automation services to SMEs and institutional clients across multiple regions in Ghana.",
  },
  {
    year: "2025",
    title: "Rebranded as Clipe233 Engineers",
    description:
      "Marking a significant milestone, the company officially rebranded to Clipe233 Engineers, reflecting its evolved identity, expanded engineering capabilities, and commitment to delivering world-class technology solutions rooted in African excellence.",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace cutting-edge technologies and creative approaches to solve complex business challenges, constantly pushing the boundaries of what is possible.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We operate with transparency, honesty, and ethical standards in every project, building lasting trust with our clients and partners.",
  },
  {
    icon: Zap,
    title: "Excellence",
    description:
      "We are committed to delivering exceptional quality in every solution we build, ensuring reliability, performance, and user satisfaction.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We believe in the power of teamwork, working closely with our clients to understand their needs and co-create solutions that drive real impact.",
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description:
      "Our clients are at the center of everything we do. We listen, adapt, and deliver personalized solutions that exceed expectations.",
  },
  {
    icon: Award,
    title: "African Excellence",
    description:
      "We take pride in our roots, showcasing African tech talent on the global stage and building solutions that address local and continental challenges.",
  },
];

const teamMembers = [
  {
    name: "Leadership Team",
    role: "Strategic Direction",
    description:
      "Our leadership brings together decades of combined experience in technology, engineering, and business strategy to guide Clipe233 Engineers toward its vision.",
  },
  {
    name: "Engineering Team",
    role: "Technical Excellence",
    description:
      "Skilled software engineers, network specialists, and designers who turn complex requirements into elegant, reliable digital solutions.",
  },
  {
    name: "Consulting Team",
    role: "Client Success",
    description:
      "Dedicated consultants and project managers who ensure every engagement delivers measurable value and aligns with client objectives.",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-falu/3 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-falu/2 blur-[100px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-falu-light text-sm font-semibold tracking-wider uppercase font-[family-name:var(--font-inter)]">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
            From Clipetech to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
              Clipe233 Engineers
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
            Founded on April 20, 2016, as Clipe Technologies, we have grown
            from a small tech startup into a comprehensive IT and engineering
            firm serving businesses across Ghana. Our 2025 rebrand marks a new
            chapter of innovation, expanded capabilities, and unwavering
            commitment to engineering digital possibilities.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 hover-lift"
          >
            <div className="w-14 h-14 rounded-xl bg-falu/20 flex items-center justify-center mb-6">
              <Target className="h-7 w-7 text-falu-light" />
            </div>
            <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
              Our Mission
            </h3>
            <p className="text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              To empower businesses and organizations with innovative,
              reliable, and affordable technology solutions that drive digital
              transformation, operational efficiency, and sustainable growth.
              We are dedicated to bridging the technology gap in Africa by
              delivering world-class IT services tailored to the unique
              challenges and opportunities of our markets.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-2xl p-8 hover-lift"
          >
            <div className="w-14 h-14 rounded-xl bg-falu/20 flex items-center justify-center mb-6">
              <Eye className="h-7 w-7 text-falu-light" />
            </div>
            <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
              Our Vision
            </h3>
            <p className="text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              To become the leading IT and engineering firm in West Africa,
              recognized for excellence in software innovation, digital
              infrastructure, and technology consultancy. We envision a future
              where every business, regardless of size, has access to
              intelligent technology solutions that unlock their full
              potential and contribute to Africa's digital economy.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12 font-[family-name:var(--font-poppins)]">
            Our Journey
          </h3>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-falu/50 via-falu/20 to-transparent" />

            <div className="space-y-12">
              {timelineItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start gap-6 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-falu-light glow-red-sm mt-2 z-10" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                    }`}
                  >
                    <span className="text-falu-light font-bold text-lg font-[family-name:var(--font-space-grotesk)]">
                      {item.year}
                    </span>
                    <h4 className="text-xl font-semibold mt-1 mb-3 font-[family-name:var(--font-poppins)]">
                      {item.title}
                    </h4>
                    <p className="text-silver/60 font-[family-name:var(--font-inter)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12 font-[family-name:var(--font-poppins)]">
            Core Values
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                className="glass-card rounded-xl p-6 hover-lift group"
              >
                <div className="w-12 h-12 rounded-lg bg-falu/20 flex items-center justify-center mb-4 group-hover:bg-falu/30 transition-colors">
                  <value.icon className="h-6 w-6 text-falu-light" />
                </div>
                <h4 className="text-lg font-semibold mb-2 font-[family-name:var(--font-poppins)]">
                  {value.title}
                </h4>
                <p className="text-silver/60 text-sm font-[family-name:var(--font-inter)] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12 font-[family-name:var(--font-poppins)]">
            Our Team
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                className="glass-card rounded-xl p-6 text-center hover-lift group"
              >
                <div className="w-20 h-20 rounded-full bg-falu/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-falu/30 transition-colors">
                  <Users className="h-8 w-8 text-falu-light" />
                </div>
                <h4 className="text-lg font-semibold font-[family-name:var(--font-poppins)]">
                  {member.name}
                </h4>
                <span className="text-falu-light text-sm font-[family-name:var(--font-inter)]">
                  {member.role}
                </span>
                <p className="text-silver/60 text-sm mt-3 font-[family-name:var(--font-inter)] leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
