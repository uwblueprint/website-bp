"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Link from "next/link";
import CenterUnderline from "@/components/fancy/text/underline-center";
import { ArrowUpRight, Check, Copy } from "@/components/ui/icons";
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

/** Same box for ArrowUpRight, Copy, and Check so trailing layout never shifts. */
const trailingIconBoxClass = "h-[0.9em] w-[0.9em]";

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
  /**
   * When set, clicking copies this string to the clipboard instead of navigating.
   * Renders a `<button>`; trailing icon switches Copy → Check briefly on success.
   */
  copyValue?: string;
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
  copyValue,
}: TextLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const mergedStyle: CSSProperties = { ...variantColorStyle[variant] };
  const sizeClass =
    size === "nav" ? undefined : sizeMap[size as keyof typeof sizeMap];
  const sharedClass = cn("group/btn cursor-pointer", sizeClass, className);

  if (copyValue !== undefined) {
    const handleCopy = () => {
      navigator.clipboard.writeText(copyValue).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    };

    return (
      <button
        type="button"
        onClick={handleCopy}
        style={mergedStyle}
        className={cn("relative inline-block", sharedClass)}
        aria-label={copied ? "Copied to clipboard" : `Copy ${copyValue}`}
      >
        <span className="inline-flex items-center gap-0 transition-all duration-300 group-hover/btn:gap-[0.15em]">
          {children}

          <span
            style={{ display: "inline-grid" }}
            className={cn("shrink-0", trailingIconBoxClass)}
          >
            <Copy
              className={cn(
                "col-start-1 row-start-1 shrink-0 translate-x-[-8px] opacity-0 transition-all duration-300 group-hover/btn:translate-x-0 group-hover/btn:opacity-100",
                trailingIconBoxClass,
              )}
              style={
                copied
                  ? { opacity: 0, transform: "translateX(-8px)" }
                  : undefined
              }
              aria-hidden
            />
            <Check
              className={cn(
                "col-start-1 row-start-1 shrink-0 translate-x-[-8px] opacity-0 transition-all duration-300 group-hover/btn:translate-x-0 group-hover/btn:opacity-100",
                trailingIconBoxClass,
              )}
              style={{
                opacity: copied ? undefined : 0,
                transform: copied ? undefined : "translateX(-8px)",
              }}
              aria-hidden
            />
          </span>
        </span>
      </button>
    );
  }

  const isExternal = external ?? isExternalHref(href);
  const LinkTag = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? href.startsWith("mailto:")
      ? { href }
      : { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : { href };

  return (
    <CenterUnderline
      as={LinkTag}
      {...linkProps}
      style={mergedStyle}
      className={sharedClass}
    >
      <span className="inline-flex items-center gap-0 transition-all duration-300 group-hover/btn:gap-[0.15em]">
        {children}
        {isExternal && (
          <ArrowUpRight
            className={cn(
              "shrink-0 translate-x-[-8px] opacity-0 transition-all duration-300 group-hover/btn:translate-x-0 group-hover/btn:opacity-100",
              trailingIconBoxClass,
            )}
            aria-hidden="true"
          />
        )}
      </span>
    </CenterUnderline>
  );
}
