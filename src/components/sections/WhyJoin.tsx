"use client";

import { FadeUp } from "@/components/ui/FadeUp";
import { cn } from "@/lib/utils";

const VALUE_PROPS = [
  {
    title: "Make an impact",
    description:
      "By helping nonprofits better serve our communities through technology, the positive impacts of your hard work and expertise will be amplified.",
  },
  {
    title: "Make lifelong friends",
    description:
      "At Blueprint, the relationships we form with each other will long outlast the scope of the projects we work on. Our culture is as important to us as the work we produce, and we value quality time, celebrating our differences, and having fun together.",
  },
  {
    title: "Make personal change",
    description:
      "We care about your technical, social, and personal growth. With our robust culture of mentorship, we never stop teaching and learning.",
  },
];

export function WhyJoin({ className }: { className?: string }) {
  return (
    <section
      id="why-join"
      aria-label="Why join Blueprint"
      className={cn("bg-[var(--primary-light)] px-8 pt-24 pb-8", className)}
    >
      <div className="grid w-full grid-cols-12 gap-0">
        <h2 className="col-span-12 text-xxl lowercase text-[var(--bp-blue)] pb-16">
          why join?
        </h2>

        <div className="col-span-12 grid grid-cols-12 gap-0 min-[800px]:auto-rows-fr">
          {VALUE_PROPS.map((prop, i) => (
            <FadeUp
              key={prop.title}
              index={i}
              inView
              className="col-span-12 min-[800px]:col-span-4"
            >
              <div className="h-full">
                <div className="flex h-full flex-col p-6 transition-colors duration-200 hover:bg-black/5">
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
