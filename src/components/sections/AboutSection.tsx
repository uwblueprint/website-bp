"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const SECTIONS = [
  {
    heading: "who we are",
    text: "Blueprint strives to make technology more accessible and useful for those who create communities and promote public welfare. We partner with local nonprofits and provide technology services free of charge.",
  },
  {
    heading: "what we do",
    text: "We are a group of students at the University of Waterloo dedicated to building technology for social good and driving meaningful change. Each term, our project teams work alongside nonprofits in order to support their efforts toward better serving our communities.",
  },
  {
    heading: "our roots",
    text: "Founded in 2012 at UC Berkeley, Blueprint aims to promote technology for social good by developing pro-bono software solutions for nonprofits. The University of Waterloo is Blueprint's first chapter outside of Berkeley, serving communities in Canada.",
  },
] as const;

/** bp-blue (#2D7BDF) at 10 % opacity — used for inactive headers. */
const INACTIVE_COLOR = "color-mix(in srgb, var(--bp-blue) 10%, transparent)";

export function AboutSection({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [textAnimKey, setTextAnimKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);

  const updateActive = useCallback((newIndex: number) => {
    if (newIndex !== activeIndexRef.current) {
      activeIndexRef.current = newIndex;
      setActiveIndex(newIndex);
      setTextAnimKey((k) => k + 1);
    }
  }, []);

  /** Scroll the page so the given section index becomes active. */
  const goToIndex = useCallback((index: number) => {
    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    // Land slightly past the index threshold so Math.floor resolves to it.
    const targetScroll =
      sectionTop + (index / SECTIONS.length + 0.01) * scrollable;

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const newIndex = Math.min(
        SECTIONS.length - 1,
        Math.floor(progress * SECTIONS.length),
      );

      updateActive(newIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateActive]);

  return (
    // Outer wrapper provides the scroll height; 3 × 100 vh = one "page" per section.
    <div
      id="about-history"
      ref={sectionRef}
      className={cn("relative bg-[var(--primary-light)]", className)}
      style={{ height: `${SECTIONS.length * 100}vh` }}
    >
      {/* Sticky inner — stays fixed to the viewport while the outer div scrolls past. */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid h-full w-full grid-cols-12 gap-0 px-8 py-8 content-between">
          {/* ── Stacked XXL headers — top left ─────────────────────────────── */}
          <div
            className="col-span-12 flex flex-col gap-0 -space-y-1 sm:-space-y-3"
            aria-label="About sections"
          >
            {SECTIONS.map((section, i) => (
              <button
                key={section.heading}
                onClick={() => goToIndex(i)}
                aria-pressed={i === activeIndex}
                className="text-xl lowercase text-left transition-colors duration-500 will-change-[color]"
                style={{
                  color: i === activeIndex ? "var(--bp-blue)" : INACTIVE_COLOR,
                  fontWeight: 600,
                  background: "none",
                  border: "none",
                  padding: 0,
                  /* Tighter than theme XXL (1) so stacked lines sit closer; negative space-y pulls rows together */
                  lineHeight: 0.8,
                  letterSpacing: "var(--tracking-header)",
                }}
              >
                {section.heading}
              </button>
            ))}
          </div>

          {/* ── Description — bottom right ──────────────────────────────────── */}
          <p
            key={textAnimKey}
            className="about-text-in col-span-12 text-lg text-[var(--primary-dark)] lg:col-span-6 lg:col-start-7 pb-24"
          >
            {SECTIONS[activeIndex].text}
          </p>
        </div>
      </div>
    </div>
  );
}
