"use client";

import { useState, useRef, useEffect } from "react";

function smoothPath(points, w, h, padX, padY) {
  if (!points.length) return "";
  const plotW = w - padX * 2;
  const plotH = h - padY * 2;
  const max = Math.max(...points.map((p) => p.value), 1);
  const coords = points.map((p, i) => ({
    x: padX + (i / Math.max(points.length - 1, 1)) * plotW,
    y: padY + plotH - (p.value / max) * plotH,
  }));

  let d = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1];
    const curr = coords[i];
    const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
    const cpx2 = curr.x - (curr.x - prev.x) * 0.4;
    d += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export default function AreaChart({
  data = [],
  height = 200,
  emptyNote = "No data recorded yet.",
}) {
  const ref = useRef(null);
  const [width, setWidth] = useState(400);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const padX = 40;
  const padY = 32;
  const max = Math.max(...data.map((d) => d.value), 1);

  if (!data.length) {
    return (
      <div
        ref={ref}
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/10 bg-surface/40 text-center"
        style={{ height }}
      >
        <p className="text-sm text-muted">{emptyNote}</p>
      </div>
    );
  }

  const plotW = width - padX * 2;
  const plotH = height - padY * 2;
  const pathD = smoothPath(data, width, height, padX, padY);
  const areaD = `${pathD} L ${padX + plotW} ${padY + plotH} L ${padX} ${padY + plotH} Z`;

  const coords = data.map((d, i) => ({
    x: padX + (i / Math.max(data.length - 1, 1)) * plotW,
    y: padY + plotH - (d.value / max) * plotH,
  }));

  return (
    <div ref={ref} className="relative w-full">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6e5a3c" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6e5a3c" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((frac) => {
          const y = padY + plotH - plotH * frac;
          return (
            <line
              key={frac}
              x1={padX}
              y1={y}
              x2={padX + plotW}
              y2={y}
              stroke="currentColor"
              className="text-ink/[0.09] dark:text-ink/[0.07]"
              strokeDasharray="4 4"
            />
          );
        })}

        <path d={areaD} fill="url(#area-fill)" />
        <path
          d={pathD}
          fill="none"
          stroke="#6e5a3c"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {coords.map((c, i) => (
          <circle
            key={i}
            cx={c.x}
            cy={c.y}
            r={hovered === i ? 5 : 3}
            fill="#6e5a3c"
            className="transition-all duration-150"
            onMouseEnter={() => setHovered(i)}
          />
        ))}

        {data.map((d, i) => (
          <text
            key={`label-${i}`}
            x={coords[i].x}
            y={height - 4}
            textAnchor="middle"
            className="fill-ink/45 dark:fill-ink/40"
            fontSize={10}
          >
            {d.label}
          </text>
        ))}
      </svg>

      {hovered != null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-ink/15 bg-surface px-2.5 py-1.5 text-xs font-medium shadow-xl"
          style={{
            left: coords[hovered].x,
            top: coords[hovered].y - 10,
          }}
        >
          <span className="text-ink/60">{data[hovered].label}: </span>
          <span className="font-semibold text-ink">{data[hovered].value}</span>
        </div>
      )}
    </div>
  );
}