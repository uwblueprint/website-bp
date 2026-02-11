import { ReviewStage } from "./constants";

export type ReviewScores = Record<ReviewStage, number>;

export type ReviewEndData = {
  comments: string;
  skillsCategory: string;
  secondChoiceRole: string;
};
