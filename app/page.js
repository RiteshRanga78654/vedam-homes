import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectSection from "@/components/ProjectSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import MaterialsSection from "@/components/MaterialsSection";
import GallerySection from "@/components/GallerySection";
import ArticlesSection from "@/components/ArticlesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <AmenitiesSection />
        <MaterialsSection />
        <GallerySection />
        <ArticlesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
