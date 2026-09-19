"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, Pencil, Mail } from "lucide-react";
import { useCrud } from "@/components/admin/hooks";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Avatar from "@/components/admin/Avatar";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { Drawer } from "@/components/admin/Modal";
import { TextInput, Select } from "@/components/admin/Field";
import { btnPrimary, btnGhost, inputCls, timeAgo, formatDate } from "@/components/admin/ui";
import { useToast } from "@/components/admin/toast";

const TEAM_ROLES = ["Super Admin", "Admin", "Editor", "Content Manager"];
const TEAM_STATUSES = ["Active", "Invited", "Suspended"];

export default function TeamPage() {
  const { items: members, loading, create, update, remove } = useCrud("/api/v1/team");
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    if (!members) return [];
    if (!search) return members;
    const q = search.toLowerCase();
    return members.filter(
      (m) => m.name?.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q) || m.role?.toLowerCase().includes(q)
    );
  }, [members, search]);

  function openCreate() {
    setEditItem(null);
    setEditorOpen(true);
  }

  function verifyRole(role) {
    return TEAM_ROLES.includes(role) ? role : "Content Manager";
  }

  async function handleSave(body) {
    setSaving(true);
    try {
      const payload = { ...body, role: verifyRole(body.role) };
      if (editItem) {
        await update(editItem.id, payload);
        toast({ title: "Member updated", tone: "success" });
      } else {
        await create(payload);
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
        <div className="flex items-center gap-2.5">
          <Avatar name={row.name} size={32} />
          <div className="min-w-0">
            <p className="truncate font-medium text-ink">{row.name}</p>
            <p className="flex items-center gap-1 truncate text-xs text-muted">
              <Mail size={11} /> {row.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (v) => (
        <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
          {v}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (v) => <StatusBadge value={v || "Active"} />,
    },
    {
      key: "lastActive",
      label: "Last active",
      render: (v) => <span className="whitespace-nowrap text-sm text-muted">{v ? timeAgo(v) : "Never"}</span>,
    },
    {
      key: "createdAt",
      label: "Added",
      render: (v) => <span className="whitespace-nowrap text-sm text-muted">{formatDate(v)}</span>,
    },
    {
      key: "actions",
      label: "",
      sortable: false,
      headerClass: "w-[80px]",
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setEditItem(row); setEditorOpen(true); }}
            className="rounded-lg p-1.5 text-muted transition hover:bg-ink/5 hover:text-ink"
            title="Edit"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => setConfirmDelete(row)}
            className="rounded-lg p-1.5 text-red-500/80 transition hover:bg-red-500/5 hover:text-red-600"
            title="Remove"
          >
            <span className="text-sm">Remove</span>
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
          placeholder="Search members…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputCls + " sm:max-w-xs min-w-0 flex-1"}
        />
        <div className="flex-1" />
        <button onClick={openCreate} className={btnPrimary}>
          <Plus size={16} /> Add Member
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded-2xl border border-ink/8 bg-surface admin-shimmer" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No team members"
          description="Invite team members and assign roles to control dashboard access."
          action={<button onClick={openCreate} className={btnPrimary}><Plus size={15} /> Add Member</button>}
        />
      ) : (
        <DataTable columns={columns} data={filtered} rowKey="id" />
      )}

      <MemberEditor
        open={editorOpen}
        onClose={() => { setEditorOpen(false); setEditItem(null); }}
        item={editItem}
        onSave={handleSave}
        saving={saving}
      />

      <ConfirmDialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
        title="Remove member?"
        description={`"${confirmDelete?.name}" will lose access to the admin dashboard.`}
      />
    </div>
  );
}

function MemberEditor({ open, onClose, item, onSave, saving }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Content Manager",
    status: "Active",
  });

  useEffect(() => {
    if (!open) return;
    setForm({
      name: "",
      email: "",
      password: "",
      role: "Content Manager",
      status: "Active",
      ...(item || {}),
      password: "",
    });
  }, [item?.id, open]);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  const rolePermissions = {
    "Super Admin": "Full access to content, projects, team and queries",
    Admin: "Content, projects and queries — no team management",
    Editor: "Content and projects only",
    "Content Manager": "Articles and blogs only",
  };

  const footer = (
    <div className="flex gap-2">
      <button onClick={onClose} className={btnGhost}>Cancel</button>
      <button
        onClick={() => onSave(form)}
        disabled={saving || !form.name || !form.email || (!item && !form.password)}
        className={btnPrimary}
      >
        {saving ? "Saving…" : item ? "Save Changes" : "Add Member"}
      </button>
    </div>
  );

  return (
    <Drawer open={open} onClose={onClose} title={item ? "Edit Member" : "Add Member"} footer={footer}>
      <div className="space-y-5">
        <TextInput label="Name" value={form.name || ""} onChange={(e) => set("name", e.target.value)} placeholder="Full name" />
        <TextInput label="Email" type="email" value={form.email || ""} onChange={(e) => set("email", e.target.value)} placeholder="member@vedamstudio.com" />
        <TextInput label={item ? "New Password" : "Password"} type="password" value={form.password || ""} onChange={(e) => set("password", e.target.value)} placeholder={item ? "Leave blank to keep current" : "Used to log in"} />
        {!item && (
          <p className="text-xs text-muted">
            The member will use this email and password to sign in at /admin.
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Select label="Role" value={form.role || "Content Manager"} onChange={(e) => set("role", e.target.value)} options={TEAM_ROLES} />
          {item && (
            <Select label="Status" value={form.status || "Active"} onChange={(e) => set("status", e.target.value)} options={TEAM_STATUSES} />
          )}
        </div>

        {form.role && (
          <div className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">{form.role}</p>
            <p className="mt-1 text-sm text-ink/70">{rolePermissions[form.role]}</p>
          </div>
        )}
      </div>
    </Drawer>
  );
}