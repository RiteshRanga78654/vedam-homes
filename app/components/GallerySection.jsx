'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { galleryData } from '../data/mockData';

import 'swiper/css';
import 'swiper/css/navigation';

export default function GallerySection() {
  const [selectedImg, setSelectedImg] = useState(null);

  const currentIndex = galleryData.findIndex((img) => img.id === selectedImg?.id);

  const showNext = () => {
    const nextIndex = (currentIndex + 1) % galleryData.length;
    setSelectedImg(galleryData[nextIndex]);
  };

  const showPrev = () => {
    const prevIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    setSelectedImg(galleryData[prevIndex]);
  };

  // Swiper क्लिक को हैंडल करने के लिए फंक्शन
  const handleSwiperClick = (swiper) => {
    // clickedIndex से पता चलता है कि किस स्लाइड पर क्लिक हुआ है (यह clones को भी संभाल लेता है)
    const clickedIdx = swiper.clickedIndex;
    if (clickedIdx !== undefined) {
      // realIndex का उपयोग करके हम ओरिजिनल डेटा से सही इमेज निकालते हैं
      const realImg = galleryData[swiper.realIndex];
      if (realImg) {
        setSelectedImg(realImg);
      }
    }
  };

  return (
    <section id="gallery" className=" bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-sm uppercase tracking-widest font-bold text-[#B88A44]">Visual Proof</span>
            <h2 className="text-4xl font-light text-[#111111] tracking-tight mt-2">Finishing Aesthetic</h2>
          </div>
          <button className="mt-4 md:mt-0 text-sm font-semibold tracking-wider text-[#B88A44] uppercase hover:text-[#111111] transition-colors">
            View Full Digital Blueprint Portfolio &rarr;
          </button>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: '.gallery-next',
            prevEl: '.gallery-prev',
          }}
          // यहाँ हमने Swiper का inbuilt onClick इवेंट जोड़ दिया है
          onClick={handleSwiperClick} 
          breakpoints={{
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="!pb-2"
        >
          {galleryData.map((img) => (
            <SwiperSlide key={img.id}>
              {/* यहाँ से onClick={() => setSelectedImg(img)} हटा दिया गया है */}
              <div className="relative overflow-hidden rounded-2xl h-80 group cursor-pointer shadow-sm">
                <img
                  src={img.url}
                  alt="Architectural space detail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-white/90 backdrop-blur-sm p-3 rounded-full text-[#111111]"
                  >
                    <Maximize2 size={18} />
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Nav arrows */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="gallery-prev p-3 rounded-full border border-[#B88A44]/30 text-[#B88A44] hover:bg-[#B88A44] hover:text-white transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button className="gallery-next p-3 rounded-full border border-[#B88A44]/30 text-[#B88A44] hover:bg-[#B88A44] hover:text-white transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3"
            >
              <ChevronLeft size={36} />
            </button>

            <motion.img
              key={selectedImg.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              src={selectedImg.url}
              alt="Architectural space detail full view"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3"
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}