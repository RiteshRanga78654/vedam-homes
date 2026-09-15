"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page = 1,
  totalPages = 1,
  total,
  onPage,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
      <span className="text-xs text-muted">
        Page {page} of {totalPages}
        {total != null && ` · ${total} total`}
      </span>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPage(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-ink/10 text-muted transition hover:bg-ink/[0.04] hover:text-ink disabled:opacity-40"
          aria-label="Previous"
        >
          <ChevronLeft size={14} />
        </button>
        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          const active = p === page;
          return (
            <button
              key={p}
              onClick={() => onPage(p)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
                active
                  ? "bg-ink text-canvas"
                  : "border border-transparent text-muted hover:bg-ink/[0.05] hover:text-ink"
              }`}
            >
              {p}
            </button>
          );
        })}
        <button
          onClick={() => onPage(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-ink/10 text-muted transition hover:bg-ink/[0.04] hover:text-ink disabled:opacity-40"
          aria-label="Next"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}