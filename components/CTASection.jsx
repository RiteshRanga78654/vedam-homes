"use client";

import { PiArrowUpRightLight, PiPhoneCallLight, PiSparkleFill } from "react-icons/pi";
import Reveal from "@/components/Reveal";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative min-h-[620px] w-full overflow-hidden bg-[#070709] py-28 selection:bg-amber-300 selection:text-charcoal lg:min-h-[720px] lg:py-36"
    >
      {/* High-Resolution Luxury Architectural Twilight Hero Image */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2400&auto=format&fit=crop"
        alt="Architectural twilight elevation of a luxury Vedam Homes villa"
        className="absolute inset-0 h-full w-full object-cover filter brightness-[0.6] contrast-[1.12] transition-transform duration-1000 ease-out hover:scale-105"
        loading="lazy"
      />

      {/* Multi-tier Cinematic Gradient & Dark Vignette Masks */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/60 to-[#070709]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/80 via-transparent to-[#070709]/80 pointer-events-none" />

      {/* Studio Radial Ambient Blur Lights */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-amber-500/15 blur-[160px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[500px] w-[500px] rounded-full bg-stone-400/10 blur-[160px]" />

      {/* Centered Editorial Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center text-ivory">
        
        {/* Eyebrow Pill */}
        <Reveal y={20}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 backdrop-blur-md shadow-lg">
            <PiSparkleFill className="text-amber-300 text-xs animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-200/90">
              Start the Conversation
            </span>
          </div>
        </Reveal>

        {/* Scaled Headline */}
        <Reveal delay={0.1} y={25}>
          <h2 className="font-display mt-6 text-4xl font-light leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Your next address
            <br />
            <span className="italic text-white/70">starts here.</span>
          </h2>
        </Reveal>

        {/* Short Subtitle */}
        <Reveal delay={0.16} y={25}>
          <p className="mt-5 max-w-lg font-light text-sm leading-relaxed text-ivory/70 sm:text-base">
            Connect with our lead architects to schedule a private walkthrough
            or discuss prospective developments in Visakhapatnam.
          </p>
        </Reveal>

        {/* Action Buttons */}
        <Reveal delay={0.22} y={25}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full bg-amber-400 px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-charcoal shadow-xl transition-all duration-300 hover:scale-105 hover:bg-amber-300 hover:shadow-[0_0_35px_rgba(252,211,77,0.35)]"
            >
              <span>Explore Portfolio</span>
              <PiArrowUpRightLight
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                size={16}
              />
            </a>

            <a
              href="mailto:info@vedamhomes.com"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/20"
            >
              <PiPhoneCallLight size={16} />
              <span>Talk to Studio</span>
            </a>
          </div>
        </Reveal>

        {/* Direct Inquiries Monospace Stamp */}
        <Reveal delay={0.28} y={20}>
          <p className="mt-12 font-mono text-[11px] uppercase tracking-widest text-ivory/40">
            Direct Concierge: +91 90909 60413
          </p>
        </Reveal>

      </div>
    </section>
  );
}