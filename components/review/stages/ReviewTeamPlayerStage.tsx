import { useContext } from "react";
import { ApplicationDTO } from "../../../types";
import { ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/ReviewContext";
import { REVIEW_TP_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewScores } from "../shared/types";
import { ReviewAnswers } from "./ReviewAnswers";
import { ReviewRubric } from "./ReviewRubric";
import { ReviewPageLayout, PanelLeft, PanelRight } from "../layout";

interface Props {
  name: string;
  application: ApplicationDTO | undefined;
  scores: ReviewScores;
}

export const ReviewTeamPlayerStage = ({ name, application, scores }: Props) => {
  const updateScore = useContext(ReviewSetScoresContext);
  const shortAnswerStr = application?.shortAnswerQuestions[0];
  const shortAnswerJSON = shortAnswerStr ? JSON.parse(shortAnswerStr) : [];
  const questions = [shortAnswerJSON[2]?.question];
  const answers = [shortAnswerJSON[2]?.response];
  const { TP } = ReviewStage;
  return (
    <ReviewPageLayout currentStage={TP} scores={scores}>
      <PanelLeft title="Rubric">
        <ReviewRubric
          scoringCriteria={REVIEW_TP_SCORING_CRITERIA}
          scores={scores}
          currentStage={TP}
        />
      </PanelLeft>
      <PanelRight title="Team player" studentName={name}>
        <div
          className="flex flex-col gap-8"
          style={{ alignItems: "flex-start" }}
        >
          <div>
            <ReviewAnswers questions={questions} answers={answers} />
          </div>
          <div>
            <div className="flex items-center justify-end">
              <input
                type="number"
                pattern="[1-5]"
                value={scores[ReviewStage.TP]}
                onChange={(event) => {
                  if (event.target.validity.valid) {
                    updateScore?.(TP, parseInt(event.target.value));
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
