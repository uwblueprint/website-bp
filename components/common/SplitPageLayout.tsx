import { useTheme } from "@mui/material/styles";
import { ReactElement, ReactNode } from "react";

type SplitRatio = "equal";

const SPLIT_GRID_CLASSES: Record<SplitRatio, string> = {
  equal: "lg:grid-cols-2",
};

interface SplitPanelLayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  split?: SplitRatio;
  leftWidth?: number;
  rightWidth?: number;
  children: ReactNode;
}

export const SplitPanelLayout = ({
  header,
  footer,
  split = "equal",
  leftWidth,
  rightWidth,
  children,
}: SplitPanelLayoutProps) => {
  const hasWidthOverride = leftWidth || rightWidth;
  const gridStyle = hasWidthOverride
    ? {
        gridTemplateColumns: `${leftWidth ? `${leftWidth}px` : "1fr"} ${
          rightWidth ? `${rightWidth}px` : "1fr"
        }`,
      }
    : undefined;

  return (
    <div className="flex flex-col h-screen bg-white">
      {header}
      <div
        className={`flex-1 grid grid-cols-1 ${
          !hasWidthOverride ? SPLIT_GRID_CLASSES[split] : ""
        } overflow-hidden border border-[#C4C4C4]`}
        style={gridStyle}
      >
        {children}
      </div>
      {footer}
    </div>
  );
};

interface PanelLayoutProps {
  title?: string;
  subtitle?: string;
  titleButton?: ReactNode;
  variant?: "sky" | "white" | "grey";
  borderRight?: boolean;
  borderLeft?: boolean;
  /** "xlarge" = left panel (28px, 600), "medium" = right panel (20px, 500) */
  titleVariant?: "xlarge" | "medium";
  /** Optional top row above title (e.g. back link + actions) */
  header?: ReactNode;
  /** When false, hides subtitle (e.g. for INFO stage) */
  showApplicationTitle?: boolean;
  contentClassName?: string;
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
  header,
  showApplicationTitle = true,
  contentClassName,
  children,
}: PanelLayoutProps) => {
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
  const bg =
    variant === "sky"
      ? "bg-sky"
      : variant === "grey"
      ? "bg-[#F3F4F6]"
      : "bg-white";
  const hasHeader = !!(title || subtitle || header);
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
        {header ? (
          <div className="mb-8 flex w-full shrink-0 items-center justify-between gap-4">
            {header}
          </div>
        ) : null}
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
          </>
        )}
        <div
          className={
            contentClassName ??
            `flex-1 overflow-y-auto min-h-0 flex flex-col w-full gap-8 ${
              titleVariant === "medium" ? "antialiased" : ""
            }`
          }
          style={contentClassName ? undefined : { alignItems: "flex-start" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
