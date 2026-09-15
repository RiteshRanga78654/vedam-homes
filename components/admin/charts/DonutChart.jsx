"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function DonutChart({ data = [], size = 180, thickness = 22, total: totalOverride }) {
  const reduced = useReducedMotion();
  const r = (size - thickness) / 2;
  const circumference = 2 * Math.PI * r;
  const total = totalOverride ?? data.reduce((a, d) => a + d.value, 0);

  let cumulative = 0;
  const segments = data.map((d) => {
    const fraction = total ? d.value / total : 0;
    const dashLen = circumference * fraction;
    const dashGap = circumference - dashLen;
    const offset = circumference * cumulative;
    cumulative += fraction;
    return { ...d, dashLen, dashGap, offset, fraction };
  });

  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {segments.map((seg, i) => (
            <motion.circle
              key={seg.key || i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={seg.color || "#948a76"}
              strokeWidth={thickness}
              strokeDasharray={`${seg.dashLen} ${seg.dashGap}`}
              strokeDashoffset={reduced ? -seg.offset : -seg.offset}
              strokeLinecap="round"
              initial={reduced ? {} : { strokeDasharray: `0 ${circumference}` }}
              whileInView={{ strokeDasharray: `${seg.dashLen} ${seg.dashGap}` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl tracking-tight text-ink">{total}</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted">total</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {segments.map((seg) => (
          <div key={seg.key} className="flex items-center gap-3 text-sm">
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="min-w-[110px] text-ink/75 dark:text-ink/65">{seg.label}</span>
            <span className="font-semibold tabular-nums text-ink">{seg.value}</span>
            <span className="text-xs text-ink/50">
              ({total ? Math.round((seg.value / total) * 100) : 0}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}