/**
 * One-time seed script.
 *   npm run seed
 *
 * Seeds:
 *  - the admin user (from .env.local creds, bcrypt-hashed)
 *  - projects, articles, team, about, activity from data/store json
 * Run when the DB is empty. Safe to re-run — it skips existing data.
 */
import "dotenv/config";
import { config as loadEnv } from "dotenv";
import { existsSync } from "fs";

// Next.js reads .env.local — load it here the same way.
for (const file of [".env.local", ".env"]) {
  if (existsSync(file)) loadEnv({ path: file, override: true });
}
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storeDir = path.join(__dirname, "..", "data", "store");

const { default: Admin } = await import("../lib/models/Admin.js");
const { default: Project } = await import("../lib/models/Project.js");
const { default: Article } = await import("../lib/models/Article.js");
const { default: Blog } = await import("../lib/models/Blog.js");
const { default: Team } = await import("../lib/models/Team.js");
const { default: Query } = await import("../lib/models/Query.js");
const { default: About } = await import("../lib/models/About.js");
const { default: Activity } = await import("../lib/models/Activity.js");

async function readJSON(name) {
  try {
    return JSON.parse(await readFile(path.join(storeDir, name), "utf8"));
  } catch {
    return null;
  }
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@vedamhomes.com";
  const exists = await Admin.findOne({ email });
  if (exists) {
    console.log("• Admin already exists —", email);
    return;
  }
  const password = process.env.ADMIN_PASSWORD || "vedamhomes";
  await Admin.create({
    name: process.env.ADMIN_NAME || "Vedam Studio",
    email,
    password: await bcrypt.hash(password, 10),
    role: "Super Admin",
    status: "Active",
  });
  console.log("✓ Admin created —", email);
}

async function seedCollection(model, name, singular) {
  const docs = await readJSON(`${name}.json`);
  if (!docs || docs.length === 0) {
    console.log(`• No ${name}.json data to seed`);
    return;
  }
  const count = await model.countDocuments();
  if (count > 0) {
    console.log(`• ${name} already has ${count} docs — skipping`);
    return;
  }
  await model.insertMany(docs);
  console.log(`✓ Seeded ${docs.length} ${singular}`);
}

async function seedAbout() {
  const doc = await readJSON("about.json");
  if (!doc) {
    console.log("• No about.json data to seed");
    return;
  }
  if ((await About.countDocuments()) > 0) {
    console.log("• about already seeded — skipping");
    return;
  }
  await About.create(doc);
  console.log("✓ Seeded about");
}

async function main() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI missing from .env.local");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000,
      tls: true,
    });
    console.log("Connected to Mongo ✓");
  } catch (err) {
    console.error("Mongo connection failed:", err.message);
    process.exit(1);
  }

  await seedAdmin();
  await seedCollection(Project, "projects", "projects");
  await seedCollection(Article, "articles", "articles");
  await seedCollection(Blog, "blogs", "blogs");
  await seedCollection(Team, "team", "team members");
  await seedCollection(Query, "queries", "queries");
  await seedCollection(Activity, "activity", "activity entries");
  await seedAbout();

  await mongoose.disconnect();
  console.log("Done ✓");
}

main();