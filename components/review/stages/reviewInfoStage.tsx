import { ReviewStage } from "pages/review";
import { ReviewSplitPanelPage } from "../shared/reviewSplitPanelPage";

export const ReviewInfoStage: React.FC = () => {
  return (
    <ReviewSplitPanelPage
      studentName="M. Goose"
      rightTitle="Basic Information"
      currentStage={ReviewStage.INFO}
    ></ReviewSplitPanelPage>
  );
};
