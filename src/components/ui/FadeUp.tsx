"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";

/** Vertical offset (px) at the start of the animation. */
const OFFSET_PX = 64;

/** Standard duration for all FadeUp animations (200ms). */
const DURATION_S = 0.5;

/** Stagger between sibling items when `index` is provided. */
const STAGGER_S = 0.16;

/** Shared easing curve. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type FadeUpProps = HTMLMotionProps<"div"> & {
  /**
   * Position in a staggered list (0-based). Each index adds one stagger
   * interval to the delay. Omit for a standalone (non-staggered) element.
   */
  index?: number;
  /**
   * When true, uses `whileInView` (fires as the element scrolls in).
   * When false (default), uses `animate` (fires immediately on mount).
   */
  inView?: boolean;
};

/**
 * Wrapper that fades an element up into place on mount or scroll-entry.
 * All visual parameters (duration, offset, easing, stagger) are centralised
 * here so every FadeUp in the app behaves identically.
 *
 * Usage — immediate (hero, above-fold):
 *   <FadeUp><YourContent /></FadeUp>
 *
 * Usage — staggered list (scroll-triggered):
 *   {items.map((item, i) => (
 *     <FadeUp key={item.id} index={i} inView>…</FadeUp>
 *   ))}
 */
export function FadeUp({
  index,
  inView = false,
  children,
  ...motionProps
}: FadeUpProps) {
  const reduceMotion = useReducedMotion();

  const delay = reduceMotion ? 0 : (index ?? 0) * STAGGER_S;
  const duration = reduceMotion ? 0 : DURATION_S;
  const initial = { opacity: 0, y: reduceMotion ? 0 : OFFSET_PX };
  const visible = { opacity: 1, y: 0 };

  const animProps = inView
    ? {
        initial,
        whileInView: visible,
        viewport: { once: true, amount: 0.35 } as const,
      }
    : {
        initial,
        animate: visible,
      };

  return (
    <motion.div
      {...animProps}
      transition={{ duration, delay, ease: EASE }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
