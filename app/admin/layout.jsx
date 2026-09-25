"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { DesktopSidebar, MobileSidebar } from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { Toaster } from "@/components/admin/toast";
import { SessionProvider, useSession } from "@/components/admin/SessionProvider";
import { canAccessPath, permissionForPath, PERMISSION_LABELS } from "@/lib/permissions";

const BARE_PATHS = ["/admin/login"];

function AccessDenied() {
  const permission = permissionForPath(typeof window !== "undefined" ? window.location.pathname : "");
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
        <ShieldAlert size={26} strokeWidth={1.5} />
      </span>
      <h2 className="font-display text-xl tracking-tight text-ink">Access restricted</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
        Your role doesn't include access to{" "}
        {permission ? PERMISSION_LABELS[permission] : "this section"}. Ask a Super Admin to
        update your permissions in Team Access.
      </p>
    </div>
  );
}

function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, loading } = useSession();
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

  // Not signed in (e.g. expired session) — send to login.
  useEffect(() => {
    if (!loading && !session) {
      router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [loading, session, pathname, router]);

  const allowed = !session || canAccessPath(session.role, pathname);

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      <DesktopSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMobileMenu={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {loading ? (
            <div className="space-y-4 pt-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-16 rounded-2xl border border-ink/8 bg-surface admin-shimmer" />
              ))}
            </div>
          ) : allowed ? (
            children
          ) : (
            <AccessDenied />
          )}
        </main>
      </div>

      <Toaster />
    </div>
  );
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  if (BARE_PATHS.includes(pathname)) {
    return <div className="min-h-screen bg-canvas text-ink">{children}</div>;
  }

  return (
    <SessionProvider>
      <AdminShell>{children}</AdminShell>
    </SessionProvider>
  );
}