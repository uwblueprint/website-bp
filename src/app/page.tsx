import IntroMuchHeading from "@/components/home/IntroMuchHeading";
import { HeroBottomContent } from "@/components/home/HeroBottomContent";
import { HomeHeroSyncedVisuals } from "@/components/home/HomeHeroSyncedVisuals";
import ScrollExperience from "@/components/home/ScrollExperience";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { InterestedSection } from "@/components/sections/InterestedSection";
import { HomeVideoSection } from "@/components/sections/HomeVideoSection";
export default function Home() {
  return (
    <main className="w-full">
      <section
        id="hero"
        aria-label="Hero"
        className="relative min-h-dvh w-full overflow-hidden bg-[var(--bp-blue)]"
      >
        {/*
          Stacking (back → front): optional decorative slots, wordmark (z-[1]), cutout SVG (z-[2]),
          bottom fade (z-[3]): bp-blue → transparent over artwork. Main UI z-[10].
          Navbar is fixed z-[100] outside this section and stays on top for clicks.
        */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden />

        {/* Wordmark + cutout fade in together after both SVGs load. */}
        <HomeHeroSyncedVisuals wordmarkTintOpacity={0.15} />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[30dvh] bg-gradient-to-t from-[var(--bp-blue)] to-transparent"
          aria-hidden
        />

        {/*
          Main layer: 32px inset, row at bottom, space-between (left copy / right CTA).
          z-[10] above decorative layers + bottom fade; navbar remains z-[100].
        */}
        <div className="absolute inset-0 z-[10] flex flex-col justify-end p-8">
          <HeroBottomContent />
        </div>

        <div
          id="hero-sentinel"
          aria-hidden="true"
          className="absolute bottom-0 left-0"
        />
      </section>

      <section
        aria-label="Introduction"
        className="w-full bg-[var(--primary-light)]"
      >
        <div className="p-8">
          <IntroMuchHeading />
        </div>
      </section>

      <section aria-label="Story" className="w-full bg-[var(--primary-light)]">
        <div className="p-8">
          <ScrollExperience />
        </div>
      </section>

      <MetricsSection />

      <div className="flex flex-col pt-2 pb-2">
        <InterestedSection />
        <HomeVideoSection />
      </div>
    </main>
  );
}
