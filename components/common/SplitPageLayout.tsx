import Link from "next/link";
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
    <div className="flex flex-col h-screen bg-white">
      {header}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
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
  borderLeft?: boolean;
  /** "xlarge" = left panel (28px, 600), "medium" = right panel (20px, 500) */
  titleVariant?: "xlarge" | "medium";
  /** Renders pill-shaped "Back to home" link with arrow icon */
  backToHomeHref?: string;
  /** When false, hides subtitle (e.g. for INFO stage) */
  showApplicationTitle?: boolean;
  children: ReactNode;
}

const TITLE_STYLES = {
  xlarge: {
    color: "#252525",
    fontFeatureSettings: "'liga' off, 'clig' off" as const,
    fontSize: "28px",
    fontStyle: "normal" as const,
    fontWeight: 600,
    lineHeight: "140%",
  },
  medium: {
    alignSelf: "stretch" as const,
    color: "#252525",
    fontFeatureSettings: "'liga' off, 'clig' off" as const,
    fontSize: "20px",
    fontStyle: "normal" as const,
    fontWeight: 500,
    lineHeight: "140%",
  },
};

export const PanelLayout = ({
  title,
  subtitle,
  titleButton,
  variant = "white",
  borderRight = false,
  borderLeft = false,
  titleVariant = "xlarge",
  backToHomeHref,
  showApplicationTitle = true,
  children,
}: PanelLayoutProps) => {
  const bg = variant === "sky" ? "bg-sky" : "bg-white";
  const hasHeader = !!(title || subtitle);
  const titleStyle = TITLE_STYLES[titleVariant];

  return (
    <div
      className={`flex flex-col h-full overflow-hidden relative ${bg} ${
        borderRight ? "lg:border-r border-[#C4C4C4]" : ""
      } ${borderLeft ? "lg:border-l border-[#C4C4C4]" : ""}`}
    >
      <div
        className="flex flex-col h-full overflow-hidden"
        style={{ padding: "32px 36px 32px 36px" }}
      >
        {backToHomeHref && (
          <Link href={backToHomeHref} passHref>
            <a
              className="font-source no-underline inline-flex justify-center items-center gap-2 w-fit mb-8 cursor-pointer shrink-0 hover:opacity-90 rounded-full"
              style={{
                display: "flex",
                padding: "8px 16px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                border: "2px solid #0573E8",
                background: "#FFF",
                color: "#0573E8",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "140%",
                fontFeatureSettings: "'liga' off, 'clig' off",
              }}
            >
              <img
                src="/common/long_left.svg"
                alt=""
                aria-hidden
                width={24}
                height={24}
              />
              Back to home
            </a>
          </Link>
        )}
        {showApplicationTitle && subtitle && (
          <p
            className="font-poppins text-charcoal-500 mb-4 shrink-0"
            style={{ fontSize: "15px", lineHeight: "140%" }}
          >
            {subtitle}
          </p>
        )}
        {hasHeader && (
          <>
            {title && titleButton ? (
              <div
                className={`flex justify-between items-center shrink-0 ${
                  titleVariant === "medium" ? "mb-4" : ""
                }`}
              >
                <h2 className="font-poppins font-medium" style={titleStyle}>
                  {title}
                </h2>
                {titleButton}
              </div>
            ) : title ? (
              <h2
                className={`font-poppins ${titleVariant === "xlarge" ? "shrink-0" : ""} ${
                  titleVariant === "medium" ? "mb-4 font-medium" : ""
                }`}
                style={titleStyle}
              >
                {title}
              </h2>
            ) : null}
            {titleVariant === "xlarge" && (
              <div
                className="my-6 w-full shrink-0"
                style={{ height: "1px", background: "#C4C4C4" }}
              />
            )}
          </>
        )}
        <div
          className={`flex-1 overflow-y-auto min-h-0 flex flex-col w-full gap-8 ${
            titleVariant === "medium" ? "antialiased" : ""
          }`}
          style={{ alignItems: "flex-start" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
