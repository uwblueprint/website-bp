import { ReviewStage } from "pages/review";
import { SplitPanelPage } from "./SplitPanelPage";

interface Props {
  studentName: string;
  currentStage: ReviewStage;
  title: string;
}

export const RatingPage: React.FC<Props> = ({
  studentName,
  currentStage,
  title,
}) => {
  return (
    <SplitPanelPage
      studentName={studentName}
      currentStage={currentStage}
      leftTitle="Rubric"
      rightTitle={title}
    />
  );
};
