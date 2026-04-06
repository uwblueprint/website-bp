"use client"

import {
  type ComponentPropsWithoutRef,
  type ElementType,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { motion, type ValueAnimationTransition } from "motion/react"

import { cn } from "@/lib/utils"

export type UnderlineToBackgroundProps<T extends ElementType = "span"> = {
  /**
   * The content to be displayed and animated
   */
  children: React.ReactNode

  /**
   * HTML Tag to render the component as
   * @default span
   */
  as?: T

  /**
   * Optional class name for styling
   */
  className?: string

  /**
   * Animation transition configuration
   * @default { type: "spring", damping: 30, stiffness: 300 }
   */
  transition?: ValueAnimationTransition

  /**
   * The color that the text will animate to on hover
   */
  targetTextColor?: string

  /**
   * Height of the underline as a ratio of font size
   * @default 0.1
   */
  underlineHeightRatio?: number

  /**
   * Padding of the underline as a ratio of font size
   * @default 0.01
   */
  underlinePaddingRatio?: number
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">

function UnderlineToBackground<T extends ElementType = "span">({
  children,
  as,
  className,
  transition = { type: "spring", damping: 30, stiffness: 300 },
  underlineHeightRatio = 0.1,
  underlinePaddingRatio = 0.01,
  targetTextColor = "#fef",
  ...rest
}: UnderlineToBackgroundProps<T>) {
  const textRef = useRef<HTMLElement | null>(null)

  const MotionComponent = useMemo(() => motion.create(as ?? "span"), [as])

  useEffect(() => {
    const updateUnderlineStyles = () => {
      if (textRef.current) {
        const fontSize = parseFloat(getComputedStyle(textRef.current).fontSize)
        const underlineHeight = fontSize * underlineHeightRatio
        const underlinePadding = fontSize * underlinePaddingRatio
        textRef.current.style.setProperty(
          "--underline-height",
          `${underlineHeight}px`
        )
        textRef.current.style.setProperty(
          "--underline-padding",
          `${underlinePadding}px`
        )
      }
    }

    updateUnderlineStyles()
    window.addEventListener("resize", updateUnderlineStyles)

    return () => window.removeEventListener("resize", updateUnderlineStyles)
  }, [underlineHeightRatio, underlinePaddingRatio])

  const underlineVariants = {
    initial: {
      height: "var(--underline-height)",
    },
    target: {
      height: "100%",
      transition: transition,
    },
  }

  const textVariants = {
    initial: {
      color: "currentColor",
    },
    target: {
      color: targetTextColor,
      transition: transition,
    },
  }

  return (
    <MotionComponent
      className={cn("relative inline-block cursor-pointer", className)}
      whileHover="target"
      ref={textRef}
      {...rest}
    >
      <motion.span
        className="absolute bg-current w-full"
        style={{
          height: "var(--underline-height)",
          bottom: "calc(-1 * var(--underline-padding))",
        }}
        variants={underlineVariants}
        aria-hidden="true"
      />
      <motion.span variants={textVariants} className="text-current relative">
        {children}
      </motion.span>
    </MotionComponent>
  )
}

UnderlineToBackground.displayName = "UnderlineToBackground"

export default UnderlineToBackground
