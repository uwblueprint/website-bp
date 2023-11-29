import { ReviewStage } from "pages/review";
import { ReviewSplitPanelPage } from "../shared/reviewSplitPanelPage";

interface Props {
  scores: Map<ReviewStage, number>;
}

export const ReviewEndStage: React.FC<Props> = ({ scores }) => {
  return (
    <ReviewSplitPanelPage
      studentName="M. Goose"
      currentStage={ReviewStage.END}
      leftTitle="Summary of scores"
      leftContent={
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Passion for Social Good</span>
            <span style={{ textAlign: "right" }}>
              {scores?.get(ReviewStage.PFSG)}/5
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Team Player</span>
            <span style={{ textAlign: "right" }}>
              {scores?.get(ReviewStage.TP)}/5
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Desire to Learn</span>
            <span style={{ textAlign: "right" }}>
              {scores?.get(ReviewStage.D2L)}/5
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Skill</span>
            <span style={{ textAlign: "right" }}>
              {scores?.get(ReviewStage.SKL)}/5
            </span>
          </div>
        </div>
      }
      tallyLeftTitle="TOPIC"
      tallyRightTitle="RATING"
      scores={scores}
      totalTally={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          <span>Total</span>
          <span style={{ textAlign: "right", fontWeight: "bold" }}>
            {scores?.get(ReviewStage.PFSG) +
              scores?.get(ReviewStage.TP) +
              scores?.get(ReviewStage.D2L) +
              scores?.get(ReviewStage.SKL)}
            /5
          </span>
        </div>
      }
    ></ReviewSplitPanelPage>
  );
};
