import { ReviewStage } from "pages/review";
import { createContext } from "react";

export const ReviewDispatchContext = createContext<
  null | ((newValue: ReviewStage) => void)
>(null);
