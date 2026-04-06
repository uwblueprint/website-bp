"use client";

import Link from "next/link";

import UnderlineToBackground from "@/components/fancy/text/underline-to-background";
import { scrollToElement } from "@/lib/utils";

const SECTION_LINKS: { id: string; label: string }[] = [
  { id: "why-blueprint", label: "why us" },
  { id: "our-process", label: "our process" },
  { id: "nonprofits-faq", label: "FAQ" },
];

function SectionLink({ id, label }: { id: string; label: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToElement(id);
  };

  return (
    <UnderlineToBackground
      as="a"
      href={`#${id}`}
      onClick={handleClick}
      targetTextColor="var(--bp-blue)"
      className="text-[var(--secondary-light)]"
    >
      {label}
    </UnderlineToBackground>
  );
}

export function NonprofitsHero() {
  return (
    <section
      aria-label="Nonprofits hero"
      className="flex min-h-dvh flex-col justify-end overflow-hidden bg-[var(--bp-blue)]"
    >
      <div className="grid w-full grid-cols-12 gap-0 px-8 pb-8">
        <div className="col-span-12 flex flex-col gap-4 md:gap-16">
          <h1
            className="text-xxl lowercase text-[var(--primary-light)]"
            style={{ lineHeight: 0.8 }}
          >
            nonprofits
          </h1>

          <div className="flex flex-col gap-1.5 text-lg">
            <p className="text-[var(--primary-light)]">
              We build free, high-quality software for nonprofits that need it most.
            </p>
            <p className="text-[var(--secondary-light)]">
              <SectionLink {...SECTION_LINKS[0]} />
              {", "}
              <SectionLink {...SECTION_LINKS[1]} />
              {", and "}
              <SectionLink {...SECTION_LINKS[2]} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
