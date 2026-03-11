import { useContext } from "react";
import { ApplicationDTO } from "../../../types";
import { ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/ReviewContext";
import { ReviewScoreInput } from "../shared/ReviewScoreInput";
import { REVIEW_D2L_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewScores } from "../shared/types";
import { ReviewAnswers } from "./ReviewAnswers";
import { ReviewRubric } from "./ReviewRubric";
import { ReviewPageLayout, PanelLayout } from "../layout";
import { useTheme } from "@mui/material/styles";

const BACK_TO_HOME_HREF = "/admin";

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
  const theme = useTheme();
  return (
    <ReviewPageLayout currentStage={ReviewStage.D2L} scores={scores}>
      <PanelLayout
        backToHomeHref={BACK_TO_HOME_HREF}
        title="Drive to Learn"
        subtitle={`${name}'s Application`}
      >
        <ReviewAnswers questions={questions} answers={answers} />
      </PanelLayout>
      <PanelLayout
        borderLeft
        title="Scoring for Drive to Learn (LEARN)"
        titleVariant="medium"
        variant="white"
      >
        <ReviewRubric
          scoringCriteria={REVIEW_D2L_SCORING_CRITERIA}
          scores={scores}
          currentStage={ReviewStage.D2L}
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
            id="d2l-score"
            value={scores[ReviewStage.D2L] || ""}
            min={1}
            max={4}
            placeholder={`Enter ${name}'s score`}
            ariaLabel="Drive to learn score"
            onChange={(v) => updateScore?.(ReviewStage.D2L, v)}
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
