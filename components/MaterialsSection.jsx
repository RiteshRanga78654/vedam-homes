"use client";

import { 
  PiSparkleFill, 
  PiCheckCircleFill, 
  PiShieldCheckLight, 
  PiCertificateLight,
  PiCubeLight
} from "react-icons/pi";
import Reveal from "@/components/Reveal";

const partners = [
  { id: "ultratech", name: "UltraTech Cement", logo: "/logo/ultra.webp" },
  { id: "tata-tiscon", name: "Tata Tiscon", logo: "/logo/tatatis.jpg" },
  { id: "jsw", name: "JSW Steel", logo: "/logo/jsw.png" },
  { id: "asian-paints", name: "Asian Paints", logo: "/logo/asian-paints.png" },
  { id: "havells", name: "Havells", logo: "/logo/havells.jpg" },
  { id: "finolex", name: "Finolex Pipes", logo: "/logo/Finolex-Pipes-Logo-Vector.svg-.png" },
  { id: "saint-gobain", name: "Saint-Gobain", logo: "/logo/ultra.webp" },
  { id: "schneider", name: "Schneider Electric", logo: "/logo/tatatis.jpg" },
  { id: "kohler", name: "Kohler", logo: "/logo/jsw.png" },
  { id: "jaquar", name: "Jaquar Artize", logo: "/logo/asian-paints.png" },
  { id: "kajaria", name: "Kajaria", logo: "/logo/havells.jpg" },
  { id: "greenlam", name: "Greenlam", logo: "/logo/Finolex-Pipes-Logo-Vector.svg-.png" },
];

function LogoCard({ item }) {
  return (
    <div className="group relative flex h-20 w-40 sm:h-24 sm:w-48 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition-all duration-500 hover:border-amber-400/40 hover:bg-white/[0.08] hover:shadow-[0_12px_35px_-10px_rgba(252,211,77,0.2)]">
      {/* Dynamic Gold Glow on Card Hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-amber-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Brand Logo Presentation */}
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <img
          src={item.logo}
          alt={item.name}
          className="max-h-9 sm:max-h-11 w-auto max-w-[80%] object-contain filter brightness-[0.7] contrast-[1.15] grayscale transition-all duration-500 group-hover:brightness-100 group-hover:grayscale-0 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Micro Sparkle Accent */}
      <div className="absolute top-2.5 right-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <PiSparkleFill className="text-amber-300 text-[8px] animate-pulse" />
      </div>
    </div>
  );
}

export default function MaterialsSection() {
  // Duplicated for a seamless -50% loop
  const track = [...partners, ...partners];

  return (
    <section
      id="partners"
      className="relative overflow-hidden border-y border-white/10 bg-[#0a0a0c] py-20 text-ivory selection:bg-amber-300 selection:text-charcoal lg:py-28"
    >
      {/* Multi-tier Studio Ambient Blur Orbs */}
      <div className="pointer-events-none absolute -left-48 top-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-amber-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-48 top-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-stone-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12 mb-14">
        
        {/* Section Header */}
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
            <div className="flex flex-wrap items-center gap-3">
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

      {/* Single Pure Logo Infinite Marquee */}
      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max items-center gap-6 sm:gap-8 animate-marquee-left hover:[animation-play-state:paused] will-change-transform">
          {track.map((item, i) => (
            <LogoCard key={`${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}