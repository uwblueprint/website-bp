import { useMemo, useState } from "react";
import { ReviewStage } from "@components/review/shared/constants";
import { ReviewSplitPanelPage } from "../shared/ReviewSplitPanelPage";
import Button from "@components/common/Button";
import Image from "next/image";
import WarningIcon from "@components/icons/warning.icon";
import { ApplicationDTO } from "../../../types";
import { ReviewAnswers } from "./ReviewAnswers";
import { extractShortAnswerData } from "@components/review/shared/reviewUtils";
import { tryGetApplicantRecordId } from "@utils/reviewId";
import Dialogue from "@components/common/Dialogue";
import ReviewPageAPIClient from "APIClients/ReviewPageAPIClient";
import { useRouter } from "next/router";
import { useAuthenticatedUser } from "@components/context/AuthUserContext";
import { ReviewScores } from "../shared/types";

export interface ReviewStageProps {
  name: string;
  application: ApplicationDTO | undefined;
  scores: ReviewScores;
}

const DEFAULT_REPORT_ERROR_MESSAGE =
  "Couldn't report conflict. Please try again.";

const getReportConflictErrorMessage = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return DEFAULT_REPORT_ERROR_MESSAGE;
  }

  const { message } = error;

  if (message.includes("Missing applicantRecordId")) {
    return "Unable to identify this application. Please refresh and try again.";
  }

  if (
    message.includes("Missing authenticated reviewer ID") ||
    message.includes("Reviewer ID is invalid")
  ) {
    return "Unable to verify your reviewer account. Please sign in again.";
  }

  if (
    message.includes("DEPLOYMENT_DOMAIN not defined") ||
    message.includes("NEXT_PUBLIC_BE_DEPLOYMENT_DOMAIN not defined")
  ) {
    return "Conflict reporting is temporarily unavailable. Please contact an admin.";
  }

  return DEFAULT_REPORT_ERROR_MESSAGE;
};

export const ReviewInfoStage: React.FC<ReviewStageProps> = ({
  name,
  application,
  scores,
}) => {
  const router = useRouter();
  const authenticatedUser = useAuthenticatedUser();
  const { questions, answers } = useMemo(() => {
    const shortAnswerStr = application?.shortAnswerQuestions[0];
    if (!shortAnswerStr) {
      return { questions: [], answers: [] };
    }

    try {
      const shortAnswerJSON = JSON.parse(shortAnswerStr);
      const { extractedQuestions, extractedAnswers } =
        extractShortAnswerData(shortAnswerJSON);

      return {
        questions: [
          "Email",
          "Program",
          "Academic Term",
          "Where did you hear about us?",
          "How many times have you applied to Blueprint in the past?",
          "Pronouns",
          "Will you be in an academic (school) term or a co-op term?",
          "Position",
          ...extractedQuestions,
        ],
        answers: [
          application?.email ?? "",
          application?.program ?? "",
          application?.academicYear ?? "",
          application?.heardFrom ?? "",
          application?.timesApplied ?? "",
          application?.pronouns ?? "",
          application?.academicOrCoop ?? "",
          application?.firstChoiceRole ?? "",
          ...extractedAnswers,
        ],
      };
    } catch (e) {
      console.error("Failed to parse shortAnswerQuestions[0]", e);
      return { questions: [], answers: [] };
    }
  }, [application]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

  const handleReportConflict = async () => {
    try {
      setIsReporting(true);
      setReportError(null);
      const applicantRecordId = tryGetApplicantRecordId(router.query);
      if (applicantRecordId == null) {
        throw new Error("Missing applicantRecordId in URL");
      }
      const reviewerId = Number(authenticatedUser?.id);
      if (!Number.isInteger(reviewerId)) {
        throw new Error("Missing authenticated reviewer ID");
      }
      await ReviewPageAPIClient.reportReviewConflict(
        applicantRecordId,
        reviewerId,
      );
      setConfirmDialogOpen(false);
      setSuccessDialogOpen(true);
    } catch (error) {
      console.error("Failed to report conflict", error);
      setReportError(getReportConflictErrorMessage(error));
    } finally {
      setIsReporting(false);
    }
  };

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

  return (
    <ReviewSplitPanelPage
      studentName={name}
      rightTitle="Basic Information"
      rightTitleButton={
        <Button
          variant="secondary"
          onClick={handleOpenConfirmDialog}
          className="whitespace-nowrap"
          size="sm"
        >
          <div className="flex place-items-center space-x-2">
            <WarningIcon />
            <p>Conflict</p>
          </div>
        </Button>
      }
      currentStage={ReviewStage.INFO}
      leftContent={
        <div className="flex flex-col place-items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 space-y-8 place-content-center h-full m-auto w-full">
          <div className="">
            <Image
              height={87}
              width={440}
              alt=""
              src="/common/review-page-banner.svg"
            />
          </div>
          <div>
            <Image
              height={300}
              width={330}
              alt=""
              src="/common/review-page-people.svg"
            />
          </div>
        </div>
      }
      rightContent={
        <>
          <Dialogue
            open={confirmDialogOpen}
            onClose={handleCloseConfirmDialog}
            header="Report as conflict of interest?"
            text={
              <div className="flex flex-col gap-2">
                <span>
                  Clicking yes will notify admins and cannot be undone.
                </span>
                {reportError ? (
                  <span
                    className="text-red-600"
                    style={{ color: "#dc2626" }}
                    role="alert"
                  >
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
              onClick={handleBackToHomepage}
              className="whitespace-nowrap"
            >
              Back to homepage
            </Button>
          </Dialogue>
          <div className="flex flex-col gap-4">
            <ReviewAnswers questions={questions} answers={answers} />
          </div>
        </>
      }
      scores={scores}
    ></ReviewSplitPanelPage>
  );
};
