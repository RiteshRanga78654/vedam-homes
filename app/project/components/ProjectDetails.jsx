"use client";

import { facts, project } from "@/app/project/data";
import { Reveal } from "./common";

export default function ProjectDetails() {
  return (
    <section id="details" className="relative overflow-hidden bg-[#0d2b22] py-24 text-[#f4efe3] sm:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#c6a15b]/10 blur-[140px] ambient-orb" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Heading column */}
          <div className="lg:col-span-4">
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#c6a15b]">
                <span className="h-px w-8 bg-current" />
                The Facts
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-4xl font-light leading-[1.06] tracking-tight sm:text-5xl">
                A residence, <span className="italic text-[#dcbd85]">considered.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-sm font-light leading-relaxed text-[#f4efe3]/65">
                Every detail below is drawn from the project record — location,
                developer, configuration, status and RERA registration.
              </p>
            </Reveal>
          </div>

          {/* Data ledger — editorial table, not dashboard cards */}
          <div className="lg:col-span-8">
            <Reveal>
              <dl className="divide-y divide-[#f4efe3]/12 border-t border-b border-[#f4efe3]/12">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="group grid grid-cols-1 gap-1 py-5 transition-colors duration-300 sm:grid-cols-12 sm:gap-6 sm:items-baseline"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#dcbd85]/80 sm:col-span-4">
                      {fact.label}
                    </dt>
                    <dd className="font-display text-xl font-light text-[#f4efe3] sm:col-span-8 sm:text-2xl">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* RERA ledger */}
            <Reveal delay={0.1}>
              <div className="mt-10 rounded-2xl border border-[#c6a15b]/25 bg-[#c6a15b]/5 p-6">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c6a15b]" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#dcbd85]">
                    RERA Registration
                  </p>
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {project.rera.map((r) => (
                    <li
                      key={r}
                      className="font-mono text-xs tracking-wide text-[#f4efe3]/75"
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}