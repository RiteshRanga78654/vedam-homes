"use client";

import Image from "next/image";
import { intro } from "@/app/project/data";
import { Reveal, SectionHeading, CountUp } from "./common";

export default function ProjectIntro() {
  return (
    <section id="overview" className="relative bg-[#f4efe3] py-24 text-[#0d2b22] sm:py-32">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Editorial headline */}
        <SectionHeading
          eyebrowText={intro.eyebrow}
          title={intro.titleBig}
          accent={intro.titleAccent}
        />

        <div className="mt-16 grid items-start gap-14 lg:mt-24 lg:grid-cols-12">
          {/* Body copy — asymmetric column */}
          <div className="lg:col-span-5 lg:pt-6">
            {intro.body.map((text, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p
                  className={`font-light leading-[1.85] text-[#0d2b22]/75 ${
                    i === 0 ? "font-display text-xl italic leading-[1.6] text-[#0d2b22] sm:text-2xl" : "mt-6 text-base"
                  }`}
                >
                  {text}
                </p>
              </Reveal>
            ))}

            {/* Stats — editorial, not dashboard */}
            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-[#0d2b22]/15 pt-10">
              <Reveal delay={0.1}>
                <p className="font-display text-4xl font-light text-[#0d2b22] sm:text-5xl">
                  <CountUp value={intro.statOne.value} suffix={intro.statOne.suffix} />
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#c6a15b]">
                  {intro.statOne.label}
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="font-display text-4xl font-light text-[#0d2b22] sm:text-5xl">
                  <CountUp value={intro.statTwo.value} />
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#c6a15b]">
                  {intro.statTwo.label}
                </p>
              </Reveal>
              <Reveal delay={0.26}>
                <p className="font-display text-4xl font-light text-[#0d2b22] sm:text-5xl">
                  <CountUp value={intro.statThree.value} suffix={intro.statThree.suffix} decimals={1} />
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#c6a15b]">
                  {intro.statThree.label}
                </p>
              </Reveal>
            </div>
          </div>

          {/* Imagery — asymmetric editorial stack */}
          <div className="lg:col-span-7">
            <Reveal y={40}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-24px_rgba(10,34,27,0.5)]">
                <Image
                  src={intro.introImage}
                  alt="Interiors at Central Park Flower Valley"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  quality={90}
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal y={34} delay={0.15}>
              <div className="relative -mt-16 ml-auto aspect-[4/3] w-[62%] overflow-hidden rounded-[22px] border-8 border-[#f4efe3] shadow-[0_30px_60px_-18px_rgba(10,34,27,0.45)] sm:w-[48%]">
                <Image
                  src={intro.introImageSecondary}
                  alt="The botanical grounds"
                  fill
                  sizes="(max-width: 1024px) 62vw, 28vw"
                  quality={88}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a221b]/50 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#dcbd85]">
                    The Grounds
                  </p>
                  <p className="font-display text-lg font-light text-[#f4efe3]">
                    Nine botanical reserves
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