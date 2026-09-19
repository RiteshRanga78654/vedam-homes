import mongoose from "mongoose";

let cached = { conn: null };

/**
 * MongoDB connection — returns connection or null.
 * Designed for Vercel serverless: fresh process each time,
 * so we only cache the conn object, not a promise.
 */
export async function useDb() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is missing. Add it to Vercel env vars');
    return null;
  }

  try {
    const mongooseInstance = await mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000,
      tls: true,
    });
    cached.conn = mongooseInstance;
    return cached.conn;
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    return null;
  }
}