"use client";

import { useEffect, useState } from "react";
import {
  PiArrowLeftLight,
  PiArrowRightLight,
  PiArrowUpRightLight,
  PiArrowsOutSimpleLight,
<<<<<<< HEAD:app/homepage/components/GallerySection.jsx
  PiCaretDownLight,
} from "react-icons/pi";
import Reveal from "@/app/homepage/components/Reveal";
import gallery from "@/data/gallery";
=======
  PiXLight,
} from "react-icons/pi";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

import Reveal from "@/components/Reveal";

// Gallery data
const gallery = [
  {
    id: 1,
    title: "Modern Exterior",
    category: "Exteriors",
    src: "/assets/osiyan/1.jpeg",
  },
  {
    id: 2,
    title: "Luxury Interior",
    category: "Interiors",
    src: "/assets/osiyan/2.jpeg",
  },
  {
    id: 3,
    title: "Architectural Details",
    category: "Details",
    src: "/assets/osiyan/3.jpeg",
  },
  {
    id: 4,
    title: "Contemporary Design",
    category: "Exteriors",
    src: "/assets/osiyan/4.jpeg",
  },
  {
    id: 5,
    title: "Elegant Living Space",
    category: "Interiors",
    src: "/assets/osiyan/5.jpeg",
  },
  {
    id: 6,
    title: "Minimal Details",
    category: "Details",
    src: "/assets/osiyan/6.jpeg",
  },
  {
    id: 7,
    title: "Premium Architecture",
    category: "Exteriors",
    src: "/assets/osiyan/7.jpeg",
  },
  {
    id: 8,
    title: "Refined Interiors",
    category: "Interiors",
    src: "/assets/osiyan/8.jpeg",
  },
  {
    id: 9,
    title: "Modern Living",
    category: "Details",
    src: "/assets/osiyan/9.jpeg",
  },
  {
    id: 10,
    title: "Elegant Architecture",
    category: "Exteriors",
    src: "/assets/osiyan/10.jpeg",
  },
 
];
>>>>>>> 80fe187 (ghjk):components/GallerySection.jsx

const CATEGORIES = ["All", "Exteriors", "Interiors", "Details"];

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 3;

<<<<<<< HEAD:app/homepage/components/GallerySection.jsx
  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.04,
      y: (e.clientY - rect.top - rect.height / 2) * 0.04,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="mb-0">
      <Reveal delay={(index % 4) * 0.06}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => onSelect(item)}
          className="group relative cursor-pointer overflow-hidden rounded-[24px] border border-border/10 bg-surface shadow-[0_4px_20px_rgba(21,20,15,0.04)] transition-all duration-700 hover:shadow-[0_20px_50px_rgba(21,20,15,0.12)] hover:border-accent/30"
        >
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: mousePos.x, y: mousePos.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="will-change-transform"
            >
              <img
                src={item.src}
                alt={item.title}
                className="h-72 w-full object-cover sm:h-80 md:h-96 filter brightness-[0.96] contrast-[1.03] transition-all duration-1000 ease-out group-hover:scale-105 group-hover:brightness-100"
                loading="lazy"
              />
            </motion.div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

          <div className="absolute left-4 top-4 flex -translate-y-2 items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1 backdrop-blur-md opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <PiSparkleFill className="text-accent-soft text-[9px]" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-ivory">
              {item.category || "Detail"}
            </span>
          </div>

          <div className="absolute right-4 top-4 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:hover:bg-accent group-hover:hover:border-accent">
            <PiArrowsOutSimpleLight size={14} />
          </div>

          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-ivory">
            <div className="translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-soft">
                0{index + 1}
              </span>
              <h3 className="font-display mt-0.5 text-lg font-light tracking-wide text-white">
                {item.title}
              </h3>
            </div>

            <div className="flex h-9 w-9 shrink-0 translate-y-3 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:hover:bg-accent">
              <PiArrowUpRightLight size={16} />
=======
// Gallery card
function GalleryCard({ item, index, onClick }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Reveal>
      <motion.button
        type="button"
        onClick={onClick}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.5,
          delay: index * 0.06,
        }}
        whileHover={shouldReduceMotion ? {} : { y: -6 }}
        className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-[#171717] text-left"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
            {item.category}
          </span>

          <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-black">
            <PiArrowsOutSimpleLight size={18} />
          </span>

          <div className="absolute bottom-0 left-0 w-full p-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-amber-300">
                  Project {String(item.id).padStart(2, "0")}
                </p>

                <h3 className="text-lg font-medium text-white sm:text-xl">
                  {item.title}
                </h3>
              </div>

              <PiArrowUpRightLight
                size={24}
                className="shrink-0 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
>>>>>>> 80fe187 (ghjk):components/GallerySection.jsx
            </div>
          </div>
        </div>
      </motion.button>
    </Reveal>
  );
}

// Main gallery section
export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
<<<<<<< HEAD:app/homepage/components/GallerySection.jsx
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 4;
=======
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
>>>>>>> 80fe187 (ghjk):components/GallerySection.jsx

  const filteredGallery =
    activeCategory === "All"
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  const visibleGallery = filteredGallery.slice(0, visibleCount);

  const currentIndex = filteredGallery.findIndex(
    (item) => item.id === selectedImage?.id
  );

  // Reset visible cards when category changes
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_COUNT);
  };

  // Load next 3 cards
  const handleLoadMore = () => {
    setVisibleCount((previous) => previous + LOAD_MORE_COUNT);
  };

  // Previous image
  const showPrevious = () => {
    if (!filteredGallery.length) return;

    const previousIndex =
      (currentIndex - 1 + filteredGallery.length) %
      filteredGallery.length;

    setSelectedImage(filteredGallery[previousIndex]);
  };

  // Next image
  const showNext = () => {
    if (!filteredGallery.length) return;

    const nextIndex = (currentIndex + 1) % filteredGallery.length;

    setSelectedImage(filteredGallery[nextIndex]);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  // Keyboard controls and prevent background scrolling
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closePopup();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling while the image popup is open.
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage, currentIndex]);

  const visibleGallery = showAll
    ? filteredGallery
    : filteredGallery.slice(0, INITIAL_COUNT);
  const hasMore = filteredGallery.length > INITIAL_COUNT;

  return (
    <section
      id="gallery"
<<<<<<< HEAD:app/homepage/components/GallerySection.jsx
      className="relative overflow-hidden bg-canvas pt-7 pb-7 text-ink selection:bg-[#15140f] selection:text-ivory sm:pt-16 lg:pt-10 lg:pb-16"
    >
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-10 lg:mb-12 border-b border-border/10 pb-8">
          <Reveal y={20}>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="eyebrow text-muted font-mono text-xs uppercase tracking-[0.35em]">
                Visual Journal
              </span>
            </div>
            <h2 className="font-display max-w-2xl text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Exteriors, interiors,{" "}
              <span className="italic font-light text-ink/60">and the space between.</span>
=======
      className="relative overflow-hidden bg-[#101010] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-amber-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-amber-500/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <Reveal>
          <div className="mb-12 text-center sm:mb-16">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-amber-400">
              Our Portfolio
            </p>

            <h2 className="text-3xl font-light leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Exteriors, interiors,
              <br />
              <span className="font-medium text-amber-400">
                and the space between.
              </span>
>>>>>>> 80fe187 (ghjk):components/GallerySection.jsx
            </h2>

<<<<<<< HEAD:app/homepage/components/GallerySection.jsx
          <Reveal delay={0.1} y={20}>
            <div className="flex flex-wrap items-center gap-2 rounded-full border border-border/10 bg-surface-2/70 p-1.5 backdrop-blur-md shadow-sm">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setShowAll(false);
                  }}
                  className={`rounded-full px-5 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-night text-ivory font-semibold shadow-sm dark:bg-amber-400! dark:text-charcoal!"
                      : "text-ink/60 hover:text-ink hover:bg-ink/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {visibleGallery.map((g, i) => (
              <GalleryCard
                key={g.src || g.title}
                item={g}
                index={i}
                onSelect={(item) => setSelectedImage(item)}
              />
            ))}
          </AnimatePresence>
        </div>

        {hasMore && !showAll && (
          <Reveal delay={0.1} y={10}>
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAll(true)}
                className="group flex items-center gap-3 rounded-full border border-border/15 bg-surface-2/70 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-ink backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-night hover:text-ivory hover:shadow-[0_20px_50px_rgba(21,20,15,0.12)] dark:hover:border-amber-400! dark:hover:bg-amber-400! dark:hover:text-charcoal!"
              >
                See More
                <PiCaretDownLight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </button>
            </div>
          </Reveal>
        )}

        {showAll && (
          <Reveal delay={0.1} y={10}>
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAll(false)}
                className="group flex items-center gap-3 rounded-full border border-border/15 bg-surface-2/70 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-ink backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-night hover:text-ivory hover:shadow-[0_20px_50px_rgba(21,20,15,0.12)] dark:hover:border-amber-400! dark:hover:bg-amber-400! dark:hover:text-charcoal!"
              >
                <PiCaretDownLight
                  size={14}
                  className="rotate-180 transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                See Less
              </button>
            </div>
          </Reveal>
        )}
      </div>

=======
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
              Explore our collection of architectural spaces, thoughtful
              details, and contemporary designs.
            </p>
          </div>
        </Reveal>

        {/* Category filters */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                activeCategory === category
                  ? "border-amber-400 bg-amber-400 text-black"
                  : "border-white/15 bg-white/[0.03] text-white/60 hover:border-amber-400/60 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery count */}
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            Selected Works
          </p>

          <p className="text-xs text-white/40">
            Showing {visibleGallery.length} of {filteredGallery.length}
          </p>
        </div>

        {/* Gallery grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleGallery.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <GalleryCard
                  item={item}
                  index={index}
                  onClick={() => setSelectedImage(item)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load more button */}
        {visibleCount < filteredGallery.length && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="group flex items-center gap-3 rounded-full border border-amber-400/50 px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-amber-400 hover:bg-amber-400 hover:text-black"
            >
              Load More

              <PiArrowRightLight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        )}
      </div>

      {/* Image popup */}
>>>>>>> 80fe187 (ghjk):components/GallerySection.jsx
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
<<<<<<< HEAD:app/homepage/components/GallerySection.jsx
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#15140f]/90 p-4 backdrop-blur-xl sm:p-8 lg:p-12"
          >
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Close image preview"
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-ink"
            >
              <PiXLight size={22} />
            </button>

            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-[28px] border border-white/20 bg-[#15140f] shadow-2xl"
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[72vh] w-full object-contain"
              />
              <div className="flex items-center justify-between border-t border-white/10 bg-[#15140f]/90 px-8 py-5 text-ivory">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent-soft">
                    {selectedImage.category || "Architecture"}
                  </span>
                  <h4 className="font-display text-2xl font-light text-white">
=======
            onClick={closePopup}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#171717] p-3 shadow-2xl sm:p-4"
            >
              {/* Close */}
              <button
                type="button"
                onClick={closePopup}
                aria-label="Close image"
                className="absolute right-5 top-5 z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-amber-400 hover:text-black"
              >
                <PiXLight size={22} />
              </button>

              {/* Previous */}
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous image"
                className="absolute left-5 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition hover:border-amber-400 hover:bg-amber-400 hover:text-black"
              >
                <PiArrowLeftLight size={23} />
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="absolute right-5 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition hover:border-amber-400 hover:bg-amber-400 hover:text-black"
              >
                <PiArrowRightLight size={23} />
              </button>

              {/* Full image */}
              <div className="flex min-h-[250px] items-center justify-center overflow-hidden rounded-xl bg-black sm:min-h-[350px]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-h-[65vh] w-full object-contain"
                />
              </div>

              {/* Popup footer */}
              <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-4">
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-amber-400">
                    {selectedImage.category}
                  </p>

                  <h3 className="text-base font-medium text-white sm:text-lg">
>>>>>>> 80fe187 (ghjk):components/GallerySection.jsx
                    {selectedImage.title}
                  </h3>
                </div>

                <p className="shrink-0 text-xs text-white/50">
                  {String(currentIndex + 1).padStart(2, "0")} /{" "}
                  {String(filteredGallery.length).padStart(2, "0")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}