"use client";

import { FadeUp } from "@/components/ui/FadeUp";
import { cn } from "@/lib/utils";

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
  /**
   * External link rendered immediately after `description` (include trailing space in
   * `description` if needed). Keeps step data serializable for server → client props.
   */
  descriptionLink?: { href: string; label: string; suffix?: string };
};

const DEFAULT_STEPS: ProcessStep[] = [
  {
    index: "01",
    title: "Initial Chat",
    description:
      "Have a chat with our VP Scoping, where we will learn more about your NPO and understand the pain point your NPO is facing.",
  },
  {
    index: "02",
    title: "Scoping Pod",
    description:
      "To learn more about your problem space, we will have a chat with your NPO and members of our Blueprint team. We will dive into your current processes and how we can build an MVP to meet your needs.",
  },
  {
    index: "03",
    title: "Statement of Work",
    description:
      "We will craft a SOW, which details the project requirements and features for an MVP.",
  },
  {
    index: "04",
    title: "Hand-off",
    description:
      "The project will be handed off to a team of designers, developers, and PM/PL. We will have bi-weekly meetings with you to keep track of progress!",
  },
];

export function OurProcess({
  className,
  id = "our-process",
  ariaLabel = "Our process",
  heading = "our process",
  steps = DEFAULT_STEPS,
  topRightDecoration,
}: {
  className?: string;
  id?: string;
  ariaLabel?: string;
  heading?: string;
  steps?: ProcessStep[];
  topRightDecoration?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative overflow-hidden bg-[var(--bp-blue)] px-8 pt-24 pb-4 md:pb-8",
        className,
      )}
    >
      <h2 className="text-xxl lowercase text-[var(--primary-light)] pb-8 md:pb-48">
        {heading}
      </h2>

      {topRightDecoration ? (
        <div
          className="pointer-events-none absolute right-8 top-6 z-0 translate-y-[72px] md:translate-y-[0px]"
          aria-hidden
        >
          {topRightDecoration}
        </div>
      ) : null}

      <div className="grid grid-cols-1 min-[800px]:grid-cols-4 min-[800px]:auto-rows-fr gap-0">
        {steps.map((step, i) => (
          <FadeUp key={step.index} index={i} inView>
            <div className="h-full">
              <div className="flex h-full flex-col py-6 md:px-6 transition-colors duration-200 hover:bg-white/5">
                <span className="pb-2 text-lg text-[var(--primary-light)]">
                  {step.index}
                </span>
                <h3 className="pb-4 text-lg text-[var(--primary-light)]">
                  {step.title}
                </h3>
                <p className="text-md md:pb-8 text-[var(--secondary-light)]">
                  {step.description}
                  {step.descriptionLink ? (
                    <>
                      <a
                        href={step.descriptionLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-from-font underline-offset-[0.2em] transition-colors hover:text-[var(--primary-light)]"
                      >
                        {step.descriptionLink.label}
                      </a>
                      {step.descriptionLink.suffix ?? ""}
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
