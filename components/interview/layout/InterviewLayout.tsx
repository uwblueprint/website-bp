import { ReactNode } from "react";
import { SplitPanelLayout, PanelLayout } from "@components/common/SplitPageLayout";
import { InterviewNav } from "../nav";
import { InterviewProgressProvider } from "../shared";

interface InterviewLayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  candidateName?: string;
  children: ReactNode;
}

export const InterviewLayout = ({
  header,
  footer,
  candidateName = "Candidate",
  children,
}: InterviewLayoutProps) => {
  return (
    <InterviewProgressProvider>
      {/* TODO: Confirm split ratio with PL — Figma shows ~698:740, using "equal" for now */}
      <SplitPanelLayout header={header} footer={footer} split="equal">
        <PanelLayout borderRight>
          <InterviewNav candidateName={candidateName} />
        </PanelLayout>
        {children}
      </SplitPanelLayout>
    </InterviewProgressProvider>
  );
};
