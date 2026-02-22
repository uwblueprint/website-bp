import Button from "@components/common/Button";
import { fetchGraphql } from "@utils/makegqlrequest";
import { mutations } from "graphql/queries";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { REVIEW_STAGES, ReviewStage } from "./constants";
import { ReviewSetStageContext } from "./ReviewContext";
import { getReviewId } from "./reviewUtils";
import { ReviewEndData, ReviewScores } from "./types";

const STAGE_RATING_FIELDS: [ReviewStage, string][] = [
  [ReviewStage.PFSG, "passionFSG"],
  [ReviewStage.TP, "teamPlayer"],
  [ReviewStage.D2L, "desireToLearn"],
  [ReviewStage.SKL, "skill"],
];

const sendRatingData = (
  id: number,
  ratingToBeChanged: string,
  newValue: number | undefined,
) => {
  return fetchGraphql(mutations.changeRating, {
    id,
    ratingToBeChanged,
    newValue,
  });
};

const sendFinalComments = (
  id: number,
  newComments: string,
  newSkillCategory: string,
  newRecommendedSecondChoice: string,
) => {
  return fetchGraphql(mutations.modifyFinalComments, {
    id,
    newComments,
    newSkillCategory,
    newRecommendedSecondChoice,
  });
};

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
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const setStage = useContext(ReviewSetStageContext);

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

  const reviewId = getReviewId(router.query);

  const updateAllData = () => {
    const ratingPromises = STAGE_RATING_FIELDS.map(([stage, field]) =>
      sendRatingData(reviewId, field, scores[stage]),
    );

    const {
      comments = "",
      skillsCategory = "",
      secondChoiceRole = "",
    } = endData ?? {};

    return Promise.all([
      ...ratingPromises,
      sendFinalComments(reviewId, comments, skillsCategory, secondChoiceRole),
    ]);
  };

  return (
    <div
      className="bg-white px-6 py-4"
      style={{ borderTop: "1px solid #C4C4C4" }}
    >
      <div className="flex justify-end items-center gap-3 flex-nowrap">
        {currentStageIndex > 0 && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setStage?.(previousStage)}
            className="shrink-0 whitespace-nowrap !px-4 !py-2 !rounded-[20px] hover:!bg-white hover:!border-blue hover:!text-blue"
          >
            Previous section
          </Button>
        )}
        {currentStage === ReviewStage.END ? (
          <Button
            size="sm"
            disabled={isSubmitting}
            className="shrink-0 whitespace-nowrap !px-4 !py-2 !rounded-[20px] hover:!bg-blue hover:!border-blue hover:!text-white disabled:!opacity-60"
            onClick={async () => {
              if (onValidate && !onValidate()) {
                return;
              }

              setIsSubmitting(true);
              try {
                await updateAllData();
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
            disabled={isButtonDisabled}
            onClick={() => setStage?.(nextStage)}
            className="shrink-0 whitespace-nowrap !px-4 !py-2 !rounded-[20px] hover:!bg-blue hover:!border-blue hover:!text-white disabled:!opacity-60"
          >
            Save & Continue
          </Button>
        )}
      </div>
    </div>
  );
};
