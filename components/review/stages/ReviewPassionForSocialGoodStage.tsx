import { useContext } from "react";
import { ApplicationDTO } from "../../../types";
import { ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/ReviewContext";
import { REVIEW_PFSG_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewScores } from "../shared/types";
import { ReviewAnswers } from "./ReviewAnswers";
import { ReviewRubric } from "./ReviewRubric";
import { ReviewPageLayout, PanelLeft, PanelRight } from "../layout";

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
  const updateScore = useContext(ReviewSetScoresContext);
  const shortAnswerStr = application?.shortAnswerQuestions[0];
  const shortAnswerJSON = shortAnswerStr ? JSON.parse(shortAnswerStr) : [];
  const questions = [shortAnswerJSON[1]?.question];
  const answers = [shortAnswerJSON[1]?.response];
  return (
    <ReviewPageLayout currentStage={ReviewStage.PFSG} scores={scores}>
      <PanelLeft title="Rubric">
        <ReviewRubric
          scoringCriteria={REVIEW_PFSG_SCORING_CRITERIA}
          scores={scores}
          currentStage={ReviewStage.PFSG}
        />
      </PanelLeft>
      <PanelRight title="Passion for social good" subtitle={`${name}'s Application`}>
        <div className="flex flex-col items-start gap-8">
          <div>
            <ReviewAnswers questions={questions} answers={answers} />
          </div>
          <div>
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
          </div>
        </div>
      </PanelRight>
    </ReviewPageLayout>
  );
};
