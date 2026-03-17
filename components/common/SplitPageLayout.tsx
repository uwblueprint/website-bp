import { LongLeftIcon } from "@components/icons/long-left.icon";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { ReactElement, ReactNode } from "react";

// ── Split ratio config ──────────────────────────────────────────────

type SplitRatio = "equal" | "aside-main" | "main-aside";

const SPLIT_GRID_CLASSES: Record<SplitRatio, string> = {
  equal: "lg:grid-cols-2", // 50 / 50
  "aside-main": "lg:grid-cols-[9fr_10fr]", // ~47 / 53 (e.g. 698:740)
  "main-aside": "lg:grid-cols-[10fr_9fr]", // ~53 / 47
};

// ── SplitPanelLayout ────────────────────────────────────────────────

interface SplitPanelLayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  split?: SplitRatio;
  children: ReactNode;
}

export const SplitPanelLayout = ({
  header,
  footer,
  split = "equal",
  children,
}: SplitPanelLayoutProps): ReactElement => {
  return (
    <div className="flex flex-col h-screen bg-white">
      {header}
      <div
        className={`flex-1 grid grid-cols-1 ${SPLIT_GRID_CLASSES[split]} overflow-hidden border border-[#C4C4C4]`}
      >
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
  /** Optional action (e.g. Report button) shown on the right of the Back to home row on the left panel */
  headerRightAction?: ReactNode;
  /** When false, hides subtitle (e.g. for INFO stage) */
  showApplicationTitle?: boolean;
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PanelLayout = ({
  title,
  subtitle,
  titleButton,
  variant = "white",
  borderRight = false,
  borderLeft = false,
  titleVariant = "xlarge",
  backToHomeHref,
  headerRightAction,
  showApplicationTitle = true,
  children,
}: PanelLayoutProps): ReactElement => {
  const theme = useTheme();

  const TITLE_STYLES = {
    xlarge: {
      color: theme.palette.text.primary,
      fontSize: "28px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "140%",
    },
    medium: {
      alignSelf: "stretch",
      color: theme.palette.text.primary,
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "140%",
    },
  };
  const bg = variant === "sky" ? "bg-sky" : "bg-white";
  const hasHeader = !!(title || subtitle);
  const titleStyle = TITLE_STYLES[titleVariant];

  return (
    <div
      className={`flex flex-col h-full overflow-hidden relative ${bg} ${
        borderRight ? "lg:border-r" : ""
      } ${borderLeft ? "lg:border-l" : ""}`}
      style={{
        borderColor:
          borderRight || borderLeft
            ? theme.palette.semantics.border.light
            : undefined,
      }}
    >
      <div className="flex flex-col h-full overflow-hidden px-9 py-8">
        {(backToHomeHref || headerRightAction) && (
          <div className="flex justify-between items-center w-full mb-8 shrink-0 gap-4">
            {backToHomeHref ? (
              <Link href={backToHomeHref} passHref>
                <a className="font-source no-underline inline-flex justify-center items-center gap-2 w-fit cursor-pointer shrink-0 hover:opacity-90 rounded-full py-2 px-4 border-2 border-blue bg-white text-blue text-base font-normal leading-[1.4] hover:bg-sky-100 hover:border-blue hover:text-blue">
                  <LongLeftIcon />
                  Back to home
                </a>
              </Link>
            ) : (
              <span />
            )}
            {headerRightAction != null ? (
              <div className="shrink-0 flex items-center">
                {headerRightAction}
              </div>
            ) : null}
          </div>
        )}
        {showApplicationTitle && subtitle && (
          <p
            className="font-poppins text-charcoal-500 mb-4 shrink-0 text-[15px]"
            style={{ lineHeight: "140%" }}
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
                className={`font-poppins ${
                  titleVariant === "xlarge" ? "shrink-0" : ""
                } ${titleVariant === "medium" ? "mb-4 font-medium" : ""}`}
                style={titleStyle}
              >
                {title}
              </h2>
            ) : null}
            {titleVariant === "xlarge" && (
              <div
                className="my-6 w-full shrink-0 h-[1px]"
                style={{ background: theme.palette.semantics.border.light }}
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
