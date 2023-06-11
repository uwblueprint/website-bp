import { ReviewStage } from "pages/review";
import { ReviewsSplitPanelPage } from "./reviewsSplitPanelPage";

interface Props {
  studentName: string;
  currentStage: ReviewStage;
  title: string;
}

export const ReviewsRatingPage: React.FC<Props> = ({
  studentName,
  currentStage,
  title,
}) => {
  return (
    <ReviewsSplitPanelPage
      studentName={studentName}
      currentStage={currentStage}
      leftTitle="Rubric"
      rightTitle={title}
    />
  );
};
