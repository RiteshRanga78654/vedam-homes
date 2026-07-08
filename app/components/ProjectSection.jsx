'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { projectData } from '../data/mockData';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function ProjectSection() {
  return (
    <section id="projects" className=" bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-sm uppercase tracking-widest font-bold text-[#B88A44]">Signature Spaces</span>
            <h2 className="text-4xl font-light text-[#111111] tracking-tight mt-2">Active Architectural Portfolio</h2>
          </div>
          <p className="text-gray-500 font-light max-w-md mt-4 md:mt-0">
            A comprehensive showcase of upcoming premium properties defined by elite addresses and advanced structural components.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 }
          }}
          className="pb-16"
        >
          {projectData.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="group rounded-2xl overflow-hidden bg-[#FAF7F2] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden h-72 w-full">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs uppercase tracking-widest bg-[#B88A44] px-3 py-1 rounded">Premium Grade</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-400 text-xs tracking-wider uppercase space-x-1">
                    <MapPin size={12} className="text-[#B88A44]" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#111111] mt-2 group-hover:text-[#B88A44] transition-colors duration-300">
                    {project.name}
                  </h3>
                  <button className="mt-6 w-full flex items-center justify-center space-x-2 border border-[#B88A44]/30 hover:border-[#B88A44] text-[#111111] hover:bg-[#B88A44] hover:text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-300">
                    <span>View Architectural Overview</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}