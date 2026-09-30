"use client";

import { useCallback, useEffect, useState } from "react";

async function apiFetch(path, options = {}) {
  // A FormData body must NOT carry an explicit Content-Type — the browser
  // has to append the multipart boundary itself. Setting it to
  // application/json makes the server's formData() throw, which surfaces
  // as a bare 500.
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;

  const config = {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  };

  let res;
  try {
    res = await fetch(path, config);
  } catch {
    throw new Error("Could not reach the server. Check your connection and try again.");
  }

  if (res.status === 401) {
    window.location.href = "/admin/login";
    throw new Error("Session expired");
  }

  let json = null;
  try {
    json = await res.json();
  } catch {
    /* non-json body */
  }

  if (!res.ok) {
    throw new Error(json?.error || `Request failed (HTTP ${res.status})`);
  }
  return json?.data;
}

export { apiFetch };

function useCrud(basePath) {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch(basePath);
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [basePath]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await apiFetch(basePath);
        if (alive) {
          setItems(data);
          setError(null);
        }
      } catch (err) {
        if (alive) setError(err.message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [basePath]);

  const create = useCallback(
    async (body) => {
      const created = await apiFetch(basePath, {
        method: "POST",
        body: JSON.stringify(body),
      });
      setItems((prev) => [created, ...(prev || []).filter((i) => i.id !== created.id)]);
      return created;
    },
    [basePath]
  );

  const update = useCallback(
    async (id, body) => {
      const updated = await apiFetch(`${basePath}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      setItems((prev) => (prev || []).map((i) => (i.id === id ? updated : i)));
      return updated;
    },
    [basePath]
  );

  const remove = useCallback(
    async (id) => {
      await apiFetch(`${basePath}/${id}`, { method: "DELETE" });
      setItems((prev) => (prev || []).filter((i) => i.id !== id));
    },
    [basePath]
  );

  return { items, loading, error, refetch, create, update, remove };
}

function useJson(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const value = await apiFetch(path);
      setData(value);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch, setData };
}

export { useCrud, useJson };