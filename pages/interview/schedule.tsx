import { PanelLayout } from "@components/common/SplitPageLayout";
import {
  getInterviewLayout,
  InterviewHeader,
} from "@components/interview/layout";
import { NextPageWithLayout } from "../_app";

const InterviewSchedulePage: NextPageWithLayout = () => {
  return (
    <PanelLayout title="Schedule Interview" subtitle="Select a time slot">
      <p>Schedule interview content goes here.</p>
    </PanelLayout>
  );
};

// Schedule has no footer bar — submit action is inline in the page content.
InterviewSchedulePage.getLayout = getInterviewLayout(
  <InterviewHeader steps={[]} />,
  null,
);

export default InterviewSchedulePage;
