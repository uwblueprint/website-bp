import { ReactElement } from "react";
import ProtectedRoute from "@components/context/ProtectedRoute";
import RecruitmentPlatformThemeProvider from "@components/recruitmentPlatformCommon/RecruitmentPlatformThemeProvider";
import { InterviewLayout } from "./InterviewLayout";

export const getInterviewLayout = (page: ReactElement) => (
  <RecruitmentPlatformThemeProvider>
    <ProtectedRoute allowedRoles={["Admin", "User"]}>
      {/* TODO: replace hardcoded candidateName with real data once API wiring is in scope */}
      <InterviewLayout candidateName="Percy Jackson">{page}</InterviewLayout>
    </ProtectedRoute>
  </RecruitmentPlatformThemeProvider>
);
