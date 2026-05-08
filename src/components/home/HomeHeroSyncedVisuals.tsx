"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import HeroWordmark from "@/components/home/HeroWordmark";
import { cn } from "@/lib/utils";

/**
 * Fade in hero artwork only after the wordmark and cutout SVGs have loaded,
 * so they appear together (cached images handled via img.complete checks).
 */
export function HomeHeroSyncedVisuals({
  wordmarkTintOpacity = 0.15,
}: {
  wordmarkTintOpacity?: number;
}) {
  const wordmarkDone = useRef(false);
  const cutoutDone = useRef(false);
  const cutoutImgRef = useRef<HTMLImageElement | null>(null);
  const [visible, setVisible] = useState(false);

  const tryReveal = useCallback(() => {
    if (wordmarkDone.current && cutoutDone.current) {
      setVisible(true);
    }
  }, []);

  const markWordmark = useCallback(() => {
    if (wordmarkDone.current) return;
    wordmarkDone.current = true;
    tryReveal();
  }, [tryReveal]);

  const markCutout = useCallback(() => {
    if (cutoutDone.current) return;
    cutoutDone.current = true;
    tryReveal();
  }, [tryReveal]);

  useEffect(() => {
    const img = cutoutImgRef.current;
    if (!img) return;
    if (img.complete && img.naturalHeight > 0) markCutout();
  }, [markCutout]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300 motion-reduce:transition-none",
        visible ? "opacity-100" : "opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div
        style={{ opacity: wordmarkTintOpacity }}
        className="absolute inset-0"
      >
        <HeroWordmark onImageLoad={markWordmark} />
      </div>

      <div
        className="pointer-events-none absolute left-1/2 z-[2] flex w-screen max-w-none -translate-x-1/2 justify-center overflow-x-hidden select-none transition-[top] duration-500 ease-out motion-reduce:transition-none"
        style={{
          top: "calc(50% - clamp(0px, (100vw - 950px) * 0.045, 56px))",
        }}
        aria-hidden
      >
        <img
          ref={cutoutImgRef}
          src="/img/f25-cutout-w-gradient.svg"
          alt=""
          width={1500}
          height={650}
          className="block h-auto shrink-0 transition-[width] duration-500 ease-out motion-reduce:transition-none max-[949px]:w-[950px] max-[949px]:max-w-none min-[950px]:w-full min-[950px]:max-w-none"
          decoding="async"
          fetchPriority="high"
          onLoad={markCutout}
        />
      </div>
    </div>
  );
}
