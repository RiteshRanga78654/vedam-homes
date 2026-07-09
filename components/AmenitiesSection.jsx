"use client";

import { motion } from "framer-motion";
import * as PiIcons from "react-icons/pi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import amenities from "@/data/amenities";

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-10">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] text-primary">
          AMENITIES
        </p>

        <h2 className="font-display mt-3 text-3xl sm:text-4xl font-semibold text-dark">
          Thoughtful Features, Everyday Comfort
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            speed={1600}
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 6,
              },
              1280: {
                slidesPerView: 8,
              },
            }}
          >
            {amenities.map((a) => {
              const Icon = PiIcons[a.icon];

              return (
                <SwiperSlide key={a.id} className="!h-auto">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="h-[170px] w-full flex flex-col items-center justify-center gap-4 rounded-2xl border border-black/5 bg-white px-4 py-6 shadow-sm hover:shadow-md hover:border-primary/30 transition"
                  >
                    {Icon && (
                      <Icon
                        size={40}
                        className="text-primary flex-shrink-0"
                      />
                    )}

                    <p className="text-sm font-medium text-dark text-center leading-5">
                      {a.title}
                    </p>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}