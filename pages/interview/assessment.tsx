import { ASSESSMENT_HEADER_STEPS } from "@components/interview/shared";
import { PanelLayout } from "@components/common/SplitPageLayout";
import {
  getInterviewLayout,
  InterviewHeader,
} from "@components/interview/layout";
import { NextPageWithLayout } from "../_app";

const InterviewAssessmentPage: NextPageWithLayout = () => {
  return (
    <PanelLayout title="Interview Assessment" subtitle="Score the candidate">
      <p>Interview assessment content goes here.</p>
    </PanelLayout>
  );
};

InterviewAssessmentPage.getLayout = getInterviewLayout(
  <InterviewHeader steps={ASSESSMENT_HEADER_STEPS} currentStep="SCORES" />,
);

export default InterviewAssessmentPage;
