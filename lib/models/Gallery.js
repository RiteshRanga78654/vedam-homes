import mongoose from "mongoose";
import { uid } from "../store.js";

/**
 * A single gallery image managed from the admin dashboard and
 * rendered on the public /gallery page.
 */
const GallerySchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    src: { type: String, required: true },
    title: { type: String, default: "" },
    category: { type: String, default: "Architecture" },
    size: { type: String, default: "regular" },
    order: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

GallerySchema.pre("save", function () {
  if (!this.id) this.id = uid();
});

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);