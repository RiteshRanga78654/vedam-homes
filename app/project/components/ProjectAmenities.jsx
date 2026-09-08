"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { amenities } from "@/app/project/data";
import { Reveal, SectionHeading } from "./common";

export default function ProjectAmenities() {
  const [active, setActive] = useState(0);
  const item = amenities[active];

  return (
    <section id="amenities" className="relative overflow-hidden bg-[#0d2b22] py-24 text-[#f4efe3] sm:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[#c6a15b]/12 blur-[140px] ambient-orb" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            dark
            eyebrowText="The Experience"
            title="Amenities that"
            accent="read as a resort."
          />
          <Reveal delay={0.2}>
            <p className="max-w-sm pb-2 text-sm font-light leading-relaxed text-[#f4efe3]/60">
              A shared clubhouse, thermal suites, and botanical reserves —
              maintained by a resident hospitality team.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Interactive image stage */}
          <div className="lg:col-span-7">
            <Reveal y={36}>
              <div className="relative aspect-[16/11] overflow-hidden rounded-[28px] border border-[#f4efe3]/10">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    quality={88}
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a221b]/80 to-transparent p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#dcbd85]">
                    0{active + 1} / 0{amenities.length}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-light text-[#f4efe3]">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Selectable list */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between gap-2">
              {amenities.map((am, i) => (
                <Reveal key={am.id} delay={i * 0.05}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-start justify-between gap-4 rounded-2xl border px-6 py-4 text-left transition-all duration-400 ${
                      active === i
                        ? "border-[#c6a15b]/40 bg-[#c6a15b]/10"
                        : "border-transparent hover:border-[#f4efe3]/15 hover:bg-[#f4efe3]/5"
                    }`}
                  >
                    <span>
                      <span
                        className={`block font-display text-lg font-light transition-colors duration-300 ${
                          active === i ? "text-[#dcbd85]" : "text-[#f4efe3]/80"
                        }`}
                      >
                        {am.title}
                      </span>
                      <span className="mt-1 block text-xs font-light leading-relaxed text-[#f4efe3]/55">
                        {am.desc}
                      </span>
                    </span>
                    <span
                      className={`mt-1.5 font-mono text-[10px] tracking-[0.2em] ${
                        active === i ? "text-[#dcbd85]" : "text-[#f4efe3]/30"
                      }`}
                    >
                      0{i + 1}
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}