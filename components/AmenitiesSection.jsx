"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiArrowUpRightLight, PiSparkleFill } from "react-icons/pi";
import amenities from "@/data/amenities";

export default function AmenitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  // Scroll observer: List item center me aate hi image switch hogi
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(idx)) {
              setActiveIndex(idx);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0.1,
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const active = amenities[activeIndex] || amenities[0];

  return (
    <section
      id="amenities"
      className="relative bg-[#0a0a0c] text-ivory selection:bg-amber-300 selection:text-charcoal"
    >
      {/* Background Ambient Glow */}
      <div className="pointer-events-none fixed left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[160px]" />
      <div className="pointer-events-none fixed bottom-1/4 right-0 h-[500px] w-[500px] rounded-full bg-stone-500/10 blur-[160px]" />

      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: FIXED / STICKY IMAGE SCREEN */}
          <div className="lg:col-span-6 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-12 lg:py-0 z-20">
            <div className="relative w-full max-w-[540px] aspect-[4/3] sm:aspect-[16/11] mx-auto overflow-hidden rounded-[32px] border border-white/15 bg-white/5 p-2 shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <div className="relative h-full w-full overflow-hidden rounded-[24px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 h-full w-full"
                  >
                    <img
                      src={active.image}
                      alt={active.title}
                      className="h-full w-full object-cover filter brightness-[0.88] contrast-[1.05]"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Ambient Shadow Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/90 via-transparent to-[#0a0a0c]/40 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-6 left-6">
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 backdrop-blur-md">
                    <PiSparkleFill className="text-amber-300 text-[10px]" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-ivory">
                      0{activeIndex + 1} / Feature In View
                    </span>
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-ivory">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                      Standard Living Feature
                    </span>
                    <h3 className="font-display mt-1 text-2xl sm:text-3xl text-white font-medium drop-shadow-sm">
                      {active.title}
                    </h3>
                  </div>

                  <a
                    href={`#amenity-${active.id}`}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white transition-all duration-300 hover:scale-110 hover:bg-amber-400 hover:text-charcoal hover:border-amber-400"
                  >
                    <PiArrowUpRightLight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: CLEAN & SIMPLE SCROLLABLE LIST */}
          <div className="lg:col-span-6 flex flex-col pl-0 lg:pl-12">
            {amenities.map((a, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={a.id}
                  id={`amenity-${a.id}`}
                  ref={(el) => (itemRefs.current[i] = el)}
                  data-index={i}
                  className="min-h-[80vh] lg:min-h-screen flex flex-col justify-center py-16 scroll-mt-24"
                >
                  <div className={`transition-all duration-700 ${isActive ? "opacity-100 translate-x-0" : "opacity-25 translate-x-2"}`}>
                    
                    {/* Index & Active Accent */}
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-sm tracking-widest font-semibold ${isActive ? "text-amber-300" : "text-ivory/40"}`}>
                        0{i + 1}
                      </span>
                      <div className={`h-px transition-all duration-500 ${isActive ? "w-12 bg-amber-400" : "w-6 bg-white/20"}`} />
                    </div>

                    {/* Title */}
                    <h3 className="font-display mt-4 text-4xl sm:text-6xl font-light tracking-tight text-white">
                      {a.title}
                    </h3>

                    {/* Clean Description */}
                    <p className="mt-6 text-base sm:text-lg font-light leading-relaxed text-ivory/70 max-w-xl">
                      {a.desc}
                    </p>

                    {/* Simple Clickable Action */}
                    <button
                      onClick={() => {
                        document.getElementById(`amenity-${a.id}`)?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                      className="group mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-300 hover:text-amber-200"
                    >
                      <span>Explore Feature</span>
                      <PiArrowUpRightLight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={15} />
                    </button>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}