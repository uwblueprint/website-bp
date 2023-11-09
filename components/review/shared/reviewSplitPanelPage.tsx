import { ReviewStage } from "pages/review/index.jsx";
import React from "react";
import { ReviewStepper } from "./reviewStepper";

interface Props {
  studentName: string| undefined;
  leftTitle?: string;
  rightTitle?: string;
  rightTitleButton?: JSX.Element;
  leftContent?: JSX.Element;
  rightContent?: JSX.Element;
  currentStage: ReviewStage;
  scores: Map<ReviewStage, number>;
}

export const ReviewSplitPanelPage: React.FC<Props> = ({
  studentName,
  leftTitle,
  rightTitle,
  rightTitleButton,
  leftContent,
  rightContent,
  currentStage,
  scores,
}) => {
  return (
    <div className="grid grid-cols-2 grid-rows-[auto_1fr] h-screen">
      <div
        id="left"
        className="flex flex-col bg-sky w-full h-screen p-9 relative"
      >
        {leftTitle ? <h2 className="text-[26px]">{leftTitle}</h2> : null}
        <div
          className="inline-flex flex-col gap-8 shrink overflow-y-auto"
          style={{ alignItems: "flex-start" }}
        >
          <div className="w-full">{leftContent}</div>
        </div>
      </div>
      <div id="right" className="h-screen relative flex flex-col h-screen">
        <div id="right-title" className="px-9 pt-9">
          <h1 className="text-blue text-4xl">{studentName}</h1>
        </div>
        <div className="rightPanel flex-1 px-9 py-10 shrink overflow-y-scroll">
          <div className=" flex flex-col gap-8">
            {rightTitle && rightTitleButton ? (
              <div className="flex justify-between">
                <h2 className="text-[26px]" style={{ lineHeight: "140%" }}>
                  {rightTitle}
                </h2>
                {rightTitleButton}
              </div>
            ) : rightTitle ? (
              <h2 className="text-[26px]" style={{ lineHeight: "140%" }}>
                {rightTitle}
              </h2>
            ) : null}
            <div>{rightContent}</div>
          </div>
        </div>
        <ReviewStepper currentStage={currentStage} scores={scores} />
      </div>
    </div>
  );
};
