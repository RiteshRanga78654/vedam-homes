"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import materials from "@/data/materials";

import "swiper/css";

export default function MaterialsSection() {
  return (
    <section id="partners" className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-center text-xs font-semibold tracking-[0.25em] text-primary">
          MATERIALS USED
        </p>

        <div className="mt-8">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            loop
            speed={4000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            allowTouchMove={false}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 6 },
            }}
          >
            {materials.map((m) => (
              <SwiperSlide key={m.id}>
                <div className="flex h-16 items-center justify-center rounded-xl bg-white shadow-sm px-4">
                  <span className="font-display text-sm sm:text-base font-semibold text-dark text-center">
                    {m.name}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
