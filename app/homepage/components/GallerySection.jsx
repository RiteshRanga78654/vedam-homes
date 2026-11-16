"use client";

import { useEffect, useState } from "react";
import {
  PiArrowLeftLight,
  PiArrowRightLight,
  PiArrowUpRightLight,
  PiArrowsOutSimpleLight,
  PiXLight,
} from "react-icons/pi";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

import Reveal from "@/app/homepage/components/Reveal";

// Gallery data — replace image paths when you have separate images.
const gallery = [
  {
    id: 1,
    title: "Modern Exterior",
    category: "Exteriors",
    src: "/white/ext1.jpeg",
  },
  {
    id: 2,
    title: "Luxury Interior",
    category: "Interiors",
    src: "/white/ext2.jpeg",
  },
  {
    id: 3,
    title: "Architectural Details",
    category: "Details",
    src: "/white/int1.jpeg",
  },
  {
    id: 4,
    title: "Contemporary Design",
    category: "Exteriors",
    src: "/white/int2.jpeg",
  },
  {
    id: 5,
    title: "Elegant Living Space",
    category: "Interiors",
    src: "/white/arch.jpeg",
  },
  {
    id: 6,
    title: "Minimal Details",
    category: "Details",
    src: "/white/5.jpeg",
  },

];

const CATEGORIES = ["All", "Exteriors", "Interiors", "Details"];

// Individual gallery card
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
        className="group relative block w-full overflow-hidden rounded-2xl border border-[#15140f]/15 bg-[#15140f] text-left"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <motion.img
            src={item.src}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Category */}
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
            {item.category}
          </span>

          {/* Expand icon */}
          <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#15140f] group-hover:bg-[#15140f] group-hover:text-[#f5f1e8]">
            <PiArrowsOutSimpleLight size={18} />
          </span>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 w-full p-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#f5f1e8]">
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

  const filteredGallery =
    activeCategory === "All"
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  const currentIndex = filteredGallery.findIndex(
    (item) => item.id === selectedImage?.id
  );

  const showPrevious = () => {
    if (!filteredGallery.length) return;

    const previousIndex =
      (currentIndex - 1 + filteredGallery.length) %
      filteredGallery.length;

    setSelectedImage(filteredGallery[previousIndex]);
  };

  const showNext = () => {
    if (!filteredGallery.length) return;

    const nextIndex = (currentIndex + 1) % filteredGallery.length;

    setSelectedImage(filteredGallery[nextIndex]);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closePopup();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling while popup is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage, currentIndex, filteredGallery]);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#f5f1e8] px-5 py-20 text-[#15140f] sm:px-8 lg:px-12 lg:py-28" style={{ fontFamily: 'Fraunces, "Fraunces Fallback", serif' }}
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#15140f]/[0.04] blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#15140f]/[0.04] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section heading */}
        <Reveal>
          <div className="mb-12 text-center sm:mb-16">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#15140f]">
              Our Portfolio
            </p>

            <h2 className="text-3xl font-light leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Exteriors, interiors,
              <br />
              <span className="font-medium text-[#15140f]">
                and the space between.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#15140f]/55 sm:text-base">
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
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                activeCategory === category
                  ? "border-[#15140f] bg-[#15140f] text-[#f5f1e8]"
                  : "border-[#15140f]/20 bg-[#15140f]/[0.03] text-[#15140f]/65 hover:border-[#15140f]/60 hover:text-[#15140f]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery count */}
        <div className="mb-6 flex items-center justify-between border-b border-[#15140f]/15 pb-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#15140f]/50">
            Selected Works
          </p>

          <p className="text-xs text-[#15140f]/50">
            {String(filteredGallery.length).padStart(2, "0")} Projects
          </p>
        </div>

        {/* Gallery grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, index) => (
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
      </div>

      {/* Image popup / lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-[#15140f]/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-[#15140f]/15 bg-[#f5f1e8] p-3 shadow-2xl sm:p-4"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={closePopup}
                aria-label="Close image"
                className="absolute right-5 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-[#15140f] hover:text-[#f5f1e8]"
              >
                <PiXLight size={22} />
              </button>

              {/* Previous button */}
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous image"
                className="absolute left-5 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition hover:border-[#15140f] hover:bg-[#15140f] hover:text-[#f5f1e8]"
              >
                <PiArrowLeftLight size={23} />
              </button>

              {/* Next button */}
              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="absolute right-5 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition hover:border-[#15140f] hover:bg-[#15140f] hover:text-[#f5f1e8]"
              >
                <PiArrowRightLight size={23} />
              </button>

              {/* Full image — object-contain prevents cropping */}
              <div className="flex min-h-[250px] items-center justify-center overflow-hidden rounded-xl bg-[#15140f] sm:min-h-[350px]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-h-[65vh] w-full object-contain"
                />
              </div>

              {/* Popup footer */}
              <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-4">
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#15140f]">
                    {selectedImage.category}
                  </p>

                  <h3 className="text-base font-medium text-white sm:text-lg">
                    {selectedImage.title}
                  </h3>
                </div>

                <p className="shrink-0 text-xs text-[#15140f]/55">
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