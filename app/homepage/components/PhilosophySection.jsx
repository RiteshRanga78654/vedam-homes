"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { PiSparkleFill, PiPlusBold } from "react-icons/pi";
import Reveal from "@/app/homepage/components/Reveal";
import { philosophy } from "@/data/stats";

function PhilosophyCard({ p, index }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Subtle warm bronze wash that only highlights the surface
  const spotlightBg = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(166, 138, 92, 0.12), transparent 75%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col justify-between overflow-hidden border-b border-[#15140f]/10 p-8 sm:border-r lg:last:border-r-0 lg:p-10 transition-all duration-500 bg-[#fbf9f4] hover:bg-white hover:shadow-[0_24px_50px_-12px_rgba(21,20,15,0.12)] hover:z-10"
    >
      {/* Soft Warm Radial Cursor Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlightBg }}
      />

      {/* Elegant Bronze Accent Top Edge Bar */}
      <div className="absolute top-0 left-0 h-[2.5px] w-0 bg-gradient-to-r from-[#6e5a3c] via-[#a68a5c] to-transparent transition-all duration-700 ease-out group-hover:w-full" />

      {/* Top Metadata & Micro Indicator */}
      <div className="relative z-10">
        <div className="flex items-center justify-between pb-8">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs tracking-widest text-[#948a76] font-medium transition-colors duration-500 group-hover:text-[#6e5a3c]">
              {p.index || `0${index + 1}`}
            </span>
            <div className="h-[1px] w-4 bg-[#15140f]/15 transition-all duration-500 group-hover:w-8 group-hover:bg-[#6e5a3c]" />
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#15140f]/10 bg-white text-[#948a76] shadow-sm transition-all duration-500 group-hover:rotate-90 group-hover:border-[#6e5a3c] group-hover:bg-[#6e5a3c] group-hover:text-white">
            <PiPlusBold size={11} />
          </div>
        </div>

        {/* Large Decorative Faded Background Index */}
        <span
          aria-hidden="true"
          className="font-display pointer-events-none absolute right-2 top-14 select-none text-7xl font-bold tracking-tighter text-[#15140f]/[0.03] transition-all duration-700 group-hover:translate-x-1 group-hover:text-[#6e5a3c]/[0.08]"
        >
          {p.index || `0${index + 1}`}
        </span>

        {/* Title */}
        <h3 className="font-display relative mt-4 text-2xl font-light tracking-wide text-[#15140f] transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:text-[#6e5a3c] sm:text-3xl">
          {p.title}
        </h3>

        {/* Description */}
        <p className="mt-5 text-sm leading-relaxed text-[#15140f]/65 transition-colors duration-500 group-hover:text-[#15140f]/90 font-light">
          {p.desc}
        </p>
      </div>

      {/* Bottom Sub-detail Footer */}
      <div className="relative z-10 mt-12 flex items-center justify-between border-t border-[#15140f]/10 pt-4 transition-all duration-500 group-hover:border-[#6e5a3c]/25">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#948a76] transition-colors duration-500 group-hover:text-[#6e5a3c] font-medium">
          Standard {index + 1}
        </span>
        <PiSparkleFill className="text-[11px] text-[#6e5a3c] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
}

export default function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="relative overflow-hidden bg-[#f5f1e8] py-24 text-[#15140f] selection:bg-[#15140f] selection:text-[#f5f1e8] lg:py-32"
    >
      {/* Ambient Lighting Orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#948a76]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-[#6e5a3c]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-16 border-b border-[#15140f]/10 pb-10">
          <Reveal y={25} duration={0.8}>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6e5a3c] animate-pulse" />
              <span className="eyebrow text-[#948a76] font-mono text-xs uppercase tracking-[0.35em]">
                Design Philosophy
              </span>
            </div>
            <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-[#15140f] sm:text-5xl lg:text-6xl font-normal max-w-2xl">
              Four principles behind{" "}
              <span className="italic font-light text-[#15140f]/60">every address.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15} y={25} duration={0.8}>
            <p className="max-w-md text-sm leading-relaxed text-[#15140f]/60 font-light lg:text-right">
              Every detail is shaped with architectural discipline, ensuring modern luxury endures across generations.
            </p>
          </Reveal>
        </div>

        {/* 4-Card Architectural Grid */}
        <div className="grid grid-cols-1 border-t border-l border-[#15140f]/10 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(21,20,15,0.06)] bg-white">
          {philosophy.map((p, i) => (
            <Reveal key={p.index || i} delay={i * 0.08} duration={0.8}>
              <PhilosophyCard p={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}