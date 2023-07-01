import ProtectedRoute from "@components/context/ProtectedRoute";
import { ReviewSetStageContext } from "@components/review/shared/reviewContext";
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
  const router = useRouter();

  const getReviewStage = () => {
    switch (stage) {
      case ReviewStage.INFO:
        return <ReviewInfoStage />;
      case ReviewStage.PFSG:
        return <ReviewPassionForSocialGoodStage />;
      case ReviewStage.TP:
        return <ReviewTeamPlayerStage />;
      case ReviewStage.D2L:
        return <ReviewDriveToLearnStage />;
      case ReviewStage.SKL:
        return <ReviewSkillStage />;
      case ReviewStage.END:
        return <ReviewEndStage />;
      case ReviewStage.END_SUCCESS:
      default:
        return <ReviewEndSuccessStage />;
    }
  };

  return (
    <ProtectedRoute allowedRoles={["Admin", "User"]}>
      <ProtectedApplication headerInformation={router.query}>
        <ReviewSetStageContext.Provider value={setStage}>
          {getReviewStage()}
        </ReviewSetStageContext.Provider>
      </ProtectedApplication>
    </ProtectedRoute>
  );
};

export default Reviews;
