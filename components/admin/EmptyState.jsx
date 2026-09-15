"use client";

import { motion } from "framer-motion";
import { Inbox } from "lucide-react";

export default function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  description = "Create your first record to get started.",
  action,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/12 bg-surface/50 px-6 py-16 text-center ${className}`}
    >
      <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
        <Icon size={26} strokeWidth={1.5} />
      </span>
      <h3 className="font-display text-lg tracking-tight text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}