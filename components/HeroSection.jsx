"use client";

import { motion } from "framer-motion";
import { PiMapPinLight, PiHammerLight, PiClockCountdownLight, PiPlayFill } from "react-icons/pi";
import { FaPlayCircle } from "react-icons/fa";

const FEATURES = [
  { title: "Prime Locations", icon: PiMapPinLight ,subtitle:"Accross the City" },
  { title: "Quality Construction", icon: PiHammerLight ,subtitle:"You Can Trust" },
  { title: "Timely Delivery", icon: PiClockCountdownLight ,subtitle:"Our Commitment" },
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
          className="mt-5 max-w-xl text-sm sm:text-base text-white/80 mb-5"
        >
          Thoughtfully designed homes in prime locations delivering quality
          construction and modern lifestyle.
        </motion.p>
<FaPlayCircle className="text-white size-18 my-5"  />
        <motion.div
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          className="mt-2 flex flex-wrap items-center justify-center gap-4"
        >
          
          <button className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors">
           
            <PiPlayFill size={16} />
            Watch Our Story
          </button>
          
        </motion.div>

        {/* Glassmorphism feature cards */}
       <motion.div
  initial="hidden"
  animate="visible"
  custom={3}
  variants={fadeUp}
  className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto"
>
  {FEATURES.map(({ title, subtitle, icon: Icon }) => (
    <div
      key={title}
      className="flex items-center gap-4 rounded-2xl px-5 py-5 text-white"
    >
      <Icon className="text-primary-light w-10 h-10 sm:w-12 sm:h-12 shrink-0" />

      <div>
        <h3 className="text-lg sm:text-xl lg:text-xl ">
          {title}
        </h3>

        <p className="text-sm sm:text-base text-gray-300 mt-1 text-left">
          {subtitle}
        </p>
      </div>
    </div>
  ))}
</motion.div>
      </div>
    </section>
  );
}
