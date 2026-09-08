"use client";

import { useEffect, useMemo, useState } from "react";
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";
import { navItems, project } from "@/app/project/data";

export default function ProjectNav() {
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("overview");

  // Show the bar only after the hero has passed
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy — which section is in view right now
  const sectionIds = useMemo(() => navItems.map((i) => i.id), []);
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (inView[0]) setActive(inView[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [sectionIds]);

  const go = (id) => {
    const lenisTarget = id === "contact" ? "#contact" : `#${id}`;
    if (lenis) {
      lenis.scrollTo(lenisTarget, { offset: -90, duration: 1.4 });
    } else {
      document.querySelector(lenisTarget)?.scrollIntoView({ behavior: "smooth" });
    }
    setActive(id);
  };

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={
        visible
          ? { y: 0, opacity: 1 }
          : { y: -70, opacity: 0 }
      }
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
      aria-label="Project sections"
    >
      {/* Floating glass bar */}
      <div className="mx-auto mt-4 flex max-w-[1400px] items-center justify-between gap-4 overflow-x-auto rounded-full border border-[#0a221b]/10 bg-[#f4efe3]/85 px-2 py-2 shadow-[0_16px_50px_-20px_rgba(10,34,27,0.45)] backdrop-blur-xl">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            if (lenis) lenis.scrollTo(0, { duration: 1.2 });
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="hidden shrink-0 items-center gap-2 pl-3 pr-2 lg:flex"
        >
          <span className="h-2 w-2 rounded-full bg-[#c6a15b]" />
          <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.24em] text-[#0d2b22]/80">
            {project.name}
          </span>
        </a>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                active === item.id
                  ? "bg-[#0d2b22] text-[#f4efe3]"
                  : "text-[#0d2b22]/55 hover:text-[#0d2b22]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go("contact")}
          className="mr-1 hidden shrink-0 whitespace-nowrap rounded-full bg-[#c6a15b] px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0a221b] transition-colors duration-300 hover:bg-[#dcbd85] md:block"
        >
          Contact
        </button>
      </div>
    </motion.nav>
  );
}