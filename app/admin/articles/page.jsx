"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, MoreHorizontal, Eye, Pencil, Trash2, ExternalLink, Newspaper } from "lucide-react";
import { useCrud } from "@/components/admin/hooks";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Avatar from "@/components/admin/Avatar";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { Drawer, Modal } from "@/components/admin/Modal";
import { TextInput, TextArea, Select, Toggle, ImagePicker } from "@/components/admin/Field";
import { btnPrimary, btnGhost, btnDanger, ARTICLE_CATEGORIES, inputCls, labelCls, formatDate } from "@/components/admin/ui";
import { useToast } from "@/components/admin/toast";

export default function ArticlesPage() {
  const { items: articles, loading, create, update, remove } = useCrud("/api/admin/articles");
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editItem, setEditItem] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const categories = useMemo(() => {
    if (!articles) return ARTICLE_CATEGORIES;
    const fromData = [...new Set(articles.map((a) => a.category).filter(Boolean))];
    return ["All", ...new Set([...ARTICLE_CATEGORIES, ...fromData])];
  }, [articles]);

  const filtered = useMemo(() => {
    if (!articles) return [];
    return articles.filter((a) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !a.title?.toLowerCase().includes(q) &&
          !a.author?.toLowerCase().includes(q) &&
          !a.category?.toLowerCase().includes(q)
        )
          return false;
      }
      if (categoryFilter !== "All" && a.category !== categoryFilter) return false;
      if (statusFilter !== "All" && a.status !== statusFilter) return false;
      return true;
    });
  }, [articles, search, categoryFilter, statusFilter]);

  function openCreate() {
    setEditItem(null);
    setEditorOpen(true);
  }

  function openEdit(item) {
    setEditItem(item);
    setEditorOpen(true);
  }

  async function handleSave(body) {
    setSaving(true);
    try {
      if (editItem) {
        await update(editItem.id, body);
        toast({ title: "Article updated", tone: "success" });
      } else {
        await create(body);
        toast({ title: "Article created", tone: "success" });
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
      toast({ title: "Article deleted", tone: "success" });
      setConfirmDelete(null);
    } catch (err) {
      toast({ title: "Error", description: err.message, tone: "error" });
    }
  }

  async function togglePublish(item) {
    try {
      await update(item.id, {
        status: item.status === "published" ? "draft" : "published",
      });
      toast({
        title: item.status === "published" ? "Unpublished" : "Published",
        tone: "success",
      });
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
              <Newspaper size={14} />
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
          <p className="mt-0.5 truncate text-xs text-muted">{row.excerpt?.slice(0, 60) || row.category}</p>
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
      key: "publishedAt",
      label: "Published",
      render: (v) => <span className="whitespace-nowrap text-sm text-muted">{formatDate(v)}</span>,
    },
    {
      key: "actions",
      label: "",
      sortable: false,
      headerClass: "w-[100px]",
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <button onClick={() => togglePublish(row)} className="rounded-lg p-1.5 text-muted transition hover:bg-ink/5 hover:text-ink" title={row.status === "published" ? "Unpublish" : "Publish"}>
            <Eye size={14} className={row.status === "published" ? "text-emerald-600" : ""} />
          </button>
          <button onClick={() => openEdit(row)} className="rounded-lg p-1.5 text-muted transition hover:bg-ink/5 hover:text-ink" title="Edit">
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
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <input
            type="text"
            placeholder="Search articles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={inputCls}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={inputCls + " w-auto"}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={inputCls + " w-auto"}
        >
          {["All", "published", "draft"].map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All Statuses" : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        <div className="flex-1" />
        <button onClick={openCreate} className={btnPrimary}>
          <Plus size={16} /> New Article
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded-2xl border border-ink/8 bg-surface admin-shimmer" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Newspaper}
          title="No articles yet"
          description="Create your first journal article to begin building content for the Vedam Homes website."
          action={
            <button onClick={openCreate} className={btnPrimary}>
              <Plus size={15} /> Create Article
            </button>
          }
        />
      ) : (
        <DataTable columns={columns} data={filtered} rowKey="id" />
      )}

      {/* Editor Drawer */}
      <ArticleEditor
        open={editorOpen}
        onClose={() => { setEditorOpen(false); setEditItem(null); }}
        item={editItem}
        onSave={handleSave}
        saving={saving}
      />

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
        title="Delete article?"
        description={`"${confirmDelete?.title}" will be permanently removed.`}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Article Editor (inline component)                                   */
/* ------------------------------------------------------------------ */

function ArticleEditor({ open, onClose, item, onSave, saving }) {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    image: "",
    category: "Real Estate",
    author: "Vedam Studio",
    authorRole: "",
    readingTime: "3 min read",
    status: "draft",
    featured: false,
    popular: false,
    content: [],
  });

  // Reset form when item changes
  useEffect(() => {
    if (!open) return;
    setForm({
      title: "",
      excerpt: "",
      image: "",
      category: "Real Estate",
      author: "Vedam Studio",
      authorRole: "",
      readingTime: "3 min read",
      status: "draft",
      featured: false,
      popular: false,
      content: [],
      ...(item || {}),
    });
  }, [item?.id, open]);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function addBlock(type) {
    const blocks = [...(form.content || []), { type, text: "", items: [] }];
    set("content", blocks);
  }

  function updateBlock(index, patch) {
    const blocks = [...(form.content || [])];
    blocks[index] = { ...blocks[index], ...patch };
    set("content", blocks);
  }

  function removeBlock(index) {
    const blocks = [...(form.content || [])];
    blocks.splice(index, 1);
    set("content", blocks);
  }

  function moveBlock(index, dir) {
    const blocks = [...(form.content || [])];
    const target = index + dir;
    if (target < 0 || target >= blocks.length) return;
    [blocks[index], blocks[target]] = [blocks[target], blocks[index]];
    set("content", blocks);
  }

  const drawerFooter = (
    <div className="flex gap-2">
      <button onClick={onClose} className={btnGhost}>
        Cancel
      </button>
      <button
        onClick={() => onSave(form)}
        disabled={saving || !form.title}
        className={btnPrimary}
      >
        {saving ? "Saving…" : item ? "Save Changes" : "Create Article"}
      </button>
    </div>
  );

  return (
    <Drawer open={open} onClose={onClose} title={item ? "Edit Article" : "Create Article"} footer={drawerFooter}>
      <div className="space-y-5">
        <TextInput label="Title" value={form.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="Article title" />
        <TextArea label="Excerpt" value={form.excerpt || ""} onChange={(e) => set("excerpt", e.target.value)} rows={2} placeholder="Brief summary" />
        <ImagePicker label="Cover Image" value={form.image} onChange={(v) => set("image", v)} />

        <div className="grid grid-cols-2 gap-4">
          <Select label="Category" value={form.category || "Real Estate"} onChange={(e) => set("category", e.target.value)} options={ARTICLE_CATEGORIES} />
          <TextInput label="Reading Time" value={form.readingTime || ""} onChange={(e) => set("readingTime", e.target.value)} placeholder="5 min read" />
          <TextInput label="Author" value={form.author || ""} onChange={(e) => set("author", e.target.value)} />
          <TextInput label="Author Role" value={form.authorRole || ""} onChange={(e) => set("authorRole", e.target.value)} />
        </div>

        <div className="flex gap-6">
          <Toggle label="Featured" checked={!!form.featured} onChange={(v) => set("featured", v)} />
          <Toggle label="Popular" checked={!!form.popular} onChange={(v) => set("popular", v)} />
        </div>

        {/* Content Blocks */}
        <div>
          <label className={labelCls}>Content Blocks</label>
          <div className="space-y-3">
            {(form.content || []).map((block, i) => (
              <div key={i} className="rounded-xl border border-ink/10 bg-surface-2/60 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {block.type}
                  </span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => moveBlock(i, -1)} disabled={i === 0} className="rounded p-1 text-xs text-muted hover:text-ink disabled:opacity-30">↑</button>
                    <button onClick={() => moveBlock(i, 1)} disabled={i === (form.content?.length || 0) - 1} className="rounded p-1 text-xs text-muted hover:text-ink disabled:opacity-30">↓</button>
                    <button onClick={() => removeBlock(i)} className="rounded p-1 text-xs text-red-500/70 hover:text-red-600">✕</button>
                  </div>
                </div>
                {block.type === "bullets" ? (
                  <textarea
                    rows={3}
                    value={(block.items || []).join("\n")}
                    onChange={(e) => updateBlock(i, { items: e.target.value.split("\n") })}
                    className={inputCls}
                    placeholder="One item per line"
                  />
                ) : (
                  <textarea
                    rows={2}
                    value={block.text || ""}
                    onChange={(e) => updateBlock(i, { text: e.target.value })}
                    className={inputCls}
                    placeholder={`${block.type} content…`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {["lead", "p", "h2", "quote", "bullets"].map((type) => (
              <button key={type} onClick={() => addBlock(type)} className={btnGhost + " text-xs py-1.5 px-3"}>
                + {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
}