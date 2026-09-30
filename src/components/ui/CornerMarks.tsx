import { cn } from "@/lib/utils";

/** Length of each arm of the bracket, measured from the corner point. */
const ARM_PX = 16;

/**
 * Right/bottom brackets sit 1px outside the card so they land on the same
 * pixels as the left/top brackets of an adjacent card in a gapless grid.
 */
const CORNERS = [
  { key: "tl", style: { left: 0, top: 0 }, edge: "left-0 top-0" },
  { key: "tr", style: { right: -1, top: 0 }, edge: "right-0 top-0" },
  { key: "bl", style: { left: 0, bottom: -1 }, edge: "bottom-0 left-0" },
  { key: "br", style: { right: -1, bottom: -1 }, edge: "bottom-0 right-0" },
];

/**
 * Contrast colour for the section background. Must stay opaque: adjacent cards
 * draw overlapping brackets, and translucent ones would stack.
 */
const COLOR = {
  blue: "var(--secondary-light)",
  white: "var(--secondary-dark)",
};

/**
 * 1px L-shaped brackets on each corner of the nearest `relative` ancestor,
 * shown while that ancestor (marked `group/card`) is hovered.
 * `on` is the background the card sits on.
 */
export function CornerMarks({
  on,
  className,
}: {
  on: keyof typeof COLOR;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-200 group-hover/card:opacity-100",
        className,
      )}
      style={{ color: COLOR[on] }}
    >
      {CORNERS.map(({ key, style, edge }) => (
        <span
          key={key}
          className="absolute"
          style={{ ...style, width: ARM_PX, height: ARM_PX }}
        >
          <span className={cn("absolute h-px w-full bg-current", edge)} />
          <span className={cn("absolute h-full w-px bg-current", edge)} />
        </span>
      ))}
    </span>
  );
}
