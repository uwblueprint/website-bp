import ProtectedRoute from "@components/context/ProtectedRoute";
import { ReviewDispatchContext } from "@components/review/shared/ReviewContext";
import { DriveToLearnStage } from "@components/review/stages/driveToLearnStage";
import { EndStage } from "@components/review/stages/endStage";
import { EndSuccessStage } from "@components/review/stages/endSuccessStage";
import { InfoStage } from "@components/review/stages/infoStage";
import { PassionForSocialGoodStage } from "@components/review/stages/passionForSocialGoodStage";
import { SkillStage } from "@components/review/stages/skillStage";
import { TeamPlayerStage } from "@components/review/stages/teamPlayerStage";
import { NextPage } from "next";
import { useRouter } from "next/router.js";
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

interface QueryParams {
  stage: ReviewStage;
  reviewId: string;
}

const Reviews: NextPage = () => {
  const [stage, setStage] = useState<ReviewStage>(ReviewStage.INFO);

  const getReviewStage = () => {
    switch (stage) {
      case ReviewStage.INFO:
        return <InfoStage />;
      case ReviewStage.PFSG:
        return <PassionForSocialGoodStage />;
      case ReviewStage.TP:
        return <TeamPlayerStage />;
      case ReviewStage.D2L:
        return <DriveToLearnStage />;
      case ReviewStage.SKL:
        return <SkillStage />;
      case ReviewStage.END:
        return <EndStage />;
      case ReviewStage.END_SUCCESS:
      default:
        return <EndSuccessStage />;
    }
  };

  return (
    <ProtectedRoute>
      <ReviewDispatchContext.Provider value={setStage}>
        {getReviewStage()}
      </ReviewDispatchContext.Provider>
    </ProtectedRoute>
  );
};

export default Reviews;
