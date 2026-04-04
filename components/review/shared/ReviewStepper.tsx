import Button from "@components/common/Button";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import {
  REVIEW_RECORD_STATUS,
  REVIEW_STAGES,
  ReviewStage,
} from "./constants";
import { ReviewSetStageContext } from "./ReviewContext";
import { getApplicantRecordId } from "./reviewUtils";
import { ReviewEndData, ReviewScores } from "./types";
import { useTheme } from "@mui/material/styles";
import { ReactElement } from "react";
import ReviewPageAPIClient, {
  buildReviewInputForSubmit,
  buildReviewInputFromScores,
} from "APIClients/ReviewPageAPIClient";
import { useAuthenticatedUser } from "@components/context/AuthUserContext";

interface Props {
  currentStage: ReviewStage;
  scores: ReviewScores;
  endData?: ReviewEndData;
  onValidate?: () => boolean;
}

export const ReviewStepper = ({
  currentStage,
  scores,
  endData,
  onValidate,
}: Props): ReactElement | null => {
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const setStage = useContext(ReviewSetStageContext);
  const authenticatedUser = useAuthenticatedUser();

  const currentStageIndex = REVIEW_STAGES.indexOf(currentStage);

  const nextStage =
    currentStageIndex < REVIEW_STAGES.length - 1
      ? REVIEW_STAGES[currentStageIndex + 1]
      : ReviewStage.END_SUCCESS;

  const previousStage = REVIEW_STAGES[Math.max(currentStageIndex - 1, 0)];

  const isButtonDisabled =
    currentStage !== ReviewStage.INFO &&
    currentStage !== ReviewStage.END_SUCCESS &&
    !(scores[currentStage] > 0 && scores[currentStage] <= 5);

  if (!router.isReady) return null;
  if (currentStage === ReviewStage.END_SUCCESS) return null;

  const applicantRecordId = getApplicantRecordId(router.query);
  const reviewerId = authenticatedUser
    ? Number.parseInt(authenticatedUser.id, 10)
    : NaN;

  const persistInProgress = async () => {
    if (!Number.isFinite(reviewerId)) {
      alert("Session error. Please refresh and log in again.");
      return;
    }
    const review = buildReviewInputFromScores(scores);
    await ReviewPageAPIClient.updateReviewedApplicantRecord({
      applicantRecordId,
      reviewerId,
      review,
      status: REVIEW_RECORD_STATUS.IN_PROGRESS,
    });
  };

  const persistCompleted = async () => {
    if (!Number.isFinite(reviewerId)) {
      alert("Session error. Please refresh and log in again.");
      return;
    }
    const review = buildReviewInputForSubmit(
      scores,
      endData ?? {
        comments: "",
        skillsCategory: "",
        secondChoiceRole: "",
      },
    );
    await ReviewPageAPIClient.updateReviewedApplicantRecord({
      applicantRecordId,
      reviewerId,
      review,
      status: REVIEW_RECORD_STATUS.DONE,
    });
  };

  return (
    <div
      className="px-6 py-4"
      style={{
        borderTop: `1px solid ${theme.palette.semantics.border.light}`,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <div className="flex justify-end items-center gap-3 flex-nowrap">
        {currentStageIndex > 0 && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setStage?.(previousStage)}
            className="shrink-0 whitespace-nowrap !px-4 !py-2 !rounded-[20px] !border-blue !bg-white !text-blue hover:!bg-sky-100 hover:!border-blue hover:!text-blue"
          >
            Previous section
          </Button>
        )}
        {currentStage === ReviewStage.END ? (
          <Button
            size="sm"
            disabled={
              isSubmitting ||
              isSaving ||
              !endData?.skillsCategory ||
              !Number.isFinite(reviewerId)
            }
            className="shrink-0 whitespace-nowrap !px-4 !py-2 !rounded-[20px] !bg-blue !border-blue !text-white hover:!bg-sky-400 hover:!border-transparent disabled:!opacity-60"
            onClick={async () => {
              if (onValidate && !onValidate()) {
                return;
              }

              setIsSubmitting(true);
              try {
                await persistCompleted();
                setStage?.(ReviewStage.END_SUCCESS);
              } catch (error) {
                console.error("Failed to submit review data:", error);
                alert("Failed to submit review. Please try again.");
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            {isSubmitting ? "Submitting..." : "Finish"}
          </Button>
        ) : (
          <Button
            size="sm"
            disabled={
              isButtonDisabled ||
              isSaving ||
              isSubmitting ||
              !Number.isFinite(reviewerId)
            }
            onClick={async () => {
              setIsSaving(true);
              try {
                await persistInProgress();
                setStage?.(nextStage);
              } catch (error) {
                console.error("Failed to save review progress:", error);
                alert("Could not save progress. Please try again.");
              } finally {
                setIsSaving(false);
              }
            }}
            className="shrink-0 whitespace-nowrap !px-4 !py-2 !rounded-[20px] !bg-blue !border-blue !text-white hover:!bg-sky-400 hover:!border-transparent disabled:!opacity-60"
          >
            {isSaving ? "Saving…" : "Save & Continue"}
          </Button>
        )}
      </div>
    </div>
  );
};
