import Header from "@/app/homepage/components/Header";
import Footer from "@/app/homepage/components/Footer";
import ProjectHero from "@/app/project/components/ProjectHero";
import ProjectGallery from "@/app/project/components/ProjectGallery";
import ProjectOverview from "@/app/project/components/ProjectOverview";
import ProjectStory from "@/app/project/components/ProjectStory";
import ProjectHomes from "@/app/project/components/ProjectHomes";
import ProjectLocation from "@/app/project/components/ProjectLocation";
import ProjectFaq from "@/app/project/components/ProjectFaq";
import ProjectBrochure from "@/app/project/components/ProjectBrochure";
import ProjectEnquiry from "@/app/project/components/ProjectEnquiry";

export const metadata = {
  title: "Central Park Flower Valley — Sohna Road, Gurugram",
  description:
    "Ultra luxury homes at Central Park Flower Valley, Sohna Road, Gurugram — category galleries, an image-led home index, RERA-checked overview and site-visit enquiry.",
};

export default function ProjectPage() {
  return (
    <>
      <Header />
      <ProjectHero />
      <ProjectGallery />
      <ProjectStory />
      <ProjectOverview />
      <ProjectHomes />
      <ProjectLocation />
      <ProjectFaq />
      <ProjectBrochure />
      <ProjectEnquiry />
      <Footer />
    </>
  );
}