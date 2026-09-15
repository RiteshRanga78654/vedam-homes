"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function HBarChart({ data = [], max: maxOverride, height = 36 }) {
  const reduced = useReducedMotion();
  const max = maxOverride ?? Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="space-y-4">
      {data.map((d, i) => (
        <div key={d.key || i}>
          <div className="mb-1.5 flex items-baseline justify-between gap-2">
            <span className="truncate text-sm text-ink/75 dark:text-ink/65">{d.label}</span>
            <span className="text-xs font-semibold tabular-nums text-ink">
              {d.value}
              {d.sub && <span className="ml-1 text-ink/50">· {d.sub}</span>}
            </span>
          </div>
          <div
            className="relative overflow-hidden rounded-full bg-ink/[0.07] dark:bg-ink/[0.06]"
            style={{ height }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ backgroundColor: d.color || "#6e5a3c" }}
              initial={reduced ? { width: `${(d.value / max) * 100}%` } : { width: "0%" }}
              whileInView={{ width: `${(d.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}