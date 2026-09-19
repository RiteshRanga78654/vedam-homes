"use client";

import { useState, useMemo, useEffect } from "react";
import { Trash2, Inbox, Eye } from "lucide-react";
import { useCrud } from "@/components/admin/hooks";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Avatar from "@/components/admin/Avatar";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { Modal } from "@/components/admin/Modal";
import { Select, TextInput } from "@/components/admin/Field";
import { btnGhost, btnPrimary, QUERY_STATUSES, inputCls, formatDate, labelCls } from "@/components/admin/ui";
import { useToast } from "@/components/admin/toast";

export default function QueriesPage() {
  const { items: queries, loading, update, remove } = useCrud("/api/v1/queries");
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewItem, setViewItem] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    if (!queries) return [];
    let list = queries;
    if (statusFilter !== "All") list = list.filter((q) => q.status === statusFilter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          i.name?.toLowerCase().includes(q) ||
          i.email?.toLowerCase().includes(q) ||
          i.interest?.toLowerCase().includes(q) ||
          i.message?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [queries, search, statusFilter]);

  useEffect(() => {
    if (viewItem) setStatus(viewItem.status || "New");
  }, [viewItem?.id]);

  async function handleStatus() {
    if (!viewItem) return;
    setSaving(true);
    try {
      await update(viewItem.id, { status });
      toast({ title: "Query updated", description: `Marked as ${status}`, tone: "success" });
      setViewItem(null);
    } catch (err) {
      toast({ title: "Error", description: err.message, tone: "error" });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirmDelete) return;
    try {
      await remove(confirmDelete.id);
      toast({ title: "Query deleted", tone: "success" });
      setConfirmDelete(null);
    } catch (err) {
      toast({ title: "Error", description: err.message, tone: "error" });
    }
  }

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (_, row) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={row.name} size={28} />
          <div className="min-w-0">
            <p className="truncate font-medium text-ink">{row.name}</p>
            <p className="truncate text-xs text-muted">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      render: (v) => <span className="whitespace-nowrap text-sm text-ink/70">{v || "—"}</span>,
    },
    {
      key: "interest",
      label: "Interest",
      render: (v) => <span className="text-ink/70">{v || "General inquiry"}</span>,
    },
    {
      key: "message",
      label: "Message",
      render: (v) => <span className="block max-w-[240px] truncate text-sm text-muted">{v || "—"}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (v) => <StatusBadge value={v || "New"} />,
    },
    {
      key: "createdAt",
      label: "Received",
      render: (v) => <span className="whitespace-nowrap text-sm text-muted">{formatDate(v)}</span>,
    },
    {
      key: "actions",
      label: "",
      sortable: false,
      headerClass: "w-[90px]",
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewItem(row)}
            className="rounded-lg p-1.5 text-muted transition hover:bg-ink/5 hover:text-ink"
            title="View / update"
          >
            <Eye size={14} />
          </button>
          <button
            onClick={() => setConfirmDelete(row)}
            className="rounded-lg p-1.5 text-muted transition hover:bg-red-500/5 hover:text-red-600"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
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
        <Select
          label=""
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={["All", ...QUERY_STATUSES]}
          className="w-40"
        />
        <div className="flex-1" />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
          {filtered.length} {filtered.length === 1 ? "query" : "queries"}
        </span>
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
          title="No queries found"
          description="Enquiries submitted from the contact form will appear here."
        />
      ) : (
        <DataTable columns={columns} data={filtered} rowKey="id" />
      )}

      <Modal
        open={!!viewItem}
        onClose={() => setViewItem(null)}
        title="Query details"
        size="md"
        footer={
          <div className="flex gap-2">
            <button onClick={() => setViewItem(null)} className={btnGhost}>Close</button>
            <button onClick={handleStatus} disabled={saving || !viewItem} className={btnPrimary}>
              {saving ? "Saving…" : "Update Status"}
            </button>
          </div>
        }
      >
        {viewItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Name</label>
                <p className="text-sm font-medium text-ink">{viewItem.name}</p>
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <p className="text-sm text-ink">{viewItem.email}</p>
              </div>
              <div>
                <label className={labelCls}>Phone</label>
                <p className="text-sm text-ink">{viewItem.phone || "—"}</p>
              </div>
              <div>
                <label className={labelCls}>Interest</label>
                <p className="text-sm text-ink">{viewItem.interest || "General inquiry"}</p>
              </div>
            </div>

            {viewItem.relatedProject && (
              <div>
                <label className={labelCls}>Related Project</label>
                <p className="text-sm text-ink">{viewItem.relatedProject}</p>
              </div>
            )}

            <div>
              <label className={labelCls}>Message</label>
              <p className="rounded-xl border border-ink/8 bg-surface-2/50 px-4 py-3 text-sm leading-relaxed text-ink">
                {viewItem.message || "No message"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextInput label="Source" value={viewItem.source || "Website"} disabled />
              <TextInput label="Received" value={formatDate(viewItem.createdAt)} disabled />
            </div>

            <Select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={QUERY_STATUSES}
            />
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
        title="Delete query?"
        description={`Query from "${confirmDelete?.name}" will be permanently removed.`}
      />
    </div>
  );
}