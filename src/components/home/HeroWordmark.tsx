"use client";

import { useEffect, useRef } from "react";

type HeroWordmarkProps = {
  /** Fires when the wordmark image has decoded (duplicate calls ignored by parent). Cached images handled on mount when already complete. */
  onImageLoad?: () => void;
};

/**
 * Full-width “blueprint” wordmark from SVG; height follows intrinsic aspect ratio (no stretching).
 */
export default function HeroWordmark({ onImageLoad }: HeroWordmarkProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || !onImageLoad) return;
    if (img.complete && img.naturalHeight > 0) onImageLoad();
  }, [onImageLoad]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] flex w-full items-center justify-center">
      <h1 className="m-0 w-full max-w-none select-none">
        <img
          ref={imgRef}
          src="/bp-type.svg"
          alt="Blueprint"
          width={1496}
          height={402}
          className="block h-auto w-full max-w-none"
          decoding="async"
          fetchPriority="high"
          onLoad={() => onImageLoad?.()}
        />
      </h1>
    </div>
  );
}
