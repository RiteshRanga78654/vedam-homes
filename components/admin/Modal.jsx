"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function Modal({ open, onClose, children, title, size = "md", footer }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const width =
    size === "lg" ? "max-w-3xl" : size === "sm" ? "max-w-md" : "max-w-xl";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-night/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal
            ref={panelRef}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full ${width} max-h-[88vh] overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-[0_40px_90px_-25px_rgba(10,9,6,0.45)]`}
          >
            {title && (
              <div className="flex items-center justify-between border-b border-ink/8 px-5 py-4">
                <h3 className="font-display text-lg tracking-tight text-ink">{title}</h3>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-muted transition hover:bg-ink/5 hover:text-ink"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            )}
            <div className="admin-scroll max-h-[calc(88vh-4.5rem)] overflow-y-auto px-5 py-4">
              {children}
            </div>
            {footer && (
              <div className="flex items-center justify-end gap-2 border-t border-ink/8 bg-surface-2/50 px-5 py-3.5">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Drawer({ open, onClose, children, title, footer }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-night/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-2xl flex-col border-l border-ink/10 bg-surface shadow-2xl"
          >
            {title && (
              <div className="flex items-center justify-between border-b border-ink/8 px-6 py-4">
                <h3 className="font-display text-lg tracking-tight text-ink">{title}</h3>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-muted transition hover:bg-ink/5 hover:text-ink"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            )}
            <div className="admin-scroll flex-1 overflow-y-auto px-6 py-5">{children}</div>
            {footer && (
              <div className="flex items-center justify-end gap-2 border-t border-ink/8 bg-surface-2/50 px-6 py-4">
                {footer}
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}