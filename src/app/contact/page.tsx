"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/sections/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
const WhatsAppFloat = dynamic(() => import("@/components/sections/WhatsAppFloat"), { ssr: false });

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@clipe233eng.net",
    subValue: "clipe233eng@gmail.com",
    href: "mailto:info@clipe233eng.net",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+233 24 978 3736",
    subValue: "053 539 9562",
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

export default function ContactPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          service: formData.service || undefined,
          message: formData.message || undefined,
          source: "contact-page",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });

      // Reset success message after 8 seconds
      setTimeout(() => setStatus("idle"), 8000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-falu/5 blur-[150px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-falu/3 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-falu-light text-sm font-semibold tracking-wider uppercase font-[family-name:var(--font-inter)]">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
              Let&apos;s Build Something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
                Amazing
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
              Ready to transform your business with innovative technology
              solutions? Get in touch with our team and let us discuss how we
              can help you achieve your digital goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section ref={ref} className="py-12 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                <p className="text-gray-500 dark:text-silver/60 text-sm font-[family-name:var(--font-inter)] mb-6">
                  Fill out the form below and we will get back to you within 24
                  hours.
                </p>

                {/* Success Message */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-green-800 dark:text-green-300 font-medium font-[family-name:var(--font-inter)]">
                        Message sent successfully!
                      </p>
                      <p className="text-green-600 dark:text-green-400 text-sm font-[family-name:var(--font-inter)]">
                        We&apos;ve received your message and will respond within 24 hours. A confirmation email has been sent to you.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Error Message */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3"
                  >
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <div>
                      <p className="text-red-800 dark:text-red-300 font-medium font-[family-name:var(--font-inter)]">
                        Failed to send message
                      </p>
                      <p className="text-red-600 dark:text-red-400 text-sm font-[family-name:var(--font-inter)]">
                        {errorMessage || "Please try again or contact us directly via email or WhatsApp."}
                      </p>
                    </div>
                  </motion.div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500 dark:text-silver/70 mb-1.5 block font-[family-name:var(--font-inter)]">
                        Full Name <span className="text-falu-light">*</span>
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        disabled={status === "sending"}
                        className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-silver/40 font-[family-name:var(--font-inter)]"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 dark:text-silver/70 mb-1.5 block font-[family-name:var(--font-inter)]">
                        Email Address <span className="text-falu-light">*</span>
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        disabled={status === "sending"}
                        className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-silver/40 font-[family-name:var(--font-inter)]"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500 dark:text-silver/70 mb-1.5 block font-[family-name:var(--font-inter)]">
                        Phone Number
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+233 24 978 3736"
                        disabled={status === "sending"}
                        className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-silver/40 font-[family-name:var(--font-inter)]"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 dark:text-silver/70 mb-1.5 block font-[family-name:var(--font-inter)]">
                        Service Interest
                      </label>
                      <Input
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        placeholder="e.g., Software Development"
                        disabled={status === "sending"}
                        className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-silver/40 font-[family-name:var(--font-inter)]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-silver/70 mb-1.5 block font-[family-name:var(--font-inter)]">
                      Your Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or requirements..."
                      rows={5}
                      disabled={status === "sending"}
                      className="bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-silver/40 font-[family-name:var(--font-inter)]"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "sending"}
                    className="bg-falu hover:bg-falu-light text-white glow-red-sm hover:glow-red transition-all duration-300 w-full sm:w-auto font-[family-name:var(--font-inter)]"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
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
                    <span className="text-xs text-gray-500 dark:text-silver/50 font-[family-name:var(--font-inter)]">
                      {info.label}
                    </span>
                    <p className="text-gray-900 dark:text-white font-medium font-[family-name:var(--font-inter)]">
                      {info.value}
                    </p>
                    {info.subValue && (
                      <p className="text-xs text-gray-500 dark:text-silver/50 font-[family-name:var(--font-inter)] mt-0.5">
                        {info.subValue}
                      </p>
                    )}
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
                  <span className="text-xs text-gray-500 dark:text-silver/50 font-[family-name:var(--font-inter)]">
                    Chat with us on
                  </span>
                  <p className="text-green-400 font-medium font-[family-name:var(--font-inter)]">
                    WhatsApp
                  </p>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="p-4 flex items-center gap-3 border-b border-gray-200 dark:border-white/10">
                <MapPin className="h-5 w-5 text-falu-light" />
                <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)]">
                  Find Us in Ho
                </h3>
                <span className="text-sm text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)] ml-auto">
                  Ho, Volta Region, Ghana
                </span>
              </div>
              <iframe
                src="https://maps.google.com/maps?q=Ho+Volta+Region+Ghana&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CLIPE CONSULT Location - Ho, Volta Region, Ghana"
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
