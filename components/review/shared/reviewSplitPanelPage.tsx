import { ReviewStage } from "pages/review/index.jsx";
import React from "react";
import { ReviewStepper } from "./reviewStepper";

interface Props {
  studentName: string;
  leftTitle?: string;
  rightTitle?: string;
  leftContent?: JSX.Element;
  rightContent?: JSX.Element;
  currentStage: ReviewStage;
}

export const ReviewSplitPanelPage: React.FC<Props> = ({
  studentName,
  leftTitle,
  rightTitle,
  leftContent,
  rightContent,
  currentStage,
  children,
}) => {
  return (
    <div className="grid grid-cols-2 h-screen grid-rows-[auto_1fr]">
      <div id="left-title" className="bg-sky"></div>
      <div id="right-title" className="px-9 pt-9">
        <h1 className="text-blue text-4xl">{studentName}</h1>
      </div>
      <div className="leftPanel flex-none grow bg-sky p-9">
        {leftTitle ? <h2 className="text-xl">{leftTitle}</h2> : null}
        {leftContent}
      </div>
      <div className="rightPanel flex-none grow px-9 py-10 relative">
        <div>
          {rightTitle ? <h2 className="text-xl">{rightTitle}</h2> : null}
          {rightContent}
        </div>
        {children}
        <ReviewStepper currentStage={currentStage} />
      </div>
    </div>
  );
};
