"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { FadeUp } from "@/components/ui/FadeUp";
import { cn } from "@/lib/utils";

export function NonprofitsCTA({ className }: { className?: string }) {
  return (
    <section
      aria-label="Learn more"
      className={cn("bg-[var(--background)] px-8 pb-8 pt-24 md:pb-24", className)}
    >
      <div className="grid w-full grid-cols-12 gap-0">
        <h2 className="col-span-12 text-xxl lowercase text-[var(--bp-blue)] pb-8 md:pb-12">
          learn more
        </h2>

        <p className="col-span-12 text-lg text-[var(--primary-dark)] pb-12 md:pb-16 md:w-8/12">
          Curious about the kind of work we do? Check out the projects
          we&apos;ve shipped, or read our in-depth guide on how we evaluate
          and select nonprofit partners.
        </p>

        <div className="col-span-12 flex flex-col gap-4 min-[800px]:flex-row">
          <FadeUp index={0} inView>
            <Link
              href="/projects"
              className={buttonVariants({
                variant: "filled-blue",
                size: "md",
              })}
            >
              View our projects
            </Link>
          </FadeUp>

          <FadeUp index={1} inView>
            <a
              href="https://uwblueprint.notion.site"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "outline-blue",
                size: "md",
              })}
            >
              Read our nonprofit criteria
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
