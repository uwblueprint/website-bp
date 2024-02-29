import { ReviewStage } from "pages/review";
import { ReviewSplitPanelPage } from "../shared/reviewSplitPanelPage";
import { useState } from "react";

interface Props {
  name: string;
  application: ApplicationDTO | undefined;
  scores: Map<ReviewStage, number>;
}

// TODO:
// - make skills category required
// - finish displaying the UI for second choice
// - bundle the data together & send them to the backend db (need to create a new graphql query for such action)

export const ReviewEndStage: React.FC<Props> = ({ name, application, scores }) => {
  const totalScore = scores?.get(ReviewStage.PFSG) + scores?.get(ReviewStage.TP) + scores?.get(ReviewStage.D2L) + scores?.get(ReviewStage.SKL);

  const [selectedOption, setSelectedOption] = useState<string>(''); // State to store the selected option
  const [comment, setComment] = useState<string>(''); // State to store the comment
  const [secondChoice, setSecondChoice] = useState(false); // State to store the second choice

  // Function to handle option change
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  const handleChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecondChoice(!event.target.value);
  };

  return (
    <ReviewSplitPanelPage
      studentName={name}
      currentStage={ReviewStage.END}
      leftTitle={"Summary of scores"}
      leftContent={
        <div className="flow-root pl-5 pr-5">
          <div className="flow-root pt-20 pb-5">
            <h4 className="text-blue float-left B10">Topic</h4>
            <h4 className="text-blue float-right B10">Rating</h4>
          </div>
          <div className="flex flex-col space-y-4">
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
          <hr className="h-px my-8 bg-gray-200 border-1"></hr>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Total</h4>
              <h4 style={{ textAlign: "right" }}>
                {totalScore}/5
              </h4>
            </div>
        </div>
      }
      scores={scores}
      rightContent={
        <div className="flex flex-col space-y-4 pl-5 pr-5">
          <div>
            <form>
              <h3 className="text-[26px] pt-8">Skills Category</h3>
              <select value={selectedOption} onChange={handleOptionChange} required>
                <option value="">Skills Category</option>
                <option value="junior">Junior</option>
                <option value="intermediate">Intermediate</option>
                <option value="senior">Senior</option>
              </select>
              <h5 className="text-red-500 inline-block px-2 text-xl">*</h5>
            </form>
          </div>
          <div>
            <h3 className="text-[26px]">Comments</h3>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Leave comments here"
              style={{
                width: "100%",
                height: "100px",
                padding: "8px",
                fontSize: "16px",
              }}
            />
          </div>
          <div> 
            <h3 className="text-[26px]"><span className="text-blue">Second Choice: </span>{application?.secondChoiceRole}</h3>
            <input className="B10" type="checkbox" id="secondChoice" name="secondChoice" value="secondChoice" onChange={handleChoiceChange}></input>
            <label for="secondChoice">    Recommend for Second Choice</label>
          </div>
        </div>
      }
    ></ReviewSplitPanelPage>
  );
};
