"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { inputCls, labelCls } from "./ui";
import { apiFetch } from "./hooks";

export function TextInput({ label, className = "", ...props }) {
  return (
    <div className={className}>
      {label && <label className={labelCls}>{label}</label>}
      <input {...props} className={`${inputCls} ${props.disabled ? "opacity-60" : ""}`} />
    </div>
  );
}

export function TextArea({ label, className = "", rows = 4, ...props }) {
  return (
    <div className={className}>
      {label && <label className={labelCls}>{label}</label>}
      <textarea
        {...props}
        rows={rows}
        className={`${inputCls} resize-y ${props.disabled ? "opacity-60" : ""}`}
      />
    </div>
  );
}

export function Select({ label, options = [], className = "", ...props }) {
  return (
    <div className={className}>
      {label && <label className={labelCls}>{label}</label>}
      <select {...props} className={`${inputCls} ${props.disabled ? "opacity-60" : ""}`}>
        {options.map((o) =>
          typeof o === "string" ? (
            <option key={o} value={o}>
              {o}
            </option>
          ) : (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )
        )}
      </select>
    </div>
  );
}

export function Toggle({ label, checked, onChange, className = "" }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 select-none ${className}`}
    >
      <span
        className={`relative inline-flex h-[22px] w-[40px] shrink-0 items-center rounded-full transition-colors duration-300 ${
          checked ? "bg-accent" : "bg-ink/15"
        }`}
        aria-hidden
      >
        <span
          className={`inline-block h-[16px] w-[16px] rounded-full bg-white shadow-sm transition-transform duration-300 ${
            checked ? "translate-x-[20px]" : "translate-x-[2px]"
          }`}
        />
      </span>
      {label && <span className="text-sm text-ink">{label}</span>}
    </label>
  );
}

export function ImagePicker({
  value,
  onChange,
  label,
  className = "",
  multiple = false,
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const doUpload = useCallback(
    async (files) => {
      setUploading(true);
      const urls = value ? (Array.isArray(value) ? [...value] : [value]) : [];
      try {
        for (const file of files) {
          const form = new FormData();
          form.append("file", file);
          const data = await apiFetch("/api/admin/upload", {
            method: "POST",
            headers: {},
            body: form,
          });
          urls.push(data.url);
        }
        onChange(multiple ? urls : urls[urls.length - 1]);
      } catch (err) {
        alert(err.message || "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [value, onChange, multiple]
  );

  function handleFiles(e) {
    if (e.target.files?.length) doUpload(Array.from(e.target.files));
  }

  function removeImage(idx) {
    if (multiple) {
      const next = [...value];
      next.splice(idx, 1);
      onChange(next);
    } else {
      onChange("");
    }
  }

  const images = multiple
    ? Array.isArray(value) ? value : value ? [value] : []
    : value
    ? [value]
    : [];

  return (
    <div className={className}>
      {label && <label className={labelCls}>{label}</label>}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (e.dataTransfer.files?.length) doUpload(Array.from(e.dataTransfer.files));
        }}
        className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors ${
          dragging
            ? "border-accent bg-accent/5"
            : "border-ink/12 bg-surface-2/40 hover:border-ink/20"
        }`}
      >
        <ImageIcon size={22} className="text-muted" />
        <p className="text-xs text-muted">
          {uploading ? "Uploading…" : "Drag & drop or click to browse"}
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-ink/5 px-3 py-1.5 text-xs font-medium text-ink/70 transition hover:bg-ink/10"
        >
          <Upload size={12} /> Choose file
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={handleFiles}
        />
      </div>
      {images.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={url} className="group relative h-20 w-20 overflow-hidden rounded-xl border border-ink/10">
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute right-1 top-1 hidden h-5 w-5 items-center justify-center rounded-full bg-night/70 text-white backdrop-blur transition hover:flex group-hover:flex"
                aria-label="Remove"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}