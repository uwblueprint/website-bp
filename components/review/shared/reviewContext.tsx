import { ReviewStage } from "pages/review";
import { createContext } from "react";

export const ReviewSetStageContext = createContext<
  null | ((newValue: ReviewStage) => void)
>(null);

export const ReviewSetScoresContext = createContext<
  null | ((newKey: ReviewStage, newValue: number) => void)
>(null);
