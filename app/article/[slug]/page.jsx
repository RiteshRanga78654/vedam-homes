import { notFound } from "next/navigation";
import Navbar from "@/app/homepage/components/Header";
import Footer from "@/app/homepage/components/Footer";
import SmoothScroll from "@/app/homepage/components/SmoothScroll";
import ArticleDetail from "../components/ArticleDetail";
import { getPublishedArticle, getPublishedArticles } from "@/lib/content";

export const dynamicParams = true;

export async function generateStaticParams() {
  const list = await getPublishedArticles();
  return list.map((article) => ({ slug: article.slug || article.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      images: [{ url: article.image }],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) notFound();

  const list = await getPublishedArticles();
  const related = list.filter((a) => a.id !== article.id && a.slug !== article.id && a.id !== article.slug).slice(0, 3);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-canvas text-ink selection:bg-[#15140f] selection:text-[#f5f1e8]">
        <Navbar />
        <ArticleDetail article={article} related={related} />
        <Footer />
      </div>
    </SmoothScroll>
  );
}