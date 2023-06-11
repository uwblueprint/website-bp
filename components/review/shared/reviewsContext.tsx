import { ReviewStage } from "pages/review";
import { createContext } from "react";

export const ReviewSetStageContext = createContext<
  null | ((newValue: ReviewStage) => void)
>(null);
