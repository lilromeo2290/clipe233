"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const MIN_DISPLAY_MS = 1800; // minimum time splash is visible (1.8s)
const FADE_OUT_MS = 600; // fade-out duration in ms

export default function SplashScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<"visible" | "fading" | "done">("visible");

  useEffect(() => {
    // After the minimum display time, start fading out
    const fadeTimer = setTimeout(() => setPhase("fading"), MIN_DISPLAY_MS);
    // After fade completes, remove splash entirely
    const doneTimer = setTimeout(
      () => setPhase("done"),
      MIN_DISPLAY_MS + FADE_OUT_MS
    );
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // Once done, just render children with no splash overlay
  if (phase === "done") {
    return <>{children}</>;
  }

  return (
    <>
      {/* Splash overlay */}
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity ease-out ${
          phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          background: "#000000",
          transitionDuration: `${FADE_OUT_MS}ms`,
        }}
      >
        {/* Logo container with glow */}
        <div className="relative flex flex-col items-center gap-5">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 animate-pulse-glow rounded-full overflow-hidden ring-2 ring-falu/30">
            <Image
              src="/clipe233eng-Logo.jpg"
              alt="Clipe233 Engineers"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Company name */}
          <div className="flex flex-col items-center gap-1">
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-wider text-white"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              CLIPE233
            </h1>
            <p
              className="text-sm sm:text-base tracking-[0.3em] uppercase text-falu"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Engineers
            </p>
          </div>

          {/* Loading bar */}
          <div className="mt-6 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #7B1818, #9A2020)",
                animation: `splash-load ${MIN_DISPLAY_MS}ms ease-in-out forwards`,
              }}
            />
          </div>

          {/* Tagline */}
          <p
            className="mt-3 text-xs tracking-[0.15em] uppercase text-white/40"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Engineering Smart Digital Solutions
          </p>
        </div>
      </div>

      {/* Page content rendered behind splash, revealed as splash fades */}
      <div
        className={`transition-opacity ease-out ${
          phase === "visible" ? "opacity-0" : "opacity-100"
        }`}
        style={{
          transitionDuration: phase === "fading" ? `${FADE_OUT_MS}ms` : "0ms",
        }}
      >
        {children}
      </div>
    </>
  );
}
