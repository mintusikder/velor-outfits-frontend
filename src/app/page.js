import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import ShopByCategory from "@/components/home/ShopByCategory";
import BestSellingProducts from "@/components/home/BestSellingProducts";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ShopByCategory />
      <BestSellingProducts />
    </main>
  );
}
