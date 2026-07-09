"use client";

import { motion } from "framer-motion";
import {
  PiUserFocusLight,
  PiHandshakeLight,
  PiLeafLight,
  PiBuildingsLight,
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

const STATS = [
  { value: "12+", label: "Years of Trust" },
  { value: "40+", label: "Projects Delivered" },
  { value: "2,500+", label: "Happy Families" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl overflow-hidden px-5 py-20 sm:py-24 lg:px-8 lg:py-28"
    >
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -top-20 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Image column — now much bigger */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-black/10">
            <motion.img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
              alt="Modern living room interior"
              className="h-[380px] w-full object-cover sm:h-[460px] lg:h-[560px]"
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />

            {/* Stats overlaid on the image itself */}
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-2 p-5 sm:p-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-xl font-semibold text-white sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-tight text-white/70 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -top-5 -right-5 flex items-center gap-3 rounded-2xl bg-white/95 px-5 py-4 shadow-xl backdrop-blur-md sm:-right-6"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <PiBuildingsLight size={22} />
            </span>
            <div>
              <p className="text-sm font-semibold text-dark">12+ Years</p>
              <p className="text-xs text-dark/50">Building Excellence</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Text column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-primary"
          >
            <span className="h-px w-8 bg-primary/60" />
            ABOUT US
          </motion.p>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="font-display mt-4 text-3xl font-semibold leading-snug text-dark sm:text-4xl lg:text-[2.75rem]"
          >
            We Build Homes.
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              We Build Trust.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-5 max-w-lg text-sm leading-relaxed text-dark/60 sm:text-[15px]"
          >
            Vedam Homes is a trusted real estate developer committed to
            delivering high-quality residential floors across multiple prime
            locations. With a focus on modern design, superior construction,
            and genuine customer care, we craft spaces that elevate
            lifestyles and stand the test of time — homes you'll be proud to
            call your own for generations.
          </motion.p>

          {/* Points now live here as a tight stacked list */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
            }}
            className="mt-8 flex flex-col gap-3"
          >
            {POINTS.map(({ title, desc, icon: Icon }) => (
              <motion.div
                key={title}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 4 }}
                className="group flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <motion.span
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white"
                >
                  <Icon size={20} />
                </motion.span>
                <div>
                  <p className="text-sm font-semibold text-dark">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-dark/50">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}