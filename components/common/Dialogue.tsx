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
    `flex w-full flex-col items-center gap-2 text-center ${
      textContainerClassName ?? ""
    }`.trim();

  const actionChildren = Children.toArray(children).filter(Boolean);
  const hasSingleAction = actionChildren.length === 1;
  const actionsContainerClasses = hasSingleAction
    ? "flex w-full items-start justify-center"
    : "flex w-full items-start gap-4";

  const styledActionChildren = actionChildren.map((child) => {
    if (!isValidElement<{ className?: string }>(child)) {
      return child;
    }

    const existingClassName = child.props.className ?? "";
    const actionButtonClassName = [
      hasSingleAction ? "w-full" : "flex-1",
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
        className:
          "!m-0 w-80 max-w-[calc(100vw-32px)] overflow-hidden rounded-[8px] shadow-none",
      }}
    >
      <div className="flex flex-col items-center gap-[36px] bg-white p-6">
        <div className={textContainerClasses}>
          <h2 className="w-full font-poppins text-[20px] font-medium leading-[1.4] text-blue">
            {header}
          </h2>
          {/* Use a non-<p> wrapper so callers can pass arbitrary ReactNode safely. */}
          <div className="w-full font-source text-[14px] font-normal leading-[1.4] text-[#252525]">
            {text}
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
