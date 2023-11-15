import ProtectedRoute from "@components/context/ProtectedRoute";
import {
  ReviewSetScoresContext,
  ReviewSetStageContext,
} from "@components/review/shared/reviewContext";
import { ReviewDriveToLearnStage } from "@components/review/stages/reviewDriveToLearnStage";
import { ReviewEndStage } from "@components/review/stages/reviewEndStage";
import { ReviewEndSuccessStage } from "@components/review/stages/reviewEndSuccessStage";
import { ReviewInfoStage } from "@components/review/stages/reviewInfoStage";
import { ReviewPassionForSocialGoodStage } from "@components/review/stages/reviewPassionForSocialGoodStage";
import { ReviewSkillStage } from "@components/review/stages/reviewSkillStage";
import { ReviewTeamPlayerStage } from "@components/review/stages/reviewTeamPlayerStage";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import ProtectedApplication from "./protectedApplication";
import { ReviewStage } from "types";

export const getReviewId = (query: any): number => {
  // verify reviewId
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

const ReviewsPages: NextPage = () => {
  const router = useRouter();
  const [stage, setStage] = useState<ReviewStage>(ReviewStage.INFO);
  const initialScores = new Map<ReviewStage, number>();
  initialScores.set(ReviewStage.PFSG, 1);
  initialScores.set(ReviewStage.TP, 1);
  initialScores.set(ReviewStage.D2L, 1);
  initialScores.set(ReviewStage.SKL, 1);

  const [scores, setScores] = useState<Map<ReviewStage, number>>(initialScores);
  const updateScores = (key: ReviewStage, value: number) => {
    setScores((map) => {
      if (isNaN(value) || value < 1 || value > 5) {
        return map;
      }
      return new Map(map.set(key, value));
    });
  };

  const getReviewStage = () => {
    const reviewId = getReviewId(router.query);
    switch (stage) {
      case ReviewStage.INFO:
        return <ReviewInfoStage scores={scores} reviewId={reviewId} />;
      case ReviewStage.PFSG:
        return <ReviewPassionForSocialGoodStage scores={scores} />;
      case ReviewStage.TP:
        return <ReviewTeamPlayerStage scores={scores} />;
      case ReviewStage.D2L:
        return <ReviewDriveToLearnStage scores={scores} />;
      case ReviewStage.SKL:
        return <ReviewSkillStage scores={scores} />;
      case ReviewStage.END:
        return <ReviewEndStage scores={scores} />;
      case ReviewStage.END_SUCCESS:
      default:
        return <ReviewEndSuccessStage />;
    }
  };

  return (
    <ReviewSetScoresContext.Provider value={updateScores}>
      <ReviewSetStageContext.Provider value={setStage}>
        {getReviewStage()}
      </ReviewSetStageContext.Provider>
    </ReviewSetScoresContext.Provider>
  );
};

const Reviews: NextPage = () => {
  const router = useRouter();
  return (
    <ProtectedRoute allowedRoles={["Admin", "User"]}>
      <ProtectedApplication headerInformation={router.query}>
        {/* pass in the review id instead */}
        <ReviewsPages />
      </ProtectedApplication>
    </ProtectedRoute>
  );
};

export default Reviews;
