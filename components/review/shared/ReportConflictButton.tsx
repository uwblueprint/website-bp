import Button from "@components/common/Button";
import WarningOutlineIcon from "@components/icons/warning-outline.icon";
import { useRouter } from "next/router";
import { useState } from "react";

type ModalView = "closed" | "confirm" | "success";

interface ReportConflictButtonProps {
  name: string;
  /** When true, show "Is the applicant a conflict of interest?" to the left of the button (Figma 5721:994) */
  showQuestion?: boolean;
}

/** Report conflict button + confirm modal + success modal. Matches Figma 5721:1001 (button) and 5721:994 (question). */
export const ReportConflictButton = ({
  name, // eslint-disable-line @typescript-eslint/no-unused-vars -- reserved for API/modal
  showQuestion = false,
}: ReportConflictButtonProps): JSX.Element => {
  const router = useRouter();
  const [view, setView] = useState<ModalView>("closed");

  const openConfirm = () => setView("confirm");
  const closeConfirm = () => setView("closed");
  const confirmReport = () => {
    // TODO: call API to report conflict when available
    setView("success");
  };
  const goToHomepage = () => router.push("/admin");

  const reportButton = (
    <button
      type="button"
      onClick={openConfirm}
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

  return (
    <>
      {showQuestion ? (
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
      )}

      {/* Confirm modal — Figma 5553:2193 */}
      {view === "confirm" && (
        <div
          className="fixed inset-0 flex justify-center items-end md:items-center md:p-4 bg-black/20 z-40"
          onClick={closeConfirm}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[340px] flex flex-col gap-9"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2 text-center">
              <p className="text-blue font-poppins font-medium text-xl leading-[1.4]">
                Report as conflict of interest?
              </p>
              <p className="text-[#252525] font-source text-sm leading-[1.4]">
                Clicking yes will notify admins and cannot be undone.
              </p>
            </div>
            <div className="flex gap-4 w-full">
              <Button
                variant="secondary"
                size="sm"
                onClick={closeConfirm}
                className="!px-4 !py-2 !rounded-[20px] flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={confirmReport}
                className="!px-4 !py-2 !rounded-[20px] flex-1"
              >
                Yes, report
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success modal — Figma 5553:4064 */}
      {view === "success" && (
        <div className="fixed inset-0 flex justify-center items-end md:items-center md:p-4 bg-black/20 z-40">
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[340px] flex flex-col gap-9"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2 text-center w-full max-w-[256px] mx-auto">
              <p className="text-blue font-poppins font-medium text-xl leading-[1.4]">
                Conflict reported!
              </p>
              <p className="text-[#252525] font-source text-sm leading-[1.4]">
                This applicant has been reported as a conflict of interest and
                will be re-assigned to another reviewer.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={goToHomepage}
              className="!px-4 !py-2 !rounded-[20px] w-full"
            >
              Back to homepage
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
