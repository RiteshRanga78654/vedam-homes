"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PiArrowUpRightLight, PiSparkleFill, PiBookOpenTextLight } from "react-icons/pi";
import articles from "@/data/articles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ArticlesSection() {
  const containerRef = useRef(null);
  const featuredCardRef = useRef(null);
  const [featured, ...rest] = articles;
  // Right side par theek 3 articles display honge image ke barabar
  const sideArticles = rest.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Master timeline for entrance choreography
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      masterTl
        .from(".split-line", {
          yPercent: 120,
          rotateX: -20,
          opacity: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
        })
        .fromTo(
          ".journal-img-reveal",
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", scale: 1.15 },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", scale: 1, duration: 1.4, ease: "expo.out" },
          "-=0.6"
        )
        .fromTo(
          ".journal-row",
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" },
          "-=0.8"
        );

      // 2. Parallax Target on Featured Image
      gsap.fromTo(
        ".parallax-target",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: featuredCardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // 3. Magnetic Button
      const magneticButtons = gsap.utils.toArray(".magnetic-btn");
      magneticButtons.forEach((btn) => {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });

        const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const { left, top, width, height } = btn.getBoundingClientRect();
          const x = (clientX - (left + width / 2)) * 0.35;
          const y = (clientY - (top + height / 2)) * 0.35;
          xTo(x);
          yTo(y);
        };

        const handleMouseLeave = () => {
          xTo(0);
          yTo(0);
        };

        btn.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journal"
      ref={containerRef}
      className="relative overflow-hidden bg-[#0a0a0c] py-24 text-ivory selection:bg-amber-300 selection:text-charcoal lg:py-20"
    >
      {/* Studio Radial Background Orbs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-amber-600/10 blur-[100px] ambient-orb" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-stone-500/10 blur-[100px] ambient-orb" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Header with masked lines */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="eyebrow text-amber-200/80 font-mono text-xs uppercase tracking-[0.35em]">
                Architectural Journal
              </span>
            </div>

            <div className="overflow-hidden">
              <h2 className="split-line font-display max-w-2xl text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Notes on architecture,{" "}
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="split-line font-display max-w-2xl text-4xl leading-[1.05] tracking-tight text-white/60 italic font-light sm:text-5xl lg:text-6xl">
                material &amp; living.
              </h2>
            </div>
          </div>

          <a
            href="#"
            className="magnetic-btn group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-mono text-xs uppercase tracking-widest text-ivory backdrop-blur-md transition-colors hover:border-amber-400/50 hover:bg-amber-400 hover:text-charcoal"
          >
            <PiBookOpenTextLight size={16} />
            <span>View All Insights</span>
            <PiArrowUpRightLight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={14} />
          </a>
        </div>

        {/* Equal Height Grid (Image matches exact height of the 3 articles) */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-stretch">
          
          {/* Left Hero Article Image Frame */}
          <div ref={featuredCardRef} className="lg:col-span-7 h-full flex flex-col">
            <a
              href="#"
              className="journal-img-reveal group relative flex-1 w-full min-h-[360px] sm:min-h-[460px] lg:min-h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-2xl transition-all duration-700 hover:border-amber-400/40"
            >
              <img
                src={featured.image}
                alt={featured.title}
                className="parallax-target absolute inset-0 h-[120%] w-full object-cover filter brightness-[0.88] contrast-[1.05] will-change-transform -translate-y-[10%] transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Dark subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/80 via-transparent to-[#0a0a0c]/40 pointer-events-none" />

              {/* Exact Featured Essay Badge as in image */}
              <div className="absolute top-6 left-6 z-10">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 backdrop-blur-md">
                  <PiSparkleFill className="text-amber-300 text-[10px]" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ivory">
                    Featured Essay
                  </span>
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
                <div className="max-w-md">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                    {featured.category} • {featured.date}
                  </p>
                  <h3 className="font-display mt-1 text-xl sm:text-2xl font-light text-white group-hover:text-amber-200 transition-colors">
                    {featured.title}
                  </h3>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors group-hover:bg-amber-400 group-hover:text-charcoal group-hover:border-amber-400">
                  <PiArrowUpRightLight size={18} />
                </div>
              </div>
            </a>
          </div>

          {/* Right Articles List (Exact 3 items matching left height) */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-white/10">
            {sideArticles.map((a, i) => (
              <a
                key={a.id || i}
                href="#"
                className="journal-row group flex items-center gap-6 py-6 transition-all duration-300 hover:bg-white/[0.02] px-2 rounded-2xl"
              >
                {/* Rounded Thumbnail */}
                <div className="relative aspect-square w-24 sm:w-28 shrink-0 overflow-hidden rounded-[20px] border border-white/10 bg-white/5">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="h-full w-full object-cover filter brightness-[0.88] contrast-[1.05] transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Article Info */}
                <div className="flex flex-1 flex-col justify-center">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-amber-300">
                    <span>{a.category}</span>
                    <span className="text-ivory/30">•</span>
                    <span className="text-ivory/50">{a.date}</span>
                  </div>

                  <h4 className="font-display mt-2 text-lg sm:text-xl font-light leading-snug text-white transition-colors duration-300 group-hover:text-amber-200">
                    {a.title}
                  </h4>

                  <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-ivory/40 transition-colors group-hover:text-amber-300">
                    <span>Read Essay</span>
                    <PiArrowUpRightLight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}