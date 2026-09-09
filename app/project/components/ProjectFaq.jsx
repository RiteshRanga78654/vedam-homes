"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiPlusLight, PiMinusLight } from "react-icons/pi";
import { faqs } from "@/app/project/data";
import { Reveal, SectionHeading, easeOut } from "./common";

export default function ProjectFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative bg-canvas py-20 text-ink sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Sticky intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrowText="Good to Know"
                title="Questions,"
                accent="answered."
              />
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-md font-light leading-relaxed text-ink/70">
                  From RERA registration to possession timelines — the answers
                  buyers most often ask, in plain language.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-ink/10 border-t border-ink/10">
              {faqs.map((item, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={item.q} delay={i * 0.04}>
                    <div className="group">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="flex w-full items-center justify-between gap-6 py-6 text-left"
                        aria-expanded={isOpen}
                      >
                        <span
                          className={`font-display text-lg font-light leading-snug transition-colors duration-300 sm:text-xl ${
                            isOpen ? "text-[#c6a15b]" : "text-ink group-hover:text-[#c6a15b]"
                          }`}
                        >
                          {item.q}
                        </span>
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                            isOpen
                              ? "border-[#c6a15b] bg-[#c6a15b] text-[#0a221b]"
                              : "border-ink/15 bg-surface-2 text-ink group-hover:border-[#c6a15b]/50"
                          }`}
                        >
                          {isOpen ? <PiMinusLight size={16} /> : <PiPlusLight size={16} />}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: easeOut }}
                            className="overflow-hidden"
                          >
                            <p className="pb-6 pr-6 text-sm font-light leading-[1.85] text-ink/65 sm:pr-16">
                              {item.a}
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