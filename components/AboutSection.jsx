"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  animate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  PiSparkleFill,
  PiArrowUpRightLight,
  PiSealCheckFill,
  PiCompassLight,
} from "react-icons/pi";
import Reveal from "@/components/Reveal";
import { stats } from "@/data/stats";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span
      ref={ref}
      className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight"
    >
      {display}
      <span className="text-amber-400 font-light ml-0.5">{suffix}</span>
    </span>
  );
}

export default function AboutSection() {
  const cardRef = useRef(null);

  // 3D Tilt motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), springConfig);
  const floatZ = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0a0a0c] py-24 text-ivory selection:bg-amber-300 selection:text-charcoal lg:py-36"
    >
      {/* Background Ambient Studio Glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-amber-600/10 blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-stone-500/10 blur-[160px]" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Main Editorial Story Grid */}
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Statement & Narrative (Left) */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="eyebrow text-amber-200/80 font-mono text-xs uppercase tracking-[0.35em]">
                  About Vedam Homes
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="font-display mt-4 text-4xl leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.6vw] font-normal">
                We create spaces designed to{" "}
                <span className="italic font-light text-white/60">
                  live beyond trends.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 space-y-4 max-w-2xl text-[15px] leading-relaxed text-ivory/70 font-light lg:text-base">
                <p>
                  Vedam Homes began as a small practice of architects who were
                  tired of watching prime sites turned into ordinary buildings. A
                  decade on, we remain a studio first and a developer second.
                </p>
                <p>
                  Every residence starts as a deep study of natural light, airflow,
                  and honest materiality long before floor plans take shape. The
                  result is a deliberate body of work across Visakhapatnam&apos;s
                  most considered addresses.
                </p>
              </div>
            </Reveal>

            {/* Signature / Core Pillars Strip */}
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/10 pt-8">
                <div className="flex items-center gap-2.5">
                  <PiSealCheckFill className="text-amber-400 text-lg" />
                  <span className="font-mono text-xs uppercase tracking-widest text-ivory/90">
                    Architect-Led Studio
                  </span>
                </div>
                <div className="h-3 w-px bg-white/20 hidden sm:block" />
                <div className="flex items-center gap-2.5">
                  <PiSparkleFill className="text-amber-400 text-sm" />
                  <span className="font-mono text-xs uppercase tracking-widest text-ivory/90">
                    Bespoke Materiality
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Compact 3D Floating Visual Canvas (Right) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Reveal delay={0.15} className="w-full max-w-[380px] sm:max-w-[420px]">
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: 1200 }}
                className="relative cursor-pointer"
              >
                {/* 3D Multi-plane Canvas */}
                <motion.div
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }}
                  className="group relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-white/15 bg-white/5 p-2.5 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-colors duration-500 hover:border-amber-400/40"
                >
                  {/* Photo Base (Z = 0px) */}
                  <div className="relative h-full w-full overflow-hidden rounded-[20px]">
                    <img
                      src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop"
                      alt="Interior detail of a Vedam Homes residence"
                      className="h-full w-full object-cover filter brightness-[0.88] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Ambient Shadow Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/90 via-[#0a0a0c]/20 to-transparent pointer-events-none" />

                    {/* Top Architectural Category Pill */}
                    <div className="absolute top-4 left-4 [transform:translateZ(20px)]">
                      <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-1 backdrop-blur-md">
                        <PiCompassLight className="text-amber-300 text-xs" />
                        <span className="font-mono text-[9px] uppercase tracking-widest text-ivory">
                          Studio Study
                        </span>
                      </div>
                    </div>

                    {/* In-Frame Bottom Caption */}
                    <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-ivory [transform:translateZ(30px)]">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-amber-300">
                          Archive 01
                        </span>
                        <p className="font-display text-lg text-white font-light">
                          Light &amp; Stone
                        </p>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white group-hover:bg-amber-400 group-hover:text-charcoal transition-colors">
                        <PiArrowUpRightLight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Overlapping 3D Floating Heritage Badge */}
                <motion.div
                  style={{
                    x: floatZ,
                    translateZ: 50,
                  }}
                  className="pointer-events-none absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-2xl border border-white/15 bg-black/80 p-3.5 shadow-2xl backdrop-blur-xl"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-charcoal font-display font-medium text-base">
                    10
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white leading-tight">
                      Years of Heritage
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-ivory/50">
                      Visakhapatnam
                    </p>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Dynamic Statistics Strip */}
        <div className="mt-24 border-t border-white/10 pt-14">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.08}
                className="group relative flex flex-col justify-between border-l border-white/15 pl-6 transition-all duration-500 hover:border-amber-400"
              >
                <div>
                  <div className="flex items-center justify-between pb-2">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-ivory/30 group-hover:text-amber-400 transition-colors">
                      0{i + 1}
                    </span>
                  </div>
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-ivory/50 font-medium">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}