import { ReviewStage } from "pages/review";
import { ReviewsRatingPage } from "../shared/reviewsRatingPage";

export const ReviewsTeamPlayerStage: React.FC = () => {
  return (
    <ReviewsRatingPage
      studentName="M. Goose"
      title="Team player"
      currentStage={ReviewStage.TP}
    ></ReviewsRatingPage>
  );
};
