"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { hasPermission } from "@/lib/permissions";

const SessionContext = createContext({
  session: null,
  loading: true,
  can: () => false,
  refresh: () => {},
});

/** Read the current admin session once and expose it (with permission checks). */
export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const res = await fetch("/api/v1/auth/session");
      const json = await res.json();
      if (json.ok) setSession(json.data);
      else setSession(null);
    } catch {
      setSession(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  function can(permission) {
    return hasPermission(session?.role, permission);
  }

  return (
    <SessionContext.Provider value={{ session, loading, can, refresh }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}