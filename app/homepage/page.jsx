import { getPublishedArticles } from "@/lib/content";
import Header from "@/app/homepage/components/Header";                        
import HeroSection from "@/app/homepage/components/HeroSection";                                  
import AboutSection from "@/app/homepage/components/AboutSection";
import ProjectSection from "@/app/homepage/components/ProjectSection";    
import HorizontalShowcaseGSAP from "@/app/homepage/components/HorizontalShowcase";        
import PhilosophySection from "@/app/homepage/components/PhilosophySection";                              
import AmenitiesSection from "@/app/homepage/components/AmenitiesSection";
import VedamAmenities from "@/app/homepage/components/VedamAmenities";
import GallerySection from "@/app/homepage/components/GallerySection";                            
import TestimonialsSection from "@/app/homepage/components/TestimonialsSection";          
import MaterialsSection from "@/app/homepage/components/MaterialsSection";                                
import ArticlesSection from "@/app/homepage/components/ArticlesSection";                                          
import CTASection from "@/app/homepage/components/CTASection";                                    
import Footer from "@/app/homepage/components/Footer";                                

export default async function HomePage() {
  const articles = await getPublishedArticles();
  return (
    <div className="bg-canvas text-ink">
  
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <PhilosophySection />
        <HorizontalShowcaseGSAP />
        <AmenitiesSection/>
        <GallerySection />
        <ArticlesSection articles={articles} />
        <MaterialsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
     
    </div>
  );
}