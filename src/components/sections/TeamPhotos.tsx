"use client";

import Image from "next/image";

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

export function TeamPhotos({ className }: { className?: string }) {
  return (
    <section
      aria-label="Team photos"
      className={cn("bg-[var(--background)] px-8 pt-8 pb-8", className)}
    >
      <div className="grid grid-cols-12 gap-4">
        {ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="col-span-12 grid grid-cols-12 gap-4 max-[799px]:grid-cols-1 max-[799px]:gap-4 min-[800px]:aspect-[5/1]"
          >
            <FadeUp
              index={row.left.index}
              inView
              className={cn(
                "relative min-h-0 overflow-hidden max-[799px]:aspect-square",
                row.left.span === 8
                  ? "min-[800px]:col-span-8"
                  : "min-[800px]:col-span-4",
              )}
            >
              <Image
                src={PHOTOS[row.left.index].src}
                alt={PHOTOS[row.left.index].alt}
                fill
                className="object-cover"
                sizes={
                  row.left.span === 8
                    ? "(max-width: 799px) 100vw, (min-width: 800px) 67vw, 100vw"
                    : "(max-width: 799px) 100vw, (min-width: 800px) 33vw, 100vw"
                }
              />
            </FadeUp>
            <FadeUp
              index={row.right.index}
              inView
              className={cn(
                "relative min-h-0 overflow-hidden max-[799px]:aspect-square",
                row.right.span === 8
                  ? "min-[800px]:col-span-8"
                  : "min-[800px]:col-span-4",
              )}
            >
              <Image
                src={PHOTOS[row.right.index].src}
                alt={PHOTOS[row.right.index].alt}
                fill
                className="object-cover"
                sizes={
                  row.right.span === 8
                    ? "(max-width: 799px) 100vw, (min-width: 800px) 67vw, 100vw"
                    : "(max-width: 799px) 100vw, (min-width: 800px) 33vw, 100vw"
                }
              />
            </FadeUp>
          </div>
        ))}
      </div>
    </section>
  );
}
