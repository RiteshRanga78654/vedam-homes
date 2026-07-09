"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { PiMapPinLight, PiArrowUpRightBold, PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import projects from "@/data/projects";

import "swiper/css";
import "swiper/css/pagination";

export default function ProjectSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section id="projects" className="relative overflow-hidden bg-white py-20 sm:py-24">
      {/* Decorative background blobs — matches About section */}
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-primary">
              <span className="h-px w-8 bg-primary/60" />
              OUR PROJECTS
            </p>
            <h2 className="font-display mt-4 text-3xl font-semibold text-dark sm:text-4xl">
              Homes in Prime Locations
            </h2>
          </div>

          <button className="rounded-2xl border border-primary/50 px-5 py-2.5 text-xs font-semibold tracking-wide text-dark transition-colors hover:border-primary hover:bg-primary hover:text-white">
            VIEW ALL PROJECTS
          </button>
        </motion.div>

        {/* Slider wrapper — relative so arrows can be positioned against it */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".projects-pagination" }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{
              "--swiper-pagination-color": "var(--color-primary, #b8873f)",
              "--swiper-pagination-bullet-inactive-color": "#00000020",
            }}
            className="!overflow-hidden"
          >
            {projects.map((p, i) => (
              <SwiperSlide key={p.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
                  className="group relative h-[420px] overflow-hidden rounded-[1.75rem] shadow-md transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/15"
                >
                  {/* Image */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/0 transition-opacity duration-300 group-hover:from-black/90" />

                  {/* Status badge */}
                  {p.status && (
                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-dark backdrop-blur-sm">
                      {p.status}
                    </span>
                  )}

                  {/* Arrow button, revealed on hover */}
                  <span className="absolute right-5 top-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-dark opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-primary group-hover:text-white">
                    <PiArrowUpRightBold size={16} />
                  </span>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    {p.price && (
                      <p className="text-xs font-semibold tracking-wide text-primary">
                        {p.price}
                      </p>
                    )}
                    <p className="font-display mt-1 text-lg font-semibold text-white">
                      {p.name}
                    </p>
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-white/70">
                      <PiMapPinLight size={14} className="text-primary" />
                      {p.location}
                    </p>

                    {/* Details link — slides up on hover */}
                    <div className="mt-4 max-h-0 overflow-hidden transition-all duration-300 group-hover:mt-4 group-hover:max-h-12">
                      <button className="w-full rounded-xl border border-white/30 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-dark">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Prev / Next arrows — floating on left/right edges of the slider */}
          <button
            ref={prevRef}
            aria-label="Previous project"
            className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-dark shadow-lg transition-colors hover:border-primary hover:bg-primary hover:text-white max-lg:-left-2 max-lg:h-10 max-lg:w-10"
          >
            <PiCaretLeftBold size={16} />
          </button>
          <button
            ref={nextRef}
            aria-label="Next project"
            className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-dark shadow-lg transition-colors hover:border-primary hover:bg-primary hover:text-white max-lg:-right-2 max-lg:h-10 max-lg:w-10"
          >
            <PiCaretRightBold size={16} />
          </button>
        </div>

        {/* Centered pagination dots */}
        <div className="projects-pagination mt-10 flex justify-center gap-2 [&_.swiper-pagination-bullet]:!m-0 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet-active]:!w-6 [&_.swiper-pagination-bullet-active]:rounded-full [&_.swiper-pagination-bullet-active]:transition-all" />
      </div>
    </section>
  );
}