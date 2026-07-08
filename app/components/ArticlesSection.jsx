'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { articlesData } from '../data/mockData';

export default function ArticlesSection() {
  return (
    <section id="articles" className="py-32 bg-[#FAF9F5] text-[#191919] selection:bg-[#B88A44]/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mb-24">
          <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#B88A44] mb-4">
            — Insights & Perspective
          </p>
          <h2 className="text-5xl md:text-6xl font-light tracking-[-0.03em] text-[#111111] leading-[1.1]">
            Writing on design, culture <span className="font-serif italic text-[#B88A44] font-normal">&</span> industry shift.
          </h2>
        </div>

        {/* Clean 3-Card Row Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {articlesData.slice(0, 3).map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: index * 0.08 }}
              className="group flex flex-col cursor-pointer"
            >
              {/* Media Canvas */}
              <div className="relative overflow-hidden aspect-[16/11] w-full mb-7 bg-[#F3F1EC] rounded-sm">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t provinces from-black/[0.02] to-transparent pointer-events-none" />
              </div>

              {/* Content Block */}
              <div className="flex flex-col flex-grow">
                {/* Meta Row */}
                <div className="flex items-center space-x-3 text-[11px] tracking-widest text-gray-400 uppercase font-medium">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-[#B88A44]">Culture</span>
                </div>

                {/* Animated Underline Title */}
                <h3 className="text-2xl font-light text-[#111111] mt-4 tracking-tight leading-snug">
                  <span className="bg-gradient-to-r from-[#B88A44] to-[#B88A44] bg-[length:0%_1px] bg-no-repeat bg-bottom pb-1 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px]">
                    {article.title}
                  </span>
                </h3>

                {/* Description */}
                <p className="text-gray-500 mt-3 text-[15px] font-light leading-relaxed line-clamp-3 opacity-90">
                  {article.desc}
                </p>

                {/* Read Button */}
                <div className="pt-5 mt-auto flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#111111]/70 group-hover:text-[#B88A44] transition-colors duration-300">
                  <span>Read Essay</span>
                  <ArrowUpRight size={14} className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}