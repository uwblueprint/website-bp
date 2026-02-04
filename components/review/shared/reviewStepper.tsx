import Button from "@components/common/Button";
import { fetchGraphql } from "@utils/makegqlrequest";
import { mutations } from "graphql/queries";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { ApplicationDTO } from "../../../types";
import { REVIEW_STAGES, ReviewStage } from "./constants";
import { ReviewSetStageContext } from "./reviewContext";
import { ReviewScores } from "./types";

interface Props {
  currentStage: ReviewStage;
  scores: ReviewScores;
  application: ApplicationDTO | undefined;
}

export const ReviewStepper = ({ currentStage, application, scores }: Props) => {
  const currentStageIndex = useMemo(() => {
    return REVIEW_STAGES.indexOf(currentStage);
  }, [currentStage]);

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
    } else if (scores === undefined) {
      return false;
    } else {
      const currScore = scores[currentStage];
      if (currScore > 0 && currScore <= 5) {
        return false;
      } else {
        return true;
      }
    }
  };

  const sendRatingData = (
    id: number,
    ratingToBeChanged: string,
    newValue: number | undefined,
  ) => {
    fetchGraphql(mutations.changeRating, {
      id: id,
      ratingToBeChanged: ratingToBeChanged,
      newValue: newValue,
    }).then(() => {
      // Rating update handled by backend
    });
  };

  const sendFinalComments = (
    id: number,
    newComments: string,
    newSkillCategory: string,
    newRecommendedSecondChoice: string,
  ) => {
    fetchGraphql(mutations.modifyFinalComments, {
      id: id,
      newComments: newComments,
      newSkillCategory: newSkillCategory,
      newRecommendedSecondChoice: newRecommendedSecondChoice,
    }).then(() => {
      // Comments update handled by backend
    });
  };

  const getReviewId = (
    query: Record<string, string | string[] | undefined>,
  ): number => {
    const reviewId =
      typeof query["reviewId"] === "string"
        ? parseInt(query["reviewId"])
        : (() => {
            throw new Error("reviewId must be a String");
          })();
    if (Number.isNaN(reviewId))
      throw Error("reviewId must be parsable into an int");

    return reviewId;
  };

  const reviewId = getReviewId(useRouter().query);

  const updateAllData = () => {
    sendRatingData(reviewId, "passionFSG", scores[ReviewStage.PFSG]);
    sendRatingData(reviewId, "teamPlayer", scores[ReviewStage.TP]);
    sendRatingData(reviewId, "desireToLearn", scores[ReviewStage.D2L]);
    sendRatingData(reviewId, "skill", scores[ReviewStage.SKL]);
    sendFinalComments(
      reviewId,
      application?.comments ?? "",
      application?.skillsCategory ?? "",
      application?.secondChoiceRole ?? "",
    );
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
                onClick={() => {
                  updateAllData();
                  setStage?.(ReviewStage.END_SUCCESS);
                }}
              >
                Finish
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
