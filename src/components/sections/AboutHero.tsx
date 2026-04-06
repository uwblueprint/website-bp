"use client";

import UnderlineToBackground from "@/components/fancy/text/underline-to-background";
import { scrollToElement } from "@/lib/utils";

const SECTION_LINKS: { id: string; label: string }[] = [
  { id: "about-history", label: "our history" },
  { id: "our-values", label: "our values" },
  { id: "about-socials", label: "our love for socials" },
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

/** Full-viewport About hero; matches Projects page hero layout and link styling. */
export function AboutHero() {
  return (
    <section
      aria-label="About us hero"
      className="flex h-screen flex-col justify-end overflow-hidden bg-[var(--bp-blue)]"
    >
      <div className="grid w-full grid-cols-12 gap-0 px-8 pb-8">
        <div className="col-span-12 flex flex-col gap-4">
          <h1
            className="text-xxl lowercase text-[var(--primary-light)]"
            style={{ lineHeight: 0.8 }}
          >
            about us
          </h1>

          <div className="flex flex-col gap-1.5 text-lg">
            <p className="text-[var(--primary-light)]">
              10+ years. 100+ students join us every term. Find out why:
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
