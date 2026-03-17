import { PanelLayout } from "@components/common/SplitPageLayout";
import { getInterviewLayout } from "@components/interview/layout";
import { NextPageWithLayout } from "../_app";

const InterviewReportPage: NextPageWithLayout = () => {
  return (
    <PanelLayout title="Report Issues" subtitle="Flag any concerns">
      <p>Report issues content goes here.</p>
    </PanelLayout>
  );
};

InterviewReportPage.getLayout = getInterviewLayout;

export default InterviewReportPage;
