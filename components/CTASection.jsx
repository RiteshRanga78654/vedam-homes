"use client";

import { motion } from "framer-motion";
import { PiBriefcaseLight, PiHandshakeLight } from "react-icons/pi";

export default function CTASection() {
  return (
    <section className="bg-dark">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary-light">
              <PiBriefcaseLight size={22} />
            </span>
            <div>
              <p className="text-white font-semibold">Work With Us</p>
              <p className="text-sm text-white/50 mt-1">
                Join our team and build your career with Vedam Homes.
              </p>
            </div>
          </div>
          <button className="shrink-0 rounded-2xl bg-primary px-5 py-2.5 text-xs font-semibold tracking-wide text-white hover:bg-primary-light transition-colors">
            EXPLORE CAREERS
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-white/10 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary-light">
              <PiHandshakeLight size={22} />
            </span>
            <div>
              <p className="text-white font-semibold">Partner With Us</p>
              <p className="text-sm text-white/50 mt-1">
                Let&apos;s grow together for successful real estate ventures.
              </p>
            </div>
          </div>
          <button className="shrink-0 rounded-2xl bg-primary px-5 py-2.5 text-xs font-semibold tracking-wide text-white hover:bg-primary-light transition-colors">
            BECOME PARTNER
          </button>
        </motion.div>
      </div>
    </section>
  );
}
