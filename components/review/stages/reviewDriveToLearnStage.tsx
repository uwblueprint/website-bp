import { useEffect, useState } from "react";
import { ApplicationDTO } from "../../../types";
import { ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/reviewContext";
import { ReviewRatingPage } from "../shared/reviewRatingPage";
import { REVIEW_D2L_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewScores } from "../shared/types";
import { ReviewAnswers } from "./reviewAnswers";
import { ReviewRubric } from "./reviewRubric";

interface Props {
  name: string;
  application: ApplicationDTO | undefined;
  scores: ReviewScores;
}

export const ReviewDriveToLearnStage: React.FC<Props> = ({
  name,
  application,
  scores,
}) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const shortAnswerStr = application?.shortAnswerQuestions[0];
    if (!shortAnswerStr) return;
    const shortAnswerJSON = JSON.parse(shortAnswerStr);
    const question = shortAnswerJSON[3]?.question;
    const answer = shortAnswerJSON[3]?.response;

    setQuestions([question]);
    setAnswers([answer]);
  }, [application]);
  return (
    <ReviewRatingPage
      studentName={name}
      title="Drive to learn"
      currentStage={ReviewStage.D2L}
      currentStageRubric={
        <ReviewRubric
          scoringCriteria={REVIEW_D2L_SCORING_CRITERIA}
          scores={scores}
          currentStage={ReviewStage.D2L}
        />
      }
      currentStageAnswers={
        <ReviewAnswers questions={questions} answers={answers} />
      }
      scores={scores}
      application={application}
      contextConsumer={
        <ReviewSetScoresContext.Consumer>
          {(updateScore) => (
            <div className="flex items-center justify-end">
              <input
                type="number"
                pattern="[1-4]"
                value={scores[ReviewStage.D2L]}
                onChange={(event) => {
                  if (event.target.validity.valid) {
                    updateScore?.(
                      ReviewStage.D2L,
                      parseInt(event.target.value),
                    );
                  }
                }}
              />
              <h5 className="text-red-500 inline-block px-2 text-xl">*</h5>
            </div>
          )}
        </ReviewSetScoresContext.Consumer>
      }
    />
  );
};
