"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PiCheckLight,
  PiCalendarBlankLight,
  PiPhoneLight,
} from "react-icons/pi";
import { project, contact } from "@/app/project/data";
import { Reveal } from "./common";

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-sm font-light text-ink placeholder:text-ink/40 outline-none transition-colors duration-300 focus:border-[#c6a15b] dark:bg-surface-2";

export default function ProjectEnquiry() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="enquiry" className="relative overflow-hidden bg-canvas py-20 text-ink sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Invite copy */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#c6a15b]">
                <span className="h-px w-8 bg-current" />
                Site Visit
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-3xl font-light leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                Begin the visit.
                <br />
                <span className="italic text-[#c6a15b]">See the valley first.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-md font-light leading-[1.8] text-ink/70">
                A private tour of the ready phases and a RERA-checked
                walkthrough — arranged by our {project.marketedBy.split("—")[0].trim()} sales desk, without obligation.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 space-y-3">
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="group inline-flex items-center gap-3 font-display text-xl font-light text-ink transition-colors duration-300 hover:text-[#c6a15b] sm:text-2xl"
                >
                  <PiPhoneLight size={20} className="text-[#c6a15b]" />
                  {contact.phone}
                </a>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
                  {contact.email} · {project.locationShort}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Compact enquiry card */}
          <div className="lg:col-span-7">
            <Reveal y={36}>
              <div className="relative mx-auto max-w-xl rounded-[24px] border border-ink/10 bg-surface-2 p-7 shadow-[0_40px_80px_-28px_rgba(10,34,27,0.3)] sm:p-9">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-14 text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c6a15b] text-[#0a221b]">
                      <PiCheckLight size={26} />
                    </span>
                    <p className="mt-5 font-display text-2xl font-light text-ink">
                      Thank you — we&rsquo;ll be in touch.
                    </p>
                    <p className="mt-2 max-w-sm text-sm font-light leading-relaxed text-ink/60">
                      Your enquiry is with our sales desk. Expect a call within
                      business hours to confirm your visit slot.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.24em] text-ink/60">
                          Name
                        </span>
                        <input
                          required
                          type="text"
                          name="name"
                          placeholder="Your full name"
                          className={inputClass}
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.24em] text-ink/60">
                          Phone
                        </span>
                        <input
                          required
                          type="tel"
                          name="phone"
                          placeholder="+91 00000 00000"
                          className={inputClass}
                        />
                      </label>
                    </div>
                    <label className="block">
                      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.24em] text-ink/60">
                        Email
                      </span>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        className={inputClass}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.24em] text-ink/60">
                        Message
                      </span>
                      <textarea
                        name="message"
                        rows={2}
                        placeholder="Which typology are you interested in?"
                        className={`${inputClass} resize-none`}
                      />
                    </label>

                    <button
                      type="submit"
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#0d2b22] px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#f4efe3] transition-all duration-500 hover:bg-[#c6a15b] hover:text-[#0a221b] hover:shadow-[0_16px_40px_-12px_rgba(198,161,91,0.55)]"
                    >
                      <PiCalendarBlankLight size={15} />
                      Schedule a Visit
                      <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </button>

                    <p className="text-center font-mono text-[9px] leading-relaxed tracking-[0.14em] text-ink/45">
                      No spam. Your details are used only to arrange this visit.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}