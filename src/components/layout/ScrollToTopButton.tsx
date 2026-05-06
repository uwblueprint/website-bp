"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { useNavMenu } from "@/components/layout/NavMenuContext";
import { buttonVariants } from "@/components/ui/button-variants";
import { useNavHideProgress } from "@/lib/useNavHideProgress";
import { cn } from "@/lib/utils";

/** Match `FadeUp` timing so enter feels consistent with the rest of the site. */
const OFFSET_PX = 64;
const DURATION_S = 0.5;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

  const duration = reduceMotion ? 0 : DURATION_S;
  const lift = reduceMotion ? 0 : OFFSET_PX;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-end p-8">
      <AnimatePresence>
        {show && (
          <motion.div
            key="scroll-to-top-button"
            className="pointer-events-auto"
            initial={{ opacity: 0, y: lift }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: reduceMotion ? 0 : OFFSET_PX * 0.5,
            }}
            transition={{ duration, ease: EASE }}
          >
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "filled-blue", size: "default" }),
                "gap-2",
              )}
              onClick={scrollToTop}
              aria-label="Scroll to the top"
            >
              <ArrowUp
                className="size-4 shrink-0"
                aria-hidden
                strokeWidth={2}
              />
              scroll to the top
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
