"use client";

import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "motion/react";

import { useNavMenu } from "@/components/layout/NavMenuContext";
import { FadeUp } from "@/components/ui/FadeUp";
import { buttonVariants } from "@/components/ui/button-variants";
import { useNavHideProgress } from "@/lib/useNavHideProgress";
import { cn } from "@/lib/utils";

export default function ScrollToTopButton() {
  const { menuOpen } = useNavMenu();
  const navHideProgress = useNavHideProgress();
  const reduceMotion = useReducedMotion();
  const show = !menuOpen && navHideProgress >= 1;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-end p-8">
      <div className="pointer-events-auto">
        <FadeUp>
          <button
            type="button"
            className={cn(
              buttonVariants({ variant: "filled-blue", size: "default" }),
              "gap-2",
            )}
            onClick={scrollToTop}
            aria-label="Scroll to the top"
          >
            <ArrowUp className="size-4 shrink-0" aria-hidden strokeWidth={2} />
            scroll to the top
          </button>
        </FadeUp>
      </div>
    </div>
  );
}
