"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiPhoneFill, PiListBold, PiXBold } from "react-icons/pi";

const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Amenities", href: "#amenities" },
  { label: "Partners", href: "#partners" },
  { label: "Gallery", href: "#gallery" },
  { label: "Articles", href: "#articles" },
  { label: "CSR Initiatives", href: "#csr" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/5">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-3 shrink-0">
            <svg width="34" height="34" viewBox="0 0 40 40" fill="none" className="text-primary">
              <path d="M20 3 L36 15 V36 H4 V15 Z" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M14 36 V22 H26 V36" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M9 15 L20 7 L31 15" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            <div className="leading-tight">
              <p className="font-display text-lg font-semibold tracking-wide text-dark">VEDAM</p>
              <p className="text-[10px] tracking-[0.3em] text-dark/50 -mt-1">HOMES</p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActive(link.label)}
                className={`relative text-sm transition-colors py-1 ${
                  active === link.label ? "text-primary" : "text-dark/80 hover:text-primary"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-primary transition-all duration-300 ${
                    active === link.label ? "w-full" : "w-0"
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Call + mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="tel:9999999999"
              className="hidden sm:inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-dark transition-colors"
            >
              <PiPhoneFill size={16} />
              99999 99999
            </a>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 text-dark"
              aria-label="Open menu"
            >
              <PiListBold size={26} />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-dark lg:hidden"
          >
            <div className="flex justify-between items-center px-5 h-20">
              <span className="font-display text-lg text-white">VEDAM HOMES</span>
              <button onClick={() => setOpen(false)} className="text-white p-2" aria-label="Close menu">
                <PiXBold size={26} />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
              }}
              className="flex flex-col items-center justify-center gap-6 h-[calc(100%-5rem)]"
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setActive(link.label);
                    setOpen(false);
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="text-2xl font-display text-white hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="tel:9999999999"
                className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white"
              >
                <PiPhoneFill size={16} />
                99999 99999
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
