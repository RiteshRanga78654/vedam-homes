"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PiXLight, PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi";
import { gallery } from "@/app/project/data";
import { Reveal, SectionHeading } from "./common";

export default function ProjectGallery() {
  const [lightbox, setLightbox] = useState(null); // index or null
  const touchStart = useRef(null);

  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % gallery.length)),
    []
  );
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length)),
    []
  );

  const close = useCallback(() => setLightbox(null), []);

  // Keyboard controls — Escape, arrows, circular navigation
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, next, prev, close]);

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 60) (delta < 0 ? next : prev)();
    touchStart.current = null;
  };

  return (
    <section id="gallery" className="relative bg-[#f4efe3] py-24 text-[#0d2b22] sm:py-32">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrowText="The Estate"
            title="A walk through"
            accent="the valley."
          />
          <Reveal delay={0.2}>
            <p className="max-w-sm pb-2 text-sm font-light leading-relaxed text-[#0d2b22]/60">
              Curated from the Flower Valley archive — interiors, gardens and
              the aquatic reserve.
            </p>
          </Reveal>
        </div>

        {/* Asymmetric mosaic */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {gallery.map((img, i) => (
            <Reveal
              key={img.src}
              delay={(i % 4) * 0.07}
              className={`${img.wide ? "col-span-2" : ""} ${i % 5 === 1 ? "lg:mt-14" : ""}`}
            >
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[20px] bg-[#e7e0cf]"
                aria-label={`Open ${img.alt}`}
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={82}
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a221b]/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#dcbd85]">
                    View — 0{i + 1}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Fullscreen circular lightbox */}
      <AnimatePresence>
      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0a221b]/95 backdrop-blur-xl"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#f4efe3]/25 bg-[#f4efe3]/10 text-[#f4efe3] transition-colors duration-300 hover:bg-[#c6a15b] hover:text-[#0a221b]"
          >
            <PiXLight size={20} />
          </button>

          {/* Prev / Next — circular using framer AnimatePresence */}
          <motion.div
            key={lightbox}
            initial={{ opacity: 0, x: 50, scale: 0.985 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.985 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[82vh] w-full max-w-5xl px-4"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/10]">
              <Image
                src={gallery[lightbox].src}
                alt={gallery[lightbox].alt}
                fill
                sizes="100vw"
                quality={92}
                priority
                className="object-contain"
              />
            </div>
            <div className="mt-5 flex items-center justify-between px-1">
              <p className="font-display text-lg font-light italic text-[#f4efe3]">
                {gallery[lightbox].alt}
              </p>
              <p className="font-mono text-xs tracking-[0.3em] text-[#dcbd85]">
                {String(lightbox + 1).padStart(2, "0")}
                <span className="mx-2 text-[#f4efe3]/40">/</span>
                {String(gallery.length).padStart(2, "0")}
              </p>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#f4efe3]/25 bg-[#f4efe3]/10 text-[#f4efe3] transition-colors duration-300 hover:bg-[#c6a15b] hover:text-[#0a221b] sm:left-8 sm:h-14 sm:w-14"
          >
            <PiCaretLeftLight size={26} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#f4efe3]/25 bg-[#f4efe3]/10 text-[#f4efe3] transition-colors duration-300 hover:bg-[#c6a15b] hover:text-[#0a221b] sm:right-8 sm:h-14 sm:w-14"
          >
            <PiCaretRightLight size={26} />
          </button>
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
}