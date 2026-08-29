"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time capability detection, not a render loop
    setEnabled(true);
    document.body.classList.add("cursor-ready");

    let x = 0, y = 0, rx = 0, ry = 0;
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    let raf;
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);

    const onOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      setLabel(target ? target.getAttribute("data-cursor") : "");
    };
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove("cursor-ready");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-charcoal mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-charcoal/50 mix-blend-difference transition-[width,height] duration-300 ease-out"
        style={{
          width: label ? 76 : 34,
          height: label ? 76 : 34,
          willChange: "transform",
        }}
      >
        {label && (
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-charcoal">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
