"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import CenterUnderline from "@/components/fancy/text/underline-center";
import { ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * Brand text colors as inline styles so they are not stripped by tailwind-merge:
 * `text-sm/md/lg/xl/xxl` and `text-primary-*` / `text-bp-*` are both `text-*` utilities and
 * conflict on the same node — merge keeps one and drops the other (usually color).
 */
const variantColorStyle = {
  light: { color: "var(--primary-light)" },
  blue: { color: "var(--bp-blue)" },
  dark: { color: "var(--primary-dark)" },
  "secondary-light": { color: "var(--secondary-light)" },
} as const;

const sizeMap = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  xxl: "text-xxl",
} as const;

interface TextLinkButtonProps {
  href: string;
  children: React.ReactNode;
  /** light (primary-light), blue (bp-blue), dark (primary-dark), secondary-light */
  variant?: keyof typeof variantColorStyle;
  /** Maps to design system font sizes: sm/md/lg (body), xl/xxl (header). `nav` skips size utilities — supply typography via `className` (see Navbar). */
  size?: keyof typeof sizeMap | "nav";
  /** Opens in new tab. Defaults to true when href is external (http/https/mailto). */
  external?: boolean;
  className?: string;
}

function isExternalHref(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export default function TextLinkButton({
  href,
  children,
  variant = "dark",
  size = "md",
  external,
  className,
}: TextLinkButtonProps) {
  const isExternal = external ?? isExternalHref(href);

  const LinkTag = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : { href };

  const mergedStyle: CSSProperties = {
    ...variantColorStyle[variant],
  };

  const sizeClass =
    size === "nav" ? undefined : sizeMap[size as keyof typeof sizeMap];

  return (
    <CenterUnderline
      as={LinkTag}
      {...linkProps}
      style={mergedStyle}
      className={cn("group/btn cursor-pointer", sizeClass, className)}
    >
      <span className="inline-flex items-center gap-0 transition-all duration-300 group-hover/btn:gap-0">
        {children}
        {isExternal && (
          <ArrowUpRight
            className="h-[0.9em] w-[0.9em] shrink-0 translate-x-[-8px] opacity-0 transition-all duration-300 group-hover/btn:translate-x-0 group-hover/btn:opacity-100"
            aria-hidden="true"
          />
        )}
      </span>
    </CenterUnderline>
  );
}
