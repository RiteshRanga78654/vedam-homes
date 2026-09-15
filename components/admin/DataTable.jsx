"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export default function DataTable({
  columns = [],
  data = [],
  rowKey = "id",
  sortField,
  sortDir = "asc",
  onSort,
  empty,
  loading,
}) {
  const internalSort = !onSort;
  const [internalField, setInternalField] = useState(sortField || null);
  const [internalDir, setInternalDir] = useState(sortDir || "asc");

  const currentField = sortField ?? internalField;
  const currentDir = sortDir ?? internalDir;

  const sorted = useMemo(() => {
    let list = data || [];
    if (internalSort && currentField) {
      list = [...list].sort((a, b) => {
        let av = a?.[currentField];
        let bv = b?.[currentField];
        if (av == null) av = "";
        if (bv == null) bv = "";
        if (typeof av === "string") av = av.toLowerCase();
        if (typeof bv === "string") bv = bv.toLowerCase();
        if (av < bv) return currentDir === "asc" ? -1 : 1;
        if (av > bv) return currentDir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [data, currentField, currentDir, internalSort]);

  function toggleSort(field) {
    const next = currentField === field && currentDir === "asc" ? "desc" : "asc";
    if (onSort) {
      onSort(field, next);
    } else {
      setInternalField(field);
      setInternalDir(next);
    }
  }

  if (loading) return null;
  if (sorted.length === 0) return empty || null;

  return (
    <div className="admin-scroll -mx-1 overflow-x-auto rounded-2xl border border-ink/8 bg-surface">
      <table className="w-full min-w-[840px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink/8 bg-surface-2/60">
            {columns.map((col) => {
              const SortIcon =
                currentField === col.key
                  ? currentDir === "asc"
                    ? ArrowUp
                    : ArrowDown
                  : ArrowUpDown;
              return (
                <th
                  key={col.key}
                  className={`px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted ${
                    col.headerClass || ""
                  } ${col.sortable !== false ? "cursor-pointer select-none" : ""}`}
                  onClick={() => col.sortable !== false && toggleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    {col.sortable !== false && (
                      <SortIcon size={12} className="text-muted/60" />
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, ri) => (
            <tr
              key={row[rowKey] ?? ri}
              className="border-b border-ink/[0.04] transition-colors hover:bg-ink/[0.02]"
            >
              {columns.map((col) => (
                <td key={col.key} className={`px-4 py-3.5 align-middle ${col.cellClass || ""}`}>
                  {col.render
                    ? col.render(row[col.key], row, ri)
                    : row[col.key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}