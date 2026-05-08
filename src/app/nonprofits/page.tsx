import ContactSection from "@/components/sections/ContactSection";
import { NonprofitsCTA } from "@/components/sections/NonprofitsCTA";
import { NonprofitsFAQ } from "@/components/sections/NonprofitsFAQ";
import { NonprofitsHero } from "@/components/sections/NonprofitsHero";
import { OurProcess } from "@/components/sections/OurProcess";
import { WhyBlueprint } from "@/components/sections/WhyBlueprint";

export default function NonprofitsPage() {
  return (
    <main>
      <NonprofitsHero />
      <WhyBlueprint />
      <OurProcess
        topRightDecoration={
          <div className="hidden xl:block w-[min(42vw,504px)] max-w-[90%] -translate-x-[10%] translate-y-[10%]">
            <div className="relative aspect-[812/741] w-full">
              <img
                src="/img/illos/blocks.svg"
                alt=""
                width={812}
                height={741}
                className="h-full w-full object-contain"
                decoding="async"
              />
            </div>
          </div>
        }
      />
      <NonprofitsFAQ />
      <NonprofitsCTA />
      <ContactSection />
    </main>
  );
}
