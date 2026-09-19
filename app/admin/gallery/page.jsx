"use client";

import { useState, useMemo } from "react";
import { Trash2, Images, Upload } from "lucide-react";
import { useCrud } from "@/components/admin/hooks";
import StatusBadge from "@/components/admin/StatusBadge";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { ImagePicker } from "@/components/admin/Field";
import { btnGhost, inputCls } from "@/components/admin/ui";
import { useToast } from "@/components/admin/toast";

export default function GalleryPage() {
  const { items: projects, loading, update } = useCrud("/api/v1/projects");
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null);

  const filtered = useMemo(() => {
    if (!projects) return [];
    if (!search) return projects;
    const q = search.toLowerCase();
    return projects.filter(
      (p) => p.name?.toLowerCase().includes(q) || p.type?.toLowerCase().includes(q)
    );
  }, [projects, search]);

  const allImages = useMemo(
    () => (projects || []).flatMap((p) => (p.gallery || []).map((url) => ({ url, project: p }))),
    [projects]
  );

  async function saveGallery(project, gallery) {
    setSaving(true);
    try {
      await update(project.id, { gallery });
      toast({ title: "Gallery updated", description: project.name, tone: "success" });
    } catch (err) {
      toast({ title: "Error", description: err.message, tone: "error" });
    } finally {
      setSaving(false);
    }
  }

  async function onAdd(project, urls) {
    const merged = [...(project.gallery || []), ...urls];
    await saveGallery(project, merged);
  }

  async function handleRemove() {
    if (!removeTarget) return;
    const { project, index } = removeTarget;
    const gallery = [...(project.gallery || [])];
    gallery.splice(index, 1);
    setRemoveTarget(null);
    await saveGallery(project, gallery);
  }

  return (
    <div className="space-y-6 pt-1 pb-8">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search projects…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputCls + " sm:max-w-xs min-w-0 flex-1"}
        />
        <div className="flex-1" />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
          {allImages.length} {allImages.length === 1 ? "image" : "images"} across {projects?.length || 0} projects
        </span>
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
          description="Project galleries live inside each project. Add photos there and manage them from this library."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => {
            const gallery = project.gallery || [];
            return (
              <div key={project.id} className="overflow-hidden rounded-2xl border border-ink/8 bg-surface shadow-[0_1px_2px_rgba(21,20,15,0.04)]">
                <div className="flex items-center justify-between border-b border-ink/5 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">{project.name}</p>
                    <p className="truncate text-xs text-muted">{project.location}</p>
                  </div>
                  <StatusBadge value={project.status || "Active"} />
                </div>

                <div className="p-4">
                  {gallery.length === 0 ? (
                    <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink/10 text-center text-muted">
                      <Images size={20} />
                      <p className="text-xs">No gallery images yet</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {gallery.map((url, i) => (
                        <div key={url} className="group relative aspect-square overflow-hidden rounded-xl border border-ink/10 bg-ink/[0.04]">
                          <img src={url} alt="" className="h-full w-full object-cover" />
                          <button
                            onClick={() => setRemoveTarget({ project, index: i })}
                            disabled={saving}
                            className="absolute inset-0 hidden items-center justify-center bg-night/50 text-white transition group-hover:flex"
                            title="Remove image"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4">
                    <ImagePicker
                      label="Add images"
                      multiple
                      value={[]}
                      onChange={(urls) => onAdd(project, urls)}
                      className="w-full"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted">
                      {gallery.length} {gallery.length === 1 ? "photo" : "photos"}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${saving ? "text-accent" : "text-muted"}`}>
                      <Upload size={11} /> {saving ? "Saving…" : "Saved"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={!!removeTarget}
        onClose={() => setRemoveTarget(null)}
        onConfirm={handleRemove}
        title="Remove image?"
        description={`This photo will be removed from "${removeTarget?.project?.name}".`}
      />
    </div>
  );
}