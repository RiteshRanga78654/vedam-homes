"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiPlusLight } from "react-icons/pi";
import { faqs } from "@/app/project/data";
import { Reveal, SectionHeading } from "./common";

export default function ProjectFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative bg-[#0d2b22] py-24 text-[#f4efe3] sm:py-32">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              dark
              eyebrowText="Questions"
              title="Asked often,"
              accent="answered plainly."
            />
            <Reveal delay={0.18}>
              <p className="mt-8 max-w-md font-light leading-relaxed text-[#f4efe3]/60">
                Everything below is drawn from the verified project record. For
                unit-specific numbers, speak with our sales desk.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-[#f4efe3]/12 border-t border-[#f4efe3]/12">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={f.q} delay={i * 0.04}>
                    <div>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="flex w-full items-center justify-between gap-6 py-6 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono text-[10px] tracking-[0.2em] text-[#c6a15b]">
                            Q{i + 1}
                          </span>
                          <span className="font-display text-xl font-light text-[#f4efe3] sm:text-2xl">
                            {f.q}
                          </span>
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="shrink-0 text-[#c6a15b]"
                        >
                          <PiPlusLight size={22} />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pb-7 pl-9 pr-6 text-sm font-light leading-[1.85] text-[#f4efe3]/70">
                              {f.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}