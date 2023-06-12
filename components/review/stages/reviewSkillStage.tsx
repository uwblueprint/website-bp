import { ReviewStage } from "pages/review";
import { ReviewRatingPage } from "../shared/reviewRatingPage";

export const ReviewSkillStage: React.FC = () => {
  return (
    <ReviewRatingPage
      studentName="M. Goose"
      title="Skill"
      currentStage={ReviewStage.SKL}
    ></ReviewRatingPage>
  );
};
