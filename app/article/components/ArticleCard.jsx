"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PiArrowUpRight, PiMapPinLight } from "react-icons/pi";

const CARD_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
const ease = [0.19, 1, 0.22, 1];

export default function ArticleCard({ article, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease }}
      className="group mx-auto w-full max-w-sm"
    >
      <Link
        href={`/article/${article.id}`}
        aria-label={`Read: ${article.title}`}
        className="flex h-full flex-col overflow-hidden rounded-[20px] border border-[#15130f]/8 bg-[#fbf8f2] transition-all duration-500 hover:-translate-y-[3px] hover:border-[#b4915c]/45 hover:shadow-[0_28px_54px_-20px_rgba(21,19,15,0.22)]"
      >
        {/* Image */}
        <div className="relative aspect-[16/11] w-full overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes={CARD_SIZES}
            quality={88}
            className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#fbf8f2] backdrop-blur-md">
              <span className="h-1 w-1 rounded-full bg-[#dcc491]" />
              {article.category}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-[#15130f]/45">
            <span>{article.date}</span>
            <span className="h-1 w-1 rounded-full bg-[#b4915c]/50" />
            <span>{article.readingTime}</span>
          </div>

          <h3 className="mt-3 font-serif text-[21px] font-light leading-snug tracking-tight text-[#15130f]">
            {article.title}
          </h3>

          <p className="mt-2.5 line-clamp-2 text-sm font-light leading-relaxed text-[#15130f]/60">
            {article.excerpt}
          </p>

          {article.specs?.location && (
            <div className="mt-4 flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-[#15130f]/45">
              <PiMapPinLight size={13} className="text-[#b4915c]" />
              <span className="truncate">{article.specs.location}</span>
            </div>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-[#15130f]/8 pt-4 mt-5">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#15130f]/50">
              By {article.author}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#15130f]/12 text-[#15130f] transition-all duration-300 group-hover:border-[#b4915c] group-hover:bg-[#b4915c] group-hover:text-[#fbf8f2]">
              <PiArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}