import { ReactNode } from "react";
import {
  SPLIT_PANEL_WIDTHS,
  SplitPanelLayout,
  PanelLayout,
} from "@components/common/SplitPageLayout";
import { InterviewNavPanel } from "../nav";
import { InterviewProgressProvider } from "../shared";
import { InterviewHeader } from "./InterviewHeader";
import { InterviewFooter } from "./InterviewFooter";

interface InterviewLayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  candidateName?: string;
  children: ReactNode;
}

export const InterviewLayout = ({
  header = <InterviewHeader />,
  footer = <InterviewFooter />,
  candidateName = "Candidate",
  children,
}: InterviewLayoutProps) => {
  return (
    <InterviewProgressProvider>
      <SplitPanelLayout
        header={header}
        footer={footer}
        leftWidth={SPLIT_PANEL_WIDTHS.interview.left}
      >
        <PanelLayout
          borderRight
          contentClassName="overflow-y-auto pt-[50px] pb-8"
        >
          <InterviewNavPanel candidateName={candidateName} />
        </PanelLayout>
        {children}
      </SplitPanelLayout>
    </InterviewProgressProvider>
  );
};
