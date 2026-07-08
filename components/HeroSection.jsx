"use client";

import { motion } from "framer-motion";
import { PiMapPinLight, PiHammerLight, PiClockCountdownLight, PiPlayFill } from "react-icons/pi";

const FEATURES = [
  { title: "Prime Locations", icon: PiMapPinLight },
  { title: "Quality Construction", icon: PiHammerLight },
  { title: "Timely Delivery", icon: PiClockCountdownLight },
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
    <section id="top" className="relative h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop"
      >
        {/* Replace with your own hero footage at public/videos/hero.mp4 */}
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark/80" />

      {/* Center content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight text-white"
        >
          Building Better Spaces,
          <br />
          <span className="text-primary-light">Enriching Lives</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="mt-5 max-w-xl text-sm sm:text-base text-white/80"
        >
          Thoughtfully designed homes in prime locations delivering quality
          construction and modern lifestyle.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors">
            <PiPlayFill size={16} />
            Watch Our Story
          </button>
          <button className="inline-flex items-center rounded-2xl border border-white/70 px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-dark transition-colors">
            Explore Projects
          </button>
        </motion.div>

        {/* Glassmorphism feature cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeUp}
          className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
        >
          {FEATURES.map(({ title, icon: Icon }) => (
            <div
              key={title}
              className="flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-5 text-white"
            >
              <Icon size={22} className="text-primary-light shrink-0" />
              <p className="text-sm font-medium">{title}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
