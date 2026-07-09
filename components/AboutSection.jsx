"use client";

import { motion } from "framer-motion";
import {
  PiUserFocusLight,
  PiHandshakeLight,
  PiLeafLight,
} from "react-icons/pi";

const POINTS = [
  {
    title: "Customer First",
    desc: "Your comfort and satisfaction guide every decision we make.",
    icon: PiUserFocusLight,
  },
  {
    title: "Transparency",
    desc: "Clear communication and honest pricing at every step.",
    icon: PiHandshakeLight,
  },
  {
    title: "Sustainable Living",
    desc: "Designing homes that respect the environment they stand in.",
    icon: PiLeafLight,
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-transparent via-black/[0.01] to-transparent py-15 sm:py-12"
    >
      {/* Optional Soft Background Decorative Ambient Orbs */}
      <div className="absolute top-1/4 left-0 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1.2fr_1fr] lg:gap-8 xl:gap-12 items-center">
          {/* Image Column with a Modern Zoom Mask Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-2xl shadow-neutral-200/50"
          >
            <motion.img
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
              alt="Modern living room interior"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Elegant dark gradient overlay for visual depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
          </motion.div>

          {/* Core Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:pr-4"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-primary uppercase">
              <span className="h-1 w-8 rounded-full bg-primary/40" />
              About Us
            </span>
            <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
              We Build Homes.
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                We Build Trust.
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-600 max-w-xl">
              Vedam Homes is a trusted real estate developer committed to
              delivering high-quality residential floors across multiple prime
              locations. With a focus on modern design, superior construction,
              and genuine customer care, we craft spaces that elevate lifestyles
              and stand the test of time — homes you'll be proud to call your
              own for generations.
            </p>
          </motion.div>

          {/* Interactive Feature Cards Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="flex flex-col gap-4 w-full"
          >
            {POINTS.map(({ title, desc, icon: Icon }) => (
              <motion.div
                key={title}
                variants={{
                  hidden: { opacity: 0, y: 20, x: 20 },
                  visible: { opacity: 1, y: 0, x: 0 },
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group flex items-start gap-4 rounded-2xl border border-neutral-100 bg-white/80 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:border-primary/10 hover:bg-white hover:shadow-md hover:shadow-primary/5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon
                    size={24}
                    className="transition-transform duration-300 group-hover:rotate-6"
                  />
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-neutral-900 tracking-wide transition-colors duration-300 group-hover:text-primary">
                    {title}
                  </p>
                  <p className="text-xs text-neutral-500 leading-relaxed group-hover:text-neutral-600">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
