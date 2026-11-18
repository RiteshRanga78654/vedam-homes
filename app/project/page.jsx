import Header from "@/app/homepage/components/Header";
import Footer from "@/app/homepage/components/Footer";
import ProjectHero from "@/app/project/components/ProjectHero";
import ProjectGallery from "@/app/project/components/ProjectGallery";
import ProjectHomes from "@/app/project/components/ProjectHomes";
import ProjectLocation from "@/app/project/components/ProjectLocation";
import ProjectFaq from "@/app/project/components/ProjectFaq";
import ProjectEnquiry from "@/app/project/components/ProjectEnquiry";

export const metadata = {
  title: "Osiyan Habitat — Sector 27, Jhajjar, Haryana",
  description:
    "RERA-approved premium villa plots at Osiyan Habitat, Sector 27, Jhajjar — gated township, wide internal roads, parks, modern infrastructure and a development-linked payment plan.",
};

export default function ProjectPage() {
  return (
    <>
      <Header />
      <ProjectHero />
      <ProjectGallery />
      <ProjectHomes />
      <ProjectLocation />
      <ProjectFaq />
      <ProjectEnquiry />
      <Footer />
    </>
  );
}
