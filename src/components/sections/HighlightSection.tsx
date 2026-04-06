"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { flushSync } from "react-dom";

import { cn } from "@/lib/utils";

const MEGAPHONE_SRC = "/illos/megaphone.svg";

/** Visual rotation for the shared megaphone asset (four distinct angles). */
const ILLUSTRATION_TRANSFORMS = [
  "rotate(-8deg)",
  "rotate(18deg)",
  "rotate(172deg) scaleX(-1)",
  "rotate(-22deg) scaleY(-1)",
] as const;

export type HighlightTab = {
  /** Shown in the tab strip, e.g. "01" */
  indexLabel: string;
  /** Tab title; on narrow viewports, shown above the description */
  title: string;
  /** Main body copy under the tabs */
  description: string;
  /** Optional override for megaphone angle (index into default set if omitted) */
  illustrationTransform?: string;
};

export type HighlightSectionProps = {
  title: string;
  tabs: HighlightTab[];
  id?: string;
  className?: string;
};

export function HighlightSection({
  title,
  tabs,
  id,
  className,
}: HighlightSectionProps) {
  const baseId = useId();
  const panelId = (i: number) => `${baseId}-panel-${i}`;
  const tabId = (i: number) => `${baseId}-tab-${i}`;

  const [active, setActive] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);
  const [tabRowHeightPx, setTabRowHeightPx] = useState<number | null>(null);

  useEffect(() => {
    const el = tabListRef.current;
    if (!el) return;
    const measure = () => {
      setTabRowHeightPx(el.getBoundingClientRect().height);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [tabs.length]);

  const go = useCallback(
    (next: number) => {
      if (tabs.length === 0) return;
      const clamped = Math.max(0, Math.min(tabs.length - 1, next));
      setActive(clamped);
    },
    [tabs.length]
  );

  const onTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
      const last = tabs.length - 1;
      const focusTab = (index: number) => {
        document.getElementById(`${baseId}-tab-${index}`)?.focus();
      };
      switch (e.key) {
        case "ArrowRight": {
          e.preventDefault();
          if (i >= last) return;
          const next = i + 1;
          flushSync(() => setActive(next));
          focusTab(next);
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          if (i <= 0) return;
          const next = i - 1;
          flushSync(() => setActive(next));
          focusTab(next);
          break;
        }
        case "Home": {
          e.preventDefault();
          flushSync(() => setActive(0));
          focusTab(0);
          break;
        }
        case "End": {
          e.preventDefault();
          flushSync(() => setActive(last));
          focusTab(last);
          break;
        }
        default:
          break;
      }
    },
    [baseId, tabs.length]
  );

  const current = tabs[active];
  const illustrationTransform =
    current?.illustrationTransform ??
    ILLUSTRATION_TRANSFORMS[active % ILLUSTRATION_TRANSFORMS.length];

  if (tabs.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      className={cn(
        "relative flex min-h-dvh flex-col overflow-hidden bg-[var(--bp-blue)] px-8 py-12",
        className
      )}
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
        <h2
          id={`${baseId}-heading`}
          className="shrink-0 text-xxl lowercase text-[var(--primary-light)]"
        >
          {title}
        </h2>

        {/* Absorbs space between heading and tabs; section fills the viewport. */}
        <div className="min-h-0 flex-1" aria-hidden />

        <div className="relative flex w-full shrink-0 flex-col">
          {/* Tab strip: below 800px only index + 32px padding, height from content; at 800px+ fixed row + titles */}
          <div
            ref={tabListRef}
            role="tablist"
            aria-label={title}
            className="flex w-full flex-nowrap"
          >
            {tabs.map((tab, i) => {
              const selected = i === active;
              return (
                <button
                  key={`${tab.indexLabel}-${tab.title}`}
                  type="button"
                  role="tab"
                  id={tabId(i)}
                  aria-selected={selected}
                  aria-controls={panelId(i)}
                  tabIndex={selected ? 0 : -1}
                  aria-label={`${tab.indexLabel} ${tab.title}`}
                  onClick={() => go(i)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={cn(
                    "flex min-h-0 min-w-0 flex-1 basis-0 flex-col items-stretch justify-center overflow-hidden p-[24px] text-left transition-colors duration-200",
                    "min-[800px]:h-[200px] min-[800px]:justify-between min-[800px]:px-[24px] min-[800px]:py-6",
                    selected
                      ? "bg-[var(--primary-light)] text-[var(--primary-dark)] min-[800px]:text-[var(--primary-dark)]"
                      : "bg-transparent text-[var(--primary-light)] hover:bg-[var(--primary-light)]/10"
                  )}
                >
                  <span className="w-full text-md min-[800px]:text-[32px] min-[800px]:leading-none">
                    {tab.indexLabel}
                  </span>
                  <span className="text-md hidden min-w-0 w-full [overflow-wrap:anywhere] min-[800px]:block">
                    {tab.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Description + sub row */}
          <div className="flex flex-col bg-[var(--primary-light)]">
            <div
              role="tabpanel"
              id={panelId(active)}
              aria-labelledby={tabId(active)}
              className="flex min-h-min flex-col justify-start p-6 pb-12 lg:p-6"
              style={
                tabRowHeightPx != null
                  ? { minHeight: `${tabRowHeightPx}px` }
                  : undefined
              }
            >
              <p className="hidden max-[799px]:block shrink-0 pb-6 text-lg text-[var(--primary-dark)]">
                {current.title}
              </p>
              <p className="text-lg shrink-0 text-[var(--primary-dark)]">
                {current.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Megaphone — one angle per tab */}
      <div
        className="pointer-events-none absolute top-6 right-8 z-0 w-[min(56vw,280px)] max-w-[90%] sm:w-[min(48vw,360px)] md:top-8 lg:top-[60px] lg:w-[min(42vw,424px)]"
        aria-hidden
      >
        <div className="relative aspect-[424/330] w-full">
          <img
            src={MEGAPHONE_SRC}
            alt=""
            width={774}
            height={602}
            className="h-full w-full object-contain"
            style={{ transform: illustrationTransform }}
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
