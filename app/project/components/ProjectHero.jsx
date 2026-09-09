"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  PiMapPinLight,
  PiPlayLight,
  PiPauseLight,
  PiSquaresFourLight,
} from "react-icons/pi";
import { project } from "@/app/project/data";
import { easeOut, ScrollIndicator } from "./common";

const SCENES = [
  { id: "video", type: "video", src: "/flower-valley/Central Park Flower Valley.mp4", label: "The Valley" },
  { id: "elevation", type: "image", src: "/project-img/project-elevations.png", label: "Elevation" },
  { id: "interior", type: "image", src: "/flower-valley/scrollselene5.png", label: "Interiors" },
];

export default function ProjectHero() {
  const lenis = useLenis();
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (id) => {
    const target = document.querySelector(`#${id}`);
    if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.4 });
    else target?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-advance the scene slider
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setScene((s) => (s + 1) % SCENES.length);
    }, 6500);
    return () => clearInterval(t);
  }, [paused]);

  const current = SCENES[scene];

  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#0a221b]">
      {/* Scene slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current.id + scene}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: easeOut }}
            className="absolute inset-0 will-change-transform"
          >
            {current.type === "video" ? (
              <video
                className="h-full w-full object-cover"
                src={current.src}
                poster="/project-img/project-elevations.png"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <Image
                src={current.src}
                alt={`${project.name} — ${current.label}`}
                fill
                priority={scene === 0}
                sizes="100vw"
                quality={84}
                className="object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Layered overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a221b] via-[#0a221b]/50 to-[#0a221b]/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a221b]/75 via-[#0a221b]/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-canvas to-transparent" />
      <div className="pointer-events-none absolute -right-28 top-1/4 h-[420px] w-[420px] rounded-full bg-[#c6a15b]/15 blur-[130px] ambient-orb" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-32 pt-40 lg:px-12">
        {/* Category chips — vedamhomes style navigator */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c6a15b]/40 bg-[#0a221b]/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#dcbd85] backdrop-blur-md">
            <PiSquaresFourLight size={13} />
            {project.category}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f4efe3]/25 bg-[#f4efe3]/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#f4efe3]/90 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c6a15b]" />
            {project.status}
          </span>
        </motion.div>

        {/* Editorial headline */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.32, ease: easeOut }}
          className="font-display mt-6 max-w-4xl text-[13vw] font-light leading-[0.95] tracking-tight text-[#f4efe3] drop-shadow-[0_2px_24px_rgba(0,0,0,0.25)] sm:text-8xl lg:text-[7rem]"
        >
          Ultra Luxury Homes
          <span className="block italic text-[#dcbd85]">in Central Park Flower Valley</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.48, ease: easeOut }}
          className="mt-6 max-w-2xl font-light text-base leading-[1.8] text-[#f4efe3]/80 sm:text-lg"
        >
          {project.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: easeOut }}
          className="mt-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#f4efe3]/70"
        >
          <PiMapPinLight size={15} className="text-[#c6a15b]" />
          {project.locationShort}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.72, ease: easeOut }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={() => go("gallery")}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#c6a15b] px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#0a221b] transition-all duration-500 hover:bg-[#dcbd85]"
          >
            <span className="relative z-10">Explore Project</span>
            <PiPlayLight
              size={14}
              className="relative z-10 transition-transform duration-500 group-hover:translate-x-0.5"
            />
          </button>
          <button
            type="button"
            onClick={() => go("enquiry")}
            className="group inline-flex items-center gap-3 rounded-full border border-[#f4efe3]/40 bg-[#f4efe3]/10 px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#f4efe3] backdrop-blur-md transition-all duration-500 hover:border-[#c6a15b] hover:bg-[#c6a15b]/20"
          >
            Schedule a Visit
            <PiMapPinLight size={14} className="transition-transform duration-500 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>

        {/* Scene slider rail — the "slider" */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.95 }}
          className="mt-12 flex items-center gap-4"
        >
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setScene(i);
                setPaused(true);
              }}
              className={`group flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] backdrop-blur-md transition-all duration-500 ${
                i === scene
                  ? "border-[#c6a15b] bg-[#c6a15b]/20 text-[#dcbd85]"
                  : "border-[#f4efe3]/20 bg-[#f4efe3]/5 text-[#f4efe3]/55 hover:border-[#c6a15b]/50 hover:text-[#f4efe3]"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current transition-opacity duration-300" />
              {s.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play slider" : "Pause slider"}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-[#f4efe3]/25 bg-[#f4efe3]/10 text-[#f4efe3] backdrop-blur-md transition-all duration-300 hover:bg-[#c6a15b] hover:text-[#0a221b]"
          >
            {paused ? <PiPlayLight size={14} /> : <PiPauseLight size={14} />}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-28 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}