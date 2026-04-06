"use client";

import Link from "next/link";

import {
  APPLICATION_CLOSE_DATETIME,
  APPLICATION_IS_LIVE,
  APPLICATION_LINK,
} from "@constants/applications";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export interface ApplyNowBannerProps {
  className?: string;
}

export function ApplyNowBanner({ className }: ApplyNowBannerProps) {
  if (!APPLICATION_IS_LIVE) return null;

  const closeDate = APPLICATION_CLOSE_DATETIME.format("MMMM D, YYYY");

  return (
    <section
      aria-label="Applications banner"
      className={cn(
        "bg-white px-8 py-8 text-[var(--secondary-dark)]",
        className,
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-md">
          Applications to join Blueprint next term are open, and close{" "}
          {closeDate}.
        </p>

        <div className="flex shrink-0 justify-end">
          <Link
            href={APPLICATION_LINK}
            className={buttonVariants({ variant: "filled-blue" })}
          >
            Apply
          </Link>
        </div>
      </div>
    </section>
  );
}
