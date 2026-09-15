"use client";

import { motion } from "framer-motion";
import CountUp from "./CountUp";

const ACCENTS = {
  bronze: "text-accent bg-accent/15 ring-accent/20",
  stone: "text-muted bg-ink/[0.06] ring-ink/10",
  green: "text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 ring-emerald-500/20",
  amber: "text-amber-700 dark:text-amber-300 bg-amber-500/10 ring-amber-500/20",
  sky: "text-sky-700 dark:text-sky-300 bg-sky-600/10 ring-sky-500/20",
  clay: "text-red-600 dark:text-red-300 bg-red-500/10 ring-red-500/20",
};

export default function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent = "bronze",
  index = 0,
}) {
  const tone = ACCENTS[accent] || ACCENTS.bronze;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-2xl border border-ink/[0.09] dark:border-ink/[0.07] bg-surface p-5 shadow-[0_2px_12px_rgba(21,20,15,0.07),0_1px_3px_rgba(21,20,15,0.04)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(21,20,15,0.25)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-[0.08] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.18] bg-accent"
      />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60 dark:text-ink/50">
            {label}
          </p>
          <p className="mt-2.5 font-display text-[2rem] leading-none tracking-tight text-ink">
            <CountUp value={value} />
          </p>
          {sub && (
            <p className="mt-2 truncate text-xs text-ink/55 dark:text-ink/45">{sub}</p>
          )}
        </div>
        {Icon && (
          <span
            className={`mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${tone}`}
          >
            <Icon size={18} strokeWidth={1.75} />
          </span>
        )}
      </div>
    </motion.div>
  );
}