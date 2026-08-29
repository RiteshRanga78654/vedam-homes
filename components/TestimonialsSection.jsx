"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiArrowLeftLight, PiArrowRightLight, PiQuotesFill, PiSparkleFill } from "react-icons/pi";
import testimonials from "@/data/testimonials";
import Reveal from "@/components/Reveal";

export default function TestimonialsSection() {
  const [i, setI] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const t = testimonials[i];
  const next = () => setI((v) => (v + 1) % testimonials.length);
  const prev = () => setI((v) => (v - 1 + testimonials.length) % testimonials.length);

  // Auto slide every 5 seconds (5000ms) with pause on hover
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setI((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timerRef.current);
  }, [i, isPaused]);

  return (
    <section
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden bg-[#0a0a0c] py-24 text-ivory selection:bg-amber-300 selection:text-charcoal lg:py-36"
    >
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-amber-600/10 blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-stone-500/10 blur-[160px]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-12">
        {/* Section Pill */}
        <Reveal y={20}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <PiSparkleFill className="text-amber-400 text-xs animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-200/80">
              In Their Words
            </span>
          </div>
        </Reveal>

        {/* Large Faded Quotation Mark */}
        <div className="mt-8 flex justify-center text-white/[0.06]">
          <PiQuotesFill size={72} />
        </div>

        {/* Dynamic Animated Quote Display Area */}
        <div className="relative mt-4 min-h-[260px] sm:min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <p className="font-display text-2xl font-light leading-relaxed tracking-tight text-white sm:text-3xl lg:text-4xl">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author & Residency Details */}
              <div className="mt-10">
                <p className="font-display text-lg text-white font-medium tracking-wide">
                  {t.name}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-amber-300/80">
                  {t.detail}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 5-Second Animated Progress Bar */}
        <div className="mx-auto mt-12 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            key={i}
            initial={{ width: "0%" }}
            animate={{ width: isPaused ? "0%" : "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-gradient-to-r from-amber-300 to-amber-500"
          />
        </div>

        {/* Navigation Deck & Counter */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:bg-amber-400 hover:text-charcoal active:scale-95"
          >
            <PiArrowLeftLight size={18} className="transition-transform group-hover:-translate-x-0.5" />
          </button>

          <span className="font-mono text-xs tracking-widest text-ivory/50">
            0{i + 1} <span className="text-white/20">/</span> 0{testimonials.length}
          </span>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:bg-amber-400 hover:text-charcoal active:scale-95"
          >
            <PiArrowRightLight size={18} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Subtle Pause Hint */}
        {/* <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-ivory/30">
          {isPaused ? "Paused on Hover" : "Auto-playing (5s)"}
        </p> */}
      </div>
    </section>
  );
}