import Button from "@components/common/Button";
import Dialogue from "@components/common/Dialogue";
import WarningIcon from "@components/icons/warning.icon";
import ReviewPageAPIClient from "APIClients/ReviewPageAPIClient";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  readonly applicantRecordId: string | null;
  readonly reviewerId: number | null;
};

const ConflictDialogue = ({
  applicantRecordId,
  reviewerId,
}: Props): React.ReactElement => {
  const theme = useTheme();
  const router = useRouter();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

  const handleOpenConfirmDialog = () => {
    setReportError(null);
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    if (isReporting) {
      return;
    }
    setReportError(null);
    setConfirmDialogOpen(false);
  };

  const handleBackToHomepage = () => {
    setSuccessDialogOpen(false);
    router.push("/");
  };

  const handleReportConflict = async () => {
    try {
      setIsReporting(true);
      setReportError(null);

      if (applicantRecordId == null) {
        throw new Error("Missing applicantRecordId in URL");
      }

      if (reviewerId == null || !Number.isInteger(reviewerId)) {
        throw new Error("Missing authenticated reviewer ID");
      }

      await ReviewPageAPIClient.reportReviewConflict(
        applicantRecordId,
        reviewerId,
      );

      setConfirmDialogOpen(false);
      setSuccessDialogOpen(true);
    } catch (error) {
      setReportError("Couldn't report conflict. Please try again.");
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <span
          className="italic font-source text-[16px] font-normal leading-normal"
          style={{ color: theme.palette.primary.main }}
        >
          Is the applicant a conflict of interest?
        </span>
        <Button
          variant="secondary"
          onClick={handleOpenConfirmDialog}
          className="whitespace-nowrap !px-4 !py-2"
          size="sm"
        >
          <div className="flex place-items-center space-x-2 text-[16px]">
            <WarningIcon />
            <p>Report</p>
          </div>
        </Button>
      </div>

      <Dialogue
        open={confirmDialogOpen}
        onClose={handleCloseConfirmDialog}
        header="Report as conflict of interest?"
        text={
          <div className="flex flex-col gap-2">
            <span>Clicking yes will notify admins and cannot be undone.</span>
            {reportError ? (
              <span style={{ color: theme.palette.error.main }} role="alert">
                {reportError}
              </span>
            ) : null}
          </div>
        }
      >
        <Button
          variant="secondary"
          size="md"
          onClick={handleCloseConfirmDialog}
          className="whitespace-nowrap"
          disabled={isReporting}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleReportConflict}
          className="whitespace-nowrap"
          disabled={isReporting}
        >
          Yes, report
        </Button>
      </Dialogue>

      <Dialogue
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
        header="Conflict reported!"
        text="This applicant has been reported as a conflict of interest and will be re-assigned to another reviewer."
      >
        <Button
          variant="primary"
          size="md"
          onClick={handleBackToHomepage}
          className="whitespace-nowrap"
        >
          Back to homepage
        </Button>
      </Dialogue>
    </>
  );
};

export default ConflictDialogue;
