import { ReviewStage } from "pages/review";
import { ReviewsSplitPanelPage } from "../shared/reviewsSplitPanelPage";

export const ReviewsEndStage: React.FC = () => {
  return (
    <ReviewsSplitPanelPage
      studentName="M. Goose"
      currentStage={ReviewStage.END}
      leftTitle="Summary of scores"
    ></ReviewsSplitPanelPage>
  );
};
