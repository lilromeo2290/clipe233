"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 w-72 rounded-2xl overflow-hidden shadow-2xl shadow-gray-400/40 dark:shadow-black/40"
          >
            <div className="bg-green-600 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm font-[family-name:var(--font-inter)]">
                    Clipe233 Engineers
                  </p>
                  <p className="text-white/70 text-xs font-[family-name:var(--font-inter)]">
                    Typically replies within minutes
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-[#0b141a] p-4">
              <div className="bg-white dark:bg-[#1f2c34] rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-800 dark:text-white/90 font-[family-name:var(--font-inter)]">
                  Hello! 👋 How can we help you today? Feel free to ask about
                  our services or request a consultation.
                </p>
                <span className="text-xs text-gray-400 dark:text-white/40 font-[family-name:var(--font-inter)] mt-1 block">
                  Just now
                </span>
              </div>
              <a
                href="https://wa.me/233249783736"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-600 hover:bg-green-500 text-white text-center py-2.5 rounded-lg text-sm font-medium transition-colors font-[family-name:var(--font-inter)]"
              >
                Start Conversation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-white text-gray-800 shadow-white/20"
            : "bg-green-500 text-white shadow-green-500/30 hover:bg-green-400"
        }`}
        aria-label="WhatsApp chat"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  );
}
