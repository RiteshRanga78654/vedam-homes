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
  { id: "tata-tiscon", name: "Tata Tiscon", logo: "/logo/tatatis.png" },
  { id: "jsw", name: "JSW Steel", logo: "/logo/jsw.png" },
  { id: "asian-paints", name: "Asian Paints", logo: "/logo/asian-paints.png" },
  { id: "havells", name: "Havells", logo: "/logo/havells.png" },
  { id: "finolex", name: "Finolex Pipes", logo: "/logo/Finolex-Pipes-Logo-Vector.svg-.png" },
  { id: "saint-gobain", name: "Saint-Gobain", logo: "/logo/ultra.webp" },
  { id: "schneider", name: "Schneider Electric", logo: "/logo/tatatis.png" },
  { id: "kohler", name: "Kohler", logo: "/logo/jsw.png" },
  { id: "jaquar", name: "Jaquar Artize", logo: "/logo/asian-paints.png" },
  { id: "kajaria", name: "Kajaria", logo: "/logo/havells.png" },
  { id: "greenlam", name: "Greenlam", logo: "/logo/Finolex-Pipes-Logo-Vector.svg-.png" },
];

function BrandMark({ item }) {
  return (
    <div 
      className="group relative flex h-16 w-36 sm:h-20 sm:w-44 shrink-0 items-center justify-center px-4 cursor-pointer"
      title={item.name}
    >
      <img
        src={item.logo}
        alt={item.name}
        className="max-h-8 sm:max-h-10 w-auto max-w-full object-contain filter grayscale opacity-45 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 mix-blend-screen"
        loading="lazy"
      />
    </div>
  );
}

export default function MaterialsSection() {
  const track = [...partners, ...partners];

  return (
    <section
      id="partners"
      className="relative overflow-hidden border-y border-white/10 bg-[#0a0a0c] py-20 text-ivory selection:bg-amber-300 selection:text-charcoal lg:py-20"
    >
      {/* Studio Ambient Blur Orbs */}
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

        {/* Material Quality Metric Strip */}
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

      {/* Floating Freeform Logo Ticker */}
      <div className="relative flex w-full items-center overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max items-center gap-10 sm:gap-16 animate-marquee-left hover:[animation-play-state:paused] will-change-transform">
          {track.map((item, i) => (
            <BrandMark key={`${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}