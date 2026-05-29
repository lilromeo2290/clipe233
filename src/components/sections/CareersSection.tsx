"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Send,
  Laptop,
  Globe,
  Users,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const culture = [
  {
    icon: Laptop,
    title: "Remote-First Culture",
    description:
      "We embrace remote work, giving our team the flexibility to deliver their best work from anywhere. Our virtual-first approach ensures talent is never limited by geography.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description:
      "Work on projects that make a real difference. From empowering local businesses to supporting international organizations, your contributions have tangible, meaningful impact.",
  },
  {
    icon: Users,
    title: "Collaborative Team",
    description:
      "Join a team of passionate technologists who support each other's growth. We believe in knowledge sharing, mentorship, and collective problem-solving.",
  },
  {
    icon: Heart,
    title: "Growth & Learning",
    description:
      "We invest in our team's professional development through training programs, conference attendance, certifications, and hands-on experience with cutting-edge technologies.",
  },
];

export default function CareersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="careers" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-falu/3 blur-[150px]" />

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
            Careers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
            Join Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
              Engineering Team
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
            Be part of a team that is shaping the future of technology in
            Africa. We are always looking for talented, passionate individuals
            who want to make an impact through innovation and excellence.
          </p>
        </motion.div>

        {/* Company Culture */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {culture.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass-card rounded-xl p-6 text-center hover-lift group"
            >
              <div className="w-12 h-12 rounded-lg bg-falu/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-falu/30 transition-colors">
                <item.icon className="h-6 w-6 text-falu-light" />
              </div>
              <h4 className="text-base font-semibold mb-2 font-[family-name:var(--font-poppins)]">
                {item.title}
              </h4>
              <p className="text-gray-400 dark:text-silver/60 text-sm font-[family-name:var(--font-inter)] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Apply Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-2 font-[family-name:var(--font-poppins)]">
              Apply Now
            </h3>
            <p className="text-gray-400 dark:text-silver/60 text-sm font-[family-name:var(--font-inter)] mb-6">
              Send us your details and we will get back to you.
            </p>
            <form
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name"
                  className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-white placeholder:text-gray-300 dark:text-silver/40 font-[family-name:var(--font-inter)]"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-white placeholder:text-gray-300 dark:text-silver/40 font-[family-name:var(--font-inter)]"
                />
              </div>
              <Input
                placeholder="Position You Are Applying For"
                className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-white placeholder:text-gray-300 dark:text-silver/40 font-[family-name:var(--font-inter)]"
              />
              <Textarea
                placeholder="Tell us about yourself and why you would be a great fit..."
                rows={4}
                className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-white placeholder:text-gray-300 dark:text-silver/40 font-[family-name:var(--font-inter)]"
              />
              <Button
                type="submit"
                className="bg-falu hover:bg-falu-light text-white glow-red-sm hover:glow-red transition-all duration-300 w-full font-[family-name:var(--font-inter)]"
              >
                <Send className="mr-2 h-4 w-4" />
                Submit Application
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
