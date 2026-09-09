"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ourHomes } from "@/app/project/data";
import { Reveal } from "./common";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectHomes() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(
    () => {
      // Staggered clip-path curtain reveal per card on first entry
      gsap.fromTo(
        ".homes-card",
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", y: 40 },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          y: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Slow image parallax inside each card
      const imgs = gsap.utils.toArray(".homes-img");
      imgs.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".homes-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="homes" ref={sectionRef} className="relative overflow-hidden bg-canvas py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Heading */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink/10 pb-8">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#c6a15b]">
                <span className="h-px w-8 bg-current" />
                Our Homes
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display mt-5 text-4xl font-light leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
                Suite by suite,
                <span className="italic text-[#c6a15b]"> illustrated.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.18}>
            <p className="max-w-sm pb-1 text-sm font-light leading-relaxed text-ink/60">
              Every space at Vedam is drawn around light, flow and quiet —
              a visual index of the residence, right here.
            </p>
          </Reveal>
        </div>

        {/* Image-led masonry — mangalrealty.com/projects spirit */}
        <div ref={gridRef} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ourHomes.map((home, i) => (
            <article
              key={home.id}
              className="homes-card group relative overflow-hidden rounded-[26px] border border-ink/10 bg-[#0a221b] will-change-transform"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[4/5]">
                <Image
                  src={home.image}
                  alt={home.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={86}
                  loading={i < 3 ? "eager" : "lazy"}
                  className="homes-img object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
                />
                {/* Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a221b]/95 via-[#0a221b]/15 to-transparent" />

                {/* Index */}
                <span className="absolute right-5 top-5 rounded-full border border-[#f4efe3]/25 bg-[#0a221b]/55 px-3 py-1.5 font-mono text-[10px] tracking-[0.25em] text-[#dcbd85] backdrop-blur-md">
                  0{i + 1} / 0{ourHomes.length}
                </span>

                {/* Masonry-caption block */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#dcbd85]">
                    {home.tag}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-light leading-tight text-[#f4efe3] sm:text-[1.7rem]">
                    {home.title}
                  </h3>
                  <p className="mt-3 max-h-0 overflow-hidden text-sm font-light leading-[1.7] text-[#f4efe3]/80 opacity-0 transition-all duration-700 ease-out group-hover:max-h-40 group-hover:opacity-100">
                    {home.desc}
                  </p>
                </div>

                {/* Gold hairline on hover */}
                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[#c6a15b] transition-transform duration-700 ease-out group-hover:scale-x-100" />
              </div>
            </article>
          ))}
        </div>

        {/* Footnote */}
        <Reveal delay={0.1}>
          <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-ink/40">
            Visual index — interior renders from the Flower Valley archive
          </p>
        </Reveal>
      </div>
    </section>
  );
}