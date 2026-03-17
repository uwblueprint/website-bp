import { useInterviewProgress } from "@components/interview/shared";
import { PanelLayout } from "@components/common/SplitPageLayout";
import { getInterviewLayout } from "@components/interview/layout";
import { NextPageWithLayout } from "../_app";

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

InterviewProfilePage.getLayout = getInterviewLayout;

export default InterviewProfilePage;
