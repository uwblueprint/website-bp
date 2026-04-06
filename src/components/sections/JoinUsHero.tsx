"use client";

import UnderlineToBackground from "@/components/fancy/text/underline-to-background";
import { scrollToElement } from "@/lib/utils";

const SECTION_LINKS: { id: string; label: string }[] = [
  { id: "why-join", label: "why join" },
  { id: "what-we-look-for", label: "what we look for" },
  { id: "join-us-process", label: "our process" },
  { id: "join-us-faq", label: "FAQ" },
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

export function JoinUsHero() {
  return (
    <section
      aria-label="Join our team hero"
      className="flex min-h-dvh flex-col justify-end overflow-hidden bg-[var(--bp-blue)]"
    >
      <div className="grid w-full grid-cols-12 gap-0 px-8 pb-8">
        <div className="col-span-12 flex flex-col gap-4 md:gap-16">
          <h1
            className="text-xxl lowercase text-[var(--primary-light)]"
            style={{ lineHeight: 0.8 }}
          >
            join our team
          </h1>

          <div className="flex flex-col gap-1.5 text-lg">
            <p className="text-[var(--primary-light)]">
              We&apos;re a diverse group of students dedicated to doing social
              good, improving ourselves, and having fun while we&apos;re at it,
              and we would love for you to join us!
            </p>
            <p className="text-[var(--secondary-light)]">
              <SectionLink {...SECTION_LINKS[0]} />
              {", "}
              <SectionLink {...SECTION_LINKS[1]} />
              {", "}
              <SectionLink {...SECTION_LINKS[2]} />
              {", and "}
              <SectionLink {...SECTION_LINKS[3]} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
