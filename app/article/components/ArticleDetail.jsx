"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  PiArrowLeftLight,
  PiArrowUpRightLight,
  PiCheckLight,
  PiClockLight,
  PiCopyLight,
  PiLinkedinLogoLight,
  PiQuotesLight,
  PiShareNetworkLight,
  PiTwitterLogoLight,
  PiWhatsappLogoLight,
} from "react-icons/pi";
import ArticleCard from "./ArticleCard";

const easeTransition = [0.19, 1, 0.22, 1];

function ContentRenderer({ block }) {
  switch (block.type) {
    case "lead":
      return (
        <p className="font-serif text-2xl font-light leading-relaxed text-[#1b1917] sm:text-[1.85rem] first-letter:float-left first-letter:mr-4 first-letter:font-serif first-letter:text-[4.8rem] first-letter:leading-[0.8] first-letter:text-[#967d53]">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <div className="mt-16 border-t border-[#1b1917]/10 pt-10">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#967d53]">
            Section Architectural Focus
          </span>
          <h2 className="font-serif mt-2 text-3xl font-light tracking-tight text-[#1b1917] sm:text-4xl">
            {block.text}
          </h2>
        </div>
      );
    case "p":
      return (
        <p className="mt-6 text-base sm:text-lg font-light leading-[1.9] text-[#3d3830]">
          {block.text}
        </p>
      );
    case "metrics":
      return (
        <div className="my-10 grid grid-cols-1 gap-4 border-y border-[#1b1917]/15 py-8 sm:grid-cols-3">
          {block.data.map((item, idx) => (
            <div key={idx} className="border-l-2 border-[#967d53] pl-4">
              <div className="font-serif text-3xl font-light text-[#1b1917] sm:text-4xl">
                {item.value}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7a7265]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      );
    case "quote":
      return (
        <figure className="relative my-14 bg-[#f4efe4] p-8 sm:p-12">
          <PiQuotesLight className="absolute right-6 top-6 text-4xl text-[#967d53]/25" />
          <blockquote className="font-serif text-2xl sm:text-3xl font-light italic leading-snug text-[#1b1917]">
            “{block.text}”
          </blockquote>
          {block.attribution && (
            <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7a7265]">
              — {block.attribution}
            </figcaption>
          )}
        </figure>
      );
    case "bullets":
      return (
        <ul className="my-8 space-y-4 border-l border-[#967d53]/40 pl-6">
          {block.items.map((item, i) => (
            <li key={i} className="text-base sm:text-lg font-light leading-relaxed text-[#3d3830]">
              <strong className="font-mono text-xs uppercase tracking-widest text-[#967d53] mr-2">
                0{i + 1}.
              </strong>
              {item}
            </li>
          ))}
        </ul>
      );
    case "img":
      return (
        <figure className="my-14">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e5dfd5]">
            <Image
              src={block.src}
              alt={block.alt || "Estate Archive"}
              fill
              sizes="100vw"
              quality={88}
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#7a7265]">
              <span>{block.caption}</span>
              <span>Specimen Visual</span>
            </figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

export default function ArticleDetail({ article, related = [] }) {
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  return (
    <article className="relative bg-[#fbf9f5] text-[#1b1917] selection:bg-[#1b1917] selection:text-[#fbf9f5]">
      {/* Top Scroll Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-[#967d53]"
      />

      {/* Top Nav Control */}
      <div className="mx-auto max-w-[1500px] px-6 pt-28 sm:pt-36 lg:px-12">
        <Link
          href="/article"
          className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#7a7265] transition-colors hover:text-[#1b1917]"
        >
          <span className="flex h-8 w-8 items-center justify-center border border-[#1b1917]/20 transition-transform group-hover:-translate-x-1">
            <PiArrowLeftLight size={15} />
          </span>
          Return to Monograph Index
        </Link>
      </div>

      {/* Hero Header */}
      <header className="mx-auto mt-10 max-w-[1500px] px-6 lg:px-12">
        <div className="border-b border-[#1b1917]/15 pb-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#967d53]">
            <span>{article.category}</span>
            <span className="text-stone-300">•</span>
            <span className="text-[#7a7265]">{article.date}</span>
            <span className="text-stone-300">•</span>
            <span className="text-[#7a7265] flex items-center gap-1.5">
              <PiClockLight size={13} /> {article.readingTime}
            </span>
          </div>

          <h1 className="font-serif mt-5 max-w-5xl text-4xl font-light leading-[1.08] tracking-tight text-[#1b1917] sm:text-6xl lg:text-7xl">
            {article.title}
          </h1>
        </div>
      </header>

      {/* Hero Image */}
      <div className="mx-auto mt-10 max-w-[1500px] px-6 lg:px-12">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1b1917]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            quality={92}
            className="object-cover"
          />
        </div>
      </div>

      {/* Editorial Content Core */}
      <div className="mx-auto mt-14 max-w-[1500px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-16">
          {/* Sticky Meta Sidebar */}
          <aside className="order-2 mt-12 lg:order-1 lg:col-span-4 lg:mt-0">
            <div className="sticky top-28 space-y-8 border-t border-[#1b1917]/15 pt-8 lg:border-t-0 lg:pt-0">
              {/* Author Dossier */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#967d53]">
                  Author Profile
                </p>
                <p className="font-serif mt-1.5 text-2xl font-light text-[#1b1917]">
                  {article.author}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#7a7265]">
                  {article.authorRole}
                </p>
              </div>

              {/* Architectural Specs (If present) */}
              {article.specs && (
                <div className="border-t border-[#1b1917]/10 pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#967d53]">
                    Monograph Dossier
                  </p>
                  <dl className="mt-4 space-y-3 font-mono text-xs">
                    {Object.entries(article.specs).map(([label, val]) => (
                      <div key={label} className="flex justify-between border-b border-[#1b1917]/5 pb-1">
                        <dt className="uppercase text-[#8c8273]">{label}:</dt>
                        <dd className="font-medium text-[#1b1917] text-right">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Dispatch / Share */}
              <div className="border-t border-[#1b1917]/10 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#967d53]">
                  Distribute Essay
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex h-10 items-center gap-2 border border-[#1b1917]/15 bg-white px-4 font-mono text-[10px] uppercase tracking-wider text-[#1b1917] transition-colors hover:bg-[#1b1917] hover:text-[#fbf9f5]"
                  >
                    {copied ? <PiCheckLight size={14} className="text-emerald-600" /> : <PiCopyLight size={14} />}
                    {copied ? "Copied" : "Copy URI"}
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${article.title} - ${shareUrl}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center border border-[#1b1917]/15 bg-white text-[#1b1917] transition-colors hover:bg-[#1b1917] hover:text-[#fbf9f5]"
                    aria-label="Share via WhatsApp"
                  >
                    <PiWhatsappLogoLight size={16} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center border border-[#1b1917]/15 bg-white text-[#1b1917] transition-colors hover:bg-[#1b1917] hover:text-[#fbf9f5]"
                    aria-label="Share via LinkedIn"
                  >
                    <PiLinkedinLogoLight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Reading Column */}
          <main className="order-1 lg:order-2 lg:col-span-8">
            <div className="max-w-[70ch]">
              {article.content.map((block, idx) => (
                <ContentRenderer key={idx} block={block} />
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Curated Related Reading */}
      {related.length > 0 && (
        <section className="mx-auto mt-28 max-w-[1500px] border-t border-[#1b1917]/15 px-6 py-20 lg:px-12">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#967d53]">
                Archive Selection
              </span>
              <h3 className="font-serif mt-2 text-3xl font-light tracking-tight text-[#1b1917] sm:text-4xl">
                Complementary Monographs
              </h3>
            </div>
            <Link
              href="/article"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#967d53] hover:text-[#1b1917]"
            >
              View Full Index <PiArrowUpRightLight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((item, index) => (
              <ArticleCard key={item.id} article={item} index={index} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}