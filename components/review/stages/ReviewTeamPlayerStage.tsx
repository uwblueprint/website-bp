import { useContext } from "react";
import { ApplicationDTO } from "../../../types";
import { ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/ReviewContext";
import { ReviewScoreInput } from "../shared/ReviewScoreInput";
import { REVIEW_TP_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewScores } from "../shared/types";
import { ReviewAnswers } from "./ReviewAnswers";
import { ReviewRubric } from "./ReviewRubric";
import { ReviewPageLayout, PanelLayout } from "../layout";

const BACK_TO_HOME_HREF = "/admin";

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
      <PanelLayout
        backToHomeHref={BACK_TO_HOME_HREF}
        title="Team player"
        subtitle={`${name}'s Application`}
      >
        <ReviewAnswers questions={questions} answers={answers} />
      </PanelLayout>
      <PanelLayout
        borderLeft
        title="Scoring Team player (TEAM)"
        titleVariant="medium"
        variant="white"
      >
        <ReviewRubric
          scoringCriteria={REVIEW_TP_SCORING_CRITERIA}
          scores={scores}
          currentStage={TP}
        />
        <div
          className="w-full shrink-0"
          style={{ height: "1px", background: "#C4C4C4" }}
        />
        <div className="flex items-center gap-3">
          <ReviewScoreInput
            id="tp-score"
            value={scores[TP] || ""}
            min={1}
            max={5}
            placeholder={`Enter ${name}'s score`}
            ariaLabel="Team player score"
            onChange={(v) => updateScore?.(TP, v)}
          />
          <span className="text-xl leading-none" style={{ color: "#CD5A5A" }}>
            *
          </span>
        </div>
      </PanelLayout>
    </ReviewPageLayout>
  );
};
