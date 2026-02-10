import { ReviewStage } from "./constants";
import { ReviewProgressHeader } from "./ReviewProgressHeader";
import { ReviewStepper } from "./ReviewStepper";
import { ReviewEndData, ReviewScores } from "./types";

export interface Props {
  studentName: string;
  leftTitle?: string;
  rightTitle?: string;
  rightTitleButton?: JSX.Element;
  leftContent?: JSX.Element;
  rightContent?: JSX.Element;
  currentStage: ReviewStage;
  scores: ReviewScores;
  endData?: ReviewEndData;
}

export const ReviewSplitPanelPage = ({
  studentName,
  leftTitle,
  rightTitle,
  rightTitleButton,
  leftContent,
  rightContent,
  currentStage,
  scores,
  endData,
}: Props) => {
  return (
    <div className="flex flex-col h-screen">
      <ReviewProgressHeader currentStage={currentStage} />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <div
          id="left"
          className={`flex flex-col w-full h-full p-9 relative overflow-y-auto ${
            currentStage === ReviewStage.END ? "bg-white" : "bg-sky"
          }`}
        >
          {currentStage !== ReviewStage.END && leftTitle ? (
            <h2 className="text-[26px] mb-4">{leftTitle}</h2>
          ) : null}
          <div className="flex-1 relative">
            <div className="w-full">{leftContent}</div>
          </div>
        </div>
        <div
          id="right"
          className="flex flex-col h-full overflow-hidden bg-white"
        >
          <div id="right-title" className="px-9 pt-6 pb-2">
            <p className="text-charcoal-500 text-sm mb-1">
              {studentName}&apos;s Application
            </p>
            {rightTitle && rightTitleButton ? (
              <div className="flex justify-between items-center">
                <h2 className="text-[26px] text-charcoal-900 font-semibold">
                  {rightTitle}
                </h2>
                {rightTitleButton}
              </div>
            ) : rightTitle ? (
              <h2 className="text-[26px] text-charcoal-900 font-semibold">
                {rightTitle}
              </h2>
            ) : null}
          </div>
          <div className="flex-1 px-9 py-6 overflow-y-auto">
            <div>{rightContent}</div>
          </div>
          <ReviewStepper
            currentStage={currentStage}
            scores={scores}
            endData={endData}
          />
        </div>
      </div>
    </div>
  );
};
