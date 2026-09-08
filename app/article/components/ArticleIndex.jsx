"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  PiArrowUpRightLight,
  PiBookOpenTextLight,
  PiClockLight,
  PiFlameLight,
  PiFunnelLight,
  PiMagnifyingGlassLight,
  PiSparkleFill,
  PiXBold,
} from "react-icons/pi";
import ArticleCard from "./ArticleCard";

const easeOut = [0.16, 1, 0.3, 1];

function sortArticles(list, sort) {
  const sorted = [...list];
  if (sort === "popular") {
    sorted.sort((a, b) => {
      if (!!a.popular !== !!b.popular) return a.popular ? -1 : 1;
      return b.dateISO.localeCompare(a.dateISO);
    });
  } else {
    sorted.sort((a, b) => b.dateISO.localeCompare(a.dateISO));
  }
  return sorted;
}

function FeaturedArticle({ article }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: easeOut }}
      className="group relative"
    >
      <Link
        href={`/article/${article.id}`}
        aria-label={`Read featured article: ${article.title}`}
        className="block"
      >
        <div className="relative h-[70vh] min-h-[480px] overflow-hidden rounded-[20px] border border-[#15140f]/10 bg-[#15140f] shadow-[0_30px_80px_-20px_rgba(21,20,15,0.45)] sm:h-[66vh] sm:min-h-[540px] sm:rounded-[32px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#15140f]/95 via-[#15140f]/30 to-[#15140f]/5 transition-opacity duration-700" />

          {/* Featured badge */}
          <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-4 py-1.5 backdrop-blur-md">
              <PiSparkleFill className="text-xs text-[#a68a5c]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#f5f1e8]">
                Featured Monograph
              </span>
            </div>
          </div>

          {/* Editorial meta */}
          <div className="absolute right-5 top-5 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/70 sm:right-8 sm:top-8 sm:flex">
            <PiBookOpenTextLight size={13} className="text-[#a68a5c]" />
            <span>{article.readingTime}</span>
          </div>

          {/* Bottom content */}
          <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a68a5c]">
              {article.category} • {article.date}
            </p>

            <h2 className="font-display mt-3 max-w-4xl text-3xl font-light leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              {article.title}
            </h2>

            <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-white/70 sm:text-base">
              {article.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/15 font-display text-sm text-white backdrop-blur-md">
                  {article.author.charAt(0)}
                </span>
                <div className="leading-tight">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                    By {article.author}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                    {article.authorRole}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#a68a5c] group-hover:bg-[#6e5a3c] group-hover:text-[#f5f1e8]">
                <span>Read Article</span>
                <PiArrowUpRightLight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function EmptyState({ onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[320px] flex-col items-center justify-center rounded-[28px] border border-dashed border-[#15140f]/15 bg-white/40 px-6 text-center"
    >
      <PiBookOpenTextLight size={30} className="text-[#948a76]" />
      <h3 className="font-display mt-5 text-2xl font-light text-[#15140f]">
        No essays match your search
      </h3>
      <p className="mt-2 max-w-sm text-sm font-light text-[#15140f]/55">
        Try a different keyword or clear the filters to browse the full journal.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#15140f]/15 bg-white px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-[#15140f] transition-all duration-300 hover:bg-[#15140f] hover:text-[#f5f1e8]"
      >
        <PiXBold size={12} />
        Clear filters
      </button>
    </motion.div>
  );
}

export default function ArticleIndex({ articles }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(articles.map((a) => a.category)))],
    [articles]
  );

  const hasActiveFilters = query.trim() !== "" || category !== "All";

  const results = useMemo(() => {
    let list = articles.filter((article) => {
      const matchesQuery =
        query.trim() === "" ||
        `${article.title} ${article.excerpt} ${article.category} ${article.author}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());
      const matchesCategory = category === "All" || article.category === category;
      return matchesQuery && matchesCategory;
    });
    return sortArticles(list, sort);
  }, [articles, query, category, sort]);

  const featured = hasActiveFilters ? null : results[0];
  const gridArticles = hasActiveFilters ? results : results.slice(1);

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40">
      {/* Ambient glows + grid backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #15140f 1px, transparent 1px), linear-gradient(to bottom, #15140f 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="pointer-events-none absolute -right-40 top-16 h-[460px] w-[460px] rounded-full bg-[#6e5a3c]/[0.08] blur-[130px] ambient-orb" />
      <div className="pointer-events-none absolute -left-40 top-[45%] h-[420px] w-[420px] rounded-full bg-[#948a76]/[0.1] blur-[130px] ambient-orb" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col gap-8 border-b border-[#15140f]/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="max-w-3xl"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6e5a3c]" />
              <span className="eyebrow font-mono text-xs text-[#948a76]">
                The Vedam Journal
              </span>
            </div>
            <h1 className="font-display text-[40px] font-normal leading-[1.02] tracking-tight text-[#15140f] sm:text-6xl lg:text-7xl">
              Essays on living
              <span className="italic font-light text-[#15140f]/55"> well.</span>
            </h1>
            <p className="mt-5 max-w-[52ch] text-sm font-light leading-relaxed text-[#15140f]/65 sm:text-base">
              Architecture, investment, and the considered details of a well-made
              home — written by the studio, from the work itself.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: easeOut }}
            className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[#15140f]/50"
          >
            <span>{String(articles.length).padStart(2, "0")} essays</span>
            <span className="h-px w-10 bg-[#15140f]/15" />
            <span>Published seasonally</span>
          </motion.div>
        </div>

        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
          className="flex flex-col gap-5 py-8 lg:flex-row lg:items-center lg:justify-between"
        >
          {/* Search */}
          <div className="relative order-2 w-full max-w-sm lg:order-1">
            <PiMagnifyingGlassLight className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-[#948a76]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search essays…"
              aria-label="Search essays"
              className="w-full rounded-full border border-[#15140f]/10 bg-white/70 py-3 pl-11 pr-11 font-mono text-xs uppercase tracking-widest text-[#15140f] placeholder-[#948a76] outline-none backdrop-blur-md transition-all duration-300 focus:border-[#6e5a3c]/40 focus:bg-white focus:shadow-[0_0_0_2px_rgba(110,90,60,0.15)]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#948a76] transition-colors hover:bg-[#15140f]/5 hover:text-[#15140f]"
              >
                <PiXBold size={12} />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="order-1 flex flex-wrap items-center gap-2 lg:order-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`cursor-pointer rounded-full border px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 sm:text-xs sm:tracking-widest ${
                  category === cat
                    ? "border-[#15140f] bg-[#15140f] font-semibold text-[#f5f1e8]"
                    : "border-transparent bg-white/70 text-[#15140f]/55 backdrop-blur-md hover:bg-white hover:text-[#15140f]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="order-3 flex items-center gap-2 rounded-full border border-[#15140f]/10 bg-white/70 p-1.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setSort("latest")}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
                sort === "latest"
                  ? "bg-[#15140f] text-[#f5f1e8]"
                  : "text-[#15140f]/55 hover:text-[#15140f]"
              }`}
            >
              <PiClockLight size={13} />
              Latest
            </button>
            <button
              type="button"
              onClick={() => setSort("popular")}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
                sort === "popular"
                  ? "bg-[#15140f] text-[#f5f1e8]"
                  : "text-[#15140f]/55 hover:text-[#15140f]"
              }`}
            >
              <PiFlameLight size={13} />
              Popular
            </button>
          </div>
        </motion.div>

        {/* Result meta */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#948a76]">
              {String(results.length).padStart(2, "0")} result
              {results.length === 1 ? "" : "s"}
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex cursor-pointer items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#6e5a3c] transition-colors hover:text-[#15140f]"
            >
              <PiFunnelLight size={13} />
              Clear
            </button>
          </div>
        )}

        {/* Featured */}
        <div className="pt-2">
          <AnimatePresence mode="popLayout">
            {featured ? (
              <motion.div
                key={`featured-${featured.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FeaturedArticle article={featured} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Grid */}
        {gridArticles.length === 0 ? (
          <div className="pt-10">
            <EmptyState onClear={clearFilters} />
          </div>
        ) : (
          <div
            key={`${query}-${category}-${sort}`}
            className="grid grid-cols-1 gap-x-8 gap-y-14 pb-4 pt-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {gridArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}