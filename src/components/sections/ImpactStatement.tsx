"use client";

import { FadeUp } from "@/components/ui/FadeUp";
import { cn } from "@/lib/utils";

export function ImpactStatement({ className }: { className?: string }) {
  return (
    <section
      aria-label="Our impact"
      className={cn("bg-[#F2F2F2] px-8 py-8 md:py-24", className)}
    >
      <FadeUp inView>
        <p className="max-w-3xl text-lg text-[var(--primary-dark)]">
          <span className="text-[var(--bp-blue)]">
            Our software makes an impact.
          </span>{" "}
          One shelter management portal means a roof over a thousand more heads.
          One routing algorithm means food reaches hundreds more children. And
          that&apos;s enough reason to build something great.
        </p>
      </FadeUp>
    </section>
  );
}
