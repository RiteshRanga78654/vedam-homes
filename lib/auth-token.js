import crypto from "crypto";

export const COOKIE_NAME = "vedam_admin_session";
export const SESSION_TTL = 60 * 60 * 12; // 12 hours

function secret() {
  return process.env.ADMIN_SECRET || "vedam-homes-dev-secret";
}

export function signToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret())
    .update(body)
    .digest("base64url");
  return `${body}.${signature}`;
}

export function verifyToken(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, signature] = parts;
  if (!body || !signature) return null;
  const expected = crypto
    .createHmac("sha256", secret())
    .update(body)
    .digest("base64url");
  const given = Buffer.from(signature);
  const want = Buffer.from(expected);
  if (given.length !== want.length || !crypto.timingSafeEqual(given, want)) {
    return null;
  }
  let payload;
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (!payload || typeof payload.exp !== "number" || payload.exp < Date.now()) {
    return null;
  }
  return payload;
}