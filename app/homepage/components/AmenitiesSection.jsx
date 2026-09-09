"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiArrowUpRightLight, PiSparkleFill, PiCheckCircleFill } from "react-icons/pi";
import Reveal from "@/app/homepage/components/Reveal";
import amenities from "@/data/amenities";

export default function AmenitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

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
        rootMargin: "-40% 0px -40% 0px",
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
      className="relative bg-canvas text-ink py-15 lg:py-12 selection:bg-night selection:text-ivory"
    >
      <div className="pointer-events-none absolute left-0 top-1/4 h-[400px] w-[400px] rounded-full bg-muted/10 blur-[120px] ambient-orb" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[120px] ambient-orb" />

      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sticky Image Viewport */}
          <div className="lg:col-span-6 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-12 lg:py-0 z-20">
            <div className="relative w-full max-w-[540px] aspect-[4/3] sm:aspect-[16/11] mx-auto overflow-hidden rounded-[32px] border border-border/15 bg-surface-2/70 p-2 shadow-[0_20px_60px_rgba(21,20,15,0.08)] backdrop-blur-xl">
              <div className="relative h-full w-full overflow-hidden rounded-[24px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 h-full w-full"
                  >
                    <img
                      src={active.image}
                      alt={active.title}
                      className="h-full w-full object-cover filter brightness-[0.95] contrast-[1.03]"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent pointer-events-none" />

                <div className="absolute top-6 left-6">
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-1.5 backdrop-blur-md">
                    <PiSparkleFill className="text-accent-soft text-[10px]" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-ivory">
                      0{activeIndex + 1} / Specification In View
                    </span>
                  </div>
                </div>

                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-ivory">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent-soft">
                      Standard Amenity
                    </span>
                    <h3 className="font-display mt-1 text-2xl sm:text-3xl text-white font-medium drop-shadow-sm">
                      {active.title}
                    </h3>
                  </div>

                  <a
                    href={`#amenity-${active.id}`}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white transition-all duration-300 hover:scale-110 hover:bg-accent hover:border-accent"
                  >
                    <PiArrowUpRightLight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Scrollable List */}
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
                  <div className={`transition-all duration-700 ${isActive ? "opacity-100 translate-x-0" : "opacity-30 translate-x-2"}`}>
                    
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-sm tracking-widest font-semibold ${isActive ? "text-accent" : "text-muted"}`}>
                        0{i + 1}
                      </span>
                      <div className={`h-px transition-all duration-500 ${isActive ? "w-12 bg-accent" : "w-6 bg-border/20"}`} />
                    </div>

                    <h3 className="font-display mt-4 text-4xl sm:text-6xl font-light tracking-tight text-ink">
                      {a.title}
                    </h3>

                    <p className="mt-6 text-base sm:text-lg font-light leading-relaxed text-ink/70 max-w-xl">
                      {a.desc}
                    </p>

                    <button
                      onClick={() => {
                        document.getElementById(`amenity-${a.id}`)?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                      className="group mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent hover:text-ink"
                    >
                      <span>Explore Detail</span>
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