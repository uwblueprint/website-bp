export function RolesHero() {
  return (
    <section
      aria-label="Roles hero"
      className="flex min-h-dvh flex-col justify-end overflow-hidden bg-[var(--bp-blue)]"
    >
      <div className="grid w-full grid-cols-12 gap-0 px-8 pb-8">
        <div className="col-span-12 flex flex-col gap-4 md:gap-16">
          <h1
            className="text-xxl lowercase text-[var(--primary-light)]"
            style={{ lineHeight: 0.8 }}
          >
            roles
          </h1>

          <div className="flex flex-col gap-1.5 text-lg">
            <p className="text-[var(--primary-light)]">
              Learn more about how we work as a team at Blueprint.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
