import { ReviewStage } from "pages/review";
import { RatingPage } from "../shared/RatingPage";

export const SkillStage: React.FC = () => {
  return (
    <RatingPage
      studentName="M. Goose"
      title="Skill"
      currentStage={ReviewStage.SKL}
    ></RatingPage>
  );
};
