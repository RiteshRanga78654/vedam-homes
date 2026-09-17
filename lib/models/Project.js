import mongoose from "mongoose";
import { uid, slugify } from "../store.js";

/**
 * Real-estate project. Gallery holds an array of image urls/strings.
 */
const ProjectSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    slug: { type: String, unique: true },
    name: { type: String, required: true },
    location: { type: String, default: "" },
    type: { type: String, default: "Residence" },
    status: { type: String, enum: ["Active", "Completed", "Upcoming"], default: "Active" },
    price: { type: String, default: "On Request" },
    description: { type: String, default: "" },
    details: { type: String, default: "" },
    image: { type: String, default: "" },
    gallery: [{ type: String }],
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

ProjectSchema.pre("save", function () {
  if (!this.id) this.id = uid();
  if (!this.slug) this.slug = slugify(this.name) || this.id;
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);