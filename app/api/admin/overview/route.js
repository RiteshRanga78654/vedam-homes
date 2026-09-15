import { NextResponse } from "next/server";
import { guard, unauthorized } from "@/lib/api";
import {
  getArticles,
  getBlogs,
  getProjects,
  getTeam,
  getQueries,
  getActivity,
} from "@/lib/store";

function monthKey(iso) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function monthLabel(key) {
  const [y, m] = key.split("-");
  return new Date(Date.UTC(Number(y), Number(m) - 1, 1)).toLocaleString("en-IN", {
    month: "short",
    year: "2-digit",
  });
}

function queriesOverTime(queries) {
  const buckets = new Map();
  queries.forEach((q) => {
    const key = monthKey(q.createdAt || new Date().toISOString());
    buckets.set(key, (buckets.get(key) || 0) + 1);
  });
  return [...buckets.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, value]) => ({ label: monthLabel(key), value }));
}

export async function GET() {
  const session = await guard();
  if (!session) return unauthorized();

  const articles = getArticles();
  const blogs = getBlogs();
  const projects = getProjects();
  const team = getTeam();
  const queries = getQueries();

  const publishedArticles = articles.filter((a) => a.status === "published").length;
  const publishedBlogs = blogs.filter((b) => b.status === "published").length;
  const publishedProjects = projects.filter((p) => p.status === "Active").length;
  const newQueries = queries.filter((q) => q.status === "New").length;

  const projectStatusBuckets = [
    { key: "active", label: "Active", value: projects.filter((p) => p.status === "Active").length },
    { key: "completed", label: "Completed", value: projects.filter((p) => p.status === "Completed").length },
    { key: "upcoming", label: "Upcoming", value: projects.filter((p) => p.status === "Upcoming").length },
  ].filter((b) => b.value > 0);

  const contentOverview = [
    { key: "articles", label: "Journal Articles", value: articles.length, sub: `${publishedArticles} published` },
    { key: "blogs", label: "Blog Posts", value: blogs.length, sub: `${publishedBlogs} published` },
    { key: "projects", label: "Projects", value: projects.length, sub: `${publishedProjects} active` },
  ];

  const data = {
    kpis: {
      totalProjects: { value: projects.length, sub: `${projects.filter((p) => p.status === "Active").length} active` },
      totalArticles: { value: articles.length, sub: `${publishedArticles} published` },
      totalBlogs: { value: blogs.length, sub: "in the blog store" },
      teamMembers: { value: team.length, sub: `${team.filter((m) => m.status === "Active").length} active` },
      newQueries: { value: newQueries, sub: `${queries.length} total inquiries` },
      publishedContent: {
        value: publishedArticles + publishedBlogs + publishedProjects,
        sub: "pieces live on the site",
      },
    },
    contentOverview,
    projectStatus: projectStatusBuckets,
    queriesOverTime: queriesOverTime(queries),
    recentActivity: getActivity(10),
    labels: {
      queriesNote:
        "Queries land here automatically when visitors submit the public contact form.",
    },
  };

  return NextResponse.json({ ok: true, data });
}