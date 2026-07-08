"use client";

import { FadeUp } from "@/components/ui/FadeUp";
import { cn } from "@/lib/utils";

const VALUE_PROPS = [
  {
    title: "100% pro bono",
    description:
      "We believe nonprofits shouldn't have to choose between impact and budget. Every project we take on is completely free — no hidden costs, no strings attached.",
  },
  {
    title: "Dedicated teams",
    description:
      "Each nonprofit is paired with a cross-functional team of designers, developers, and a technical lead who are fully invested in your success from day one.",
  },
  {
    title: "Built to last",
    description:
      "We don't just build an MVP and disappear. Our teams craft production-ready solutions with documentation, training, and a clean hand-off so your organization can maintain and grow what we build together.",
  },
];

export function WhyBlueprint({ className }: { className?: string }) {
  return (
    <section
      id="why-blueprint"
      aria-label="Why work with Blueprint"
      className={cn("bg-[var(--primary-light)] px-8 pt-24 pb-8", className)}
    >
      <div className="grid w-full grid-cols-12 gap-0 pb">
        <h2 className="col-span-12 text-xxl lowercase text-[var(--bp-blue)] pb-8 md:pb-16">
          why us
        </h2>

        <div className="col-span-12 text-lg text-[var(--primary-dark)] pb-8 md:pb-48 md:w-8/12">
          <p>
            UW Blueprint is a student-run organization at the University of
            Waterloo that builds technology solutions for nonprofits — for free.
            We pair passionate students with organizations doing meaningful
            work, delivering custom software that drives real community impact.
          </p>
        </div>

        <div className="col-span-12 grid grid-cols-12 gap-0 min-[800px]:auto-rows-fr">
          {VALUE_PROPS.map((prop, i) => (
            <FadeUp
              key={prop.title}
              index={i}
              inView
              className="col-span-12 min-[800px]:col-span-4"
            >
              <div className="h-full">
                <div className="flex h-full flex-col py-6 md:px-6 transition-colors duration-200 hover:bg-black/5">
                  <h3 className="pb-4 text-lg text-[var(--primary-dark)]">
                    {prop.title}
                  </h3>
                  <p className="text-md text-[var(--secondary-dark)]">
                    {prop.description}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
