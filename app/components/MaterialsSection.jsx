'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { materialsData } from '../data/mockData';

import 'swiper/css';

export default function MaterialsSection() {
  return (
    <section id="partners" className=" bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-widest text-gray-400 font-bold mb-10">
          Engineered with Industrial Grade Alliance Materials
        </p>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={40}
          slidesPerView={2}
          loop={true}
          speed={3000}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 6 }
          }}
          className="flex items-center"
        >
          {materialsData.map((brand, i) => (
            <SwiperSlide key={i} className="flex justify-center items-center">
              <div className="text-center font-bold tracking-wider text-xl md:text-2xl text-gray-400/70 uppercase hover:text-[#B88A44] transition-colors duration-300 cursor-default select-none py-2">
                {brand.name}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}