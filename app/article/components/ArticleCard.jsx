"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PiArrowUpRight, PiMapPinLight, PiUserCircleLight } from "react-icons/pi";

const CARD_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
const easeTransition = [0.19, 1, 0.22, 1];

export default function ArticleCard({ article, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.09, ease: easeTransition }}
      className="group relative mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-[#1b1917]/8 bg-[#fdfbf7] shadow-[0_1px_2px_rgba(27,25,23,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-[#967d53]/40 hover:shadow-[0_24px_48px_-12px_rgba(27,25,23,0.18)]"
    >
      {/* Gold accent line — appears on hover */}
      <div className="absolute inset-x-0 top-0 z-10 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#967d53] via-[#c9a869] to-[#967d53] transition-transform duration-500 group-hover:scale-x-100" />

      <Link
        href={`/article/${article.id}`}
        className="flex h-full flex-col p-5 sm:p-6"
        aria-label={`Read monograph: ${article.title}`}
      >
        {/* Visual Frame */}
        <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl bg-[#e8e4dc]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes={CARD_SIZES}
            quality={88}
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/35 via-transparent to-stone-950/10 transition-opacity duration-500 group-hover:opacity-70" />

          <div className="absolute left-3.5 top-3.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-[#1b1917]/70 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-[#f7f4ed] backdrop-blur-md">
              <span className="h-1 w-1 rounded-full bg-[#c9a869]" />
              {article.category}
            </span>
          </div>

          <div className="absolute bottom-3.5 right-3.5 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-[#fdfbf7]/95 opacity-0 shadow-lg backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <PiArrowUpRight size={16} className="text-[#1b1917] transition-transform duration-300 group-hover:rotate-45" />
          </div>
        </div>

        {/* Header Metadata */}
        <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#877e70]">
          <span>{article.date}</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[#967d53]/60" />
            {article.readingTime}
          </span>
        </div>

        {/* Title & Excerpt */}
        <div className="mt-4 flex-1">
          <h3 className="font-serif text-xl sm:text-2xl font-light leading-snug tracking-tight text-[#1b1917]">
            <span className="bg-gradient-to-r from-[#967d53] to-[#967d53] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px] group-hover:text-[#6b5a3d]">
              {article.title}
            </span>
          </h3>
          <p className="mt-3 line-clamp-3 text-sm font-light leading-relaxed text-[#544f47]">
            {article.excerpt}
          </p>
        </div>

        {article.specs?.location && (
          <div className="mt-5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#877e70]">
            <PiMapPinLight size={14} className="text-[#967d53]" />
            <span className="truncate">{article.specs.location}</span>
          </div>
        )}

        {/* Action Bar */}
        <div className="mt-6 flex items-center justify-between border-t border-[#1b1917]/10 pt-4">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#1b1917]/60">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#1b1917]/15 bg-surface-2">
              <PiUserCircleLight size={14} className="text-[#967d53]" />
            </span>
            By {article.author}
          </div>

          <span className="group/btn flex items-center gap-1.5 rounded-full border border-[#1b1917]/15 px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#1b1917]/70 transition-all duration-300 group-hover:border-[#967d53] group-hover:bg-[#1b1917] group-hover:text-white dark:group-hover:border-amber-400! dark:group-hover:bg-amber-400! dark:group-hover:text-charcoal!">
            Read full article
            <PiArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}