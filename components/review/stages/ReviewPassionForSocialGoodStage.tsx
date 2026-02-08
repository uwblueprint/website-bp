import { ApplicationDTO } from "../../../types";
import { ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/ReviewContext";
import { ReviewRatingPage } from "../shared/ReviewRatingPage";
import { REVIEW_PFSG_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewScores } from "../shared/types";
import { ReviewAnswers } from "./ReviewAnswers";
import { ReviewRubric } from "./ReviewRubric";

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
  const shortAnswerStr = application?.shortAnswerQuestions[0];
  const shortAnswerJSON = shortAnswerStr ? JSON.parse(shortAnswerStr) : [];
  const questions = [shortAnswerJSON[1]?.question];
  const answers = [shortAnswerJSON[1]?.response];
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
      />
    </>
  );
};
