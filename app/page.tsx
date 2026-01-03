import { HeroSection } from "@/components/home/HeroSection";
import { TrustBadges } from "@/components/home/TrustBadges";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <FeaturedProducts />
      <CategoryShowcase />
      <Testimonials />
    </>
  );
}

