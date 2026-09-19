/*
 * VEDAM HOMES — ADMIN STORE
 * ------------------------------------------------------------------
 * No external database exists on this site; all content lives in
 * static modules under /data. This module turns that directory into a
 * small, portable, file-backed content store used by the admin
 * dashboard. Entities read through here are seeded once from the
 * live site data (articles, projects, about, team) and then persist
 * any admin edits as JSON under /data/store.
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import siteArticles from "@/data/articles";
import siteProjects from "@/data/projects";
import { stats as siteStats } from "@/data/stats";

const STORE_DIR = path.join(process.cwd(), "data", "store");
export const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export const uid = () => crypto.randomUUID();

export function slugify(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const PROJECT_STATUS_MAP = {
  "Ready to Move": "Completed",
  "Under Construction": "Upcoming",
  "Now Selling": "Active",
};

export const ROLES = {
  "Super Admin": {
    label: "Super Admin",
    permissions: { content: true, projects: true, team: true, queries: true },
  },
  Admin: {
    label: "Admin",
    permissions: { content: true, projects: true, team: false, queries: true },
  },
  Editor: {
    label: "Editor",
    permissions: { content: true, projects: true, team: false, queries: false },
  },
  "Content Manager": {
    label: "Content Manager",
    permissions: { content: true, projects: false, team: false, queries: false },
  },
};

/* ------------------------------------------------------------------ */
/* File helpers                                                        */
/* ------------------------------------------------------------------ */

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function storePath(name) {
  ensureDir(STORE_DIR);
  return path.join(STORE_DIR, `${name}.json`);
}

function readJson(name) {
  const file = storePath(name);
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function writeJson(name, data) {
  const file = storePath(name);
  ensureDir(STORE_DIR);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}

/* ------------------------------------------------------------------ */
/* Seeds                                                               */
/* ------------------------------------------------------------------ */

function seedArticles() {
  return siteArticles.map((a) => {
    const publishedAt = a.dateISO ? new Date(`${a.dateISO}T00:00:00`) : null;
    return {
      id: a.id || uid(),
      slug: a.id,
      title: a.title,
      excerpt: a.excerpt,
      image: a.image,
      category: a.category,
      author: a.author,
      authorRole: a.authorRole,
      readingTime: a.readingTime,
      featured: !!a.featured,
      popular: !!a.popular,
      status: "published",
      publishedAt: publishedAt ? publishedAt.toISOString() : null,
      updatedAt: publishedAt ? publishedAt.toISOString() : null,
      content: a.content || [],
    };
  });
}

function seedProjects() {
  return siteProjects.map((p, i) => {
    const today = new Date();
    const updated = new Date(today);
    updated.setDate(updated.getDate() - ((i * 11) % 30));
    return {
      id: p.id || uid(),
      slug: p.id,
      name: p.name,
      location: p.location,
      type: p.type,
      status: PROJECT_STATUS_MAP[p.status] || "Active",
      statusLabel: p.status,
      description: p.description,
      price: p.price,
      image: p.image,
      gallery: p.gallery || [],
      details: "",
      updatedAt: updated.toISOString(),
      createdAt: updated.toISOString(),
    };
  });
}

function seedBlogs() {
  return [];
}

function seedTeam() {
  return [
    {
      id: "m-singla",
      name: "CA Raman Singla",
      email: "raman@vedamhomes.com",
      role: "Super Admin",
      status: "Active",
      lastActive: null,
      createdAt: null,
    },
    {
      id: "m-adarsh",
      name: "Ar. Adarsh K.",
      email: "adarsh@vedamhomes.com",
      role: "Editor",
      status: "Active",
      lastActive: null,
      createdAt: null,
    },
    {
      id: "m-priya",
      name: "Priya Reddy",
      email: "priya@vedamhomes.com",
      role: "Editor",
      status: "Active",
      lastActive: null,
      createdAt: null,
    },
    {
      id: "m-studio",
      name: "The Vedam Studio",
      email: "studio@vedamhomes.com",
      role: "Content Manager",
      status: "Active",
      lastActive: null,
      createdAt: null,
    },
  ];
}

function seedQueries() {
  return [];
}

function seedAbout() {
  return {
    hero: {
      eyebrow: "The Vision Behind Vedam Homes",
      title: "Where timeless wisdom meets thoughtful living.",
      body: "When I founded Vedam Homes, I envisioned a name that would represent more than just construction — it would embody a deeper spiritual heritage and timeless wisdom. This philosophy guides every space we create, ensuring that each home reflects harmony, balance, and refined living.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      founderName: "CA Raman Singla",
      founderRole: "Founder & Visionary",
      est: "Est. 2014",
    },
    quote: {
      text: "“O great house builder, impart this satisfaction to us that thou art a giver of an abode free from diseases. Let thee bring happiness to our bipeds and quadrupeds.”",
      attribution: "— Rig Veda",
    },
    story: {
      eyebrow: "The Founder's Philosophy",
      title: "A name rooted in heritage, built on vision.",
      paragraphs: [
        "While “Vedam” is commonly linked with learning and enlightenment, my aspiration goes beyond the conventional. In ancient times, the Rig Veda was closely associated with builders and construction, emphasizing harmony, balance, and prosperity.",
        "Vedam Homes isn't just about luxury — it is about creating a lifestyle of elegance, convenience, and pure bliss. As a distinguished name in real estate in Gurugram, every space we create is thoughtfully curated to elevate everyday living, blending refined design with comfort, functionality, and timeless appeal.",
        "Driven by inspiration and commitment, I vow to continuously raise our standards and deliver more than just houses — a legacy of trust, comfort, and happiness. This journey is only the beginning. I remain dedicated to ensuring that every home we create becomes a place where happiness, health, and prosperity truly flourish.",
      ],
      signature: "CA Raman Singla",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    },
    overview: {
      eyebrow: "Know About Us",
      title: "Where luxury meets thoughtful living.",
      body: "Welcome to Vedam Homes — a collection of limited-edition residences where luxury meets thoughtful living. Vedam Homes is a luxury real estate developer based in Gurugram, specializing in ultra-luxury floors and residences that seamlessly blend exquisite design with practical living. Each of our super luxury residences is meticulously crafted with exceptional attention to detail, ensuring every corner reflects elegance, comfort, and sophistication. Renowned for offering some of the most sought-after luxury floors in South of Gurugram, we believe in building not just homes, but trust and lasting value. With a limited and exclusive inventory, Vedam Homes delivers unmatched privacy and a true sense of belonging for discerning homeowners.",
      values: [
        {
          title: "Limited Edition",
          desc: "Exclusive inventory ensuring privacy and a true sense of belonging.",
        },
        {
          title: "Meticulously Crafted",
          desc: "Exceptional attention to detail in every corner of every residence.",
        },
        {
          title: "Lasting Value",
          desc: "Building trust and enduring value through quality and design excellence.",
        },
      ],
    },
    stats: siteStats.map((s) => ({ value: s.value, suffix: s.suffix, label: s.label })),
    faqs: [
      {
        question: "Who is the founder of Vedam Homes?",
        answer:
          "Vedam Homes was founded by CA Raman Singla, whose vision was to create thoughtfully designed luxury residences that combine elegance, comfort, and long-term value. His philosophy focuses on creating homes that bring harmony, balance, and modern living together.",
      },
      {
        question: "What makes Vedam Homes different from other real estate developers in Gurgaon?",
        answer:
          "Vedam Homes stands out for its focus on limited-edition luxury floors, refined architecture, and thoughtfully planned living spaces. The company emphasizes quality construction, premium materials, and modern design to deliver luxury homes in Gurgaon that offer both comfort and exclusivity.",
      },
      {
        question: "Where are Vedam Homes luxury properties located in Gurgaon?",
        answer:
          "Vedam Homes luxury residences are located in prime areas such as Central Park Flower Valley in South of Gurugram. These locations offer excellent connectivity, peaceful surroundings, and access to modern infrastructure, making them ideal for luxury living and real estate investment.",
      },
    ],
  };
}

function seedActivity() {
  const events = [];
  siteArticles.forEach((a) => {
    if (!a.dateISO) return;
    events.push({
      id: uid(),
      type: "article",
      action: "published",
      title: a.title,
      detail: a.category,
      at: new Date(`${a.dateISO}T00:00:00Z`).toISOString(),
    });
  });
  events.push({
    id: uid(),
    type: "system",
    action: "initialised",
    title: "Admin workspace ready",
    detail: `Imported ${siteArticles.length} articles and ${siteProjects.length} projects from the live site.`,
    at: new Date().toISOString(),
  });
  return events;
}

/* ------------------------------------------------------------------ */
/* Public accessors                                                    */
/* ------------------------------------------------------------------ */

function collection(name, seeder) {
  return {
    get: () => {
      const existing = readJson(name);
      if (existing) return existing;
      const seeded = seeder();
      writeJson(name, seeded);
      return seeded;
    },
    set: (list) => {
      writeJson(name, list);
      return list;
    },
  };
}

const articles = collection("articles", seedArticles);
const blogs = collection("blogs", seedBlogs);
const projects = collection("projects", seedProjects);
const team = collection("team", seedTeam);
const queries = collection("queries", seedQueries);
const about = collection("about", seedAbout);
const activity = collection("activity", seedActivity);

export const getArticles = () => articles.get();
export const saveArticles = (list) => articles.set(list);
export const getBlogs = () => blogs.get();
export const saveBlogs = (list) => blogs.set(list);
export const getProjects = () => projects.get();
export const saveProjects = (list) => projects.set(list);
export const getTeam = () => team.get();
export const saveTeam = (list) => team.set(list);
export const getQueries = () => queries.get();
export const saveQueries = (list) => queries.set(list);
export const getAbout = () => about.get();
export const saveAbout = (doc) => about.set(doc);

export function getActivity(limit = 200) {
  const list = activity.get();
  return list.slice(0, limit);
}

export function logActivity({ type, action, title, detail = "" }) {
  const list = activity.get();
  list.unshift({
    id: uid(),
    type,
    action,
    title,
    detail,
    at: new Date().toISOString(),
  });
  activity.set(list.slice(0, 300));
}

/** Public site view of articles: authored/published articles with the
 * `dateISO` / `date` fields the frontend renders and sorts by. Reads the
 * admin-managed store so admin edits reflect on the public pages. */
function toSiteArticle(article) {
  const ts = new Date(article.publishedAt || article.updatedAt || Date.now());
  const dateISO = Number.isNaN(ts.getTime()) ? null : ts.toISOString().slice(0, 10);
  return {
    ...article,
    dateISO: article.dateISO || dateISO,
    date:
      article.date ||
      ts.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
  };
}

export function getSiteArticles() {
  return getArticles().filter((a) => a.status === "published").map(toSiteArticle);
}

export function touchMember(id, lastActive = new Date().toISOString()) {
  const list = team.get();
  const member = list.find((m) => m.id === id);
  if (member) {
    member.lastActive = lastActive;
    team.set(list);
  }
}