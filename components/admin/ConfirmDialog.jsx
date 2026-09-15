"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Delete",
  loading = false,
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-night/60 backdrop-blur-sm"
            onClick={loading ? undefined : onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md rounded-2xl border border-red-500/20 bg-surface p-6 shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                <AlertTriangle size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-sm text-muted">{description}</p>
              </div>
              {!loading && (
                <button
                  onClick={onClose}
                  className="rounded-lg p-1 text-muted transition hover:text-ink"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                onClick={onClose}
                disabled={loading}
                className="rounded-xl border border-ink/10 px-4 py-2 text-sm font-medium text-ink/70 transition hover:bg-ink/[0.04] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => { if (!loading) onConfirm(); }}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
              >
                {loading && (
                  <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-white/30 border-t-white" />
                )}
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}