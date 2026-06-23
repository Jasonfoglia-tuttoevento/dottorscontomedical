import Navbar from "@/components/Layout/Navbar";
import HomeHero from "@/components/home/HomeHero";
import HomeCategories from "@/components/home/HomeCategories";
import Footer from "@/components/Layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HomeHero />
      <HomeCategories />
      <Footer />
    </main>
  );
}