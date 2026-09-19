import mongoose from "mongoose";

let cached = { conn: null, promise: null };

/**
 * MongoDB connection using Mongoose.
 * We cache the connection so hot reloads don't spam the database
 * with new connections on every dev request.
 */
export async function useDb() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is missing. Add it to .env.local');
    return null;
  }

if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 15000,
        tls: true,
      })
      .then((mongooseInstance) => mongooseInstance)
      .catch((err) => {
        cached.promise = null;
        console.error("MongoDB connection error:", err.message);
        return null;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}