"use client";

import { motion } from "framer-motion";
import { PiUserFocusLight, PiHandshakeLight, PiLeafLight } from "react-icons/pi";

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
    <section id="about" className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr_0.8fr] gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
            alt="Modern living room interior"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="text-xs font-semibold tracking-[0.25em] text-primary">ABOUT US</p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-semibold text-dark leading-snug">
            We Build Homes.
            <br />
            We Build Trust.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-dark/60 max-w-md">
            Vedam Homes is a trusted real estate developer committed to
            delivering high-quality residential floors across multiple
            prime locations. With a focus on modern design, superior
            construction, and genuine customer care, we craft spaces that
            elevate lifestyles and stand the test of time — homes you'll
            be proud to call your own for generations.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="flex flex-col gap-5"
        >
          {POINTS.map(({ title, desc, icon: Icon }) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon size={22} />
              </span>
              <div>
                <p className="text-sm font-semibold text-dark">{title}</p>
                <p className="text-xs text-dark/50 mt-1 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
