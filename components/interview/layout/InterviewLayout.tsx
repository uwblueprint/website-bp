import { ReactNode } from "react";
import {
  SplitPanelLayout,
  PanelLayout,
} from "@components/common/SplitPageLayout";
import { InterviewNav } from "../nav";
import { InterviewProgressProvider } from "../shared";
import { InterviewHeader } from "./InterviewHeader";
import { InterviewFooter } from "./InterviewFooter";

interface InterviewLayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  candidateName?: string;
  children: ReactNode;
}

// NOTE: Follows the same structure as ReviewPageLayout (review/layout/ReviewPageLayout.tsx) —
// wrapping SplitPanelLayout with header + footer slots — but adds the persistent left nav panel
// and defaults to interview-specific header/footer. Duplicated to keep the two flows decoupled.
export const InterviewLayout = ({
  header = <InterviewHeader />,
  footer = <InterviewFooter />,
  candidateName = "Candidate",
  children,
}: InterviewLayoutProps) => {
  return (
    <InterviewProgressProvider>
      <SplitPanelLayout header={header} footer={footer}>
        <PanelLayout borderRight>
          <InterviewNav candidateName={candidateName} />
        </PanelLayout>
        {children}
      </SplitPanelLayout>
    </InterviewProgressProvider>
  );
};
