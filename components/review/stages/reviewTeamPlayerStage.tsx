import { ReviewStage } from "pages/review";
import { ReviewRatingPage } from "../shared/reviewRatingPage";
import { ReviewRubric } from "./reviewRubric";
import { ReviewAnswers } from "./reviewAnswers";
import { queries } from "graphql/queries";
import { useRouter } from "next/router";
import { FC, useState, useEffect } from "react";
import { fetchGraphql } from "@utils/makegqlrequest";
import { ApplicationDTO } from "types";

interface Props {
  scores: Map<ReviewStage, number>;
}

const reviewTPScoringCriteria = [
  "Provides an irrelevant example of a meaningful community. Example has zero personal connection. Example: UW Blueprint seems to be a great community and I'd be proud to be a part of it",
  "Only talks about the community but doesn't mention any contributions made or doesn't indicate why the community is meaningful to the candidate; doesn't have a personal connection. No mention is made of collaboration or group impacts. Example: I'm a part of [x] and I met a lot of great people through it!",
  "Personal and meaningful connection to the community is evident and demonstrates strong contributions to the community. Speaks of the community and its impacts and the candidates impacts on the community with genuine passion. Example: I'm proud to be a part of [x] community because of [x, y, z]. I do [x] for the community by doing [y] because this community [...], etc.",
  "Personal and meaningful connection to the community is evident and demonstrates going above and beyond to contribute to that community. Genuinely talks about collaboration and the impact either the candidate had on the community and/or the impact of the community on the candidate. Example: I have been a part of [x] community for [x] years. It has taught me [x, y, z]. In this community I do [x]. As a result I was able to help the community do [x, y, z], etc.", 
];

interface AuthStatus {
  loading: boolean;
  isAuthorized: boolean;
}

interface Props {
  scores: Map<ReviewStage, number>;
  reviewId: number;
}


export const ReviewTeamPlayerStage: React.FC<Props> = ({ scores, reviewId }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    loading: true,
    isAuthorized: false,
  });
  useEffect(() => {
    fetchGraphql(queries.applicationsById, {
      id: reviewId,
    }).then((result) => {
      if (result.data) {
        const appInfo: ApplicationDTO = result.data.applicationsById;
        const shortAnswerStr = appInfo.shortAnswerQuestions[0];
        const shortAnswerJSON = JSON.parse(shortAnswerStr);
        const combinedName = appInfo.firstName + " " + appInfo.lastName;
        setName(combinedName);

        const extractedQuestions = shortAnswerJSON.map(
          (dict: { [key: string]: string }) => {
            return dict.question;
          },
        );

        const extractedAnswers = shortAnswerJSON.map(
          (dict: { [key: string]: string }) => {
            return dict.response;
          },
        );
        setQuestions((questions) => [...questions, extractedQuestions[2]]);
        setAnswers((answers) => [...answers, extractedAnswers[2]]);
      } else {
        setAuthStatus({
          loading: false,
          isAuthorized: false,
        });
      }
    });
  }, []);
  return (
    <ReviewRatingPage
      studentName= {name}
      title="Team player"
      currentStage={ReviewStage.TP}
      currentStageRubric={
        <ReviewRubric
          scoringCriteria={reviewTPScoringCriteria}
          scores={scores}
          currentStage={ReviewStage.TP}
        />
      }
      currentStageAnswers={
        <ReviewAnswers questions={questions} answers={answers} />
      }
      scores={scores}
    />
  );
};
