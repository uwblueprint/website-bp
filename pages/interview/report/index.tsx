import { PanelLayout } from "@components/common/SplitPageLayout";
import {
  getInterviewLayout,
  InterviewHeader,
} from "@components/interview/layout";
import { NextPageWithLayout } from "../../_app";

const InterviewReportPage: NextPageWithLayout = () => {
  return (
    <PanelLayout title="Report Issues" subtitle="Flag any concerns">
      <p>Report issues content goes here.</p>
    </PanelLayout>
  );
};

// TODO: add the submit footer once the report action is wired up.
InterviewReportPage.getLayout = getInterviewLayout(
  <InterviewHeader steps={[]} />,
  null,
);

export default InterviewReportPage;
