"use client";

import Link from "next/link";

import { FadeUp } from "@/components/ui/FadeUp";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const APPLY_URL = "https://uwblueprint.org/apply";

export function ApplicationsCTA({ className }: { className?: string }) {
  return (
    <section
      aria-label="Apply to Blueprint"
      className={cn("bg-[#121D5D] px-8 py-8 md:py-24 text-left", className)}
    >
      <FadeUp inView>
        <div className="grid w-full grid-cols-12 gap-0">
          <h2 className="col-span-12 max-w-3xl text-lg text-[var(--primary-light)] pb-4">
            Applications are open
          </h2>
          <p className="col-span-12 max-w-3xl text-md text-[var(--secondary-light)] pb-10">
            Applications close July 13th at 11:59pm. Come build real things with
            us.
          </p>

          <div className="col-span-12">
            <Link
              href={APPLY_URL}
              className={`${buttonVariants({
                variant: "filled-light",
                size: "md",
              })} text-[#121D5D]`}
            >
              apply now
            </Link>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
