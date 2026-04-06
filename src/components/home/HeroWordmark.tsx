/**
 * Full-width “blueprint” wordmark from SVG; height follows intrinsic aspect ratio (no stretching).
 */
export default function HeroWordmark() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] flex w-full items-center justify-center">
      <h1 className="m-0 w-full max-w-none select-none">
        <img
          src="/bp-type.svg"
          alt="Blueprint"
          width={1496}
          height={402}
          className="block h-auto w-full max-w-none"
          decoding="async"
          fetchPriority="high"
        />
      </h1>
    </div>
  );
}
