"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Mousewheel, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { PiArrowLeftLight, PiArrowRightLight, PiArrowUpRightLight, PiSparkleFill } from "react-icons/pi";
import projects from "@/data/projects";

import "swiper/css";
import "swiper/css/effect-fade";

export default function ProjectSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const currentProject = projects[activeIndex] || projects[0];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0c] text-ivory select-none">
      {/* 1. Main Background Visual Engine */}
      <Swiper
        modules={[Navigation, EffectFade, Mousewheel, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1400}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        onSwiper={setSwiperInstance}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        className="h-full w-full"
      >
        {projects.map((p, i) => (
          <SwiperSlide key={p.id} className="relative h-full w-full overflow-hidden">
            {/* Cinematic Zoom / Ken Burns Effect on Active Slide */}
            <div
              className={`h-full w-full transition-transform duration-[2200ms] ease-out ${
                activeIndex === i ? "scale-105 filter brightness-[0.88]" : "scale-100 filter brightness-50"
              }`}
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* Multitier Luxury Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-[#0a0a0c]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/90 via-[#0a0a0c]/30 to-transparent" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 2. Architectural Watermark Background Counter */}
      <div className="pointer-events-none absolute right-8 top-12 z-10 hidden overflow-hidden lg:block">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentProject.id}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 0.06 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display block text-[16rem] font-bold leading-none tracking-tighter text-white"
          >
            0{activeIndex + 1}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* 3. Foreground Content Overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-16">
        
        {/* Top Floating Badge Bar */}
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-xl">
            <PiSparkleFill className="text-amber-300 text-xs animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-ivory/80">
              Selected Showcase
            </span>
          </div>

          <div className="hidden font-mono text-xs tracking-widest text-ivory/50 sm:block">
            SCROLL DOWN / DRAG TO EXPLORE
          </div>
        </div>

        {/* Bottom Hero Information Grid */}
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            
            {/* Left Column: Animated Text Details */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Location & Category Eyebrow */}
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-200/80">
                      {currentProject.location} — {currentProject.type || "Residence"}
                    </p>
                  </div>

                  {/* Main Title */}
                  <h2 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                    {currentProject.name}
                  </h2>

                  {/* Description Paragraph */}
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/70 font-light drop-shadow-sm">
                    {currentProject.description}
                  </p>

                  {/* Magnetic Style CTA */}
                  <div className="mt-8">
                    <a
                      href={`#${currentProject.id}`}
                      className="group pointer-events-auto relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-white/20 bg-white/10 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-500 hover:border-amber-300 hover:bg-amber-300 hover:text-charcoal hover:shadow-[0_0_35px_rgba(252,211,77,0.3)]"
                    >
                      <span>Explore Residence</span>
                      <PiArrowUpRightLight
                        size={18}
                        className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Mini Interactive Navigation Deck */}
            <div className="pointer-events-auto flex flex-col items-start lg:items-end gap-6 lg:col-span-4">
              
              {/* Numeric Indicator */}
              <div className="flex items-baseline gap-2 font-mono">
                <span className="font-display text-4xl text-white">0{activeIndex + 1}</span>
                <span className="text-sm text-ivory/40">/ 0{projects.length}</span>
              </div>

              {/* Glassmorphism Control Buttons */}
              <div className="flex items-center gap-3">
                <button
                  aria-label="Previous property"
                  onClick={() => swiperInstance?.slidePrev()}
                  className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-ivory backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white hover:text-charcoal active:scale-95"
                >
                  <PiArrowLeftLight size={20} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                </button>
                <button
                  aria-label="Next property"
                  onClick={() => swiperInstance?.slideNext()}
                  className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-ivory backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white hover:text-charcoal active:scale-95"
                >
                  <PiArrowRightLight size={20} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

          </div>

          {/* 4. Luxury Segmented Timeline Track */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 border-t border-white/10 pt-6">
            {projects.map((p, i) => (
              <button
                key={p.id}
                aria-label={`Jump to ${p.name}`}
                onClick={() => swiperInstance?.slideToLoop(i)}
                className="group pointer-events-auto text-left transition-all focus:outline-none"
              >
                <div className="relative h-[2px] w-full overflow-hidden bg-white/15">
                  <span
                    className={`block h-full bg-gradient-to-r from-amber-200 to-amber-400 transition-all duration-700 ease-out ${
                      i === activeIndex ? "w-full" : "w-0 group-hover:w-1/3"
                    }`}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span
                    className={`font-mono text-[10px] tracking-wider transition-colors duration-300 ${
                      i === activeIndex ? "text-amber-300 font-semibold" : "text-ivory/40 group-hover:text-ivory/70"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`hidden truncate text-[11px] font-medium tracking-wide sm:block transition-colors duration-300 ${
                      i === activeIndex ? "text-white" : "text-ivory/30 group-hover:text-ivory/60"
                    }`}
                  >
                    {p.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}