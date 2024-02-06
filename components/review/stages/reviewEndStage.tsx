import { ReviewStage } from "pages/review";
import { ReviewSplitPanelPage } from "../shared/reviewSplitPanelPage";

interface Props {
  scores: Map<ReviewStage, number>;
}

export const ReviewEndStage: React.FC<Props> = ({ scores }) => {
  const totalScore = scores?.get(ReviewStage.PFSG) + scores?.get(ReviewStage.TP) + scores?.get(ReviewStage.D2L) + scores?.get(ReviewStage.SKL);
  return (
    <ReviewSplitPanelPage
      studentName="M. Goose"
      currentStage={ReviewStage.END}
      leftTitle={"Summary of scores"}
      leftContent={
        <div class="flex flex-col space-y-7">
          <div>Topic</div>
          <div>Rating</div>
          <div>Passion for Social Good: {scores?.get(ReviewStage.PFSG)}</div>
          <div>Team Player: {scores?.get(ReviewStage.TP)}</div>
          <div>Desire to Learn: {scores?.get(ReviewStage.D2L)}</div>
          <div>Skill: {scores?.get(ReviewStage.SKL)}</div>
          <hr class="border-b border-blue-600 dark:bg-gray-700" />
          <div>Total</div>
          <div>{totalScore}</div>
        </div>
      }
      scores={scores}
    ></ReviewSplitPanelPage>
  );
};
