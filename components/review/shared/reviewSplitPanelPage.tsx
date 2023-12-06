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
  tallyLeftTitle?: string;
  tallyRightTitle?: string;
  totalTally?: JSX.Element;
  comment?: JSX.Element;
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
  tallyLeftTitle,
  tallyRightTitle,
  totalTally,
  comment,
}) => {  
  return (
    <div className="grid grid-cols-2 grid-rows-[auto_1fr] h-screen">
      <div
        id="left"
        className="flex flex-col bg-sky w-full h-screen p-9 relative"
      >
        {leftTitle ? (
          <h2
            style={{ textAlign: "left", fontSize: "26px" }}
            className="text-[26px]"
          >
            {leftTitle}
          </h2>
        ) : null}

        {tallyLeftTitle && tallyRightTitle && (
          <div
            style={{
              width: "516px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 className="text-[26px] text-blue" style={{ textAlign: "left" }}>
              {tallyLeftTitle}
            </h2>
            <h2
              className="text-[26px] text-blue"
              style={{ textAlign: "right" }}
            >
              {tallyRightTitle}
            </h2>
          </div>
        )}

        <div
          className="inline-flex flex-col gap-8 shrink overflow-y-auto"
          style={{
            width: "516px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div className="w-full text-[26px]">{leftContent}</div>
          {totalTally && (
            <>
              <div
                style={{
                  width: "100%",
                  borderBottom: "1px solid black",
                  marginTop: "8px",
                }}
              />
              <div className="w-full text-[26px]">{totalTally}</div>
            </>
          )}
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
            {totalTally && <p>{comment}</p>}
          </div>
        </div>
        <ReviewStepper currentStage={currentStage} scores={scores} />
      </div>
    </div>
  );
};
