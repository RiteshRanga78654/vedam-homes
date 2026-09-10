"use client";

import { project, projectOptions, paymentPlans, keyFeatures } from "@/app/project/data";
import { Reveal } from "./common";

export default function ProjectOverview() {
  return (
    <section id="overview" className="relative bg-[#0d2b22] py-20 text-[#f4efe3] sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Heading + option cards */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#c6a15b]">
                <span className="h-px w-8 bg-current" />
                {project.name}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-3xl font-light leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                Project <span className="font-semibold text-[#c6a15b]">Overview</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-md font-light leading-relaxed text-[#f4efe3]/60">
                Everything below is drawn from the project record &mdash; configuration,
                payment structure and specification, at a glance.
              </p>
            </Reveal>

            {/* Project Options card */}
            <Reveal delay={0.2}>
              <div className="mt-8 rounded-2xl border border-[#f4efe3]/10 bg-[#f4efe3]/[0.03] p-6 sm:p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#c6a15b]">
                  Project Options
                </p>
                <dl className="mt-4 divide-y divide-[#f4efe3]/10">
                  {projectOptions.map((option) => (
                    <div
                      key={option.typology}
                      className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <dt className="font-display text-[15px] font-medium leading-snug text-[#f4efe3]">
                        {option.typology}
                      </dt>
                      <dd className="shrink-0 font-light text-[#f4efe3]/70">
                        {option.size}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            {/* Payment Plans card */}
            <Reveal delay={0.26}>
              <div className="mt-6 rounded-2xl border border-[#f4efe3]/10 bg-[#f4efe3]/[0.03] p-6 sm:p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#c6a15b]">
                  Payment Plans
                </p>
                <div className="mt-4 grid gap-6 sm:grid-cols-2">
                  {paymentPlans.map((plan) => (
                    <div key={plan.name}>
                      <p className="font-display text-[15px] font-medium text-[#f4efe3]">
                        {plan.name}
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {plan.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-baseline gap-2 font-light leading-snug text-[#f4efe3]/70"
                          >
                            <span className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-[#c6a15b]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Key Features ledger */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <h3 className="font-display text-3xl font-light tracking-tight text-[#c6a15b] sm:text-4xl">
                Key Features
              </h3>
            </Reveal>

            <Reveal delay={0.16}>
              <dl className="mt-8 divide-y divide-[#f4efe3]/10 border-t border-[#f4efe3]/10">
                {keyFeatures.map((feature) => (
                  <div
                    key={feature.label}
                    className="group grid grid-cols-1 gap-1 px-1 py-4 transition-colors duration-300 hover:bg-[#c6a15b]/[0.06] sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:px-2"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#c6a15b] sm:col-span-4">
                      {feature.label}
                    </dt>
                    <dd className="font-display text-lg font-light leading-snug text-[#f4efe3] sm:col-span-8 sm:text-right sm:text-xl">
                      {feature.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-6 rounded-2xl border border-[#c6a15b]/25 bg-[#c6a15b]/5 p-5">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c6a15b]" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#dcbd85]">
                    RERA Registered &mdash; Phase-wise
                  </p>
                </div>
                {/* <p className="mt-3 font-mono text-xs leading-relaxed tracking-wide text-[#f4efe3]/60">
                  GGM/624/356/2022/99 &middot; GGM/562/294/2022/37 &middot; GGM/395/127/2020/11 and
                  earlier 2017 phase registries.
                </p> */}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}