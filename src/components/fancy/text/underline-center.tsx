"use client";

import {
  type ComponentPropsWithoutRef,
  type ElementType,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { motion, type ValueAnimationTransition } from "motion/react";
import { cn } from "@/lib/utils";

export type CenterUnderlineProps<T extends ElementType = "span"> = {
  /**
   * The content to be displayed and animated
   */
  children: React.ReactNode;

  /**
   * HTML Tag to render the component as
   * @default span
   */
  as?: T;

  /**
   * Optional class name for styling
   */
  className?: string;

  /**
   * Animation transition configuration
   * @default { duration: 0.25, ease: "easeInOut" }
   */
  transition?: ValueAnimationTransition;

  /**
   * Height of the underline as a ratio of font size
   * @default 0.1
   */
  underlineHeightRatio?: number;

  /**
   * Padding of the underline as a ratio of font size
   * @default 0.01
   */
  underlinePaddingRatio?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

function CenterUnderline<T extends ElementType = "span">({
  children,
  as,
  className,
  transition = { duration: 0.25, ease: "easeInOut" },
  underlineHeightRatio = 0.1,
  underlinePaddingRatio = 0.01,
  ...props
}: CenterUnderlineProps<T>) {
  const textRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLSpanElement | null>(null);
  const MotionComponent = useMemo(() => motion.create(as ?? "span"), [as]);

  useEffect(() => {
    const updateUnderlineStyles = () => {
      const el = contentRef.current ?? textRef.current;
      if (el) {
        const fontSize = parseFloat(getComputedStyle(el).fontSize);
        const underlineHeight = fontSize * underlineHeightRatio;
        const underlinePadding = fontSize * underlinePaddingRatio;
        textRef.current?.style.setProperty(
          "--underline-height",
          `${underlineHeight}px`,
        );
        textRef.current?.style.setProperty(
          "--underline-padding",
          `${underlinePadding}px`,
        );
      }
    };

    updateUnderlineStyles();
    window.addEventListener("resize", updateUnderlineStyles);

    return () => window.removeEventListener("resize", updateUnderlineStyles);
  }, [underlineHeightRatio, underlinePaddingRatio]);

  const underlineVariants = {
    hidden: {
      width: 0,
      originX: 0.5,
    },
    visible: {
      width: "100%",
      transition: transition,
    },
  };

  return (
    <MotionComponent
      className={cn("relative inline-block cursor-pointer", className)}
      whileHover="visible"
      ref={textRef}
      {...props}
    >
      <span
        ref={contentRef}
        className="relative inline-block"
        style={{ lineHeight: 1.15 }}
      >
        {children}
        <motion.div
          className="absolute left-1/2 bg-current -translate-x-1/2"
          style={{
            height: "var(--underline-height)",
            bottom: "calc(-1 * var(--underline-padding))",
          }}
          variants={underlineVariants}
          aria-hidden="true"
        />
      </span>
    </MotionComponent>
  );
}

CenterUnderline.displayName = "CenterUnderline";

export default CenterUnderline;
