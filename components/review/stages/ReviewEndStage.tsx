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

const LeftPanelContent = ({
  name,
  scores,
}: {
  name: string;
  scores: ReviewScores;
}) => {
  const { PFSG, TP, D2L, SKL } = ReviewStage;
  const totalScore = scores[PFSG] + scores[TP] + scores[D2L] + scores[SKL];

  return (
    <div className="flex flex-col gap-6">
      {/* Scoring section header */}
      <div>
        <p className="text-charcoal-500 text-sm mb-1">Scoring</p>
        <h2 className="text-charcoal-700 font-semibold text-xl">
          {name}&apos;s final scores
        </h2>
      </div>

      {/* Score card */}
      <div className="rounded-lg border border-charcoal-200 bg-white p-6 shadow-sm">
        <div className="flex justify-between mb-4">
          <span className="text-blue font-semibold">Topic</span>
          <span className="text-blue font-semibold">Rating</span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-charcoal-700">Passion for Social Good</span>
            <span>{scores[PFSG]}/5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal-700">Team Player</span>
            <span>{scores[TP]}/5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal-700">Desire to Learn</span>
            <span>{scores[D2L]}/5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal-700">Skill</span>
            <span>{scores[SKL]}/5</span>
          </div>
        </div>
        <hr className="my-4 border-charcoal-200" />
        <div className="flex justify-between font-semibold">
          <span className="text-charcoal-700">Total Score</span>
          <span className="text-blue">{totalScore}/20</span>
        </div>
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
  const { skillsCategory, comments } = endData;

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setEndData((prev) => ({ ...prev, skillsCategory: event.target.value }));
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEndData((prev) => ({ ...prev, comments: event.target.value }));
  };

  return (
    <div className="flex flex-col space-y-4 px-5">
      <div>
        <form>
          <h3 className="text-[26px] pt-8">Skills Category</h3>
          <select
            value={skillsCategory}
            onChange={handleOptionChange}
            required
            className={`h-[55px] w-full self-stretch rounded-md border border-[#C4C4C4] bg-white pt-4 pr-3 pb-[15px] pl-4 font-[Inter] text-base font-normal leading-6 ${
              skillsCategory === "" ? "text-[#C4C4C4]" : "text-black"
            }`}
          >
            <option value="">Skills Category</option>
            <option value="junior">Junior</option>
            <option value="intermediate">Intermediate</option>
            <option value="senior">Senior</option>
          </select>
        </form>
      </div>
      <div>
        <h3 className="text-[26px]">Comments</h3>
        <textarea
          value={comments}
          onChange={handleCommentChange}
          placeholder="Leave comments here"
          className="w-full h-[250px] self-stretch rounded-md border border-[#C4C4C4] bg-white p-2 text-base placeholder:font-[Inter] placeholder:text-sm placeholder:font-normal placeholder:leading-5 placeholder:text-black/[0.36]"
        />
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
      leftContent={<LeftPanelContent name={name} scores={scores} />}
      scores={scores}
      endData={endData}
      rightContent={<EndForm endData={endData} setEndData={setEndData} />}
    />
  );
};
