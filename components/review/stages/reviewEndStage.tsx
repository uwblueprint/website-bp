import { ReviewStage } from "pages/review";
import { ReviewSplitPanelPage } from "../shared/reviewSplitPanelPage";

export const ReviewEndStage: React.FC = () => {
  return (
    <ReviewSplitPanelPage
      studentName="M. Goose"
      currentStage={ReviewStage.END}
      leftTitle="Summary of scores"
    ></ReviewSplitPanelPage>
  );
};
