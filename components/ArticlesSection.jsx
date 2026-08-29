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

  useEffect(() => {
    const ctx = gsap.context((self) => {
      // 1. MASTER TIMELINE FOR ENTRANCE CHOREOGRAPHY
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Split-line text emergence
      masterTl
        .from(".split-line", {
          yPercent: 120,
          rotateX: -20,
          opacity: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
        })
        // Image clip-path shutter curtain reveal
        .fromTo(
          ".journal-img-reveal",
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", scale: 1.2 },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", scale: 1, duration: 1.4, ease: "expo.out" },
          "-=0.6"
        )
        // Staggered border draws on sidebar list
        .fromTo(
          ".journal-row",
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
          "-=0.8"
        );

      // 2. GSAP SCROLL SCRUB (Parallax on Featured Image)
      gsap.fromTo(
        ".parallax-target",
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: featuredCardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // 3. GSAP quickTo() - HIGH PERFORMANCE MAGNETIC BUTTON EFFECT
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
      className="relative overflow-hidden bg-[#0a0a0c] py-24 text-ivory selection:bg-amber-300 selection:text-charcoal lg:py-36"
    >
      {/* Studio Radial Background Orbs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-amber-600/10 blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-stone-500/10 blur-[160px]" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        
        {/* Header with masked lines for split reveals */}
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

        {/* Editorial Split Grid */}
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Main Hero Article */}
          <div ref={featuredCardRef} className="lg:col-span-7">
            <a
              href="#"
              className="group block overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-4 sm:p-5 backdrop-blur-xl transition-all duration-700 hover:border-amber-400/40 hover:bg-white/[0.06] hover:shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            >
              {/* Image with GSAP clip-path entry and parallax target */}
              <div className="journal-img-reveal relative aspect-[16/10] w-full overflow-hidden rounded-[24px]">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="parallax-target h-[120%] w-full object-cover filter brightness-[0.88] contrast-[1.05] will-change-transform -translate-y-[10%]"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/90 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 backdrop-blur-md">
                  <PiSparkleFill className="text-amber-300 text-[10px]" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-ivory">
                    Featured Essay
                  </span>
                </div>
              </div>

              {/* Text Meta Content */}
              <div className="px-2 pt-6 pb-2">
                <div className="flex items-center gap-3 font-mono text-xs text-ivory/50">
                  <span className="uppercase tracking-widest text-amber-300 font-semibold">{featured.category}</span>
                  <span>•</span>
                  <span>{featured.date}</span>
                </div>

                <div className="mt-3 flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white transition-colors duration-300 group-hover:text-amber-200">
                    {featured.title}
                  </h3>
                  <div className="magnetic-btn flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors group-hover:bg-amber-400 group-hover:text-charcoal group-hover:border-amber-400">
                    <PiArrowUpRightLight size={18} />
                  </div>
                </div>

                <p className="mt-4 max-w-xl text-sm sm:text-base font-light leading-relaxed text-ivory/70">
                  {featured.excerpt}
                </p>
              </div>
            </a>
          </div>

          {/* Secondary Article List */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {rest.map((a, i) => (
                <a
                  key={a.id || i}
                  href="#"
                  className="journal-row group flex items-center gap-6 py-6 transition-all duration-500 hover:bg-white/[0.03] px-3 rounded-2xl"
                >
                  <div className="relative aspect-square w-24 sm:w-28 shrink-0 overflow-hidden rounded-2xl border border-white/10">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="h-full w-full object-cover filter brightness-[0.85] contrast-[1.05] transition-transform duration-700 group-hover:scale-110 group-hover:brightness-100"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ivory/50">
                      <span className="text-amber-300">{a.category}</span>
                      <span>•</span>
                      <span>{a.date}</span>
                    </div>

                    <h4 className="font-display mt-2 text-lg sm:text-xl font-light leading-snug text-white transition-colors duration-300 group-hover:text-amber-200">
                      {a.title}
                    </h4>

                    <div className="mt-3 flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-ivory/40 transition-colors group-hover:text-white">
                      <span>Read Essay</span>
                      <PiArrowUpRightLight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Newsletter Dispatch Footer */}
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm font-mono text-xs text-ivory/60">
              <span>Quarterly Architectural Digest</span>
              <span className="text-amber-400 uppercase tracking-widest font-semibold">Issue 04 Live</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}