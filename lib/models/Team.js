import mongoose from "mongoose";
import { uid, ROLES } from "../store.js";

const ROLE_ENUM = Object.keys(ROLES);

/**
 * Team member — who has access to the dashboard and what role.
 */
const TeamSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, lowercase: true },
    role: { type: String, enum: ROLE_ENUM, default: "Content Manager" },
    status: { type: String, enum: ["Active", "Invited", "Suspended"], default: "Active" },
    lastActive: { type: Date },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

TeamSchema.pre("save", function () {
  if (!this.id) this.id = uid();
});

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);