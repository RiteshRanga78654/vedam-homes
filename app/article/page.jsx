import Navbar from "@/app/homepage/components/Header";
import Footer from "@/app/homepage/components/Footer";
import SmoothScroll from "@/app/homepage/components/SmoothScroll";
import ArticleIndex from "./components/ArticleIndex";
import { getSiteArticles } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Journal",
  description:
    "Essays on architecture, investment, and considered living from the Vedam Homes studio — a premium real-estate journal from Visakhapatnam.",
};

export default async function ArticlePage() {
  const articles = await getSiteArticles();
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-canvas text-ink selection:bg-[#15140f] selection:text-[#f5f1e8]">
        <Navbar />
        <ArticleIndex articles={articles} />
        <Footer />
      </div> 
    </SmoothScroll>
  );
}