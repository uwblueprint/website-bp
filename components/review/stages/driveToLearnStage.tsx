import { ReviewStage } from "pages/review";
import { RatingPage } from "../shared/RatingPage";

export const DriveToLearnStage: React.FC = () => {
  return (
    <RatingPage
      studentName="M. Goose"
      title="Drive to learn"
      currentStage={ReviewStage.D2L}
    ></RatingPage>
  );
};
