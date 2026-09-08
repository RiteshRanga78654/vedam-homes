import Navbar from "@/app/homepage/components/Header";
import Footer from "@/app/homepage/components/Footer";
import ProjectNav from "@/app/project/components/ProjectNav";
import ProjectHero from "@/app/project/components/ProjectHero";
import ProjectIntro from "@/app/project/components/ProjectIntro";
import ProjectDetails from "@/app/project/components/ProjectDetails";
import ProjectHighlights from "@/app/project/components/ProjectHighlights";
import ProjectAmenities from "@/app/project/components/ProjectAmenities";
import ProjectGallery from "@/app/project/components/ProjectGallery";
import ProjectPlans from "@/app/project/components/ProjectPlans";
import ProjectExperience from "@/app/project/components/ProjectExperience";
import ProjectLocation from "@/app/project/components/ProjectLocation";
import ProjectWhy from "@/app/project/components/ProjectWhy";
import ProjectTestimonials from "@/app/project/components/ProjectTestimonials";
import ProjectFaq from "@/app/project/components/ProjectFaq";
import ProjectFinalCta from "@/app/project/components/ProjectFinalCta";

export const metadata = {
  title: "Central Park Flower Valley — Sohna Road, Gurugram",
  description:
    "Low-rise luxury floors and villas at Central Park Flower Valley, Sohna Road, Gurugram — a 500+ acre township with nine botanical reserves, a 1.2 lakh sq. ft. clubhouse, and RERA-registered phased possession.",
};

export default function ProjectPage() {
  return (
    <>
      <Navbar />
      {/* Hero carries its own bottom-aligned section nav (pre-scroll) */}
      <ProjectHero />
      {/* Sticky scroll-spy nav (appears once you pass the hero) */}
      <ProjectNav />
      <ProjectIntro />
      <ProjectDetails />
      <ProjectHighlights />
      <ProjectAmenities />
      <ProjectGallery />
      <ProjectPlans />
      <ProjectExperience />
      <ProjectLocation />
      <ProjectWhy />
      <ProjectTestimonials />
      <ProjectFaq />
      <ProjectFinalCta />
      <Footer />
    </>
  );
}