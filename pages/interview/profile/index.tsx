import { useInterviewProgress } from "@components/interview/shared";
import {
  PROFILE_HEADER_STEPS,
  InterviewHeaderStep,
} from "@components/interview/shared";
import { PanelLayout } from "@components/common/SplitPageLayout";
import {
  getInterviewLayout,
  InterviewHeader,
} from "@components/interview/layout";
import { NextPageWithLayout } from "../../_app";

const InterviewProfilePage: NextPageWithLayout = () => {
  const { currentStep, stepStatuses } = useInterviewProgress();

  return (
    <PanelLayout
      title="Applicant Profile"
      subtitle="Percy Jackson's Application"
    >
      <p>
        Current step: {currentStep}, Status: {stepStatuses[currentStep]}
      </p>
    </PanelLayout>
  );
};

// TODO: add the footer back once the profile step actions are wired up.
InterviewProfilePage.getLayout = getInterviewLayout(
  <InterviewHeader
    steps={PROFILE_HEADER_STEPS}
    currentStep={InterviewHeaderStep.INFO}
  />,
  null,
);

export default InterviewProfilePage;
