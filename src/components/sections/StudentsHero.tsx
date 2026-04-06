"use client";

/**
 * Full-viewport Students hero.
 *
 * Styled to match `ProjectsHero` (typography scale, colors, spacing).
 */
export function StudentsHero() {
  return (
    <section
      aria-label="Students hero"
      className="flex h-screen flex-col justify-end overflow-hidden bg-[var(--bp-blue)]"
    >
      <div className="grid w-full grid-cols-12 gap-0 px-8 pb-8">
        <div className="col-span-12 flex flex-col gap-4 md:gap-8">
          <h1
            className="text-xxl lowercase text-[var(--primary-light)]"
            style={{ lineHeight: 0.8 }}
          >
            students
          </h1>

          <div className="flex flex-col text-lg">
            <p className="text-[var(--primary-light)]">
              A team is only as good as it&apos;s members. We have great ones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
