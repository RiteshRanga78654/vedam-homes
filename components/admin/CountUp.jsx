"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

export default function CountUp({
  value,
  duration = 1.2,
  decimals = 0,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }));
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setDisplay(
          v.toLocaleString("en-IN", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        );
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals, reduced]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {display}
    </span>
  );
}