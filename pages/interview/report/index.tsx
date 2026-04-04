import { PanelLayout } from "@components/common/SplitPageLayout";
import {
  getInterviewLayout,
  InterviewHeader,
  InterviewFooter,
} from "@components/interview/layout";
import { NextPageWithLayout } from "../../_app";

const InterviewReportPage: NextPageWithLayout = () => {
  return (
    <PanelLayout title="Report Issues" subtitle="Flag any concerns">
      <p>Report issues content goes here.</p>
    </PanelLayout>
  );
};

// TODO: onContinue will trigger the submit issue action once wired up.
// After submission the footer disappears (see Figma — submitted state has no footer).
InterviewReportPage.getLayout = getInterviewLayout(
  <InterviewHeader steps={[]} />,
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- placeholder until submit is wired
  <InterviewFooter onContinue={() => {}} continueLabel="Submit Issue" />,
);

export default InterviewReportPage;
