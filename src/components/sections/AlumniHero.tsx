"use client";

/**
 * Full-viewport Alumni hero.
 *
 * Styled to match `ProjectsHero` (typography scale, colors, spacing).
 */
export function AlumniHero() {
  return (
    <section
      aria-label="Alumni hero"
      className="flex h-screen flex-col justify-end overflow-hidden bg-[var(--bp-blue)]"
    >
      <div className="grid w-full grid-cols-12 gap-0 px-8 pb-8">
        <div className="col-span-12 flex flex-col gap-4 md:gap-16">
          <h1
            className="text-xxl lowercase text-[var(--primary-light)]"
            style={{ lineHeight: 0.8 }}
          >
            alumni
          </h1>

          <div className="flex flex-col gap-1.5 text-lg">
            <p className="text-[var(--primary-light)]">
              700+ students have contributed to our mission over the years.
              Here's them all{" <3"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
