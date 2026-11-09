import Navbar from "@/app/homepage/components/Header";
import Footer from "@/app/homepage/components/Footer";
import SmoothScroll from "@/app/homepage/components/SmoothScroll";
import GalleryClient from "./components/GalleryClient";

export const dynamic = "force-static";

export const metadata = {
  title: "Gallery",
  description:
    "A curated visual index of Vedam Homes residences — architectural imagery drawn from the Flower Valley estate and project elevations.",
};

// All gallery data is maintained here.
// Add, remove, or edit images directly in this array.
const GALLERY_IMAGES = [
  {
    id: "flower-valley-1",
    src: "/white/arch.jpeg",
    alt: "Flower Valley Residence",
    label: "Flower Valley",
  },
  
  {
    id: "project-1",
    src: "/white/int1.jpeg",
    alt: "Project Elevation",
    label: "Project Elevations",
  },

  {
    id: "project-3",
    src: "/white/5.jpeg",
    alt: "Residential Design",
    label: "Project Elevations",
  },
    {
    id: "flower-valley-1",
    src: "/white/arch1.jpeg",
    alt: "Flower Valley Residence",
    label: "Flower Valley",
  },
    {
    id: "flower-valley-1",
    src: "/white/arch2.jpeg",
    alt: "Flower Valley Residence",
    label: "Flower Valley",
  },
    {
    id: "project-2",
    src: "/white/int2.jpeg",
    alt: "Modern Architecture",
    label: "Project Elevations",
  },
  {
    id: "flower-valley-2",
    src: "/white/ext1.jpeg",
    alt: "Flower Valley Architecture",
    label: "Flower Valley",
  },
  {
    id: "flower-valley-3",
    src: "/white/ext2.jpeg",
    alt: "Residential Exterior",
    label: "Flower Valley",
  },

  // Add more images below using the same structure.
];

export default function GalleryPage() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-canvas text-ink selection:bg-[#15140f] selection:text-[#f5f1e8]">
        <Navbar />
        <GalleryClient images={GALLERY_IMAGES} />
        <Footer />
      </div>
    </SmoothScroll>
  );
}