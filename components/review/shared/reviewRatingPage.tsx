import Button from "@components/common/Button";
import { ReviewStage } from "./constants";
import { ReviewSplitPanelPage } from "./reviewSplitPanelPage";
import { ReviewScores } from "./types";

interface Props {
  studentName: string;
  currentStage: ReviewStage;
  currentStageRubric: JSX.Element;
  currentStageAnswers: JSX.Element;
  title: string;
  resumeLink?: string;
  scores: ReviewScores;
  contextConsumer: JSX.Element;
}

interface resumeProps {
  resumeLink: string;
}

const ResumeLink = ({ resumeLink }: resumeProps) => {
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

export const ReviewRatingPage = ({
  studentName,
  currentStage,
  currentStageRubric,
  currentStageAnswers,
  title,
  resumeLink,
  scores,
  contextConsumer,
}: Props) => {
  return (
    <ReviewSplitPanelPage
      studentName={studentName}
      currentStage={currentStage}
      leftTitle="Rubric"
      leftContent={currentStageRubric}
      rightTitle={title}
      rightContent={
        <div
          className="flex flex-col gap-8"
          style={{ alignItems: "flex-start" }}
        >
          {resumeLink ? <ResumeLink resumeLink={resumeLink as string} /> : null}
          <div>{currentStageAnswers}</div>
          <div>{contextConsumer}</div>
        </div>
      }
      scores={scores}
    />
  );
};
