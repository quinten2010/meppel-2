import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import WaterwaysSection from "@/components/WaterwaysSection";
import TradeRoutesSection from "@/components/TradeRoutesSection";
import HistoricalTimelineSection from "@/components/HistoricalTimelineSection";
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
        <WaterwaysSection />
        <TradeRoutesSection />
        <HistoricalTimelineSection />
        <FeaturedLocationsSection />
        <GallerySection />
        <StatsSection />
        <FooterSection />
      </main>
    </>
  );
}