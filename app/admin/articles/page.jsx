"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, Pencil, Trash2, Newspaper } from "lucide-react";
import { useCrud } from "@/components/admin/hooks";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { Drawer } from "@/components/admin/Modal";
import { TextInput, TextArea, Select, ImagePicker, Toggle } from "@/components/admin/Field";
import { btnPrimary, btnGhost, ARTICLE_CATEGORIES, inputCls, formatDate, labelCls } from "@/components/admin/ui";
import { useToast } from "@/components/admin/toast";

const ARTICLE_BLOCK_TYPES = [
  { value: "p", label: "Paragraph" },
  { value: "h2", label: "Heading" },
  { value: "quote", label: "Quote" },
  { value: "bullets", label: "Bullets" },
  { value: "lead", label: "Lead" },
];

export default function ArticlesPage() {
  const { items: articles, loading, create, update, remove } = useCrud("/api/v1/articles");
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    if (!articles) return [];
    if (!search) return articles;
    const q = search.toLowerCase();
    return articles.filter(
      (a) =>
        a.title?.toLowerCase().includes(q) ||
        a.category?.toLowerCase().includes(q) ||
        a.author?.toLowerCase().includes(q)
    );
  }, [articles, search]);

  function openCreate() {
    setEditItem(null);
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
          <p className="mt-0.5 truncate text-xs text-muted">{row.excerpt?.slice(0, 50) || row.author}</p>
        </div>
      ),
    },
    { key: "category", label: "Category", render: (v) => <span className="text-ink/70">{v}</span> },
    {
      key: "status",
      label: "Status",
      render: (v) => <StatusBadge value={v || "draft"} />,
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
          placeholder="Search articles…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputCls + " sm:max-w-xs min-w-0 flex-1"}
        />
        <div className="flex-1" />
        <button onClick={openCreate} className={btnPrimary}>
          <Plus size={16} /> New Article
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
          icon={Newspaper}
          title="No articles yet"
          description="Publish insights, updates, and stories for your audience, or save drafts for later."
          action={<button onClick={openCreate} className={btnPrimary}><Plus size={15} /> Create Article</button>}
        />
      ) : (
        <DataTable columns={columns} data={filtered} rowKey="id" />
      )}

      <ArticleEditor
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
        title="Delete article?"
        description={`"${confirmDelete?.title}" will be permanently removed.`}
      />
    </div>
  );
}

function ArticleEditor({ open, onClose, item, onSave, saving }) {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    image: "",
    category: "Real Estate",
    author: "Vedam Studio",
    readingTime: "3 min read",
    popular: false,
    status: "draft",
    content: [],
  });

  useEffect(() => {
    if (!open) return;
    setForm({
      title: "",
      excerpt: "",
      image: "",
      category: "Real Estate",
      author: "Vedam Studio",
      readingTime: "3 min read",
      popular: false,
      status: "draft",
      content: [],
      ...(item || {}),
    });
  }, [item?.id, open]);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function setBlock(i, field, value) {
    const blocks = [...(form.content || [])];
    blocks[i] = { ...(blocks[i] || {}), [field]: value };
    set("content", blocks);
  }

  function addBlock(type = "p") {
    set("content", [
      ...(form.content || []),
      { type, text: "", items: [] },
    ]);
  }

  function removeBlock(i) {
    const blocks = [...(form.content || [])];
    blocks.splice(i, 1);
    set("content", blocks);
  }

  const footer = (
    <div className="flex gap-2">
      <button onClick={onClose} className={btnGhost}>Cancel</button>
      <button onClick={() => onSave(form)} disabled={saving || !form.title} className={btnPrimary}>
        {saving ? "Saving…" : item ? "Save Changes" : "Create Article"}
      </button>
    </div>
  );

  return (
    <Drawer open={open} onClose={onClose} title={item ? "Edit Article" : "Create Article"} footer={footer}>
      <div className="space-y-5">
        <TextInput label="Title" value={form.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="Article title" />
        <TextArea label="Excerpt" value={form.excerpt || ""} onChange={(e) => set("excerpt", e.target.value)} rows={2} placeholder="Brief summary" />
        <ImagePicker label="Cover Image" value={form.image} onChange={(v) => set("image", v)} />
        <div className="grid grid-cols-2 gap-4">
          <Select label="Category" value={form.category || "Real Estate"} onChange={(e) => set("category", e.target.value)} options={ARTICLE_CATEGORIES} />
          <TextInput label="Reading Time" value={form.readingTime || ""} onChange={(e) => set("readingTime", e.target.value)} placeholder="3 min read" />
        </div>
        <TextInput label="Author" value={form.author || ""} onChange={(e) => set("author", e.target.value)} />
        <Select label="Status" value={form.status || "draft"} onChange={(e) => set("status", e.target.value)} options={["draft", "published"]} />
        <div className="flex flex-wrap gap-8">
          <Toggle label="Popular" checked={!!form.popular} onChange={(checked) => set("popular", checked)} />
        </div>

        <div>
          <label className={labelCls}>Content Blocks</label>
          <div className="space-y-3">
            {(form.content || []).map((block, i) => (
              <div key={i} className="rounded-xl border border-ink/10 bg-surface-2/50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Select
                    label=""
                    value={block.type || "p"}
                    onChange={(e) => setBlock(i, "type", e.target.value)}
                    options={ARTICLE_BLOCK_TYPES}
                    className="w-40"
                  />
                  <button onClick={() => removeBlock(i)} className="rounded p-1 text-xs text-red-500/70 transition hover:text-red-600">
                    <Trash2 size={12} />
                  </button>
                </div>
                {block.type === "bullets" ? (
                  <TextArea
                    label="Items (one per line)"
                    value={(block.items || []).join("\n")}
                    onChange={(e) => setBlock(i, "items", e.target.value.split("\n").filter(Boolean))}
                    rows={3}
                  />
                ) : (
                  <TextArea
                    label="Text"
                    value={block.text || ""}
                    onChange={(e) => setBlock(i, "text", e.target.value)}
                    rows={block.type === "h2" ? 1 : 3}
                  />
                )}
              </div>
            ))}
            <div className="flex flex-wrap gap-2">
              {["p", "h2", "quote", "bullets", "lead"].map((t) => (
                <button key={t} onClick={() => addBlock(t)} className={btnGhost + " text-xs py-2"}>
                  <Plus size={12} /> {ARTICLE_BLOCK_TYPES.find((b) => b.value === t)?.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}