"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PiArrowUpRightLight, PiBookOpenTextLight, PiCompassLight } from "react-icons/pi";
import articles from "@/data/articles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ArticlesSection() {
  const containerRef = useRef(null);
  const featuredCardRef = useRef(null);
  const [featured, ...rest] = articles;
  const sideArticles = rest.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Choreography
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
          rotateX: -15,
          opacity: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
        })
        .fromTo(
          ".journal-img-reveal",
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", scale: 1.12 },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", scale: 1, duration: 1.3, ease: "expo.out" },
          "-=0.6"
        )
        .fromTo(
          ".journal-row",
          { opacity: 0, x: 25 },
          { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" },
          "-=0.7"
        );

      // 2. Parallax Target on Featured Image
      gsap.fromTo(
        ".parallax-target",
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: featuredCardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // 3. Smooth Magnetic Button
      const magneticButtons = gsap.utils.toArray(".magnetic-btn");
      magneticButtons.forEach((btn) => {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });

        const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const { left, top, width, height } = btn.getBoundingClientRect();
          const x = (clientX - (left + width / 2)) * 0.3;
          const y = (clientY - (top + height / 2)) * 0.3;
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
      className="relative overflow-hidden bg-canvas py-24 text-ink selection:bg-[#15140f] selection:text-ivory lg:py-32"
    >
      {/* Precision Architectural Grid Pattern Background */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #15140f 1px, transparent 1px),
            linear-gradient(to bottom, #15140f 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Subtle Studio Glow Orbs */}
      <div className="pointer-events-none absolute -left-48 top-1/3 h-[450px] w-[450px] rounded-full bg-muted/12 blur-[130px]" />
      <div className="pointer-events-none absolute -right-48 bottom-1/4 h-[450px] w-[450px] rounded-full bg-accent/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-border/10 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="eyebrow text-muted font-mono text-xs uppercase tracking-[0.35em]">
                ARTICLES
              </span>
            </div>

            <div className="overflow-hidden">
              <h2 className="split-line font-display max-w-2xl text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Considered design,{" "}
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="split-line font-display max-w-2xl text-4xl leading-[1.05] tracking-tight text-ink/60 italic font-light sm:text-5xl lg:text-6xl">
                material honesty &amp; space.
              </h2>
            </div>
          </div>

          <a
            href="#journal"
            className="magnetic-btn group inline-flex items-center gap-2.5 rounded-full border border-border/15 bg-surface-2 px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink shadow-sm backdrop-blur-md transition-all duration-300 hover:border-night hover:bg-night hover:text-ivory dark:hover:border-amber-400! dark:hover:bg-amber-400! dark:hover:text-charcoal!"
          >
            <PiBookOpenTextLight size={16} />
            <span>View All ARTICLES</span>
            <PiArrowUpRightLight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={14} />
          </a>
        </div>

        {/* Symmetrical Equal-Height Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-stretch">
          
          {/* Left Hero Article */}
          <div ref={featuredCardRef} className="lg:col-span-7 h-full flex flex-col">
            <a
              href="#featured-essay"
              className="journal-img-reveal group relative flex-1 w-full min-h-[420px] sm:min-h-[480px] lg:min-h-full overflow-hidden rounded-[28px] border border-border/10 bg-surface-2 p-2.5 shadow-[0_16px_40px_rgba(21,20,15,0.06)] transition-all duration-700 hover:border-accent/40 hover:shadow-[0_24px_60px_rgba(21,20,15,0.12)]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[20px]">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="parallax-target absolute inset-0 h-[115%] w-full object-cover filter brightness-[0.95] contrast-[1.03] will-change-transform -translate-y-[8%] transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/25 to-transparent pointer-events-none" />

                {/* Badge */}
                <div className="absolute top-5 left-5 z-10">
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-1.5 backdrop-blur-md">
                    <PiCompassLight className="text-accent-soft text-xs" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ivory">
                      Featured Monograph
                    </span>
                  </div>
                </div>

                {/* Bottom Story Detail */}
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
                  <div className="max-w-lg">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-accent-soft">
                      {featured.category || "Architecture"} • {featured.date || "Spring 2026"}
                    </p>
                    <h3 className="font-display mt-1 text-2xl sm:text-3xl font-light text-white group-hover:text-ivory transition-colors leading-snug">
                      {featured.title}
                    </h3>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-surface-2/10 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:border-accent">
                    <PiArrowUpRightLight size={18} />
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Right 3-Article Column */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-border/10">
            {sideArticles.map((a, i) => (
              <a
                key={a.id || i}
                href={`#article-${i}`}
                className="journal-row group flex items-center gap-6 py-6 transition-all duration-300 hover:bg-surface-2/60 px-3 rounded-2xl"
              >
                {/* Thumbnail */}
                <div className="relative aspect-square w-24 sm:w-28 shrink-0 overflow-hidden rounded-[20px] border border-border/10 bg-surface-2 shadow-sm">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="h-full w-full object-cover filter brightness-[0.96] contrast-[1.03] transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Metadata & Title */}
                <div className="flex flex-1 flex-col justify-center">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                    <span>{a.category}</span>
                    <span className="text-ink/20">•</span>
                    <span className="text-muted">{a.date}</span>
                  </div>

                  <h4 className="font-display mt-2 text-lg sm:text-xl font-light leading-snug text-ink transition-colors duration-300 group-hover:text-accent">
                    {a.title}
                  </h4>

                  <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors group-hover:text-ink">
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