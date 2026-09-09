"use client";

import { landmarks, project } from "@/app/project/data";
import { Reveal, SectionHeading } from "./common";
import { PiArrowUpRightLight } from "react-icons/pi";

export default function ProjectLocation() {
  return (
    <section id="location" className="relative bg-canvas py-20 text-ink sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrowText="The Setting"
              title="Where the valley"
              accent="sits in the city."
            />
          </div>
          <Reveal delay={0.18} className="lg:col-span-5">
            <p className="font-light leading-relaxed text-ink/70">
              Fronting the Gurgaon–Sohna Elevated Corridor and folded into the
              Aravalli airshed, the township on this road is distinguished by
              what surrounds it — sovereign green.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Map — real, embeddable, no fabricated coordinates */}
          <Reveal className="lg:col-span-7">
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-[22px] border border-ink/10">
              <iframe
                title="Central Park Flower Valley map — Sector 32–33, Sohna Road, Gurugram"
                src="https://www.google.com/maps?q=Sector%2032%2C%20Sohna%2C%20Gurugram%2C%20Haryana%20122103&z=13&output=embed"
                className="h-full w-full"
                style={{ border: 0, minHeight: "380px", filter: "saturate(0.9) sepia(0.08)" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-ink/10" />
              {/* Address pin card */}
              <div className="absolute left-5 top-5 max-w-[260px] rounded-2xl border border-ink/10 bg-surface-2/90 p-4 shadow-[0_20px_40px_-16px_rgba(10,34,27,0.4)] backdrop-blur">
                <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#c6a15b]">
                  The Address
                </p>
                <p className="mt-1.5 font-display text-lg font-light leading-snug text-ink">
                  Central Park Flower Valley
                </p>
                <p className="mt-1 text-xs font-light text-ink/65">{project.location}</p>
              </div>
            </div>
          </Reveal>

          {/* Landmarks ledger */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col justify-center gap-px">
              {landmarks.map((l, i) => (
                <Reveal key={l.label} delay={i * 0.05}>
                  <div className="group flex items-baseline justify-between gap-6 border-b border-ink/10 py-4 last:border-0">
                    <div className="flex items-start gap-3">
                      <PiArrowUpRightLight
                        size={13}
                        className="mt-1 shrink-0 text-[#c6a15b] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      />
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#c6a15b]">
                          {l.category}
                        </p>
                        <p className="mt-1 font-display text-lg font-light text-ink">
                          {l.label}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                      {l.note}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}