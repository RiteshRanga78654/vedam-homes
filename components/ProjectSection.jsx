"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { PiArrowUpRightLight, PiSparkleFill } from "react-icons/pi";
import Reveal from "@/components/Reveal";
import projects from "@/data/projects";

function ProjectCard({ p, index, total, isMobile }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Scale down and dim slightly as next card covers it
  const scale = useTransform(smoothProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 0.92]);
  const opacity = useTransform(smoothProgress, [0, 0.8, 1], prefersReducedMotion ? [1, 1, 1] : [1, 0.95, 0.6]);
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);

  // Card sticky top offset
  const topOffset = isMobile ? 80 + index * 16 : 100 + index * 24;

  const handleMouseMove = (e) => {
    if (isMobile || prefersReducedMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.015);
    setRotateY(x * 0.015);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={containerRef}
      id={`section-${p.id}`}
      className="sticky w-full flex items-start justify-center pb-24 lg:pb-32"
      style={{
        top: `${topOffset}px`,
        zIndex: index + 1, // Higher index cards will slide OVER previous cards
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
          scale,
          opacity,
          willChange: "transform, opacity",
          transformPerspective: 1200,
        }}
        className="group relative w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#121316] p-6 sm:p-8 lg:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-700 hover:border-amber-400/40"
      >
        {/* Ambient Radial Hover Glow */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-stone-500/10 blur-3xl" />

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          
          {/* Visual Showcase Card */}
          <a
            href={`#${p.id}`}
            aria-label={`Explore ${p.name}`}
            className="group/img relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-white/10 shadow-2xl lg:col-span-7 lg:aspect-[16/11]"
          >
            <motion.div style={{ scale: imageScale }} className="absolute inset-0 h-full w-full">
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover filter brightness-[0.88] contrast-[1.05] transition-transform duration-1000 ease-out group-hover/img:scale-105"
              />
            </motion.div>

            {/* Cinematic Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/90 via-[#0a0a0c]/30 to-transparent opacity-85 transition-opacity duration-700 group-hover/img:opacity-95" />

            {/* Status Floating Pill */}
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 backdrop-blur-md">
              <PiSparkleFill className="text-amber-300 text-[10px] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ivory">
                {p.status || "Exclusive"}
              </span>
            </div>

            {/* Architectural Watermark Number */}
            <span
              aria-hidden="true"
              className="font-display pointer-events-none absolute right-4 -bottom-6 select-none text-[7rem] font-bold leading-none tracking-tighter text-white/[0.05] sm:text-[9rem] lg:text-[11rem]"
            >
              0{index + 1}
            </span>

            {/* Internal Image Banner Data */}
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-ivory">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-300">
                  {p.type} — {p.location}
                </p>
                <h3 className="font-display mt-1 text-2xl sm:text-4xl text-white font-medium drop-shadow-sm">
                  {p.name}
                </h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-500 group-hover/img:scale-110 group-hover/img:bg-amber-400 group-hover/img:text-charcoal group-hover/img:border-amber-400">
                <PiArrowUpRightLight size={22} />
              </div>
            </div>
          </a>

          {/* Editorial Content Column */}
          <div className="flex flex-col justify-between lg:col-span-5 py-2 text-ivory">
            <div>
              {/* Counter Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-normal text-white">0{index + 1}</span>
                  <span className="text-xs uppercase tracking-widest text-ivory/40 font-mono">/ 0{total}</span>
                </div>
                <span className="text-xs font-mono tracking-widest text-amber-300/80 uppercase">
                  {p.location}
                </span>
              </div>

              {/* Title & Description */}
              <div className="mt-8">
                <h4 className="font-display text-3xl sm:text-4xl font-light text-white tracking-tight">
                  {p.name}
                </h4>
                <p className="mt-4 text-base leading-relaxed text-ivory/70 font-light">
                  {p.description}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-md">
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-ivory/40">Typology</span>
                  <span className="font-medium text-sm text-white mt-0.5 block">{p.type}</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-md">
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-ivory/40">Status</span>
                  <span className="font-medium text-sm text-white mt-0.5 block">{p.status}</span>
                </div>
              </div>
            </div>

            {/* Interactive Call to Action */}
            <div className="mt-10 pt-4">
              <a
                href={`#${p.id}`}
                id={p.id}
                className="group/btn relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-500 hover:border-amber-400 hover:bg-amber-400 hover:text-charcoal hover:shadow-[0_0_35px_rgba(252,211,77,0.3)]"
              >
                <span>Explore Residence</span>
                <PiArrowUpRightLight
                  className="transition-transform duration-500 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                  size={16}
                />
              </a>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="projects" className="relative bg-[#0a0a0c] py-24 lg:py-36 text-ivory selection:bg-amber-300 selection:text-charcoal overflow-visible">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none fixed -left-40 top-1/4 h-[600px] w-[600px] rounded-full bg-amber-600/10 blur-[160px]" />
      <div className="pointer-events-none fixed -right-40 bottom-1/4 h-[600px] w-[600px] rounded-full bg-stone-500/10 blur-[160px]" />

      <div className="relative mx-auto max-w-[1550px] px-6 lg:px-12">
        {/* Curated Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-24 border-b border-white/10 pb-12">
          <Reveal y={40} duration={0.9}>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="eyebrow text-amber-200/80 font-mono uppercase tracking-[0.35em] text-xs">
                Portfolio Archive
              </span>
            </div>
            <h2 className="font-display max-w-3xl text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Curated living spaces.
              <br />
              <span className="italic font-light text-white/60">Uncompromised vision.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15} y={40} duration={0.9}>
            <div className="flex flex-col items-start lg:items-end gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-ivory/40">
                Total Works: {projects.length}
              </span>
              <a
                href="#journal"
                className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-mono text-xs uppercase tracking-widest text-ivory backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:bg-amber-400 hover:text-charcoal"
              >
                <span>View Index</span>
                <PiArrowUpRightLight className="transition-transform group-hover:rotate-45" size={16} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Stacking Stack Viewport */}
        <div className="relative flex flex-col">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              p={p}
              index={i}
              total={projects.length}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}