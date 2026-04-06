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
          <div className="w-[min(44vw,200px)] sm:w-[min(40vw,240px)] md:w-[min(34vw,220px)] lg:w-[min(46vw,420px)] max-w-[90%]">
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
