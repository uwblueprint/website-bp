import { ReviewStage } from "pages/review";
import { ReviewsSplitPanelPage } from "../shared/reviewsSplitPanelPage";

export const ReviewsInfoStage: React.FC = () => {
  return (
    <ReviewsSplitPanelPage
      studentName="M. Goose"
      rightTitle="Basic Information"
      currentStage={ReviewStage.INFO}
    ></ReviewsSplitPanelPage>
  );
};
