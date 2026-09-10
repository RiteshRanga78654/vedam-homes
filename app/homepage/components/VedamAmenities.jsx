"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";

export const amenities = [
  {
    id: "arrival",
    title: "Arrival Lounge",
    desc: "A grand double-height lobby where the city fades and home begins.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    id: "pool",
    title: "Infinity Pool",
    desc: "An edgeless deck that appears to meet the skyline with panoramic horizon views.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80",
  },
  {
    id: "clubhouse",
    title: "Clubhouse & Lounge",
    desc: "A curated private social club designed for quiet evenings and community gatherings.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  },
  {
    id: "garden",
    title: "Landscaped Gardens",
    desc: "Native flora walkways planned and maintained with therapeutic seasonal flora.",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
  },
];

export default function VedamAmenities() {
  const containerRef = useRef(null);
  const circleRefs = useRef([]);
  const [pathD, setPathD] = useState("");
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  const recalculatePath = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const points = [];

    circleRefs.current.forEach((el) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        points.push({
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        });
      }
    });

    if (points.length < 2) return;

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const pCurrent = points[i];
      const pNext = points[i + 1];
      const midY = (pCurrent.y + pNext.y) / 2;
      d += ` C ${pCurrent.x} ${midY}, ${pNext.x} ${midY}, ${pNext.x} ${pNext.y}`;
    }

    setPathD(d);
    setSvgSize({
      w: containerRect.width,
      h: containerRect.height,
    });
  };

  useEffect(() => {
    recalculatePath();
    window.addEventListener("resize", recalculatePath);
    return () => window.removeEventListener("resize", recalculatePath);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section className="relative w-full bg-[#0d0f12] py-24 text-[#eae6df] overflow-hidden">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 mb-20 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#cbb387] mb-3 block font-mono">
          The Journey
        </span>
        <h2 className="text-4xl sm:text-6xl font-light tracking-tight">
          Every amenity, <span className="italic font-serif text-[#cbb387]">one path</span>
        </h2>
      </div>

      {/* Main Flow Container */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto px-6">
        {pathD && (
          <svg
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
            viewBox={`0 0 ${svgSize.w} ${svgSize.h}`}
            fill="none"
          >
            <path
              d={pathD}
              stroke="#2c3038"
              strokeWidth={2.5}
              strokeDasharray="8 8"
              strokeLinecap="round"
            />
            <motion.path
              d={pathD}
              stroke="#cbb387"
              strokeWidth={3}
              strokeLinecap="round"
              style={{
                pathLength: smoothProgress,
              }}
            />
          </svg>
        )}

        {/* Rows (Alternating Layout) */}
        <div className="relative z-10 flex flex-col gap-28 md:gap-36">
          {amenities.map((item, index) => {
            const isImageLeft = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-14 ${
                  isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Circle Image Container */}
                <div
                  ref={(el) => {
                    circleRefs.current[index] = el;
                  }}
                  className="relative shrink-0"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative h-48 w-48 sm:h-64 sm:w-64 rounded-full p-2 border-2 border-[#cbb387]/40 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#14171d]"
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 192px, 256px"
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Rounded Rectangle Text Card */}
                <motion.div
                  initial={{ opacity: 0, x: isImageLeft ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-1/2"
                >
                  <div className="relative rounded-3xl border border-white/10 bg-[#161a22]/80 p-8 md:p-10 backdrop-blur-xl shadow-xl">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#cbb387] mb-3 block">
                      0{index + 1} &mdash; Feature
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#a0a5b1] text-base leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}