import mongoose from "mongoose";
import { uid, slugify } from "../store.js";

/**
 * Blog post — simpler than an article. Content is a plain text string.
 */
const BlogSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    slug: { type: String, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    image: { type: String, default: "" },
    author: { type: String, default: "Vedam Studio" },
    category: { type: String, default: "Company" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

BlogSchema.pre("save", function () {
  if (!this.id) this.id = uid();
  if (!this.slug) this.slug = slugify(this.title) || this.id;
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);