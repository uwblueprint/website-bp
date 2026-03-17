import ProtectedRoute from "@components/context/ProtectedRoute";
import RecruitmentPlatformThemeProvider from "@components/recruitmentPlatformCommon/RecruitmentPlatformThemeProvider";
import { InterviewLayout } from "@components/interview/layout";
import { PanelLayout } from "@components/common/SplitPageLayout";

const InterviewAssessmentPage = () => {
  return (
    <RecruitmentPlatformThemeProvider>
      <ProtectedRoute allowedRoles={["Admin", "User"]}>
        <InterviewLayout candidateName="Percy Jackson">
          <PanelLayout title="Interview Assessment" subtitle="Score the candidate">
            <p>Interview assessment content goes here.</p>
          </PanelLayout>
        </InterviewLayout>
      </ProtectedRoute>
    </RecruitmentPlatformThemeProvider>
  );
};

export default InterviewAssessmentPage;
