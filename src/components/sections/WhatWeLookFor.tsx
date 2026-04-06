"use client";

import { FadeUp } from "@/components/ui/FadeUp";
import { cn } from "@/lib/utils";

const TRAITS = [
  {
    title: "Passion for social good",
    description:
      "Do you love giving back to the community? Are you particularly passionate about a specific cause? Tell us about any prior volunteering experiences you may have had!",
  },
  {
    title: "The drive to learn",
    description:
      "Are you eager to learn new things, be they technical skills or social issues? Do you love a good challenge, even if it takes you out of your comfort zone?",
  },
  {
    title: "A technical fit",
    description:
      "Do you have the relevant experience or skills needed to make significant contributions? If not, do you have the technical foundations needed to learn them?",
  },
  {
    title: "A team player",
    description:
      "Do you enjoy collaborating and learning with others? Do you value everyone's perspectives and experiences even when they challenge your own?",
  },
];

export function WhatWeLookFor({ className }: { className?: string }) {
  return (
    <section
      id="what-we-look-for"
      aria-label="What we look for"
      className={cn("bg-[var(--bp-blue)] px-8 pt-24 pb-8", className)}
    >
      <h2 className="text-xxl lowercase text-[var(--primary-light)] pb-8 md:pb-48">
        what we look for
      </h2>

      <div className="grid grid-cols-1 min-[800px]:grid-cols-4 min-[800px]:auto-rows-fr gap-0">
        {TRAITS.map((trait, i) => (
          <FadeUp key={trait.title} index={i} inView>
            <div className="h-full">
              <div className="flex h-full flex-col  md:p-6 transition-colors duration-200 hover:bg-white/5">
                <h3 className="pb-4 text-lg text-[var(--primary-light)]">
                  {trait.title}
                </h3>
                <p className="text-md pb-8 text-[var(--secondary-light)]">
                  {trait.description}
                </p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
