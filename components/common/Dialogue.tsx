import { Children, cloneElement, isValidElement } from "react";
import Dialog from "@mui/material/Dialog";

type Props = {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly header: string;
  readonly text: React.ReactNode;
  readonly children?: React.ReactNode;
  readonly textContainerClassName?: string;
};

const Dialogue = ({
  open,
  onClose,
  header,
  text,
  children,
  textContainerClassName,
}: Props): React.ReactElement => {
  const textContainerClasses =
    `flex w-64 flex-col items-center text-center space-y-3 ${
      textContainerClassName ?? ""
    }`.trim();

  const actionChildren = Children.toArray(children).filter(Boolean);
  const actionsContainerClasses =
    actionChildren.length === 1
      ? "flex w-full items-start justify-center space-x-2.5"
      : "flex w-full items-start justify-between space-x-2.5";

  const styledActionChildren = actionChildren.map((child) => {
    if (!isValidElement<{ className?: string }>(child)) {
      return child;
    }

    const existingClassName = child.props.className ?? "";
    const actionButtonClassName = [
      "w-36",
      "h-12",
      "px-0",
      "py-3",
      "text-base",
      "leading-6",
      "font-semibold",
      "whitespace-nowrap",
      existingClassName,
    ]
      .filter(Boolean)
      .join(" ");

    return cloneElement(child, {
      className: actionButtonClassName,
    });
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        className: "!m-0 w-80 max-w-full overflow-hidden rounded shadow-none",
      }}
    >
      <div className="flex flex-col items-center gap-5 bg-white px-4 py-5">
        <div className="flex w-64 flex-col items-center px-1 py-5">
          <div className={textContainerClasses}>
            <h2 className="font-poppins text-base font-medium leading-snug text-blue">
              {header}
            </h2>
            {/* Use a non-<p> wrapper so callers can pass arbitrary ReactNode safely. */}
            <div className="font-source text-sm leading-snug text-[#252525]">
              {text}
            </div>
          </div>
        </div>
        {styledActionChildren.length > 0 ? (
          <div className={actionsContainerClasses}>{styledActionChildren}</div>
        ) : null}
      </div>
    </Dialog>
  );
};

export default Dialogue;
