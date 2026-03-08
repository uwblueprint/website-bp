import { useContext } from "react";
import { ApplicationDTO } from "../../../types";
import { ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/ReviewContext";
import { ReviewScoreInput } from "../shared/ReviewScoreInput";
import { REVIEW_PFSG_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewScores } from "../shared/types";
import { ReviewAnswers } from "./ReviewAnswers";
import { ReviewRubric } from "./ReviewRubric";
import { ReviewPageLayout, PanelLayout } from "../layout";

const BACK_TO_HOME_HREF = "/admin";

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
      <PanelLayout
        backToHomeHref={BACK_TO_HOME_HREF}
        title="Passion for social good"
        subtitle={`${name}'s Application`}
      >
        <ReviewAnswers questions={questions} answers={answers} />
      </PanelLayout>
      <PanelLayout
        borderLeft
        title="Scoring for passion for social good (PFSG)"
        titleVariant="medium"
        variant="white"
      >
        <ReviewRubric
          scoringCriteria={REVIEW_PFSG_SCORING_CRITERIA}
          scores={scores}
          currentStage={ReviewStage.PFSG}
        />
        <div
          className="w-full shrink-0"
          style={{ height: "1px", background: "#C4C4C4" }}
        />
        <div className="flex items-center gap-3">
          <ReviewScoreInput
            id="pfsg-score"
            value={scores[ReviewStage.PFSG] || ""}
            min={1}
            max={5}
            placeholder={`Enter ${name}'s score`}
            ariaLabel="Passion for social good score"
            onChange={(v) => updateScore?.(ReviewStage.PFSG, v)}
          />
          <span className="text-xl leading-none" style={{ color: "#CD5A5A" }}>
            *
          </span>
        </div>
      </PanelLayout>
    </ReviewPageLayout>
  );
};
