import { ReviewStage } from "pages/review";
import { RatingPage } from "../shared/RatingPage";

export const TeamPlayerStage: React.FC = () => {
  return (
    <RatingPage
      studentName="M. Goose"
      title="Team player"
      currentStage={ReviewStage.TP}
    ></RatingPage>
  );
};
