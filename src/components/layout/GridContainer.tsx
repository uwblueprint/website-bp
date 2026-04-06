import { cn } from "@/lib/utils";

interface GridContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Set to false to opt out of the column grid and only apply margins */
  grid?: boolean;
}

/**
 * GridContainer applies the UW Blueprint responsive grid system:
 *
 * All breakpoints: 12 columns, 32px side margins, 0 gutters
 *
 * Usage:
 *   <GridContainer>
 *     <div className="col-span-12 md:col-span-6 lg:col-span-4">...</div>
 *   </GridContainer>
 */
export default function GridContainer({
  children,
  className,
  grid = true,
}: GridContainerProps) {
  return (
    <div
      className={cn(
        /* Horizontal page margins */
        "px-8",
        /* Full-width container (matches debug overlay) */
        "w-full",
        /* Site-wide 12-column grid with no gutter */
        grid && "grid grid-cols-12 gap-0",
        className
      )}
    >
      {children}
    </div>
  );
}
