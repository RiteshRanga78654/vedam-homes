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
      { label: "Interactive Visual", href: "#interactive" },
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
    <footer className="relative overflow-hidden bg-[#15140f] pt-16 pb-8 text-[#f5f1e8]/70 selection:bg-[#f5f1e8] selection:text-[#15140f] lg:pt-20">
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a68a5c] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#cdc4b2]">
              Est. 2014 — Visakhapatnam
            </span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[#f5f1e8] backdrop-blur-md transition-all duration-300 hover:border-[#a68a5c] hover:bg-[#a68a5c] hover:text-white"
          >
            <span>Top</span>
            <PiArrowUpLight
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
              size={12}
            />
          </button>
        </div>

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

        <div className="grid grid-cols-1 gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#a68a5c] font-display text-xs font-semibold text-[#15140f]">
                V
              </div>
              <span className="font-display text-xl font-light tracking-wide text-white">
                Vedam Homes
              </span>
            </div>

            <p className="mt-3.5 max-w-sm font-light text-xs leading-relaxed text-[#f5f1e8]/60">
              An architect-led studio crafting bespoke residential landmarks where
              material honesty, light, and timeless living converge across
              Visakhapatnam.
            </p>

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
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#f5f1e8]/70 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#a68a5c] hover:bg-[#a68a5c] hover:text-white"
                >
                  <item.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#a68a5c]">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5 text-xs font-light">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-1.5 text-[#f5f1e8]/70 transition-colors duration-300 hover:text-white"
                    >
                      <span>{l.label}</span>
                      <PiArrowUpRightLight
                        size={11}
                        className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-[#a68a5c]"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <div className="flex items-center gap-1.5">
                <PiSparkleFill className="text-[10px] text-[#a68a5c]" />
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white">
                  Private Dispatch
                </p>
              </div>

              <p className="mt-2 text-xs font-light leading-relaxed text-[#f5f1e8]/60">
                Quarterly monographs on spatial design, site releases, and
                architectural essays.
              </p>

              <form onSubmit={handleSubmit} className="relative mt-4">
                <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md transition-all focus-within:border-[#a68a5c]/50 focus-within:bg-white/10">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-transparent px-3 py-1.5 font-mono text-xs text-[#f5f1e8] placeholder:text-[#f5f1e8]/30 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5f1e8] text-[#15140f] transition-transform duration-300 hover:scale-105 active:scale-95"
                  >
                    <PiArrowUpRightLight size={13} />
                  </button>
                </div>
              </form>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2.5 flex items-center gap-1.5 font-mono text-[11px] text-[#a68a5c]"
                >
                  <PiCheckCircleFill size={13} />
                  <span>Added to private registry.</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 font-mono text-[11px] text-[#f5f1e8]/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vedam Homes Studio. All rights reserved.</p>
          <p className="max-w-md text-left sm:text-right text-[13px] bold">
            POWERED BY <a href="https://www.ireedindia.com/" target="_blank">
              IREED Media
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}