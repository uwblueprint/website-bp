"use client";

import { cn } from "@/lib/utils";

export type SlimBannerImage = {
  src: string;
  alt: string;
};

export interface SlimBannerProps {
  /** White bg + bp-blue text, or bp-blue bg + white text. */
  mode?: "light" | "blue";
  /** Main banner copy. */
  text: string;
  /** Optional images rendered inline with the text. */
  images?: SlimBannerImage[];
  className?: string;
}

export function SlimBanner({
  mode = "light",
  text,
  images,
  className,
}: SlimBannerProps) {
  const isLight = mode === "light";

  return (
    <section
      aria-label="Banner"
      className={cn(
        "px-8 py-8",
        isLight ? "bg-white text-[var(--secondary-dark)]" : "bg-[var(--bp-blue)] text-white",
        className,
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-md">{text}</p>

        {images && images.length > 0 ? (
          <div className="flex flex-wrap items-center gap-3">
            {images.map((img) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                className="h-10 w-auto select-none object-contain"
                decoding="async"
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

