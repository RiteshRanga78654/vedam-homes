"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { 
  PiArrowsOutCardinalLight, 
  PiSparkleFill, 
  PiScanLight, 
  PiCrosshairLight 
} from "react-icons/pi";
import Reveal from "@/components/Reveal";

const HOTSPOTS = [
  {
    id: "facade",
    x: "28%",
    y: "38%",
    title: "Double-Glazed Louvers",
    spec: "Thermal Acoustic Spec RW42",
  },
  {
    id: "cantilever",
    x: "68%",
    y: "26%",
    title: "Cantilever Balconies",
    spec: "Post-Tensioned Reinforced Slab",
  },
  {
    id: "podium",
    x: "52%",
    y: "74%",
    title: "Basalt Cladding",
    spec: "Honed Monolithic Masonry",
  },
];

export default function InteractiveVisual() {
  const ref = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Normalized cursor coordinates (-0.5 to 0.5)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Pixel cursor tracking for specular ambient lighting
  const pixelX = useMotionValue(0);
  const pixelY = useMotionValue(0);

  // Smooth springs for 3D perspective
  const springConfig = { stiffness: 140, damping: 20, mass: 0.8 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), springConfig);

  // Layered parallax translation offsets
  const layerHotspots = useSpring(useTransform(mx, [-0.5, 0.5], [-35, 35]), springConfig);
  const layerForeground = useSpring(useTransform(mx, [-0.5, 0.5], [-48, 48]), springConfig);

  const specularGlow = useMotionTemplate`radial-gradient(650px circle at ${pixelX}px ${pixelY}px, rgba(255, 255, 255, 0.12), transparent 75%)`;

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const clientRelX = e.clientX - rect.left;
    const clientRelY = e.clientY - rect.top;

    mx.set(clientRelX / rect.width - 0.5);
    my.set(clientRelY / rect.height - 0.5);
    pixelX.set(clientRelX);
    pixelY.set(clientRelY);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
    setActiveHotspot(null);
  }

  return (
    <section className="relative overflow-hidden bg-[#0a0a0c] py-28 text-ivory selection:bg-amber-300 selection:text-charcoal lg:py-40">
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-amber-600/10 blur-[100px] ambient-orb" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-stone-500/10 blur-[100px] ambient-orb" />

      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-16 border-b border-white/10 pb-12">
          <Reveal y={30}>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="eyebrow text-amber-200/80 font-mono text-xs uppercase tracking-[0.35em]">
                Interactive Blueprint
              </span>
            </div>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl max-w-2xl">
              Spatial depth,{" "}
              <span className="italic font-light text-white/60">rendered in real time.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15} y={30}>
            <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 backdrop-blur-md">
              <PiArrowsOutCardinalLight className="text-amber-300 animate-spin" style={{ animationDuration: "12s" }} size={18} />
              <span className="font-mono text-xs uppercase tracking-widest text-ivory/70">
                Hover cursor to tilt & inspect
              </span>
            </div>
          </Reveal>
        </div>

        {/* 3D Interactive Viewport Canvas */}
        <div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ perspective: 1600 }}
          className="group relative aspect-[4/3] w-full overflow-hidden rounded-[32px] border border-white/15 bg-[#121316] shadow-[0_30px_100px_rgba(0,0,0,0.8)] sm:aspect-[16/10] lg:aspect-[21/9]"
        >
          {/* Top Canvas Toolbar */}
          <div className="pointer-events-none absolute inset-x-6 top-6 z-30 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ivory/50">
            <div className="flex items-center gap-2">
              <PiScanLight className="text-amber-300" size={14} />
              <span>Orthographic View 3D</span>
            </div>
            <span className="hidden sm:block">Elevation C</span>
          </div>

          <motion.div
            style={{ rotateX, rotateY }}
            className="relative h-full w-full will-change-transform [transform-style:preserve-3d]"
          >
            {/* Base Layer: Photo Plate (Z = 0px) */}
            <div className="absolute inset-0 h-full w-full [transform:translateZ(0px)]">
              <img
                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2000&auto=format&fit=crop"
                alt="Architectural elevation of a Vedam Homes tower"
                className="h-full w-full object-cover filter brightness-[0.82] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Specular Interactive Cursor Glow Layer (Z = 20px) */}
            <motion.div
              style={{ background: specularGlow }}
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [transform:translateZ(20px)]"
            />

            {/* Middle Gradient Vignette (Z = 35px) */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/90 via-[#0a0a0c]/25 to-[#0a0a0c]/30 [transform:translateZ(35px)]"
            />

            {/* Interactive Architectural Hotspot Nodes (Z = 75px) */}
            <motion.div
              style={{ x: layerHotspots }}
              className="absolute inset-0 [transform:translateZ(75px)] pointer-events-auto"
            >
              {HOTSPOTS.map((spot) => (
                <div
                  key={spot.id}
                  style={{ left: spot.x, top: spot.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    onMouseEnter={() => setActiveHotspot(spot)}
                    onMouseLeave={() => setActiveHotspot(null)}
                    onClick={() => setActiveHotspot(spot)}
                    aria-label={`Inspect ${spot.title}`}
                    className="group/spot relative flex h-7 w-7 items-center justify-center focus:outline-none"
                  >
                    <span className="absolute h-full w-full rounded-full bg-amber-400/30 animate-ping" />
                    <span className="relative flex h-4 w-4 items-center justify-center rounded-full border border-white bg-amber-400 text-charcoal shadow-lg">
                      <PiCrosshairLight size={10} className="font-bold" />
                    </span>
                  </button>

                  {/* Hotspot Floating Tooltip Card */}
                  {activeHotspot?.id === spot.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute left-1/2 top-8 z-50 w-52 -translate-x-1/2 rounded-2xl border border-white/20 bg-charcoal/90 p-3.5 backdrop-blur-xl shadow-2xl"
                    >
                      <div className="flex items-center gap-1.5 text-amber-300">
                        <PiSparkleFill size={10} />
                        <span className="font-mono text-[9px] uppercase tracking-widest font-semibold">
                          Material Detail
                        </span>
                      </div>
                      <h4 className="font-display mt-1 text-sm font-light text-white">
                        {spot.title}
                      </h4>
                      <p className="mt-1 font-mono text-[10px] text-ivory/60">
                        {spot.spec}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Foremost Architectural Metadata Banner (Z = 110px) */}
            <motion.div
              style={{ x: layerForeground }}
              className="absolute inset-x-6 bottom-6 flex items-end justify-between text-ivory [transform:translateZ(110px)]"
            >
              <div className="rounded-2xl border border-white/15 bg-black/50 p-5 backdrop-blur-xl">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-300">
                  Elevation — Block C
                </span>
                <h3 className="font-display mt-1 text-2xl font-light text-white sm:text-3xl">
                  Vedam Heights
                </h3>
                <p className="mt-1 font-mono text-xs text-ivory/60">
                  Latitude 17.6868° N, 83.2185° E
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 font-mono text-[11px] text-ivory/70 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Structural Model Synced</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}