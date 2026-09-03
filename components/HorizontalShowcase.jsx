"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PiArrowUpRightLight, PiSparkleFill } from "react-icons/pi";
import projects from "@/data/projects";

// Register ScrollTrigger plugin
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
      const totalScrollWidth = track.scrollWidth - window.innerWidth + 120;

      // Pin the section and slide the track horizontally
      const scrollTween = gsap.to(track, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.2, // Smooth inertia scrub
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // Dual-Axis Image Parallax for each card inside the track
      gsap.utils.toArray(".showcase-img").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: 15, scale: 1.15 },
          {
            xPercent: -15,
            scale: 1,
            ease: "none",
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
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#0d0e12] text-ivory select-none"
    >
      <div className="flex h-full flex-col justify-between py-10 lg:py-14">
        
        {/* Header with GSAP Real-time Tracker */}
        <div className="mx-auto flex w-full max-w-[1600px] items-end justify-between px-6 lg:px-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-200/80">
                GSAP Engineered
              </span>
            </div>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Cinematic curation,{" "}
              <span className="italic font-light text-white/60">scrolled sideways.</span>
            </h2>
          </div>

          {/* GSAP Progress Bar */}
          <div className="hidden flex-col items-end gap-3 sm:flex">
            <span className="font-mono text-xs tracking-widest uppercase text-ivory/40">
              Scroll to explore
            </span>
            <div className="relative h-[2px] w-48 overflow-hidden bg-white/10 rounded-full">
              <div
                ref={progressBarRef}
                className="h-full w-0 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full"
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
                className="group relative h-[60vh] w-[85vw] shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl transition-all duration-700 hover:border-amber-300/40 sm:w-[50vw] lg:h-[64vh] lg:w-[32vw]"
              >
                {/* Parallax Image Target */}
                <div className="absolute inset-0 h-full w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="showcase-img h-full w-full object-cover filter brightness-[0.88] contrast-[1.05] will-change-transform"
                  />
                </div>

                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-[#0d0e12]/30 to-transparent opacity-90" />

                {/* Top Badge */}
                <div className="absolute inset-x-6 top-6 flex items-center justify-between text-ivory">
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3.5 py-1.5 backdrop-blur-md">
                    <PiSparkleFill className="text-amber-300 text-[10px]" />
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase">
                      {project.type || "Architecture"}
                    </span>
                  </div>

                  <span className="font-mono text-xs tracking-widest text-ivory/50">
                    0{index + 1} / 0{projects.length}
                  </span>
                </div>

                {/* Content Details */}
                <div className="absolute inset-x-6 bottom-6 flex flex-col justify-end text-ivory">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-amber-200/80">
                    {project.location}
                  </span>

                  <h3 className="font-display mt-1 text-2xl font-light tracking-tight text-white transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl lg:text-4xl">
                    {project.name}
                  </h3>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                    <p className="text-xs font-light text-ivory/60 line-clamp-1 max-w-[75%]">
                      {project.description}
                    </p>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-amber-300 group-hover:text-charcoal group-hover:border-amber-300">
                      <PiArrowUpRightLight size={18} />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Index */}
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 lg:px-12 text-xs font-mono text-ivory/40">
          <span>01 / GSAP TIMELINE</span>
          <span className="uppercase tracking-widest">{projects.length} Works Rendered</span>
        </div>

      </div>
    </section>
  );
}