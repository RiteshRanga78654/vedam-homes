"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PiFacebookLogoLight,
  PiInstagramLogoLight,
  PiLinkedinLogoLight,
  PiArrowUpRightLight,
  PiArrowUpLight,
  PiSparkleFill,
  PiCheckCircleFill,
} from "react-icons/pi";
import Reveal from "@/components/Reveal";

const COLUMNS = [
  {
    title: "Portfolio",
    links: [
      { label: "Selected Works", href: "#projects" },
      { label: "Studio Philosophy", href: "#philosophy" },
      { label: "Living Amenities", href: "#amenities" },
      { label: "Visual Gallery", href: "#gallery" },
      { label: "Architectural Journal", href: "#journal" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About Vedam", href: "#about" },
      { label: "Partners & Materials", href: "#partners" },
      { label: "Interactive 3D CAD", href: "#interactive" },
      { label: "Client Words", href: "#testimonials" },
      { label: "Direct Inquiries", href: "#contact" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-[#070709] pt-16 pb-8 text-ivory/70 selection:bg-amber-300 selection:text-charcoal lg:pt-20">
      {/* Studio Radial Ambient Glow */}
      <div className="pointer-events-none absolute -left-48 bottom-0 h-[450px] w-[450px] rounded-full bg-amber-600/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-48 top-0 h-[450px] w-[450px] rounded-full bg-stone-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Top Header: Brand Tag & Back to Top */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-amber-200/80">
              Est. 2014 — Visakhapatnam
            </span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ivory backdrop-blur-md transition-all duration-300 hover:border-amber-400/50 hover:bg-amber-400 hover:text-charcoal"
          >
            <span>Top</span>
            <PiArrowUpLight
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
              size={12}
            />
          </button>
        </div>

        {/* Scaled-Down Architectural Headline */}
        <div className="py-10 sm:py-12">
          <Reveal y={25} duration={0.8}>
            <h2 className="font-display text-4xl font-light leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Built around{" "}
              <span className="italic font-light text-white/50">
                the way you live.
              </span>
            </h2>
          </Reveal>
        </div>

        {/* 4-Column Navigation & Newsletter Grid */}
        <div className="grid grid-cols-1 gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Col 1: Studio Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 font-display text-xs font-semibold text-charcoal">
                V
              </div>
              <span className="font-display text-xl font-light tracking-wide text-white">
                Vedam Homes
              </span>
            </div>

            <p className="mt-3.5 max-w-sm font-light text-xs leading-relaxed text-ivory/60">
              An architect-led studio crafting bespoke residential landmarks where
              material honesty, light, and timeless living converge across
              Visakhapatnam.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-2.5">
              {[
                { icon: PiInstagramLogoLight, href: "#", label: "Instagram" },
                { icon: PiLinkedinLogoLight, href: "#", label: "LinkedIn" },
                { icon: PiFacebookLogoLight, href: "#", label: "Facebook" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-ivory/70 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:bg-amber-400 hover:text-charcoal"
                >
                  <item.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 & 3: Nav Columns */}
          {COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-300/80">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5 text-xs font-light">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-1.5 text-ivory/70 transition-colors duration-300 hover:text-white"
                    >
                      <span>{l.label}</span>
                      <PiArrowUpRightLight
                        size={11}
                        className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-amber-300"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <div className="flex items-center gap-1.5">
                <PiSparkleFill className="text-[10px] text-amber-300" />
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/90">
                  Private Dispatch
                </p>
              </div>

              <p className="mt-2 text-xs font-light leading-relaxed text-ivory/60">
                Quarterly monographs on spatial design, site releases, and
                architectural essays.
              </p>

              <form onSubmit={handleSubmit} className="relative mt-4">
                <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md transition-all focus-within:border-amber-400/50 focus-within:bg-white/10">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-transparent px-3 py-1.5 font-mono text-xs text-ivory placeholder:text-ivory/30 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400 text-charcoal transition-transform duration-300 hover:scale-105 active:scale-95"
                  >
                    <PiArrowUpRightLight size={13} />
                  </button>
                </div>
              </form>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2.5 flex items-center gap-1.5 font-mono text-[11px] text-amber-300"
                >
                  <PiCheckCircleFill size={13} />
                  <span>Added to private registry.</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Legal & Geo Coordinates */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 font-mono text-[11px] text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vedam Homes Studio. All rights reserved.</p>
          <p className="max-w-md text-left sm:text-right">
            D No. 10-3-44/2, Dwaraka Nagar, Visakhapatnam, AP 530016 · +91 90909 60413
          </p>
        </div>
      </div>
    </footer>
  );
}