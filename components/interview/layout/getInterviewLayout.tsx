import { ReactElement } from "react";
import ProtectedRoute from "@components/context/ProtectedRoute";
import RecruitmentPlatformThemeProvider from "@components/recruitmentPlatformCommon/RecruitmentPlatformThemeProvider";
import { InterviewLayout } from "./InterviewLayout";

export const getInterviewLayout = (page: ReactElement) => (
  <RecruitmentPlatformThemeProvider>
    <ProtectedRoute allowedRoles={["Admin", "User"]}>
      <InterviewLayout candidateName="Percy Jackson">{page}</InterviewLayout>
    </ProtectedRoute>
  </RecruitmentPlatformThemeProvider>
);
