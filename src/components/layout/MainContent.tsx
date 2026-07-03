"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

/**
 * Wraps route content. Home (`/`) is full-bleed under the fixed navbar; other routes
 * get top padding so content clears the nav strip.
 */
export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Pages whose hero sits behind the fixed navbar (full-bleed, no top offset).
  const isFullBleed =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/projects" ||
    pathname === "/join-us" ||
    pathname === "/nonprofits" ||
    pathname === "/students" ||
    pathname === "/students/alumni" ||
    pathname === "/roles";

  return (
    <div className={cn("flex-1", !isFullBleed && "pt-16")}>{children}</div>
  );
}
