"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Shield,
  Code2,
  TrendingUp,
  Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const blogCategories = [
  "All",
  "Cybersecurity",
  "Software Trends",
  "AI & Automation",
  "Digital Marketing",
];

const articles = [
  {
    title: "The Rise of AI-Powered Business Solutions in West Africa",
    category: "AI & Automation",
    date: "May 15, 2025",
    readTime: "6 min read",
    excerpt:
      "Artificial intelligence is transforming how businesses operate across West Africa. From chatbots handling customer service to predictive analytics driving strategic decisions, AI adoption is accelerating at unprecedented rates. This article explores the most impactful AI applications and what they mean for businesses in the region.",
    icon: TrendingUp,
  },
  {
    title: "5 Cybersecurity Best Practices Every Ghanaian Business Must Follow",
    category: "Cybersecurity",
    date: "May 8, 2025",
    readTime: "5 min read",
    excerpt:
      "With cyber threats becoming increasingly sophisticated, Ghanaian businesses can no longer afford to treat cybersecurity as an afterthought. This guide outlines five essential practices that every organization should implement to protect their data, systems, and reputation from digital threats.",
    icon: Shield,
  },
  {
    title: "How Custom Software is Redefining SME Operations in Ghana",
    category: "Software Trends",
    date: "April 28, 2025",
    readTime: "7 min read",
    excerpt:
      "Off-the-shelf software often falls short of meeting the unique needs of growing businesses. Custom software development is enabling Ghanaian SMEs to streamline operations, reduce costs, and gain competitive advantages through solutions specifically designed for their workflows and challenges.",
    icon: Code2,
  },
  {
    title: "Digital Marketing Strategies That Drive Real Results in 2025",
    category: "Digital Marketing",
    date: "April 20, 2025",
    readTime: "8 min read",
    excerpt:
      "The digital marketing landscape continues to evolve rapidly. From short-form video content to AI-driven personalization, businesses that stay ahead of the curve are seeing remarkable returns on their marketing investments. Discover the strategies that are delivering measurable results this year.",
    icon: Megaphone,
  },
];

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-falu/3 blur-[150px]" />

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
            Blog & Insights
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
              Tech Insights
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
            Stay ahead of the curve with our expert insights on technology
            trends, cybersecurity, software development, and digital
            transformation strategies.
          </p>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="glass-card rounded-2xl p-8 md:p-12 hover-lift group">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-falu/20 text-falu-light font-[family-name:var(--font-inter)]">
                Featured
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)]">
                {articles[0].category}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 font-[family-name:var(--font-poppins)] group-hover:text-falu-light transition-colors">
              {articles[0].title}
            </h3>
            <p className="text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed mb-6 max-w-4xl">
              {articles[0].excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-silver/50 font-[family-name:var(--font-inter)]">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {articles[0].date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {articles[0].readTime}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="glass-card rounded-2xl p-6 hover-lift group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-falu/20 flex items-center justify-center mb-4 group-hover:bg-falu/30 transition-colors">
                <article.icon className="h-6 w-6 text-falu-light" />
              </div>
              <span className="text-xs font-medium text-falu-light font-[family-name:var(--font-inter)]">
                {article.category}
              </span>
              <h4 className="text-lg font-bold mt-2 mb-3 font-[family-name:var(--font-poppins)] group-hover:text-falu-light transition-colors leading-snug">
                {article.title}
              </h4>
              <p className="text-gray-500 dark:text-silver/60 text-sm font-[family-name:var(--font-inter)] leading-relaxed mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 dark:text-silver/40 font-[family-name:var(--font-inter)]">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {article.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            className="border-falu/40 text-falu-light hover:bg-falu/10 hover:border-falu font-[family-name:var(--font-inter)] group"
          >
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
