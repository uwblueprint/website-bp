import { ReviewStage } from "./constants";

export type ReviewScores = Record<ReviewStage, number>;

export type ReviewEndData = {
  comments: string;
  skillsCategory: string;
  secondChoiceRole: string;
};

export type ReviewShortAnswer = {
  question: string;
  response?: string;
};

export type ReviewRoleSpecificQuestion = {
  question?: string;
  response?: string | string[];
};

export type ReviewRoleSpecificSection = {
  questions?: ReviewRoleSpecificQuestion[];
};
