"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { testimonials, contact } from "@/app/project/data";
import { Reveal, SectionHeading } from "./common";
import { PiCaretLeftLight, PiCaretRightLight, PiArrowUpRightLight, PiPhoneLight } from "react-icons/pi";

export default function ProjectTestimonials() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length),
    []
  );

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#f4efe3] py-24 text-[#0d2b22] sm:py-32">
      <div className="pointer-events-none absolute -right-24 top-10 font-display text-[24rem] font-light leading-none text-[#0d2b22]/4">
        &rdquo;
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrowText="The Owners"
              title="Quiet words"
              accent="from Vedam owners."
            />
            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-4">
                {testimonials.map((t, i) => (
                  <li key={t.name}>
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      className={`font-mono text-[10px] uppercase tracking-[0.26em] transition-colors duration-300 ${
                        i === index ? "text-[#c6a15b]" : "text-[#0d2b22]/40 hover:text-[#0d2b22]/70"
                      }`}
                    >
                      0{i + 1} — {t.detail}
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal y={32}>
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="relative py-10 lg:py-2"
              >
                <p className="font-display text-3xl font-light leading-[1.35] text-[#0d2b22] sm:text-4xl lg:text-[2.8rem]">
                  &ldquo;{testimonials[index].quote}&rdquo;
                </p>
                <footer className="mt-8 flex items-center justify-between">
                  <div>
                    <p className="font-display text-xl font-light text-[#0d2b22]">
                      {testimonials[index].name}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#c6a15b]">
                      {testimonials[index].detail}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Previous testimonial"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0d2b22]/20 text-[#0d2b22] transition-colors duration-300 hover:border-[#c6a15b] hover:bg-[#c6a15b] hover:text-[#0a221b]"
                    >
                      <PiCaretLeftLight size={22} />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next testimonial"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0d2b22]/20 text-[#0d2b22] transition-colors duration-300 hover:border-[#c6a15b] hover:bg-[#c6a15b] hover:text-[#0a221b]"
                    >
                      <PiCaretRightLight size={22} />
                    </button>
                  </div>
                </footer>
              </motion.blockquote>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-[#0d2b22]/10 pt-8">
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-3 rounded-full border border-[#0d2b22]/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0d2b22] transition-colors duration-300 hover:border-[#c6a15b] hover:bg-[#c6a15b] hover:text-[#0a221b]"
                >
                  <PiPhoneLight size={15} />
                  {contact.phone}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0d2b22]/60 transition-colors duration-300 hover:text-[#c6a15b]"
                >
                  {contact.email}
                  <PiArrowUpRightLight size={15} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}