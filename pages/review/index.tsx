import ProtectedRoute from "@components/context/ProtectedRoute";
import { ReviewSetStageContext } from "@components/review/shared/reviewsContext";
import { ReviewsDriveToLearnStage } from "@components/review/stages/reviewsDriveToLearnStage";
import { ReviewsEndStage } from "@components/review/stages/reviewsEndStage";
import { ReviewsEndSuccessStage } from "@components/review/stages/reviewsEndSuccessStage";
import { ReviewsInfoStage } from "@components/review/stages/reviewsInfoStage";
import { ReviewsPassionForSocialGoodStage } from "@components/review/stages/reviewsPassionForSocialGoodStage";
import { ReviewsSkillStage } from "@components/review/stages/reviewsSkillStage";
import { ReviewsTeamPlayerStage } from "@components/review/stages/reviewsTeamPlayerStage";
import { NextPage } from "next";
import { useState } from "react";

export enum ReviewStage {
  INFO = "INFO",
  PFSG = "PFSG",
  TP = "TP",
  D2L = "D2L",
  SKL = "SKL",
  END = "END",
  END_SUCCESS = "END_SUCCESS",
}

const Reviews: NextPage = () => {
  const [stage, setStage] = useState<ReviewStage>(ReviewStage.INFO);

  const getReviewStage = () => {
    switch (stage) {
      case ReviewStage.INFO:
        return <ReviewsInfoStage />;
      case ReviewStage.PFSG:
        return <ReviewsPassionForSocialGoodStage />;
      case ReviewStage.TP:
        return <ReviewsTeamPlayerStage />;
      case ReviewStage.D2L:
        return <ReviewsDriveToLearnStage />;
      case ReviewStage.SKL:
        return <ReviewsSkillStage />;
      case ReviewStage.END:
        return <ReviewsEndStage />;
      case ReviewStage.END_SUCCESS:
      default:
        return <ReviewsEndSuccessStage />;
    }
  };

  return (
    <ProtectedRoute>
      <ReviewSetStageContext.Provider value={setStage}>
        {getReviewStage()}
      </ReviewSetStageContext.Provider>
    </ProtectedRoute>
  );
};

export default Reviews;
