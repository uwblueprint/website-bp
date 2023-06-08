import { ReviewStage } from "pages/review";
import { RatingPage } from "../shared/RatingPage";

export const PassionForSocialGoodStage: React.FC = () => {
  return (
    <RatingPage
      studentName="M. Goose"
      title="Passion for social good"
      currentStage={ReviewStage.PFSG}
    ></RatingPage>
  );
};
