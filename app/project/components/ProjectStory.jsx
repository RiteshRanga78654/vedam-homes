"use client";

import Image from "next/image";
import { intro } from "@/app/project/data";
import { Reveal } from "./common";

export default function ProjectStory() {
  return (
    <section id="story" className="relative overflow-hidden bg-[#0d2b22] py-20 text-[#f4efe3] sm:py-28">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[440px] w-[440px] rounded-full bg-[#c6a15b]/10 blur-[130px] ambient-orb" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-[#143b2e]/60 blur-[120px] ambient-orb" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Eyebrow + headline */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#c6a15b]">
              <span className="h-px w-8 bg-current" />
              The Story
              <span className="h-px w-8 bg-current" />
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-4xl font-light leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              {intro.titleBig}
              <span className="block italic text-[#dcbd85]">{intro.titleAccent}</span>
            </h2>
          </Reveal>
        </div>

        {/* Editorial collage — large image + floating inset */}
        <div className="mt-16 grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Reveal delay={0.14}>
              <p className="max-w-xl font-display text-2xl font-light italic leading-[1.6] text-[#f4efe3]/90 sm:text-[1.7rem]">
                “{intro.body[0]}”
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-6 max-w-xl text-sm font-light leading-[1.9] text-[#f4efe3]/65">
                {intro.body[1]}
              </p>
            </Reveal>

            {/* Stat strip as cards */}
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {[intro.statOne, intro.statTwo, intro.statThree].map((s, i) => (
                <Reveal key={s.label} delay={0.28 + i * 0.08}>
                  <div className="rounded-2xl border border-[#f4efe3]/10 bg-[#f4efe3]/[0.04] px-5 py-6 text-center">
                    <p className="font-display text-3xl font-light text-[#f4efe3]">
                      {s.value}
                      <span className="text-[#dcbd85]">{s.suffix}</span>
                    </p>
                    <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#f4efe3]/50">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <Reveal y={40} className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-[#c6a15b]/20 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.7)]">
                <Image
                  src={intro.introImage}
                  alt="Interiors at Central Park Flower Valley"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  quality={88}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a221b]/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-7">
                  <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#dcbd85]">
                    Vedam Residences
                  </p>
                  <p className="mt-1 font-display text-xl font-light text-[#f4efe3]">
                    Sanctuaries within the valley
                  </p>
                </div>
              </div>

              {/* Floating inset image */}
              <div className="absolute -bottom-8 -right-4 w-[46%] sm:-right-8">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-[#c6a15b]/25 bg-[#0a221b] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
                  <Image
                    src={intro.introImageSecondary}
                    alt="Gardens at Central Park Flower Valley"
                    fill
                    sizes="(max-width: 640px) 40vw, 22vw"
                    quality={86}
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.24em] text-[#f4efe3]/45 sm:text-[10px]">
                  The botanical reserves
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}