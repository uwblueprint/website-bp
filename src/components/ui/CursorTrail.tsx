"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

// ─── Context ──────────────────────────────────────────────────────────────────

interface CursorTrailContextValue {
  enter: (label: React.ReactNode) => void;
  leave: () => void;
  move: (x: number, y: number) => void;
}

const CursorTrailContext = createContext<CursorTrailContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface CursorTrailProviderProps {
  children: React.ReactNode;
  /** Pixel offset from the cursor tip to the label's top-left corner. */
  offset?: { x: number; y: number };
  /** Classes on the floating label container — use this for independent styling. */
  labelClassName?: string;
}

/**
 * Renders a single cursor-trailing label for all descendant CursorTrail items.
 * Place this once around the region you want tracked.
 */
export function CursorTrailProvider({
  children,
  offset = { x: 14, y: 14 },
  labelClassName,
}: CursorTrailProviderProps) {
  const [label, setLabel] = useState<React.ReactNode>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Direct motion values — no spring so the label sits exactly at cursor+offset.
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);

  const labelElRef = useRef<HTMLDivElement | null>(null);
  const labelSizeRef = useRef({ w: 0, h: 0 });

  // Track the active nesting depth so rapid enter→leave→enter sequences
  // (e.g. moving between adjacent images) don't flicker the label.
  const depth = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    const el = labelElRef.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      labelSizeRef.current = { w: r.width, h: r.height };
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [label, labelClassName]);

  const enter = useCallback(
    (incoming: React.ReactNode) => {
      depth.current += 1;
      setLabel(incoming);
      setVisible(true);
    },
    [],
  );

  const leave = useCallback(() => {
    depth.current = Math.max(0, depth.current - 1);
    if (depth.current === 0) setVisible(false);
  }, []);

  const move = useCallback(
    (cx: number, cy: number) => {
      const { w, h } = labelSizeRef.current;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Prefer on the right of the cursor.
      let nextX = cx + offset.x;
      // If it would overflow, flip to the left.
      if (w > 0 && nextX + w > vw) {
        nextX = cx - offset.x - w;
      }
      // Clamp to viewport.
      nextX = Math.max(0, Math.min(vw - w, nextX));

      // Default below the cursor, but clamp vertically.
      let nextY = cy + offset.y;
      nextY = Math.max(0, Math.min(vh - h, nextY));

      x.set(nextX);
      y.set(nextY);
    },
    [x, y, offset.x, offset.y],
  );

  return (
    <CursorTrailContext.Provider value={{ enter, leave, move }}>
      {children}
      {mounted &&
        createPortal(
          <motion.div
            className={cn(
              "pointer-events-none fixed left-0 top-0 z-[9999]",
              labelClassName,
            )}
            style={{ x, y }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            ref={labelElRef}
          >
            {label}
          </motion.div>,
          document.body,
        )}
    </CursorTrailContext.Provider>
  );
}

// ─── Item wrapper ─────────────────────────────────────────────────────────────

interface CursorTrailProps {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps a hoverable element. Must be inside a CursorTrailProvider.
 * On hover the label is pushed to the shared floating element — no new
 * mount, no reload, instant text swap.
 */
export function CursorTrail({ label, children, className }: CursorTrailProps) {
  const ctx = useContext(CursorTrailContext);

  return (
    <div
      className={cn(className)}
      onMouseEnter={() => ctx?.enter(label)}
      onMouseLeave={() => ctx?.leave()}
      onMouseMove={(e) => ctx?.move(e.clientX, e.clientY)}
    >
      {children}
    </div>
  );
}
