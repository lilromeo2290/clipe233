"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

declare global {
  interface Window {
    Tawk_API?: {
      toggle?: () => void;
      popup?: () => void;
      showWidget?: () => void;
      hideWidget?: () => void;
      onLoad?: () => void;
      [key: string]: unknown;
    };
    Tawk_LoadStart?: Date;
  }
}

interface TawkToProps {
  propertyId: string;
  widgetId: string;
}

/**
 * Tawk.to Live Chat Widget
 *
 * To enable:
 * 1. Create a free account at https://www.tawk.to
 * 2. Add your site (clipe233.com or clipe233eng.net)
 * 3. Copy the Property ID and Widget ID from your dashboard
 *    (Administration > Chat Widget > Direct Chat Link)
 * 4. Set them in .env.local:
 *      NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id
 *      NEXT_PUBLIC_TAWK_WIDGET_ID=your_widget_id
 * 5. Restart the dev server
 */
export default function TawkToChat({ propertyId, widgetId }: TawkToProps) {
  const [loaded, setLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(false);

  useEffect(() => {
    if (!propertyId || !widgetId || propertyId === "YOUR_PROPERTY_ID") {
      // No credentials — show WhatsApp fallback
      setShowFallback(true);
      return;
    }

    // Tawk.to embed script
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    s1.onload = () => setLoaded(true);

    document.head.appendChild(s1);

    // Detect load failure after 8s
    const failTimer = setTimeout(() => {
      if (!loaded) setShowFallback(true);
    }, 8000);

    return () => {
      clearTimeout(failTimer);
      document.head.removeChild(s1);
    };
  }, [propertyId, widgetId, loaded]);

  // ── Fallback: WhatsApp chat bubble ────────────────────────
  if (showFallback) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {bubbleOpen && (
          <div className="mb-2 w-72 sm:w-80 glass-card rounded-2xl overflow-hidden shadow-2xl border border-falu/20">
            <div className="bg-falu px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm font-[family-name:var(--font-inter)]">
                    Clipe233 Engineers
                  </p>
                  <p className="text-white/70 text-xs">Typically replies in minutes</p>
                </div>
              </div>
              <button
                onClick={() => setBubbleOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 bg-background">
              <div className="glass-card rounded-2xl rounded-tl-none p-3 mb-3">
                <p className="text-sm text-gray-700 dark:text-silver/80 font-[family-name:var(--font-inter)]">
                  Hi there! 👋 Thanks for visiting Clipe233 Engineers.
                </p>
                <p className="text-sm text-gray-700 dark:text-silver/80 font-[family-name:var(--font-inter)] mt-2">
                  How can we help you build smarter digital solutions today?
                </p>
              </div>
              <a
                href="https://wa.me/233249783736?text=Hello%20Clipe233%20Engineers%2C%20I%20would%20like%20to%20chat"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#25D366] hover:bg-[#1da851] text-white font-semibold py-2.5 rounded-xl transition-colors font-[family-name:var(--font-inter)] text-sm"
              >
                Start Chat on WhatsApp
              </a>
              <a
                href="tel:+233249783736"
                className="block w-full text-center mt-2 border border-falu/30 text-falu-light hover:bg-falu/10 font-semibold py-2.5 rounded-xl transition-colors font-[family-name:var(--font-inter)] text-sm"
              >
                Call +233 24 978 3736
              </a>
            </div>
          </div>
        )}

        <button
          onClick={() => setBubbleOpen(!bubbleOpen)}
          className="relative w-14 h-14 rounded-full bg-falu hover:bg-falu-light text-white shadow-lg shadow-falu/30 transition-all duration-300 flex items-center justify-center glow-red-sm hover:glow-red animate-pulse-glow"
          aria-label="Open chat"
        >
          {bubbleOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          {!bubbleOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white animate-pulse" />
          )}
        </button>
      </div>
    );
  }

  // Tawk.to loaded — render a styled trigger bubble that opens the Tawk widget
  return (
    <button
      onClick={() => {
        try {
          if (window.Tawk_API?.popup) {
            window.Tawk_API.popup();
          } else if (window.Tawk_API?.toggle) {
            window.Tawk_API.toggle();
          }
        } catch (e) {
          console.warn("[Tawk] Failed to open chat widget", e);
        }
      }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-falu hover:bg-falu-light text-white shadow-lg shadow-falu/30 transition-all duration-300 flex items-center justify-center glow-red-sm hover:glow-red animate-pulse-glow"
      aria-label="Open live chat"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white animate-pulse" />
    </button>
  );
}
