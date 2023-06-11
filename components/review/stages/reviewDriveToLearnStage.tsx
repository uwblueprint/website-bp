import { ReviewStage } from "pages/review";
import { ReviewRatingPage } from "../shared/reviewRatingPage";

export const ReviewDriveToLearnStage: React.FC = () => {
  return (
    <ReviewRatingPage
      studentName="M. Goose"
      title="Drive to learn"
      currentStage={ReviewStage.D2L}
    ></ReviewRatingPage>
  );
};
