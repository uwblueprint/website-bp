import { PanelLayout } from "@components/common/SplitPageLayout";
import { getInterviewLayout } from "@components/interview/layout";
import { NextPageWithLayout } from "../_app";

const InterviewSchedulePage: NextPageWithLayout = () => {
  return (
    <PanelLayout title="Schedule Interview" subtitle="Select a time slot">
      <p>Schedule interview content goes here.</p>
    </PanelLayout>
  );
};

InterviewSchedulePage.getLayout = getInterviewLayout();

export default InterviewSchedulePage;
