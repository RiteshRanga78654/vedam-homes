import mongoose from "mongoose";
import { uid, ROLES } from "../store.js";

const ROLE_ENUM = Object.keys(ROLES);

/**
 * Team member — who has access to the dashboard and what role.
 * Password is hashed with bcrypt before saving (see controller).
 */
const TeamSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, lowercase: true },
    password: { type: String },
    role: { type: String, enum: ROLE_ENUM, default: "Content Manager" },
    status: { type: String, enum: ["Active", "Invited", "Suspended"], default: "Active" },
    lastActive: { type: Date },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

TeamSchema.pre("save", function () {
  if (!this.id) this.id = uid();
});

// Never expose the password hash through JSON responses.
TeamSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);