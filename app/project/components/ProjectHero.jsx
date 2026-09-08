"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLenis } from "lenis/react";
import {
  PiMapPinLight,
  PiArrowDownLight,
  PiSquaresFourLight,
  PiCalendarBlankLight,
} from "react-icons/pi";
import { project, navItems } from "@/app/project/data";
import { easeOut, ScrollIndicator } from "./common";

export default function ProjectHero() {
  const lenis = useLenis();

  const go = (id) => {
    const target = id === "contact" ? "#contact" : `#${id}`;
    if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#0d2b22]">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: easeOut }}
          className="absolute inset-0"
        >
          <Image
            src={project.heroImage}
            alt={project.name}
            fill
            priority
            sizes="100vw"
            quality={88}
            className="object-cover"
          />
        </motion.div>

        {/* Rich overlay — warm dark green, not flat black */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a221b] via-[#0a221b]/55 to-[#0a221b]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a221b]/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f4efe3] to-transparent" />
      </div>

      {/* Ambient gold soft-glow */}
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[460px] w-[460px] rounded-full bg-[#c6a15b]/20 blur-[140px] ambient-orb" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-24 pt-44 lg:px-12 lg:pb-28">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          {/* Left — editorial identity */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: easeOut }}
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

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.4, ease: easeOut }}
              className="font-display mt-7 text-[13vw] font-light leading-[0.95] tracking-tight text-[#f4efe3] drop-shadow-[0_2px_24px_rgba(0,0,0,0.25)] sm:text-6xl lg:text-[6.5rem]"
            >
              {project.name.split(" ").slice(0, 2).join(" ")}
              <br />
              <span className="italic text-[#dcbd85]">
                {project.name.split(" ").slice(2).join(" ")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: easeOut }}
              className="mt-6 max-w-xl font-display text-xl font-light italic leading-relaxed text-[#f4efe3]/85 sm:text-2xl"
            >
              {project.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: easeOut }}
              className="mt-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#f4efe3]/70"
            >
              <PiMapPinLight size={15} className="text-[#c6a15b]" />
              {project.location}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.85, ease: easeOut }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={() => go("overview")}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#c6a15b] px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#0a221b] transition-all duration-500 hover:bg-[#dcbd85]"
              >
                <span className="relative z-10">Explore Project</span>
                <PiArrowDownLight
                  size={14}
                  className="relative z-10 transition-transform duration-500 group-hover:translate-y-0.5"
                />
              </button>

              <button
                type="button"
                onClick={() => go("contact")}
                className="group inline-flex items-center gap-3 rounded-full border border-[#f4efe3]/40 bg-[#f4efe3]/10 px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#f4efe3] backdrop-blur-md transition-all duration-500 hover:border-[#c6a15b] hover:bg-[#c6a15b]/20"
              >
                <PiCalendarBlankLight size={14} className="transition-transform duration-500 group-hover:-translate-y-0.5" />
                Schedule a Visit
              </button>
            </motion.div>
          </div>

          {/* Right — rail of quick facts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: easeOut }}
            className="hidden lg:col-span-4 lg:block"
          >
            <div className="flex flex-col gap-6 border-l border-[#f4efe3]/20 pl-8">
              {[
                { k: "Developer", v: "Central Park" },
                { k: "Master Area", v: "500+ Acres" },
                { k: "Configuration", v: "4 BHK Floors · Villas" },
                { k: "RERA", v: "Phase-wise Registered" },
              ].map((f) => (
                <div key={f.k}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#dcbd85]">
                    {f.k}
                  </p>
                  <p className="mt-1 font-display text-lg font-light text-[#f4efe3]">
                    {f.v}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <ScrollIndicator />
      </motion.div>

      {/* Sticky section nav */}
      <div className="absolute inset-x-0 bottom-0 z-30">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <nav className="flex items-center justify-between overflow-x-auto rounded-t-2xl border border-[#c6a15b]/25 border-b-0 bg-[#f4efe3]/85 px-4 py-2.5 backdrop-blur-xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className="flex-1 whitespace-nowrap px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#0d2b22]/60 transition-colors duration-300 hover:text-[#c6a15b]"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => go("contact")}
              className="ml-2 hidden whitespace-nowrap rounded-full bg-[#0d2b22] px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f4efe3] transition-colors duration-300 hover:bg-[#c6a15b] hover:text-[#0a221b] lg:block"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}