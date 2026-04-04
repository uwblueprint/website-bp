import Button from "@components/common/Button";
import { fetchGraphql } from "@utils/makegqlrequest";
import { mutations } from "graphql/queries";
import { useRouter } from "next/router";
import { ReactElement, useContext, useState } from "react";
import { REVIEW_SCORE_STAGES, REVIEW_STAGES, ReviewStage } from "./constants";
import { ReviewSetStageContext } from "./ReviewContext";
import {
  getFirstIncompleteScoreStage,
  getReviewIdOrNull,
  hasScore,
} from "./reviewUtils";
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
}: Props): ReactElement | null => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const setStage = useContext(ReviewSetStageContext);

  const currentStageIndex = REVIEW_STAGES.indexOf(currentStage);

  const nextStage =
    currentStageIndex < REVIEW_STAGES.length - 1
      ? REVIEW_STAGES[currentStageIndex + 1]
      : ReviewStage.END_SUCCESS;

  const previousStage = REVIEW_STAGES[Math.max(currentStageIndex - 1, 0)];

  if (!router.isReady) return null;
  if (currentStage === ReviewStage.END_SUCCESS) return null;

  const reviewId = getReviewIdOrNull(router.query);
  if (reviewId === null) return null;

  const requiresScore = REVIEW_SCORE_STAGES.includes(currentStage);
  const canContinue = !requiresScore || hasScore(scores[currentStage]);
  const canSubmit = !isSubmitting && !!endData?.skillsCategory;

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
    <div className="border-t border-[#C4C4C4] bg-white px-6 py-4 md:px-9">
      <div className="flex items-center justify-end gap-3">
        {currentStage === ReviewStage.INFO && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => router.push("/admin")}
            className="px-4 py-2 font-source text-base leading-[1.4]"
          >
            Back home
          </Button>
        )}
        {currentStageIndex > 0 && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setStage?.(previousStage)}
            className="px-4 py-2 font-source text-base leading-[1.4]"
          >
            Previous section
          </Button>
        )}
        {currentStage === ReviewStage.END ? (
          <Button
            size="sm"
            disabled={!canSubmit}
            onClick={async () => {
              const firstIncompleteStage = getFirstIncompleteScoreStage(scores);
              if (firstIncompleteStage) {
                setStage?.(firstIncompleteStage);
                return;
              }

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
            className="px-4 py-2 font-source text-base leading-[1.4]"
          >
            {isSubmitting ? "Submitting..." : "Finish"}
          </Button>
        ) : (
          <Button
            size="sm"
            disabled={!canContinue}
            onClick={() => {
              if (!canContinue) {
                return;
              }

              setStage?.(nextStage);
            }}
            className="px-4 py-2 font-source text-base leading-[1.4]"
          >
            {currentStage === ReviewStage.INFO ? "Save & Continue" : "Continue"}
          </Button>
        )}
      </div>
    </div>
  );
};
