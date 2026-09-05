"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { PiSparkleFill, PiPlusBold } from "react-icons/pi";
import Reveal from "@/components/Reveal";
import { philosophy } from "@/data/stats";

function PhilosophyCard({ p, index }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic luxury radial spotlight follows cursor inside the card
  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const spotlightBg = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(212, 175, 55, 0.12), transparent 80%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between overflow-hidden border-b border-white/10 p-8 sm:border-r lg:last:border-r-0 lg:p-10 transition-all duration-700 bg-charcoal/40 hover:bg-white/[0.03]"
    >
      {/* Interactive Cursor Glow Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlightBg }}
      />

      {/* Top Ambient Gold Accent Line on Hover */}
      <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-amber-400/80 via-bronze-light to-transparent transition-all duration-700 ease-out group-hover:w-full" />

      {/* Top Metadata & Micro Indicator */}
      <div>
        <div className="flex items-center justify-between pb-8">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs tracking-widest text-ivory/40 transition-colors duration-500 group-hover:text-amber-300">
              {p.index || `0${index + 1}`}
            </span>
            <div className="h-[1px] w-4 bg-white/20 transition-all duration-500 group-hover:w-8 group-hover:bg-amber-300/60" />
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ivory/40 transition-all duration-500 group-hover:rotate-90 group-hover:border-amber-300/40 group-hover:bg-amber-300/10 group-hover:text-amber-200">
            <PiPlusBold size={12} />
          </div>
        </div>

        {/* Large Decorative Faded Background Index */}
        <span
          aria-hidden="true"
          className="font-display pointer-events-none absolute right-4 top-16 select-none text-7xl font-bold tracking-tighter text-white/[0.03] transition-all duration-700 group-hover:translate-x-1 group-hover:text-white/[0.07]"
        >
          {p.index || `0${index + 1}`}
        </span>

        {/* Title */}
        <h3 className="font-display relative mt-4 text-2xl font-light tracking-wide text-ivory transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:text-amber-100 sm:text-3xl">
          {p.title}
        </h3>

        {/* Description */}
        <p className="mt-5 text-sm leading-relaxed text-ivory/50 transition-colors duration-500 group-hover:text-ivory/80 font-light">
          {p.desc}
        </p>
      </div>

      {/* Bottom Sub-detail Footer */}
      <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-4 opacity-40 transition-all duration-500 group-hover:opacity-100">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-ivory/60">
          Standard {index + 1}
        </span>
        <PiSparkleFill className="text-[10px] text-amber-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-pulse" />
      </div>
    </motion.div>
  );
}

export default function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="relative overflow-hidden bg-[#0e0f12] py-28 text-ivory lg:py-20 selection:bg-amber-300 selection:text-charcoal"
    >
      {/* Ambient Luxury Background Light Orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-amber-600/5 blur-[100px] ambient-orb" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-amber-400/5 blur-[100px] ambient-orb" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-20 border-b border-white/10 pb-12">
          <Reveal y={30} duration={0.8}>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="eyebrow text-amber-200/60 font-mono text-xs uppercase tracking-[0.35em]">
                Design Philosophy
              </span>
            </div>
            <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-ivory sm:text-5xl lg:text-6xl font-normal max-w-2xl">
              Four principles behind{" "}
              <span className="italic font-light text-white/70">every address.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2} y={30} duration={0.8}>
            <p className="max-w-md text-sm leading-relaxed text-ivory/50 font-light lg:text-right">
              Every detail is shaped with architectural discipline, ensuring modern luxury endures across generations.
            </p>
          </Reveal>
        </div>

        {/* 4-Card Luxury Architectural Grid */}
        <div className="grid grid-cols-1 border-t border-l border-white/10 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-white/[0.01]">
          {philosophy.map((p, i) => (
            <Reveal key={p.index || i} delay={i * 0.1} duration={0.85}>
              <PhilosophyCard p={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}