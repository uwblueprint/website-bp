import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { ReviewStage } from "../shared/constants";
import { ReviewEndData, ReviewScores } from "../shared/types";
import ArrowLeftIcon from "@components/icons/arrow-left.icon";
import Link from "next/link";
import { ReviewPageLayout, PanelLayout } from "../layout";

interface Props {
  name: string;
  reviewerName: string;
  scores: ReviewScores;
  endData: ReviewEndData;
  setEndData: Dispatch<SetStateAction<ReviewEndData>>;
}

const LeftPanelContent = ({
  name,
  reviewerName,
  scores,
}: {
  name: string;
  reviewerName: string;
  scores: ReviewScores;
}) => {
  const SCORE_ROWS: { label: string; stage: ReviewStage }[] = [
    { label: "Passion for Social Good", stage: ReviewStage.PFSG },
    { label: "Team Player", stage: ReviewStage.TP },
    { label: "Desire to Learn", stage: ReviewStage.D2L },
    { label: "Skill", stage: ReviewStage.SKL },
  ];

  const totalScore = SCORE_ROWS.reduce(
    (sum, { stage }) => sum + scores[stage],
    0,
  );

  return (
    <div className="flex flex-col gap-6 p-3">
      {/* Back to home */}
      <Link href="/admin" className="w-fit self-start">
        <button className="w-fit flex justify-center items-center gap-2 py-2 px-4 rounded-full border-2 border-blue bg-white hover:bg-gray-50 transition-colors">
          <ArrowLeftIcon className="w-6 h-6 text-blue" />
          <span className="text-blue text-base font-normal leading-snug">
            Back to home
          </span>
        </button>
      </Link>

      {/* Scoring section */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-charcoal-900/75 font-normal text-base leading-snug">
            Scoring
          </p>
          <h2 className="text-charcoal-900 text-3xl leading-snug">
            {name}&apos;s final scores
          </h2>
        </div>

        {/* Score card */}
        <div className="rounded-lg border border-charcoal-250 bg-white p-6 flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-6 w-[235px]">
              <span className="text-blue font-medium text-xl leading-7 font-poppins">
                Topic
              </span>
              {SCORE_ROWS.map(({ label }) => (
                <span
                  key={label}
                  className="text-black font-normal text-base leading-snug"
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-6 items-end">
              <span className="text-blue font-normal text-xl leading-7 font-poppins">
                {reviewerName}&apos;s rating
              </span>
              {SCORE_ROWS.map(({ label, stage }) => (
                <span
                  key={label}
                  className="text-black font-normal text-base leading-snug"
                >
                  {scores[stage]}/5
                </span>
              ))}
            </div>
          </div>
          <hr className="border-charcoal-250" />
          <div className="flex justify-between items-center">
            <span className="text-black font-medium text-xl leading-7 font-poppins">
              Total Score
            </span>
            <span className="text-blue font-normal text-xl leading-7 font-poppins">
              {totalScore}/20
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const EndForm = ({
  endData,
  setEndData,
  validationError,
}: {
  endData: ReviewEndData;
  setEndData: Dispatch<SetStateAction<ReviewEndData>>;
  validationError: boolean;
}) => {
  const { skillsCategory, comments } = endData;

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setEndData((prev) => ({ ...prev, skillsCategory: event.target.value }));
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEndData((prev) => ({ ...prev, comments: event.target.value }));
  };

  return (
    <div className="flex flex-col gap-8 w-full lg:max-w-[541px] lg:mx-auto">
      <div className="flex flex-col gap-6">
        <h3 className="text-charcoal-900 text-xl leading-7">Skill Category</h3>
        <select
          value={skillsCategory}
          onChange={handleOptionChange}
          required
          className={`h-14 w-full rounded-md border bg-white px-4 py-4 text-base font-normal leading-6
            ${
              validationError && skillsCategory === ""
                ? "border-red-500"
                : "border-charcoal-250"
            }
            ${skillsCategory === "" ? "text-charcoal-250" : "text-black"}`}
        >
          <option value="">Skill Category</option>
          <option value="junior">Junior</option>
          <option value="intermediate">Intermediate</option>
          <option value="senior">Senior</option>
        </select>
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="text-charcoal-900 text-xl leading-7">Comments</h3>
        <textarea
          value={comments}
          onChange={handleCommentChange}
          placeholder="Leave Comments here"
          className="w-full h-[250px] rounded-md border border-charcoal-250 bg-white px-3 py-4 text-base font-normal leading-6 placeholder:text-sm placeholder:font-normal placeholder:leading-5 placeholder:text-black/[0.36]"
        />
      </div>
    </div>
  );
};

export const ReviewEndStage = ({
  name,
  reviewerName,
  scores,
  endData,
  setEndData,
}: Props) => {
  const [validationError, setValidationError] = useState(false);

  return (
    <ReviewPageLayout
      currentStage={ReviewStage.END}
      scores={scores}
      endData={endData}
      onValidate={() => {
        const isValid = endData.skillsCategory !== "";
        setValidationError(!isValid);
        return isValid;
      }}
    >
      <PanelLayout borderRight>
        <LeftPanelContent
          name={name}
          reviewerName={reviewerName}
          scores={scores}
        />
      </PanelLayout>
      <PanelLayout>
        <EndForm
          endData={endData}
          setEndData={setEndData}
          validationError={validationError}
        />
      </PanelLayout>
    </ReviewPageLayout>
  );
};
