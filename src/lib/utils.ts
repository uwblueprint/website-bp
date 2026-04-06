import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Scrolls to an element by ID using a manual rAF loop instead of
 * `scrollIntoView` or `window.scrollTo({ behavior: 'smooth' })`.
 *
 * The native smooth scroll engine is fragile next to sticky BFCs and
 * motion-library layout flushes — it can be cancelled after just a few
 * frames. Driving the animation ourselves guarantees it always completes.
 */
export function scrollToElement(id: string, duration = 900): void {
  if (typeof window === "undefined") return;
  const target = document.getElementById(id);
  if (!target) return;

  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + window.scrollY;
  const diff = targetY - startY;
  if (diff === 0) return;

  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
