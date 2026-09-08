"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  PiDownloadSimpleLight,
  PiCheckLight,
  PiCalendarBlankLight,
  PiPhoneLight,
} from "react-icons/pi";
import { contact } from "@/app/project/data";
import { Reveal } from "./common";

const inputClass =
  "w-full rounded-xl border border-[#0d2b22]/15 bg-[#f4efe3] px-5 py-3.5 text-sm font-light text-[#0d2b22] placeholder:text-[#0d2b22]/40 outline-none transition-colors duration-300 focus:border-[#c6a15b]";

export default function ProjectFinalCta() {
  const [mode, setMode] = useState("visit"); // "visit" | "callback"
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#f4efe3] py-24 text-[#0d2b22] sm:py-32">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Invite copy + brochure CTA */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#c6a15b]">
                <span className="h-px w-8 bg-current" />
                The Next Step
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-4xl font-light leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
                Begin the visit.
                <br />
                <span className="italic text-[#c6a15b]">See the valley first.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md font-light leading-[1.85] text-[#0d2b22]/70">
                A private tour of the ready phases, price discovery against your
                floor of interest, and a RERA-checked paperwork walkthrough —
                all without obligation.
              </p>
            </Reveal>

            {/* Cinema card for brochure */}
            <Reveal delay={0.24} y={36}>
              <div className="relative mt-10 max-w-md overflow-hidden rounded-[22px] border border-[#0d2b22]/10">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/flower-valley/flower3.png"
                    alt="Central Park Flower Valley brochure"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    quality={86}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a221b]/85 via-[#0a221b]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#dcbd85]">
                        The Brochure
                      </p>
                      <p className="mt-1 font-display text-xl font-light text-[#f4efe3]">
                        RERA-checked project brochure
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => document.getElementById("form").scrollIntoView({ behavior: "smooth" })}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c6a15b] text-[#0a221b] transition-transform duration-500 hover:scale-110"
                      aria-label="Request the brochure"
                    >
                      <PiDownloadSimpleLight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 space-y-3">
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="group inline-flex items-center gap-3 font-display text-2xl font-light text-[#0d2b22] transition-colors duration-300 hover:text-[#c6a15b]"
                >
                  <PiPhoneLight size={22} className="text-[#c6a15b]" />
                  {contact.phone}
                </a>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0d2b22]/45">
                  {contact.email} · {contact.address}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal y={40}>
              <div
                id="form"
                className="relative rounded-[28px] border border-[#0d2b22]/10 bg-[#e7e0cf] p-7 shadow-[0_40px_80px_-28px_rgba(10,34,27,0.3)] sm:p-10"
              >
                {/* Mode toggle */}
                <div className="inline-flex w-full rounded-full border border-[#0d2b22]/12 bg-[#f4efe3] p-1 sm:w-auto">
                  {[
                    { id: "visit", label: "Schedule a Visit", icon: PiCalendarBlankLight },
                    { id: "callback", label: "Request Callback", icon: PiPhoneLight },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setMode(m.id);
                          setSent(false);
                        }}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 sm:flex-none ${
                          mode === m.id
                            ? "bg-[#0d2b22] text-[#f4efe3]"
                            : "text-[#0d2b22]/55 hover:text-[#0d2b22]"
                        }`}
                      >
                        <Icon size={15} />
                        {m.label}
                      </button>
                    );
                  })}
                </div>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#c6a15b] text-[#0a221b]">
                      <PiCheckLight size={30} />
                    </span>
                    <p className="mt-6 font-display text-3xl font-light text-[#0d2b22]">
                      Thank you — we&rsquo;ll be in touch.
                    </p>
                    <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-[#0d2b22]/60">
                      Your enquiry is with our sales desk. Expect a call within
                      business hours to confirm your visit
                      {mode === "visit" ? " slot" : " time"}.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} className="mt-8">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-[#0d2b22]/60">
                          Full Name
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
                        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-[#0d2b22]/60">
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
                      <label className="block">
                        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-[#0d2b22]/60">
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
                        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-[#0d2b22]/60">
                          Preferred Visit Date
                        </span>
                        <input
                          type="date"
                          name="date"
                          className={`${inputClass} [&::-webkit-calendar-picker-indicator]:opacity-50`}
                        />
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-[#0d2b22]/60">
                          Message
                        </span>
                        <textarea
                          name="message"
                          rows={3}
                          placeholder={
                            mode === "visit"
                              ? "Which typology are you interested in?"
                              : "Best time for the sales desk to reach you?"
                          }
                          className={`${inputClass} resize-none`}
                        />
                      </label>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-3 rounded-full bg-[#0d2b22] px-9 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#f4efe3] transition-colors duration-500 hover:bg-[#c6a15b] hover:text-[#0a221b]"
                      >
                        {mode === "visit" ? "Confirm My Visit" : "Request Callback"}
                        <span className="transition-transform duration-500 group-hover:translate-x-1">
                          →
                        </span>
                      </button>
                      <p className="max-w-[240px] font-mono text-[9px] leading-relaxed tracking-[0.14em] text-[#0d2b22]/45">
                        No spam. Your details are used only to arrange this
                        visit.
                      </p>
                    </div>
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