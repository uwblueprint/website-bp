"use client";

import Link from "next/link";

import { FadeUp } from "@/components/ui/FadeUp";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const ROLES_LINK = "/roles";

export function RolesCTA({ className }: { className?: string }) {
  return (
    <section
      aria-label="Learn more about the roles at Blueprint"
      className={cn(
        "bg-[var(--primary-light)] px-8 pt-8 pb-8 md:pt-24 text-left",
        className,
      )}
    >
      <FadeUp inView>
        <div className="grid w-full grid-cols-12 gap-0">
          <h2 className="col-span-12 text-xxl lowercase text-[var(--bp-blue)] leading-[1.1] md:leading-none pb-8">
            our roles
          </h2>

          <p className="col-span-12 max-w-3xl text-md pb-12 text-[var(--secondary-dark)] min-[800px]:col-span-8">
            From developers and designers to product managers and finance,
            there&apos;s a place for you no matter your year or experience. We
            assess every applicant on their drive to learn, cultural fit, and
            passion for social good.
          </p>

          <div className="col-span-12">
            <Link
              href={ROLES_LINK}
              className={buttonVariants({ variant: "filled-blue", size: "md" })}
            >
              learn more about the roles
            </Link>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
