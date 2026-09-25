"use client";

import { useState, useMemo, useEffect } from "react";
import { Trash2, Images, Upload, Plus, Pencil } from "lucide-react";
import { useCrud } from "@/components/admin/hooks";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { Drawer } from "@/components/admin/Modal";
import { ImagePicker, TextInput, Select } from "@/components/admin/Field";
import { btnPrimary, btnGhost, inputCls } from "@/components/admin/ui";
import { useToast } from "@/components/admin/toast";

const GALLERY_CATEGORIES = ["Architecture", "Interiors", "Exteriors", "Details", "Amenities"];
const GALLERY_SIZES = ["regular", "wide", "tall"];

export default function GalleryPage() {
  const { items, loading, create, update, remove } = useCrud("/api/v1/gallery");
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [uploading, setUploading] = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const categories = useMemo(() => {
    const set = new Set((items || []).map((i) => i.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    let list = items || [];
    if (activeCategory !== "All") list = list.filter((i) => i.category === activeCategory);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) => i.title?.toLowerCase().includes(q) || i.category?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [items, search, activeCategory]);

  // Direct upload: new photos are added to the gallery immediately.
  async function onAdd(urls) {
    if (!urls?.length) return;
    setUploading(true);
    try {
      for (const url of urls) {
        await create({ src: url, title: "Untitled", category: activeCategory === "All" ? "Architecture" : activeCategory });
      }
      toast({ title: `${urls.length} photo${urls.length > 1 ? "s" : ""} added`, tone: "success" });
    } catch (err) {
      toast({ title: "Upload failed", description: err.message, tone: "error" });
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    if (!removeTarget) return;
    try {
      await remove(removeTarget.id);
      toast({ title: "Photo removed", tone: "success" });
      setRemoveTarget(null);
    } catch (err) {
      toast({ title: "Error", description: err.message, tone: "error" });
    }
  }

  async function handleSave(body) {
    setSaving(true);
    try {
      if (Array.isArray(body)) {
        for (const item of body) {
          await create(item);
        }
        toast({ title: `${body.length} photo${body.length > 1 ? "s" : ""} added`, tone: "success" });
      } else if (editItem) {
        await update(editItem.id, body);
        toast({ title: "Photo updated", tone: "success" });
      } else {
        await create(body);
        toast({ title: "Photo added", tone: "success" });
      }
      setEditorOpen(false);
      setEditItem(null);
    } catch (err) {
      toast({ title: "Error", description: err.message, tone: "error" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 pt-1 pb-8">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search photos…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputCls + " sm:max-w-xs min-w-0 flex-1"}
        />
        <div className="flex-1" />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
          {filtered.length} {filtered.length === 1 ? "image" : "images"}
        </span>
        <button onClick={() => { setEditItem(null); setEditorOpen(true); }} className={btnPrimary}>
          <Plus size={16} /> Add Photo
        </button>
      </div>

      {/* Category filter */}
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition ${
                activeCategory === cat
                  ? "bg-ink text-canvas"
                  : "border border-ink/10 text-muted hover:bg-ink/[0.04] hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Quick uploader */}
      <div className="rounded-2xl border border-ink/8 bg-surface p-4">
        <ImagePicker
          label="Upload photos (added instantly)"
          multiple
          value={[]}
          onChange={onAdd}
          className="w-full"
        />
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
          <Upload size={11} /> {uploading ? "Uploading…" : "Drop or choose files to add to the gallery"}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 rounded-2xl border border-ink/8 bg-surface admin-shimmer" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Images}
          title="No gallery images"
          description="Upload photos here and they will instantly appear on the public /gallery page."
          action={
            <button onClick={() => { setEditItem(null); setEditorOpen(true); }} className={btnPrimary}>
              <Plus size={15} /> Add Photo
            </button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-ink/8 bg-surface shadow-[0_1px_2px_rgba(21,20,15,0.04)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink/[0.04]">
                <img src={item.src} alt={item.title || ""} className="h-full w-full object-cover" />
                <button
                  onClick={() => setRemoveTarget(item)}
                  className="absolute inset-0 hidden items-center justify-center bg-night/50 text-white transition group-hover:flex"
                  title="Remove image"
                >
                  <Trash2 size={18} />
                </button>
                <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/45 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white backdrop-blur">
                  {item.category || "Architecture"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 px-4 py-3">
                <p className="min-w-0 truncate text-sm font-medium text-ink">{item.title || "Untitled"}</p>
                <button
                  onClick={() => { setEditItem(item); setEditorOpen(true); }}
                  className="shrink-0 rounded-lg p-1.5 text-muted transition hover:bg-ink/5 hover:text-ink"
                  title="Edit details"
                >
                  <Pencil size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <GalleryEditor
        open={editorOpen}
        onClose={() => { setEditorOpen(false); setEditItem(null); }}
        item={editItem}
        onSave={handleSave}
        saving={saving}
      />

      <ConfirmDialog
        open={!!removeTarget}
        onClose={() => setRemoveTarget(null)}
        onConfirm={handleRemove}
        title="Remove photo?"
        description={`"${removeTarget?.title || "This photo"}" will be removed from the gallery.`}
      />
    </div>
  );
}

function GalleryEditor({ open, onClose, item, onSave, saving }) {
  const [form, setForm] = useState({
    src: "",
    srcs: [],
    title: "",
    category: "Architecture",
    size: "regular",
  });

  useEffect(() => {
    if (!open) return;
    setForm({
      src: "",
      srcs: [],
      title: "",
      category: "Architecture",
      size: "regular",
      ...(item || {}),
    });
  }, [item?.id, open]);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  const isEdit = !!item;
  const srcs = isEdit
    ? [form.src].filter(Boolean)
    : Array.isArray(form.srcs) && form.srcs.length
    ? form.srcs
    : form.src
    ? [form.src]
    : [];
  const canSave = isEdit ? !!form.src : srcs.length > 0;

  function submit() {
    if (isEdit) {
      onSave(form);
      return;
    }
    onSave(
      srcs.map((src) => ({
        src,
        title: form.title || "",
        category: form.category || "Architecture",
        size: form.size || "regular",
      }))
    );
  }

  const footer = (
    <div className="flex gap-2">
      <button onClick={onClose} className={btnGhost}>Cancel</button>
      <button
        onClick={submit}
        disabled={saving || !canSave}
        className={btnPrimary}
      >
        {saving
          ? "Saving…"
          : item
          ? "Save Changes"
          : `Add Photo${srcs.length > 1 ? "s" : ""}`}
      </button>
    </div>
  );

  return (
    <Drawer open={open} onClose={onClose} title={item ? "Edit Photo" : "Add Photos"} footer={footer}>
      <div className="space-y-5">
        <ImagePicker
          label={item ? "Image" : "Images (choose one or many)"}
          multiple={!isEdit}
          value={isEdit ? form.src : form.srcs}
          onChange={(v) => set(isEdit ? "src" : "srcs", v)}
        />
        <TextInput label="Title" value={form.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Living, Vedam Vista" />
        <div className="grid grid-cols-2 gap-4">
          <Select label="Category" value={form.category || "Architecture"} onChange={(e) => set("category", e.target.value)} options={GALLERY_CATEGORIES} />
          <Select label="Layout size" value={form.size || "regular"} onChange={(e) => set("size", e.target.value)} options={GALLERY_SIZES} />
        </div>
      </div>
    </Drawer>
  );
}