"use client";

import Link from "next/link";

import {
  APPLICATION_CLOSE_DATETIME,
  APPLICATION_IS_LIVE,
  APPLICATION_LINK,
} from "@constants/applications";

/** Height of the bar. Kept in sync with `--apply-banner-h` set in the layout. */
export const APPLY_BAR_HEIGHT = "3.5rem";

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
      className="fixed inset-x-0 top-0 z-[120] flex h-14 items-center justify-between gap-3 bg-white px-4 md:px-8"
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
        className="shrink-0 text-sm text-[var(--bp-blue)] underline underline-offset-4 transition-opacity duration-200 hover:opacity-80 md:text-md"
      >
        Apply now
      </Link>
    </div>
  );
}
