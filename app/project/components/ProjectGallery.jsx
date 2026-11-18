"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { PiArrowLeftLight, PiArrowRightLight, PiArrowUpRightLight } from "react-icons/pi";
import { gallery } from "@/app/project/data";
import { Reveal, SectionHeading } from "./common";

import "swiper/css";

export default function ProjectGallery() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-[#f6efe1] py-16 text-[#14201a] sm:py-20">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrowText="The Township"
            title="A quieter"
            accent="way to live."
          />

          <Reveal delay={0.16}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous images"
                className="gallery-prev flex h-10 w-10 items-center justify-center rounded-full border border-[#14201a]/15 text-[#14201a] transition-colors duration-300 hover:border-[#c07a4e] hover:bg-[#c07a4e] hover:text-white"
              >
                <PiArrowLeftLight size={16} />
              </button>
              <button
                type="button"
                aria-label="Next images"
                className="gallery-next flex h-10 w-10 items-center justify-center rounded-full border border-[#14201a]/15 text-[#14201a] transition-colors duration-300 hover:border-[#c07a4e] hover:bg-[#c07a4e] hover:text-white"
              >
                <PiArrowRightLight size={16} />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-8">
          <Swiper
            modules={[Autoplay, Keyboard, Navigation]}
            loop
            speed={900}
            spaceBetween={16}
            keyboard={{ enabled: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{ nextEl: ".gallery-next", prevEl: ".gallery-prev" }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {gallery.map((item, i) => (
              <SwiperSlide key={item.src}>
                <article className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#14201a]/10 bg-[#171512]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={86}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/90 via-[#141210]/10 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-[#f6efe1] backdrop-blur-md">
                    0{i + 1}
                  </span>

                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                    <p className="max-w-[80%] font-display text-lg font-light leading-snug text-[#f6efe1] transition-transform duration-500 group-hover:-translate-y-0.5">
                      {item.alt}
                    </p>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 text-[#f6efe1] transition-all duration-500 group-hover:border-[#c07a4e] group-hover:bg-[#c07a4e] group-hover:text-white">
                      <PiArrowUpRightLight size={15} />
                    </span>
                  </div>

                  <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[#c07a4e] transition-transform duration-700 ease-out group-hover:scale-x-100" />
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-[#14201a]/40">
            Auto-advancing every 5 seconds
          </p>
        </Reveal>
      </div>
    </section>
  );
}
