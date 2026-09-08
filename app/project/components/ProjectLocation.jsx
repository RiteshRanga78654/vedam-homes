"use client";

import { landmarks, project } from "@/app/project/data";
import { Reveal, SectionHeading } from "./common";

export default function ProjectLocation() {
  return (
    <section id="location" className="relative bg-[#f4efe3] py-24 text-[#0d2b22] sm:py-32">
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
            <p className="font-light leading-relaxed text-[#0d2b22]/65">
              Fronting the Gurgaon–Sohna Elevated Corridor and folded into the
              Aravalli airshed, the township on this road is distinguished by
              what surrounds it — sovereign green.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:mt-20">
          {/* Map — real, embeddable, no fabricated coordinates */}
          <Reveal className="lg:col-span-7">
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-[28px] border border-[#0d2b22]/10">
              <iframe
                title="Central Park Flower Valley map — Sector 32–33, Sohna Road, Gurugram"
                src="https://www.google.com/maps?q=Sector%2032%2C%20Sohna%2C%20Gurugram%2C%20Haryana%20122103&z=13&output=embed"
                className="h-full w-full"
                style={{ border: 0, minHeight: "420px", filter: "saturate(0.9) sepia(0.08)" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-[#0d2b22]/10" />
              {/* Locality pin card */}
              <div className="absolute left-5 top-5 max-w-[240px] rounded-2xl border border-[#0d2b22]/10 bg-[#f4efe3]/90 p-4 shadow-[0_20px_40px_-16px_rgba(10,34,27,0.4)] backdrop-blur">
                <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#c6a15b]">
                  The Address
                </p>
                <p className="mt-1.5 font-display text-lg font-light leading-snug text-[#0d2b22]">
                  Central Park Flower Valley
                </p>
                <p className="mt-1 text-xs font-light text-[#0d2b22]/65">{project.location}</p>
              </div>
            </div>
          </Reveal>

          {/* Landmarks ledger */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col justify-center gap-px">
              {landmarks.map((l, i) => (
                <Reveal key={l.label} delay={i * 0.06}>
                  <div className="group flex items-baseline justify-between gap-6 border-b border-[#0d2b22]/10 py-4 last:border-0">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#c6a15b]">
                        {l.category}
                      </p>
                      <p className="mt-1 font-display text-xl font-light text-[#0d2b22]">
                        {l.label}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-[#0d2b22]/45">
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