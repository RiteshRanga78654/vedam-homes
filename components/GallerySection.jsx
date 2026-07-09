"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import gallery from "@/data/gallery";

import "swiper/css";
import "swiper/css/navigation";

export default function GallerySection() {
  const [selectedImg, setSelectedImg] = useState(null);

  const currentIndex = selectedImg
    ? gallery.findIndex((img) => img.id === selectedImg.id)
    : 0;

  const showNext = () => {
    const nextIndex = (currentIndex + 1) % gallery.length;
    setSelectedImg(gallery[nextIndex]);
  };

  const showPrev = () => {
    const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    setSelectedImg(gallery[prevIndex]);
  };

  return (
    <section id="gallery" className="bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 ">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-center mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-center text-primary">
             VISUAL PROOF
            </p>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl font-semibold text-dark">
              Finishing Aesthetic   
            </h2>
          </div>
          {/* 
          <button className="mt-4 md:mt-0 text-sm font-semibold tracking-wider text-[#B88A44] uppercase hover:text-[#111111] transition-colors">
            View Full Digital Blueprint Portfolio →
          </button> */}
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={2}
          spaceBetween={16}
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: ".gallery-prev",
            nextEl: ".gallery-next",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            // 1024: {
            //   slidesPerView: 5,
            // },
          }}
          className="pb-2"
        >
          {gallery.map((img) => (
            <SwiperSlide key={img.id}>
              <div
                onClick={() => setSelectedImg(img)}
                className="relative h-80 overflow-hidden rounded-2xl cursor-pointer group shadow-sm"
              >
                <img
                  src={img.url}
                  alt={img.title || "Gallery"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-white/90 p-3 rounded-full"
                  >
                    <Maximize2 size={18} />
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="gallery-prev p-3 rounded-full border border-[#B88A44]/30 text-[#B88A44] hover:bg-[#B88A44] hover:text-white transition">
            <ChevronLeft size={20} />
          </button>

          <button className="gallery-next p-3 rounded-full border border-[#B88A44]/30 text-[#B88A44] hover:bg-[#B88A44] hover:text-white transition">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 text-white"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white"
            >
              <ChevronLeft size={40} />
            </button>

            <motion.img
              key={selectedImg.id}
              src={selectedImg.url}
              alt={selectedImg.title || "Gallery"}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white"
            >
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
