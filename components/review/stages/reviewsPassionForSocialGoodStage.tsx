import { ReviewStage } from "pages/review";
import { ReviewsRatingPage } from "../shared/reviewsRatingPage";

export const ReviewsPassionForSocialGoodStage: React.FC = () => {
  return (
    <ReviewsRatingPage
      studentName="M. Goose"
      title="Passion for social good"
      currentStage={ReviewStage.PFSG}
    ></ReviewsRatingPage>
  );
};
