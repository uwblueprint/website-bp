import { ReactNode } from "react";

// ── SplitPanelLayout ────────────────────────────────────────────────

interface SplitPanelLayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export const SplitPanelLayout = ({
  header,
  footer,
  children,
}: SplitPanelLayoutProps) => {
  return (
    <div className="flex flex-col h-screen">
      {header}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-charcoal-250">
        {children}
      </div>
      {footer}
    </div>
  );
};

// ── PanelLayout ─────────────────────────────────────────────────────

interface PanelLayoutProps {
  title?: string;
  subtitle?: string;
  titleButton?: ReactNode;
  variant?: "sky" | "white";
  borderRight?: boolean;
  children: ReactNode;
}

export const PanelLayout = ({
  title,
  subtitle,
  titleButton,
  variant = "white",
  borderRight = false,
  children,
}: PanelLayoutProps) => {
  const bg = variant === "sky" ? "bg-sky" : "bg-white";
  const hasHeader = !!(title || subtitle);

  return (
    <div
      className={`flex flex-col h-full overflow-hidden relative ${bg} ${
        borderRight ? "lg:border-r border-charcoal-250" : ""
      }`}
    >
      {hasHeader && (
        <div className="px-6 pt-8 pb-2">
          {subtitle && (
            <p className="text-charcoal-500 text-sm mb-1">{subtitle}</p>
          )}
          {title && titleButton ? (
            <div className="flex justify-between items-center">
              <h2 className="text-[26px] text-charcoal-900 font-semibold">
                {title}
              </h2>
              {titleButton}
            </div>
          ) : title ? (
            <h2 className="text-[26px] text-charcoal-900 font-semibold">
              {title}
            </h2>
          ) : null}
        </div>
      )}
      <div
        className={`flex-1 px-6 pb-8 overflow-y-auto ${!hasHeader ? "pt-8" : ""}`}
      >
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
