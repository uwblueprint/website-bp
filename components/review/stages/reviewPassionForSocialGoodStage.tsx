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

const reviewPFSGScoringCriteria = [
  "Does not provide a relevant cause that resonates with them. Example: I'm really involved in social good causes, I'm a very empathetic person so I tend to resonate with them when I come across something negative in the world",
  "Provides a superficial and/or shallow reason for why a cause resonates with them or picks a generic cause with a generic reason or personal connection is vague. Example: I resonate with social isolation in long term care homes. I hear a lot about it from my family members and it was an assigned topic at a case competition that I went to etc",
  "Provides a reason as to why that cause resonates with them and demonstrates genuine passion and enthusiasm for said cause. Connects to the cause on a personal level. Example: Access to education is a cause that resonates with me because I grew up in [x] and I saw first hand how lack of education can [...]. ",
  "Provides a meaningful reason as to why that cause resonates with them and demonstrates genuine passion and enthusiasm for said cause. Backs up their passion with specific examples of action taken whether that be volunteer work, demonstrating in depth research, etc. Bonus: References a Blueprint project/did research. Example: Access to education is a cause that resonates with me because I grew up in [x] and I saw first hand how lack of education can [...]. Recognizing my own privilege to receive education in Canada, I [.action/research..] etc",
];

interface AuthStatus {
  loading: boolean;
  isAuthorized: boolean;
}

interface Props {
  scores: Map<ReviewStage, number>;
  reviewId: number;
}

export const ReviewPassionForSocialGoodStage: React.FC<Props> = ({ scores, reviewId }) => {
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
        setQuestions((questions) => [...questions, extractedQuestions[1]]);
        setAnswers((answers) => [...answers, extractedAnswers[1]]);
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
      title="Passion for social good"
      currentStage={ReviewStage.PFSG}
      currentStageRubric={
        <ReviewRubric
          scoringCriteria={reviewPFSGScoringCriteria}
          scores={scores}
          currentStage={ReviewStage.PFSG}
        />
      }
      currentStageAnswers={
        <ReviewAnswers questions={questions} answers={answers} />
      }
      scores={scores}
    />
  );
};
