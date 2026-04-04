import { ReactNode } from "react";
import {
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
        leftWidth={698}
        rightWidth={742}
      >
        <PanelLayout
          borderRight
          contentClassName="flex-1 px-9 pt-[50px] pb-8 overflow-y-auto"
        >
          <InterviewNavPanel candidateName={candidateName} />
        </PanelLayout>
        {children}
      </SplitPanelLayout>
    </InterviewProgressProvider>
  );
};
