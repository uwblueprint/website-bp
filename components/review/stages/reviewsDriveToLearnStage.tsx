import { ReviewStage } from "pages/review";
import { ReviewsRatingPage } from "../shared/reviewsRatingPage";

export const ReviewsDriveToLearnStage: React.FC = () => {
  return (
    <ReviewsRatingPage
      studentName="M. Goose"
      title="Drive to learn"
      currentStage={ReviewStage.D2L}
    ></ReviewsRatingPage>
  );
};
