"use client";

import { motion } from "framer-motion";
import {
  PiMapPinLight,
  PiHammerLight,
  PiClockCountdownLight,
  PiPlayFill,
  PiArrowDownBold,
  PiSparkleLight,
} from "react-icons/pi";

const FEATURES = [
  { title: "Prime Locations", desc: "Handpicked addresses that matter", icon: PiMapPinLight },
  { title: "Quality Construction", desc: "Built to last for generations", icon: PiHammerLight },
  { title: "Timely Delivery", desc: "Your keys, right on schedule", icon: PiClockCountdownLight },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

export default function HeroSection() {
  return (
    <section id="top" className="relative h-[90vh] w-full overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full scale-105 object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster=""
      >
        <source src="/videos/blog_herosectio.mp4" type="video/mp4" />
      </video>

      {/* Overlay — richer gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/45 to-dark/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/50 via-transparent to-dark/30" />

      {/* Decorative grid lines for structure */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] hidden h-full justify-between px-6 sm:flex lg:px-8">
        <div className="h-full w-px bg-white/5" />
        <div className="h-full w-px bg-white/5" />
        <div className="h-full w-px bg-white/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
        >
          <PiSparkleLight size={14} className="text-primary-light" />
          <span className="text-xs font-medium tracking-wide text-white/90">
            Trusted by 2,500+ Happy Families
          </span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="font-display max-w-4xl text-4xl font-semibold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Building Better Spaces,
          <br />
          <span className="bg-gradient-to-r from-primary-light via-primary-light to-white/80 bg-clip-text text-transparent">
            Enriching Lives
          </span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          className="mt-6 max-w-xl text-sm text-white/70 sm:text-base"
        >
          Thoughtfully designed homes in prime locations delivering quality
          construction and modern lifestyle.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeUp}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          {/* <button className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-light hover:shadow-primary-light/40">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
              <PiPlayFill size={12} />
            </span>
            Watch Our Story
          </button> */}
          <button className="inline-flex items-center rounded-2xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-dark">
            Explore Projects
          </button>
        </motion.div>

        {/* Feature cards — redesigned with icon circles + hover lift */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={4}
          variants={fadeUp}
          className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {FEATURES.map(({ title, desc, icon: Icon }) => (
            <motion.div
              key={title}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-6 text-white backdrop-blur-md transition-colors hover:bg-white/[0.12] sm:items-start sm:text-left"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary-light transition-colors group-hover:bg-primary-light group-hover:text-dark">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-xs text-white/50">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60"
      >
        <span className="text-[10px] font-medium tracking-[0.2em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <PiArrowDownBold size={16} />
        </motion.div>
      </motion.div> */}
    </section>
  );
}