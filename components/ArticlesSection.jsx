"use client";

import { motion } from "framer-motion";
import { PiArrowRightLight } from "react-icons/pi";
import articles from "@/data/articles";

export default function ArticlesSection() {
  return (
    <section id="articles" className="bg-background py-8">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-center flex-wrap gap-4 mb-10"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-primary text-center">
              ARTICLES &amp; INSIGHTS
            </p>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl font-semibold text-dark">
              Latest Updates &amp; Insights
            </h2>
          </div>
          
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {articles.map((a) => (
            <motion.a
              key={a.id}
              href="#"
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group block rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-[11px] text-dark/40">{a.date}</p>
                <p className="mt-2 text-sm font-semibold text-dark leading-snug group-hover:text-primary transition-colors">
                  {a.title}
                </p>
                <p className="mt-2 text-xs text-dark/50 leading-relaxed line-clamp-2">
                  {a.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Read More
                  <PiArrowRightLight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      <div className="mt-10 flex justify-center">
  <button className="rounded-2xl border border-primary/50 px-6 py-2.5 text-xs font-semibold tracking-wide text-dark hover:bg-primary hover:text-white hover:border-primary transition-colors">
    VIEW ALL ARTICLES
  </button>
</div>
      </div>
      
    </section>
  );
}
