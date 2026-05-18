import { MEPPelTimeline } from "@/components/MEPPelTimeline";
import { IntroSequence } from "@/components/IntroSequence";
import { ParticleFooter } from "@/components/ParticleFooter";

export default function Home() {
  return (
    <>
      <IntroSequence />
      <main className="relative bg-[#383e4e] text-[#b6bac5]">
        <MEPPelTimeline />
        <ParticleFooter />
      </main>
    </>
  );
}