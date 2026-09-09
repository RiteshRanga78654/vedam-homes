"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  PiArrowLeftLight,
  PiArrowRightLight,
  PiArrowsOutSimpleLight,
  PiSparkleFill,
  PiXLight,
  PiCaretDownLight,
  PiSlidersHorizontalLight,
} from "react-icons/pi";

const ASPECTS = [
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[16/11]",
];

const GRID_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw";

const easeOut = [0.16, 1, 0.3, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.985 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, delay: (index % 4) * 0.07, ease: easeOut },
  }),
};

const imageVariants = {
  enter: (direction) => ({ x: direction * 90, opacity: 0, scale: 0.985 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction) => ({ x: direction * -90, opacity: 0, scale: 0.985 }),
};

function GalleryCard({ image, index, aspect, onSelect }) {
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      className="mb-4 break-inside-avoid sm:mb-5"
    >
      <button
        type="button"
        onClick={() => onSelect(index)}
        aria-label={`Open image: ${image.alt}`}
        className={`group relative block w-full ${aspect} cursor-pointer overflow-hidden rounded-2xl border border-border/10 bg-surface text-left shadow-[0_2px_12px_rgba(21,20,15,0.04)] transition-[border-color,box-shadow] duration-700 will-change-transform hover:border-accent/30 hover:shadow-[0_28px_60px_-12px_rgba(21,20,15,0.22)] sm:rounded-3xl`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={GRID_SIZES}
          quality={80}
          className="object-cover transition-[transform,filter] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />

        {/* Permanent soft sheen + reveal gradient on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-night/10 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Folder badge */}
        <div className="pointer-events-none absolute left-4 top-4 flex -translate-y-2 items-center gap-1.5 rounded-full border border-white/25 bg-black/45 px-3 py-1.5 opacity-0 backdrop-blur-md transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <PiSparkleFill className="text-[9px] text-accent-soft" />
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ivory">
            {image.label}
          </span>
        </div>

        {/* Expand icon */}
        <div className="pointer-events-none absolute right-4 top-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/25 bg-black/40 text-ivory opacity-0 backdrop-blur-md transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <PiArrowsOutSimpleLight size={15} />
        </div>

        {/* Caption */}
        <div className="pointer-events-none absolute inset-x-5 bottom-5 flex translate-y-3 items-end justify-between gap-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-soft">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display mt-1 text-base font-light leading-snug text-ivory sm:text-lg">
              {image.alt}
            </h3>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function Lightbox({ items, current, direction, onNavigate, onClose }) {
  const prefersReducedMotion = useReducedMotion();
  const touchX = useRef(null);

  const image = items[current];
  const total = items.length;

  const handleTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) < 50) return;
    onNavigate(dx < 0 ? 1 : -1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0c0b08]/90 px-4 backdrop-blur-xl sm:px-16 lg:px-24"
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:scale-105 hover:bg-white hover:text-night sm:right-8 sm:top-8"
      >
        <PiXLight size={22} />
      </button>

      {/* Counter */}
      <div className="pointer-events-none absolute left-1/2 top-5 z-20 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/60 sm:top-8">
        {String(current + 1).padStart(2, "0")}
        <span className="mx-2 text-white/30">/</span>
        {String(total).padStart(2, "0")}
      </div>

      {/* Prev / Next */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(-1);
        }}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-night sm:left-8 sm:h-14 sm:w-14"
      >
        <PiArrowLeftLight size={20} />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(1);
        }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-night sm:right-8 sm:h-14 sm:w-14"
      >
        <PiArrowRightLight size={20} />
      </button>

      {/* Stage */}
      <div className="pointer-events-none relative z-10 flex w-full max-w-6xl flex-col items-center">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={image.id}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: easeOut }}
            className="pointer-events-auto relative h-[76vh] w-full max-w-5xl sm:h-[78vh]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              quality={92}
              className="rounded-xl object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Caption bar */}
        <motion.div
          key={`caption-${image.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-5 flex items-center gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-soft">
            {image.label}
          </span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span className="font-display text-lg font-light text-white sm:text-xl">
            {image.alt}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function GalleryClient({ images }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [direction, setDirection] = useState(0);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(images.map((image) => image.label)))],
    [images]
  );

  const visibleImages = useMemo(
    () =>
      activeFilter === "All"
        ? images
        : images.filter((image) => image.label === activeFilter),
    [images, activeFilter]
  );

  const open = lightboxIndex !== null;

  const goPrev = useCallback(() => {
    setDirection(-1);
    setLightboxIndex((prev) => (prev - 1 + visibleImages.length) % visibleImages.length);
  }, [visibleImages.length]);

  const goNext = useCallback(() => {
    setDirection(1);
    setLightboxIndex((prev) => (prev + 1) % visibleImages.length);
  }, [visibleImages.length]);

  const handleNavigate = useCallback(
    (dir) => (dir > 0 ? goNext() : goPrev()),
    [goNext, goPrev]
  );

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, goNext, goPrev]);

  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-accent/[0.07] blur-[120px] ambient-orb" />
      <div className="pointer-events-none absolute -left-32 top-[40%] h-[360px] w-[360px] rounded-full bg-accent-soft/[0.06] blur-[120px] ambient-orb" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col gap-8 border-b border-border/10 pb-10 lg:flex-row lg:items-end lg:justify-between lg:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="max-w-3xl"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              <span className="eyebrow font-mono text-xs text-muted">
                The Visual Index
              </span>
            </div>
            <h1 className="font-display text-[40px] font-normal leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Light, material,
              <span className="italic font-light text-ink/55"> and the space between.</span>
            </h1>
            <p className="mt-5 max-w-[46ch] text-sm font-light leading-relaxed text-ink/65 sm:text-base">
              A curated study of the Flower Valley estate and our project elevations — every
              frame drawn from the built work itself.
            </p>
          </motion.div>

          {/* Meta + filters */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: easeOut }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">
              <span>{String(images.length).padStart(2, "0")} frames</span>
              <span className="h-px w-10 bg-border/15" />
              <span className="hidden items-center gap-1.5 sm:flex">
                <PiSlidersHorizontalLight size={13} />
                Select a collection
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 rounded-full border border-border/10 bg-surface-2/70 p-1.5 shadow-sm backdrop-blur-md">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveFilter(category);
                    setLightboxIndex(null);
                  }}
                  className={`cursor-pointer rounded-full px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 sm:text-xs sm:tracking-widest ${
                    activeFilter === category
                      ? "bg-night font-semibold text-ivory shadow-sm dark:bg-amber-400! dark:text-charcoal!"
                      : "text-ink/60 hover:bg-black/5 hover:text-ink"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 gap-4 pt-10 sm:columns-2 sm:gap-5 lg:columns-3 xl:columns-4">
          {visibleImages.map((image, index) => (
            <GalleryCard
              key={`${activeFilter}-${image.id}`}
              image={image}
              index={index}
              aspect={ASPECTS[index % ASPECTS.length]}
              onSelect={setLightboxIndex}
            />
          ))}
        </div>

        <div className="mt-14 pb-6 flex justify-center">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            <PiCaretDownLight size={13} className="animate-bounce" />
            End of collection
          </span>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence mode="wait">
        {open && (
          <Lightbox
            items={visibleImages}
            current={lightboxIndex}
            direction={direction}
            onNavigate={handleNavigate}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}