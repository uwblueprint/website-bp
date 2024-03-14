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
import { useState, useEffect } from "react";
import { fetchGraphql } from "@utils/makegqlrequest";
import ProtectedApplication from "./protectedApplication";
import { queries } from "graphql/queries";
import { ApplicationDTO, AuthStatus } from "types";

export enum ReviewStage {
  INFO = "INFO",
  PFSG = "PFSG",
  TP = "TP",
  D2L = "D2L",
  SKL = "SKL",
  END = "END",
  END_SUCCESS = "END_SUCCESS",
}

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

export const extractShortAnswerData = (shortAnswerJSON: any) => {
  const extractedQuestions = shortAnswerJSON.map(
    (dict: { [key: string]: string }) => dict.question,
  );

  const extractedAnswers = shortAnswerJSON.map(
    (dict: { [key: string]: string }) => dict.response,
  );

  return { extractedQuestions, extractedAnswers };
};

const ReviewsPages: NextPage = () => {
  const router = useRouter();
  const [stage, setStage] = useState<ReviewStage>(ReviewStage.INFO);
  const [application, setApplication] = useState<ApplicationDTO>();
  const name = application?.firstName + " " + application?.lastName;

  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    loading: true,
    isAuthorized: false,
  });

  const reviewId = getReviewId(useRouter().query);

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

  useEffect(() => {
    fetchGraphql(queries.applicationsById, {
      id: reviewId,
    }).then((result) => {
      if (result.data) {
        const appInfo = result.data.applicationsById;
        setApplication(appInfo);
      } else {
        setAuthStatus({
          loading: false,
          isAuthorized: false,
        });
      }
    });
  }, [reviewId]);

  const getReviewStage = () => {
    switch (stage) {
      case ReviewStage.INFO:
        return (
          <ReviewInfoStage
            name={name}
            application={application}
            scores={scores}
          />
        );
      case ReviewStage.PFSG:
        return (
          <ReviewPassionForSocialGoodStage
            name={name}
            application={application}
            scores={scores}
          />
        );
      case ReviewStage.TP:
        return (
          <ReviewTeamPlayerStage
            name={name}
            application={application}
            scores={scores}
          />
        );
      case ReviewStage.D2L:
        return (
          <ReviewDriveToLearnStage
            name={name}
            application={application}
            scores={scores}
          />
        );
      case ReviewStage.SKL:
        return (
          <ReviewSkillStage
            name={name}
            application={application}
            scores={scores}
          />
        );
      case ReviewStage.END:
        return <ReviewEndStage scores={scores} />;
      case ReviewStage.END_SUCCESS:
      default:
        return <ReviewEndSuccessStage name={name}/>;
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
        <ReviewsPages />
      </ProtectedApplication>
    </ProtectedRoute>
  );
};

export default Reviews;
