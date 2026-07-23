"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { useNavMenu } from "@/components/layout/NavMenuContext";
import TextLinkButton from "@/components/ui/TextLinkButton";
import { useNavHideProgress } from "@/lib/useNavHideProgress";
import { cn } from "@/lib/utils";
import { contactLinks, navbarNavLinks } from "@/lib/site-links";

const NAV_TAGLINE = "tech for social good @ Waterloo, ON";

/** Shown below `md` where the social/tagline column is fixed 100px wide. */
const NAV_TAGLINE_SHORT = "tech for social good";

/** Open menu primary links: 32px below md, 64px from md up — overrides global display type scale. */
const NAV_PRIMARY_LINK_CLASS =
  "font-[family-name:var(--font-header)] font-semibold lowercase tracking-[var(--tracking-header)] text-[32px] leading-[1.4] md:text-[64px] md:leading-none";

/** Logo asset width (px). */
const LOGO_SIZE_PX = 32;

/** Hover: scale (200ms) + continuous spin (ramps with pointer). Spin: one full turn (500ms, matches panel). */
const LOGO_HOVER_S = 0.2;
const LOGO_SPIN_S = 0.5;
const easeNav = [0.22, 1, 0.36, 1] as const;

/** Target angular speed at the logo edge (deg/s); center uses this × boost. Lower = slower overall. */
const LOGO_HOVER_SPIN_DEG_PER_S = 250;
/** How quickly spin speed eases toward hover / idle (higher = snappier). */
const LOGO_HOVER_SPIN_RAMP = 12;
/**
 * Extra spin speed at the logo center vs the edges (fraction of base speed).
 * `1` → up to 2× base speed at the center; edges stay at 1×.
 */
const LOGO_CENTER_PROXIMITY_BOOST = 2;

export default function Navbar() {
  const { menuOpen: open, setMenuOpen: setOpen } = useNavMenu();
  const pathname = usePathname();
  const panelId = useId();
  const reduceMotion = useReducedMotion();
  const navColumnRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const skipLogoSpinOnOpenSync = useRef(true);
  const [navColumnHeight, setNavColumnHeight] = useState<number | null>(null);
  /** 0 = fully visible, 1 = fully slid up (hidden). Tied to scroll over first 1vh. */
  const navHideProgress = useNavHideProgress();
  /** Cumulative rotation (deg) for full spins on click / menu toggle. */
  const [logoSpinDeg, setLogoSpinDeg] = useState(0);

  const spinBase = useMotionValue(0);
  const hoverOffset = useMotionValue(0);
  const rotate = useTransform([spinBase, hoverOffset], ([base, hover]) => {
    const b = base as number;
    const h = hover as number;
    return b + h;
  });

  const wantsHoverSpinRef = useRef(false);
  /** Multiplier in [1, 1 + LOGO_CENTER_PROXIMITY_BOOST]; linear from edge → center. */
  const logoCenterBoostRef = useRef(1);
  const hoverSpinVelRef = useRef(0);
  const reduceMotionRef = useRef(reduceMotion);
  reduceMotionRef.current = reduceMotion;
  const lastFrameMsRef = useRef<number | null>(null);

  useEffect(() => {
    animate(spinBase, logoSpinDeg, {
      duration: reduceMotion ? 0 : LOGO_SPIN_S,
      ease: easeNav,
    });
  }, [logoSpinDeg, reduceMotion, spinBase]);

  const updateLogoPointerBoost = useCallback(
    (e: ReactPointerEvent<HTMLAnchorElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      const half = Math.max(r.width, r.height) / 2;
      const maxDist = half * Math.SQRT2;
      const edgeT = maxDist > 0 ? Math.min(1, dist / maxDist) : 0;
      logoCenterBoostRef.current =
        1 + LOGO_CENTER_PROXIMITY_BOOST * (1 - edgeT);
    },
    [],
  );

  const onLogoFrame = useCallback(() => {
    const now = performance.now();
    const dt =
      lastFrameMsRef.current == null
        ? 0
        : Math.min(0.05, (now - lastFrameMsRef.current) / 1000);
    lastFrameMsRef.current = now;

    const reduce = reduceMotionRef.current;
    const targetVel = reduce
      ? 0
      : wantsHoverSpinRef.current
      ? LOGO_HOVER_SPIN_DEG_PER_S * logoCenterBoostRef.current
      : 0;
    const v = hoverSpinVelRef.current;
    hoverSpinVelRef.current =
      v + (targetVel - v) * Math.min(1, LOGO_HOVER_SPIN_RAMP * dt);

    hoverOffset.set(hoverOffset.get() + hoverSpinVelRef.current * dt);
  }, [hoverOffset]);

  useAnimationFrame(onLogoFrame);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      setNavColumnHeight(null);
      return;
    }

    const el = navColumnRef.current;
    if (!el) return;

    const update = () => {
      setNavColumnHeight(el.getBoundingClientRect().height);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const root = headerRef.current;
      if (!root) return;
      const t = e.target;
      if (t instanceof Node && !root.contains(t)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  /** Full spin when menu opens/closes (skip first sync so mount doesn’t spin). */
  useEffect(() => {
    if (skipLogoSpinOnOpenSync.current) {
      skipLogoSpinOnOpenSync.current = false;
      return;
    }
    setLogoSpinDeg((d) => d + 360);
  }, [open]);

  /** 500ms — single phase with grid row; matches Tailwind purge (no dynamic class strings). */
  const panelTransitionClass = reduceMotion
    ? "duration-0"
    : "duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

  const effectiveHideProgress = open ? 0 : navHideProgress;

  // Standalone landing pages render without the site navbar.
  if (pathname === "/links") return null;

  return (
    <header
      ref={headerRef}
      className="fixed top-[var(--apply-banner-h,0px)] left-0 right-0 z-[100] w-full bg-[var(--bp-blue)] will-change-transform"
      style={{
        transform: `translateY(calc(-100% * ${effectiveHideProgress}))`,
        pointerEvents: effectiveHideProgress >= 1 ? "none" : "auto",
      }}
    >
      <nav aria-label="Primary" className="flex w-full flex-col">
        {/* Top strip: always visible */}
        <div className="relative h-24 w-full shrink-0">
          <button
            type="button"
            className="absolute right-8 top-1/2 z-10 inline-flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-none border-0 bg-transparent p-0 text-[var(--primary-light)] transition-[transform,opacity] duration-200 ease-out hover:scale-[0.95] hover:opacity-95"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <Menu className="size-6" aria-hidden strokeWidth={2} />
          </button>

          <Link
            href="/"
            aria-label="Blueprint home"
            className="absolute left-8 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center"
            onClick={() => setLogoSpinDeg((d) => d + 360)}
            onPointerEnter={(e) => {
              wantsHoverSpinRef.current = true;
              updateLogoPointerBoost(e);
            }}
            onPointerMove={updateLogoPointerBoost}
            onPointerLeave={() => {
              wantsHoverSpinRef.current = false;
              logoCenterBoostRef.current = 1;
            }}
          >
            {/*
              Single transform box (32×32): avoids nested rotate origins and inline-block baseline drift.
              Hover + spin share one motion layer; transform-origin center of the square.
            */}
            <motion.span
              className="flex size-full items-center justify-center will-change-transform"
              style={{ transformOrigin: "50% 50%", rotate }}
              whileHover={{
                scale: 1.05,
                transition: {
                  duration: reduceMotion ? 0 : LOGO_HOVER_S,
                  ease: easeNav,
                },
              }}
              transition={{
                scale: {
                  duration: reduceMotion ? 0 : LOGO_HOVER_S,
                  ease: easeNav,
                },
              }}
            >
              <Image
                src="/bp-logo.svg"
                alt=""
                width={LOGO_SIZE_PX}
                height={LOGO_SIZE_PX}
                className="block size-8 object-contain"
                priority
              />
            </motion.span>
          </Link>
        </div>

        {/*
          One motion: grid row 0fr → 1fr (uncollapse). Gap is not animated separately.
          Content stays mounted; inert + aria-hidden when collapsed for a11y.
        */}
        <div
          className={cn(
            "grid w-full transition-[grid-template-rows]",
            panelTransitionClass,
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              id={panelId}
              role="region"
              aria-label="Menu"
              aria-hidden={!open}
              inert={!open}
              className={cn(
                "flex w-full min-w-0 flex-row flex-nowrap items-stretch justify-between gap-2 px-8 pb-8 pt-8 md:gap-8 md:pt-24",
                open,
                !open && "pointer-events-none",
              )}
            >
              <nav
                ref={navColumnRef}
                aria-label="Site sections"
                className="flex w-fit min-w-0 shrink-0 flex-col"
              >
                {navbarNavLinks.map(({ href, label }) => (
                  <TextLinkButton
                    key={href}
                    href={href}
                    variant="light"
                    size="nav"
                    className={cn(NAV_PRIMARY_LINK_CLASS, "w-fit md:pb-4")}
                  >
                    {label}
                  </TextLinkButton>
                ))}
              </nav>

              <div
                className={cn(
                  "flex min-h-0 w-max max-w-full shrink-0 flex-col justify-between self-stretch text-right",
                  "max-md:w-[100px] max-md:min-w-[100px] max-md:max-w-[100px]",
                )}
                style={{
                  maxHeight:
                    navColumnHeight != null
                      ? `${navColumnHeight}px`
                      : undefined,
                  overflowY: navColumnHeight != null ? "auto" : undefined,
                }}
              >
                <ul className="flex w-full min-w-0 shrink-0 flex-col items-end gap-4">
                  {contactLinks.map((link) => (
                    <li key={link.label} className="min-w-0 text-right">
                      <TextLinkButton
                        href={link.href}
                        variant="light"
                        size="md"
                        className="w-fit min-w-0 text-right"
                        copyValue={
                          "copyValue" in link ? link.copyValue : undefined
                        }
                      >
                        {link.label}
                      </TextLinkButton>
                    </li>
                  ))}
                </ul>
                <p
                  className="w-full min-w-0 max-w-full shrink-0 text-right text-md [overflow-wrap:anywhere] break-words"
                  style={{ color: "var(--secondary-light)" }}
                >
                  <span className="md:hidden">{NAV_TAGLINE_SHORT}</span>
                  <span className="hidden md:inline">{NAV_TAGLINE}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
