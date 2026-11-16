"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { PiMapPinLight, PiSquaresFourLight, PiArrowRight } from "react-icons/pi";
import { project } from "@/app/project/data";
import { easeOut } from "./common";

export default function ProjectHero() {
  const lenis = useLenis();

  const go = (id) => {
    const target = document.querySelector(`#${id}`);
    if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.4 });
    else target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative flex min-h-[88svh] items-end overflow-hidden bg-[#141210]">
      {/* Single cinematic scene — video when available, otherwise still */}
      <div className="absolute inset-0">
        {project.heroVideo ? (
          <video
            className="h-full w-full object-cover"
            src={project.heroVideo}
            poster={project.heroImage}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <Image
            src={project.heroImage}
            alt={project.name}
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[#141210]/25" />
      </div>

      {/* Layered overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/45 to-[#141210]/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#141210]/80 via-[#141210]/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f6efe1] to-transparent" />
      <div className="pointer-events-none absolute -right-28 top-1/4 h-[460px] w-[460px] rounded-full bg-[#c07a4e]/15 blur-[130px] ambient-orb" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-20 pt-36 lg:px-12 lg:pb-24">
        {/* Category chips */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c07a4e]/40 bg-[#141210]/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#dda678] backdrop-blur-md">
            <PiSquaresFourLight size={13} />
            {project.category}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f6efe1]/25 bg-[#f6efe1]/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#f6efe1]/90 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c07a4e]" />
            {project.status}
          </span>
        </motion.div>

        {/* Editorial headline */}
        <motion.h1
          initial={{ opacity: 0, y: 38 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.32, ease: easeOut }}
          className="font-display mt-6 max-w-5xl text-[10vw] font-light leading-[0.95] tracking-tight text-[#f6efe1] drop-shadow-[0_2px_28px_rgba(0,0,0,0.35)] sm:text-7xl lg:text-[6.5rem]"
        >
          Osiyan
          <span className="block italic text-[#dda678]">Habitat.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.48, ease: easeOut }}
          className="mt-7 max-w-2xl font-light text-base leading-[1.8] text-[#f6efe1]/85 sm:text-lg"
        >
          {project.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: easeOut }}
          className="mt-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#f6efe1]/70"
        >
          <PiMapPinLight size={15} className="text-[#c07a4e]" />
          {project.locationShort}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.72, ease: easeOut }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={() => go("gallery")}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#c07a4e] px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#141210] transition-all duration-500 hover:bg-[#dda678]"
          >
            <span className="relative z-10">Explore Project</span>
            <PiArrowRight
              size={14}
              className="relative z-10 transition-transform duration-500 group-hover:translate-x-1"
            />
          </button>
          <button
            type="button"
            onClick={() => go("enquiry")}
            className="group inline-flex items-center gap-3 rounded-full border border-[#f6efe1]/40 bg-[#f6efe1]/10 px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#f6efe1] backdrop-blur-md transition-all duration-500 hover:border-[#c07a4e] hover:bg-[#c07a4e]/20"
          >
            Schedule a Visit
            <PiMapPinLight size={14} className="transition-transform duration-500 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>

        {/* Quick facts strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.95 }}
          className="mt-10 hidden max-w-2xl flex-wrap items-center gap-x-10 gap-y-4 border-t border-[#f6efe1]/15 pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f6efe1]/60 sm:flex"
        >
          <span>5.954 Acres</span>
          <span className="h-3 w-px bg-[#f6efe1]/20" />
          <span>94 Premium Plots</span>
          <span className="h-3 w-px bg-[#f6efe1]/20" />
          <span>Mar 2029</span>
          <span className="h-3 w-px bg-[#f6efe1]/20" />
          <span>RERA Approved</span>
        </motion.div>
      </div>
    </section>
  );
}