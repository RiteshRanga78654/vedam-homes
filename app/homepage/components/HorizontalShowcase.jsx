"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PiArrowUpRightLight, PiSparkleFill } from "react-icons/pi";
import projects from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalShowcaseGSAP() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const progressEl = progressBarRef.current;
      if (!track) return;

      const getScrollAmount = () => track.scrollWidth - window.innerWidth + 120;

      // 1. Horizontal Pinning Scroller
      const scrollTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.8,
          fastScrollEnd: 2500,
          preventOverlaps: true,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressEl) {
              progressEl.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      // 2. Parallax Image Layer
      const images = gsap.utils.toArray(".showcase-img");
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: 10 },
          {
            xPercent: -10,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: img,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

      return () => clearTimeout(refreshTimeout);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#f5f1e8] text-[#15140f] select-none"
    >
      <div className="flex h-full flex-col justify-between py-10 lg:py-14">
        
        {/* Header with Editorial Tracker */}
        <div className="mx-auto flex w-full max-w-[1600px] items-end justify-between px-6 lg:px-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6e5a3c] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#948a76]">
                Selected Portfolio
              </span>
            </div>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-[#15140f] sm:text-5xl lg:text-6xl">
              Cinematic curation,{" "}
              <span className="italic font-light text-[#15140f]/60">scrolled sideways.</span>
            </h2>
          </div>

          {/* Progress Bar (Zero Layout Shift via scaleX) */}
          <div className="hidden flex-col items-end gap-3 sm:flex">
            <span className="font-mono text-xs tracking-widest uppercase text-[#948a76]">
              Scroll to explore
            </span>
            <div className="relative h-[2px] w-48 overflow-hidden bg-[#15140f]/10 rounded-full">
              <div
                ref={progressBarRef}
                style={{ transformOrigin: "left", transform: "scaleX(0)" }}
                className="h-full w-full bg-gradient-to-r from-[#6e5a3c] to-[#a68a5c] will-change-transform"
              />
            </div>
          </div>
        </div>

        {/* Sliding Horizontal Track */}
        <div className="w-full">
          <div
            ref={trackRef}
            className="flex gap-8 px-6 sm:gap-10 lg:gap-12 lg:px-12 w-max will-change-transform"
          >
            {projects.map((project, index) => (
              <a
                key={project.id}
                href={`#${project.id}`}
                className="group relative h-[60vh] w-[85vw] shrink-0 overflow-hidden rounded-[28px] border border-[#15140f]/10 bg-white shadow-[0_12px_40px_rgba(21,20,15,0.05)] transition-all duration-500 hover:border-[#6e5a3c]/40 hover:shadow-[0_24px_50px_rgba(21,20,15,0.12)] sm:w-[50vw] lg:h-[64vh] lg:w-[32vw]"
              >
                {/* Parallax Image Target */}
                <div className="absolute inset-0 h-full w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="eager"
                    className="showcase-img h-full w-[120%] -left-[10%] object-cover filter brightness-[0.95] contrast-[1.03] will-change-transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Dark Contrast Gradient for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#15140f]/90 via-[#15140f]/25 to-transparent opacity-95 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[#f5f1e8]">
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 backdrop-blur-md">
                    <PiSparkleFill className="text-[#a68a5c] text-[10px]" />
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/90">
                      {project.type || "Architecture"}
                    </span>
                  </div>

                  <span className="font-mono text-xs tracking-widest text-white/70">
                    0{index + 1} / 0{projects.length}
                  </span>
                </div>

                {/* Content Details */}
                <div className="absolute inset-x-6 bottom-6 flex flex-col justify-end text-[#f5f1e8]">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#a68a5c]">
                    {project.location}
                  </span>

                  <h3 className="font-display mt-1 text-2xl font-light tracking-tight text-white transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl lg:text-4xl">
                    {project.name}
                  </h3>

                  <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4">
                    <p className="text-xs font-light text-white/70 line-clamp-1 max-w-[75%]">
                      {project.description}
                    </p>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/15 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#6e5a3c] group-hover:text-white group-hover:border-[#6e5a3c]">
                      <PiArrowUpRightLight size={18} />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Index */}
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 lg:px-12 text-xs font-mono text-[#948a76]">
          <span>01 / INDEX SEQUENCE</span>
          <span className="uppercase tracking-widest">{projects.length} Works Rendered</span>
        </div>

      </div>
    </section>
  );
}