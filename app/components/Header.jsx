"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  PiListBold, 
  PiXBold, 
  PiArrowUpRightLight, 
  PiSparkleFill, 
  PiPhoneCallLight, 
  PiEnvelopeLight 
} from "react-icons/pi";

const NAV_LINKS = [
  { label: "Projects", href: "#projects", count: "05 Properties" },
  { label: "Philosophy", href: "#philosophy", count: "04 Principles" },
  { label: "Amenities", href: "#amenities", count: "Full Suite" },
  { label: "Gallery", href: "#gallery", count: "Visual Journal" },
  { label: "Insights", href: "#journal", count: "Editorial" },
  { label: "Contact", href: "#contact", count: "Get in Touch" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-out ${
          scrolled ? "py-3 sm:py-4" : "py-6 sm:py-8"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <nav
            className={`flex items-center justify-between rounded-full transition-all duration-500 ${
              scrolled
                ? "border border-white/60 bg-[#f9f7f2]/85 px-6 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl"
                : "bg-transparent px-2 py-0"
            }`}
          >
            {/* Architectural Brand Identity */}
            <a 
  href="#top" 
  className="group flex items-center gap-3 transition-opacity duration-300 hover:opacity-90" 
  aria-label="Vedam Homes Home"
>
  <img
    src="/logo/vedam-homes.png"
    alt="Vedam Homes Logo"
    className={`h-9 sm:h-11 w-auto object-contain transition-all duration-500 group-hover:scale-105 ${
      scrolled 
        ? "filter brightness-100 contrast-[1.05]" 
        : "filter brightness-110 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
    }`}
  />
</a>

            {/* Desktop Navigation Links */}
            <div className="hidden items-center gap-1 rounded-full border border-charcoal/5 bg-charcoal/[0.03] p-1.5 backdrop-blur-md lg:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative rounded-full px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
                    scrolled
                      ? "text-charcoal/70 hover:text-charcoal"
                      : "text-ivory/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className={`group relative hidden items-center gap-2 overflow-hidden rounded-full px-6 py-2.5 font-mono text-xs font-medium uppercase tracking-widest transition-all duration-500 sm:inline-flex ${
                  scrolled
                    ? "bg-charcoal text-ivory hover:bg-amber-800 hover:shadow-lg"
                    : "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-charcoal hover:border-white"
                }`}
              >
                <span>Reserve Visit</span>
                <PiArrowUpRightLight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={14} />
              </a>

              {/* Hamburger Toggle */}
              <button
                onClick={() => setOpen(true)}
                aria-label="Open navigation menu"
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 lg:hidden ${
                  scrolled
                    ? "border-charcoal/10 bg-charcoal/5 text-charcoal hover:bg-charcoal hover:text-ivory"
                    : "border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-charcoal"
                }`}
              >
                <PiListBold size={20} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Fullscreen Overlay Curtain Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0e0f12] text-ivory selection:bg-amber-300 selection:text-charcoal"
          >
            {/* Ambient Background Lights */}
            <div className="pointer-events-none absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-amber-600/10 blur-[100px] ambient-orb" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-stone-500/10 blur-[100px] ambient-orb" />

            {/* Menu Header Bar */}
            <div className="relative mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-6 lg:px-12 lg:py-8 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-ivory/60">
                  Navigation Index
                </span>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-charcoal"
              >
                <PiXBold size={20} className="transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Middle Nav Items with Dynamic Stagger */}
            <div className="relative mx-auto w-full max-w-[1600px] flex-1 px-6 lg:px-12 flex items-center">
              <motion.nav
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                }}
                className="w-full divide-y divide-white/10"
              >
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setHoveredNav(i)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className="relative overflow-hidden"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-5 sm:py-7 transition-all duration-500"
                    >
                      <div className="flex items-baseline gap-6 sm:gap-10">
                        <span className="font-mono text-xs sm:text-sm text-ivory/30 transition-colors duration-300 group-hover:text-amber-400">
                          0{i + 1}
                        </span>
                        <span className="font-display text-4xl sm:text-6xl font-light tracking-tight text-white transition-all duration-500 group-hover:translate-x-3 group-hover:text-amber-100">
                          {link.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-6">
                        <span className="hidden font-mono text-xs uppercase tracking-widest text-ivory/40 sm:block">
                          {link.count}
                        </span>
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ivory/40 transition-all duration-500 group-hover:scale-110 group-hover:border-amber-300 group-hover:bg-amber-300 group-hover:text-charcoal">
                          <PiArrowUpRightLight size={20} className="transition-transform duration-300 group-hover:rotate-45" />
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </motion.nav>
            </div>

            {/* Footer Details */}
            <div className="relative mx-auto w-full max-w-[1600px] border-t border-white/10 px-6 py-8 lg:px-12">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between text-xs font-mono text-ivory/60">
                <div className="flex flex-wrap items-center gap-6">
                  <a href="tel:+919090960413" className="flex items-center gap-2 transition-colors hover:text-amber-300">
                    <PiPhoneCallLight size={16} />
                    <span>+91 90909 60413</span>
                  </a>
                  <a href="mailto:info@vedamhomes.com" className="flex items-center gap-2 transition-colors hover:text-amber-300">
                    <PiEnvelopeLight size={16} />
                    <span>info@vedamhomes.com</span>
                  </a>
                </div>

                <div className="flex gap-6 uppercase tracking-widest text-ivory/40">
                  <a href="#" className="transition-colors hover:text-white">Instagram</a>
                  <a href="#" className="transition-colors hover:text-white">LinkedIn</a>
                  <a href="#" className="transition-colors hover:text-white">Editorial</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}