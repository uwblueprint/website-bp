import React, { ReactElement, ReactNode, Children } from "react";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";

type Props = {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly header: string;
  readonly text: ReactNode;
  readonly children?: ReactNode;
  readonly textContainerClassName?: string;
};

const Dialogue = ({
  open,
  onClose,
  header,
  text,
  children,
  textContainerClassName,
}: Props): ReactElement => {
  const textContainerClasses =
    `flex w-full flex-col items-center gap-2 text-center ${
      textContainerClassName ?? ""
    }`.trim();

  const theme = useTheme();

  const actionChildren = Children.toArray(children).filter(Boolean);
  const hasSingleAction = actionChildren.length === 1;
  const actionsContainerClasses = hasSingleAction
    ? "flex w-full items-center justify-center"
    : "flex w-full items-center justify-center gap-4";

  const actionWrapperClass = hasSingleAction ? "w-full" : "flex-1";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "none",
          opacity: 1,
        },
      }}
    >
      <div
        className="flex flex-col justify-center items-center gap-[36px] p-6"
        style={{
          width: "310px",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <div className={textContainerClasses}>
          <h2
            className="w-full font-poppins text-[20px] font-medium leading-[1.4]"
            style={{ color: theme.palette.primary.main }}
          >
            {header}
          </h2>
          <div
            className="w-full font-source text-[14px] font-normal leading-[1.4]"
            style={{ color: theme.palette.text.primary }}
          >
            {text}
          </div>
        </div>
        {actionChildren.length > 0 ? (
          <div className={actionsContainerClasses}>
            {actionChildren.map((child, idx) => (
              <div className={actionWrapperClass} key={idx}>
                {child}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Dialog>
  );
};

export default Dialogue;
