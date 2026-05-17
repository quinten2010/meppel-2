import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import DiscoveryMapSection from "@/components/DiscoveryMapSection";
import FeaturedLocationsSection from "@/components/FeaturedLocationsSection";
import GallerySection from "@/components/GallerySection";
import StatsSection from "@/components/StatsSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <main className="relative bg-black">
        <HeroSection />
        <DiscoveryMapSection />
        <FeaturedLocationsSection />
        <GallerySection />
        <StatsSection />
        <FooterSection />
      </main>
    </>
  );
}