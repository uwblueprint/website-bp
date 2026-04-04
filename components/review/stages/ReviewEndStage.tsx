import Button from "@components/common/Button";
import WarningOutlineIcon from "@components/icons/warning-outline.icon";
import {
  ChangeEvent,
  Dispatch,
  ReactElement,
  SetStateAction,
  useState,
} from "react";
import { ReviewStage } from "../shared/constants";
import { ReviewEndData, ReviewScores } from "../shared/types";
import { ReviewPageLayout } from "../layout";

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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <Button
          size="sm"
          variant="secondary"
          href="/admin"
          className="w-fit px-4 py-2 font-source text-base leading-[1.4]"
        >
          Back to home
        </Button>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="font-source text-base italic leading-[1.4] text-blue">
            Is the applicant a conflict of interest?
          </p>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => undefined}
            className="flex items-center gap-2 px-4 py-2 font-source text-base leading-[1.4]"
          >
            <WarningOutlineIcon className="h-5 w-5" />
            Report
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="font-source text-base leading-[1.4] text-black/75">
            Scoring
          </p>
          <h2 className="text-[28px] font-semibold leading-[1.4] text-[#252525]">
            {name}&apos;s final scores
          </h2>
        </div>

        <div className="flex flex-col gap-8 rounded-[8px] border border-[#C4C4C4] bg-white p-6">
          <div className="flex items-start justify-between gap-8">
            <div className="flex w-[235px] flex-col gap-6">
              <p className="font-poppins text-[20px] font-medium leading-[1.4] text-[#0573E8]">
                Topic
              </p>
              {SCORE_ROWS.map(({ label }) => (
                <p
                  key={label}
                  className="font-source text-base leading-[1.4] text-black"
                >
                  {label}
                </p>
              ))}
            </div>

            <div className="flex max-w-[165px] flex-col items-end gap-6">
              <p className="font-poppins text-[20px] leading-[1.4] whitespace-nowrap text-[#0573E8]">
                {reviewerName}&apos;s rating
              </p>
              {SCORE_ROWS.map(({ label, stage }) => (
                <p
                  key={label}
                  className="min-w-full text-right font-source text-base leading-[1.4] text-black"
                >
                  {scores[stage]}/5
                </p>
              ))}
            </div>
          </div>

          <div className="border-t border-[#C4C4C4]" />

          <div className="flex items-center justify-between">
            <p className="font-poppins text-[20px] font-medium leading-[1.4] text-black">
              Total Score
            </p>
            <p className="font-poppins text-[20px] font-bold leading-[1.4] text-[#0573E8]">
              {totalScore}/20
            </p>
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
    <div className="flex w-full max-w-[541px] flex-col gap-[31px]">
      <div className="flex flex-col gap-6">
        <h3 className="font-poppins text-[20px] font-medium leading-[1.4] text-[#252525]">
          Skill Category
        </h3>
        <select
          value={skillsCategory}
          onChange={handleOptionChange}
          required
          className={`h-[55px] w-full rounded-[6px] border bg-white px-[15px] text-base leading-6 ${
            validationError && skillsCategory === ""
              ? "border-red-500"
              : "border-[#C4C4C4]"
          } ${skillsCategory === "" ? "text-[#C4C4C4]" : "text-[#252525]"}`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <option value="">Skill Category</option>
          <option value="junior">Junior</option>
          <option value="intermediate">Intermediate</option>
          <option value="senior">Senior</option>
        </select>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-poppins text-[20px] font-medium leading-[1.4] text-[#252525]">
          Comments
        </h3>
        <textarea
          value={comments}
          onChange={handleCommentChange}
          placeholder="Leave Comments here"
          className="h-[250px] w-full resize-none rounded-[6px] border border-[#C4C4C4] bg-white px-3 py-[11px] text-base leading-6 text-[#252525] placeholder:text-[14px] placeholder:leading-5 placeholder:text-black/[0.36]"
          style={{ fontFamily: "Inter, sans-serif" }}
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
}: Props): ReactElement => {
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
      <div className="flex h-full flex-col overflow-y-auto border-r border-[#C4C4C4] bg-white px-6 py-8 md:px-9">
        <LeftPanelContent
          name={name}
          reviewerName={reviewerName}
          scores={scores}
        />
      </div>
      <div className="flex h-full flex-col items-center overflow-y-auto bg-white px-6 py-8">
        <EndForm
          endData={endData}
          setEndData={setEndData}
          validationError={validationError}
        />
      </div>
    </ReviewPageLayout>
  );
};
