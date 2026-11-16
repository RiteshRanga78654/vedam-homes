"use client";

import Image from "next/image";
import { PiArrowUpRightLight } from "react-icons/pi";
import { ourHomes } from "@/app/project/data";
import { Reveal } from "./common";

export default function ProjectHomes() {
  return (
    <section id="homes" className="relative overflow-hidden bg-[#f6efe1] py-16 text-[#14201a] sm:py-20">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#14201a]/10 pb-6">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#c07a4e]">
                <span className="h-px w-8 bg-current" />
                The Township
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display mt-4 text-3xl font-light leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                Plot by plot,
                <span className="italic text-[#c07a4e]"> illustrated.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="max-w-sm pb-1 text-sm font-light leading-relaxed text-[#14201a]/60">
              Build at your own pace on a plot that fits the life you want.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ourHomes.map((home, i) => (
            <Reveal key={home.id} delay={i * 0.05}>
              <article className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#14201a]/10 bg-[#171512]">
                <Image
                  src={home.image}
                  alt={home.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={86}
                  loading={i < 3 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/95 via-[#141210]/15 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#dda678]">
                    {home.tag}
                  </p>
                  <h3 className="font-display mt-1.5 text-xl font-light leading-tight text-[#f6efe1] sm:text-2xl">
                    {home.title}
                  </h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm font-light leading-[1.7] text-[#f6efe1]/80 opacity-0 transition-all duration-500 ease-out group-hover:max-h-32 group-hover:opacity-100">
                    {home.desc}
                  </p>
                </div>

                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-[#f6efe1] transition-all duration-500 group-hover:border-[#c07a4e] group-hover:bg-[#c07a4e] group-hover:text-white">
                  <PiArrowUpRightLight size={15} />
                </span>

                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[#c07a4e] transition-transform duration-700 ease-out group-hover:scale-x-100" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
