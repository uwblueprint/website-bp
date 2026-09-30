"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/** Spring pulling the sticker toward the pointer while dragging (1/s²). */
const DRAG_STIFFNESS = 600;
/** Damping on that spring (1/s). Slightly under critical for a hint of wobble. */
const DRAG_DAMPING = 40;
/** Exponential velocity decay after release (1/s). */
const FRICTION = 2.5;
/** Share of velocity kept when bouncing off a container edge. */
const RESTITUTION = 0.45;
/** Glide stops below this speed (px/s). */
const STOP_SPEED = 5;
/** Largest frame step fed to the integrator, so a stalled tab can't teleport. */
const MAX_DT = 1 / 30;

type Bounds = { minX: number; maxX: number; minY: number; maxY: number };
type Phase = "idle" | "drag" | "glide";

interface DraggableStickerProps {
  /** Element the sticker's centre must stay inside. */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Positioning classes for the absolutely placed wrapper. */
  className?: string;
  children: React.ReactNode;
}

/**
 * Decorative sticker that can be flung around its container. It trails the
 * pointer on a spring, glides with friction after release, and bounces off
 * the edges. Only its centre is confined, so up to half can hang outside.
 * Always stacks above the section's content.
 */
export function DraggableSticker({
  containerRef,
  className,
  children,
}: DraggableStickerProps) {
  const reduceMotion = useReducedMotion();
  const [dragging, setDragging] = useState(false);

  const elRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const phase = useRef<Phase>("idle");
  const velocity = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const grabOffset = useRef({ x: 0, y: 0 });
  const bounds = useRef<Bounds | null>(null);
  const frame = useRef<number | null>(null);
  const lastTime = useRef(0);

  /** Offset range that keeps the sticker's centre inside the container. */
  const measure = useCallback((): Bounds | null => {
    const el = elRef.current;
    const container = containerRef.current;
    if (!el || !container) return null;
    const r = el.getBoundingClientRect();
    if (r.width === 0) return null;
    const c = container.getBoundingClientRect();
    const cx0 = r.left - x.get() + r.width / 2 - c.left;
    const cy0 = r.top - y.get() + r.height / 2 - c.top;
    return {
      minX: -cx0,
      maxX: c.width - cx0,
      minY: -cy0,
      maxY: c.height - cy0,
    };
  }, [containerRef, x, y]);

  const step = useCallback(
    (time: number) => {
      const dt = Math.min((time - lastTime.current) / 1000, MAX_DT);
      lastTime.current = time;

      let px = x.get();
      let py = y.get();
      const v = velocity.current;

      if (phase.current === "drag") {
        if (reduceMotion) {
          px = target.current.x;
          py = target.current.y;
          v.x = 0;
          v.y = 0;
        } else {
          v.x +=
            (DRAG_STIFFNESS * (target.current.x - px) - DRAG_DAMPING * v.x) *
            dt;
          v.y +=
            (DRAG_STIFFNESS * (target.current.y - py) - DRAG_DAMPING * v.y) *
            dt;
        }
      } else {
        const decay = Math.exp(-FRICTION * dt);
        v.x *= decay;
        v.y *= decay;
      }

      px += v.x * dt;
      py += v.y * dt;

      const b = bounds.current;
      if (b) {
        if (px < b.minX) {
          px = b.minX;
          if (v.x < 0) v.x = -v.x * RESTITUTION;
        } else if (px > b.maxX) {
          px = b.maxX;
          if (v.x > 0) v.x = -v.x * RESTITUTION;
        }
        if (py < b.minY) {
          py = b.minY;
          if (v.y < 0) v.y = -v.y * RESTITUTION;
        } else if (py > b.maxY) {
          py = b.maxY;
          if (v.y > 0) v.y = -v.y * RESTITUTION;
        }
      }

      x.set(px);
      y.set(py);

      if (phase.current === "glide" && Math.hypot(v.x, v.y) < STOP_SPEED) {
        phase.current = "idle";
        v.x = 0;
        v.y = 0;
        frame.current = null;
        return;
      }
      frame.current = requestAnimationFrame(step);
    },
    [reduceMotion, x, y],
  );

  const startLoop = useCallback(() => {
    if (frame.current !== null) return;
    lastTime.current = performance.now();
    frame.current = requestAnimationFrame(step);
  }, [step]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const update = () => {
      const b = measure();
      bounds.current = b;
      if (!b) return;
      x.set(Math.min(b.maxX, Math.max(b.minX, x.get())));
      y.set(Math.min(b.maxY, Math.max(b.minY, y.get())));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(container);
    return () => ro.disconnect();
  }, [containerRef, measure, x, y]);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    bounds.current = measure();
    grabOffset.current = { x: e.clientX - x.get(), y: e.clientY - y.get() };
    target.current = { x: x.get(), y: y.get() };
    phase.current = "drag";
    setDragging(true);
    startLoop();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (phase.current !== "drag") return;
    target.current = {
      x: e.clientX - grabOffset.current.x,
      y: e.clientY - grabOffset.current.y,
    };
  };

  const release = (e: React.PointerEvent<HTMLDivElement>) => {
    if (phase.current !== "drag") return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (reduceMotion) {
      velocity.current = { x: 0, y: 0 };
    }
    phase.current = "glide";
    setDragging(false);
    startLoop();
  };

  return (
    <div
      className={cn("z-10", className)}
      aria-hidden
      onDragStartCapture={(e) => e.preventDefault()}
    >
      <motion.div
        ref={elRef}
        style={{ x, y, touchAction: "none" }}
        className={cn(
          "pointer-events-auto select-none",
          dragging ? "cursor-grabbing" : "cursor-grab",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        onPointerCancel={release}
      >
        {children}
      </motion.div>
    </div>
  );
}
