"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sun, Moon, Bell, Menu, LogOut, ChevronDown } from "lucide-react";
import { useTheme } from "@/app/theme/ThemeProvider";
import Avatar from "./Avatar";

const PATH_TITLES = {
  "/admin": "Overview",
  "/admin/articles": "Articles",
  "/admin/blogs": "Blogs",
  "/admin/projects": "Projects",
  "/admin/gallery": "Gallery",
  "/admin/about": "About Us",
  "/admin/team": "Team Access",
  "/admin/queries": "Queries",
  "/admin/login": "Login",
};

function breadcrumb(pathname) {
  const base = Object.keys(PATH_TITLES).sort((a, b) => b.length - a.length).find(p => pathname === p || pathname.startsWith(p + "/"));
  const title = PATH_TITLES[base] || "Dashboard";
  return (
    <div className="min-w-0">
      <h1 className="truncate font-display text-lg tracking-tight text-ink sm:text-xl">{title}</h1>
      <p className="hidden text-xs text-muted sm:block">
        <span className="text-muted/60">Admin</span>
        {title !== "Overview" && (
          <>
            <span className="mx-1.5 text-muted/30">/</span>
            <span>{title}</span>
          </>
        )}
      </p>
    </div>
  );
}

function SearchOverlay({ open, onClose, onNavigate }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(0);
  const items = [
    { label: "Overview", href: "/admin" },
    { label: "Articles", href: "/admin/articles" },
    { label: "Blogs", href: "/admin/blogs" },
    { label: "Projects", href: "/admin/projects" },
    { label: "About Us", href: "/admin/about" },
    { label: "Team Access", href: "/admin/team" },
    { label: "Queries", href: "/admin/queries" },
  ];
  const filtered = query ? items.filter(i => i.label.toLowerCase().includes(query.toLowerCase())) : items;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => { setFocused(0); }, [query]);

  function onKey(e) {
    if (e.key === "ArrowDown") { e.preventDefault(); setFocused(f => Math.min(f + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)); }
    if (e.key === "Enter" && filtered[focused]) { onNavigate(filtered[focused].href); onClose(); }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[95] flex items-start justify-center pt-[18vh]" onKeyDown={onKey}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-night/50 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-ink/8 px-4 py-3">
              <Search size={18} className="text-muted/60" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Go to…"
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-muted/50 outline-none"
              />
              <kbd className="rounded-md border border-ink/10 bg-ink/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-muted">
                ESC
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.map((item, i) => (
                <li key={item.href}>
                  <button
                    onMouseEnter={() => setFocused(i)}
                    onClick={() => { onNavigate(item.href); onClose(); }}
                    className={`flex w-full items-center rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      i === focused
                        ? "bg-accent/10 text-accent"
                        : "text-ink/70 hover:bg-ink/[0.04]"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted">No results</li>
              )}
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function Header({ onMobileMenu }) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState({ newQueries: 0, recent: [] });
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/v1/overview");
        const json = await res.json();
        if (alive && json.ok) {
          setNotifications({
            newQueries: json.data.kpis.newQueries.value,
            recent: json.data.recentActivity.slice(0, 5),
          });
        }
      } catch { /* ignore */ }
    })();
    return () => { alive = false; };
  }, [pathname]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  async function logout() {
    await fetch("/api/v1/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const dark = theme === "dark";

  return (
    <>
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={(href) => { window.location.href = href; }}
      />
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-ink/10 bg-canvas/80 backdrop-blur-md px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenu}
            className="inline-flex items-center justify-center rounded-xl p-2 text-ink/60 transition hover:bg-ink/5 hover:text-ink lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          {breadcrumb(pathname)}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-surface-2/60 px-3 py-2 text-sm text-muted transition hover:border-ink/20 hover:text-ink"
          >
            <Search size={15} className="hidden sm:block" />
            <span className="hidden md:block">Search…</span>
            <kbd className="ml-1 hidden rounded border border-ink/10 bg-ink/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-muted md:block">⌘K</kbd>
          </button>

          <button
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-ink/8 text-ink/60 transition hover:bg-ink/[0.04] hover:text-ink"
            aria-label={dark ? "Light mode" : "Dark mode"}
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-ink/8 text-ink/60 transition hover:bg-ink/[0.04] hover:text-ink"
              aria-label="Notifications"
            >
              <Bell size={17} />
              {notifications.newQueries > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {notifications.newQueries}
                </span>
              )}
            </button>
            <AnimatePresence>
              {showNotif && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-2xl"
                >
                  <div className="flex items-center justify-between border-b border-ink/8 px-4 py-3">
                    <span className="text-sm font-semibold text-ink">Activity</span>
                    {notifications.newQueries > 0 && (
                      <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                        {notifications.newQueries} new
                      </span>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto p-2">
                    {notifications.recent.length === 0 ? (
                      <p className="px-3 py-6 text-center text-sm text-muted">No recent activity</p>
                    ) : (
                      notifications.recent.map((a) => (
                        <div key={a.id} className="rounded-xl px-3 py-2.5 text-sm transition hover:bg-ink/[0.03]">
                          <p className="truncate text-ink/80">
                            <span className="font-medium text-ink">{a.title}</span>
                            <span className="mx-1 text-muted/50">·</span>
                            <span className="text-muted">{a.action}</span>
                          </p>
                          {a.detail && <p className="mt-0.5 truncate text-xs text-muted/70">{a.detail}</p>}
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
              className="inline-flex items-center gap-2 rounded-xl border border-ink/8 px-2.5 py-1.5 transition hover:bg-ink/[0.04]"
            >
              <Avatar name="Vedam Studio" size={28} />
              <span className="hidden text-xs font-medium text-ink sm:block">Studio</span>
              <ChevronDown size={13} className="hidden text-muted sm:block" />
            </button>
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-2xl"
                >
                  <div className="border-b border-ink/8 px-4 py-3">
                    <p className="text-sm font-semibold text-ink">Vedam Studio</p>
                    <p className="mt-0.5 text-xs text-muted">admin@vedamhomes.com</p>
                  </div>
                  <div className="p-1.5">
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-ink/70 transition hover:bg-red-500/5 hover:text-red-600"
                    >
                      <LogOut size={15} />
                      Log out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </>
  );
}