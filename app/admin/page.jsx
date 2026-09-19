"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Newspaper,
  NotebookPen,
  Users,
  Inbox,
  CheckCircle2,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import DonutChart from "@/components/admin/charts/DonutChart";
import HBarChart from "@/components/admin/charts/HBarChart";
import AreaChart from "@/components/admin/charts/AreaChart";
import LoadingSkeleton from "@/components/admin/LoadingSkeleton";
import { projectToneColors, chartPalette, timeAgo } from "@/components/admin/ui";
import { apiFetch } from "@/components/admin/hooks";

const TYPE_ICONS = {
  article: Newspaper,
  blog: NotebookPen,
  project: Building2,
  team: Users,
  query: Inbox,
  system: CheckCircle2,
};

export default function OverviewPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const json = await apiFetch("/api/v1/overview");
        if (alive) setData(json);
      } catch (err) {
        if (alive) setError(err.message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 pt-2">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[130px] rounded-2xl border border-ink/8 bg-surface admin-shimmer"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-10 text-center">
        <p className="text-sm text-red-600">Failed to load overview: {error}</p>
      </div>
    );
  }

  const kpis = data?.kpis || {};
  const kpiCards = [
    { label: "Total Projects", value: kpis.totalProjects?.value ?? 0, sub: kpis.totalProjects?.sub, icon: Building2, accent: "green" },
    { label: "Total Articles", value: kpis.totalArticles?.value ?? 0, sub: kpis.totalArticles?.sub, icon: Newspaper, accent: "bronze" },
    { label: "Total Blogs", value: kpis.totalBlogs?.value ?? 0, sub: kpis.totalBlogs?.sub, icon: NotebookPen, accent: "amber" },
    { label: "Team Members", value: kpis.teamMembers?.value ?? 0, sub: kpis.teamMembers?.sub, icon: Users, accent: "sky" },
    { label: "New Queries", value: kpis.newQueries?.value ?? 0, sub: kpis.newQueries?.sub, icon: Inbox, accent: "clay" },
    { label: "Published Content", value: kpis.publishedContent?.value ?? 0, sub: kpis.publishedContent?.sub, icon: CheckCircle2, accent: "green" },
  ];

  return (
    <div className="space-y-8 pt-1 pb-8">
      {/* KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpiCards.map((card, i) => (
          <StatCard key={card.label} index={i} {...card} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Content Overview */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-ink/[0.09] dark:border-ink/[0.07] bg-surface p-6 shadow-[0_2px_12px_rgba(21,20,15,0.07),0_1px_3px_rgba(21,20,15,0.04)]"
        >
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-display text-base tracking-tight text-ink">
              Content Overview
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">
              Live
            </span>
          </div>
          <HBarChart
            data={(data?.contentOverview || []).map((d, i) => ({
              ...d,
              color: chartPalette[i % chartPalette.length],
            }))}
            height={28}
          />
        </motion.div>

        {/* Project Status Donut */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-ink/[0.09] dark:border-ink/[0.07] bg-surface p-6 shadow-[0_2px_12px_rgba(21,20,15,0.07),0_1px_3px_rgba(21,20,15,0.04)]"
        >
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-display text-base tracking-tight text-ink">
              Project Status
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">
              Distribution
            </span>
          </div>
          <DonutChart
            data={(data?.projectStatus || []).map((d) => ({
              ...d,
              color: projectToneColors[d.label] || chartPalette[0],
            }))}
          />
        </motion.div>
      </div>

      {/* Queries + Activity Row */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Queries Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-ink/[0.09] dark:border-ink/[0.07] bg-surface p-6 shadow-[0_2px_12px_rgba(21,20,15,0.07),0_1px_3px_rgba(21,20,15,0.04)] lg:col-span-3"
        >
          <div className="mb-1 flex items-center justify-between">
            <h3 className="font-display text-base tracking-tight text-ink">
              Queries Over Time
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">
              30d
            </span>
          </div>
          {data?.labels?.queriesNote && (!data.queriesOverTime || data.queriesOverTime.length === 0) && (
            <p className="mb-4 text-xs text-ink/50">{data.labels.queriesNote}</p>
          )}
          <AreaChart
            data={data?.queriesOverTime || []}
            height={180}
            emptyNote="Queries will appear here once visitors submit the contact form."
          />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.54, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-2xl border border-ink/[0.09] dark:border-ink/[0.07] bg-surface shadow-[0_2px_12px_rgba(21,20,15,0.07),0_1px_3px_rgba(21,20,15,0.04)] lg:col-span-2"
        >
          <h3 className="border-b border-ink/[0.09] dark:border-ink/[0.07] px-6 py-4 font-display text-base tracking-tight text-ink">
            Recent Activity
          </h3>
          <div className="admin-scroll max-h-[340px] overflow-y-auto">
            {(data?.recentActivity || []).length === 0 ? (
              <p className="px-6 py-10 text-center text-sm text-ink/55">No activity yet</p>
            ) : (
              (data?.recentActivity || []).map((a) => {
                const Icon = TYPE_ICONS[a.type] || CheckCircle2;
                return (
                  <div
                    key={a.id}
                    className="flex items-start gap-3 border-b border-ink/[0.06] dark:border-ink/[0.05] px-6 py-3.5 last:border-0"
                  >
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon size={14} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-ink/80">
                        <span className="font-medium text-ink">{a.title}</span>
                        <span className="mx-1 text-ink/35">·</span>
                        {a.action}
                      </p>
                      {a.detail && (
                        <p className="mt-0.5 truncate text-xs text-ink/55">{a.detail}</p>
                      )}
                      <p className="mt-0.5 font-mono text-[10px] text-ink/45">{timeAgo(a.at)}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}