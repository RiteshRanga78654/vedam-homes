"use client";

import { motion } from "framer-motion";
import { 
  PiSparkleFill, 
  PiCheckCircleFill, 
  PiShieldCheckLight, 
  PiCertificateLight,
  PiCubeLight
} from "react-icons/pi";
import Reveal from "@/components/Reveal";

const row1 = [
  { id: "ultratech", name: "UltraTech Cement", logo: "/logo/ultra.webp", grade: "Grade 53 OPC", code: "IS 12269" },
  { id: "tata-tiscon", name: "Tata Tiscon", logo: "/logo/tatatis.jpg", grade: "Fe-550D Super Ductile", code: "IS 1786" },
  { id: "jsw", name: "JSW Steel", logo: "/logo/jsw.png", grade: "Corrosion Resistant Steel", code: "CRS Grade" },
  { id: "asian-paints", name: "Asian Paints", logo: "/logo/asian-paints.png", grade: "Low-VOC Royal Finishes", code: "Green Spec" },
  { id: "havells", name: "Havells Wire & Switch", logo: "/logo/havells.jpg", grade: "FRLS-H Copper Wiring", code: "IEC 60227" },
  { id: "finolex", name: "Finolex Pipes", logo: "/logo/Finolex-Pipes-Logo-Vector.svg-.png", grade: "Lead-Free CPVC Systems", code: "ASTM D2846" },
];

const row2 = [
  { id: "saint-gobain", name: "Saint-Gobain", logo: "/logo/ultra.webp", grade: "Double Acoustic Glazing", code: "Planitherm" },
  { id: "schneider", name: "Schneider Electric", logo: "/logo/tatatis.jpg", grade: "Modular Automation", code: "KNX System" },
  { id: "kohler", name: "Kohler Fixtures", logo: "/logo/jsw.png", grade: "Brushed Brass & Matt Black", code: "PVD Coating" },
  { id: "jaquar", name: "Jaquar Artize", logo: "/logo/asian-paints.png", grade: "Thermostatic Mixers", code: "WRAS Cert" },
  { id: "kajaria", name: "Kajaria Eternity", logo: "/logo/havells.jpg", grade: "Vitrified Slabs 1200x2400", code: "Full Body" },
  { id: "greenlam", name: "Greenlam Clads", logo: "/logo/Finolex-Pipes-Logo-Vector.svg-.png", grade: "Exterior HPL Panels", code: "EN 438" },
];

function PartnerCard({ item }) {
  return (
    <div className="group relative flex h-24 min-w-[260px] sm:min-w-[300px] items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 backdrop-blur-xl transition-all duration-500 hover:border-amber-400/50 hover:bg-white/[0.08] hover:shadow-[0_12px_40px_-10px_rgba(252,211,77,0.25)] sm:h-28">
      {/* Dynamic Gold Glow on Card Hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-amber-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Brand Logo Presentation Box */}
      <div className="relative flex h-12 w-28 sm:w-32 items-center justify-center overflow-hidden rounded-xl bg-white/[0.04] p-2 border border-white/5 transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.08]">
        <img
          src={item.logo}
          alt={item.name}
          className="max-h-8 sm:max-h-9 w-auto max-w-full object-contain filter brightness-[0.7] contrast-[1.15] grayscale transition-all duration-500 group-hover:brightness-100 group-hover:grayscale-0 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Specification Stamps */}
      <div className="relative flex flex-col text-right">
        <span className="font-display text-xs sm:text-sm font-medium text-white group-hover:text-amber-200 transition-colors">
          {item.name}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-ivory/60 mt-0.5">
          {item.grade}
        </span>
        <span className="font-mono text-[8px] tracking-widest text-amber-300/70 uppercase">
          {item.code}
        </span>
      </div>

      {/* Micro Status Dot */}
      <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <PiSparkleFill className="text-amber-300 text-[8px] animate-pulse" />
      </div>
    </div>
  );
}

export default function MaterialsSection() {
  const track1 = [...row1, ...row1, ...row1, ...row1];
  const track2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section
      id="partners"
      className="relative overflow-hidden border-y border-white/10 bg-[#0a0a0c] py-20 text-ivory selection:bg-amber-300 selection:text-charcoal lg:py-32"
    >
      {/* Multi-tier Studio Ambient Blur Orbs */}
      <div className="pointer-events-none absolute -left-48 top-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-amber-600/10 blur-[170px]" />
      <div className="pointer-events-none absolute -right-48 top-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-stone-500/10 blur-[170px]" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12 mb-16">
        
        {/* Section Header with Verified Metrics */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 border-b border-white/10 pb-10">
          <Reveal y={20}>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="eyebrow text-amber-200/80 font-mono text-xs uppercase tracking-[0.35em]">
                Material Integrity
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight max-w-3xl">
              Architectural endurance,{" "}
              <span className="italic font-light text-white/60">built with zero compromise.</span>
            </h2>
          </Reveal>

          {/* Key Compliance Badges */}
          <Reveal delay={0.12} y={20}>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-mono text-ivory/80 backdrop-blur-md">
                <PiShieldCheckLight className="text-amber-400 text-base" />
                <span>IS &amp; ASTM Compliant</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-mono text-ivory/80 backdrop-blur-md">
                <PiCertificateLight className="text-amber-400 text-base" />
                <span>Tier-1 Direct Procured</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Studio Material Assurance Strip */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 font-mono text-[10px] uppercase tracking-widest text-ivory/50">
          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <PiCubeLight className="text-amber-400 text-sm" />
            <span>Non-Destructive Tested</span>
          </div>
          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <PiCheckCircleFill className="text-amber-400 text-xs" />
            <span>Anti-Corrosive Slabs</span>
          </div>
          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <PiCheckCircleFill className="text-amber-400 text-xs" />
            <span>Acoustically Rated</span>
          </div>
          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <PiCheckCircleFill className="text-amber-400 text-xs" />
            <span>100% Traceable Origin</span>
          </div>
        </div>
      </div>

      {/* Dual Directional Marquee System */}
      <div className="relative flex flex-col gap-6 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        
        {/* ROW 1: Slides Left (-50%) */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max items-center gap-6 sm:gap-8 will-change-transform hover:[animation-play-state:paused]"
        >
          {track1.map((m, i) => (
            <PartnerCard key={`row1-${m.id}-${i}`} item={m} />
          ))}
        </motion.div>

        {/* ROW 2: Slides Right (0% to -50% reversed) */}
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            duration: 36,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max items-center gap-6 sm:gap-8 will-change-transform hover:[animation-play-state:paused]"
        >
          {track2.map((m, i) => (
            <PartnerCard key={`row2-${m.id}-${i}`} item={m} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}