import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import Navbar from "@/app/homepage/components/Header";
import Footer from "@/app/homepage/components/Footer";
import SmoothScroll from "@/app/homepage/components/SmoothScroll";
import GalleryClient from "./components/GalleryClient";

export const metadata = {
  title: "Gallery",
  description:
    "A curated visual index of Vedam Homes residences — architectural imagery drawn from the Flower Valley estate and project elevations.",
};

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"]);

function humanize(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

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
      folder,
      label,
    }));
}

export default function GalleryPage() {
  const images = [
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