import ProtectedRoute from "@components/context/ProtectedRoute";
import RecruitmentPlatformThemeProvider from "@components/recruitmentPlatformCommon/RecruitmentPlatformThemeProvider";
import { InterviewLayout } from "@components/interview/layout";
import { useInterviewProgress } from "@components/interview/shared";
import { PanelLayout } from "@components/common/SplitPageLayout";

const InterviewProfileContent = () => {
  const { currentStep, stepStatuses } = useInterviewProgress();

  return (
    <PanelLayout title="Applicant Profile" subtitle="Percy Jackson's Application">
      <p>
        Current step: {currentStep}, Status: {stepStatuses[currentStep]}
      </p>
    </PanelLayout>
  );
};

const InterviewProfilePage = () => {
  return (
    <RecruitmentPlatformThemeProvider>
      <ProtectedRoute allowedRoles={["Admin", "User"]}>
        <InterviewLayout candidateName="Percy Jackson">
          <InterviewProfileContent />
        </InterviewLayout>
      </ProtectedRoute>
    </RecruitmentPlatformThemeProvider>
  );
};

export default InterviewProfilePage;
