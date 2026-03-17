import { ReactElement } from "react";
import ProtectedRoute from "@components/context/ProtectedRoute";
import RecruitmentPlatformThemeProvider from "@components/recruitmentPlatformCommon/RecruitmentPlatformThemeProvider";
import { InterviewLayout } from "./InterviewLayout";
import { InterviewHeader } from "./InterviewHeader";
import { InterviewFooter } from "./InterviewFooter";

export const getInterviewLayout =
  (
    header: ReactElement = <InterviewHeader steps={[]} />,
    footer: ReactElement | null = <InterviewFooter />,
  ) =>
  (page: ReactElement) =>
    (
      <RecruitmentPlatformThemeProvider>
        <ProtectedRoute allowedRoles={["Admin", "User"]}>
          {/* TODO: replace hardcoded candidateName with real data once API wiring is in scope */}
          <InterviewLayout
            candidateName="Percy Jackson"
            header={header}
            footer={footer ?? undefined}
          >
            {page}
          </InterviewLayout>
        </ProtectedRoute>
      </RecruitmentPlatformThemeProvider>
    );
