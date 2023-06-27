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
      scores={scores}
    ></ReviewSplitPanelPage>
  );
};
