import { LandingHeader } from "@/components/LandingHeader";
import { LandingHero } from "@/components/LandingHero";
import { LandingFeatures } from "@/components/LandingFeatures";
import { LandingHowItWorks } from "@/components/LandingHowItWorks";
import { LandingStats } from "@/components/LandingStats";
import { LandingCTA } from "@/components/LandingCTA";
import { LandingFooter } from "@/components/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingStats />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
