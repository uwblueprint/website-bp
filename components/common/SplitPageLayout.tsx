import { useTheme } from "@mui/material/styles";
import { ReactNode } from "react";

type SplitRatio = "equal";

const SPLIT_GRID_CLASSES: Record<SplitRatio, string> = {
  equal: "lg:grid-cols-2",
};

/** Flexible grid track so the sibling column can shrink inside overflow layouts. */
const SPLIT_FLEX_TRACK = "minmax(0, 1fr)";

function splitGridTemplateColumns(
  leftWidth?: number,
  rightWidth?: number,
): string | undefined {
  const hasLeft = !!leftWidth;
  const hasRight = !!rightWidth
  if (!hasLeft && !hasRight) {
    return undefined;
  }
  if (hasLeft && hasRight) {
    return `${leftWidth}px ${rightWidth}px`;
  }
  if (hasLeft) {
    return `${leftWidth}px ${SPLIT_FLEX_TRACK}`;
  }
  return `${SPLIT_FLEX_TRACK} ${rightWidth}px`;
}

/** Preset fixed widths; pass only `leftWidth` or `rightWidth` on `SplitPanelLayout` so the other column fills the rest. */
export const SPLIT_PANEL_WIDTHS = {
  interview: {
    left: 698,
  },
} as const;

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
  const gridTemplateColumns = splitGridTemplateColumns(leftWidth, rightWidth);
  const hasWidthOverride = !!gridTemplateColumns;
  const gridStyle = hasWidthOverride ? { gridTemplateColumns } : undefined;

  return (
    <div className="flex flex-col h-screen bg-white">
      {header}
      <div
        className={`flex-1 grid min-h-0 grid-cols-1 [&>*]:min-h-0 ${
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

  const headerBlock = (
    <>
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
    </>
  );

  const showHeaderStack = hasHeader;

  const scrollBase = "min-h-0 w-full flex-1";
  const scrollClassName = contentClassName
    ? `${scrollBase} ${contentClassName}`
    : `${scrollBase} flex flex-col gap-8 overflow-y-auto ${
        titleVariant === "medium" ? "antialiased" : ""
      }`;

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
      <div className="flex h-full flex-col overflow-hidden pt-8 pb-8">
        {showHeaderStack ? (
          <div className="shrink-0 px-9">{headerBlock}</div>
        ) : null}
        <div className={scrollClassName}>
          <div
            className={
              contentClassName
                ? "box-border w-full px-9"
                : "box-border flex min-h-full w-full flex-col gap-8 px-9"
            }
            style={contentClassName ? undefined : { alignItems: "flex-start" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
