import { useEffect, useState } from "react";
import { ApplicationDTO } from "../../../types";
import { ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/reviewContext";
import { ReviewRatingPage } from "../shared/reviewRatingPage";
import { REVIEW_PFSG_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewScores } from "../shared/types";
import { ReviewAnswers } from "./reviewAnswers";
import { ReviewRubric } from "./reviewRubric";

export interface Props {
  name: string;
  application: ApplicationDTO | undefined;
  scores: ReviewScores;
}

export const ReviewPassionForSocialGoodStage = ({
  name,
  application,
  scores,
}: Props) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const shortAnswerStr = application?.shortAnswerQuestions[0];
    if (!shortAnswerStr) return;
    const shortAnswerJSON = JSON.parse(shortAnswerStr);
    const question = shortAnswerJSON[1]?.question;
    const answer = shortAnswerJSON[1]?.response;

    setQuestions([question]);
    setAnswers([answer]);
  }, [application]);
  return (
    <>
      <ReviewRatingPage
        studentName={name}
        contextConsumer={
          <ReviewSetScoresContext.Consumer>
            {(updateScore) => (
              <div className="flex items-center justify-end">
                <input
                  type="number"
                  pattern="[1-5]"
                  value={scores[ReviewStage.PFSG]}
                  onChange={(event) => {
                    if (event.target.validity.valid) {
                      updateScore?.(
                        ReviewStage.PFSG,
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
        title="Passion for social good"
        currentStage={ReviewStage.PFSG}
        currentStageRubric={
          <ReviewRubric
            scoringCriteria={REVIEW_PFSG_SCORING_CRITERIA}
            scores={scores}
            currentStage={ReviewStage.PFSG}
          />
        }
        currentStageAnswers={
          <ReviewAnswers questions={questions} answers={answers} />
        }
        scores={scores}
        application={application}
      />
    </>
  );
};
