"use client";

import Image from "next/image";

import { CursorTrail, CursorTrailProvider } from "@/components/ui/CursorTrail";
import { FadeUp } from "@/components/ui/FadeUp";
import { cn } from "@/lib/utils";

const PHOTOS = [
  {
    src: "/img/socials/f25-internal-murder-mystery.webp",
    alt: "Blueprint team at murder mystery social",
  },
  {
    src: "/img/socials/w24-eaf-escape-room.webp",
    alt: "Blueprint team at escape room",
  },
  {
    src: "/img/socials/f19-celebratory-burrito.webp",
    alt: "Blueprint design team social",
  },
  { src: "/img/socials/w24-sistema-kbbq.webp", alt: "Blueprint team dinner" },
  {
    src: "/img/socials/s24-eaf-toronto.webp",
    alt: "Blueprint team in Toronto",
  },
] as const;

/** Each row: left cell span + photo index, right cell span + photo index (12-col grid, gap-4). */
const ROWS: {
  left: { span: 8 | 4; index: number };
  right: { span: 8 | 4; index: number };
}[] = [
  { left: { span: 8, index: 0 }, right: { span: 4, index: 1 } },
  { left: { span: 4, index: 2 }, right: { span: 8, index: 3 } },
];

function PhotoCell({
  span,
  index,
  hoverLabel,
}: {
  span: 8 | 4;
  index: number;
  hoverLabel?: string;
}) {
  const photo = PHOTOS[index];
  const image = (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      className="object-cover"
      sizes={
        span === 8
          ? "(max-width: 799px) 100vw, (min-width: 800px) 67vw, 100vw"
          : "(max-width: 799px) 100vw, (min-width: 800px) 33vw, 100vw"
      }
    />
  );

  return (
    <FadeUp
      index={index}
      inView
      className={cn(
        "relative min-h-0 overflow-hidden max-[799px]:aspect-square",
        span === 8 ? "min-[800px]:col-span-8" : "min-[800px]:col-span-4",
      )}
    >
      {hoverLabel ? (
        <CursorTrail
          className="absolute inset-0"
          label={
            <span className="whitespace-nowrap bg-[var(--bp-blue)] px-2 py-1 font-roobert text-sm text-[var(--primary-light)] shadow-md">
              {hoverLabel}
            </span>
          }
        >
          {image}
        </CursorTrail>
      ) : (
        image
      )}
    </FadeUp>
  );
}

/** `hoverLabels` shows a cursor-trailing label per photo, in reading order. */
export function TeamPhotos({
  className,
  hoverLabels,
}: {
  className?: string;
  hoverLabels?: string[];
}) {
  const grid = (
    <section
      aria-label="Team photos"
      className={cn("bg-[var(--primary-light)] px-8 pt-8 pb-8", className)}
    >
      <div className="grid grid-cols-12 gap-4">
        {ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="col-span-12 grid grid-cols-12 gap-4 max-[799px]:grid-cols-1 max-[799px]:gap-4 min-[800px]:aspect-[5/1]"
          >
            <PhotoCell
              {...row.left}
              hoverLabel={hoverLabels?.[rowIndex * 2]}
            />
            <PhotoCell
              {...row.right}
              hoverLabel={hoverLabels?.[rowIndex * 2 + 1]}
            />
          </div>
        ))}
      </div>
    </section>
  );

  return hoverLabels ? <CursorTrailProvider>{grid}</CursorTrailProvider> : grid;
}
