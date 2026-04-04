import Button from "@components/common/Button";
import { ResumeIcon } from "@components/icons/resume.icon";
import { ReactElement, useContext } from "react";
import { ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/ReviewContext";
import { getRoleSpecificQuestions } from "../shared/reviewUtils";
import { REVIEW_SKL_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewStageProps } from "./ReviewInfoStage";
import { ReviewScoredStageLayout } from "../layout";

const ResumeLink = ({ resumeLink }: { resumeLink: string }) => {
  return (
    <div className="flex w-full justify-start">
      <Button
        className="flex items-center gap-2 px-4 py-2 font-source text-base leading-[1.4]"
        size="sm"
        variant="secondary"
        href={resumeLink}
      >
        <ResumeIcon />
        View Candidate Resume
      </Button>
    </div>
  );
};

export const ReviewSkillStage = ({
  name,
  application,
  scores,
}: ReviewStageProps): ReactElement => {
  const updateScore = useContext(ReviewSetScoresContext);
  const resumeLink = application?.resumeUrl;
  const questionsData = getRoleSpecificQuestions(
    application?.roleSpecificQuestions[0],
  );

  const questions = questionsData.map((item) => item.question || "");
  const answers = questionsData.flatMap((item) => {
    if (Array.isArray(item.response)) {
      return [item.response.join(", ")];
    }

    return item.response ?? "";
  });

  return (
    <ReviewScoredStageLayout
      applicantName={name}
      beforeQuestions={
        resumeLink ? <ResumeLink resumeLink={resumeLink} /> : undefined
      }
      currentStage={ReviewStage.SKL}
      onScoreChange={(value) => updateScore?.(ReviewStage.SKL, value)}
      questions={questions}
      answers={answers}
      score={scores[ReviewStage.SKL]}
      scoreLabel="Scoring for Skill (SKILL)"
      scoringCriteria={REVIEW_SKL_SCORING_CRITERIA}
      scores={scores}
      title="Skill"
    />
  );
};
