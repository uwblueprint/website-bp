import { ReviewStage } from "pages/review";
import { ReviewSplitPanelPage } from "../shared/reviewSplitPanelPage";

interface Props {
  scores?: Map<ReviewStage, number>;
};


export const ReviewEndStage: React.FC<Props> = ({
  scores,
}) => {
  return (
    <ReviewSplitPanelPage
      studentName="M. Goose"
      currentStage={ReviewStage.END}
      leftTitle="Summary of scores"
      leftContent={
        <div>
          <div>Passion for Social Good: {scores?.get(ReviewStage.PFSG)}</div>
          <div>Team Player: {scores?.get(ReviewStage.TP)}</div>
          <div>Desire to Learn: {scores?.get(ReviewStage.D2L)}</div>
          <div>Skill: {scores?.get(ReviewStage.SKL)}</div>
        </div>
      }
      scores={scores}
    ></ReviewSplitPanelPage>
  );
};
