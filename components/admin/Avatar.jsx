"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2 } from "lucide-react";

const AVATAR_COLORS = [
  "bg-[#6e5a3c]",
  "bg-[#42574b]",
  "bg-[#8a6d43]",
  "bg-[#4a5a6e]",
  "bg-[#7a5b52]",
];

function initials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function colorFor(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

export default function Avatar({ name, src, size = 40, className = "" }) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;
  const cls = `relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full font-display font-medium text-ivory ${colorFor(
    name
  )} ${className}`;

  return (
    <span
      className={cls}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
      aria-label={name}
    >
      {showImage ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes={`${size}px`}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : name ? (
        initials(name)
      ) : (
        <Building2 size={size * 0.5} />
      )}
    </span>
  );
}