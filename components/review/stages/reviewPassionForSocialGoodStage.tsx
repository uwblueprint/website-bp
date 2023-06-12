import { ReviewStage } from "pages/review";
import { ReviewRatingPage } from "../shared/reviewRatingPage";

export const ReviewPassionForSocialGoodStage: React.FC = () => {
  return (
    <ReviewRatingPage
      studentName="M. Goose"
      title="Passion for social good"
      currentStage={ReviewStage.PFSG}
    ></ReviewRatingPage>
  );
};
