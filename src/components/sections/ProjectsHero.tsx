"use client";

import UnderlineToBackground from "@/components/fancy/text/underline-to-background";

/**
 * Project data for the featured five.
 *
 * `id` must match the `id` attribute on the corresponding project section
 * further down the page so the anchor-scroll works.
 *
 * `description` and `image` are intentionally empty stubs — they are the
 * hook for the hover-preview feature that will be added later. Each link
 * already receives `data-project-id` so the future preview handler can
 * identify which project is hovered without changing the link structure.
 */
const FEATURED_PROJECTS: {
  id: string;
  label: string;
  description?: string;
  image?: string;
}[] = [
  { id: "sistema", label: "Sistema" },
  { id: "feeding-canadian-kids", label: "Feeding Canadian Kids" },
  { id: "a-better-tent-city", label: "A Better Tent City" },
];

function ProjectLink({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <UnderlineToBackground
      as="a"
      href={`#${id}`}
      onClick={handleClick}
      data-project-id={id}
      targetTextColor="var(--bp-blue)"
      className="text-[var(--secondary-light)]"
      // `bg-current` in UnderlineToBackground → hover fill is secondary-light;
      // text animates to primary-light on hover.
    >
      {label}
    </UnderlineToBackground>
  );
}

/**
 * Full-viewport hero for the Projects page.
 *
 * - `h-screen` with `overflow-hidden` so the background fills behind the
 *   fixed navbar without being pushed down by it (`MainContent` already
 *   handles the `pt-16` offset for non-full-bleed pages; projects is listed
 *   as full-bleed).
 * - Layout: text block aligned to bottom-left via `flex flex-col justify-end`.
 * - The headline uses `text-xxl` (96px → 200px at lg) with `lowercase`.
 * - Subtext uses `text-lg` (32px Roobert) matching Figma's body-lg scale.
 * - Project links use `UnderlineToBackground` in `secondary-light` colour with
 *   a `data-project-id` attribute ready for future hover-preview wiring.
 */
export function ProjectsHero() {
  return (
    <section
      aria-label="Projects hero"
      className="flex h-screen flex-col justify-end overflow-hidden bg-[var(--bp-blue)]"
    >
      <div className="grid w-full grid-cols-12 gap-0 px-8 pb-8">
        <div className="col-span-12 flex flex-col gap-8 md:gap-16">
          <h1
            className="text-xxl lowercase text-[var(--primary-light)]"
            style={{ lineHeight: 0.8 }}
          >
            projects
          </h1>

          <div className="flex flex-col gap-1.5 text-lg">
            <p className="text-[var(--primary-light)]">
              32+ projects shipped. Here are 5 of our favourites:
            </p>

            <p className="text-[var(--secondary-light)]">
              {FEATURED_PROJECTS.map((project, i) => (
                <span key={project.id}>
                  <ProjectLink id={project.id} label={project.label} />
                  {i < FEATURED_PROJECTS.length - 1 && (
                    <span className="text-[var(--secondary-light)]">{", "}</span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
