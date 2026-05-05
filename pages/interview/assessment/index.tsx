import {
  ASSESSMENT_HEADER_STEPS,
  AssessmentHeaderStep,
  useInterviewProgress,
} from "@components/interview/shared";
import { PanelLayout } from "@components/common/SplitPageLayout";
import {
  getInterviewLayout,
  InterviewHeader,
  InterviewFooter,
} from "@components/interview/layout";
import Button from "@components/common/Button";
import { NextPageWithLayout } from "../../_app";

// Sub-step constants: drive the header bubble (via context) and footer button state.
const SCORES = AssessmentHeaderStep.SCORES;
const NOTES = AssessmentHeaderStep.NOTES;
const SUBMITTED = "SUBMITTED";

const AssessmentFooter = () => {
  const { currentSubStep, setCurrentSubStep } = useInterviewProgress();

  switch (currentSubStep) {
    case SUBMITTED:
      return null;
    case NOTES:
      return (
        <InterviewFooter
          onBack={() => setCurrentSubStep(SCORES)}
          backLabel="Previous Page"
          onContinue={() => setCurrentSubStep(SUBMITTED)}
          continueLabel="Submit & Finish"
        />
      );
    default:
      return (
        <InterviewFooter
          onBack={() => {}}
          onContinue={() => setCurrentSubStep(NOTES)}
          continueLabel="Submit & Continue"
        />
      );
  }
};

// TODO: replace with final designed submitted UI
const AssessmentSubmitted = () => {
  const { setCurrentSubStep } = useInterviewProgress();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <p>Assessment Submitted!</p>
      <Button size="sm" onClick={() => setCurrentSubStep(SCORES)}>
        Edit Assessment
      </Button>
    </div>
  );
};

const InterviewAssessmentPage: NextPageWithLayout = () => {
  const { currentSubStep, setCurrentSubStep } = useInterviewProgress();
  if (currentSubStep === null) setCurrentSubStep(SCORES);
  switch (currentSubStep) {
    case SUBMITTED:
      return <AssessmentSubmitted />;
    case NOTES:
      return (
        <PanelLayout
          title="Interview Assessment"
          subtitle="Score the candidate"
        >
          <p>Assessment Notes content goes here.</p>
        </PanelLayout>
      );
    default:
      return (
        <PanelLayout
          title="Interview Assessment"
          subtitle="Score the candidate"
        >
          <p>Application Scores content goes here.</p>
        </PanelLayout>
      );
  }
};

InterviewAssessmentPage.getLayout = getInterviewLayout(
  <InterviewHeader steps={ASSESSMENT_HEADER_STEPS} />,
  <AssessmentFooter />,
);

export default InterviewAssessmentPage;
