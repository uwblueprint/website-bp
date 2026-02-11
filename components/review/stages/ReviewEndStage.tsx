import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ReviewStage } from "../shared/constants";
import { ReviewSplitPanelPage } from "../shared/ReviewSplitPanelPage";
import { ReviewEndData, ReviewScores } from "../shared/types";

interface Props {
  name: string;
  scores: ReviewScores;
  endData: ReviewEndData;
  setEndData: Dispatch<SetStateAction<ReviewEndData>>;
}

const ScoreSummary = ({ scores }: { scores: ReviewScores }) => {
  const { PFSG, TP, D2L, SKL } = ReviewStage;
  const totalScore = scores[PFSG] + scores[TP] + scores[D2L] + scores[SKL];

  return (
    <div className="flow-root px-5">
      <div className="flow-root pt-20 pb-5">
        <h4 className="text-blue float-left B10">Topic</h4>
        <h4 className="text-blue float-right B10">Rating</h4>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between">
          <span>Passion for Social Good</span>
          <span className="text-right">{scores[PFSG]}/5</span>
        </div>
        <div className="flex justify-between">
          <span>Team Player</span>
          <span className="text-right">{scores[TP]}/5</span>
        </div>
        <div className="flex justify-between">
          <span>Desire to Learn</span>
          <span className="text-right">{scores[D2L]}/5</span>
        </div>
        <div className="flex justify-between">
          <span>Skill</span>
          <span className="text-right">{scores[SKL]}/5</span>
        </div>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0" />
      <div className="flex justify-between">
        <h4>Total</h4>
        <h4 className="text-right">{totalScore}/20</h4>
      </div>
    </div>
  );
};

const EndForm = ({
  endData,
  setEndData,
}: {
  endData: ReviewEndData;
  setEndData: Dispatch<SetStateAction<ReviewEndData>>;
}) => {
  const { skillsCategory, comments, secondChoiceRole } = endData;

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setEndData((prev) => ({ ...prev, skillsCategory: event.target.value }));
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEndData((prev) => ({ ...prev, comments: event.target.value }));
  };

  const handleChoiceChange = () => {
    setEndData((prev) => ({
      ...prev,
      secondChoiceRole:
        prev.secondChoiceRole === "considered"
          ? "not considered"
          : "considered",
    }));
  };

  return (
    <div className="flex flex-col space-y-4 px-5">
      <div>
        <form>
          <h3 className="text-[26px] pt-8">Skills Category</h3>
          <select value={skillsCategory} onChange={handleOptionChange} required>
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
          value={comments}
          onChange={handleCommentChange}
          placeholder="Leave comments here"
          className="w-full h-[100px] p-2 text-base"
        />
      </div>
      <div>
        <h3 className="text-[26px]">
          <span className="text-blue">Second Choice: </span>
          {secondChoiceRole}
        </h3>
        <input
          className="B10"
          type="checkbox"
          id="secondChoice"
          name="secondChoice"
          value="secondChoice"
          onChange={handleChoiceChange}
        />
        <label> Recommend for Second Choice</label>
      </div>
    </div>
  );
};

export const ReviewEndStage = ({
  name,
  scores,
  endData,
  setEndData,
}: Props) => {
  return (
    <ReviewSplitPanelPage
      studentName={name}
      currentStage={ReviewStage.END}
      leftTitle={"Summary of scores"}
      leftContent={<ScoreSummary scores={scores} />}
      scores={scores}
      endData={endData}
      rightContent={<EndForm endData={endData} setEndData={setEndData} />}
    />
  );
};
