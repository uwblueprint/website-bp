import WarningOutlineIcon from "@components/icons/warning-outline.icon";
import { ReactElement } from "react";
import { useTheme } from "@mui/material/styles";

interface ReportConflictButtonProps {
  name: string;
  /** When true, show "Is the applicant a conflict of interest?" to the left of the button (Figma 5721:994) */
  showQuestion?: boolean;
  /** Caller should provide to open conflict-report modal (e.g. from PR 247). Without it, the button has no effect. */
  onClick?: () => void;
}

export const ReportConflictButton = ({
  name, // eslint-disable-line @typescript-eslint/no-unused-vars -- reserved for API
  showQuestion = false,
  onClick,
}: ReportConflictButtonProps): ReactElement => {
  const theme = useTheme();
  const reportButton = (
    <button
      type="button"
      onClick={onClick}
      aria-label="Report conflict of interest"
      className="shrink-0 inline-flex items-center justify-center gap-2 rounded-[20px] border-2 bg-white px-3 py-1.5 font-source font-normal text-base hover:bg-sky-100 hover:border-blue hover:text-blue transition-opacity"
      style={{
        lineHeight: 1.4,
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      }}
    >
      <WarningOutlineIcon className="h-6 w-6 shrink-0 text-[#0573E8]" />
      <span>Report</span>
    </button>
  );

  return showQuestion ? (
    <div className="flex items-center gap-3 shrink-0">
      <p
        className="font-source italic text-normal"
        style={{
          lineHeight: "normal",
          color: theme.palette.primary.main,
        }}
      >
        Is the applicant a conflict of interest?
      </p>
      {reportButton}
    </div>
  ) : (
    reportButton
  );
};
