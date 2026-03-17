import { ASSESSMENT_HEADER_STEPS } from "@components/interview/shared";
import { useInterviewProgress } from "@components/interview/shared";
import { PanelLayout } from "@components/common/SplitPageLayout";
import {
  getInterviewLayout,
  InterviewHeader,
  InterviewFooter,
} from "@components/interview/layout";
import { NextPageWithLayout } from "../_app";

// ─── Sub-step constants ────────────────────────────────────────────────────────
// Define the sub-steps for this page as plain string constants.
// These drive the header bubble (via context) and footer button state.
const SCORES = "SCORES";
const NOTES = "NOTES";

// ─── Footer ───────────────────────────────────────────────────────────────────
// AssessmentFooter reads currentSubStep from context so it can update its buttons
// dynamically without the layout needing to re-render. This is the pattern future
// devs should follow for any page with sub-step navigation.
const AssessmentFooter = () => {
  const { currentSubStep, setCurrentSubStep } = useInterviewProgress();

  if (currentSubStep === NOTES) {
    return (
      <InterviewFooter
        onBack={() => setCurrentSubStep(SCORES)}
        backLabel="Previous Page"
        // TODO: wire final submit action
        onContinue={() => {}}
        continueLabel="Submit & Finish"
      />
    );
  }

  // Default: SCORES step (or null on first render before useEffect sets initial sub-step)
  return (
    <InterviewFooter
      onBack={() => {}}
      onContinue={() => setCurrentSubStep(NOTES)}
      continueLabel="Submit & Continue"
    />
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const InterviewAssessmentPage: NextPageWithLayout = () => {
  const { currentSubStep, setCurrentSubStep } = useInterviewProgress();

  // Set the initial sub-step on mount so the header bubble is correct.
  // Each page is responsible for initialising its own sub-step.
  if (currentSubStep === null) {
    setCurrentSubStep(SCORES);
  }

  return (
    <PanelLayout title="Interview Assessment" subtitle="Score the candidate">
      {currentSubStep === NOTES ? (
        <p>Assessment Notes content goes here.</p>
      ) : (
        <p>Application Scores content goes here.</p>
      )}
    </PanelLayout>
  );
};

InterviewAssessmentPage.getLayout = getInterviewLayout(
  <InterviewHeader steps={ASSESSMENT_HEADER_STEPS} />,
  <AssessmentFooter />,
);

export default InterviewAssessmentPage;
