import { ReviewStage } from "pages/review";
import { ReviewsRatingPage } from "../shared/reviewsRatingPage";

export const ReviewsSkillStage: React.FC = () => {
  return (
    <ReviewsRatingPage
      studentName="M. Goose"
      title="Skill"
      currentStage={ReviewStage.SKL}
    ></ReviewsRatingPage>
  );
};
