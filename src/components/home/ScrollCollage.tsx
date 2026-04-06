"use client";

import ScrapbookReveal from "@/components/ui/ScrapbookReveal";

export interface CollageCard {
  key: string;
  triggerKey: string;
  src: string;
  alt?: string;
  /** Percentage-based `top` within the 760×760 design frame. */
  top: string;
  /** Percentage-based `left` within the 760×760 design frame. */
  left: string;
  /** Percentage-based `width` within the 760×760 design frame. */
  width: string;
  /** Stacking order within the collage. */
  zIndex: number;
  /** Final resting rotation in degrees. Defaults to 0. */
  rotate?: number;
}

export interface ScrollCollageProps {
  cards: CollageCard[];
  activeKeys: Set<string>;
}

/**
 * Renders a 760×760 design-frame collage that scales proportionally
 * to fill the available width of its parent without distortion.
 */
export default function ScrollCollage({ cards, activeKeys }: ScrollCollageProps) {
  return (
    <div
      className="relative w-full max-w-[760px] mx-auto"
      style={{ aspectRatio: "1 / 1" }}
    >
      {cards.map((card) => (
        <div
          key={card.key}
          className="pointer-events-none absolute select-none"
          style={{
            top: card.top,
            left: card.left,
            width: card.width,
            zIndex: card.zIndex,
          }}
        >
          <ScrapbookReveal
            active={activeKeys.has(card.triggerKey)}
            rotateDeg={card.rotate ?? 0}
          >
            <img
              src={card.src}
              alt={card.alt ?? ""}
              className="block h-auto w-full"
              aria-hidden
              decoding="async"
            />
          </ScrapbookReveal>
        </div>
      ))}
    </div>
  );
}
