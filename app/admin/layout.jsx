"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { DesktopSidebar, MobileSidebar } from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { Toaster } from "@/components/admin/toast";

const BARE_PATHS = ["/admin/login"];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("admin-sidebar-collapsed");
      if (saved !== null) setCollapsed(saved === "true");
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("admin-sidebar-collapsed", String(collapsed));
    } catch { /* ignore */ }
  }, [collapsed]);

  if (BARE_PATHS.includes(pathname)) {
    return <div className="min-h-screen bg-canvas text-ink">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      <DesktopSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMobileMenu={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>

      <Toaster />
    </div>
  );
}