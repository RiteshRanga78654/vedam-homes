"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  PiArrowUpRightLight, 
  PiSparkleFill, 
  PiSpeakerHighLight, 
  PiSpeakerSlashLight 
} from "react-icons/pi";

export default function HeroSection() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Scroll tracking across extended viewport (200vh container for scroll room)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // 1. Initial State: Clean image -> On Scroll: Text emerges smoothly
  const contentY = useTransform(smoothProgress, [0.08, 0.65], ["70px", "0px"]);
  const contentOpacity = useTransform(smoothProgress, [0.05, 0.45], [0, 1]);

  // 2. Video Parallax & Depth
  const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const overlayDarkness = useTransform(smoothProgress, [0, 0.5], [0.35, 0.75]);

  // 3. Scroll hint indicator fades OUT once scrolling starts
  const hintOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full bg-[#0a0a0c]">
      {/* Pinned 100vh Hero Screen */}
      <section
        id="top"
        className="sticky top-0 h-[100svh] w-full overflow-hidden text-ivory select-none"
      >
        {/* Background Video / Image Layer */}
        <motion.div
          style={{ scale: videoScale }}
          className="absolute inset-0 h-full w-full will-change-transform"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover object-center filter brightness-[0.9] contrast-[1.05]"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero.png"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Dynamic Vignette that deepens when text reveals */}
        <motion.div
          style={{ opacity: overlayDarkness }}
          className="absolute inset-0 bg-[#0a0a0c] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c]/80 pointer-events-none" />

        {/* Foreground Content - Emerges ONLY on Scroll */}
        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
          }}
          className="relative z-10 flex h-full flex-col justify-between px-6 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:px-12 lg:pb-20"
        >
          {/* Top Strip */}
          <div className="mx-auto w-full max-w-[1600px] flex items-center justify-between">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/50 px-4 py-1.5 backdrop-blur-md">
              <PiSparkleFill className="text-amber-300 text-xs animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ivory/90 sm:text-xs">
                Architectural Studio — Est. 2014
              </span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="group hidden sm:flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              {isMuted ? (
                <PiSpeakerSlashLight className="text-ivory/60 transition-colors group-hover:text-white" size={16} />
              ) : (
                <PiSpeakerHighLight className="text-amber-300" size={16} />
              )}
              <span className="font-mono text-[10px] uppercase tracking-widest text-ivory/60 transition-colors group-hover:text-white">
                {isMuted ? "Sound Off" : "Sound On"}
              </span>
            </button>
          </div>

          {/* Main Headline & CTAs */}
          <div className="mx-auto w-full max-w-[1600px]">
            <div className="max-w-5xl">
              <h1 className="font-display text-[12vw] leading-[0.92] tracking-tight text-white sm:text-[8vw] lg:text-[6.2vw] font-normal">
                Spaces designed
                <br />
                for <span className="italic font-light text-amber-200/90">exceptional</span> living.
              </h1>
            </div>

            {/* Bottom Info & Action Links */}
            <div className="mt-8 sm:mt-12 flex flex-col gap-8 border-t border-white/15 pt-8 sm:pt-10 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-md font-light text-sm leading-relaxed text-ivory/70 sm:text-base">
                Curating deliberate, architect-led residences where light, material honesty, 
                and effortless modern luxury endure across Visakhapatnam.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-charcoal shadow-2xl transition-all duration-500 hover:bg-amber-300 hover:shadow-[0_0_40px_rgba(252,211,77,0.35)]"
                >
                  <span>Explore Properties</span>
                  <PiArrowUpRightLight
                    className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    size={16}
                  />
                </a>

                <a
                  href="#about"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 font-mono text-xs uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                >
                  <span>The Studio</span>
                  <PiArrowUpRightLight
                    className="transition-transform duration-300 group-hover:rotate-45 text-ivory/60 group-hover:text-white"
                    size={14}
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Initial Scroll Prompt (Fades out when user starts scrolling) */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-10 z-20 flex flex-col items-center justify-center gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ivory/60">
            Scroll to Explore
          </span>
          <div className="h-9 w-[1px] bg-white/20 overflow-hidden relative">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-1/2 w-full bg-amber-400"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}