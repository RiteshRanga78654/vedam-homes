"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PiDownloadSimpleLight, PiBookOpenLight, PiArrowUpRightLight } from "react-icons/pi";
import { Reveal } from "./common";

export default function ProjectBrochure() {
  return (
    <section id="brochure" className="relative bg-canvas py-20 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <Reveal y={40}>
          <div className="group relative overflow-hidden rounded-[28px] border border-[#c6a15b]/25">
            {/* Backdrop with hover zoom */}
            <div className="absolute inset-0">
              <Image
                src="/flower-valley/flower4.png"
                alt="Curated planting along the Flower Valley parkways"
                fill
                sizes="100vw"
                quality={84}
                className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a221b]/97 via-[#0a221b]/75 to-[#0a221b]/45" />
            </div>

            {/* Ambient glow */}
            <motion.div
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -left-20 top-0 h-[300px] w-[300px] rounded-full bg-[#c6a15b]/15 blur-[120px] ambient-orb"
            />

            <div className="relative flex flex-col gap-8 px-7 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:py-16">
              {/* Copy */}
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#dcbd85]">
                  <span className="h-px w-8 bg-current" />
                  The Brochure
                </span>
                <h2 className="mt-4 font-display text-3xl font-light leading-[1.1] tracking-tight text-[#f4efe3] sm:text-4xl lg:text-5xl">
                  Discover the project,
                  <span className="block italic text-[#dcbd85]">in full detail.</span>
                </h2>
                <p className="mt-4 max-w-md text-sm font-light leading-[1.75] text-[#f4efe3]/75">
                  RERA-checked project brochure covering the masterplan, floor
                  plates, pricing constructs and possession timelines.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: document.getElementById("enquiry").offsetTop - 80, behavior: "smooth" })}
                  className="group/btn inline-flex items-center justify-center gap-3 rounded-full bg-[#c6a15b] px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#0a221b] transition-all duration-500 hover:bg-[#dcbd85] hover:shadow-[0_16px_40px_-12px_rgba(198,161,91,0.6)]"
                >
                  <PiBookOpenLight size={15} className="transition-transform duration-500 group-hover/btn:-translate-y-0.5" />
                  View Brochure
                </button>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: document.getElementById("enquiry").offsetTop - 80, behavior: "smooth" })}
                  className="group/btn inline-flex items-center justify-center gap-3 rounded-full border border-[#f4efe3]/40 bg-[#f4efe3]/10 px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#f4efe3] backdrop-blur-md transition-all duration-500 hover:border-[#c6a15b] hover:bg-[#c6a15b]/20"
                >
                  Download
                  <PiDownloadSimpleLight size={15} className="text-[#dcbd85] transition-transform duration-500 group-hover/btn:translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}