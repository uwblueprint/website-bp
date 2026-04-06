"use client";

import Link from "next/link";

import { FadeUp } from "@/components/ui/FadeUp";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function HeroBottomContent() {
  return (
    <div className="grid min-h-0 w-full grid-cols-12 items-end gap-0 max-lg:gap-y-4">
      {/* Columns 1–6 */}
      <FadeUp index={0} className="col-span-12 lg:col-span-6">
        <p className="min-w-0 text-lg text-[var(--primary-light)]">
          A design team that builds bespoke tech for local and global
          nonprofits.
        </p>
      </FadeUp>
      {/* Columns 11–12 */}
      <FadeUp
        index={1}
        className="col-span-12 flex lg:col-span-2 lg:col-start-11 lg:justify-end"
      >
        <Link
          href="/nonprofits"
          className={cn(
            buttonVariants({ variant: "filled-light", size: "default" }),
          )}
        >
          nonprofits
        </Link>
      </FadeUp>
    </div>
  );
}
