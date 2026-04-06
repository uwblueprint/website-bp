"use client";

import { useEffect, useState } from "react";

/** Matches `Navbar`: navbar fully hides when scrollY reaches this fraction of viewport height. */
export const NAV_HIDE_SCROLL_VH = 0.5;

/**
 * 0 = navbar fully visible, 1 = navbar fully slid up (hidden), same mapping as `Navbar` when the menu is closed.
 */
export function useNavHideProgress() {
  const [navHideProgress, setNavHideProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const thresholdPx = window.innerHeight * NAV_HIDE_SCROLL_VH;
      const p = y <= 0 ? 0 : Math.min(1, y / Math.max(thresholdPx, 1));
      setNavHideProgress(p);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return navHideProgress;
}
