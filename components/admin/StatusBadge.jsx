"use client";

import { BADGE_TONES, STATUS_TONE } from "./ui";

export default function StatusBadge({ value, tone, className = "" }) {
  const resolved = tone || STATUS_TONE[value] || "neutral";
  const palette = BADGE_TONES[resolved] || BADGE_TONES.neutral;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none tracking-wide ${palette} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {value}
    </span>
  );
}