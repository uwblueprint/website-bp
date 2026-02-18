import { ReactNode } from "react";
import Dialog from "@mui/material/Dialog";

type DialogueProps = {
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
}: DialogueProps) => {
  const textContainerClasses = [
    "flex",
    "flex-col",
    "items-center",
    "gap-3",
    textContainerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ className: "rounded-[8px] m-0" }}
    >
      <div className="flex flex-col items-center gap-[36px] p-[24px] text-center">
        <div className={textContainerClasses}>
          <h2 className="font-poppins text-[20px] text-blue">{header}</h2>
          {/* Use a non-<p> wrapper so callers can pass arbitrary ReactNode safely. */}
          <div className="font-source text-[14px] text-[#252525]">{text}</div>
        </div>
        {children ? (
          <div className="flex items-center justify-center gap-6">
            {children}
          </div>
        ) : null}
      </div>
    </Dialog>
  );
};

export default Dialogue;
