import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ReviewStage } from "../shared/constants";
import { ReviewSplitPanelPage } from "../shared/ReviewSplitPanelPage";
import { ReviewEndData, ReviewScores } from "../shared/types";
import ArrowLeftIcon from "@components/icons/arrow-left.icon";
import WarningOutlineIcon from "@components/icons/warning-outline.icon";
import Link from "next/link";

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
      {/* Top bar with navigation back home and report */}
      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row items-start md:items-center lg:items-start xl:items-center justify-between gap-2">
        <Link href="/admin">
          <button className="flex justify-center items-center gap-2 py-2 px-4 rounded-[1.25rem] border-2 border-blue bg-white hover:bg-gray-50 transition-colors">
            <ArrowLeftIcon className="w-6 h-6 text-blue" />
            <span className="text-blue text-base font-normal leading-[22.4px] font-source">
              Back to home
            </span>
          </button>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-blue text-base font-normal leading-[20.13px] font-source italic">
            Is the applicant a conflict of interest?
          </span>
          {/* Does nothing yet, assuming it should be coupled with the conflict modal from this ticket: */}
          {/* https://www.notion.so/uwblueprintexecs/Implement-Report-Conflict-Feature-00710f3fb1dc826ebaf001ff3482afb1?v=6b710f3fb1dc83d7b43d08147fd183be&source=copy_link */}
          <button className="flex justify-center items-center gap-2 py-2 px-4 rounded-[1.25rem] border-2 border-blue bg-white hover:bg-gray-50 transition-colors">
            <WarningOutlineIcon className="w-6 h-6 text-blue" />
            <span className="text-blue text-base font-normal leading-[22.4px] font-source">
              Report
            </span>
          </button>
        </div>
      </div>

      {/* Scoring section header */}
      <div>
        <p className="text-charcoal-500 text-sm mb-1">Scoring</p>
        <h2 className="text-charcoal-700 font-semibold text-xl">
          {name}&apos;s final scores
        </h2>
      </div>

      {/* Score card */}
      <div className="rounded-lg border border-[#C4C4C4] bg-white p-6 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-6 w-[235px]">
            <span className="text-blue font-medium text-[20px] leading-[28px] font-poppins">
              Topic
            </span>
            <span className="text-black font-normal text-base leading-[22.4px] font-source">
              Passion for Social Good
            </span>
            <span className="text-black font-normal text-base leading-[22.4px] font-source">
              Team Player
            </span>
            <span className="text-black font-normal text-base leading-[22.4px] font-source">
              Desire to Learn
            </span>
            <span className="text-black font-normal text-base leading-[22.4px] font-source">
              Skill
            </span>
          </div>
          <div className="flex flex-col gap-6 items-end">
            <span className="text-blue font-normal text-[20px] leading-[28px] font-poppins">
              Justin&apos;s rating
            </span>
            <span className="text-black font-normal text-base leading-[22.4px] font-source">
              {scores[PFSG]}/5
            </span>
            <span className="text-black font-normal text-base leading-[22.4px] font-source">
              {scores[TP]}/5
            </span>
            <span className="text-black font-normal text-base leading-[22.4px] font-source">
              {scores[D2L]}/5
            </span>
            <span className="text-black font-normal text-base leading-[22.4px] font-source">
              {scores[SKL]}/5
            </span>
          </div>
        </div>
        <hr className="border-[#C4C4C4]" />
        <div className="flex justify-between items-center">
          <span className="text-black font-medium text-[20px] leading-[28px] font-poppins">
            Total Score
          </span>
          <span className="text-blue font-normal text-[20px] leading-[28px] font-poppins">
            {totalScore}/20
          </span>
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
