import { useDb } from "../config/db.js";
import Project from "../models/Project.js";
import Article from "../models/Article.js";
import Blog from "../models/Blog.js";
import Team from "../models/Team.js";
import Query from "../models/Query.js";
import Activity from "../models/Activity.js";
import { ok, dbDown } from "../api.js";

export async function getOverview() {
  if (!(await useDb())) return dbDown();

  const [totalProjects, totalArticles, totalBlogs, teamMembers, newQueries, publishedArticles, publishedBlogs] =
    await Promise.all([
      Project.countDocuments(),
      Article.countDocuments(),
      Blog.countDocuments(),
      Team.countDocuments(),
      Query.countDocuments({ status: "New" }),
      Article.countDocuments({ status: "published" }),
      Blog.countDocuments({ status: "published" }),
    ]);

  const kpis = {
    totalProjects: { value: totalProjects, sub: "All projects" },
    totalArticles: { value: totalArticles, sub: "Journal articles" },
    totalBlogs: { value: totalBlogs, sub: "Blog posts" },
    teamMembers: { value: teamMembers, sub: "Team & access" },
    newQueries: { value: newQueries, sub: "Unread enquiries" },
    publishedContent: { value: publishedArticles + publishedBlogs, sub: "Live on site" },
  };

  const contentOverview = [
    { label: "Projects", value: totalProjects },
    { label: "Articles", value: totalArticles },
    { label: "Blogs", value: totalBlogs },
    { label: "Team", value: teamMembers },
    { label: "Queries", value: await Query.countDocuments() },
  ];

  const projectStatuses = await Project.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  const projectStatus = projectStatuses.map((s) => ({
    label: s._id || "Unknown",
    value: s.count,
  }));

  // Last 30 days of queries, one bucket per day.
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - 29);

  const queryBuckets = await Query.aggregate([
    { $match: { createdAt: { $gte: start } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
  ]);
  const bucketMap = Object.fromEntries(queryBuckets.map((b) => [b._id, b.count]));
  const queriesOverTime = [];
  const today = new Date();
  for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    queriesOverTime.push({ date: label, value: bucketMap[key] || 0 });
  }

  const recent = await Activity.find().sort({ at: -1 }).limit(12).lean();

  return ok({
    kpis,
    contentOverview,
    projectStatus,
    queriesOverTime,
    labels: {
      queriesNote: totalProjects === 0 && totalArticles === 0 ? "No content yet" : "",
    },
    recentActivity: recent.map((a) => ({
      id: a._id.toString(),
      type: a.type,
      action: a.action,
      title: a.title,
      detail: a.detail,
      at: a.at,
    })),
  });
}