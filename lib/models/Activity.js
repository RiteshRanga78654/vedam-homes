import mongoose from "mongoose";

/**
 * Activity log — feeds the "Recent Activity" panel on the overview page.
 */
const ActivitySchema = new mongoose.Schema(
  {
    id: { type: String },
    type: { type: String, enum: ["article", "blog", "project", "team", "query", "system"], default: "system" },
    action: { type: String, default: "updated" },
    title: { type: String, default: "" },
    detail: { type: String, default: "" },
    at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);