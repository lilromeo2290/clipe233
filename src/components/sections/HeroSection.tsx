"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "/slide-1.jpg",
    headline: ["Building", "Innovations,", "Engineering", "Excellence"],
    subheadline:
      "Clipe233 Engineers delivers innovative software, networking, branding, and digital transformation solutions tailored for businesses and organizations across Ghana and beyond.",
    badge: "Engineering Digital Possibilities Since 2016",
  },
  {
    image: "/slide-2.jpg",
    headline: ["Empowering", "Businesses", "Through", "Technology"],
    subheadline:
      "From software development to network architecture, we provide end-to-end IT and engineering solutions that drive growth and efficiency for organizations of all sizes.",
    badge: "Your Trusted IT & Engineering Partner",
  },
  {
    image: "/slide-3.jpg",
    headline: ["Code.", "Design.", "Deploy.", "Transform."],
    subheadline:
      "Our expert developers and engineers bring your vision to life with cutting-edge software, robust infrastructure, and seamless digital experiences that set you apart.",
    badge: "Where Code Meets Creativity",
  },
];

const stats = [
  { value: 9, suffix: "+", label: "Years of Experience" },
  { value: 200, suffix: "+", label: "Projects Completed" },
  { value: 150, suffix: "+", label: "Happy Clients" },
  { value: 8, suffix: "+", label: "Core Services" },
];

const serviceHighlights = [
  "Software Development",
  "Website Design",
  "Networking",
  "IT Consultancy",
  "Graphic Design",
  "Digital Solutions",
];

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          tick();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 1200);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  // Auto-advance slider
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextSlide]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const slide = slides[currentSlide];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt="Clipe233 Engineers"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Light overlay for readability while keeping images bright */}
        <div className="absolute inset-0 bg-black/30 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/15 z-[1]" />
        {/* Falu Red tint overlay */}
        <div className="absolute inset-0 bg-falu/5 z-[1]" />

        {/* Animated scan line effect */}
        <div className="absolute inset-0 z-[2] opacity-[0.03]">
          <div
            className="w-full h-[2px] bg-white animate-[scanline_8s_linear_infinite]"
            style={{
              animation: "scanline 8s linear infinite",
            }}
          />
        </div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg z-[3] opacity-30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 w-full">
        <div className="text-center">
          {/* Badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-falu-light animate-pulse" />
              <span className="text-sm text-gray-700 dark:text-silver/80 font-[family-name:var(--font-inter)]">
                {slide.badge}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Main Headline */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`headline-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-[family-name:var(--font-poppins)] mb-6 text-white"
            >
              {slide.headline.map((word, i) => {
                const isHighlight =
                  word === "Innovations," ||
                  word === "Excellence" ||
                  word === "Businesses" ||
                  word === "Technology" ||
                  word === "Code." ||
                  word === "Design." ||
                  word === "Deploy." ||
                  word === "Transform.";
                return (
                  <span key={i}>
                    {isHighlight ? (
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light via-red-400 to-falu">
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                    {i < slide.headline.length - 1 ? " " : ""}
                    {i === 1 && <br />}
                    {i === 3 && ""}
                  </span>
                );
              })}
            </motion.h1>
          </AnimatePresence>

          {/* Subheadline */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-200 dark:text-silver/80 mb-10 font-[family-name:var(--font-inter)] leading-relaxed"
            >
              {slide.subheadline}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              onClick={() => scrollTo("#services")}
              size="lg"
              className="bg-falu hover:bg-falu-light text-white glow-red hover:glow-red transition-all duration-300 px-8 py-6 text-lg font-[family-name:var(--font-inter)] group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <a href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-falu/40 text-white hover:bg-falu/10 hover:border-falu px-8 py-6 text-lg font-[family-name:var(--font-inter)]"
              >
                Request Consultation
              </Button>
            </a>
          </motion.div>

          {/* Service highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            {serviceHighlights.map((service, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full text-xs sm:text-sm text-gray-200 dark:text-silver/70 border border-white/20 dark:border-white/15 hover:border-falu/40 hover:text-white transition-all duration-300 font-[family-name:var(--font-inter)] backdrop-blur-sm"
              >
                {service}
              </span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-6 text-center hover-lift"
              >
                <div className="text-3xl sm:text-4xl font-bold text-falu-light font-[family-name:var(--font-space-grotesk)] mb-2">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-sm text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slider Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center z-20 pl-4 sm:pl-8">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-falu/20 transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center z-20 pr-4 sm:pr-8">
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-falu/20 transition-all duration-300 group"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Slider Dots / Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="relative group"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                i === currentSlide
                  ? "bg-falu-light glow-red-sm w-8"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
            {i === currentSlide && (
              <motion.div
                layoutId="activeSlide"
                className="absolute inset-0 rounded-full bg-falu-light/30"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/5">
        <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-gradient-to-r from-falu-light to-red-400"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#about");
          }}
          className="flex flex-col items-center gap-2 text-gray-400 dark:text-silver/40 hover:text-falu-light transition-colors"
        >
          <span className="text-xs font-[family-name:var(--font-inter)]">
            Scroll to explore
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </motion.div>

      {/* Scanline animation keyframes */}
      <style jsx global>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </section>
  );
}
