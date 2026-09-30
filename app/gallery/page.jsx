import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import Navbar from "@/app/homepage/components/Header";
import Footer from "@/app/homepage/components/Footer";
import SmoothScroll from "@/app/homepage/components/SmoothScroll";
import GalleryClient from "./components/GalleryClient";
import { getSiteGallery } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery",
  description:
    "A curated visual index of Vedam Homes residences — architectural imagery drawn from the Flower Valley estate and project elevations.",
};

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"]);

/** Aspect class per stored layout size, so the admin's choice is honoured. */
const SIZE_ASPECT = {
  regular: "aspect-[4/3]",
  wide: "aspect-[16/11]",
  tall: "aspect-[3/4]",
};

/**
 * next/image throws during render when a src points at a host that is not
 * in next.config images.remotePatterns, which 500s the entire page. One bad
 * legacy record must not take the gallery down, so filter to what we know
 * we can actually render.
 */
function isRenderableSrc(src) {
  if (typeof src !== "string" || !src) return false;
  if (src.startsWith("/")) return true;
  try {
    const url = new URL(src);
    if (url.protocol !== "https:") return false;
    return (
      url.hostname === "res.cloudinary.com" || url.hostname === "images.unsplash.com"
    );
  } catch {
    return false;
  }
}

function humanize(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/** Fallback: read any images that live in the bundled /public folders. */
function readImages(folder, label) {
  const dir = path.join(process.cwd(), "public", folder);
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((file) => ({
      id: `${folder}/${file}`,
      src: `/${folder}/${file}`,
      alt: humanize(file),
      label,
      aspect: SIZE_ASPECT.regular,
    }));
}

export default async function GalleryPage() {
  const stored = await getSiteGallery();

  const images =
    stored && stored.length > 0
      ? stored
          .filter((img) => isRenderableSrc(img.src))
          .map((img, i) => ({
            id: img.id || `gallery-${i}`,
            src: img.src,
            alt: img.title || `Gallery image ${i + 1}`,
            label: img.category || "Architecture",
            aspect: SIZE_ASPECT[img.size] || SIZE_ASPECT.regular,
          }))
      : [
          ...readImages("flower-valley", "Flower Valley"),
          ...readImages("project-img", "Project Elevations"),
        ];

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-canvas text-ink selection:bg-[#15140f] selection:text-[#f5f1e8]">
        <Navbar />
        <GalleryClient images={images} />
        <Footer />
      </div>
    </SmoothScroll>
  );

  
}