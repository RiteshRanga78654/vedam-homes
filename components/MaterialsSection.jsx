"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

// Local inline JSON data array
const materialsData = [
  { id: "ultratech", name: "UltraTech", logo: "/logo/ultra.webp" },
  { id: "tata-tiscon", name: "Tata Tiscon", logo: "/logo/tatatis.jpg" },
  { id: "jsw", name: "JSW Steel", logo: "/logo/jsw.png" },
  { id: "asian-paints", name: "Asian Paints", logo: "/logo/asian-paints.png" },
  { id: "havells", name: "Havells", logo: "/logo/havells.jpg" },
  { id: "finolex", name: "Finolex Pipes", logo: "/logo/Finolex-Pipes-Logo-Vector.svg-.png" },
   { id: "jsw", name: "JSW Steel", logo: "/logo/jsw.png" },

];

export default function MaterialsSection() {
  return (
    <section id="partners" className="bg-background py-10">
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
            {materialsData.map((m) => (
              <SwiperSlide key={m.id}>
                <div className="flex h-16 items-center justify-center rounded-xl bg-white shadow-sm px-4">
                  {/* Swapped <span> for an <img> tag to correctly render image paths */}
                  <img 
                    src={m.logo} 
                    alt={m.name} 
                    className="max-h-12 max-w-full object-contain filter transition-all duration-300"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}