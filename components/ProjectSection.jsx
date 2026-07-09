"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { PiMapPinLight } from "react-icons/pi";
import projects from "@/data/projects";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function ProjectSection() {
  return (
    <section id="projects" className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-center flex-wrap gap-4 mb-10"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-primary text-center">OUR PROJECTS</p>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl font-semibold text-dark">
              Homes in Prime Locations
            </h2>
          </div>
        
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="!pb-12"
        >
          {projects.map((p) => (
            <SwiperSlide key={p.id}>
              <div className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow">
                <div className="h-52 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold text-dark">{p.name}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-dark/50">
                    <PiMapPinLight size={14} className="text-primary" />
                    {p.location}
                  </p>
                  <button className="mt-4 w-full rounded-xl border border-primary/40 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
<div className="flex justify-center">
  <button className="rounded-2xl mt-2 border border-primary/50 px-6 py-2.5 text-xs font-semibold tracking-wide text-dark hover:bg-primary hover:text-white hover:border-primary transition-colors">
    VIEW ALL PROJECTS
  </button>
</div>
    </section>
  );
}
  