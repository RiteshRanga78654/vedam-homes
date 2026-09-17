import mongoose from "mongoose";
import { uid } from "../store.js";

/**
 * Visitor enquiry from the public contact form.
 */
const QuerySchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, default: "" },
    message: { type: String, default: "" },
    interest: { type: String, default: "General inquiry" },
    relatedProject: { type: String, default: "" },
    source: { type: String, default: "Website" },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Resolved"],
      default: "New",
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

QuerySchema.pre("save", function () {
  if (!this.id) this.id = uid();
});

export default mongoose.models.Query || mongoose.model("Query", QuerySchema);