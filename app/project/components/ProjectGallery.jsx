"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Keyboard } from "swiper/modules";
import { PiCaretLeftLight, PiCaretRightLight, PiArrowsOutLight, PiXLight } from "react-icons/pi";
import { galleryCategories } from "@/app/project/data";
import { Reveal, SectionHeading, easeOut } from "./common";

import "swiper/css";
import "swiper/css/navigation";

export default function ProjectGallery() {
  const [active, setActive] = useState(0);
  const category = galleryCategories[active];
  const images = category.images;

  const swiperConfig = useMemo(
    () => ({
      modules: [Autoplay, Navigation, Keyboard],
      loop: true,
      speed: 900,
      spaceBetween: 4,
      slidesPerView: 1,
      keyboard: { enabled: true },
      autoplay: { delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true },
      navigation: {
        nextEl: ".gallery-next",
        prevEl: ".gallery-prev",
      },
      className: "h-full",
    }),
    []
  );

  const [lightbox, setLightbox] = useState(null); // index within current category

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const touchStart = useRef(null);

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

  return (
    <section id="gallery" className="relative overflow-hidden bg-canvas py-20 text-ink sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Header row */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrowText="The Residence"
            title="Framed, room by"
            accent="room."
          />
          <Reveal delay={0.2}>
            <p className="max-w-sm pb-2 text-sm font-light leading-relaxed text-ink/60">
              Category-driven gallery — elevation, stilt, living, gardens,
              villa and wellness. Slide through each studio.
            </p>
          </Reveal>
        </div>

        {/* Tab rail */}
        <Reveal delay={0.12}>
          <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-2 lg:flex-wrap">
            {galleryCategories.map((cat, i) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(i)}
                className={`group relative shrink-0 rounded-full border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-500 ${
                  i === active
                    ? "border-[#c6a15b] bg-[#0d2b22] text-[#dcbd85] shadow-[0_12px_30px_-10px_rgba(10,34,27,0.5)]"
                    : "border-ink/15 bg-surface-2 text-ink/55 hover:border-[#c6a15b]/50 hover:text-ink"
                }`}
              >
                <span className="mr-1.5 opacity-55">{String(i + 1).padStart(2, "0")}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Stage */}
        <div className="relative mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.995 }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="relative overflow-hidden rounded-[28px] border border-ink/10 bg-[#0a221b]"
            >
              {/* Swiper slider */}
              <div className="relative aspect-[16/10] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
                <Swiper
                  {...swiperConfig}
                  initialSlide={0}
                  onSlideChange={() => {}}
                >
                  {images.map((img, i) => (
                    <SwiperSlide key={img.src}>
                      <div className="relative h-full w-full overflow-hidden">
                        <Image
                          src={img.src}
                          alt={img.caption}
                          fill
                          sizes="100vw"
                          quality={86}
                          loading={i === 0 ? "eager" : "lazy"}
                          className="object-cover"
                        />
                        {/* Legibility scrim */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a221b]/90 via-transparent to-[#0a221b]/30" />
                        {/* Caption */}
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#dcbd85]">
                              {category.label} — 0{String(i + 1).padStart(2, "0")}
                            </p>
                            <p className="mt-1.5 font-display text-xl font-light italic text-[#f4efe3] sm:text-2xl">
                              {img.caption}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setLightbox(i)}
                            className="group/expand flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#f4efe3]/30 bg-[#f4efe3]/10 text-[#f4efe3] backdrop-blur-md transition-all duration-500 hover:bg-[#c6a15b] hover:text-[#0a221b]"
                            aria-label="Open fullscreen view"
                          >
                            <PiArrowsOutLight size={18} className="transition-transform duration-500 group-hover/expand:scale-110" />
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Nav arrows — floating */}
                <button
                  type="button"
                  aria-label="Previous image"
                  className="gallery-prev absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#f4efe3]/25 bg-[#f4efe3]/10 text-[#f4efe3] backdrop-blur-md transition-all duration-300 hover:bg-[#c6a15b] hover:text-[#0a221b] sm:left-7 sm:h-14 sm:w-14"
                >
                  <PiCaretLeftLight size={26} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  className="gallery-next absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#f4efe3]/25 bg-[#f4efe3]/10 text-[#f4efe3] backdrop-blur-md transition-all duration-300 hover:bg-[#c6a15b] hover:text-[#0a221b] sm:right-7 sm:h-14 sm:w-14"
                >
                  <PiCaretRightLight size={26} />
                </button>

                {/* Silk progress hairline */}
                <div className="absolute bottom-5 right-8 hidden sm:block">
                  <p className="rounded-full border border-[#f4efe3]/20 bg-[#0a221b]/50 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#f4efe3]/70 backdrop-blur-md">
                    {category.label} · Sliding Gallery
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0a221b]/95 backdrop-blur-xl"
            onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStart.current === null) return;
              const d = e.changedTouches[0].clientX - touchStart.current;
              if (Math.abs(d) > 60) (d < 0 ? next : prev)();
              touchStart.current = null;
            }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close viewer"
              className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#f4efe3]/25 bg-[#f4efe3]/10 text-[#f4efe3] transition-all duration-300 hover:bg-[#c6a15b] hover:text-[#0a221b]"
            >
              <PiXLight size={20} />
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, x: 50, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.985 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="relative max-h-[82vh] w-full max-w-5xl px-4"
            >
              <div className="relative h-[58vh] overflow-hidden rounded-2xl sm:h-[68vh]">
                <Image
                  src={images[lightbox].src}
                  alt={images[lightbox].caption}
                  fill
                  sizes="100vw"
                  quality={92}
                  priority
                  className="object-contain"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <p className="font-display text-lg font-light italic text-[#f4efe3]">
                  {images[lightbox].caption}
                </p>
                <p className="font-mono text-xs tracking-[0.3em] text-[#dcbd85]">
                  {lightbox + 1}
                  <span className="mx-2 text-[#f4efe3]/40">/</span>
                  {images.length}
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