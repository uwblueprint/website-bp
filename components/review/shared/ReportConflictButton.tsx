import WarningOutlineIcon from "@components/icons/warning-outline.icon";

interface ReportConflictButtonProps {
  name: string;
  /** When true, show "Is the applicant a conflict of interest?" to the left of the button (Figma 5721:994) */
  showQuestion?: boolean;
  /** Caller should provide to open conflict-report modal (e.g. from PR 247). Without it, the button has no effect. */
  onClick?: () => void;
}

/** Report conflict button. Renders button (and optional question). Pass onClick to open conflict modal. */
export const ReportConflictButton = ({
  name, // eslint-disable-line @typescript-eslint/no-unused-vars -- reserved for API
  showQuestion = false,
  onClick,
}: ReportConflictButtonProps): JSX.Element => {
  const reportButton = (
    <button
      type="button"
      onClick={onClick}
      aria-label="Report conflict of interest"
      className="shrink-0 inline-flex items-center justify-center gap-2 rounded-[20px] border-2 border-[#0573E8] bg-white px-3 py-1.5 font-source text-base text-[#0573E8] hover:opacity-90 transition-opacity"
      style={{
        lineHeight: 1.4,
        fontWeight: 400,
        fontFeatureSettings: "'liga' off, 'clig' off",
      }}
    >
      <WarningOutlineIcon className="h-6 w-6 shrink-0 text-[#0573E8]" />
      <span>Report</span>
    </button>
  );

  return showQuestion ? (
    <div className="flex items-center gap-3 shrink-0">
      <p
        className="font-source italic text-[16px] text-[#0573E8]"
        style={{
          lineHeight: "normal",
          fontFeatureSettings: "'liga' off, 'clig' off",
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
