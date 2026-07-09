"use client";

import { motion } from "framer-motion";
import gallery from "@/data/gallery";

export default function GallerySection() {
  return (
    <section id="gallery" className="pt-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] text-primary">GALLERY</p>
        <h2 className="font-display mt-3 text-3xl sm:text-4xl font-semibold text-dark">
          Moments That Inspire
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {gallery.map((src, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 },
              }}
              className="group relative h-40 sm:h-48 rounded-xl overflow-hidden"
            >
              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
            </motion.div>
          ))}
        </motion.div>

        <button className="mt-10 rounded-2xl border border-primary/50 px-6 py-2.5 text-xs font-semibold tracking-wide text-dark hover:bg-primary hover:text-white hover:border-primary transition-colors">
          VIEW FULL GALLERY
        </button>
      </div>
    </section>
  );
}
