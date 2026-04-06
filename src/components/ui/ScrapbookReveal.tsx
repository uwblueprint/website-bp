"use client";

import { useEffect, useRef, useState } from "react";

export interface ScrapbookRevealProps {
  /** When flipped true the slap animation plays; false plays the lift-off. */
  active: boolean;
  /** Final resting rotation in degrees. Pass a stable random value from the parent. */
  rotateDeg: number;
  children: React.ReactNode;
  className?: string;
  /**
   * Delay (ms) between `active` becoming true and the element snapping in.
   * @default 200
   */
  triggerDelay?: number;
  /**
   * Duration (ms) of the slap-settle animation (stage 2 → 3).
   * @default 200
   */
  slapDuration?: number;
}

type Phase = "hidden" | "slap" | "visible" | "lifting";

export default function ScrapbookReveal({
  active,
  rotateDeg,
  children,
  className,
  triggerDelay = 200,
  slapDuration = 200,
}: ScrapbookRevealProps) {
  const [phase, setPhase] = useState<Phase>("hidden");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Overshoot angle: same sign as resting, amplified 1.5×
  const slapRotate = rotateDeg * 1.5;

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (active) {
      // After triggerDelay → snap in at 120% scale (slap keyframe runs)
      timerRef.current = setTimeout(() => {
        setPhase("slap");
        // After slapDuration → animation has settled; mark as resting
        timerRef.current = setTimeout(() => {
          setPhase("visible");
        }, slapDuration);
      }, triggerDelay);
    } else {
      if (phase === "hidden") return;
      // Immediately start lift-off; remove after animation completes
      setPhase("lifting");
      timerRef.current = setTimeout(() => {
        setPhase("hidden");
      }, slapDuration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (phase === "hidden") return null;

  const cssVars = {
    "--sb-rotate": `${rotateDeg}deg`,
    "--sb-rotate-slap": `${slapRotate}deg`,
  } as React.CSSProperties;

  const animationStyle: React.CSSProperties =
    phase === "slap"
      ? {
          animation: `scrapbook-slap ${slapDuration}ms ease-out forwards`,
        }
      : phase === "lifting"
        ? {
            animation: `scrapbook-lift ${slapDuration}ms ease-in forwards`,
          }
        : {
            // Resting: hold the end-state transform without re-animating
            transform: `scale(1) rotate(${rotateDeg}deg)`,
            opacity: 1,
          };

  return (
    <div
      className={className}
      style={{ ...cssVars, ...animationStyle }}
    >
      {children}
    </div>
  );
}
