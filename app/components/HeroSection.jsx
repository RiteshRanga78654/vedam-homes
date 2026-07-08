'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Play, Compass, ChevronDown } from 'lucide-react';

// ---- Palette ----
const GOLD = '#B88A44';
const GOLD_LIGHT = '#D9B876';
const MIDNIGHT = '#0A1420';

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const features = [
  { label: 'Prime Locations', desc: 'Prestige postal zones, robust capital appreciation' },
  { label: 'Quality Construction', desc: 'Industrial-grade structural parameters, built for generations' },
  { label: 'Timely Delivery', desc: 'Fast-tracked milestones, absolute timeline accuracy' }
];

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full h-[90%] min-h-[540px] overflow-hidden flex items-center justify-center bg-[#0A1420]">
      {/* Background Video Layer */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Cinematic gradient overlay — depth instead of a flat scrim */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(180deg, rgba(10,20,32,0.55) 0%, rgba(10,20,32,0.35) 35%, rgba(10,20,32,0.65) 75%, rgba(10,20,32,0.95) 100%),
                       radial-gradient(120% 90% at 50% 10%, rgba(10,20,32,0.1) 0%, rgba(10,20,32,0.6) 100%)`
        }}
      />

      {/* Vertical scroll indicator — signature element, hidden on mobile */}
      <div className="hidden lg:flex flex-col items-center gap-4 absolute right-8 bottom-40 z-20">
        <span
          className="text-[11px] tracking-[0.35em] uppercase text-white/50 font-light"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div className="relative w-px h-16 bg-white/20 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-px h-6"
            style={{ background: GOLD_LIGHT }}
            animate={shouldReduceMotion ? {} : { y: [0, 48, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 md:px-10 flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Eyebrow kicker */}
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
            <span className="h-px w-8" style={{ backgroundColor: GOLD }} />
            <span className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#D9B876] font-medium">
              Premium Residences
            </span>
            <span className="h-px w-8" style={{ backgroundColor: GOLD }} />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-[2.5rem] leading-[1.08] sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-white max-w-4xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Building Better Spaces,
            <br />
            <span className="italic font-normal" style={{ color: GOLD }}>
              Enriching Lives
            </span>
          </motion.h1>

          {/* Animated gold rule */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: shouldReduceMotion ? 64 : 64 }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            className="h-[2px] mt-8 mb-6"
            style={{ backgroundColor: GOLD }}
          />

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-white/70 font-light max-w-xl leading-relaxed"
          >
            Thoughtfully designed residences positioned within prestigious micro-markets,
            delivering uncompromising master-craft engineering.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full transition-all shadow-[0_8px_30px_rgba(184,138,68,0.35)] hover:shadow-[0_8px_40px_rgba(184,138,68,0.5)]"
              style={{ backgroundColor: GOLD }}
            >
              <Play size={16} className="fill-current text-[#0A1420] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0A1420]">
                Watch Our Story
              </span>
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white hover:border-white/50 hover:bg-white/5 transition-all">
              <Compass size={16} />
              <span className="text-xs font-semibold uppercase tracking-[0.15em]">
                Explore Projects
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Editorial feature strip — hairline dividers, no cards/blur boxes */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-gradient-to-t from-black/40 to-transparent"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {features.map((f, i) => (
            <div key={i} className="py-4 sm:py-0 sm:px-6 first:pl-0 last:pr-0 text-left">
              <h3
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: GOLD_LIGHT }}
              >
                {f.label}
              </h3>
              <p className="text-xs md:text-[13px] text-white/50 mt-1.5 font-light leading-snug">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Mobile-only scroll cue */}
      <motion.div
        className="lg:hidden absolute bottom-[9.5rem] left-1/2 -translate-x-1/2 z-20"
        animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={20} className="text-white/40" />
      </motion.div>
    </section>
  );
}