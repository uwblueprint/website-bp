import Button from "@components/common/Button";
import { fetchGraphql } from "@utils/makegqlrequest";
import { mutations } from "graphql/queries";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { REVIEW_STAGES, ReviewStage } from "./constants";
import { ReviewSetStageContext } from "./ReviewContext";
import { getReviewId } from "./reviewUtils";
import { ReviewEndData, ReviewScores } from "./types";

interface Props {
  currentStage: ReviewStage;
  scores: ReviewScores;
  endData?: ReviewEndData;
}

export const ReviewStepper = ({ currentStage, scores, endData }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const currentStageIndex = useMemo(() => {
    return REVIEW_STAGES.indexOf(currentStage);
  }, [currentStage]);

  if (!router.isReady) return null;

  const reviewId = getReviewId(router.query);

  const getNextStage = () => {
    if (currentStageIndex < REVIEW_STAGES.length - 1) {
      return REVIEW_STAGES[currentStageIndex + 1];
    }
    return ReviewStage.END_SUCCESS;
  };

  const getPreviousStage = () => {
    return REVIEW_STAGES[Math.max(currentStageIndex - 1, 0)];
  };

  const isButtonDisabled = () => {
    if (
      currentStage === ReviewStage.INFO ||
      currentStage === ReviewStage.END_SUCCESS
    ) {
      return false;
    }
    const currScore = scores[currentStage];
    return !(currScore > 0 && currScore <= 5);
  };

  const sendRatingData = (
    id: number,
    ratingToBeChanged: string,
    newValue: number | undefined,
  ) => {
    return fetchGraphql(mutations.changeRating, {
      id: id,
      ratingToBeChanged: ratingToBeChanged,
      newValue: newValue,
    });
  };

  const sendFinalComments = (
    id: number,
    newComments: string,
    newSkillCategory: string,
    newRecommendedSecondChoice: string,
  ) => {
    return fetchGraphql(mutations.modifyFinalComments, {
      id: id,
      newComments: newComments,
      newSkillCategory: newSkillCategory,
      newRecommendedSecondChoice: newRecommendedSecondChoice,
    });
  };

  const updateAllData = async () => {
    await Promise.all([
      sendRatingData(reviewId, "passionFSG", scores[ReviewStage.PFSG]),
      sendRatingData(reviewId, "teamPlayer", scores[ReviewStage.TP]),
      sendRatingData(reviewId, "desireToLearn", scores[ReviewStage.D2L]),
      sendRatingData(reviewId, "skill", scores[ReviewStage.SKL]),
      sendFinalComments(
        reviewId,
        endData?.comments ?? "",
        endData?.skillsCategory ?? "",
        endData?.secondChoiceRole ?? "",
      ),
    ]);
  };

  // Don't show navigation on success page
  if (currentStage === ReviewStage.END_SUCCESS) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 bg-white px-6 py-4">
      <ReviewSetStageContext.Consumer>
        {(setStage) => (
          <div className="flex justify-end items-center gap-3">
            {currentStageIndex > 0 && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setStage?.(getPreviousStage())}
              >
                Previous section
              </Button>
            )}
            {currentStage === ReviewStage.END ? (
              <Button
                size="sm"
                disabled={isSubmitting}
                onClick={async () => {
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
                disabled={isButtonDisabled()}
                onClick={() => {
                  setStage?.(getNextStage());
                }}
              >
                Save & Continue
              </Button>
            )}
          </div>
        )}
      </ReviewSetStageContext.Consumer>
    </div>
  );
};
