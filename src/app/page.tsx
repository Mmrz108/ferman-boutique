import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollDrivenHero } from "@/components/hero/ScrollDrivenHero";
import { CollectionSection } from "@/components/sections/CollectionSection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { BrandStory } from "@/components/sections/BrandStory";
import { Lookbook } from "@/components/sections/Lookbook";
import { Newsletter } from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <main className="bg-ink">
      <Navbar />
      <ScrollDrivenHero />
      <CollectionSection />
      <FeaturedProducts />
      <BrandStory />
      <Lookbook />
      <Newsletter />
      <Footer />
    </main>
  );
}
