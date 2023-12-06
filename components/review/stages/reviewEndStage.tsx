import { ReviewStage } from "pages/review";
import {
  ReviewSplitPanelPage,
} from "../shared/reviewSplitPanelPage";
import { useState } from "react";


interface Props {
  name: string;
  scores: Map<ReviewStage, number>;
}

export const ReviewEndStage: React.FC<Props> = ({ name, scores }) => {
  const [selectedOption, setSelectedOption] = useState<string>(''); // State to store the selected option
  const [comment, setComment] = useState<string>(''); // State to store the comment


  // Function to handle option change
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };


  return (
    <ReviewSplitPanelPage
      studentName={name}
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
      rightContent={
        <div>
          <h2 className="text-[26px]">Skills Category</h2>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="">Select</option>
            <option value="junior">Junior</option>
            <option value="intermediate">Intermediate</option>
            <option value="senior">Senior</option>
          </select>
        </div>
      }
      comment={
        <div>
          <h2 className="text-[26px]">Comments</h2>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Enter your comments here"
            style={{
              width: "100%",
              height: "100px",
              padding: "8px",
              fontSize: "16px",
            }}
          />
        </div>
      }
    ></ReviewSplitPanelPage>
  );
};
