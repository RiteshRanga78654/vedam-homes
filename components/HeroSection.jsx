"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PiArrowUpRightLight, PiSparkleFill } from "react-icons/pi";

// Configuration matching your assets
const FRAME_COUNT = 140;

// Path mapping for .png
const getFramePath = (index) =>
  `/keyframes/ezgif-frame-${String(index).padStart(3, "0")}.png`;

export default function HeroSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll tracking (Container 350vh for extra smooth playback)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 1. Frame sequence runs from 0% to 80% of scroll
  // (Frames will complete before the text fully locks in)
  const frameIndex = useTransform(smoothProgress, [0, 0.85], [0, FRAME_COUNT - 1]);

  // 2. TEXT DELAY: Text emerges LATE (Between 65% and 92% scroll)
  const contentY = useTransform(smoothProgress, [0.65, 0.92], ["80px", "0px"]);
  const contentOpacity = useTransform(smoothProgress, [0.65, 0.88], [0, 1]);

  // Dark overlay appears along with the text to keep it readable
  const overlayDarkness = useTransform(smoothProgress, [0.55, 0.85], [0.15, 0.75]);

  // Scroll prompt indicator disappears early
  const hintOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  // Preload PNG frames
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Draw image to canvas
  const renderFrame = useCallback(
    (index) => {
      const canvas = canvasRef.current;
      if (!canvas || !images.length) return;

      const ctx = canvas.getContext("2d");
      const targetIndex = Math.min(
        Math.max(Math.round(index), 0),
        FRAME_COUNT - 1
      );
      const img = images[targetIndex];
      if (!img || !img.complete) return;

      const { width, height } = canvas;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    [images]
  );

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const dpr = window.devicePixelRatio || 1;
      canvasRef.current.width = window.innerWidth * dpr;
      canvasRef.current.height = window.innerHeight * dpr;
      renderFrame(frameIndex.get());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame, frameIndex]);

  // Frame update subscription
  useEffect(() => {
    const unsubscribe = frameIndex.on("change", (latest) => {
      requestAnimationFrame(() => renderFrame(latest));
    });

    if (isLoaded) {
      renderFrame(0);
    }

    return () => unsubscribe();
  }, [frameIndex, renderFrame, isLoaded]);

  return (
    <div ref={containerRef} className="relative h-[350vh] w-full bg-[#0a0a0c]">
      {/* Pinned 100vh Screen */}
      <section
        id="top"
        className="sticky top-0 h-[100svh] w-full overflow-hidden text-ivory select-none"
      >
        {/* Keyframe Canvas */}
        <div className="absolute inset-0 h-full w-full">
          <canvas ref={canvasRef} className="h-full w-full object-cover" />
        </div>

        {/* Dynamic Vignette / Dimmer */}
        <motion.div
          style={{ opacity: overlayDarkness }}
          className="absolute inset-0 bg-[#0a0a0c] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c]/80 pointer-events-none" />

        {/* Text / Foreground Content (Appears only after keyframe tour) */}
        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
          }}
          className="relative z-10 flex h-full flex-col justify-between px-6 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:px-12 lg:pb-20"
        >
          {/* Top Strip */}
          <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/50 px-4 py-1.5 backdrop-blur-md">
              <PiSparkleFill className="animate-pulse text-xs text-amber-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/90 sm:text-xs">
                Architectural Studio — Est. 2014
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="mx-auto w-full max-w-[1600px]">
            <div className="max-w-5xl">
              <h1 className="font-display text-[12vw] font-normal leading-[0.92] tracking-tight text-white sm:text-[8vw] lg:text-[6.2vw]">
                Spaces designed
                <br />
                for{" "}
                <span className="italic font-light text-amber-200/90">
                  exceptional
                </span>{" "}
                living.
              </h1>
            </div>

            {/* Bottom Info & CTAs */}
            <div className="mt-8 flex flex-col gap-8 border-t border-white/15 pt-8 sm:mt-12 sm:pt-10 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-md text-sm font-light leading-relaxed text-ivory/70 sm:text-base">
                Curating deliberate, architect-led residences where light,
                material honesty, and effortless modern luxury endure across
                Visakhapatnam.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-charcoal shadow-2xl transition-all duration-500 hover:bg-amber-300 hover:shadow-[0_0_40px_rgba(252,211,77,0.35)]"
                >
                  <span>Explore Properties</span>
                  <PiArrowUpRightLight
                    className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                    size={16}
                  />
                </a>

                <a
                  href="#about"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 font-mono text-xs uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                >
                  <span>The Studio</span>
                  <PiArrowUpRightLight
                    className="text-ivory/60 transition-transform duration-300 group-hover:rotate-45 group-hover:text-white"
                    size={14}
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Initial Scroll Indicator */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-10 z-20 flex flex-col items-center justify-center gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ivory/60">
            Scroll to Explore
          </span>
          <div className="relative h-9 w-[1px] overflow-hidden bg-white/20">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-1/2 w-full bg-amber-400"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}