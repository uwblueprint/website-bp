"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Hex color for --secondary-light (#96BDEF) and --bp-blue (#2D7BDF).
 * Hardcoded so the rAF loop can interpolate without reading CSS every frame.
 */
const C0 = { r: 0x90, g: 0x95, b: 0x9d }; // --secondary-dark
const C1 = { r: 0x28, g: 0x2f, b: 0x3a }; // --primary-dark
// const C0 = { r: 0x96, g: 0xbd, b: 0xef }; // --secondary-light
// const C1 = { r: 0x2d, g: 0x7b, b: 0xdf }; // --bp-blue

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function colorAt(t: number) {
  const r = Math.round(lerp(C0.r, C1.r, t));
  const g = Math.round(lerp(C0.g, C1.g, t));
  const b = Math.round(lerp(C0.b, C1.b, t));
  return `rgb(${r},${g},${b})`;
}

/** How far (px) above the reading line a word needs to be to read as fully "lit". */
const READ_WINDOW = 100;

/** Reading line: fraction of viewport height from the **top** (0 = top, 1 = bottom).
 * 0.6 = 40% up from the bottom — words darken as they scroll above this line. */
const READ_LINE_FROM_TOP = 0.6;

/** readT thresholds for trigger word fire / un-fire. */
const TRIGGER_ON = 0.6;
const TRIGGER_OFF = 0.4;

export interface ScrollReaderProps {
  /** Text with optional `{key:word}` markers for trigger words. */
  paragraphs: string[];
  onTrigger: (key: string, dir: "on" | "off") => void;
  reduceMotion?: boolean | null;
}

interface WordMeta {
  text: string;
  triggerKey?: string;
}

function parseParagraphs(paragraphs: string[]): WordMeta[][] {
  return paragraphs.map((p) => {
    const words: WordMeta[] = [];
    const re = /\{(\w+):([^}]+)\}|(\S+)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(p)) !== null) {
      if (m[1] && m[2]) {
        words.push({ text: m[2], triggerKey: m[1] });
      } else if (m[3]) {
        words.push({ text: m[3] });
      }
    }
    return words;
  });
}

export default function ScrollReader({
  paragraphs,
  onTrigger,
  reduceMotion,
}: ScrollReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const wordMeta = useRef<WordMeta[]>([]);
  const firedRef = useRef<Map<string, boolean>>(new Map());
  const onTriggerRef = useRef(onTrigger);
  onTriggerRef.current = onTrigger;
  const reduceRef = useRef(reduceMotion);
  reduceRef.current = reduceMotion;

  const parsed = parseParagraphs(paragraphs);
  const flatWords: WordMeta[] = [];
  parsed.forEach((p) => flatWords.push(...p));

  useLayoutEffect(() => {
    wordMeta.current = flatWords;
  });

  useEffect(() => {
    if (reduceRef.current) {
      wordRefs.current.forEach((el) => {
        if (el) el.style.color = colorAt(1);
      });
    }
  }, []);

  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      const els = wordRefs.current;
      const meta = wordMeta.current;
      const reduce = reduceRef.current;
      const vpCenter =
        window.scrollY + window.innerHeight * READ_LINE_FROM_TOP;

      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const elCenter = window.scrollY + rect.top + rect.height / 2;
        const dist = vpCenter - elCenter;
        const readT = reduce
          ? 1
          : Math.max(0, Math.min(1, dist / READ_WINDOW));

        el.style.color = colorAt(readT);

        const m = meta[i];
        if (m?.triggerKey) {
          const wasFired = firedRef.current.get(m.triggerKey) ?? false;
          if (!wasFired && readT >= TRIGGER_ON) {
            firedRef.current.set(m.triggerKey, true);
            onTriggerRef.current(m.triggerKey, "on");
          } else if (wasFired && readT < TRIGGER_OFF) {
            firedRef.current.set(m.triggerKey, false);
            onTriggerRef.current(m.triggerKey, "off");
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  let wordIdx = 0;

  return (
    <div
      ref={containerRef}
      className="text-lg"
      style={{ color: "var(--secondary-light)", lineHeight: "150%" }}
    >
      {parsed.map((words, pi) => (
        <p key={pi} className={pi > 0 ? "mt-6" : undefined}>
          {words.map((w, wi) => {
            const idx = wordIdx++;
            return (
              <span
                key={`${pi}-${wi}`}
                ref={(el) => {
                  if (el) wordRefs.current[idx] = el;
                }}
                data-trigger={w.triggerKey ?? undefined}
              >
                {w.text}
                {wi < words.length - 1 ? " " : ""}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
}
