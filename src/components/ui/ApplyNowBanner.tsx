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

  const closePt = APPLICATION_CLOSE_DATETIME.tz("America/Los_Angeles").format(
    "MMMM D, YYYY [at] h:mm A",
  );
  const closeEt = APPLICATION_CLOSE_DATETIME.tz("America/Toronto").format(
    "MMMM D, YYYY [at] h:mm A",
  );

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
          {/* Applications to join Blueprint next term are open, and close{" "}
          {closeDate}. */}
          <strong className="text-[var(--bp-blue)]">Now hiring:</strong> VP
          Strategic Operations, Builder in Residence, VP Culture, and VP Growth.
          Applications close on{" "}
          <strong className="text-[var(--bp-blue)]">
            {closePt} PT / {closeEt} ET.
          </strong>
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
