"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, NotebookPen } from "lucide-react";
import { useCrud } from "@/components/admin/hooks";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Avatar from "@/components/admin/Avatar";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { Drawer } from "@/components/admin/Modal";
import { TextInput, TextArea, Select, ImagePicker } from "@/components/admin/Field";
import { btnPrimary, btnGhost, BLOG_CATEGORIES, inputCls, formatDate } from "@/components/admin/ui";
import { useToast } from "@/components/admin/toast";

export default function BlogsPage() {
  const { items: blogs, loading, create, update, remove } = useCrud("/api/admin/blogs");
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    if (!blogs) return [];
    if (!search) return blogs;
    const q = search.toLowerCase();
    return blogs.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q)
    );
  }, [blogs, search]);

  function openCreate() {
    setEditItem(null);
    setEditorOpen(true);
  }

  async function handleSave(body) {
    setSaving(true);
    try {
      if (editItem) {
        await update(editItem.id, body);
        toast({ title: "Blog updated", tone: "success" });
      } else {
        await create(body);
        toast({ title: "Blog created", tone: "success" });
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
      toast({ title: "Blog deleted", tone: "success" });
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
            <div className="flex h-full items-center justify-center text-muted/40">
              <NotebookPen size={14} />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "title",
      label: "Title",
      render: (_, row) => (
        <div className="min-w-0 max-w-[280px]">
          <p className="truncate font-medium text-ink">{row.title}</p>
          <p className="mt-0.5 truncate text-xs text-muted">{row.excerpt?.slice(0, 50) || row.category}</p>
        </div>
      ),
    },
    { key: "category", label: "Category", render: (v) => <span className="text-ink/70">{v}</span> },
    {
      key: "author",
      label: "Author",
      render: (_, row) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={row.author} size={26} />
          <span className="truncate text-sm text-ink/70">{row.author}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (v) => <StatusBadge value={v === "published" ? "Published" : "Draft"} />,
    },
    {
      key: "createdAt",
      label: "Created",
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
          placeholder="Search blogs…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputCls + " sm:max-w-xs min-w-0 flex-1"}
        />
        <div className="flex-1" />
        <button onClick={openCreate} className={btnPrimary}>
          <Plus size={16} /> New Blog
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
          icon={NotebookPen}
          title="No blog posts yet"
          description="Start sharing company updates, project stories, and insights with your audience."
          action={<button onClick={openCreate} className={btnPrimary}><Plus size={15} /> Create Blog</button>}
        />
      ) : (
        <DataTable columns={columns} data={filtered} rowKey="id" />
      )}

      <BlogEditor
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
        title="Delete blog?"
        description={`"${confirmDelete?.title}" will be permanently removed.`}
      />
    </div>
  );
}

function BlogEditor({ open, onClose, item, onSave, saving }) {
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", image: "", author: "Vedam Studio", category: "Company", status: "draft" });

  useEffect(() => {
    if (!open) return;
    setForm({ title: "", excerpt: "", content: "", image: "", author: "Vedam Studio", category: "Company", status: "draft", ...(item || {}) });
  }, [item?.id, open]);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  const footer = (
    <div className="flex gap-2">
      <button onClick={onClose} className={btnGhost}>Cancel</button>
      <button onClick={() => onSave(form)} disabled={saving || !form.title} className={btnPrimary}>
        {saving ? "Saving…" : item ? "Save Changes" : "Create Blog"}
      </button>
    </div>
  );

  return (
    <Drawer open={open} onClose={onClose} title={item ? "Edit Blog" : "Create Blog"} footer={footer}>
      <div className="space-y-5">
        <TextInput label="Title" value={form.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="Blog title" />
        <TextArea label="Excerpt" value={form.excerpt || ""} onChange={(e) => set("excerpt", e.target.value)} rows={2} placeholder="Brief summary" />
        <ImagePicker label="Cover Image" value={form.image} onChange={(v) => set("image", v)} />
        <div className="grid grid-cols-2 gap-4">
          <Select label="Category" value={form.category || "Company"} onChange={(e) => set("category", e.target.value)} options={BLOG_CATEGORIES} />
          <TextInput label="Author" value={form.author || ""} onChange={(e) => set("author", e.target.value)} />
        </div>
        <Select label="Status" value={form.status || "draft"} onChange={(e) => set("status", e.target.value)} options={["draft", "published"]} />
        <TextArea label="Content" value={form.content || ""} onChange={(e) => set("content", e.target.value)} rows={8} placeholder="Write your blog content here…" />
      </div>
    </Drawer>
  );
}