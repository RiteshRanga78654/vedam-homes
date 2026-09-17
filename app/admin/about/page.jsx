"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Info, Plus, Trash2 } from "lucide-react";
import { useJson, apiFetch } from "@/components/admin/hooks";
import { TextInput, TextArea, ImagePicker } from "@/components/admin/Field";
import { btnPrimary, btnGhost, labelCls, inputCls } from "@/components/admin/ui";
import { useToast } from "@/components/admin/toast";
import LoadingSkeleton from "@/components/admin/LoadingSkeleton";

export default function AboutPage() {
  const { data: about, loading, refetch } = useJson("/api/v1/about");
  const { toast } = useToast();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (about) setForm(JSON.parse(JSON.stringify(about)));
  }, [about]);

  if (loading || !form) {
    return <LoadingSkeleton rows={8} className="pt-2" />;
  }

  function set(path, value) {
    setForm((f) => {
      const next = { ...f };
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...(obj[keys[i]] || {}) };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    try {
      await apiFetch("/api/v1/about", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      toast({ title: "About content saved", tone: "success" });
      refetch();
    } catch (err) {
      toast({ title: "Error", description: err.message, tone: "error" });
    } finally {
      setSaving(false);
    }
  }

  function addFaq() {
    const faqs = [...(form.faqs || []), { question: "", answer: "" }];
    set("faqs", faqs);
  }

  function removeFaq(i) {
    const faqs = [...(form.faqs || [])];
    faqs.splice(i, 1);
    set("faqs", faqs);
  }

  function addValue() {
    const values = [...(form.overview?.values || []), { title: "", desc: "" }];
    set("overview.values", values);
  }

  function removeValue(i) {
    const values = [...(form.overview?.values || [])];
    values.splice(i, 1);
    set("overview.values", values);
  }

  const sections = [
    {
      title: "Hero",
      content: (
        <div className="space-y-4">
          <TextInput label="Eyebrow" value={form.hero?.eyebrow || ""} onChange={(e) => set("hero.eyebrow", e.target.value)} />
          <TextInput label="Title" value={form.hero?.title || ""} onChange={(e) => set("hero.title", e.target.value)} />
          <TextArea label="Body" value={form.hero?.body || ""} onChange={(e) => set("hero.body", e.target.value)} rows={4} />
          <ImagePicker label="Hero Image" value={form.hero?.image} onChange={(v) => set("hero.image", v)} />
          <div className="grid grid-cols-2 gap-4">
            <TextInput label="Founder Name" value={form.hero?.founderName || ""} onChange={(e) => set("hero.founderName", e.target.value)} />
            <TextInput label="Founder Role" value={form.hero?.founderRole || ""} onChange={(e) => set("hero.founderRole", e.target.value)} />
          </div>
          <TextInput label="Establishment" value={form.hero?.est || ""} onChange={(e) => set("hero.est", e.target.value)} placeholder="Est. 2014" />
        </div>
      ),
    },
    {
      title: "Quote",
      content: (
        <div className="space-y-4">
          <TextArea label="Quote Text" value={form.quote?.text || ""} onChange={(e) => set("quote.text", e.target.value)} rows={3} />
          <TextInput label="Attribution" value={form.quote?.attribution || ""} onChange={(e) => set("quote.attribution", e.target.value)} />
        </div>
      ),
    },
    {
      title: "Founder Story",
      content: (
        <div className="space-y-4">
          <TextInput label="Eyebrow" value={form.story?.eyebrow || ""} onChange={(e) => set("story.eyebrow", e.target.value)} />
          <TextInput label="Title" value={form.story?.title || ""} onChange={(e) => set("story.title", e.target.value)} />
          <TextArea label="Paragraphs (one per line)" value={(form.story?.paragraphs || []).join("\n")} onChange={(e) => set("story.paragraphs", e.target.value.split("\n").filter(Boolean))} rows={6} />
          <TextInput label="Signature" value={form.story?.signature || ""} onChange={(e) => set("story.signature", e.target.value)} />
          <ImagePicker label="Story Image" value={form.story?.image} onChange={(v) => set("story.image", v)} />
        </div>
      ),
    },
    {
      title: "Overview Section",
      content: (
        <div className="space-y-5">
          <TextInput label="Eyebrow" value={form.overview?.eyebrow || ""} onChange={(e) => set("overview.eyebrow", e.target.value)} />
          <TextInput label="Title" value={form.overview?.title || ""} onChange={(e) => set("overview.title", e.target.value)} />
          <TextArea label="Body" value={form.overview?.body || ""} onChange={(e) => set("overview.body", e.target.value)} rows={4} />

          <div>
            <label className={labelCls}>Values</label>
            <div className="space-y-3">
              {(form.overview?.values || []).map((v, i) => (
                <div key={i} className="rounded-xl border border-ink/10 bg-surface-2/50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Value {i + 1}</span>
                    <button onClick={() => removeValue(i)} className="rounded p-1 text-xs text-red-500/70 hover:text-red-600"><Trash2 size={12} /></button>
                  </div>
                  <TextInput label="Title" value={v.title} onChange={(e) => { const vals = [...(form.overview?.values || [])]; vals[i] = { ...vals[i], title: e.target.value }; set("overview.values", vals); }} className="mb-3" />
                  <TextArea label="Description" value={v.desc} onChange={(e) => { const vals = [...(form.overview?.values || [])]; vals[i] = { ...vals[i], desc: e.target.value }; set("overview.values", vals); }} rows={2} />
                </div>
              ))}
              <button onClick={addValue} className={btnGhost + " text-xs py-2"}><Plus size={12} /> Add Value</button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Company Stats",
      content: (
        <div className="space-y-4">
          {(form.stats || []).map((s, i) => (
            <div key={i} className="grid grid-cols-3 gap-3 rounded-xl border border-ink/10 bg-surface-2/50 p-4">
              <TextInput label="Value" type="number" value={s.value} onChange={(e) => { const stats = [...form.stats]; stats[i] = { ...stats[i], value: Number(e.target.value) }; set("stats", stats); }} />
              <TextInput label="Suffix" value={s.suffix} onChange={(e) => { const stats = [...form.stats]; stats[i] = { ...stats[i], suffix: e.target.value }; set("stats", stats); }} />
              <TextInput label="Label" value={s.label} onChange={(e) => { const stats = [...form.stats]; stats[i] = { ...stats[i], label: e.target.value }; set("stats", stats); }} />
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "FAQs",
      content: (
        <div className="space-y-4">
          {(form.faqs || []).map((faq, i) => (
            <div key={i} className="rounded-xl border border-ink/10 bg-surface-2/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">FAQ {i + 1}</span>
                <button onClick={() => removeFaq(i)} className="rounded p-1 text-xs text-red-500/70 hover:text-red-600"><Trash2 size={12} /></button>
              </div>
              <TextInput label="Question" value={faq.question} onChange={(e) => { const faqs = [...form.faqs]; faqs[i] = { ...faqs[i], question: e.target.value }; set("faqs", faqs); }} className="mb-3" />
              <TextArea label="Answer" value={faq.answer} onChange={(e) => { const faqs = [...form.faqs]; faqs[i] = { ...faqs[i], answer: e.target.value }; set("faqs", faqs); }} rows={3} />
            </div>
          ))}
          <button onClick={addFaq} className={btnGhost + " text-xs py-2"}><Plus size={12} /> Add FAQ</button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 pt-1 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg tracking-tight text-ink">About Us Content</h2>
          <p className="mt-0.5 text-sm text-muted">Edit the content shown on the public About page.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className={btnPrimary}>
          <Save size={15} /> {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-ink/8 bg-surface p-5 shadow-[0_1px_2px_rgba(21,20,15,0.04)]"
          >
            <h3 className="mb-4 font-display text-base tracking-tight text-ink">{section.title}</h3>
            {section.content}
          </motion.section>
        ))}
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving} className={btnPrimary}>
          <Save size={15} /> {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}