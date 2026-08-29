"use client";

import { motion } from "framer-motion";

export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  y = 28,
  duration = 0.8,
  className = "",
  once = true,
  amount = 0.25,
  ...rest
}) {
  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
