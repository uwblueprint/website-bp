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

const sampleApplication: ApplicationDTO = {
  id: 1,
  academicOrCoop: "Academic",
  academicYear: "2A",
  email: "kushalgoel786@gmail.com",
  firstChoiceRole: "Project Developer",
  firstName: "Kushal",
  heardFrom: "Word of mouth",
  lastName: "Goel",
  locationPreference: "In-Person (Waterloo)",
  program: "Computer Science",
  timesApplied: "This is my first time!",
  pronouns: "He/Him/His",
  pronounsSpecified: "",
  resumeUrl:
    "https://firebasestorage.googleapis.com/v0/b/uw-blueprint.appspot.com/o/resumes%2F01b3e17a-73c3-477a-a84d-cbf6ef2d7bda?alt=media&token=d90e50ca-e221-4fb6-b3a0-05dec3bf06c8",
  roleSpecificQuestions: [
    '[{"id":"1","questions":[{"options":["Frontend","Backend","Fullstack","Mobile"],"other":true,"question":"Which areas of a project are you interested in working in?","response":["Frontend","Backend","Fullstack","Mobile"],"type":"multi-select"},{"maxLength":1000,"question":"Tell us about a challenging technical problem that you\'ve worked on in the past and how you solved it.","response":"In the face of limited data availability for mutual fund investing, I tackled the challenge by developing a project that leveraged Net Asset Values (NAVs) to calculate crucial performance metrics. Using Python and data analysis tools, I created an algorithm to process NAV data and derive metrics like historical performance, return on investment, volatility, etc. These metrics enabled me to assess fund performance, risk levels, and cost-effectiveness, aiding informed investment decisions. Additionally, I incorporated data visualization techniques to present the metrics visually, facilitating easy comparison and identification of investment opportunities. Overall, this project effectively addressed the challenge, providing valuable insights within the constraints of limited data, and empowering me to make informed investment choices.","uniqueId":1}],"role":"Project Developer"}]',
  ],
  secondChoiceRole: "",
  shortAnswerQuestions: [
    '[{"question":"What timezone will you be based out of next term?","response":"I will be based in Waterloo only, which means Eastern Time (ET)"},{"question":"Tell us about a cause that resonates with you.","response":"I am passionate about spreading financial knowledge, specifically in the area of personal finance. Financial literacy is crucial for individuals to lead secure and empowered lives. I believe that by promoting financial education, we can empower people to make informed decisions about budgeting, saving, investing, and debt management. This knowledge helps individuals build emergency funds, avoid predatory loans, and plan for their future. "},{"question":"Tell us about a community you\'re proud to be a part of and how you contributed to it.","response":"I am proud to be a part of the FlutterFever community, which I initiated. Through this community, I taught app development to over 200 students, providing workshops, curriculum, and ongoing support. The inclusive and supportive environment encouraged collaboration and learning. Students were able to apply their skills through coding challenges, receiving personalized feedback and mentorship. It has been incredibly rewarding to witness their progress and enthusiasm as they built their own apps."},{"question":"Tell us about a time you learned a new skill. What was your motivation to learn it and what was your approach?","response":"I learned personal budget management and finance. My motivation was to take control of my financial well-being. I approached it by watching YouTube tutorials and talking to knowledgeable people. Applying the concepts to my own finances helped solidify my understanding. It has empowered me to make informed decisions and work towards my financial goals."}]',
  ],
  status: "pending",
  term: "Fall 2023",
  secondChoiceStatus: "",
  timestamp: BigInt(1728673405),
};

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
    const appInfo = sampleApplication;
    setApplication(appInfo);
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
        return <ReviewEndSuccessStage name={name} />;
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
