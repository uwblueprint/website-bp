import { ReviewStage } from "pages/review";
import { ReviewRatingPage } from "../shared/reviewRatingPage";
import { ReviewRubric } from "./reviewRubric";
import { ReviewAnswers } from "./reviewAnswers";
import { FC, useState, useEffect } from "react";
import { queries } from "graphql/queries";
import { fetchGraphql } from "@utils/makegqlrequest";
import { ApplicationDTO } from "types";

interface Props {
  scores: Map<ReviewStage, number>;
  reviewId: number;
}

interface AuthStatus {
  loading: boolean;
  isAuthorized: boolean;
}

const reviewD2LScoringCriteria = [
  'Does not go above and beyond learning the bare minimum of a skill. Resume or portfolio are low effort and shows no sign of polishing. Application questions are clearly thrown together at the last minute. Answers are extremely short and shallow. Example: "I learned [x] because it would have [y] by reading a few articles"',
  "A minimal amount of initiative shown beyond learning the bare minimum of a skill. Resume or portfolio are low effort but show a small amount of polish. Application questions are clearly short and shallow but indicate that they may not have been thrown together last minute. Example: Working on an incomplete and trivial side project, or surface level understanding and/or development of a topic or skill.",
  "Demonstrates some ability to analyze problems and select the best course of action when blocked. Has a process/approach in how they learn and can face challenges and/or failure. Takes the extra step to learn more than the minimum. Example: working on a noteworthy side project or skill, deep pursuit of an interest (not necessarily technical), participation in a competitive team or hackathons, applying newly learned skills and processes from school or work etc.",
  "Demonstrates a high ability to analyze problems, evaluate alternatives, and select the best course of action when blocked. Has a clear process/approach in how they learn and has a positive attitude when faced with a challenge and/or failure Takes the extra step to learn above and beyond the minimum. Is clearly self-motivated and driven, genuinely eager to learn. Is basically doing the most to learn skills of interest to them. Example: outstanding or non conventional projects / initiatives that clearly tie an applicant’s personal development goals with something new and creative.",
];

export const ReviewDriveToLearnStage: React.FC<Props> = ({
  scores,
  reviewId,
}) => {
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

        setQuestions((questions) => [extractedQuestions[3]]);
        setAnswers((answers) => [extractedAnswers[3]]);
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
      studentName={name}
      title="Drive to learn"
      currentStage={ReviewStage.D2L}
      currentStageRubric={
        <ReviewRubric
          scoringCriteria={reviewD2LScoringCriteria}
          scores={scores}
          currentStage={ReviewStage.D2L}
        />
      }
      currentStageAnswers={
        <ReviewAnswers questions={questions} answers={answers} />
      }
      scores={scores}
    />
  );
};
