import { ReactNode } from "react";
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
      <div className="flex flex-col h-screen">
        {header}
        <div className="flex flex-1 overflow-hidden border border-[#C4C4C4]">
          <aside className="w-[480px] shrink-0 border-r border-[#C4C4C4] bg-white overflow-y-auto">
            <InterviewNav candidateName={candidateName} />
          </aside>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
        {footer}
      </div>
    </InterviewProgressProvider>
  );
};
