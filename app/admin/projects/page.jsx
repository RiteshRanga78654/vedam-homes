"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, Pencil, Trash2, Building2 } from "lucide-react";
import { useCrud } from "@/components/admin/hooks";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { Drawer } from "@/components/admin/Modal";
import { TextInput, TextArea, Select, ImagePicker } from "@/components/admin/Field";
import { btnPrimary, btnGhost, PROJECT_STATUSES, inputCls, formatDate } from "@/components/admin/ui";
import { useToast } from "@/components/admin/toast";

export default function ProjectsPage() {
  const { items: projects, loading, create, update, remove } = useCrud("/api/v1/projects");
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    if (!projects) return [];
    if (!search) return projects;
    const q = search.toLowerCase();
    return projects.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.type?.toLowerCase().includes(q)
    );
  }, [projects, search]);

  function openCreate() {
    setEditItem(null);
    setEditorOpen(true);
  }

  async function handleSave(body) {
    setSaving(true);
    try {
      if (editItem) {
        await update(editItem.id, body);
        toast({ title: "Project updated", tone: "success" });
      } else {
        await create(body);
        toast({ title: "Project created", tone: "success" });
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
      toast({ title: "Project deleted", tone: "success" });
      setConfirmDelete(null);
    } catch (err) {
      toast({ title: "Error", description: err.message, tone: "error" });
    }
  }

  const columns = [
    {
      key: "image",
      label: "",
      sortable: false,
      headerClass: "w-[60px]",
      cellClass: "w-[60px]",
      render: (_, row) => (
        <div className="h-10 w-14 overflow-hidden rounded-lg border border-ink/8 bg-ink/[0.04]">
          {row.image ? (
            <img src={row.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-muted/40"><Building2 size={14} /></div>
          )}
        </div>
      ),
    },
    {
      key: "name",
      label: "Project",
      render: (_, row) => (
        <div className="min-w-0 max-w-[280px]">
          <p className="truncate font-medium text-ink">{row.name}</p>
          <p className="mt-0.5 truncate text-xs text-muted">{row.location} · {row.type}</p>
        </div>
      ),
    },
    { key: "status", label: "Status", render: (v) => <StatusBadge value={v} /> },
    { key: "price", label: "Price", render: (v) => <span className="text-sm text-ink/70">{v || "—"}</span> },
    { key: "updatedAt", label: "Updated", render: (v) => <span className="whitespace-nowrap text-sm text-muted">{formatDate(v)}</span> },
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
          <button onClick={() => setConfirmDelete(row)} className="rounded-lg p-1.5 text-muted transition hover:bg-red-500/5 hover:text-red-600" title="Delete">
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5 pt-1 pb-8">
      <div className="flex flex-wrap items-center gap-3">
        <input type="text" placeholder="Search projects…" value={search} onChange={(e) => setSearch(e.target.value)} className={inputCls + " sm:max-w-xs min-w-0 flex-1"} />
        <div className="flex-1" />
        <button onClick={openCreate} className={btnPrimary}><Plus size={16} /> Add Project</button>
      </div>

      {loading ? (
        <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 rounded-2xl border border-ink/8 bg-surface admin-shimmer" />)}</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Building2} title="No projects yet" description="Add your first real estate project to start managing your portfolio." action={<button onClick={openCreate} className={btnPrimary}><Plus size={15} /> Add Project</button>} />
      ) : (
        <DataTable columns={columns} data={filtered} rowKey="id" />
      )}

      <ProjectEditor open={editorOpen} onClose={() => { setEditorOpen(false); setEditItem(null); }} item={editItem} onSave={handleSave} saving={saving} />
      <ConfirmDialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)} onConfirm={handleDelete} title="Delete project?" description={`"${confirmDelete?.name}" will be permanently removed.`} />
    </div>
  );
}

function ProjectEditor({ open, onClose, item, onSave, saving }) {
  const [form, setForm] = useState({ name: "", location: "", type: "Residence", status: "Active", price: "On Request", description: "", details: "", image: "", gallery: [] });

  useEffect(() => {
    if (!open) return;
    setForm({ name: "", location: "", type: "Residence", status: "Active", price: "On Request", description: "", details: "", image: "", gallery: [], ...(item || {}) });
  }, [item?.id, open]);

  function set(field, value) { setForm((f) => ({ ...f, [field]: value })); }

  const footer = (
    <div className="flex gap-2">
      <button onClick={onClose} className={btnGhost}>Cancel</button>
      <button onClick={() => onSave(form)} disabled={saving || !form.name} className={btnPrimary}>
        {saving ? "Saving…" : item ? "Save Changes" : "Add Project"}
      </button>
    </div>
  );

  return (
    <Drawer open={open} onClose={onClose} title={item ? "Edit Project" : "Add Project"} footer={footer}>
      <div className="space-y-5">
        <TextInput label="Project Name" value={form.name || ""} onChange={(e) => set("name", e.target.value)} placeholder="Vedam Residence" />
        <div className="grid grid-cols-2 gap-4">
          <TextInput label="Location" value={form.location || ""} onChange={(e) => set("location", e.target.value)} placeholder="Vizag, India" />
          <TextInput label="Type" value={form.type || ""} onChange={(e) => set("type", e.target.value)} placeholder="Gated Villas" />
          <Select label="Status" value={form.status || "Active"} onChange={(e) => set("status", e.target.value)} options={PROJECT_STATUSES} />
          <TextInput label="Price" value={form.price || ""} onChange={(e) => set("price", e.target.value)} placeholder="On Request" />
        </div>
        <TextArea label="Description" value={form.description || ""} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="Project description" />
        <TextArea label="Details / Notes" value={form.details || ""} onChange={(e) => set("details", e.target.value)} rows={3} placeholder="Additional project notes" />
        <ImagePicker label="Main Image" value={form.image} onChange={(v) => set("image", v)} />
        <ImagePicker label="Gallery" value={form.gallery} onChange={(v) => set("gallery", v)} multiple />
      </div>
    </Drawer>
  );
}