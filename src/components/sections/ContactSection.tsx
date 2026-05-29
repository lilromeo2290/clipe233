"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Send,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@clipe233.com",
    href: "mailto:info@clipe233.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+233 24 978 3736",
    href: "tel:+233249783736",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Ho, Volta Region, Ghana",
    href: "#",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon - Fri: 8:00 AM - 6:00 PM",
    href: "#",
  },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-falu/3 blur-[150px]" />

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
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
            Let&apos;s Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
              Amazing
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
            Ready to transform your business with innovative technology
            solutions? Get in touch with our team and let us discuss how we
            can help you achieve your digital goals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-2 font-[family-name:var(--font-poppins)]">
                Send Us a Message
              </h3>
              <p className="text-gray-400 dark:text-silver/60 text-sm font-[family-name:var(--font-inter)] mb-6">
                Fill out the form below and we will get back to you within 24
                hours.
              </p>
              <form
                className="space-y-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500 dark:text-silver/70 mb-1.5 block font-[family-name:var(--font-inter)]">
                      Full Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-white placeholder:text-gray-300 dark:text-silver/40 font-[family-name:var(--font-inter)]"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-silver/70 mb-1.5 block font-[family-name:var(--font-inter)]">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-white placeholder:text-gray-300 dark:text-silver/40 font-[family-name:var(--font-inter)]"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500 dark:text-silver/70 mb-1.5 block font-[family-name:var(--font-inter)]">
                      Phone Number
                    </label>
                    <Input
                      placeholder="+233 24 978 3736"
                      className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-white placeholder:text-gray-300 dark:text-silver/40 font-[family-name:var(--font-inter)]"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-silver/70 mb-1.5 block font-[family-name:var(--font-inter)]">
                      Service Interest
                    </label>
                    <Input
                      placeholder="e.g., Software Development"
                      className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-white placeholder:text-gray-300 dark:text-silver/40 font-[family-name:var(--font-inter)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-silver/70 mb-1.5 block font-[family-name:var(--font-inter)]">
                    Your Message
                  </label>
                  <Textarea
                    placeholder="Tell us about your project or requirements..."
                    rows={5}
                    className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-white placeholder:text-gray-300 dark:text-silver/40 font-[family-name:var(--font-inter)]"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-falu hover:bg-falu-light text-white glow-red-sm hover:glow-red transition-all duration-300 w-full sm:w-auto font-[family-name:var(--font-inter)]"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Quick Info Cards */}
            {contactInfo.map((info, i) => (
              <a
                key={i}
                href={info.href}
                className="glass-card rounded-xl p-5 flex items-center gap-4 hover-lift group block"
              >
                <div className="w-12 h-12 rounded-lg bg-falu/20 flex items-center justify-center flex-shrink-0 group-hover:bg-falu/30 transition-colors">
                  <info.icon className="h-5 w-5 text-falu-light" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-silver/50 font-[family-name:var(--font-inter)]">
                    {info.label}
                  </span>
                  <p className="text-gray-900 dark:text-white font-medium font-[family-name:var(--font-inter)]">
                    {info.value}
                  </p>
                </div>
              </a>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/233249783736"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-xl p-5 flex items-center gap-4 hover-lift group block border-green-600/30"
            >
              <div className="w-12 h-12 rounded-lg bg-green-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-600/30 transition-colors">
                <MessageCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <span className="text-xs text-gray-400 dark:text-silver/50 font-[family-name:var(--font-inter)]">
                  Chat with us on
                </span>
                <p className="text-green-400 font-medium font-[family-name:var(--font-inter)]">
                  WhatsApp
                </p>
              </div>
            </a>

            {/* Social Links */}
            <div className="glass-card rounded-xl p-5">
              <span className="text-sm text-gray-400 dark:text-silver/50 font-[family-name:var(--font-inter)] mb-3 block">
                Follow Us
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-silver/60 hover:bg-falu/20 hover:text-falu-light transition-all duration-300"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="glass-card rounded-xl overflow-hidden h-48 relative">
              <div className="absolute inset-0 bg-gray-200/80 dark:bg-charcoal/80 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-falu-light mx-auto mb-2" />
                  <p className="text-sm text-gray-400 dark:text-silver/60 font-[family-name:var(--font-inter)]">
                    Ho, Volta Region
                  </p>
                  <p className="text-xs text-gray-300 dark:text-silver/40 font-[family-name:var(--font-inter)]">
                    Ghana, West Africa
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
