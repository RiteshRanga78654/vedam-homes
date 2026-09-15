"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Newspaper,
  NotebookPen,
  Building2,
  Info,
  Users,
  Inbox,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { navigation } from "./ui";

const ICONS = {
  LayoutDashboard,
  Newspaper,
  NotebookPen,
  Building2,
  Info,
  Users,
  Inbox,
};

function NavLink({ item, collapsed, isActive }) {
  const Icon = ICONS[item.icon] || LayoutDashboard;
  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-white/[0.12] text-white"
          : "text-white/50 hover:bg-white/[0.06] hover:text-white/85"
      }`}
    >
      <Icon size={20} strokeWidth={1.5} className="shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
      {isActive && (
        <motion.span
          layoutId="admin-active-nav"
          className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-accent"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      {collapsed && (
        <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-lg bg-night px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity group-hover:opacity-100">
          {item.label}
        </span>
      )}
    </Link>
  );
}

export function NavContent({ collapsed, onLinkClick }) {
  const pathname = usePathname();

  function matchItem(item) {
    if (item.end) return pathname === item.href;
    return pathname.startsWith(item.href);
  }

  return (
    <>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navigation.map((section, si) => (
          <div key={section.section} className={si > 0 ? "mt-6" : ""}>
            {!collapsed && (
              <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.26em] text-white/25">
                {section.section}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <div key={item.href} onClick={onLinkClick}>
                  <NavLink
                    item={item}
                    collapsed={collapsed}
                    isActive={matchItem(item)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/[0.06] px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-semibold">
            VS
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white/90">Vedam Studio</p>
              <p className="text-[11px] text-white/35">Super Admin</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function LogoutButton({ collapsed }) {
  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }
  return (
    <button
      onClick={logout}
      title={collapsed ? "Log out" : undefined}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/45 transition-all duration-200 hover:bg-white/[0.06] hover:text-white/80"
    >
      <LogOut size={20} strokeWidth={1.5} className="shrink-0" />
      {!collapsed && <span>Log out</span>}
    </button>
  );
}

export function CollapseButton({ collapsed, onToggle }) {
  const Icon = collapsed ? ChevronRight : ChevronLeft;
  return (
    <button
      onClick={onToggle}
      title={collapsed ? "Expand" : "Collapse"}
      className="hidden lg:flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/35 transition-all duration-200 hover:bg-white/[0.06] hover:text-white/65"
    >
      <Icon size={20} strokeWidth={1.5} className="shrink-0" />
      {!collapsed && <span>Collapse</span>}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* DESKTOP SIDEBAR                                                    */
/* ------------------------------------------------------------------ */
export function DesktopSidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={`hidden lg:flex shrink-0 sticky top-0 z-40 h-screen flex-col overflow-hidden bg-[#111110] text-white transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        collapsed ? "w-[76px]" : "w-[272px]"
      }`}
    >
      <div className="flex h-16 items-center gap-3 px-5 border-b border-white/[0.06]">
        <img
          src="/logo/vedam-homes.png"
          alt="Vedam Homes"
          className="h-8 w-8 shrink-0 rounded-lg bg-white/10 object-cover"
        />
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-[15px] tracking-tight text-white"
          >
            Admin Studio
          </motion.span>
        )}
      </div>
      <NavContent collapsed={collapsed} />
      <div className="border-t border-white/[0.06] space-y-0.5 px-3 pb-3 pt-2">
        <CollapseButton collapsed={collapsed} onToggle={onToggle} />
        <LogoutButton collapsed={collapsed} />
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* MOBILE DRAWER                                                      */
/* ------------------------------------------------------------------ */
export function MobileSidebar({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-night/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-0 flex h-full w-[272px] flex-col overflow-hidden bg-[#111110] text-white shadow-2xl"
          >
            <div className="flex h-16 items-center justify-between gap-3 border-b border-white/[0.06] px-5">
              <div className="flex items-center gap-3">
                <img
                  src="/logo/vedam-homes.png"
                  alt="Vedam Homes"
                  className="h-8 w-8 rounded-lg bg-white/10 object-cover"
                />
                <span className="font-display text-[15px] tracking-tight text-white">
                  Admin Studio
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-white/40 hover:text-white/80"
                aria-label="Close menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="4" x2="20" y2="20" />
                  <line x1="20" y1="4" x2="4" y2="20" />
                </svg>
              </button>
            </div>
            <NavContent collapsed={false} onLinkClick={onClose} />
            <div className="border-t border-white/[0.06] space-y-0.5 px-3 pb-3 pt-2">
              <LogoutButton collapsed={false} />
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}