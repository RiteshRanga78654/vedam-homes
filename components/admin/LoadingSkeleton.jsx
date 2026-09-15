"use client";

export default function LoadingSkeleton({ rows = 5, className = "" }) {
  return (
    <div className={`space-y-4 ${className}`} aria-busy aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className="h-12 w-12 shrink-0 rounded-xl admin-shimmer bg-ink/[0.06]" />
          <div className="flex-1 space-y-3">
            <span className="block h-3.5 w-[65%] rounded-full admin-shimmer bg-ink/[0.06]" />
            <span className="block h-2.5 w-[45%] rounded-full admin-shimmer bg-ink/[0.04]" />
          </div>
        </div>
      ))}
    </div>
  );
}