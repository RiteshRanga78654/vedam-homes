"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiArrowLeftLight, PiArrowRightLight, PiQuotesFill, PiSparkleFill } from "react-icons/pi";
import testimonials from "@/data/testimonials";
import Reveal from "@/app/homepage/components/Reveal";

export default function TestimonialsSection() {
  const [i, setI] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const t = testimonials[i];
  const next = () => setI((v) => (v + 1) % testimonials.length);
  const prev = () => setI((v) => (v - 1 + testimonials.length) % testimonials.length);

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
      className="relative overflow-hidden bg-surface py-20 text-ink selection:bg-[#15140f] selection:text-ivory lg:py-20"
    >
      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-12">
        <Reveal y={20}>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/10 bg-surface-2/60 px-4 py-1.5 backdrop-blur-md shadow-sm">
            <PiSparkleFill className="text-accent text-xs animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
              In Their Words
            </span>
          </div>
        </Reveal>

        <div className="mt-8 flex justify-center text-ink/10">
          <PiQuotesFill size={72} />
        </div>

        <div className="relative mt-4 min-h-[240px] sm:min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <p className="font-display text-2xl font-light leading-relaxed tracking-tight text-ink sm:text-3xl lg:text-4xl">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-10">
                <p className="font-display text-lg text-ink font-medium tracking-wide">
                  {t.name}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {t.detail}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mx-auto mt-12 h-[2px] w-48 overflow-hidden rounded-full bg-border/10">
          <motion.div
            key={i}
            initial={{ width: "0%" }}
            animate={{ width: isPaused ? "0%" : "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-accent"
          />
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-border/15 bg-surface-2 text-ink shadow-sm transition-all duration-300 hover:scale-105 hover:bg-night hover:text-ivory active:scale-95 dark:hover:bg-amber-400! dark:hover:text-charcoal!"
          >
            <PiArrowLeftLight size={18} className="transition-transform group-hover:-translate-x-0.5" />
          </button>

          <span className="font-mono text-xs tracking-widest text-muted">
            0{i + 1} <span className="text-ink/20">/</span> 0{testimonials.length}
          </span>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-border/15 bg-surface-2 text-ink shadow-sm transition-all duration-300 hover:scale-105 hover:bg-night hover:text-ivory active:scale-95 dark:hover:bg-amber-400! dark:hover:text-charcoal!"
          >
            <PiArrowRightLight size={18} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted">
          {isPaused ? "Paused on Hover" : "Auto-playing (5s)"}
        </p>
      </div>
    </section>
  );
}