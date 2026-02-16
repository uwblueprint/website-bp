import { ReactNode } from "react";
import { ReviewStage } from "../shared/constants";
import { ReviewProgressHeader } from "../shared/ReviewProgressHeader";
import { ReviewStepper } from "../shared/ReviewStepper";
import { ReviewEndData, ReviewScores } from "../shared/types";
import { PageLayout } from "@components/common/SplitPageLayout";

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
    <PageLayout
      header={<ReviewProgressHeader currentStage={currentStage} />}
      footer={
        <ReviewStepper
          currentStage={currentStage}
          scores={scores}
          endData={endData}
        />
      }
    >
      {children}
    </PageLayout>
  );
};
