import { useContext } from "react";
import { ApplicationDTO } from "../../../types";
import { BACK_TO_HOME_HREF, ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/ReviewContext";
import { ReviewScoreInput } from "../shared/ReviewScoreInput";
import { REVIEW_TP_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewScores } from "../shared/types";
import { ReviewAnswers } from "./ReviewAnswers";
import { ReviewRubric } from "./ReviewRubric";
import { ReviewPageLayout, PanelLayout } from "../layout";
import { ReportConflictButton } from "../shared/ReportConflictButton";
import { useTheme } from "@mui/material/styles";

interface Props {
  name: string;
  application: ApplicationDTO | undefined;
  scores: ReviewScores;
}

export const ReviewTeamPlayerStage = ({ name, application, scores }: Props) => {
  const theme = useTheme();
  const updateScore = useContext(ReviewSetScoresContext);
  const shortAnswers = application?.shortQuestionAnswers ?? [];
  const thirdShortAnswer = shortAnswers[2];
  const questions = thirdShortAnswer ? [thirdShortAnswer.question] : [];
  const answers = thirdShortAnswer ? [thirdShortAnswer.response] : [];
  const { TP } = ReviewStage;
  return (
    <ReviewPageLayout currentStage={TP} scores={scores}>
      <PanelLayout
        backToHomeHref={BACK_TO_HOME_HREF}
        headerRightAction={
          <ReportConflictButton name={name} showQuestion />
        }
        title="Team Player"
        subtitle={`${name}'s Application`}
      >
        <ReviewAnswers questions={questions} answers={answers} />
      </PanelLayout>
      <PanelLayout
        borderLeft
        title="Scoring for Team Player (TEAM)"
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
          style={{
            height: "1px",
            background: theme.palette.background.default,
          }}
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
          <span
            className="text-xl leading-none"
            style={{ color: theme.palette.error.main }}
          >
            *
          </span>
        </div>
      </PanelLayout>
    </ReviewPageLayout>
  );
};
