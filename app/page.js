import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectSection from "@/components/ProjectSection";
// import ProjectSlider from "@/components/ProjectSlider";
import HorizontalShowcase from "@/components/HorizontalShowcase";
import PhilosophySection from "@/components/PhilosophySection";
import InteractiveVisual from "@/components/InteractiveVisual";
import AmenitiesSection from "@/components/AmenitiesSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MaterialsSection from "@/components/MaterialsSection";
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
        {/* <ProjectSlider /> */}
        <PhilosophySection />
        <HorizontalShowcase />
        <InteractiveVisual />
        <AmenitiesSection />
        <GallerySection />
        <TestimonialsSection />
        <MaterialsSection />
        <ArticlesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
