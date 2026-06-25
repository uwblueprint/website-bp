import type { Metadata } from "next";

import { ApplicationsCountdown } from "@/components/sections/ApplicationsCountdown";
import { BuildHero } from "@/components/sections/BuildHero";
import { ImpactStatement } from "@/components/sections/ImpactStatement";
import { RolesCTA } from "@/components/sections/RolesCTA";
import { TeamPhotos } from "@/components/sections/TeamPhotos";
import { WhatWeLookFor } from "@/components/sections/WhatWeLookFor";
import { WhyJoin } from "@/components/sections/WhyJoin";

export const metadata: Metadata = {
  title: "Build real things",
  description:
    "Tired of building fake things? Come build real things with us at UW Blueprint. Applications open July 1, 2026.",
};

export default function BuildPage() {
  return (
    <main>
      <BuildHero />
      <ImpactStatement />
      <WhyJoin />
      <TeamPhotos />
      <WhatWeLookFor />
      <RolesCTA />
      <ApplicationsCountdown />
    </main>
  );
}
