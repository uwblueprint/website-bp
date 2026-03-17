import { PanelLayout } from "@components/common/SplitPageLayout";
import { getInterviewLayout } from "@components/interview/layout";
import { NextPageWithLayout } from "../_app";

const InterviewAssessmentPage: NextPageWithLayout = () => {
  return (
    <PanelLayout title="Interview Assessment" subtitle="Score the candidate">
      <p>Interview assessment content goes here.</p>
    </PanelLayout>
  );
};

InterviewAssessmentPage.getLayout = getInterviewLayout;

export default InterviewAssessmentPage;
