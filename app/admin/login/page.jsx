"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useTheme } from "@/app/theme/ThemeProvider";

const ease = [0.16, 1, 0.3, 1];

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const { theme, toggleTheme } = useTheme();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    let active = true;
    try {
      const saved = localStorage.getItem("vedam-admin-email");
      if (saved) setForm((f) => ({ ...f, email: saved }));
    } catch { /* ignore */ }
    fetch("/api/admin/auth/session")
      .then((r) => r.json())
      .then((json) => {
        if (active && json.ok) router.replace("/admin");
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.ok) {
        try {
          if (remember) localStorage.setItem("vedam-admin-email", form.email);
          else localStorage.removeItem("vedam-admin-email");
        } catch { /* ignore */ }
        router.push(search.get("next") || "/admin");
      } else {
        setError(json.error || "Login failed");
        setShakeKey((k) => k + 1);
      }
    } catch {
      setError("Network error");
      setShakeKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  }

  function fillDemo() {
    setForm({ email: "admin@vedamhomes.com", password: "vedamhomes" });
    setError("");
  }

  const inputCls =
    "peer w-full rounded-xl border border-ink/12 bg-surface-2/70 py-3 pl-11 pr-11 text-sm text-ink placeholder:text-muted/40 outline-none transition-all duration-300 focus:border-accent/60 focus:bg-surface-2 focus:ring-4 focus:ring-accent/15";

  return (
    <div className="relative flex min-h-screen bg-canvas">
      {/* ================= Showcase (desktop) ================= */}
      <div className="relative hidden w-[46%] overflow-hidden bg-night text-ivory lg:flex lg:flex-col lg:justify-between">
        {/* Ambient layers */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[26rem] w-[26rem] translate-x-1/3 translate-y-1/4 rounded-full bg-stone/10 blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(245,241,232,0.06)_1px,transparent_1px)] [background-size:26px_26px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/60" />
          <span className="absolute -right-8 top-1/2 -translate-y-1/2 select-none font-display text-[16rem] leading-none text-ivory/[0.03]">
            V
          </span>
        </div>

        {/* Top row */}
        <div className="relative z-10 flex items-center justify-between px-10 pt-10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-ivory/15 bg-ivory/5 backdrop-blur">
              <Building2 size={16} className="text-accent-soft" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/70">
              Vedam Homes
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/50">
            Est. 2014
          </span>
        </div>

        {/* Statement */}
        <div className="relative z-10 px-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-accent-soft/70" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent-soft">
              Admin Studio
            </span>
          </div>
          <h1 className="max-w-md font-display text-5xl font-light leading-[1.08] tracking-tight text-ivory">
            Spaces reserved for{" "}
            <em className="font-display italic text-accent-soft">exceptional</em> living.
          </h1>
          <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-ivory/55">
            A quiet studio managing every residence, enquiry and detail behind Vesham's most
            considered addresses.
          </p>
        </div>

        {/* Footer stats */}
        <div className="relative z-10 px-10 pb-10">
          <div className="mb-6 h-px w-full bg-gradient-to-r from-accent-soft/40 via-ivory/10 to-transparent" />
          <div className="flex items-end justify-between">
            <div className="flex gap-10">
              <div>
                <div className="font-display text-2xl font-light text-ivory">12</div>
                <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-ivory/45">
                  Years
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-light text-ivory">05</div>
                <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-ivory/45">
                  Residences
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-light text-ivory">01</div>
                <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-ivory/45">
                  Vision
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-ivory/45">
              <MapPin size={12} className="text-accent-soft/80" />
              Visakhapatnam
            </div>
          </div>
        </div>
      </div>

      {/* ================= Form (right) ================= */}
      <div className="relative flex flex-1 items-center justify-center px-5 py-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-accent/8 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-accent/5 blur-[110px]" />
        </div>

        <button
          onClick={toggleTheme}
          className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-surface/60 text-muted backdrop-blur transition hover:border-accent/40 hover:text-ink"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="w-full max-w-md"
        >
          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease }}
            className="mb-9 flex flex-col items-center text-center"
          >
            <div className="relative mb-6">
              <span className="absolute inset-0 -m-2 rounded-3xl bg-accent/10 blur-2xl" />
              <img
                src="/logo/vedam-homes.png"
                alt="Vedam Homes"
                className="relative h-14 w-14 rounded-2xl object-cover shadow-[0_12px_32px_-8px_rgba(21,20,15,0.25)]"
              />
            </div>
            <h2 className="font-display text-3xl font-light tracking-tight text-ink">
              Welcome <em className="italic text-accent">back</em>
            </h2>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
              <Sparkles size={13} className="text-accent" />
              Sign in to the Vedam Homes studio
            </p>
          </motion.div>

          <motion.form
            key={shakeKey}
            onSubmit={handleSubmit}
            animate={error ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-ink/10 bg-surface/80 p-7 shadow-[0_32px_80px_-32px_rgba(21,20,15,0.18)] backdrop-blur-xl"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                className="overflow-hidden rounded-xl border border-red-500/25 bg-red-500/[0.06] px-4 py-3 text-sm text-red-600 dark:text-red-300"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="shrink-0" />
                  {error}
                </div>
              </motion.div>
            )}

            <div className="space-y-5">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5, ease }}
              >
                <label className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                  Email address
                </label>
                <div className="group relative">
                  <Mail
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60 transition-colors group-focus-within:text-accent"
                  />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputCls}
                    placeholder="you@vedamhomes.com"
                    autoComplete="email"
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.5, ease }}
              >
                <label className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className={inputCls}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted/60 transition hover:bg-ink/5 hover:text-ink"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Options row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-5 flex items-center justify-between"
            >
              <label className="flex cursor-pointer select-none items-center gap-2 text-xs text-muted">
                <span className="relative inline-flex">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-[5px] border border-ink/20 bg-surface-2 transition checked:border-accent checked:bg-accent"
                  />
                  <svg
                    viewBox="0 0 16 16"
                    className="pointer-events-none absolute left-0 top-0 h-4 w-4 scale-0 text-canvas transition-transform duration-200 peer-checked:scale-100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M12 5L6.5 10.5 4 8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                Remember me
              </label>
              <button
                type="button"
                className="text-xs font-medium text-accent transition hover:opacity-70"
              >
                Forgot password?
              </button>
            </motion.div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.5, ease }}
              className="group mt-6 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-ink py-3.5 text-sm font-semibold text-canvas shadow-[0_16px_40px_-12px_rgba(21,20,15,0.5)] transition-all duration-300 hover:bg-accent hover:shadow-accent/25 hover:shadow-[0_16px_40px_-12px] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <>
                  <span>Continue to Studio</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </motion.button>

            {/* Demo hint */}
            <div className="mt-5 flex items-center justify-center gap-2 rounded-full border border-dashed border-ink/15 bg-ink/[0.02] px-4 py-2 text-[11px] text-muted">
              <KeyRound size={12} className="shrink-0 text-accent" />
              <span>Demo access</span>
              <button type="button" onClick={fillDemo} className="underline underline-offset-2 transition hover:text-ink">
                auto fill
              </button>
            </div>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted/70"
          >
            Protected · Routed · Whole
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-canvas">
          <Loader2 className="h-6 w-6 animate-spin text-muted" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}