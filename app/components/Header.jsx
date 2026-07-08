'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { navigationLinks } from '../data/mockData';

const PHONE_DISPLAY = '+1 (234) 56789';
const PHONE_HREF = 'tel:+123456789';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(navigationLinks?.[0]?.name ?? 'About Us');

  const prefersReducedMotion = useReducedMotion();

  // Slim gold progress line — tracks how far the visitor has scrolled.
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll + allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  const handleLinkClick = useCallback((name) => {
    setActiveItem(name);
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Scroll progress indicator */}
      <motion.div
        style={{ scaleX: scrollProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#B88A44] via-[#D9B76A] to-[#B88A44] origin-left z-[60]"
      />

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(17,17,17,0.06),0_10px_30px_-15px_rgba(17,17,17,0.15)] py-3'
            : 'bg-white py-5 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            className="group flex items-baseline gap-[2px] text-xl md:text-2xl font-bold tracking-[0.2em] text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44] focus-visible:ring-offset-4 rounded-sm"
          >
            <span>ESTATE</span>
            <span className="text-[#B88A44] font-serif italic font-medium tracking-normal">
              Avant
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {navigationLinks.map((link) => {
              const isActive = activeItem === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.name)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-4 py-2 text-[13px] uppercase tracking-[0.12em] font-medium rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44] focus-visible:ring-offset-2 ${
                    isActive
                      ? 'text-[#111111]'
                      : 'text-[#4a4a4a] hover:text-[#111111]'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 380, damping: 32 }
                      }
                      className="absolute inset-0 rounded-full bg-[#F6F1E7] border border-[#B88A44]/25"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Call Button & Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="hidden md:flex items-center gap-2 bg-[#111111] text-white pl-5 pr-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-[#B88A44] hover:pr-3 hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44] focus-visible:ring-offset-2"
            >
              <Phone size={16} strokeWidth={2.2} />
              <span>Connect Now</span>
            </a>

            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="lg:hidden relative w-11 h-11 flex items-center justify-center text-[#111111] rounded-full hover:bg-[#F6F1E7] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Slide Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: 'tween', duration: 0.45, ease: [0.65, 0, 0.35, 1] }
            }
            className="fixed inset-0 z-40 bg-white pt-28 px-6 flex flex-col justify-between pb-10 lg:hidden"
          >
            <nav className="flex flex-col divide-y divide-[#111111]/8" aria-label="Mobile">
              {navigationLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.12 + idx * 0.06,
                    duration: 0.4,
                  }}
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.name)}
                  className="group flex items-center justify-between py-5 text-[28px] font-medium tracking-tight text-[#111111]"
                >
                  <span className="group-hover:text-[#B88A44] transition-colors duration-300">
                    {link.name}
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="text-[#B88A44] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.35, duration: 0.4 }}
              className="w-full space-y-3"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#8a8a8a]">
                Speak with our concierge desk
              </p>
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 w-full bg-[#111111] text-white py-4 rounded-xl text-lg font-semibold hover:bg-[#B88A44] transition-colors duration-300"
              >
                <Phone size={20} />
                <span>{PHONE_DISPLAY}</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}