"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  PiArrowUpRightLight,
  PiSparkleFill,
  PiXLight,
  PiArrowsOutSimpleLight,
} from "react-icons/pi";
import Reveal from "@/components/Reveal";
import gallery from "@/data/gallery";

const CATEGORIES = ["All", "Exteriors", "Interiors", "Details"];

function GalleryCard({ item, index, onSelect }) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.05,
      y: (e.clientY - rect.top - rect.height / 2) * 0.05,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="mb-6 break-inside-avoid">
      <Reveal delay={(index % 4) * 0.06}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => onSelect(item)}
          className="group relative cursor-pointer overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-700 hover:border-amber-400/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        >
          {/* Inner Image Frame */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: mousePos.x, y: mousePos.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="will-change-transform"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-auto object-cover filter brightness-[0.88] contrast-[1.05] transition-all duration-1000 ease-out group-hover:scale-105 group-hover:brightness-100"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* Luxury Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/90 via-[#0a0a0c]/20 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

          {/* Floating Category Badge */}
          <div className="absolute left-4 top-4 flex -translate-y-2 items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 backdrop-blur-md opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <PiSparkleFill className="text-amber-300 text-[9px]" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-ivory">
              {item.category || "Detail"}
            </span>
          </div>

          {/* Top Right Expand Icon Button */}
          <div className="absolute right-4 top-4 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:hover:bg-amber-400 group-hover:hover:text-charcoal group-hover:hover:border-amber-400">
            <PiArrowsOutSimpleLight size={14} />
          </div>

          {/* Bottom Card Meta Details */}
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-ivory">
            <div className="translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-300">
                0{index + 1}
              </span>
              <h3 className="font-display mt-0.5 text-lg font-light tracking-wide text-white">
                {item.title}
              </h3>
            </div>

            <div className="flex h-9 w-9 shrink-0 translate-y-3 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:hover:bg-amber-400 group-hover:hover:text-charcoal group-hover:hover:border-amber-400">
              <PiArrowUpRightLight size={16} />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredGallery = gallery.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#0a0a0c] pt-12 pb-24 text-ivory selection:bg-amber-300 selection:text-charcoal sm:pt-16 lg:pt-16 lg:pb-36"
    >
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-amber-600/10 blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-stone-500/10 blur-[160px]" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Section Header with reduced top/bottom margins */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-10 lg:mb-12 border-b border-white/10 pb-8">
          <Reveal y={20}>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="eyebrow text-amber-200/80 font-mono text-xs uppercase tracking-[0.35em]">
                Visual Journal
              </span>
            </div>
            <h2 className="font-display max-w-2xl text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Exteriors, interiors,{" "}
              <span className="italic font-light text-white/60">and the space between.</span>
            </h2>
          </Reveal>

          {/* Category Filter Pills */}
          <Reveal delay={0.1} y={20}>
            <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur-md shadow-sm">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-amber-400 text-charcoal font-semibold shadow-md"
                      : "text-ivory/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Column Masonry Grid */}
        <div className="columns-1 gap-6 sm:columns-2 md:columns-3 lg:columns-4">
          <AnimatePresence>
            {filteredGallery.map((g, i) => (
              <GalleryCard
                key={g.src || g.title}
                item={g}
                index={i}
                onSelect={(item) => setSelectedImage(item)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl sm:p-8 lg:p-12"
          >
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Close image preview"
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-charcoal"
            >
              <PiXLight size={22} />
            </button>

            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-[28px] border border-white/20 bg-[#0d0e12] shadow-2xl"
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[72vh] w-full object-contain"
              />
              <div className="flex items-center justify-between border-t border-white/10 bg-[#0a0a0c]/90 px-8 py-5 text-ivory">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                    {selectedImage.category || "Architecture"}
                  </span>
                  <h4 className="font-display text-2xl font-light text-white">
                    {selectedImage.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}