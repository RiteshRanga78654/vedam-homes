import Header from "@/app/homepage/components/Header";
import Footer from "@/app/homepage/components/Footer";
import HomePage from "./homepage/page";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
     <HomePage />
      </main>
      <Footer />
    </>
  );
}
                 