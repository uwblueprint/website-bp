import { ReviewStage } from "pages/review/index.jsx";
import React from "react";
import { ReviewStepper } from "./reviewStepper";

interface Props {
  studentName: string;
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
    <div className="grid grid-cols-2 h-screen grid-rows-[auto_1fr]">
      <div id="left-title" className="bg-sky"></div>
      <div id="right-title" className="px-9 pt-9">
        <h1 className="text-blue text-4xl">{studentName}</h1>
      </div>
      <div
        className="inline-flex flex-col justify-center gap-8 p-9 shrink-0 bg-sky"
        style={{ alignItems: "flex-start" }}
      >
        <div>
          {leftTitle ? <h2 className="text-[26px]">{leftTitle}</h2> : null}
        </div>
        <div>{leftContent}</div>
      </div>
      <div className="rightPanel flex-none grow px-9 py-10 relative">
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
          {rightContent}
        </div>
        <ReviewStepper currentStage={currentStage} scores={scores} />
      </div>
    </div>
  );
};
