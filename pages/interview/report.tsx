import ProtectedRoute from "@components/context/ProtectedRoute";
import RecruitmentPlatformThemeProvider from "@components/recruitmentPlatformCommon/RecruitmentPlatformThemeProvider";
import { InterviewLayout } from "@components/interview/layout";
import { PanelLayout } from "@components/common/SplitPageLayout";

const InterviewReportPage = () => {
  return (
    <RecruitmentPlatformThemeProvider>
      <ProtectedRoute allowedRoles={["Admin", "User"]}>
        <InterviewLayout candidateName="Percy Jackson">
          <PanelLayout title="Report Issues" subtitle="Flag any concerns">
            <p>Report issues content goes here.</p>
          </PanelLayout>
        </InterviewLayout>
      </ProtectedRoute>
    </RecruitmentPlatformThemeProvider>
  );
};

export default InterviewReportPage;
