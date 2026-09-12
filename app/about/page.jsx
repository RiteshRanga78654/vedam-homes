"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/homepage/components/Header";
import Footer from "@/app/homepage/components/Footer";
import SmoothScroll from "@/app/homepage/components/SmoothScroll";
import Reveal from "@/app/homepage/components/Reveal";
import {
  PiPlusLight,
  PiMinusLight,
  PiSealCheckFill,
  PiSparkleFill,
  PiArrowUpRightLight,
} from "react-icons/pi";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const faqData = [
  {
    question: "Who is the founder of Vedam Homes?",
    answer:
      "Vedam Homes was founded by CA Raman Singla, whose vision was to create thoughtfully designed luxury residences that combine elegance, comfort, and long-term value. His philosophy focuses on creating homes that bring harmony, balance, and modern living together.",
  },
  {
    question: "What makes Vedam Homes different from other real estate developers in Gurgaon?",
    answer:
      "Vedam Homes stands out for its focus on limited-edition luxury floors, refined architecture, and thoughtfully planned living spaces. The company emphasizes quality construction, premium materials, and modern design to deliver luxury homes in Gurgaon that offer both comfort and exclusivity.",
  },
  {
    question: "Where are Vedam Homes luxury properties located in Gurgaon?",
    answer:
      "Vedam Homes luxury residences are located in prime areas such as Central Park Flower Valley in South of Gurugram. These locations offer excellent connectivity, peaceful surroundings, and access to modern infrastructure, making them ideal for luxury living and real estate investment.",
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-canvas text-ink transition-colors duration-500">
        <Navbar />

        {/* ── HERO ── */}
        <section className="relative pt-28 pb-0 overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[80vh]">
              {/* Left: Text */}
              <div className="relative z-10 py-16 lg:py-0">
                <Reveal>
                  <span className="eyebrow text-muted font-mono text-xs uppercase tracking-[0.35em] block mb-4">
                    The Vision Behind Vedam Homes
                  </span>
                </Reveal>

                <Reveal delay={0.08}>
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5vw] leading-[1.08] tracking-tight font-normal text-ink">
                    Where timeless wisdom meets{" "}
                    <span className="italic font-light text-ink/60">
                      thoughtful living.
                    </span>
                  </h1>
                </Reveal>

                <Reveal delay={0.16}>
                  <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink/70 font-light lg:text-base">
                    When I founded Vedam Homes, I envisioned a name that would
                    represent more than just construction — it would embody a
                    deeper spiritual heritage and timeless wisdom. This philosophy
                    guides every space we create, ensuring that each home reflects
                    harmony, balance, and refined living.
                  </p>
                </Reveal>

                <Reveal delay={0.24}>
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2.5">
                      <PiSealCheckFill className="text-accent text-lg" />
                      <span className="font-mono text-xs uppercase tracking-widest text-ink">
                        Legacy of Trust
                      </span>
                    </div>
                    <div className="h-3 w-px bg-border/20 hidden sm:block" />
                    <div className="flex items-center gap-2.5">
                      <PiSparkleFill className="text-accent text-sm" />
                      <span className="font-mono text-xs uppercase tracking-widest text-ink">
                        Crafted with Purpose
                      </span>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right: Image */}
              <Reveal delay={0.1} className="relative z-10">
                <div className="relative aspect-[4/5] w-full max-w-[520px] ml-auto overflow-hidden rounded-[28px] border border-border/10 shadow-[0_20px_60px_-25px_rgba(21,20,15,0.12)]">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                    alt="Vedam Homes luxury residence"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-accent-soft">
                      Est. 2014
                    </span>
                    <p className="font-display text-xl font-light mt-1">
                      CA Raman Singla
                    </p>
                    <p className="text-xs text-white/60 mt-0.5">
                      Founder &amp; Visionary
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── RIG VEDA QUOTE ── */}
        <section className="py-20 bg-surface transition-colors duration-500">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <Reveal>
              <div className="relative inline-block mb-8">
                <div className="h-px w-16 bg-accent/50 mx-auto" />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-light leading-relaxed text-ink/85 italic tracking-tight">
                &ldquo;O great house builder, impart this satisfaction to us that
                thou art a giver of an abode free from diseases. Let thee bring
                happiness to our bipeds and quadrupeds.&rdquo;
              </blockquote>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-muted">
                — Rig Veda
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 h-px w-16 bg-accent/50 mx-auto" />
            </Reveal>
          </div>
        </section>

        {/* ── FOUNDER STORY ── */}
        <section className="py-24 bg-canvas transition-colors duration-500">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
              {/* Left: Content */}
              <div className="lg:col-span-7">
                <Reveal>
                  <span className="eyebrow text-muted font-mono text-xs uppercase tracking-[0.35em] block mb-4">
                    The Founder&apos;s Philosophy
                  </span>
                </Reveal>

                <Reveal delay={0.08}>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-[3vw] leading-[1.1] tracking-tight font-normal text-ink mb-8">
                    A name rooted in heritage,{" "}
                    <span className="italic font-light text-ink/60">
                      built on vision.
                    </span>
                  </h2>
                </Reveal>

                <Reveal delay={0.14}>
                  <div className="space-y-5 max-w-2xl text-[15px] leading-relaxed text-ink/70 font-light lg:text-base">
                    <p>
                      While &ldquo;Vedam&rdquo; is commonly linked with learning
                      and enlightenment, my aspiration goes beyond the
                      conventional. In ancient times, the Rig Veda was closely
                      associated with builders and construction, emphasizing
                      harmony, balance, and prosperity.
                    </p>
                    <p>
                      Vedam Homes isn&apos;t just about luxury — it is about
                      creating a lifestyle of elegance, convenience, and pure
                      bliss. As a distinguished name in real estate in Gurugram,
                      every space we create is thoughtfully curated to elevate
                      everyday living, blending refined design with comfort,
                      functionality, and timeless appeal.
                    </p>
                    <p>
                      Driven by inspiration and commitment, I vow to continuously
                      raise our standards and deliver more than just houses — a
                      legacy of trust, comfort, and happiness. This journey is
                      only the beginning. I remain dedicated to ensuring that
                      every home we create becomes a place where happiness,
                      health, and prosperity truly flourish.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="mt-10 border-t border-border/10 pt-8">
                    <p className="font-display text-lg text-ink font-light italic">
                      With Gratitude,
                    </p>
                    <p className="font-display text-2xl text-ink font-normal mt-1">
                      CA Raman Singla
                    </p>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted mt-1">
                      Founder, Vedam Homes
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Right: Visual Card Stack */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <Reveal delay={0.12}>
                  <div className="relative aspect-[3/4] w-full max-w-[440px] ml-auto overflow-hidden rounded-[28px] border border-border/10 shadow-[0_20px_50px_rgba(21,20,15,0.08)]">
                    <img
                      src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
                      alt="Vedam Homes design philosophy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-x-5 bottom-5 text-white">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-accent-soft">
                        Design Philosophy
                      </span>
                      <p className="font-display text-lg font-light mt-1">
                        Harmony, Balance &amp; Prosperity
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="rounded-3xl border border-border/10 bg-surface/80 p-8 backdrop-blur-xl">
                    <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4 block">
                      Our Promise
                    </span>
                    <p className="text-ink/70 text-[15px] leading-relaxed font-light">
                      Vedam Homes began as a vision to transform prime sites into
                      extraordinary residences. A decade on, we remain a studio
                      first and a developer second — every residence starts as a
                      deep study of natural light, airflow, and honest
                      materiality.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT VEDAM HOMES ── */}
        <section className="py-24 bg-surface transition-colors duration-500">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Reveal>
                <span className="eyebrow text-muted font-mono text-xs uppercase tracking-[0.35em] block mb-4">
                  Know About Us
                </span>
              </Reveal>

              <Reveal delay={0.08}>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[3vw] leading-[1.1] tracking-tight font-normal text-ink">
                  Where luxury meets{" "}
                  <span className="italic font-light text-ink/60">
                    thoughtful living.
                  </span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-[15px] leading-relaxed text-ink/70 font-light lg:text-base">
                  Welcome to Vedam Homes — a collection of limited-edition
                  residences where luxury meets thoughtful living. Vedam Homes is
                  a luxury real estate developer based in Gurugram, specializing
                  in ultra-luxury floors and residences that seamlessly blend
                  exquisite design with practical living. Each of our super luxury
                  residences is meticulously crafted with exceptional attention to
                  detail, ensuring every corner reflects elegance, comfort, and
                  sophistication. Renowned for offering some of the most
                  sought-after luxury floors in South of Gurugram, we believe in
                  building not just homes, but trust and lasting value. With a
                  limited and exclusive inventory, Vedam Homes delivers unmatched
                  privacy and a true sense of belonging for discerning homeowners.
                </p>
              </div>
            </Reveal>

            {/* Value Props */}
            <Reveal delay={0.16}>
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  {
                    icon: PiSealCheckFill,
                    title: "Limited Edition",
                    desc: "Exclusive inventory ensuring privacy and a true sense of belonging.",
                  },
                  {
                    icon: PiSparkleFill,
                    title: "Meticulously Crafted",
                    desc: "Exceptional attention to detail in every corner of every residence.",
                  },
                  {
                    icon: PiArrowUpRightLight,
                    title: "Lasting Value",
                    desc: "Building trust and enduring value through quality and design excellence.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group rounded-3xl border border-border/10 bg-surface-2/80 p-8 text-center transition-all duration-500 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(21,20,15,0.06)]"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent mb-5 text-xl transition-transform duration-300 group-hover:scale-110">
                      <item.icon />
                    </div>
                    <h3 className="font-display text-lg font-medium text-ink mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ink/60 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 bg-canvas transition-colors duration-500">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <Reveal>
                <span className="eyebrow text-muted font-mono text-xs uppercase tracking-[0.35em] block mb-4">
                  Frequently Asked Questions
                </span>
              </Reveal>

              <Reveal delay={0.08}>
                <h2 className="font-display text-3xl sm:text-4xl tracking-tight font-normal text-ink">
                  Answers to{" "}
                  <span className="italic font-light text-ink/60">
                    common questions.
                  </span>
                </h2>
              </Reveal>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="rounded-2xl border border-border/10 bg-surface/80 overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-accent/30">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-8 py-6 text-left cursor-pointer"
                    >
                      <span className="font-display text-lg font-medium text-ink pr-4">
                        {faq.question}
                      </span>
                      <span className="shrink-0 text-accent text-xl">
                        {openFaq === i ? (
                          <PiMinusLight size={20} />
                        ) : (
                          <PiPlusLight size={20} />
                        )}
                      </span>
                    </button>

                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-8 pb-6 border-t border-border/10 pt-5">
                            <p className="text-[15px] leading-relaxed text-ink/65 font-light">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
