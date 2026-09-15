"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, Pencil, Trash2, Users, Mail, Shield } from "lucide-react";
import { useCrud } from "@/components/admin/hooks";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Avatar from "@/components/admin/Avatar";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { Drawer } from "@/components/admin/Modal";
import { TextInput, Select } from "@/components/admin/Field";
import { btnPrimary, btnGhost, inputCls, formatDate, timeAgo } from "@/components/admin/ui";
import { useToast } from "@/components/admin/toast";

export default function TeamPage() {
  const { items: team, loading, create, update, remove } = useCrud("/api/admin/team");
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    if (!team) return [];
    if (!search) return team;
    const q = search.toLowerCase();
    return team.filter(
      (m) =>
        m.name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.role?.toLowerCase().includes(q)
    );
  }, [team, search]);

  async function handleSave(body) {
    setSaving(true);
    try {
      if (editItem) {
        await update(editItem.id, body);
        toast({ title: "Member updated", tone: "success" });
      } else {
        await create(body);
        toast({ title: "Member added", tone: "success" });
      }
      setEditorOpen(false);
      setEditItem(null);
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
      toast({ title: "Member removed", tone: "success" });
      setConfirmDelete(null);
    } catch (err) {
      toast({ title: "Error", description: err.message, tone: "error" });
    }
  }

  const columns = [
    {
      key: "name",
      label: "Member",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} size={36} />
          <div className="min-w-0">
            <p className="truncate font-medium text-ink">{row.name}</p>
            <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted">
              <Mail size={10} /> {row.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (_, row) => (
        <div className="flex items-center gap-1.5">
          <Shield size={13} className="text-accent" />
          <span className="text-sm text-ink/70">{row.role}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (v) => <StatusBadge value={v} />,
    },
    {
      key: "lastActive",
      label: "Last Active",
      render: (v) => <span className="text-sm text-muted">{v ? timeAgo(v) : "—"}</span>,
    },
    {
      key: "actions",
      label: "",
      sortable: false,
      headerClass: "w-[80px]",
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <button onClick={() => { setEditItem(row); setEditorOpen(true); }} className="rounded-lg p-1.5 text-muted transition hover:bg-ink/5 hover:text-ink" title="Edit">
            <Pencil size={14} />
          </button>
          <button onClick={() => setConfirmDelete(row)} className="rounded-lg p-1.5 text-muted transition hover:bg-red-500/5 hover:text-red-600" title="Remove">
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5 pt-1 pb-8">
      <div className="flex flex-wrap items-center gap-3">
        <input type="text" placeholder="Search team…" value={search} onChange={(e) => setSearch(e.target.value)} className={inputCls + " sm:max-w-xs min-w-0 flex-1"} />
        <div className="flex-1" />
        <button onClick={() => { setEditItem(null); setEditorOpen(true); }} className={btnPrimary}><Plus size={16} /> Add Member</button>
      </div>

      {loading ? (
        <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 rounded-2xl border border-ink/8 bg-surface admin-shimmer" />)}</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Users} title="No team members" description="Add your first team member to start managing access and permissions." action={<button onClick={() => { setEditItem(null); setEditorOpen(true); }} className={btnPrimary}><Plus size={15} /> Add Member</button>} />
      ) : (
        <DataTable columns={columns} data={filtered} rowKey="id" />
      )}

      <TeamEditor open={editorOpen} onClose={() => { setEditorOpen(false); setEditItem(null); }} item={editItem} onSave={handleSave} saving={saving} />
      <ConfirmDialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)} onConfirm={handleDelete} title="Remove member?" description={`${confirmDelete?.name} will lose access to the admin dashboard.`} />
    </div>
  );
}

function TeamEditor({ open, onClose, item, onSave, saving }) {
  const [form, setForm] = useState({ name: "", email: "", role: "Content Manager", status: "Active" });

  useEffect(() => {
    if (!open) return;
    setForm({ name: "", email: "", role: "Content Manager", status: "Active", ...(item || {}) });
  }, [item?.id, open]);

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })); }

  const footer = (
    <div className="flex gap-2">
      <button onClick={onClose} className={btnGhost}>Cancel</button>
      <button onClick={() => onSave(form)} disabled={saving || !form.name || !form.email} className={btnPrimary}>
        {saving ? "Saving…" : item ? "Save Changes" : "Add Member"}
      </button>
    </div>
  );

  return (
    <Drawer open={open} onClose={onClose} title={item ? "Edit Member" : "Add Member"} footer={footer}>
      <div className="space-y-5">
        <TextInput label="Full Name" value={form.name || ""} onChange={(e) => set("name", e.target.value)} placeholder="CA Raman Singla" />
        <TextInput label="Email" type="email" value={form.email || ""} onChange={(e) => set("email", e.target.value)} placeholder="name@vedamhomes.com" />
        <Select label="Role" value={form.role || "Content Manager"} onChange={(e) => set("role", e.target.value)} options={["Super Admin", "Admin", "Editor", "Content Manager"]} />
        <Select label="Status" value={form.status || "Active"} onChange={(e) => set("status", e.target.value)} options={["Active", "Invited", "Suspended"]} />
      </div>
    </Drawer>
  );
}