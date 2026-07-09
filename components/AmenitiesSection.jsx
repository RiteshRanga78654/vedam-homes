"use client";

import { motion } from "framer-motion";
import * as PiIcons from "react-icons/pi";
import amenities from "@/data/amenities";

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] text-primary">AMENITIES</p>
        <h2 className="font-display mt-3 text-3xl sm:text-4xl font-semibold text-dark">
          Thoughtful Features, Everyday Comfort
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-5"
        >
          {amenities.map((a) => {
            const Icon = PiIcons[a.icon];
            return (
              <motion.div
                key={a.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-8 shadow-sm hover:shadow-md hover:border-primary/30 transition"
              >
                {Icon && <Icon size={28} className="text-primary" />}
                <p className="text-sm font-medium text-dark">{a.title}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
