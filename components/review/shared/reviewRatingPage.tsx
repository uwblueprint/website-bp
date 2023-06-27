import { ReviewStage } from "pages/review";
import { ReviewSplitPanelPage } from "./reviewSplitPanelPage";
import { ReviewRubric } from "../stages/reviewRubric";
import Button from "@components/common/Button";


interface Props {
  studentName: string;
  currentStage: ReviewStage;
  currentStageRubric: JSX.Element;
  currentStageAnswers: JSX.Element;
  title: string;
  resumeLink?: string;
  scores: Map<ReviewStage, number>;
}

interface resumeProps {
  resumeLink: string;
}

const ResumeLink: React.FC<resumeProps> = ({
  resumeLink
}) => {
  return (
    <div className="flex flex-col gap-8">
      {/* <a href={resumeLink} target="_blank" rel="noopener noreferrer">
        See candidate resume
      </a> */}
      <Button 
        className="mr-2 justify-self-end" 
        size="sm"
        variant="secondary"
        onClick={() => window.open(resumeLink, '_blank')?.focus()}
      >
        <div className="flex justify-center items-center gap-2">
          <img className="stroke-3" src={"common/resume.svg"}/> View Candidate Resume
        </div>
      </Button>
    </div>
  )
};

export const ReviewRatingPage: React.FC<Props> = ({
  studentName,
  currentStage,
  currentStageRubric,
  currentStageAnswers,
  title,
  resumeLink,
  scores,
}) => {
  return (
    <ReviewSplitPanelPage
      studentName={studentName}
      currentStage={currentStage}
      leftTitle="Rubric"
      leftContent={currentStageRubric}
      rightTitle={title}
      rightContent={
        <div className="flex flex-col gap-8" style={{alignItems: "flex-start"}}>
            {resumeLink ? <ResumeLink resumeLink={resumeLink as string}/> : null}
          <div>
            {currentStageAnswers}
          </div>
        </div>}
      scores={scores}
    />
  );
};
