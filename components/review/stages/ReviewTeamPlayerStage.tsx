import { useEffect, useState } from "react";
import { ApplicationDTO } from "../../../types";
import { ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/ReviewContext";
import { ReviewRatingPage } from "../shared/ReviewRatingPage";
import { REVIEW_TP_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewScores } from "../shared/types";
import { ReviewAnswers } from "./ReviewAnswers";
import { ReviewRubric } from "./ReviewRubric";

interface Props {
  name: string;
  application: ApplicationDTO | undefined;
  scores: ReviewScores;
}

export const ReviewTeamPlayerStage = ({ name, application, scores }: Props) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const shortAnswerStr = application?.shortAnswerQuestions[0];
    if (!shortAnswerStr) return;
    const shortAnswerJSON = JSON.parse(shortAnswerStr);
    const question = shortAnswerJSON[2]?.question;
    const answer = shortAnswerJSON[2]?.response;

    setQuestions([question]);
    setAnswers([answer]);
  }, [application]);
  return (
    <ReviewRatingPage
      studentName={name}
      contextConsumer={
        <ReviewSetScoresContext.Consumer>
          {(updateScore) => (
            <div className="flex items-center justify-end">
              <input
                type="number"
                pattern="[1-5]"
                value={scores[ReviewStage.TP]}
                onChange={(event) => {
                  if (event.target.validity.valid) {
                    updateScore?.(ReviewStage.TP, parseInt(event.target.value));
                  }
                }}
              />
              <h5 className="text-red-500 inline-block px-2 text-xl">*</h5>
            </div>
          )}
        </ReviewSetScoresContext.Consumer>
      }
      title="Team player"
      currentStage={ReviewStage.TP}
      currentStageRubric={
        <ReviewRubric
          scoringCriteria={REVIEW_TP_SCORING_CRITERIA}
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
