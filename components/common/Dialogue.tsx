import { ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import { DialogActions } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type DialogueProps = {
  open: boolean;
  onClose: () => void;
  header: string;
  text: string;
  errorText?: string;
  children?: ReactNode;
};

export const Dialogue = ({
  open,
  header,
  text,
  errorText,
  children,
}: DialogueProps) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
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
        className="flex flex-col justify-center items-center p-6 w-[310px] w-full"
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <h2
            className="font-poppins text-[20px] font-medium leading-[1.4] text-center"
            style={{ color: theme.palette.primary.main }}
          >
            {header}
          </h2>
          <div className="font-source text-[14px] font-normal leading-[140%] text-center">
            <div style={{ color: theme.palette.text.primary }}> {text} </div>
            {errorText && (
              <div style={{ color: theme.palette.error.main }}>{errorText}</div>
            )}
          </div>
        </div>
        <DialogActions className="w-full h-[36px] !p-0 mt-9">
          {children}
        </DialogActions>
      </div>
    </Dialog>
  );
};
