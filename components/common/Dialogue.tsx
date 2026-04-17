import { Children, FC, ReactNode, cloneElement, isValidElement } from "react";
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

type DialogueTextProps = Pick<
  Props,
  "header" | "text" | "textContainerClassName"
>;

type ActionChildProps = {
  readonly className?: string;
};

const DialogueText = ({
  header,
  text,
  textContainerClassName,
}: DialogueTextProps) => {
  const textContainerClasses =
    `flex w-full flex-col items-center gap-2 text-center ${
      textContainerClassName ?? ""
    }`.trim();

  const theme = useTheme();

  return (
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
  );
};

const DialogueActions = ({ children }: Pick<Props, "children">) => {
  const actionChildren = Children.toArray(children).filter(Boolean);
  if (actionChildren.length === 0) {
    return null;
  }

  const hasSingleAction = actionChildren.length === 1;
  const containerClassName = hasSingleAction
    ? "flex w-full items-center justify-center"
    : "flex w-full items-center justify-center gap-4";

  const styledActionChildren = actionChildren.map((child) => {
    if (!isValidElement<ActionChildProps>(child)) {
      return child;
    }

    const actionButtonClassName = [
      hasSingleAction ? "w-full" : "flex-1",
      child.props.className,
    ]
      .filter(Boolean)
      .join(" ");

    return cloneElement(child, {
      className: actionButtonClassName,
    });
  });

  return <div className={containerClassName}>{styledActionChildren}</div>;
};

const Dialogue: FC<Props> = ({
  open,
  onClose,
  header,
  text,
  children,
  textContainerClassName,
}: Props) => {
  const theme = useTheme();

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
        <DialogueText
          header={header}
          text={text}
          textContainerClassName={textContainerClassName}
        />
        <DialogueActions>{children}</DialogueActions>
      </div>
    </Dialog>
  );
};

export default Dialogue;
