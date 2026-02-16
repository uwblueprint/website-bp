import { ReactNode } from "react";
import { ReviewStage } from "../shared/constants";
import { ReviewProgressHeader } from "../shared/ReviewProgressHeader";
import { ReviewStepper } from "../shared/ReviewStepper";
import { ReviewEndData, ReviewScores } from "../shared/types";

// ── ReviewPageLayout ─────────────────────────────────────────────────

interface ReviewPageLayoutProps {
  currentStage: ReviewStage;
  scores: ReviewScores;
  endData?: ReviewEndData;
  children: ReactNode;
}

export const ReviewPageLayout = ({
  currentStage,
  scores,
  endData,
  children,
}: ReviewPageLayoutProps) => {
  return (
    <div className="flex flex-col h-screen">
      <ReviewProgressHeader currentStage={currentStage} />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-charcoal-250">
        {children}
      </div>
      <ReviewStepper
        currentStage={currentStage}
        scores={scores}
        endData={endData}
      />
    </div>
  );
};

// ── PanelLeft ────────────────────────────────────────────────────────

interface PanelLeftProps {
  title?: string;
  variant?: "sky" | "white";
  outlined?: boolean;
  children: ReactNode;
}

export const PanelLeft = ({
  title,
  variant = "sky",
  outlined = true,
  children,
}: PanelLeftProps) => {
  return (
    <div
      className={`flex flex-col w-full h-full px-6 py-8 relative overflow-y-auto ${
        variant === "white" ? "bg-white" : "bg-sky"
      } ${outlined ? "lg:border-r border-charcoal-250" : ""}`}
    >
      {title && <h2 className="text-[26px] mb-4">{title}</h2>}
      <div className="flex-1 relative">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

// ── PanelRight ───────────────────────────────────────────────────────

interface PanelRightProps {
  title?: string;
  titleButton?: JSX.Element;
  studentName?: string;
  outlined?: boolean;
  children: ReactNode;
}

export const PanelRight = ({
  title,
  titleButton,
  studentName,
  outlined = false,
  children,
}: PanelRightProps) => {
  return (
    <div
      className={`flex flex-col h-full overflow-hidden bg-white ${outlined ? "border border-charcoal-250" : ""}`}
    >
      <div className="px-6 pt-8 pb-2">
        {studentName && (
          <p className="text-charcoal-500 text-sm mb-1">
            {studentName}&apos;s Application
          </p>
        )}
        {title && titleButton ? (
          <div className="flex justify-between items-center">
            <h2 className="text-[26px] text-charcoal-900 font-semibold">
              {title}
            </h2>
            {titleButton}
          </div>
        ) : title ? (
          <h2 className="text-[26px] text-charcoal-900 font-semibold">
            {title}
          </h2>
        ) : null}
      </div>
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div>{children}</div>
      </div>
    </div>
  );
};
