"use client";

import { whyPoints } from "@/app/project/data";
import { Reveal, SectionHeading } from "./common";

export default function ProjectWhy() {
  return (
    <section id="why" className="relative bg-[#0d2b22] py-24 text-[#f4efe3] sm:py-32">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-[#c6a15b]/10 blur-[140px] ambient-orb" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              dark
              eyebrowText="The Argument"
              title="Why this project,"
              accent="not another."
            />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md font-light leading-relaxed text-[#f4efe3]/65">
                In a market of plots and towers, the valley offers something
                rarer — a whole environment built before the residence.
              </p>
            </Reveal>
          </div>

          <div className="space-y-px lg:col-span-7">
            {whyPoints.map((p, i) => (
              <Reveal key={p.index} delay={i * 0.06}>
                <div className="group grid grid-cols-12 gap-4 border-b border-[#f4efe3]/12 py-7 transition-colors duration-300 last:border-0 hover:border-[#c6a15b]/40">
                  <span className="font-mono text-sm text-[#dcbd85] lg:col-span-2">
                    {p.index}
                  </span>
                  <div className="lg:col-span-10">
                    <h3 className="font-display text-2xl font-light text-[#f4efe3] transition-colors duration-300 group-hover:text-[#dcbd85]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm font-light leading-[1.8] text-[#f4efe3]/60">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}