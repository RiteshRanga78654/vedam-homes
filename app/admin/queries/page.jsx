"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Inbox, Mail, Phone, Search, ArrowRight, Trash2 } from "lucide-react";
import { useCrud } from "@/components/admin/hooks";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { Drawer } from "@/components/admin/Modal";
import { TextInput, Select, TextArea } from "@/components/admin/Field";
import { btnPrimary, btnGhost, QUERY_STATUSES, inputCls, formatDate, timeAgo } from "@/components/admin/ui";
import { useToast } from "@/components/admin/toast";

export default function QueriesPage() {
  const { items: queries, loading, update, remove } = useCrud("/api/v1/queries");
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [detailItem, setDetailItem] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const filtered = useMemo(() => {
    if (!queries) return [];
    return queries.filter((q) => {
      if (statusFilter !== "All" && q.status !== statusFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        if (
          !q.name?.toLowerCase().includes(s) &&
          !q.email?.toLowerCase().includes(s) &&
          !q.interest?.toLowerCase().includes(s)
        )
          return false;
      }
      return true;
    });
  }, [queries, search, statusFilter]);

  async function changeStatus(id, status) {
    setActionLoading(true);
    try {
      await update(id, { status });
      toast({ title: `Marked as ${status}`, tone: "success" });
      setDetailItem((prev) => (prev?.id === id ? { ...prev, status } : prev));
    } catch (err) {
      toast({ title: "Error", description: err.message, tone: "error" });
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirmDelete) return;
    try {
      await remove(confirmDelete.id);
      toast({ title: "Query deleted", tone: "success" });
      setConfirmDelete(null);
      setDetailItem(null);
    } catch (err) {
      toast({ title: "Error", description: err.message, tone: "error" });
    }
  }

  const columns = [
    {
      key: "name",
      label: "Contact",
      render: (_, row) => (
        <div className="min-w-0 max-w-[240px]">
          <p className="truncate font-medium text-ink">{row.name}</p>
          <p className="mt-0.5 truncate text-xs text-muted">{row.email}</p>
        </div>
      ),
    },
    {
      key: "interest",
      label: "Query Type",
      render: (v) => <span className="text-sm text-ink/70">{v || "—"}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (v) => <StatusBadge value={v} />,
    },
    {
      key: "createdAt",
      label: "Date",
      render: (v) => <span className="whitespace-nowrap text-sm text-muted">{formatDate(v)}</span>,
    },
    {
      key: "actions",
      label: "",
      sortable: false,
      headerClass: "w-[60px]",
      render: (_, row) => (
        <button onClick={() => setDetailItem(row)} className="rounded-lg p-1.5 text-muted transition hover:bg-ink/5 hover:text-ink" title="View details">
          <ArrowRight size={14} />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-5 pt-1 pb-8">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search queries…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputCls + " sm:max-w-xs min-w-0 flex-1"}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={inputCls + " w-auto"}
        >
          {["All", ...QUERY_STATUSES].map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All Statuses" : s}
            </option>
          ))}
        </select>
        <div className="flex-1" />
        <p className="text-sm text-muted">{filtered.length} queries</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded-2xl border border-ink/8 bg-surface admin-shimmer" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No queries yet"
          description="Inquiries from the public contact form will appear here automatically."
        />
      ) : (
        <DataTable columns={columns} data={filtered} rowKey="id" />
      )}

      {/* Detail Drawer */}
      <Drawer
        open={!!detailItem}
        onClose={() => setDetailItem(null)}
        title="Query Details"
        footer={
          detailItem && (
            <div className="flex gap-2">
              <button onClick={() => setConfirmDelete(detailItem)} className={btnPrimary + " !bg-red-500/10 !text-red-600 hover:!bg-red-500/20"}>
                <Trash2 size={14} /> Delete
              </button>
              <div className="flex-1" />
              {QUERY_STATUSES.map((status) => (
                <button
                  key={status}
                  onClick={() => changeStatus(detailItem.id, status)}
                  disabled={detailItem.status === status || actionLoading}
                  className={`rounded-xl px-3 py-2 text-xs font-medium transition ${
                    detailItem.status === status
                      ? "bg-ink text-canvas"
                      : "border border-ink/10 text-ink/60 hover:bg-ink/[0.04]"
                  } disabled:opacity-50`}
                >
                  {status}
                </button>
              ))}
            </div>
          )
        }
      >
        {detailItem && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-ink/8 bg-surface-2/50 p-5">
              <div className="flex items-center gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Inbox size={20} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-ink">{detailItem.name}</p>
                  <p className="text-sm text-muted">{detailItem.interest}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <DetailRow icon={Mail} label="Email" value={detailItem.email} href={`mailto:${detailItem.email}`} />
              <DetailRow icon={Phone} label="Phone" value={detailItem.phone} href={detailItem.phone ? `tel:${detailItem.phone}` : undefined} />
              <DetailRow label="Status" value={detailItem.status} badge />
              <DetailRow label="Submitted" value={formatDate(detailItem.createdAt)} />
              {detailItem.relatedProject && <DetailRow label="Related Project" value={detailItem.relatedProject} />}
              {detailItem.source && <DetailRow label="Source" value={detailItem.source} />}
            </div>

            {detailItem.message && (
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Message</p>
                <div className="rounded-xl border border-ink/8 bg-surface-2/40 p-4 text-sm leading-relaxed text-ink/75">
                  {detailItem.message}
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>

      <ConfirmDialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
        title="Delete query?"
        description={`Message from "${confirmDelete?.name}" will be permanently removed.`}
      />
    </div>
  );
}

function DetailRow({ icon: Icon, label, value, href, badge }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 rounded-xl border border-ink/[0.06] bg-surface-2/30 px-4 py-3">
      <span className="text-[11px] uppercase tracking-[0.14em] text-muted w-20 shrink-0">{label}</span>
      {badge ? (
        <StatusBadge value={value} />
      ) : href ? (
        <a href={href} className="truncate text-sm font-medium text-accent underline-offset-2 hover:underline">{value}</a>
      ) : (
        <span className="truncate text-sm text-ink/80">{value}</span>
      )}
    </div>
  );
}