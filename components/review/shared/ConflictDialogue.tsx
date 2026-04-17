import Button from "@components/common/Button";
import Dialogue from "@components/common/Dialogue";
import ReviewPageAPIClient from "APIClients/ReviewPageAPIClient";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { BACK_TO_HOME_HREF } from "./constants";

type Props = {
  readonly applicantRecordId: string | null;
  readonly reviewerId: number | null;
  readonly confirmOpen: boolean;
  readonly onConfirmOpenChange: (open: boolean) => void;
};

const ConflictDialogueText = ({
  reportError,
}: {
  reportError: string | null;
}) => {
  const theme = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <span>Clicking yes will notify admins and cannot be undone.</span>
      {reportError ? (
        <span style={{ color: theme.palette.error.main }} role="alert">
          {reportError}
        </span>
      ) : null}
    </div>
  );
};

const ConflictDialogue: FC<Props> = ({
  applicantRecordId,
  reviewerId,
  confirmOpen,
  onConfirmOpenChange,
}: Props) => {
  const router = useRouter();

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

  const handleCloseConfirmDialog = () => {
    if (isReporting) {
      return;
    }
    setReportError(null);
    onConfirmOpenChange(false);
  };

  const handleBackToHomepage = () => {
    setSuccessDialogOpen(false);
    router.push(`/${BACK_TO_HOME_HREF}`);
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

      onConfirmOpenChange(false);
      setSuccessDialogOpen(true);
    } catch (error) {
      setReportError("Couldn't report conflict. Please try again.");
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <>
      <Dialogue
        open={confirmOpen}
        onClose={handleCloseConfirmDialog}
        header="Report as conflict of interest?"
        text={<ConflictDialogueText reportError={reportError} />}
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
