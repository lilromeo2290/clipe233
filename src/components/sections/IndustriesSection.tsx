"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  GraduationCap,
  Church,
  Building2,
  Heart,
  Landmark,
  ShoppingBag,
  Stethoscope,
  ArrowRight,
} from "lucide-react";

const industries = [
  {
    icon: GraduationCap,
    title: "Schools & Educational Institutions",
    description:
      "We empower educational institutions with digital learning platforms, school management systems, computer lab setup, and network infrastructure. Our solutions enhance administrative efficiency and create engaging learning experiences for students of all ages.",
    solutions: [
      "School Management Software",
      "E-Learning Platforms",
      "Computer Lab Setup",
      "Student Information Systems",
    ],
  },
  {
    icon: Church,
    title: "Churches & Religious Organizations",
    description:
      "We help churches and religious organizations build a strong digital presence with community portals, sermon streaming platforms, donation systems, and professional branding that amplifies their message and connects congregations.",
    solutions: [
      "Church Websites & Apps",
      "Live Streaming Setup",
      "Donation & Giving Platforms",
      "Event Management Systems",
    ],
  },
  {
    icon: Building2,
    title: "SMEs & Startups",
    description:
      "We provide small and medium enterprises with the technology foundation they need to compete and grow. From business websites and custom software to IT infrastructure and digital marketing, we are a one-stop technology partner for emerging businesses.",
    solutions: [
      "Business Websites & E-Commerce",
      "Custom Business Software",
      "IT Infrastructure Setup",
      "Digital Marketing Solutions",
    ],
  },
  {
    icon: Heart,
    title: "NGOs & Non-Profits",
    description:
      "We support non-profit organizations with cost-effective technology solutions that maximize their impact. Our services include donor management systems, impact reporting tools, and communication platforms that help NGOs tell their stories effectively.",
    solutions: [
      "Donor Management Systems",
      "Impact Reporting Platforms",
      "Communication Tools",
      "Grant Management Software",
    ],
  },
  {
    icon: Landmark,
    title: "Government Agencies",
    description:
      "We deliver secure, compliant technology solutions for government institutions. Our expertise includes e-governance platforms, secure network infrastructure, data management systems, and digital public service delivery solutions.",
    solutions: [
      "E-Governance Platforms",
      "Secure Network Infrastructure",
      "Data Management Systems",
      "Digital Public Services",
    ],
  },
  {
    icon: ShoppingBag,
    title: "Retail & Commerce",
    description:
      "We equip retail businesses with modern commerce solutions including point-of-sale systems, inventory management, e-commerce platforms, and customer engagement tools that drive sales and streamline operations.",
    solutions: [
      "E-Commerce Platforms",
      "Point-of-Sale Systems",
      "Inventory Management",
      "Customer Engagement Tools",
    ],
  },
  {
    icon: Stethoscope,
    title: "Healthcare Facilities",
    description:
      "We provide healthcare organizations with HIPAA-compliant technology solutions including patient management systems, telemedicine platforms, electronic health records, and secure networking infrastructure that safeguards sensitive patient data.",
    solutions: [
      "Patient Management Systems",
      "Telemedicine Platforms",
      "Electronic Health Records",
      "Secure Network Setup",
    ],
  },
];

export default function IndustriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="industries"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-falu/3 blur-[150px]" />

      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-falu-light text-sm font-semibold tracking-wider uppercase font-[family-name:var(--font-inter)]">
            Industries We Serve
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
            Tailored Solutions for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
              Every Sector
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
            We understand that different industries face unique technology
            challenges. Our sector-specific solutions are designed to address
            the particular needs and compliance requirements of each industry
            we serve.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass-card rounded-2xl p-6 hover-lift group"
            >
              <div className="w-14 h-14 rounded-xl bg-falu/20 flex items-center justify-center mb-6 group-hover:bg-falu/30 transition-colors">
                <industry.icon className="h-7 w-7 text-falu-light" />
              </div>
              <h3 className="text-lg font-bold mb-3 font-[family-name:var(--font-poppins)] group-hover:text-falu-light transition-colors">
                {industry.title}
              </h3>
              <p className="text-gray-400 dark:text-silver/60 text-sm font-[family-name:var(--font-inter)] leading-relaxed mb-4">
                {industry.description}
              </p>
              <div className="space-y-2">
                {industry.solutions.map((solution, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-2 text-sm text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-falu-light flex-shrink-0" />
                    {solution}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
