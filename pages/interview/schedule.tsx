import ProtectedRoute from "@components/context/ProtectedRoute";
import RecruitmentPlatformThemeProvider from "@components/recruitmentPlatformCommon/RecruitmentPlatformThemeProvider";
import { InterviewLayout } from "@components/interview/layout";
import { PanelLayout } from "@components/common/SplitPageLayout";

const InterviewSchedulePage = () => {
  return (
    <RecruitmentPlatformThemeProvider>
      <ProtectedRoute allowedRoles={["Admin", "User"]}>
        <InterviewLayout candidateName="Percy Jackson">
          <PanelLayout title="Schedule Interview" subtitle="Select a time slot">
            <p>Schedule interview content goes here.</p>
          </PanelLayout>
        </InterviewLayout>
      </ProtectedRoute>
    </RecruitmentPlatformThemeProvider>
  );
};

export default InterviewSchedulePage;
