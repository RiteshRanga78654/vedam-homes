"use client";

import { PiArrowUpRightLight, PiPhoneCallLight, PiSparkleFill } from "react-icons/pi";
import Reveal from "@/components/Reveal";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative min-h-[620px] w-full overflow-hidden bg-[#15140f] py-28 selection:bg-[#f5f1e8] selection:text-[#15140f] lg:min-h-[720px] lg:py-36"
    >
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2400&auto=format&fit=crop"
        alt="Architectural twilight elevation of a luxury Vedam Homes villa"
        className="absolute inset-0 h-full w-full object-cover filter brightness-[0.55] contrast-[1.1] transition-transform duration-1000 ease-out hover:scale-105"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#15140f] via-[#15140f]/60 to-[#15140f]/80 pointer-events-none" />

      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center text-[#f5f1e8]">
        <Reveal y={20}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 backdrop-blur-md shadow-lg">
            <PiSparkleFill className="text-[#a68a5c] text-xs animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#cdc4b2]">
              Start the Conversation
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1} y={25}>
          <h2 className="font-display mt-6 text-4xl font-light leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Your next address
            <br />
            <span className="italic text-white/70">starts here.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16} y={25}>
          <p className="mt-5 max-w-lg font-light text-sm leading-relaxed text-[#f5f1e8]/75 sm:text-base">
            Connect with our lead architects to schedule a private walkthrough
            or discuss prospective developments in Visakhapatnam.
          </p>
        </Reveal>

        <Reveal delay={0.22} y={25}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full bg-[#f5f1e8] px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#15140f] shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#a68a5c] hover:text-white"
            >
              <span>Explore Portfolio</span>
              <PiArrowUpRightLight
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                size={16}
              />
            </a>

            <a
              href="mailto:info@vedamhomes.com"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
            >
              <PiPhoneCallLight size={16} />
              <span>Talk to Studio</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.28} y={20}>
          <p className="mt-12 font-mono text-[11px] uppercase tracking-widest text-[#f5f1e8]/40">
            Direct Concierge: +91 90909 60413
          </p>
        </Reveal>
      </div>
    </section>
  );
}