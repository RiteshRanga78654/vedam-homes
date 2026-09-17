import mongoose from "mongoose";
import { slugify, uid } from "../store.js";

const ArticleSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true
    },
    slug: {
      type: String,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      default: "Real Estate"
    },
    author: {
      type: String,
      default: "Vedam Studio"
    },
    authorRole: {
      type: String,
      default: ""
    },
    readingTime: {
      type: String,
      default: "3 min read"
    },
    featured: {
      type: Boolean,
      default: false
    },
    popular: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft"
    },
    content: [
      {
        type: {
          type: String,
          enum: ["lead", "p", "h2", "quote", "bullets"],
          default: "p",
        },
        text: { type: String, default: "" },
        items: [{ type: String }],
      },
    ],
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

// Auto-generate the short id and slug on first save.
ArticleSchema.pre("save", function () {
  if (!this.id) this.id = uid();
  if (!this.slug) this.slug = slugify(this.title) || this.id;
});

export default mongoose.models.Article || mongoose.model("Article", ArticleSchema);