"use client";

import { highlights } from "@/app/project/data";
import { Reveal } from "./common";
import {
  PiMapPinLight,
  PiBuildingLight,
  PiLeafLight,
  PiRoadHorizonLight,
  PiCoatHangerLight,
  PiShieldCheckLight,
  PiTrendUpLight,
} from "react-icons/pi";

const iconMap = {
  location: PiMapPinLight,
  architecture: PiBuildingLight,
  green: PiLeafLight,
  connectivity: PiRoadHorizonLight,
  lifestyle: PiCoatHangerLight,
  security: PiShieldCheckLight,
  invest: PiTrendUpLight,
};

export default function ProjectHighlights() {
  return (
    <section id="highlights" className="relative bg-[#f4efe3] py-24 text-[#0d2b22] sm:py-32">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#c6a15b]">
                <span className="h-px w-8 bg-current" />
                Why It Matters
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-4xl font-light leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
                Seven reasons the valley
                <span className="italic text-[#c6a15b]"> holds its value.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-5">
            <p className="font-light leading-relaxed text-[#0d2b22]/65">
              From the elevated corridor frontage to the private floor plates,
              these are the qualities buyers weigh against every alternative in
              South Gurugram.
            </p>
          </Reveal>
        </div>

        {/* Editorial grid — staggered magazine layout */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-[#0d2b22]/12 bg-[#0d2b22]/12 sm:grid-cols-2 lg:grid-cols-3 lg:mt-24">
          {highlights.map((h, i) => {
            const Icon = iconMap[h.id] || PiLeafLight;
            return (
              <Reveal key={h.id} delay={(i % 3) * 0.08} className="h-full">
                <div className="group relative flex h-full flex-col bg-[#f4efe3] p-8 transition-colors duration-500">
                  <span className="absolute right-6 top-6 font-mono text-xs text-[#0d2b22]/25">
                    0{i + 1}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0d2b22] text-[#dcbd85] transition-all duration-500 group-hover:bg-[#c6a15b] group-hover:text-[#0a221b]">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-light text-[#0d2b22]">
                    {h.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-[1.8] text-[#0d2b22]/65">
                    {h.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}