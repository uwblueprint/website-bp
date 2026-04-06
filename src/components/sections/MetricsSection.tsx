"use client";

import Link from "next/link";

import { ArrowUpRight } from "@/components/ui/icons";
import { FadeUp } from "@/components/ui/FadeUp";

const MEGAPHONE_SRC = "/illos/megaphone.svg";

type Stat = {
  value: string;
  label: string;
  href: string;
};

const STATS: Stat[] = [
  {
    value: "40+",
    label: "Projects completed for nonprofits",
    href: "/projects",
  },
  {
    value: "700+",
    label: "Past & present student volunteers",
    href: "/students",
  },
  { value: "100,000+", label: "Accumulated volunteer hours", href: "/join-us" },
];

export function MetricsSection({ className }: { className?: string }) {
  return (
    <section
      aria-label="Our metrics"
      className={`relative overflow-hidden bg-[var(--bp-blue)] px-8 pt-12 pb-8 min-h-[100vh] grid grid-cols-12 gap-0 content-between${
        className ? ` ${className}` : ""
      }`}
    >
      <div className="relative z-[1] col-span-12">
        <h2 className="text-xxl lowercase text-[var(--primary-light)]">
          our metrics
        </h2>
      </div>

      <div className="relative z-[1] col-span-12">
        <div className="grid grid-cols-12 gap-0">
          {STATS.map((stat, index) => (
            <FadeUp
              key={stat.value}
              index={index}
              inView
              className="col-span-12 min-h-0 min-[800px]:col-span-4"
            >
              <Link
                href={stat.href}
                className="group relative flex h-full flex-col justify-between gap-4 py-8 md:px-8 md:py-8 transition-colors duration-200 hover:bg-[var(--primary-light)]/10 lg:gap-16"
              >
                <ArrowUpRight
                  className="absolute top-4 right-4 size-5 text-[var(--primary-light)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-hidden
                />
                <p className="[font-family:var(--font-body)] text-[32px] md:text-[64px] leading-none text-[var(--primary-light)]">
                  {stat.value}
                </p>
                <p className="text-lg text-[var(--primary-light)]">
                  {stat.label}
                </p>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Megaphone decoration */}
      <div
        className="pointer-events-none absolute top-6 right-8 z-0 max-w-[90%] translate-y-[72px] w-[min(44vw,200px)] sm:w-[min(40vw,260px)] md:w-[min(34vw,240px)] lg:w-[min(46vw,520px)]"
        aria-hidden
      >
        <div className="relative aspect-[424/330] w-full">
          <img
            src={MEGAPHONE_SRC}
            alt=""
            width={774}
            height={602}
            className="h-full w-full object-contain"
            style={{ transform: "rotate(18deg)" }}
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
