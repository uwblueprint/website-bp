"use client";

export function BuildHero() {
  return (
    <section
      aria-label="Build real things hero"
      className="flex h-[75vh] flex-col justify-end overflow-hidden bg-[var(--bp-blue)]"
    >
      <div className="grid w-full grid-cols-12 gap-0 px-8 pb-8">
        <div className="col-span-12 flex flex-col gap-4 md:gap-16">
          <h1 className="text-xxl lowercase text-[var(--primary-light)] leading-[0.88] md:leading-[0.8]">
            tired of building
            <br />
            fake things?
          </h1>

          <div className="flex max-w-3xl flex-col gap-1.5 text-lg">
            <p className="text-[var(--primary-light)]">
              Come build real things with us at Blueprint. Applications open
              July 1st.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
