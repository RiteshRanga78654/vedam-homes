/**
 * Client helpers for communicating with the Vedam Homes backend.
 * Currently posts straight to the Next.js API (no separate server).
 */

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path, { method = "POST", body = null } = {}) {
  let res;
  try {
    res = await fetch(path, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("Network error", 0);
  }

  let json = null;
  try {
    json = await res.json();
  } catch {
    /* non-json body */
  }

  if (!res.ok) {
    throw new ApiError(json?.error || "Request failed", res.status);
  }
  return json?.data;
}

export const queryApi = {
  create: (payload) => request("/api/v1/mail", { body: payload }),
};