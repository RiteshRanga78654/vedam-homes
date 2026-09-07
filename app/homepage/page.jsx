import Header from "@/app/homepage/components/Header";                        
import HeroSection from "@/app/homepage/components/HeroSection";                                  
import AboutSection from "@/app/homepage/components/AboutSection";
import ProjectSection from "@/app/homepage/components/ProjectSection";    
import HorizontalShowcaseGSAP from "@/app/homepage/components/HorizontalShowcase";        
import PhilosophySection from "@/app/homepage/components/PhilosophySection";                              
import AmenitiesSection from "@/app/homepage/components/AmenitiesSection";                
import GallerySection from "@/app/homepage/components/GallerySection";                            
import TestimonialsSection from "@/app/homepage/components/TestimonialsSection";          
import MaterialsSection from "@/app/homepage/components/MaterialsSection";                                
import ArticlesSection from "@/app/homepage/components/ArticlesSection";                                          
import CTASection from "@/app/homepage/components/CTASection";                                    
import Footer from "@/app/homepage/components/Footer";                                

export default function HomePage() {
  return (
    <div className="bg-[#f5f1e8] text-[#15140f]">
  
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <PhilosophySection />
        <HorizontalShowcaseGSAP />
        <AmenitiesSection />
        <GallerySection />
        <ArticlesSection />
        <MaterialsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
     
    </div>
  );
}