import type { ReactNode } from "react";

/**
 * Splits a plain-text testimonial on the em/en dash before the attribution
 * (e.g. `"quote" — Name`) and renders the attribution in secondary-dark.
 */
export function TestimonialQuoteBody({ children }: { children: ReactNode }) {
  if (typeof children === "string") {
    const parts = children.split(/\s+[—–]\s+/);
    if (parts.length >= 2) {
      const attribution = parts[parts.length - 1]!;
      const body = parts.slice(0, -1).join(" — ");
      return (
        <>
          {body}
          <span className="text-[var(--secondary-dark)]"> — {attribution}</span>
        </>
      );
    }
  }
  return <>{children}</>;
}
