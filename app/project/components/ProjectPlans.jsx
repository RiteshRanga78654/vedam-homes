"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PiArrowsOutLight, PiXLight, PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi";
import { floorPlans, masterplanImages } from "@/app/project/data";
import { Reveal, SectionHeading } from "./common";

export default function ProjectPlans() {
  const [activeTab, setActiveTab] = useState("floors");
  const [viewer, setViewer] = useState(null); // index into active list

  const list = activeTab === "floors" ? floorPlans : masterplanImages;

  const next = () => setViewer((i) => (i === null ? null : (i + 1) % list.length));
  const prev = () => setViewer((i) => (i === null ? null : (i - 1 + list.length) % list.length));

  return (
    <section id="plans" className="relative bg-[#0d2b22] py-24 text-[#f4efe3] sm:py-32">
      <div className="pointer-events-none absolute -left-32 bottom-10 h-[420px] w-[420px] rounded-full bg-[#c6a15b]/10 blur-[140px] ambient-orb" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            dark
            eyebrowText="The Plans"
            title="Three typologies,"
            accent="drawn around light."
          />
          <Reveal delay={0.2}>
            <p className="max-w-sm pb-2 text-sm font-light leading-relaxed text-[#f4efe3]/60">
              Direct elevator arrival, individual land footprints, and floor
              plates that never share a wall.
            </p>
          </Reveal>
        </div>

        {/* Sub-toggle: Floorplans | Masterplan */}
        <Reveal delay={0.1}>
          <div className="mt-8 inline-flex rounded-full border border-[#f4efe3]/15 bg-[#f4efe3]/5 p-1">
            {[
              { id: "floors", label: "Floor Plans" },
              { id: "masterplan", label: "Masterplan & Elevations" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setActiveTab(t.id);
                  setViewer(null);
                }}
                className={`rounded-full px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-300 ${
                  activeTab === t.id
                    ? "bg-[#c6a15b] text-[#0a221b]"
                    : "text-[#f4efe3]/65 hover:text-[#f4efe3]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item, i) => (
            <Reveal key={item.id ?? item.src} delay={(i % 3) * 0.08}>
              <button
                type="button"
                onClick={() => setViewer(i)}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[26px] border border-[#f4efe3]/10 text-left"
              >
                <div className="relative aspect-[4/3] w-full bg-[#0a221b]">
                  <Image
                    src={item.image ?? item.src}
                    alt={item.name ?? item.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    quality={86}
                    className="object-cover opacity-95 transition-[transform,opacity] duration-[1200ms] ease-out group-hover:scale-[1.05] group-hover:opacity-100"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a221b]/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#dcbd85]">
                    {item.id ? `Typology 0${i + 1}` : "Elevation"}
                  </p>
                  <h3 className="mt-1.5 font-display text-2xl font-light text-[#f4efe3]">
                    {item.name ?? item.label}
                  </h3>
                  {item.size && (
                    <p className="mt-1 text-xs font-light text-[#f4efe3]/65">{item.size}</p>
                  )}
                </div>
                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f4efe3]/10 text-[#f4efe3] opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <PiArrowsOutLight size={16} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Fullscreen circular viewer */}
        {viewer !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0a221b]/95 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => setViewer(null)}
              aria-label="Close"
              className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#f4efe3]/25 bg-[#f4efe3]/10 text-[#f4efe3] transition-colors duration-300 hover:bg-[#c6a15b] hover:text-[#0a221b]"
            >
              <PiXLight size={20} />
            </button>

            <motion.div
              key={viewer}
              initial={{ opacity: 0, x: 50, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative max-h-[82vh] w-full max-w-6xl px-4"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/10]">
                <Image
                  src={list[viewer].image ?? list[viewer].src}
                  alt={list[viewer].name ?? list[viewer].label}
                  fill
                  sizes="100vw"
                  quality={92}
                  priority
                  className="object-contain"
                />
              </div>
              <div className="mt-5 flex items-center justify-between px-1">
                <p className="font-display text-lg font-light italic text-[#f4efe3]">
                  {list[viewer].name ?? list[viewer].label}
                </p>
                {list[viewer].size && (
                  <p className="font-mono text-xs tracking-[0.24em] text-[#dcbd85]">
                    {list[viewer].size}
                  </p>
                )}
              </div>
            </motion.div>

            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#f4efe3]/25 bg-[#f4efe3]/10 text-[#f4efe3] transition-colors duration-300 hover:bg-[#c6a15b] hover:text-[#0a221b] sm:left-8 sm:h-14 sm:w-14"
            >
              <PiCaretLeftLight size={26} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#f4efe3]/25 bg-[#f4efe3]/10 text-[#f4efe3] transition-colors duration-300 hover:bg-[#c6a15b] hover:text-[#0a221b] sm:right-8 sm:h-14 sm:w-14"
            >
              <PiCaretRightLight size={26} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}