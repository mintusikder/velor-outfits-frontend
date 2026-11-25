import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import ShopByCategory from "@/components/home/ShopByCategory";
import BestSellingProducts from "@/components/home/BestSellingProducts";
import NewArrivals from "@/components/home/NewArrivals";
import PromotionalBanner from "@/components/home/PromotionalBanner";
import CustomerReviews from "@/components/home/CustomerReviews";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ShopByCategory />
      <BestSellingProducts />
      <NewArrivals />
      <PromotionalBanner />
      <CustomerReviews />
    </main>
  );
}
