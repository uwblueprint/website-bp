"use client";

import Link from "next/link";

import {
  APPLICATION_CLOSE_DATETIME,
  APPLICATION_IS_LIVE,
  APPLICATION_LINK,
} from "@constants/applications";
import { buttonVariants } from "@/components/ui/button-variants";

/** Height of the bar. Kept in sync with `--apply-banner-h` set in the layout. */
export const APPLY_BAR_HEIGHT = "3rem";

/**
 * Site-wide sticky announcement bar pinned above the navbar. Renders only while
 * applications are open; the layout mirrors this with `--apply-banner-h` so the
 * navbar and page content offset by exactly this height (0 when hidden).
 */
export function ApplyBar() {
  if (!APPLICATION_IS_LIVE) return null;

  const closeDate = APPLICATION_CLOSE_DATETIME.format("MMMM D, YYYY");

  return (
    <div
      aria-label="Applications banner"
      className="fixed inset-x-0 top-0 z-[120] flex h-12 items-center justify-between gap-3 bg-white px-4 md:px-8"
    >
      <p className="truncate text-sm text-[var(--secondary-dark)] md:text-md">
        <span className="hidden sm:inline">
          Applications to join Blueprint next term are open, and close{" "}
          {closeDate}.
        </span>
        <span className="sm:hidden">Applications close {closeDate}.</span>
      </p>

      <Link
        href={APPLICATION_LINK}
        className={`${buttonVariants({
          variant: "filled-blue",
          size: "sm",
        })} shrink-0`}
      >
        Apply
      </Link>
    </div>
  );
}
