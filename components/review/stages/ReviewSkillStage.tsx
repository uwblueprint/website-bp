import Button from "@components/common/Button";
import { useContext } from "react";
import { ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/ReviewContext";
import { ReviewScoreInput } from "../shared/ReviewScoreInput";
import { REVIEW_SKL_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewAnswers } from "./ReviewAnswers";
import { ReviewStageProps } from "./ReviewInfoStage";
import { ReviewRubric } from "./ReviewRubric";
import { ReviewPageLayout, PanelLayout } from "../layout";
import { ReportConflictButton } from "../shared/ReportConflictButton";
import { useTheme } from "@mui/material/styles";

const BACK_TO_HOME_HREF = "/admin";

const ResumeLink = ({ resumeLink }: { resumeLink: string }) => {
  return (
    <div className="flex flex-col gap-8">
      <Button
        className="mr-2 justify-self-end"
        size="sm"
        variant="secondary"
        href={resumeLink}
      >
        <div className="flex justify-center items-center gap-2">
          <img className="stroke-3" src={"common/resume.svg"} alt="" /> View
          Candidate Resume
        </div>
      </Button>
    </div>
  );
};

export const ReviewSkillStage = ({
  name,
  application,
  scores,
}: ReviewStageProps) => {
  const theme = useTheme();
  const updateScore = useContext(ReviewSetScoresContext);
  const resumeLink = application?.resumeUrl;

  const roleSpecificStr = application?.roleSpecificQuestions[0];
  const roleSpecificStrJSON = roleSpecificStr
    ? JSON.parse(roleSpecificStr)
    : [];
  const questionsData = roleSpecificStrJSON[0]?.questions || [];

  const questions = questionsData.map(
    (item: { question?: string; response?: string | string[] }) =>
      item.question || "",
  );
  const answers = questionsData.flatMap(
    (item: { question?: string; response?: string | string[] }) => {
      if (Array.isArray(item.response)) {
        return [item.response.join(", ")];
      } else {
        return item.response;
      }
    },
  );

  return (
    <ReviewPageLayout currentStage={ReviewStage.SKL} scores={scores}>
      <PanelLayout
        backToHomeHref={BACK_TO_HOME_HREF}
        headerRightAction={<ReportConflictButton name={name} showQuestion />}
        title="Skill"
        subtitle={`${name}'s Application`}
      >
        {resumeLink ? <ResumeLink resumeLink={resumeLink} /> : null}
        <ReviewAnswers questions={questions} answers={answers} />
      </PanelLayout>
      <PanelLayout
        borderLeft
        title="Scoring for Skill (SKILL)"
        titleVariant="medium"
        variant="white"
      >
        <ReviewRubric
          scoringCriteria={REVIEW_SKL_SCORING_CRITERIA}
          scores={scores}
          currentStage={ReviewStage.SKL}
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
            id="skl-score"
            value={scores[ReviewStage.SKL] || ""}
            min={1}
            max={5}
            placeholder={`Enter ${name}'s score`}
            ariaLabel="Skill score"
            onChange={(v) => updateScore?.(ReviewStage.SKL, v)}
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
