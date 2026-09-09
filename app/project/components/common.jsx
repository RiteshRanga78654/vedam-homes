"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ============================================================
//  FLOWER VALLEY — DESIGN SYSTEM
//  Rich botanical palette: deep forest green, warm ivory,
//  champagne gold, soft beige. Terracotta used as a whisper.
// ============================================================

export const palette = {
  forest: "#0d2b22",
  forestDeep: "#0a221b",
  forestSoft: "#143b2e",
  ivory: "#f4efe3",
  beige: "#e7e0cf",
  gold: "#c6a15b",
  goldSoft: "#dcbd85",
  terracotta: "#b06a4a",
  ink: "#121b16",
  sage: "#7d8f80",
};

export const easeOut = [0.16, 1, 0.3, 1];

export function eyebrow(text) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#c6a15b]">
      {text}
    </span>
  );
}

// Shared scroll-reveal wrapper — GPU friendly transforms only.
export function Reveal({
  children,
  delay = 0,
  y = 30,
  className = "",
  as: Tag = "div",
}) {
  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.85, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

// Editorial section heading block
export function SectionHeading({
  eyebrowText,
  title,
  accent,
  dark = false,
  center = false,
  className = "",
}) {
  const base = dark ? "text-[#f4efe3]" : "text-ink";
  const accentColor = "text-[#c6a15b]";
  return (
    <div className={center ? "text-center" : ""}>
      <Reveal>
        <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#c6a15b]">
          <span className="h-px w-8 bg-current" />
          {eyebrowText}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-5 font-display text-4xl font-light leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl ${base} ${className}`}
        >
          {title} {accent ? <span className={`italic ${accentColor}`}>{accent}</span> : null}
        </h2>
      </Reveal>
    </div>
  );
}

// Lightweight count-up that runs once when scrolled into view.
export function CountUp({ value, suffix = "", duration = 1.6, decimals = 0 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(value * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  const formatted = decimals
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString();

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

// Scroll indicator used at the base of the hero
export function ScrollIndicator({ label = "Scroll" }) {
  return (
    <div className="flex flex-col items-center gap-3 text-[#f4efe3]/70">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em]">{label}</span>
      <div className="relative h-14 w-px overflow-hidden bg-white/20">
        <motion.span
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-0 h-1/2 bg-[#c6a15b]"
        />
      </div>
    </div>
  );
}