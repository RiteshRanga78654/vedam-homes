"use client";

import Image from "next/image";
import { intro } from "@/app/project/data";
import { Reveal } from "./common";

export default function ProjectStory() {
  return (
    <section id="story" className="relative overflow-hidden bg-[#0d2b22] py-20 text-[#f4efe3] sm:py-24">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-[#c6a15b]/10 blur-[130px] ambient-orb" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* Editorial copy */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#c6a15b]">
                <span className="h-px w-8 bg-current" />
                The Story
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-4xl font-light leading-[1.06] tracking-tight sm:text-5xl">
                {intro.titleBig}
                <span className="block italic text-[#dcbd85]">{intro.titleAccent}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-lg font-display text-xl font-light italic leading-[1.7] text-[#f4efe3]/85">
                {intro.body[0]}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-5 max-w-lg text-sm font-light leading-[1.85] text-[#f4efe3]/65">
                {intro.body[1]}
              </p>
            </Reveal>

            {/* Understated stat strip */}
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-[#f4efe3]/12 pt-8">
              {[intro.statOne, intro.statTwo, intro.statThree].map((s, i) => (
                <Reveal key={s.label} delay={0.28 + i * 0.08}>
                  <p className="font-display text-3xl font-light text-[#f4efe3]">
                    {s.value}
                    <span className="text-[#dcbd85]">{s.suffix}</span>
                  </p>
                  <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#f4efe3]/50">
                    {s.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Supporting image */}
          <div className="lg:col-span-6">
            <Reveal y={40}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-[#c6a15b]/20 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.6)]">
                <Image
                  src={intro.introImage}
                  alt="Interiors at Central Park Flower Valley"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  quality={88}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a221b]/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#dcbd85]">
                    Vedam Residences
                  </p>
                  <p className="mt-1 font-display text-xl font-light text-[#f4efe3]">
                    Sanctuaries within the valley
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
