"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

const ToastContext = createContext({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const TONE_ICON = {
  success: { Icon: CheckCircle2, cls: "text-emerald-500" },
  error: { Icon: AlertTriangle, cls: "text-red-500" },
  info: { Icon: Info, cls: "text-accent" },
};

export function Toaster() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const push = useCallback(({ title, description = "", tone = "success", duration = 4200 }) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev.slice(-3), { id, title, description, tone }]);
    const timer = setTimeout(() => dismiss(id), duration);
    timers.current.set(id, timer);
  }, [dismiss]);

  const toast = useCallback(
    (opts) => {
      if (typeof opts === "string") push({ title: opts });
      else push(opts);
    },
    [push]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {null}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2.5">
        <AnimatePresence>
          {toasts.map((t) => {
            const { Icon, cls } = TONE_ICON[t.tone] || TONE_ICON.info;
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, transition: { duration: 0.22 } }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-ink/10 bg-surface/95 p-4 shadow-[0_16px_48px_-16px_rgba(21,20,15,0.28)] backdrop-blur-md"
              >
                <Icon size={18} className={`mt-0.5 shrink-0 ${cls}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{t.title}</p>
                  {t.description && (
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{t.description}</p>
                  )}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="rounded-lg p-1 text-muted transition hover:bg-ink/5 hover:text-ink"
                  aria-label="Dismiss"
                >
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}