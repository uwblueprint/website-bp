import { ReactNode } from "react";
import { ReviewStage } from "../shared/constants";
import { ReviewProgressHeader } from "../shared/ReviewProgressHeader";
import { ReviewStepper } from "../shared/ReviewStepper";
import { ReviewEndData, ReviewScores } from "../shared/types";
import { SplitPanelLayout } from "@components/common/SplitPageLayout";

interface ReviewPageLayoutProps {
  currentStage: ReviewStage;
  scores: ReviewScores;
  endData?: ReviewEndData;
  onValidate?: () => boolean;
  children: ReactNode;
}

export const ReviewPageLayout = ({
  currentStage,
  scores,
  endData,
  onValidate,
  children,
}: ReviewPageLayoutProps) => {
  return (
    <SplitPanelLayout
      header={<ReviewProgressHeader currentStage={currentStage} />}
      footer={
        <ReviewStepper
          currentStage={currentStage}
          scores={scores}
          endData={endData}
          onValidate={onValidate}
        />
      }
    >
      {children}
    </SplitPanelLayout>
  );
};
