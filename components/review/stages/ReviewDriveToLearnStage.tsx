import { useContext } from "react";
import { ApplicationDTO } from "../../../types";
import { ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/ReviewContext";
import { ReviewRatingPage } from "../shared/ReviewRatingPage";
import { REVIEW_D2L_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewScores } from "../shared/types";
import { ReviewAnswers } from "./ReviewAnswers";
import { ReviewRubric } from "./ReviewRubric";

interface Props {
  name: string;
  application: ApplicationDTO | undefined;
  scores: ReviewScores;
}

export const ReviewDriveToLearnStage = ({
  name,
  application,
  scores,
}: Props) => {
  const updateScore = useContext(ReviewSetScoresContext);
  const shortAnswerStr = application?.shortAnswerQuestions[0];
  const shortAnswerJSON = shortAnswerStr ? JSON.parse(shortAnswerStr) : [];
  const questions = [shortAnswerJSON[3]?.question];
  const answers = [shortAnswerJSON[3]?.response];
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
      contextConsumer={
        <div className="flex items-center justify-end">
          <input
            type="number"
            pattern="[1-4]"
            value={scores[ReviewStage.D2L]}
            onChange={(event) => {
              if (event.target.validity.valid) {
                updateScore?.(ReviewStage.D2L, parseInt(event.target.value));
              }
            }}
          />
          <h5 className="text-red-500 inline-block px-2 text-xl">*</h5>
        </div>
      }
    />
  );
};
