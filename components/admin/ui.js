/*
 * Shared class strings + tone/palette maps for the admin dashboard.
 * Kept in one module so the entire dashboard shares the same visual
 * language and no class combinations drift between pages.
 */

export const inputCls =
  "w-full rounded-xl border border-ink/10 bg-surface-2/60 px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 transition focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

export const labelCls =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-canvas transition-all duration-300 hover:bg-accent hover:shadow-accent/25 transition";

export const btnAccent =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-[#15140f] transition-all duration-300 hover:shadow-[0_8px_24px_-8px_rgba(110,90,60,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98] disabled:opacity-50";

export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-ink/10 bg-transparent px-4 py-2.5 text-sm font-medium text-ink/80 transition-all duration-300 hover:bg-ink/[0.04] hover:text-ink active:scale-[0.98] disabled:opacity-50";

export const btnDanger =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-600 transition-all duration-300 hover:bg-red-500/20 hover:text-red-700 active:scale-[0.98] disabled:opacity-50";

export const card =
  "rounded-2xl border border-ink/8 bg-surface shadow-[0_1px_2px_rgba(21,20,15,0.04)]";

export const sectionTitle = "font-display text-xl tracking-tight text-ink";

export const eyebrow =
  "font-mono text-[10px] uppercase tracking-[0.3em] text-muted";

export const navigation = [
  {
    section: "Main",
    items: [{ href: "/admin", label: "Overview", icon: "LayoutDashboard", end: true }],
  },
  {
    section: "Content",
    items: [
      { href: "/admin/articles", label: "Articles", icon: "Newspaper", end: false },
      { href: "/admin/blogs", label: "Blogs", icon: "NotebookPen", end: false },
      { href: "/admin/projects", label: "Projects", icon: "Building2", end: false },
      { href: "/admin/gallery", label: "Gallery", icon: "Images", end: false },
      { href: "/admin/about", label: "About Us", icon: "Info", end: false },
    ],
  },
  {
    section: "Management",
    items: [
      { href: "/admin/team", label: "Team Access", icon: "Users", end: false },
      { href: "/admin/queries", label: "Queries", icon: "Inbox", end: false },
    ],
  },
];

export const chartPalette = ["#6e5a3c", "#a68a5c", "#948a76", "#42574b", "#8a6d43", "#b3402a", "#4a5a6e"];

export const projectToneColors = {
  Active: "#42574b",
  Completed: "#a68a5c",
  Upcoming: "#948a76",
};

export const BADGE_TONES = {
  good: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  warn: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
  info: "bg-sky-600/10 text-sky-700 dark:text-sky-300 border-sky-500/20",
  danger: "bg-red-500/10 text-red-600 dark:text-red-300 border-red-500/20",
  accent: "bg-accent/15 text-accent border-accent/25",
  neutral: "bg-ink/[0.05] text-muted border-ink/10",
};

export const STATUS_TONE = {
  published: "good",
  draft: "warn",
  active: "good",
  completed: "accent",
  upcoming: "info",
  New: "accent",
  Contacted: "info",
  "In Progress": "info",
  Resolved: "good",
  Active: "good",
  Invited: "warn",
  Suspended: "danger",
};

export const QUERY_STATUSES = ["New", "Contacted", "In Progress", "Resolved"];
export const ARTICLE_CATEGORIES = ["Real Estate", "Investment", "Architecture", "Interiors", "Lifestyle", "Design"];
export const BLOG_CATEGORIES = ["Company", "Projects", "Design", "Community", "Announcements"];
export const PROJECT_STATUSES = ["Active", "Completed", "Upcoming"];

export const TIME_FORMAT_OPTIONS = {
  day: "numeric",
  month: "short",
  year: "numeric",
};

export function formatDate(iso, opts = TIME_FORMAT_OPTIONS) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", opts);
}

export function timeAgo(iso) {
  if (!iso) return "—";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";
  const seconds = Math.round((Date.now() - then) / 1000);
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [label, secs] of units) {
    const v = Math.floor(seconds / secs);
    if (v >= 1) return `${v} ${label}${v > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

