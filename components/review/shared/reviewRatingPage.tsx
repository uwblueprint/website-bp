import { ReviewStage } from "pages/review";
import { ReviewSplitPanelPage } from "./reviewSplitPanelPage";

interface Props {
  studentName: string;
  currentStage: ReviewStage;
  title: string;
}

export const ReviewRatingPage: React.FC<Props> = ({
  studentName,
  currentStage,
  title,
}) => {
  return (
    <ReviewSplitPanelPage
      studentName={studentName}
      currentStage={currentStage}
      leftTitle="Rubric"
      rightTitle={title}
    />
  );
};
