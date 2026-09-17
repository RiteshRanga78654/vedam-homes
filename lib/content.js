import { useDb } from "./config/db.js";
import Article from "./models/Article.js";

/**
 * Server-side helpers used by the public article pages.
 * Falls back gracefully to seed data if Mongo is not reachable
 * so the marketing pages never crash.
 */

async function mongo() {
  return await useDb();
}

/** Turn a Mongo doc into a plain object a client component can receive. */
function clean(doc) {
  return JSON.parse(JSON.stringify(doc));
}

/** Frontend expects dateISO + date strings; Mongo stores dates as ISO strings. */
function decorate(article) {
  const plain = clean(article);
  const ts = new Date(
    plain.publishedAt || plain.createdAt || plain.updatedAt || Date.now()
  );
  return {
    ...plain,
    dateISO: plain.dateISO || ts.toISOString().slice(0, 10),
    date:
      plain.date ||
      ts.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
  };
}

export async function getPublishedArticles() {
  if (await mongo()) {
    const items = await Article.find({ status: "published" })
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();
    if (items.length) return items.map(decorate);
  }
  const { default: articles } = await import("@/data/articles");
  return articles;
}

export async function getPublishedArticle(slug) {
  if (await mongo()) {
    const item = await Article.findOne({ status: "published", slug }).lean();
    if (item) return decorate(item);
  }
  const { default: articles } = await import("@/data/articles");
  return articles.find((a) => a.slug === slug || a.id === slug) || null;
}