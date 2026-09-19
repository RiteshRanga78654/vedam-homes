import mongoose from "mongoose";
import { ROLES } from "../store.js";

const ROLE_ENUM = Object.keys(ROLES);

/**
 * Admin user — who can log into the dashboard.
 * Password is hashed with bcrypt before saving.
 */
const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ROLE_ENUM, default: "Admin" },
    status: { type: String, enum: ["Active", "Invited", "Suspended"], default: "Active" },
    lastActive: { type: Date },
  },
  { timestamps: true }
);

// Hide the password whenever this model gets converted to JSON.
AdminSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);