"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const MIN_DISPLAY_MS = 3500;
const FADE_OUT_MS = 700;

export default function SplashScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<"visible" | "fading" | "done">("visible");

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fading"), MIN_DISPLAY_MS);
    const doneTimer = setTimeout(
      () => setPhase("done"),
      MIN_DISPLAY_MS + FADE_OUT_MS
    );
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") {
    return <>{children}</>;
  }

  return (
    <>
      {/* Splash overlay */}
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity ease-out ${
          phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          background: "#000000",
          transitionDuration: `${FADE_OUT_MS}ms`,
        }}
      >
        <div className="relative flex flex-col items-center text-center px-6 max-w-2xl">
          {/* Accent line top */}
          <div
            className="w-12 h-[2px] mb-8 animate-pulse-glow"
            style={{ background: "linear-gradient(90deg, transparent, #7B1818, transparent)" }}
          />

          {/* Headline */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Cherished Values Meet{" "}
            <span className="text-falu">Big Thinkers</span>
          </h2>

          {/* Body copy */}
          <p
            className="mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-white/60 max-w-xl"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Make the shift from insight to achievements by using our immense
            skill-set and best practices to spool the right solutions and apply
            the right technology for your organization.
          </p>

          <p
            className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-white/60 max-w-xl"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            What matters to us is we are bound by our{" "}
            <span className="text-falu font-medium">Algorithms &amp; Engineering Policies</span>{" "}
            to increase our system&apos;s performance metrics as much as possible.
          </p>

          {/* Founder attribution */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-falu/40 animate-pulse-glow">
              <Image
                src="/team-raymond.jpg"
                alt="Raymond Romeo Dravie"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <p
                className="text-sm sm:text-base font-semibold text-white"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Raymond Romeo Dravie
              </p>
              <p
                className="text-xs sm:text-sm tracking-widest uppercase text-falu"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Founder &amp; Chief Executive Officer
              </p>
            </div>
          </div>

          {/* Accent line bottom */}
          <div
            className="w-12 h-[2px] mt-8"
            style={{ background: "linear-gradient(90deg, transparent, #7B1818, transparent)" }}
          />

          {/* Logo watermark */}
          <div className="mt-8 flex items-center gap-2 opacity-30">
            <div className="relative w-6 h-6">
              <Image
                src="/clipe233eng-Logo.jpg"
                alt=""
                fill
                className="object-cover rounded-sm"
                priority
              />
            </div>
            <span
              className="text-xs tracking-[0.2em] uppercase text-white"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Clipe233 Engineers
            </span>
          </div>
        </div>
      </div>

      {/* Page content behind splash */}
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
