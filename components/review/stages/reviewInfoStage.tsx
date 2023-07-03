import { ReviewStage } from "pages/review";
import { ReviewSplitPanelPage } from "../shared/reviewSplitPanelPage";

interface Props {
  scores: Map<ReviewStage, number>;
}

export const ReviewInfoStage: React.FC<Props> = ({ scores }) => {
  return (
    <ReviewSplitPanelPage
      studentName="M. Goose"
      rightTitle="Basic Information"
      currentStage={ReviewStage.INFO}
      scores={scores}
    ></ReviewSplitPanelPage>
  );
};
