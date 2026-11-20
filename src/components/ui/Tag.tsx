"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const STROKE_PX = 1.5;

/** Bubble height and spacing as fractions of the tag height. */
const BUMP_AMP_RATIO = 0.15;
const BUMP_LEN_RATIO = 0.82;

/**
 * The cloud is drawn this far above and below the tag box for breathing room
 * without changing layout height. Ancestors must not clip overflow.
 */
const OUTSET_Y_PX = 4;

/**
 * Width floor per size so tags read as a consistent set; longer labels grow
 * past it. Colour is inline because `text-sm/md` and `text-[…]` conflict in
 * tailwind-merge.
 */
const sizeClass = {
  sm: "text-sm min-w-[9em] px-[1.25em] py-2",
  md: "text-md min-w-[14em] px-[1.5em] py-3",
} as const;

function hashString(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededRandom(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Stadium = { x0: number; y0: number; x1: number; y1: number; r: number };

/** Point and outward normal at distance `u` clockwise from the top-left of the straight edge. */
function stadiumPoint(s: Stadium, u: number) {
  const line = Math.max(0, s.x1 - s.x0 - 2 * s.r);
  const arc = Math.PI * s.r;
  const perimeter = 2 * line + 2 * arc;
  let d = ((u % perimeter) + perimeter) % perimeter;
  const cy = (s.y0 + s.y1) / 2;

  if (d < line) return { x: s.x0 + s.r + d, y: s.y0, nx: 0, ny: -1 };
  d -= line;
  if (d < arc) {
    const a = -Math.PI / 2 + d / s.r;
    const nx = Math.cos(a);
    const ny = Math.sin(a);
    return { x: s.x1 - s.r + nx * s.r, y: cy + ny * s.r, nx, ny };
  }
  d -= arc;
  if (d < line) return { x: s.x1 - s.r - d, y: s.y1, nx: 0, ny: 1 };
  d -= line;
  const a = Math.PI / 2 + d / s.r;
  const nx = Math.cos(a);
  const ny = Math.sin(a);
  return { x: s.x0 + s.r + nx * s.r, y: cy + ny * s.r, nx, ny };
}

/**
 * Hand-drawn cloud: bubbles of roughly constant size around a pill, with
 * jittered spacing/height and an unclosed, overshooting end like a pen stroke.
 */
/** `h` is the layout height (sets bubble size); the shape fills `h + 2 * outsetY`. */
function cloudPath(w: number, h: number, outsetY: number, seed: string) {
  const rand = seededRandom(hashString(seed));
  const amp = Math.min(8, Math.max(4, h * BUMP_AMP_RATIO));
  const inset = amp + STROKE_PX;
  const drawH = h + 2 * outsetY;
  const s: Stadium = {
    x0: inset,
    y0: inset,
    x1: w - inset,
    y1: drawH - inset,
    r: (drawH - 2 * inset) / 2,
  };
  if (s.r <= 0 || s.x1 <= s.x0) return "";

  const perimeter =
    2 * Math.max(0, s.x1 - s.x0 - 2 * s.r) + 2 * Math.PI * s.r;
  const count = Math.max(6, Math.round(perimeter / (h * BUMP_LEN_RATIO)));
  const seg = perimeter / count;

  const params = Array.from({ length: count }, (_, i) =>
    i === 0 ? 0 : (i + (rand() - 0.5) * 0.5) * seg,
  );
  params.push(perimeter + seg * 0.4);

  const points = params.map((u, i) => {
    const p = stadiumPoint(s, u);
    const wobble =
      i === 0 ? 1.2 : i === params.length - 1 ? -1.2 : (rand() - 0.5) * 1.6;
    return { x: p.x + p.nx * wobble, y: p.y + p.ny * wobble };
  });

  const f = (n: number) => n.toFixed(2);
  let d = `M${f(points[0].x)} ${f(points[0].y)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const m = stadiumPoint(s, (params[i] + params[i + 1]) / 2);
    // On the curved ends the chord sits inside the pill; measure the bubble
    // from the pill edge, not the chord, so it never cuts in toward the label.
    const sag =
      (m.x - (a.x + b.x) / 2) * m.nx + (m.y - (a.y + b.y) / 2) * m.ny;
    const k = (Math.max(0, sag) + amp * (0.7 + rand() * 0.6)) * (4 / 3);
    const skew = (rand() - 0.5) * amp * 0.6;
    const ox = m.nx * k - m.ny * skew;
    const oy = m.ny * k + m.nx * skew;
    d += ` C${f(a.x + ox)} ${f(a.y + oy)} ${f(b.x + ox)} ${f(b.y + oy)} ${f(
      b.x,
    )} ${f(b.y)}`;
  }
  return d;
}

/**
 * Non-interactive label with a loosely sketched cloud outline in bp-blue.
 * `seed` keeps the outline stable; defaults to the label text.
 */
export function Tag({
  children,
  size = "md",
  seed,
  className,
}: {
  children: ReactNode;
  size?: keyof typeof sizeClass;
  seed?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = Math.round(el.offsetWidth);
      const h = Math.round(el.offsetHeight);
      setBox((prev) => (prev?.w === w && prev?.h === h ? prev : { w, h }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pathSeed = seed ?? (typeof children === "string" ? children : "tag");

  return (
    <span
      ref={ref}
      className={cn(
        "relative inline-flex w-fit items-center justify-center whitespace-nowrap",
        sizeClass[size],
        className,
      )}
      style={{ color: "var(--bp-blue)" }}
    >
      {box && (
        <svg
          aria-hidden
          className="pointer-events-none absolute left-0 overflow-visible"
          style={{ top: -OUTSET_Y_PX }}
          width={box.w}
          height={box.h + 2 * OUTSET_Y_PX}
          viewBox={`0 0 ${box.w} ${box.h + 2 * OUTSET_Y_PX}`}
          fill="none"
        >
          <path
            d={cloudPath(box.w, box.h, OUTSET_Y_PX, pathSeed)}
            stroke="currentColor"
            strokeWidth={STROKE_PX}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span className="relative">{children}</span>
    </span>
  );
}
