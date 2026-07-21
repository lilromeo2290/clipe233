"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Zap } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Kofi Mensah",
    role: "Director, Volta Education Network",
    content:
      "Clipe233 Engineers transformed how our schools manage operations. Their school management system reduced our administrative workload by 60% and improved parent engagement significantly. The team was professional, responsive, and truly understood our unique requirements as an educational institution.",
    rating: 5,
    metric: "60% reduction in admin workload",
  },
  {
    name: "Ama Osei",
    role: "Founder, Ho Retail Hub",
    content:
      "The e-commerce platform built by Clipe233 Engineers has been a game-changer for our retail business. Within three months of launch, our online sales exceeded our physical store revenue. Their attention to user experience and payment integration was exceptional.",
    rating: 5,
    metric: "3x revenue increase online",
  },
  {
    name: "Mr. Emmanuel Ketaman Evortepe",
    role: "CEO Fafaa FM & President Duamenefa Foundation, Dzodze",
    content:
      "From our website to the live streaming setup, Clipe233 Engineers delivered everything perfectly. Our online viewers and listeners has grown. They understood the spiritual and technical needs of our ministry and exceeded all expectations.",
    rating: 5,
    metric: "Growing online viewers & listeners",
  },
  {
    name: "Esi Dey",
    role: "Operations Manager, Volta Health Services",
    content:
      "The patient management system they built for our healthcare facility has streamlined our operations remarkably. Appointment scheduling is now seamless, and our doctors can access patient records instantly. Their commitment to data security gave us complete confidence.",
    rating: 5,
    metric: "40% faster patient processing",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-falu/3 blur-[150px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-falu-light text-sm font-semibold tracking-wider uppercase font-[family-name:var(--font-inter)]">
            Client Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
            What Our Clients{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
              Say
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
            Our clients&apos; success is our greatest achievement. Here are
            stories from businesses and organizations that have transformed
            their operations through our technology solutions.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-8 md:p-12 relative">
            <Quote className="absolute top-6 left-6 h-10 w-10 text-falu/20" />

            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-falu-light text-falu-light"
                    />
                  )
                )}
              </div>

              {/* Quote */}
              <p className="text-lg sm:text-xl text-gray-600 dark:text-silver/80 font-[family-name:var(--font-inter)] leading-relaxed mb-8">
                &ldquo;{testimonials[current].content}&rdquo;
              </p>

              {/* Metric badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-falu/10 border border-falu/20 mb-6">
                <Zap className="h-4 w-4 text-falu-light" />
                <span className="text-sm text-falu-light font-[family-name:var(--font-inter)]">
                  {testimonials[current].metric}
                </span>
              </div>

              {/* Author */}
              <div>
                <p className="text-gray-900 dark:text-white font-semibold font-[family-name:var(--font-poppins)]">
                  {testimonials[current].name}
                </p>
                <p className="text-sm text-gray-400 dark:text-silver/50 font-[family-name:var(--font-inter)]">
                  {testimonials[current].role}
                </p>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-8 bg-falu-light"
                        : "bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-silver/60 hover:bg-falu/20 hover:text-falu-light transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-silver/60 hover:bg-falu/20 hover:text-falu-light transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
