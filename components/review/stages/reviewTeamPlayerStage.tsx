import { ReviewStage } from "pages/review";
import { ReviewRatingPage } from "../shared/reviewRatingPage";

export const ReviewTeamPlayerStage: React.FC = () => {
  return (
    <ReviewRatingPage
      studentName="M. Goose"
      title="Team player"
      currentStage={ReviewStage.TP}
    ></ReviewRatingPage>
  );
};
